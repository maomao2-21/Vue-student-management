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
        <el-col :span="24" :offset="0">
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
        <el-col :span="24" :offset="0">
          <el-form-item label="班级" prop="SchoolClassId">
            <lazy-select
              ref="form_SchoolClassId"
              :form="form"
              prop="SchoolClassId"
              action="/api/school-class/dropdown-box"
              :immediate="true"
              :refresh="['StudentId']"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="类型" prop="Type">
            <lazy-select
              ref="form_Type"
              :form="form"
              prop="Type"
              :options="typeOptions"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0" v-if="form.Type == 20">
          <el-form-item
            label="委员名称"
            prop="StudentExcellentCadreCommitteeName"
          >
            <lazy-select
              :key="1"
              ref="form_StudentExcellentCadreCommitteeName"
              :form="form"
              prop="StudentExcellentCadreCommitteeName"
              action="/api/student-excellent-cadre/committee-dropdown-box"
              :allowcreate="true"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0" v-if="form.Type == 30">
          <el-form-item label="课程名称" prop="CurriculumName">
            <lazy-select
              :key="2"
              ref="form_CurriculumName"
              :form="form"
              prop="CurriculumName"
              action="/api/student-excellent-cadre/curriculum-dropdown-box"
              :allowcreate="true"
            ></lazy-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="学生" prop="StudentIds">
            <lazy-select
              ref="form_StudentIds"
              :form="form"
              prop="StudentIds"
              action="/api/student/dropdown-box"
              :params="{ $classid: 'SchoolClassId' }"
              :loading="false"
              :multiple="form.Type != 10"
            ></lazy-select>
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
  data() {
    return {
      form: {
        SemesterId: null,
        SchoolClassId: null,
        Type: null,
        StudentExcellentCadreCommitteeName: null,
        CurriculumName: null,
        StudentIds: [],
      },
      rules: {
        SemesterId: [{ required: true, message: "必填", trigger: "change" }],
        SchoolClassId: [{ required: true, message: "必填", trigger: "change" }],
        StudentIds: [{ required: true, message: "必填", trigger: "change" }],
        Type: [{ required: true, message: "必填", trigger: "change" }],
        StudentExcellentCadreCommitteeName: [
          { required: true, message: "必填", trigger: "change" },
        ],
        CurriculumName: [
          { required: true, message: "必填", trigger: "change" },
        ],
      },
      typeOptions: [
        { Id: 10, Name: "班长" },
        { Id: 11, Name: "副班长" },
        { Id: 20, Name: "委员" },
        { Id: 30, Name: "课代表" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      let that = this;
      if (this.form.Type == 10) {
        this.form.StudentIds = [this.form.StudentIds];
      }
      this.$post("/api/student-excellent-cadre", this.form).then((r) => {
        that.$emit("handleSubmit");
      });
    },
  },
};
</script>

<style lang="sass">

</style>