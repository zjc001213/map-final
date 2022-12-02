import axios from 'axios'

// const service = axios.create({
//     baseURL: 'http://10.192.193.75:8080',
//     timeout: 2000
// });



// export const getList = function () {
//     return service.get('/gatestation')
// }


export function getRainfallList() {
    return axios.get('http://10.192.9.133:8080/rainfall')
}

//// 雨量站 新增
export function rainfall_add(add_data) {
    return axios.post('http://10.192.9.133:8080/rainfall',add_data)

}

// 雨量站 编辑
export function rainfall_edit() {
    console.log('edit')
}

// 雨量站 删除
export function rainfall_del(id) {
    return axios.delete(`http://10.192.9.133:8080/rainfall/${id}`)
}



//闸站信息获取
export function getGatestationList() {
    return axios.get("http://10.192.9.133:8080/gatestation")
}

// 闸站信息删除
export function gatestation_del(id) {
    return axios.delete(`http://10.192.9.133:8080/gatestation/${id}`)

}

//// 新增闸站
export function gatestation_add(add_data) {
    return axios.post('http://10.192.9.133:8080/gatestation',add_data )
}


export function getHour(where) {
    return axios.get(`http://10.192.9.133:8080/hour?station=${where}`)
}