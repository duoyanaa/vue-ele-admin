<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12"
        ><el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea2"
        >
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="textarea3"
        >
        </el-input>
        <div style="margin: 20px 0;"></div>
        <div class="demo-input-suffix">
          属性方式：
          <el-input
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
            v-model="input2"
          >
          </el-input>
          <div style="margin: 20px 0;"></div>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input21"
          >
          </el-input>
           <div style="margin: 20px 0;"></div>
          <div class="demo-input-suffix">
            slot 方式：
            <el-input placeholder="请选择日期" v-model="input22">
              <i slot="suffix" class="el-input__icon el-icon-date"></i>
            </el-input>
             <div style="margin: 20px 0;"></div>
            <el-input placeholder="请输入内容" v-model="input23">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  components: {},
  filters: {},
  data() {
    return {
      textarea2: "",
      textarea3: "",
      input2: "",
      input21: "",
      input22: "",
      input23: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
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
