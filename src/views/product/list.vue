<template>
  <div class="app-container">
    <el-row>
      <el-col
        :span="12"
      ><el-input
         v-model="textarea2"
         type="textarea"
         autosize
         placeholder="请输入内容"
       />
        <div style="margin: 20px 0;" />
        <el-input
          v-model="textarea3"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        />
        <div style="margin: 20px 0;" />
        <div class="demo-input-suffix">
          属性方式：
          <el-input
            v-model="input2"
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
          />
          <div style="margin: 20px 0;" />
          <el-input
            v-model="input21"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
          />
          <div style="margin: 20px 0;" />
          <div class="demo-input-suffix">
            slot 方式：
            <el-input v-model="input22" placeholder="请选择日期">
              <i slot="suffix" class="el-input__icon el-icon-date" />
            </el-input>
            <div style="margin: 20px 0;" />
            <el-input v-model="input23" placeholder="请输入内容">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  components: {},
  filters: {},
  data() {
    return {
      textarea2: '',
      textarea3: '',
      input2: '',
      input21: '',
      input22: '',
      input23: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
