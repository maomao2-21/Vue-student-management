<!--
  网站抬头
-->
<template>
  <div
    class="divHeaderBox clearfix"
    style="background-color: #406ad3; color: #fff; font-weight: bold"
  >
    <!--快捷按钮-->
    <div class="divFastCont clearfix">
      <a class="aFastList VerticalMid">
        <span v-if="options.length == 1">{{ logier.SchoolName }}</span>

        <el-select
          v-model="logier.SchoolId"
          v-else
          clearable
          filterable
          placeholder="请选择学校"
          @change="handleSwitchSchool"
        >
          <el-option
            v-for="item in options"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id"
          >
          </el-option>
        </el-select>
      </a>
      <a v-if="logier.PhotoFileStoragePath" class="aFastList VerticalMid">
        <el-image
          style="width: 30px; height: 30px; border-radius: 50%"
          :src="logier.PhotoFileStoragePath"
          fit="cover"
        ></el-image>
      </a>
      <a v-else class="aFastList VerticalMid">
        <comAvatar :gender="'男'" :imgClass="'teachAvatar'" />
      </a>
      <a
        class="aFastList VerticalMid"
        style="justify-content: left"
      >
        {{ logier.Name }}
      </a>
      <span class="aFastList VerticalMid" title="注销" @click="toLogin" style="margin-right: calc(2.51rem - 0.9375rem);">
        <svg class="icon faxIcon" aria-hidden="true">
          <use xlink:href="#fax-logout-o"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import comAvatar from "@/components/Avatar.vue";
export default {
  components: {
    comAvatar,
  },
  created() {
    let that = this;
    this.$get("/api/school/logier-school", null).then(function (r) {
      that.options = r;
      if (r.length == 1) {
        that.logier.SchoolId = r[0].Id;
        that.logier.SchoolName = r[0].Name;
      } else {
        for (let i = 0; i < r.length; i++) {
          const element = r[i];
          if (element.Id == that.logier.SchoolId) {
            that.logier.SchoolId = element.Id;
            that.logier.SchoolName = element.Name;
          }
        }
      }
    });
  },
  data() {
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    let logier = {};
    logier.SchoolId = loginData.SchoolId;
    logier.SchoolName = loginData.SchoolName;
    logier.Name = loginData.Name;
    if (loginData.PhotoFileStoragePath) {
      logier.PhotoFileStoragePath =
        this.baseURL + loginData.PhotoFileStoragePath;
    }
    return {
      logier: logier,
      options: [],
    };
  },
  methods: {
    handleSwitchSchool(val) {
      let that = this;
      this.$post("/api/auth/switch-school?schoolId=" + val, null).then(
        function (r) {
          localStorage.setItem("loginData", JSON.stringify(r));
          that.$emit("handleSwitchSchool");
        }
      );
    },
    toLogin() {
      localStorage.clear();

      this.$router.push("/Login");
    },
  },
};
</script>

<style scoped="scoped">
.divHeaderBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5.3125rem; /*85px*/
  background-color: #ffffff;
  border-bottom: 1px solid #dee2e6;
  z-index: 1;
}
.divHeaderBox .divSearchBox {
  background-color: #f2f4f6;
  top: 0.9375rem; /*15px*/
  height: 3.125rem; /*50px*/
  width: 23.75rem; /*380px*/
  left: 16.25rem; /*260px*/
  border-radius: 0.25rem; /*4px*/
  position: absolute;
}
.divHeaderBox .divSearchBox .txtSearch {
  background-color: transparent;
  height: 3.125rem; /*50px*/
  width: 20rem; /*320px*/
  border: none;
  padding: 0rem 1.25rem 0rem 1.875rem; /*0px 20px 0px 30px*/
  color: #999999;
}
.divHeaderBox .divSearchBox .abtnSearch {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 3.75rem; /*60px*/
  font-size: 1.375rem; /*22px*/
  color: #0f0f0f;
}
.divHeaderBox .divFastCont {
  position: absolute;
  right: 0.9375rem; /*15px*/
  top: 0.625rem; /*10px*/
}
.divHeaderBox .divFastCont .aFastList {
  float: left;
  height: 3.75rem; /*60px*/
  margin-left: 1.25rem; /*20px*/
  position: relative;
}
.divHeaderBox .divFastCont .aFastList .faxIcon {
  font-size: 1.625rem; /*26px*/
  color: #bdc5d1;
}
.divHeaderBox .divFastCont .aFastList .faxIcon:hover {
  color: #23a3f8;
}
.divHeaderBox .divFastCont .aFastList .spNum {
  background-color: #ff5f5f;
  color: #ffffff;
  font-size: 0.75rem; /*12px*/
  position: absolute;
  top: 0.625rem; /*10px*/
  right: 0.625rem; /*10px*/
  width: 1.25rem; /*20px*/
  height: 1.25rem; /*20px*/
  border-radius: 50%;
}
.VerticalMid {
  cursor: pointer;
}
</style>

<style>
.webDefault .divFastCont .teachAvatar {
  width: 1.875rem; /*30px*/
  height: 1.875rem; /*30px*/
}
</style>
