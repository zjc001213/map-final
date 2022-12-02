<template>
  <div class="infoWindow">
    <div class="info-container">
      <h1 style="text-align: center">{{ chartDate && chartDate.name }}</h1>
      <div ref="chart" style="height: 300px; width: 100%"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); //echarts theme

import { getHour } from "@/utils/request/index.js";
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
    };
  },
  watch: {
    async chartDate() {
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
        this.title = `${lastDate.getMonth() +1 + "月" + lastDate.getDate()}日 - ${
          firstDate.getMonth() +1 + "月" + firstDate.getDate()
        }日`;
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
</style>