<template>
  <div class="layout">
    <div class="navbar">
      <h1>防洪调度系统</h1>
    </div>

    <div class="main-container">
      <sidebar class="sidebar" ></sidebar>
      <app-main class="app-main"></app-main>
    </div>
  </div>
</template>

<script>
import sidebar from "@/layout/sidebar/index.vue";
import AppMain from "@/layout/AppMain.vue";
export default {
  components: {
    sidebar,
    AppMain,
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  /* background: #6D67E4; */
  background: rgba(109, 103, 228, 1);
  line-height: 60px;
  text-align: center;
  color: white;

}
.layout {
  width: 100%;
  height: 100%;
  background: #434242;
}
.main-container {
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background: greenyellow;
}

.sidebar {
  /* flex-grow: 1; */
}
.app-main {
  flex-grow: 1;
  /* float: left; */
}
</style>