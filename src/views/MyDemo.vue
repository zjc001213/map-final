<template>
  <div class="demo">
    <div class="container" >123123</div>
  </div>
</template>


<script>
require("echarts/theme/macarons"); //echarts theme
export default {
  name: "MyDemo",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    let content = `<div class="unique" style="height: 100px; width: 100px"></div>`
    document.querySelector(".container").innerHTML = content
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart =  echarts.init(document.querySelector(".unique"));
      this.chart.setOption({
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: [23, 24, 18, 25, 27, 28, 25],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.demo {
  height: 200px;
  width: 200px;
  background: skyblue;
}
</style>