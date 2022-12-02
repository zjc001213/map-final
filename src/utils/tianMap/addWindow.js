// 参考 https://juejin.cn/post/6844904159284559886

import Vue from 'vue'
import router from '@/router/index.js'
import infoWindow from '@/components/infoWindow/index.vue'

import echarts from "echarts";
require("echarts/theme/macarons"); //echarts theme

// 利用Vue.extend扩展vue组件
const WindowConstroctor = Vue.extend(infoWindow)


export default function (id) {
    const domEl = new WindowConstroctor({
        el: document.createElement('div'),
        router
    })


    let chart = echarts.init(
        domEl.$el
    );
    let option = {
        xAxis: {
            data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
            {
                data: [10, 22, 28, 23, 19],
                type: "line",
                smooth: true,
            },
        ],
    };
    chart.setOption(option);

    domEl.show = true
    domEl.$el.style.width = 400 + 'px'
    domEl.$el.style.height = 200 + 'px'
    document.querySelector(`#${id}`).append(domEl.$el)
    chart.resize()

}