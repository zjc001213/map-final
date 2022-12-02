<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
.app-main {
  flex-grow: 1;
  position: relative;
  background: white;

  overflow-x: hidden;
  overflow-y: scroll;
}
</style>