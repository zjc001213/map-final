<template>
  <div style="width: 100%; height: 100%">
    <div id="mapDiv" style="position: absolute; width: 100%; height: 100%" />

    <div style="position: absolute; z-index: 9999; bottom: 10px; right: 20px">
      <el-button type="primary" size="small" @click="FcRegaltion"
        >防洪调度模拟</el-button
      >

      <a href="/download/flooddata.zip" download="flooddata.zip">
        <el-button type="primary" size="small" @click="handleDownload">
          下载洪水数据
        </el-button>
      </a>
    </div>
    <infoWidnow
      v-show="infoActive"
      style="
        z-index: 888;
        position: absolute;
        right: 10px;
        top: calc(50% - 100px);
      "
      :chartDate="current"
    ></infoWidnow>

    <el-dialog
      :center="true"
      :visible="visible"
      :before-close="handleClose"
      :modal="false"
      width="500px"
    >
      <template v-slot#default="title">
        <h1>防洪调度模拟123123</h1>
      </template>
      <el-divider></el-divider>
      <div class="base-msg">
        <h3>基本信息</h3>
        <span
          >1. First and foremost, government should establish some regulations
          to (+解决问题措施).What is more, people should get ready to ….After
          all, it is necessary to advocate the whole society to
        </span>
        <el-button type="primary">
          <a href="./test.txt" download="test.txt"> 下3个小时内完整数据 </a>
        </el-button>
      </div>

      <el-divider />
      <div>
        <div>
          <span>xx河道：拦截</span>
          <el-input type="text" placeholder="xxx" />
          <span>上限xxx立方米</span>
        </div>
        <el-button type="primary"> 模拟调度 </el-button>
      </div>
      <el-divider />

      <div>
        <span>上述执行方案执行后，1小时xx河道流量为：</span>
        <h1>xxx立方米</h1>
        <h1>是否超出警戒值</h1>
        <span>xx河道上线为：xxx立方米</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addWindow from "@/utils/tianMap/addWindow.js";
import infoWidnow from "@/components/infoWindow/index.vue";
import echarts from "echarts";
require("echarts/theme/macarons"); //echarts theme

import { getHour } from "@/utils/request/index.js";

export default {
  components: {
    infoWidnow,
  },
  props: {
    rainfallMap: {
      type: Array,
      default: function () {
        return [];
      },
    },
    gatestationMap: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      map: null,
      zoom: 11,
      visible: false,
      rainfallChart: [],
      gatestationChart: [],
      current: null,
      infoActive: false,
    };
  },
  watch: {
    rainfallMap: {
      handler() {
        // 清空覆盖物
        this.map.clearOverLays();
        this.initOverLay();
      },
      deep: true,
    },
    gatestationMap: {
      handler() {
        // 清空覆盖物
        this.map.clearOverLays();
        this.initOverLay();
      },
      deep: true,
    },
  },
  mounted() {
    getHour("八桥").then((msg) => {
      console.log(msg);
    });
    let that = this;
    // 挂载完成后渲染地图
    this.$nextTick(function () {
      that.initMap();
      that.initOverLay();
    });

    // console.log("rainfall_map",this.rainfall_map)
  },
  methods: {
    initMap() {
      // 将地图挂载到页面
      this.map = new T.Map("mapDiv");
      this.map.centerAndZoom(new T.LngLat(120.421152, 28.898532), this.zoom);
    },
    //添加覆盖物
    initOverLay() {
      let that = this;
      this.rainfallMap.forEach((r) => {
        let tempR = r;
        // 自定义定位图标
        var icon = new T.Icon({
          iconUrl: "./png/rain.png",
          iconSize: new T.Point(45, 45),
          iconAnchor: new T.Point(12, 41),
        });

        //添加标记
        let marker = new T.Marker(new T.LngLat(r.longitude, r.latitude), {
          icon: icon,
        });
        this.map.addOverLay(marker);

        //信息窗口
        let infoWin1 = new T.InfoWindow();
        let content = `<div id='label'>${r.name}</div>`;
        infoWin1.setContent(content);

        marker.addEventListener("mouseover", () => {
          marker.openInfoWindow(infoWin1);
        });

        marker.addEventListener("click", function () {
          that.current = tempR;
          that.infoActive = true;

          // console.log("marker",)
          that.map.centerAndZoom(
            new T.LngLat(marker.or.lng, marker.or.lat),
            13
          );
          that.addEvent();
        });

        marker.addEventListener("mouseout", () => {
          marker.closeInfoWindow();
        });
      });

      this.gatestationMap.forEach((r) => {
        let tempR = r;
        var icon = new T.Icon({
          iconUrl: "./png/ga1.png",
          iconSize: new T.Point(45, 45),
          iconAnchor: new T.Point(10, 25),
        });

        let marker = new T.Marker(new T.LngLat(r.longitude, r.latitude), {
          icon: icon,
        });
        this.map.addOverLay(marker);

        let infoWin1 = new T.InfoWindow();
        let context = `<div id='label'>${r.name}</div>`;

        infoWin1.setContent(context);

        marker.addEventListener("mouseover", (msg) => {
          marker.openInfoWindow(infoWin1);
        });
        marker.addEventListener("click", function () {
          that.current = tempR;
          that.infoActive = true;

          // console.log("marker",)
          that.map.centerAndZoom(
            new T.LngLat(marker.or.lng, marker.or.lat),
            13
          );

          that.addEvent();
        });
        marker.addEventListener("mouseout", (msg) => {
          marker.closeInfoWindow();
        });
      });
    },
    handleClose() {
      this.visible = false;
    },
    // 防洪调度控制
    FcRegaltion() {
      this.visible = true;
    },
    // 下载处理
    handleDownload() {},

    //添加事件监听
    addEvent() {
      document.addEventListener("mousedown", this._event);
    },
    removeEvent() {
      document.removeEventListener("mousedown", this._event);
    },
    _event(e) {
      if (e.target.className.indexOf("tdt-container") != -1) {
        this.infoActive = false;
      }
    },
  },
};
</script>

<style scoped>
</style>