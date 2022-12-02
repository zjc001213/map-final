<template>
  <div class="sidebar-item">
    <router-link :to="data.path" >
      {{ data.meta && data.meta.title }}
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
  height: 96px;
}
</style>