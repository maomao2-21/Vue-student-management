<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      size="normal"
    >
      <div class="form-body">
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <el-form-item label="头像" prop="PhotoFileStorageId">
              <div>
                <el-upload
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
                  action=""
                  :multiple="false"
                  :show-file-list="false"
                  :auto-upload="true"
                  :before-upload="handleBeforeUploadPhoto"
                  :http-request="handleUploadPhoto"
                >
                  <el-image
                    v-if="form.PhotoFileStoragePathShow"
                    style="width: 100px; height: 100px; border-radius: 50%"
                    :src="form.PhotoFileStoragePathShow"
                    fit="cover"
                  ></el-image>
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="工号" prop="Code">
              <el-input v-model="form.Code" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="姓名" prop="Name">
              <el-input v-model="form.Name" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item
              label="按地区搜索学校"
              class="inputItem"
              style="text-align: left"
            >
              <comArea
                @handleChange="handleChange"
                :ids="form.AreaIds"
                :len="2"
              ></comArea>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="学校" prop="SchoolName" class="inputItem">
              <el-autocomplete
                style="width: 100%"
                v-model="form.SchoolName"
                :fetch-suggestions="handleQuerySearch"
                placeholder="请选择"
                value-key="Name"
                value="Id"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="20" class="form-footer">
        <el-col :span="12" :offset="0">
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import comArea from "@/components/Area";
export default {
  components: { comArea },
  created() {},
  mounted() {
    let that = this;
    this.$get("/api/school/school-allow-create-dropdown-box", { scene: "Register" }).then(
      (res) => {
        that.schools = res;
      }
    );
    this.$get("/api/auth", null).then(function (r) {
      if (r) {
        that.form.PhotoFileStorageId = r.PhotoFileStorageId;
        if (r.PhotoFileStorageId) {
          that.form.PhotoFileStoragePath = r.PhotoFileStoragePath;
          that.form.PhotoFileStoragePathShow = that.baseURL + r.PhotoFileStoragePath;
        }
        that.form.Account = r.Account;
        that.form.Code = r.Code;
        that.form.Name = r.Name;
        that.form.SchoolName = r.SchoolName;
      }
    });
  },
  methods: {
    handleChange() {
      this.form.SchoolName = null;
      let that = this;
      let data = {
        provinceareaid: this.form.AreaIds[0],
        cityareaid: this.form.AreaIds[1],
        areaid: this.form.AreaIds[2],
        scene: "Register",
      };
      this.$get("/api/school/school-allow-create-dropdown-box", data).then((res) => {
        that.schools = res;
      });
    },
    handleQuerySearch(queryString, cb) {
      let data = queryString
        ? this.schools.filter((v) => {
            console.log(v.Name.toLowerCase());
            console.log(queryString.toLowerCase());
            return (
              v.Name &&
              v.Name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
            );
          })
        : this.schools;
      cb(data);
    },
    handleBeforeUploadPhoto(file) {
      if (file.type.indexOf("image/") == -1) {
        this.$message.error("上传照片只能是 图片 格式!");
        return false;
      }
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error("上传照片大小不能超过 2MB!");
        return false;
      }
      return true;
    },
    handleUploadPhoto(res) {
      let that = this;
      const data = new FormData();
      data.append("file", res.file);
      this.$post("/api/file-storage/upload/UserPhoto", data).then(function (r) {
        that.form.PhotoFileStorageId = r.Id;
        that.form.PhotoFileStoragePath = r.Path;
        that.form.PhotoFileStoragePathShow = that.baseURL + r.Path;
      });
    },
    handleSubmit() {
      var that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          that.$put("/api/auth", that.form).then(function (r) {
            localStorage.setItem("loginData", JSON.stringify(r));
            that.$emit("handleSubmit");
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
        PhotoFileStorageId: null,
        PhotoFileStoragePath: null,
        PhotoFileStoragePathShow: null,
        Code: null,
        Name: null,
        AreaIds: [],
        SchoolName: null,
      },
      schools: [],
      /** 表单校验 */
      rules: {
        Code: [
          { required: true, message: "必填", trigger: "blur" },
          {
            max: 256,
            message: "文本长度不能超过 256 个字符",
            trigger: "blur",
          },
        ],
        Name: [
          { required: true, message: "必填", trigger: "blur" },
          {
            max: 256,
            message: "文本长度不能超过 256 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style lang="css" scoped="scoped">
</style>