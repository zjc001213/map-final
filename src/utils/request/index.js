import axios from './axios.js'

// const service = axios.create({
//     baseURL: 'http://10.192.193.75:8080',
//     timeout: 2000
// });



// export const getList = function () {
//     return service.get('/gatestation')
// }


export function getRainfallList() {
    return axios.get('/rainfall')
}

//// 雨量站 新增
export function rainfall_add(add_data) {
    return axios.post('/rainfall', add_data)

}

// 雨量站 编辑
export function rainfall_edit() {
    console.log('edit')
}

// 雨量站 删除
export function rainfall_del(id) {
    return axios.delete(`/rainfall/${id}`)
}



//闸站信息获取
export function getGatestationList() {
    return axios.get("/gatestation")
}

// 闸站信息删除
export function gatestation_del(id) {
    return axios.delete(`/gatestation/${id}`)

}

//// 新增闸站
export function gatestation_add(add_data) {
    return axios.post('/gatestation', add_data)
}


export function getHour(where) {
    return axios.get(`/hour?station=${where}`)
}


export function infoDownload(name, hour) {
    // http://3f9406f9.r6.cpolar.top/hour/download?station=%E5%8C%97%E5%B1%B1&hours=3
    return axios.get(`/hour/download?station=${name}&hours=${hour}`)
}

export function getSimulateInfo() {
    return axios.get("/simulate")
}