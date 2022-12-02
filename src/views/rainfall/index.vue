<template>
  <div class="app-container">
    <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
      >新增雨量站</el-button
    >
    <el-table :data="rainfall_map" style="width: 100%">
      <el-table-column prop="name" label="雨量站点名"></el-table-column>
      <el-table-column prop="latitude" label="经度"></el-table-column>
      <el-table-column prop="longitude" label="纬度"></el-table-column>
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
    <el-dialog title="新增雨量站" :visible="show_add">
      <span>name</span> <el-input type="text" v-model="add_name"></el-input>
      <span>latitude</span>
      <el-input type="text" v-model="add_latitude"></el-input>
      <span>longitude</span>
      <el-input type="text" v-model="add_longitude"></el-input>
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
    };
  },
  computed: {
    ...mapGetters(["rainfall_map"]),
  },
  mounted() {
    // this.getList()
  },

  methods: {
    getList() {
      getRainfallList().then((data) => {
        this.list = data.data;
        if (data.data.code == 200) {
          this.list = data.data.data;
        } else {
          // console.log(data.data.msg);
        }
      });
    },
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
  },
};
</script>


<style scoped>
</style>
