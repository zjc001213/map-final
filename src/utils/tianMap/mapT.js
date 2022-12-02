
export default {
    init() {
        return new Promise((resolve, reject) => {
            if (window.T) {
                console.log('地图初始化成功')
                resolve(window.T)
            }
        })
    }
}