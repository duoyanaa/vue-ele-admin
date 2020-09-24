<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form label-width="80px">
          <el-form-item label="城市名称">
            <el-input v-model="city.name" @input="getFistLeter" />
          </el-form-item>

          <el-form-item label="城市索引">
            <el-input v-model="city.index" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import pinyin from 'pinyin'
export default {
  name: 'CreateCtiy',
  components: {},
  data() {
    return {
      city: {
        name: '',
        index: 'A'
      }
    }
  },
  methods: {
    // 取消
    cancel() {
      (this.city.name = ''), (this.city.index = 'A')
    },
    onSubmit() {
      var index = this.city.index
      var name = this.city.name
      axios
        .post('/city/create', {
          index,
          name
        })
        .then(res => {
          console.log(res)
          this.$message(res.data.msg)
          this.$router.push({
            path: '/city/list'
          })
        })
    },
    getFistLeter() {
      if (this.city.name != '') {
        var firstletter = pinyin(this.city.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        })
        this.city.index = firstletter[0][0].toUpperCase()
      }
    }
  }
}
</script>
