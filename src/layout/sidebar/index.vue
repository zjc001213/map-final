<template>
  <div class="sidebar">
    <h1>sidebar</h1>
    <sidebar-item
      v-for="(route, index) in router"
      :key="index"
      :data="route"></sidebar-item>
  </div>
</template>


<script>
import sidebarItem from "@/layout/sidebar/sidebarItem.vue";
export default {
  name: "SideBar",
  components: {
    sidebarItem,
  },
  computed: {
    router() {
      // filter router
      let filter = ["/", "/demo"];
      const filtered_router = this.$router.options.routes.reduce(
        (result, route) => {
          if (filter.indexOf(route.path) < 0) {
            result.push(route);
          }
          return result;
        },
        []
      );
      // console.log("filtered_router", filtered_router);

      return filtered_router;
    },
  },
  mounted() {
    // console.log(this.$router.options.routes);
  },
};
</script>

<style scoped>
.sidebar {
  width: 210px;
  background: orange;
  height: 100%;
}
</style>