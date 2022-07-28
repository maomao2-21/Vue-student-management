<template>
  <div>
    <template v-for="(item, index) in Menus" :index="index">
      <el-submenu
        :key="item.Name"
        :index="item.Link ? item.Link : item.Name"
        v-if="item.Childrens != 0"
      >
        <template slot="title">
          <span style="margin-right: 10px" v-if="item.Icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.Icon"></use>
            </svg>
          </span>
          {{ item.Name }}
        </template>

        <menuList :Menus="item.Childrens"></menuList>
      </el-submenu>

      <el-menu-item
        :index="item.Link ? item.Link : item.Name"
        :key="item.Name"
        v-else
        @click="bind12(item.Link)"
      >
          <span style="margin-right: 10px" v-if="item.Icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.Icon"></use>
            </svg>
          </span>
          {{ item.Name }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuList",
  props: {
    Menus: Array,
  },
  created() {},
  methods: {
    bind12(Link) {
      if (Link) {
        var logierData = JSON.parse(localStorage.getItem("loginData")).RoleCode;

        this.$router.replace({ path: `${Link}` });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>