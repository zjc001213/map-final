<template>
  <div class="sidebar-item">
    <router-link :to="data.path">
      <div class="router-item" style="margin-left: -10px">
        <i :class="data.meta.icon" style="width: 24px;"></i>
        {{ data.meta && data.meta.title }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
      require: true,
    },
  },
};
</script>


<style scoped>
.sidebar-item {
  /* height: 96px; */
}

.router-item {
  height: 45px;
  line-height: 45px;
  width: 100%;
  font-size: 24px;
  text-align: center;
  text-decoration: none;
  color: white;

  transform: all 3s;
}
.router-item:hover {
  background: #556170;
}
</style>