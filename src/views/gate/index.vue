<template>
  <div class="app-container">
    <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
      >新增闸站</el-button
    >
    <el-table :data="gatestation_map">
      <el-table-column prop="name" label="闸站点名"></el-table-column>
      <el-table-column prop="longitude" label="经度"></el-table-column>
      <el-table-column prop="latitude" label="纬度"></el-table-column>
      <el-table-column
        prop="intercept"
        label="最大拦截流量（m³）"
      ></el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)" type="text" size="small"
            >修改</el-button
          >
          <el-button @click="handleDel(scope.row.id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增闸站" :visible="show_add">
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
  getGatestationList,
  gatestation_del,
  gatestation_add,
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
  created() {},
  computed: {
    ...mapGetters(["gatestation_map"]),
  },
  methods: {
    // getList() {
    //   getGatestationList().then((data) => {
    //     this.list = data.data.data;
    //   });
    // },
    handleEdit(val) {
      console.log("id", val);
    },
    handleDel(val) {
      gatestation_del(val).then((data) => {
        if (data.data.code == 200 && data.data.msg == "success") {
          this.$store.commit("DEL_GATESTATION", val);
        }
      });
    },
    handleClose() {
      this.show_add = false;
      const data = {
        latitude: this.add_latitude,
        longitude: this.add_longitude,
        name: this.add_name,
      };
      gatestation_add(data).then((data) => {
        if (data.data.code == 200 && data.data.msg == "success") {
          this.$store.dispatch("getGatestationList");
        }
        this.add_name = "";
        this.add_latitude = "";
        this.add_longitude = "";
      });
    },
    handleAdd() {
      this.show_add = true;
    },
  },
};
</script>


<style scoped>
</style>
