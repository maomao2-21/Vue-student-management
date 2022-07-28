<template>
  <div class="SubWebPage">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      size="normal"
    >
      <div>
        <el-card
          shadow="always"
          :body-style="{ padding: '20px' }"
          style="margin-bottom: 15px"
        >
          <div slot="header">
            <span>更改密码</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="原密码" prop="Password">
                <el-input
                  v-model="form.Password"
                  type="password"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="新密码" prop="NewPassword">
                <el-input
                  v-model="form.NewPassword"
                  type="password"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="确认密码" prop="NewPasswordAgain">
                <el-input
                  v-model="form.NewPasswordAgain"
                  type="password"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item>
                <el-button type="primary" @click="handleSubmit">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    handleSubmit() {
      var that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          that.$post("/api/auth/re-password", that.form).then(function (r) {
            
          });
        } else {
          return false;
        }
      });
    },
  },
  data() {
    return {
      /** 表单数据 */
      form: {
        Password: null,
        NewPassword: null,
        NewPasswordAgain: null,
      },
      /** 表单校验 */
      rules: {
        Password: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^[0-9a-zA-Z\x21-\x7e]{5,24}$/.test(value)) {
                return callback(
                  new Error("密码只能由字母、数字、标点符号组成的5~24位字符！")
                );
              } else {
                callback();
              }
            },
          },
        ],
        NewPassword: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^[0-9a-zA-Z\x21-\x7e]{5,24}$/.test(value)) {
                return callback(
                  new Error("密码只能由字母、数字、标点符号组成的5~24位字符！")
                );
              } else {
                callback();
              }
            },
          },
        ],
        NewPasswordAgain: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^[0-9a-zA-Z\x21-\x7e]{5,24}$/.test(value)) {
                return callback(
                  new Error("密码只能由字母、数字、标点符号组成的5~24位字符！")
                );
              } else if (value != this.form.NewPassword) {
                return callback(new Error("两次密码不一致！"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="css" scoped="scoped">
</style>