<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      size="normal"
    >
      <el-row :gutter="20" class="form-body">
        <el-col :lg="12" :md="12" :sm="24" :offset="0">
          <el-form-item label="学期" prop="SemesterId">
            <lazy-select
              ref="form_SemesterId"
              :form="form"
              prop="SemesterId"
              action="/api/semester/dropdown-box"
              :immediate="true"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :offset="0">
          <el-form-item label="班级" prop="StudentSchoolClassId">
            <lazy-select
              ref="form_StudentSchoolClassId"
              :form="form"
              prop="StudentSchoolClassId"
              action="/api/school-class/dropdown-box"
              :immediate="true"
              @handleSelectChange="handleSelectChange"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :offset="0">
          <el-form-item label="类型" prop="Type">
            <lazy-select
              ref="form_Type"
              :form="form"
              prop="Type"
              :options="[
                { Id: 1, Name: '平时' },
                { Id: 2, Name: '期中' },
                { Id: 3, Name: '期末' },
                { Id: 4, Name: '总评' },
              ]"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="12" :sm="24" :offset="0">
          <el-form-item label="课程" prop="CurriculumId">
            <lazy-select
              ref="form_CurriculumId"
              :form="form"
              prop="CurriculumId"
              action="/api/student-achievement/curriculum-dropdown-box"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col
          v-for="item in form.Items"
          :key="item.StudentId"
          :lg="12"
          :md="12"
          :sm="24"
          :offset="0"
        >
          <el-form-item :label="item.StudentName" prop="Score">
            <el-input v-model="item.Score" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
import LazySelect from "@/components/LazySelect.vue";
export default {
  components: { LazySelect },
  methods: {
    handleSelectChange(v) {
      let that = this;
      this.form.Items.splice(0, this.form.Items.length);
      if (v) {
        this.$get("/api/student/dropdown-box", { classid: v }).then(function (
          r
        ) {
          for (let i = 0; i < r.length; i++) {
            const element = r[i];
            that.form.Items.push({
              StudentId: element.Id,
              StudentName: element.Name,
              Score: null,
            });
          }
        });
      }
    },
    /** 提交表单 */
    handleSubmit() {
      var that = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          let items = that.form.Items.filter((v) => v.Score);
          if (items.length == 0) {
            that.$message.error("请填写学生成绩!");
            return;
          }
          that.form.Items = items;
          that
            .$post("/api/student-achievement/batch", that.form)
            .then(function (r) {
              that.$emit("handleSubmit", that.form);
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
        SemesterId: null,
        StudentSchoolClassId: null,
        Type: null,
        CurriculumId: null,
        Items: [],
      },
      /** 表单校验 */
      rules: {
        SemesterId: [{ required: true, message: "必填", trigger: "change" }],
        StudentSchoolClassId: [
          { required: true, message: "必填", trigger: "change" },
        ],
        Type: [{ required: true, message: "必填", trigger: "change" }],
        CurriculumId: [{ required: true, message: "必填", trigger: "change" }],
      },
    };
  },
};
</script>

<style lang="sass">
</style>