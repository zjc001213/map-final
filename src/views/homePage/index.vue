<template>
  <div>
    <tian-map 
      :rainfall-map="rainfall_map"
      :gatestation-map="gatestation_map"></tian-map>
  </div>
</template>

<script>
import tianMap from "@/components/map/index.vue";
// import { getRainfallList,getGatestationList } from "@/utils/request/index.js";
import {mapGetters} from 'vuex'
export default {
  components: { tianMap },
  data() {
      return {
      }
  },
  computed: {
    ...mapGetters(["rainfall_map","gatestation_map"])
  },
  created() {
    // this.initData()
    // console.log(this.$store)
  },


  methods: {
    initData() {
      getRainfallList().then(data => {
        this.rainfall_map = data.data.data
      })
      getGatestationList().then(data => {
        this.gatestation_map = data.data.data
      })

      
    }
  }
};
</script>


<style scoped>
</style>
