<template>
  <el-form
    :model="form"
    ref="form"
    :rules="rules"
    label-width="120px"
    size="normal"
  >
    <div class="form-body">
      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>辅导信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="学期" prop="SemesterId">
              <lazy-select
                :ref="'form_SemesterId'"
                :form="form"
                prop="SemesterId"
                action="/api/semester/dropdown-box"
                :immediate="true"
                @handleSelectChange="searchTable"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="班级" prop="StudentSchoolClassId">
              <lazy-select
                :ref="'form_StudentSchoolClassId'"
                :form="form"
                prop="StudentSchoolClassId"
                action="/api/school-class/dropdown-box"
                :immediate="true"
                :refresh="['StudentId']"
                @handleSelectChange="searchTable"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="学生" prop="StudentId">
              <lazy-select
                :ref="'form_StudentId'"
                :form="form"
                prop="StudentId"
                action="/api/student/dropdown-box"
                :params="{ $classid: 'StudentSchoolClassId' }"
                @handleSelectChange="searchTable"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="主要偏常行为" prop="BehaviorBias">
              <Editor
                :form="form"
                prop="BehaviorBias"
                @blur="validateField('BehaviorBias')"
              ></Editor>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="主要优点" prop="Excellent">
              <Editor
                :form="form"
                prop="Excellent"
                @blur="validateField('Excellent')"
              ></Editor>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="家庭情况简要" prop="FamilySummary">
              <Editor
                :form="form"
                prop="FamilySummary"
                @blur="validateField('FamilySummary')"
              ></Editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>惩处记录</span>
        </div>
        <simple-table-list :data="table" :columns="columns"></simple-table-list>
      </el-card>
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>辅导及转化情况</span>
          <el-button
            type="primary"
            size="mini"
            class="card-btn"
            @click="handleNewStudentBehaviorBiasTutorContents"
            >新增辅导信息</el-button
          >
        </div>
        <el-row :gutter="20">
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="辅导人" prop="Tutor">
              <el-input v-model="form.Tutor" style="width: 100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :lg="24"
            :md="24"
            :offset="0"
            v-for="(item, index) in form.StudentBehaviorBiasTutorContents"
            :key="index"
          >
            <el-form-item
              label="辅导内容"
              prop="StudentBehaviorBiasTutorContents.Content"
            >
              <Editor
                :form="item"
                prop="Content"
              ></Editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-row :gutter="20" class="form-footer">
      <el-col :span="12" :offset="0">
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Editor from "@/components/Editor.vue";
import LazySelect from "@/components/LazySelect.vue";
import SimpleTableList from "@/components/SimpleTableList.vue";
export default {
  components: { Editor, LazySelect, SimpleTableList },
  props: {
    id: String,
  },
  data() {
    return {
      /** 表单数据 */
      form: {
        SemesterId: null,
        StudentSchoolClassId: null,
        StudentId: null,
        BehaviorBias: null,
        Excellent: null,
        FamilySummary: null,
        Tutor: null,
        StudentBehaviorBiasTutorContents: [{ Content: "" }],
      },
      /** 表单校验 */
      rules: {
        SemesterId: [{ required: true, message: "必填", trigger: "change" }],
        StudentSchoolClassId: [
          { required: true, message: "必填", trigger: "change" },
        ],
        StudentId: [{ required: true, message: "必填", trigger: "change" }],
        BehaviorBias: [
          { required: true, message: "必填", trigger: "blur" },
          {
            max: 10240,
            message: "文本长度不能超过 10240 个字符",
            trigger: "blur",
          },
        ],
      },
      table: [],
      columns: [
        { prop: "Number", label: "处分号" },
        { prop: "StudentSchoolClassName", label: "班级名称" },
        { prop: "StudentName", label: "姓名" },
        { prop: "Reason", label: "原因" },
        { prop: "Type", label: "类型" },
        { prop: "Score", label: "分值" },
        { prop: "CreatedTime", label: "处分时间" },
      ],
    };
  },
  mounted() {
    let that = this;
    if (this.id) {
      this.$get("/api/student-behavior-bias-tutor/" + this.id, null).then(
        function (r) {
          if (r) {
            that.form.Id = r.Id;
            that.form.SemesterId = r.SemesterId;
            if (r.SemesterId) {
              that.$refs.form_SemesterId.handleSelectFocus();
            }
            that.form.StudentSchoolClassId = r.StudentSchoolClassId;
            if (r.StudentSchoolClassId) {
              that.$refs.form_StudentSchoolClassId.handleSelectFocus();
            }
            that.form.StudentId = r.StudentId;
            if (r.StudentId) {
              that.$refs.form_StudentId.handleSelectFocus();
            }
            that.form.BehaviorBias = r.BehaviorBias;
            that.form.Excellent = r.Excellent;
            that.form.FamilySummary = r.FamilySummary;
            that.form.Tutor = r.Tutor;
            if (r.StudentBehaviorBiasTutorContents.length > 0) {
              that.form.StudentBehaviorBiasTutorContents =
                r.StudentBehaviorBiasTutorContents;
            }
          }
        }
      );
    }
  },
  methods: {
    validateField(prop) {
      this.$refs.form.validateField(prop);
    },
    handleSubmit() {
      var that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          var request = that.id ? that.$put : that.$post;
          if (that.form.StudentBehaviorBiasTutorContents.length > 0) {
            that.form.StudentBehaviorBiasTutorContents = that.form.StudentBehaviorBiasTutorContents.filter(
              (v) => v.Content != null && v.Content != ""
            );
          }
          request("/api/student-behavior-bias-tutor", that.form).then(function (
            r
          ) {
            that.$emit("handleSubmit");
          });
        } else {
          return false;
        }
      });
    },
    handleNewStudentBehaviorBiasTutorContents() {
      this.form.StudentBehaviorBiasTutorContents.push({ Content: "" });
    },
    searchTable() {
      let that = this;
      if (this.form.StudentId) {
        let data = {};
        if (this.form.SemesterId) {
          data.SemesterId = this.form.SemesterId;
        }
        if (this.form.SchoolClassId) {
          data.SchoolClassId = this.form.StudentSchoolClassId;
        }
        data.StudentId = this.form.StudentId;
        data.PageSize = 1000;
        this.$get(
          "/api/student-behavior-bias-tutor/punishments-record",
          data
        ).then(function (r) {
          that.table = r.Items;
        });
      } else {
        that.table = [];
      }
    },
  },
};
</script>

<style lang="sass">
.card-btn
  float: right
  margin-right: 5px
</style>