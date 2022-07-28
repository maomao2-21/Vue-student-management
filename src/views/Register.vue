<template>
  <div class="loginContBox">
    <div class="logoBox">
      <div class="logo">
        <img src="@/assets/image/Login/logo_white_500.png" height="100%" />
      </div>
      <div class="name">
        <div class="title">班主任工作手册</div>
        <div class="http">www.oknb.net</div>
      </div>
    </div>
    <div class="loginBody">
      <div class="loginImg">
        <img src="@/assets/image/Login/img_login.png" height="100%" />
      </div>
      <div class="loginControl">
        <div class="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#fax-circle-left"></use>
          </svg>
          <span>注册</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#fax-circle-right"></use>
          </svg>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
        >
          <el-form-item label="" prop="PhoneNumber" class="inputItem">
            <el-input
              placeholder="手机号码"
              v-model="ruleForm.PhoneNumber"
              class="txtInput"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="VerifyCode" class="inputItem">
            <el-input
              placeholder="验证码"
              v-model="ruleForm.VerifyCode"
              class="txtInput"
              style="width: calc(100% - 130px)"
            >
            </el-input>
            <el-button
              style="width: 120px; margin-left: 10px"
              type="primary"
              @click="getCaptcha"
            >
              {{ currSecord == 0 ? "发送验证码" : currSecord + "s" }}
            </el-button>
          </el-form-item>
          <el-form-item label="" class="inputItem" style="text-align: left">
            <comArea
              @handleChange="handleChange"
              :ids="form"
              :len="2"
            ></comArea>
          </el-form-item>
          <el-form-item label="" prop="SchoolName" class="inputItem">
            <el-autocomplete
              style="width: 100%"
              v-model="ruleForm.SchoolName"
              :fetch-suggestions="handleQuerySearch"
              placeholder="请选择学校"
              value-key="Name"
              value="Id"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="" prop="Name" class="inputItem">
            <el-input
              placeholder="姓名"
              v-model="ruleForm.Name"
              class="txtInput"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="Password" class="inputItem">
            <el-input
              show-password
              auto-complete="new-password"
              placeholder="密码"
              v-model="ruleForm.Password"
              @blur="validatePassword"
              class="txtInput"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="RePassword" class="inputItem">
            <el-input
              show-password
              auto-complete="new-password"
              placeholder="确认密码"
              v-model="ruleForm.RePassword"
              @blur="validatePassword"
              class="txtInput"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <div class="loginBtn">
            <el-button
              type="primary"
              size="medium"
              class="btnLogin"
              @click="register"
              >注册</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
    <div class="footer">
      Copyright 2009-2029 © 尧瑶科技 All rights reserved
      <a href="https://beian.miit.gov.cn/" target="_blank">
        浙ICP备09099185号-5
      </a>
    </div>
  </div>
</template>

<script>
import comArea from "@/components/Area";
import LazySelect from "@/components/LazySelect";
import formValidation from "../assets/js/formValidation.js";
import "@/assets/css/Login.css";
export default {
  components: { comArea, LazySelect },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      form: [],
      school: [],
      value: "",
      schoolSelect: null,
      currSecord: 0,
      ruleForm: {
        PhoneNumber: null,
        VerifyCode: null,
        SchoolName: null,
        Name: null,
        Password: null,
        RePassword: null,
        AnonymousId: null,
      },
      rules: {
        PhoneNumber: [
          {
            required: true,
            validator: formValidation.valMobile,
            msg: "请输入正确的手机号。",
            trigger: "blur",
          },
        ],
        Password: [
          {
            required: true,
            validator: formValidation.Password,
            msg: "请输入密码",
            trigger: "blur",
          },
        ],
        RePassword: [
          {
            required: true,
            validator: formValidation.Password,
            msg: "请输入密码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (this.ruleForm.Password != value) {
                return callback(new Error("两次密码不一致！"));
              } else {
                callback();
              }
            },
          },
        ],
        Name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            max: 9,
            message: "姓名过长",
            trigger: "blur",
          },
        ],
        SchoolName: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: "change",
          },
          {
            max: 60,
            message: "学校名称过长",
            trigger: "blur",
          },
        ],
        VerifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "请正确输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    let that = this;
    this.$get("/api/school/school-dropdown-box", { scene: "Register" }).then(
      (res) => {
        that.school = res;
      }
    );
  },
  methods: {
    handleQuerySearch(queryString, cb) {
      let data = queryString
        ? this.school.filter((v) => {
            console.log(v.Name.toLowerCase());
            console.log(queryString.toLowerCase());
            return (
              v.Name &&
              v.Name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
            );
          })
        : this.school;
      cb(data);
    },
    validatePassword() {
      this.$refs.ruleForm.validateField("Password");
      this.$refs.ruleForm.validateField("RePassword");
    },
    getCaptcha(val) {
      let that = this;
      if (!this.ruleForm.PhoneNumber) {
        this.$message({
          icon: "none",
          message: "请输入手机号",
        });
      } else if (this.currSecord == 0) {
        that
          // `/api/sms-log/send-verify-code/${this.data.PhoneNumber}`
          .$post(`/api/log-sms/send-verify-code/${this.ruleForm.PhoneNumber}`)
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
    register() {
      let that = this;
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单");
        }
        that.$post("/api/auth/register", this.ruleForm).then((res) => {
          that.$router.push("/Login");
        });
      });
    },
    handleChange(ids) {
      this.ruleForm.SchoolName = null;
      let that = this;
      let data = {
        provinceareaid: ids[0],
        cityareaid: ids[1],
        areaid: ids[2],
        scene: "Register",
      };
      this.$get("/api/school/school-dropdown-box", data).then((res) => {
        that.school = res;
      });
    },
  },
};
</script>

<style scoped="scoped">
.loginBody {
  background: #406ad3;
  width: 100%;
  height: calc(100vh);
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.loginImg {
  height: 600px;
  margin-right: 5%;
}

.loginControl {
  margin-left: 5%;
  background-color: #ffffff;
  width: 410px;
  height: 650px;
  border-radius: 0.3125rem;
}

.loginControl .title {
  margin-top: 1.875rem;
  color: #406ad3;
  text-align: center;
  padding-top: 0.9375rem;
  margin-bottom: 3rem;
}
.loginControl .title span {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  font-size: 1.25rem;
  color: #000000;
}
.loginControl .inputItem {
  text-align: center;
  margin-left: 4.0625rem;
  margin-right: 4.0625rem;
  /* margin-bottom: 0.9375rem; */
}
.loginControl .inputItem .txtInput {
}

.loginControl .loginBtn {
  text-align: center;
  margin-left: 4.0625rem;
  margin-right: 4.0625rem;
}

.loginControl .btnLogin {
  font-size: 0.875rem;
  width: 100%;
  background-color: #406ad3;
  margin-bottom: 0.3125rem;
  margin-top: 0.9375rem;
}
.loginControl .loginLink {
  margin-left: 4.0625rem;
  margin-right: 4.0625rem;
}
.loginControl .loginLink .alogin {
  font-size: 0.75rem;
  color: #767676;
}

.loginContBox {
  display: flex;
  height: 100%;
  color: #ffffff;
}
.logoBox {
  position: fixed;
  top: 1.875rem;
  left: 1.875rem;
  display: flex;
}
.logoBox .logo {
  height: 2.5rem; /*40*/
  border-right: 1px solid #ffffff;
  padding-right: 0.9375rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.logoBox .name {
  padding-left: 0.9375rem;
}
.logoBox .title {
  text-align: center;
}
.logoBox .http {
  font-size: 0.875rem;
  text-align: center;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2.5rem;
  background-color: #395fbf;
  text-align: center;
  font-size: 0.75rem;
  line-height: 2.5rem;
}
.footer a {
  color: #ffffff;
  font-size: 0.75rem;
  margin-left: 0.3125rem;
}
</style>
