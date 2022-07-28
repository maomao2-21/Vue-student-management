<!--
  左侧菜单
-->
<template>
  <div class="divMenuBox" id="menuBox">
    <!--LOGO-->
    <div
      class="divLogo VerticalMid"
      style="font-size: 20px; color: rgb(64, 106, 211)"
    >
      <!-- <img src="@/assets/image/logo.png" /> -->
      班主任工作手册
    </div>

    <el-menu unique-opened ref="menu" :default-active="defaultActive">
      <!-- <el-menu unique-opened> -->
      <!-- <el-menu unique-opened> -->
      <menuList :Menus="Menus"></menuList>
    </el-menu>
  </div>
</template>

<script>
import menuList from "./menuList.vue";
export default {
  components: { menuList },
  created() {
    this.Menus = JSON.parse(localStorage.getItem("loginData")).Menus;
  },
  mounted() {
    this.defaultActive = this.$route.path;
  },
  data() {
    return {
      defaultActive: null,
      Menus: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
  updated() {},
};
</script>

<style scoped="scoped">
.menuIndex {
  display: block;
}
.divMenuBox {
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 13.75rem; /*220px*/
  min-height: 43.75rem; /*700px*/
  background-color: #ffffff;
  z-index: 2;
  -moz-box-shadow: 0 0.875rem 1.75rem rgba(0, 0, 0, 0.25),
    0 0.625rem 0.625rem rgba(0, 0, 0, 0.22) !important; /*0 14px 28px | 0 10px 10px*/
  -webkit-box-shadow: 0 0.875rem 1.75rem rgba(0, 0, 0, 0.25),
    0 0.625rem 0.625rem rgba(0, 0, 0, 0.22) !important; /*0 14px 28px | 0 10px 10px*/
  box-shadow: 0 0.875rem 1.75rem rgba(0, 0, 0, 0.25),
    0 0.625rem 0.625rem rgba(0, 0, 0, 0.22) !important; /*0 14px 28px | 0 10px 10px*/
}
.divMenuBox .divLogo {
  padding: 0.9375rem; /*15px*/
  height: 5.3125rem; /*85px*/
  border-bottom: 1px solid #dee2e6;
}
.divMenuBox .divLogo img {
  width: 70%;
}
.divMenuBox .divMenuList {
}
.divMenuBox .divLineCont {
  height: 0.0625rem; /*1px*/
  width: 100%;
  margin: 0.9375rem; /*15px*/
  background-color: #f8f8f8;
}
.divMenuBox .MenuTitle {
  position: relative;
  font-size: 16px;
  color: #343a40;
  cursor: pointer;
  margin: 10px;
  padding: 5px 5px 5px 50px;
}
.divMenuBox .MenuTitleAct {
  border: 1px solid #307bff;
  border-radius: 4px;
  background-color: #307bff;
  color: #ffffff;
}
.divMenuBox .MenuTitle:hover {
  color: #212529;
  background-color: #e5e5e5;
}
.divMenuBox .MenuTitleAct:hover {
  background-color: #307bff;
  color: #ffffff;
}

.divMenuBox .MenuTitle >>> .spIcon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2.5rem; /*40px*/
}
.divMenuBox .MenuTitle >>> .spIcon i {
  line-height: 2rem; /*32px*/
  height: 1rem; /*16px*/
}
.divMenuBox .MenuTitle >>> .spArr {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  color: #343a40;
  font-size: 12px;
}
.divMenuBox .MenuTitleAct >>> .spArr {
  color: #ffffff;
  animation: myfirst 5s;
  -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
  transform: rotate(-90deg);
}

.divMenuBox .subMenuCont .abtnMenu {
  display: block;
  color: #777777; /*4C4C51;*/
  font-size: 14px;
}
.divMenuBox .subMenuCont >>> .abtnAct {
  border-radius: 4px;
  background-color: #e5e5e5;
  color: #212529;
}
.divMenuBox .subMenuCont >>> .abtnAct .spArr {
  animation: myfirst 5s;
  -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
  transform: rotate(-90deg);
}

.divMenuBox .subMenuCont .abtnMenu >>> .spSubTitle {
  display: block;
  margin: 5px 10px;
  padding: 5px 5px 5px 50px;
  font-size: 14px;
  position: relative;
}
.divMenuBox .subMenuCont .abtnMenu >>> .spSubTitle .spArr {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  font-size: 12px;
}
.divMenuBox .subMenuCont .abtnMenu >>> .spSubTitle:hover {
  background-color: #e5e5e5;
  color: #212529;
}

.divMenuBox .subMenuCont .abtnMenu .spTreeview {
  display: none;
}
.divMenuBox .subMenuCont .abtnTreeview .spTreeview {
  display: block;
}
.divMenuBox .subMenuCont .abtnTreeview .abtnThrMenu {
  display: block;
  font-size: 12px;
  padding: 5px 5px 5px 65px;
  color: #767676;
  margin: 2px 10px;
}
.divMenuBox .subMenuCont .abtnTreeview .abtnThrMenu:hover {
  color: #212529;
}
.divMenuBox .subMenuCont .abtnTreeview .abtnThrAct {
  color: #307bff;
}
</style>
