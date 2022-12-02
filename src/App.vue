<template>
  <div id="app">
    <layout />
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import layout from '@/layout/index.vue'
export default {
  name: "App",
  components: {layout},
};
</script>

<style>
#app {
  display: inline-block;
  width: 100%;
  height: 100vh;
  background: red;
}
</style>
