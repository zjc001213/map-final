<template>
  <div class="app-container">
    <div>
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
        >新增雨量站</el-button
      >
      <div style="display: inline; float: right; margin-right: 30px">
        <el-input
          type="text"
          style="width: 200px; margin: 0 30px"
          v-model="queryInfo"
          placeholder="
Query what you want"
        />
        <el-button type="primary" @click="queryInformation">查询</el-button>
      </div>
    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="雨量站点名"></el-table-column>
      <el-table-column prop="longitude" label="经度"></el-table-column>
      <el-table-column prop="latitude" label="纬度"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleEdit()" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDel(scope.row.id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="">
      <el-pagination
        layout="prev, pager, next"
        :total="rainfall_map.length"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
        page-size.sync="10"
      >
      </el-pagination>
    </div>
    <el-dialog title="新增雨量站" :visible="show_add">
      <span>name</span> <el-input type="text" v-model="add_name"></el-input>
      <span>latitude</span>
      <el-input type="text" v-model="add_longitude"></el-input>
      <span>longitude</span>
      <el-input type="text" v-model="add_latitude"></el-input>
      <template slot="footer">
        <el-button @click="show_add = false">取消</el-button>
        <el-button type="primary" @click="handleClose">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRainfallList,
  rainfall_add,
  rainfall_edit,
  rainfall_del,
} from "@/utils/request/index.js";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      list: null,
      show_add: false,
      add_name: "",
      add_latitude: "",
      add_longitude: "",
      currentPage: 1,
      queryInfo: "",
    };
  },
  computed: {
    ...mapGetters(["rainfall_map"]),
  },
  watch: {
    rainfall_map: {
      handler() {
        this.handleCurrentPage(this.currentPage);
      },
      deep: true,
    },
  },
  mounted() {
    this.handleCurrentPage(this.currentPage);
  },
  methods: {
    handleEdit(val) {
      console.log("id", val);
    },
    handleDel(val) {
      rainfall_del(val).then((data) => {
        console.log("data", data);
        if (data.data.code == 200 && data.data.msg == "success") {
          this.$store.commit("DEL_RAINFALL", val);
        }
        console.log("shanchuchengg", val);
      });
    },
    handleAdd() {
      this.show_add = true;
    },
    handleClose() {
      this.show_add = false;
      const data = {
        latitude: this.add_latitude,
        longitude: this.add_longitude,
        name: this.add_name,
      };
      rainfall_add(data).then(() => {
        this.add_name = "";
        this.add_latitude = "";
        this.add_longitude = "";
        this.$store.dispatch("getRainfallList");
      });
    },
    // 当前页改变触发
    handleCurrentPage(val) {
      this.list = [];
      if (this.rainfall_map.length <= 10) {
        this.list = this.rainfall_map;
      } else if ((val - 1) * 10 + 10 > this.rainfall_map.length) {
        for (let i = (val - 1) * 10; i < this.rainfall_map.length; i++) {
          this.list.push(this.rainfall_map[i]);
        }
      } else {
        for (let i = (val - 1) * 10; i < val * 10; i++) {
          this.list.push(this.rainfall_map[i]);
        }
      }
    },
    // 总页数改变触发
    handleSizeChange() {},
    // 查询信息
    queryInformation() {
      if (this.queryInfo.trim() == "") {
        console.log("请输入想要查询的站点");
      } else {
        // 发送请求查询站点信息并返回渲染到页面上
      }
    },
  },
};
</script>


<style scoped>
</style>
