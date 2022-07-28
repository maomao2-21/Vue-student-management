<template>
  <div class="SubWebPage">
    <el-form :model="form" ref="form" label-width="120px" size="normal">
      <div>
        <el-card
          shadow="always"
          :body-style="{ padding: '20px' }"
          style="margin-bottom: 15px"
        >
          <div slot="header">
            <span>个人信息</span>
            <pow-button
              type="title"
              class="table-card-btn"
              :options="editBtn"
              @handleOpenDrawer="handleOpenDrawer"
              @handleRefresh="search"
              @handleCustomBtnClick="handleCustomBtnClick"
            ></pow-button>
          </div>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="头像">
                <div
                  style="
                    width: 100px;
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                    font-size: 32px;
                    background-color: #eee;
                    color: #999;
                    border-radius: 50%;
                  "
                >
                  <el-image
                    v-if="form.PhotoFileStoragePath"
                    style="width: 100px; height: 100px; border-radius: 50%"
                    :src="form.PhotoFileStoragePath"
                    fit="cover"
                  ></el-image>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="账号">
                <span>{{ form.Account }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="姓名">
                <span>{{ form.Name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="工号">
                <span>{{ form.Code }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="微信小程序">
                <span v-if="form.WxpOpenId"
                  >已绑定
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleUnBind"
                    style="margin-left: 10px"
                    >解绑</el-button
                  ></span
                >
                <span v-else>未绑定 </span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="角色">
                <span v-for="item in form.UserRoles" :key="item.RoleName">{{
                  item.RoleName
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="学校">
                <span>{{ form.SchoolName }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-form>
    <el-drawer
      title="编辑个人信息"
      :visible.sync="formShow"
      direction="rtl"
      size="40%"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <form-page :key="formIndex" @handleSubmit="handleSubmit"></form-page>
    </el-drawer>
  </div>
</template>

<script>
import PowButton from "@/components/PowButton.vue";
import FormPage from "./Form.vue";
export default {
  components: { PowButton, FormPage },
  data() {
    return {
      formShow: false,
      formIndex: 0,
      form: {
        PhotoFileStoragePath: null,
        Account: null,
        Code: null,
        Name: null,
        WxpOpenId: null,
        UserRoles: null,
        SchoolName: null,
      },
      editBtn: {
        type: "custom",
        theme: "warning",
        icon: "el-icon-edit",
        label: "编辑",
      },
    };
  },
  methods: {
    search() {
      let that = this;
      this.$get("/api/auth", null).then(function (r) {
        if (r.PhotoFileStorageId) {
          that.form.PhotoFileStoragePath =
            that.baseURL + r.PhotoFileStoragePath;
        }
        that.form.Account = r.Account;
        that.form.Code = r.Code;
        that.form.Name = r.Name;
        that.form.WxpOpenId = r.WxpOpenId;
        that.form.UserRoles = r.UserRoles;
        that.form.SchoolName = r.SchoolName;
      });
    },
    handleUnBind() {
      let that = this;
      this.$post("/api/auth/un-bind", null).then(function (r) {
        that.search();
      });
    },
    handleSubmit() {
      this.formShow = false;
      location.reload();
    },
    handleOpenDrawer() {
      this.formIndex++;
    },
    handleCustomBtnClick(btn, row, index) {
      if (btn.label == "编辑") {
        this.formShow = true;
      }
    },
  },
  created() {
    this.search();
  },
};
</script>

<style lang="sass">
.table-card-btn
  float: right
  margin-right: 5px
</style>