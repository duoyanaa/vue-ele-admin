import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => { // 路由导航守卫 也叫全局守卫
  // start progress bar
  NProgress.start() // 刷新时进度条

  // set page title//是用来设置当前配件的标题的
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) { // 如果登陆了
    if (to.path === '/login') { // 如果当前路由==="/login"
      // if is logged in, redirect to the home page
      next({ path: '/' }) // 跳转到'/'页面, 但是呢，没有跳，这是因为路由进行了重定向
      // 滚动条结束
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // 如果没有登录,判断是否拥有hasRoles这个角色  未登录时store.getters.roles为空 第一次登陆时是为空的
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) { // 如果有
        next()
      } else { // 为空只能走else这一条
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 先去拿到用户角色roles()   store.dispatch('user/getInfo')是store里面的东西
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 拿到用户角色roles(),生成动态路由  调用permission/generateRoutes
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
