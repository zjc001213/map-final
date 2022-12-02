import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)

import { getRainfallList, getGatestationList } from '@/utils/request/index.js'


export default new Vuex.Store({
    state: {
        rainfall_map: [],
        gatestation_map: []

    },
    getters: {
        rainfall_map(state) {
            return state.rainfall_map
        },
        gatestation_map(state) {
            return state.gatestation_map
        },
    },
    mutations: {
        SET_RAINFALL(state, data) {
            state.rainfall_map = data


        },
        SET_GATESTATION(state, data) {
            state.gatestation_map = data
        },
        DEL_RAINFALL(state, val) {
            let _index
            state.rainfall_map.forEach((item, index) => {
                if (item.id == val) {
                    _index = index
                    return
                }
            })
            if (_index != -1) {
                state.rainfall_map.splice(_index, 1)
            } else {
                console.log("未找到_index")
            }
        },

        DEL_GATESTATION(state, val) {
            let _index
            state.gatestation_map.forEach((item, index) => {
                if (item.id == val) {
                    _index = index
                    return
                }
            })
            if (_index != -1) {
                state.gatestation_map.splice(_index, 1)
            } else {
                console.log("未找到_index")
            }
        },
    },
    actions: {
        // 获取rainfalllist
        getRainfallList(context) {
            getRainfallList().then(data => {
                let tempData = data.data
                if (tempData.code == 200) {
                    context.commit("SET_RAINFALL", tempData.data)
                }
            })
        },
        // 获取gatestationList
        getGatestationList(context) {
            getGatestationList().then(data => {

                let tempData = data.data
                if (tempData.code == 200) {
                    context.commit("SET_GATESTATION", tempData.data)
                }
            })
        }
    }
})