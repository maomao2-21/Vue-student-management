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
            <span>更换手机</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="新手机号" prop="PhoneNumber">
                <el-input
                  v-model="form.PhoneNumber"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="验证码" prop="VerifyCode">
                <el-input
                  v-model="form.VerifyCode"
                  style="width: calc(100% - 130px)"
                ></el-input>
                <el-button
                  style="width: 120px; margin-left: 10px"
                  type="primary"
                  @click="getCaptcha"
                >
                  {{ currSecord == 0 ? "发送验证码" : currSecord + "s" }}
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="24" :offset="0">
              <el-form-item label="密码" prop="Password">
                <el-input
                  v-model="form.Password"
                  type="password"
                  style="width: 100%"
                  show-password
                  auto-complete="new-password"
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
          that
            .$post("/api/auth/change-phone-number", that.form)
            .then(function (r) {
              localStorage.clear();
              that.$router.push("/Login");
            });
        } else {
          return false;
        }
      });
    },
    getCaptcha(val) {
      let that = this;
      if (!this.form.PhoneNumber) {
        this.$message({
          icon: "none",
          message: "请输入手机号",
        });
      } else if (this.currSecord == 0) {
        that
          .$post(`/api/log-sms/send-verify-code/${this.form.PhoneNumber}`)
          .then((res) => {
            that.currSecord = 60;
            that.beginInterval();
          });
      }
    },
    beginInterval() {
      this.currSecord = this.currSecord - 1;
      if (this.currSecord <= 0) {
      } else {
        setTimeout(this.beginInterval, 1000);
      }
    },
  },
  data() {
    return {
      /** 表单数据 */
      form: {
        PhoneNumber: null,
        VerifyCode: null,
        Password: null,
      },
      currSecord: 0,
      /** 表单校验 */
      rules: {
        PhoneNumber: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^1[0-9]{10}$/.test(value)) {
                return callback(new Error("请填写正确的手机号码！"));
              } else {
                callback();
              }
            },
          },
        ],
        VerifyCode: [
          { required: true, message: "必填", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^[0-9]{6}$/.test(value)) {
                return callback(new Error("请填写正确的验证码！"));
              } else {
                callback();
              }
            },
          },
        ],
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
      },
    };
  },
};
</script>

<style lang="css" scoped="scoped">
</style>