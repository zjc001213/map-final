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

            }).catch(e => {
                console.log("未获得数据")
                const rainList = [
                    {
                        name: 'Mount Tai', longitude: "127.0926", latitude: "25.678"
                    }, {
                        name: 'Mount Tai', longitude: "127.10926", latitude: "25.567"
                    }, {
                        name: 'Mount Tai', longitude: "127.678", latitude: "24.678"
                    }, {
                        name: 'Mount Tai', longitude: "127.678", latitude: "24.678"
                    }, {
                        name: 'Mount Tai', longitude: "123.678", latitude: "24.5467"
                    }, {
                        name: 'Mount Tai', longitude: "127.5453632", latitude: "24.675678"
                    }, {
                        name: 'Mount Tai', longitude: "127.123123", latitude: "24.5675"
                    }, {
                        name: 'Mount Tai', longitude: "127.12512", latitude: "24.123123"
                    }, {
                        name: 'Mount Tai', longitude: "127.61231258", latitude: "24.12356"
                    }, {
                        name: 'Mount Tai', longitude: "127.23115", latitude: "24.521231"
                    }, {
                        name: 'Mount Tai', longitude: "127.2131", latitude: "24.12554236534"
                    }, {
                        name: 'Mount Tai', longitude: "127.1366", latitude: "24.845352"
                    }, {
                        name: 'Mount Tai', longitude: "127.1236712", latitude: "24.123567"
                    }
                ]

                context.commit("SET_RAINFALL", rainList)
            })
        },
        // 获取gatestationList
        getGatestationList(context) {
            getGatestationList().then(data => {

                let tempData = data.data
                if (tempData.code == 200) {
                    context.commit("SET_GATESTATION", tempData.data)
                }
            }).catch(e => {
                const gatenList = [
                    {
                        name: 'Mount Tai', longitude: "126.0926", latitude: "23.678"
                    }, {
                        name: 'Mount Tai', longitude: "126.10926", latitude: "23.567"
                    }, {
                        name: 'Mount Tai', longitude: "126.678", latitude: "22.678"
                    }
                ]

                context.commit("SET_GATESTATION", gatenList)
            })
        }
    }
})