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
        <h1 style="text-align: center">防洪调度模拟</h1>
      </template>
      <el-divider></el-divider>
      <div class="msg-dialog">
        <div style="margin: 0 auto">
          <el-dropdown
            trigger="click"
            style="cursor: pointer; width: 150px"
            @command="selectStatus"
          >
            <span class="el-dropdown-link" style="width: 150px">
              {{ statusInfo }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">2019年7月洪水</el-dropdown-item>
              <el-dropdown-item command="2">2020年6月洪水</el-dropdown-item>
              <el-dropdown-item command="3">2021年6月洪水</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary">
            <a
              :href="flooddataUrl"
              download="flood_test.txt"
              style="color: white"
            >
              下载洪水数据
            </a>
          </el-button>
        </div>

        <h3>基本信息</h3>
        <span style="display: block">
          当前3小时面降雨量：{{ simulateInfo.rainfall }} 毫米
        </span>
        <span style="display: block">
          缙云河道3小时内流量：{{ simulateInfo.huzhentunnel }} 立方米、
          {{ simulateInfo.donfangtunnel }} 立方米、
          {{ simulateInfo.xiandutunnel }} 立方米</span
        >
      </div>

      <el-divider />
      <div>
        <div class="item">
          <span>预测缙云河道1小时后流量到达：</span>
          <el-input
            class="block-text"
            type="number"
            placeholder="xxx"
            style="width: 100px; margin: 10px; color: red"
            v-model="forecast"
            min="0"
          />
          <span>立方米</span>
        </div>
        <div class="item" :class="{ parentCtn: hz > 30 }">
          <span>壶镇河道：拦截流量</span>
          <el-input
            class="block-text"
            type="number"
            placeholder="xxx"
            style="width: 100px; margin: 10px; color: red"
            v-model="hz"
            min="0"
          />
          <span class="warn-info">上限30立方米</span>
        </div>
        <div class="item" :class="{ parentCtn: df > 30 }">
          <span>东方河道：拦截流量</span>
          <el-input
            class="block-text"
            type="number"
            placeholder="xxx"
            style="width: 100px; margin: 10px"
            v-model="df"
            min="0"
          />
          <span class="warn-info">上限30立方米</span>
        </div>
        <div class="item" :class="{ parentCtn: xd > 30 }">
          <span>仙都河道：拦截流量</span>
          <el-input
            class="block-text"
            type="number"
            placeholder="xxx"
            style="width: 100px; margin: 10px"
            v-model="xd"
            min="0"
          />
          <span class="warn-info">上限30立方米</span>
        </div>
        <div class="item" style="text-align: center; margin: 15px 0">
          <span style="font-size: 24px; display: block"
            >已经使用总调度量: {{ ddl.toFixed(2) }} %</span
          >
          <el-button type="primary" @click="imitate"> 模拟调度 </el-button>
        </div>
      </div>
      <el-divider />

      <div v-if="imitateInfo != null">
        <span>上述执行方案执行后，1小时缙云河道流量为：{{imitateInfo.ljh.toFixed(2)}}立方米实际流量为：</span>
        <h1 :style="{ color: imitateInfo.ddl > 250 ? 'red' : 'green' }">
          {{ imitateInfo.ddl }}立方米
        </h1>
        <h1 v-if="imitateInfo.ddl < 250" style="color: green">未超出警戒值</h1>
        <h1 v-else style="color: red">已经超出警戒值</h1>
        <span>缙云河道上线为：250立方米</span>
      </div>
      <div v-else>
        <span>暂无数据</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addWindow from "@/utils/tianMap/addWindow.js";
import infoWidnow from "@/components/infoWindow/index.vue";
import echarts from "echarts";

require("echarts/theme/macarons"); //echarts theme

import { getHour, getSimulateInfo } from "@/utils/request/index.js";

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
      hz: 0,
      df: 0,
      xd: 0,
      forecast: 0,
      status: "",
      statusInfo: "2019年7月洪水",
      flooddataUrl: "./download/flood_test/test_201907.txt",
      // 自己算的信息
      imitateInfo: null,
      // 请求后得到的信息
      simulateInfo: {
        huzhentunnel: 11,
        donfangtunnel: 11,
        xiandutunnel: 11,
        jinyuntunnel: 11,
      },
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
    status() {
      if (this.status == 1) {
        this.statusInfo = "2019年7月洪水";
        this.flooddataUrl = "./download/flood_test/test_201907.txt";
      } else if (this.status == 2) {
        this.statusInfo = "2020年6月洪水";
        this.flooddataUrl = "./download/flood_test/test_202006.txt";
      } else {
        this.statusInfo = "2021年6月洪水";
        this.flooddataUrl = "./download/flood_test/test_202106.txt";
      }
    },
  },
  mounted() {
    let that = this;
    // 挂载完成后渲染地图
    this.$nextTick(function () {
      that.initMap();
      that.initOverLay();
      this.getSimulateInfo();
    });

    // console.log("rainfall_map",this.rainfall_map)
  },

  computed: {
    ddl() {
      // 不×1 会出现 this.hz *100 + this.df*10 +this.xd*1 的情况
      let total = this.hz*1 + this.df*1+ this.xd*1
       console.log(total)
      return total/90*100
    }
  },
  methods: {
    initMap() {
      // 将地图挂载到页面
      this.map = new T.Map("mapDiv");
      this.map.centerAndZoom(new T.LngLat(120.421152, 28.898532), this.zoom);
      // 设置地图背景色
      // this.map.setStyle('green');
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
    selectStatus(val) {
      console.log("val", val);
      this.status = val;
    },
    // 获取模拟信息
    getSimulateInfo() {
      getSimulateInfo().then((data) => {
        this.simulateInfo = data.data.data[0];
      });
    },
    // 模拟调度
    imitate() {
      // console.log("imitate", this.hz, this.df, this.xd);
      // 拦截后的流量

      let x1 = this.simulateInfo.huzhentunnel - this.hz;
      let x2 = this.simulateInfo.donfangtunnel - this.df;
      let x3 = this.simulateInfo.xiandutunnel - this.xd;

      let ljh =
        13.65 +
        0.844 * x1 +
        0.387 * x2 +
        0.0690*x3 +
        0.0002 * x1 * x1 +
        0.00004 * x1 * x2 -
        0.0004 * x1 * x3 +
        0.0003 * x2 * x2 -
        0.0007 * x2 * x3 +
        0.0005 * x3 * x3;

      this.imitateInfo = {
        // 拦截后流量
        ljh: ljh,
        // 拦截掉的流量
        ljd: this.forecast - ljh,
        // 总调度量
        ddl: ((this.hz + this.df + this.xd) / 90).toFixed(2),
        // 实际流量
        sj: this.statusInfo.jinyuntunnel - this.forecast - ljh,
      };
    },
  },
};
</script>

<style>
.msg-dialog h3 {
  text-align: center;
}
.msg-dialog h3 {
  text-align: center;
}

.warn-info {
  color: red;
}
.el-input__inner {
  font-size: 14px;
  font-weight: 400;
  color: green;
}
.parentCtn .el-input__inner {
  color: red;
}

.footInfo {
  color: red;
}
</style>