<template>
  <div class="app-container">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="120"> </el-table-column>
      <el-table-column property="name" label="城市姓名" width="120">
      </el-table-column>
      <el-table-column property="index" label="城市索引"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="changePage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CityList",
  components: {},
  data() {
    return {
      tableData: [],
      currentRow: null,
      currentPage: 1,
      pagesize: 5,
      total: 0
    };
  },
  created() {
    this.showCityList();
  },
  methods: {
    //展示城市信息
    // showCityList() {
    //   axios.get("/city/list").then(res => {
    //     // console.log(res);
    //     this.tableData = res.data.list;
    //   });
    // },

    //分页展示城市信息
    showCityList() {
      axios
        .get(`/city/list?page=${this.currentPage}&pagesize=${this.pagesize}`)
        .then(res => {
          console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
    },
    //切换页码
    changePage(page) {
      this.currentPage = page;
      this.showCityList();
    },

    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    handleEdit(id) {
      console.log(id);
      this.$router.push({
        path: "/city/edit/" + id
      });
    },

    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.delete("/city/delete/" + id).then(res => {
            // console.log(res)
            this.$message({
              type: "success",
              message: res.data.msg
            });
            //该if用于解决bug 当删除当前页( 当前页大于1 )页面中最后一条数据时,页面自动返回上一页，展示上一页数据
            if ( this.currentPage > this.total / this.pagesize && this.currentPage > 1 ) {
              this.currentPage = this.currentPage - 1;
            }
            this.showCityList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped></style>
