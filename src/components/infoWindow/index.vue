<template>
  <div class="infoWindow">
    <div class="info-container">
      <h1 class="info-title">{{ chartDate && chartDate.name }}</h1>
      <el-button type="primary" class="info-download">
        <a :href="url" type="download">下载相关数据</a>
      </el-button>
      <div ref="chart" style="height: 300px; width: 100%"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); //echarts theme

import { getHour, infoDownload } from "@/utils/request/index.js";
export default {
  props: {
    chartDate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      chart: null,
      time: [],
      hourrain: [],
      title: "",
      url: "",
    };
  },
  watch: {
    async chartDate() {
      this.url = `http://3f9406f9.r6.cpolar.top/hour/download?station=${this.chartDate.name}&hours=3`;
      if (this.chartDate && this.chartDate.name) {
        this.time = [];
        this.hourrain = [];
        const { data } = await getHour(this.chartDate.name);
        data.data.forEach((t) => {
          let date = new Date(t.datetime);
          this.time.push(date.getHours());
          this.hourrain.push(t.hourrain);
        });
        let firstDate = new Date(data.data[0].datetime);
        let lastDate = new Date(data.data[data.data.length - 1].datetime);
        this.title = `${
          lastDate.getMonth() + 1 + "月" + lastDate.getDate()
        }日 - ${firstDate.getMonth() + 1 + "月" + firstDate.getDate()}日`;
        if (data.code == 200) {
          let option = {
            title: { text: this.title },
            xAxis: {
              type: "category",
              data: this.time,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: this.hourrain,
                type: "line",
              },
            ],
          };
          this.resetChart(option);
          this.chart.resize();
        }
      }
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
    },
    resetChart(option) {
      this.chart.setOption(option);
      // }
    },
    msgDownload() {
      // console.log("download",this.chartDate)
      infoDownload("北山", 3).then((data) => {
        console.log("data", data);
      });
    },
  },
};
</script>

<style scoped>
.infoWindow {
  background: white;
  width: 500px;
  height: 350px;
  border-radius: 50px;
  border: 3px solid rgba(150, 150, 150, 0.2);
}

.info-title {
  text-align: center;
}

.info-download {
  float: right;
  margin-right: 30px;
}

.info-download a {
  color: white;
}

</style>