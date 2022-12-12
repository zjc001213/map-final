import axios from 'axios'
import Vue from 'vue'
import { Loading } from 'element-ui'

// loading事件
let loading
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "Loading 123",
        background: 'rgba(0, 0, 0, 0.3)'
    })
}

function endLoading() {
    loading.visible = false
}

// lby http://10.192.9.133:8080/
// hch  10.192.193.75:8080
const service = axios.create({
    // baseURL: 'http://10.192.9.133:8080/',
    baseURL: 'localhost:8081/',
    timeout:2000
})

// 请求拦截
service.interceptors.request.use(req => {
    // console.log("请求拦截", req)
    startLoading()
    setTimeout(() => {
        endLoading()
    },2000)
    return req
}, err => {
    // console.log("请求拦截错误", err)
    return err
})

service.interceptors.response.use(res => {
    // console.log("响应拦截", res)
    endLoading()
    return res
}, err => {
    // console.log("响应拦截错误", err)
    return err
})



export default service