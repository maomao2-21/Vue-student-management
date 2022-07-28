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
          <span>品德评语</span>
        </div>
        <el-row :gutter="20">
          <el-col :lg="12" :md="24" :offset="0">
            <el-form-item label="学期" prop="SemesterId">
              <lazy-select
                ref="form_SemesterId"
                :form="form"
                prop="SemesterId"
                action="/api/semester/dropdown-box"
                :immediate="true"
                @handleSelectChange="searchTable"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24" :offset="0">
            <el-form-item label="班级" prop="StudentSchoolClassId">
              <lazy-select
                ref="form_StudentSchoolClassId"
                :form="form"
                prop="StudentSchoolClassId"
                action="/api/school-class/dropdown-box"
                :immediate="true"
                :refresh="['StudentId']"
                @handleSelectChange="searchTable"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24" :offset="0">
            <el-form-item label="学生" prop="StudentId">
              <lazy-select
                ref="form_StudentId"
                :form="form"
                prop="StudentId"
                action="/api/student/dropdown-box"
                :params="{ $classid: 'StudentSchoolClassId' }"
                @handleSelectChange="searchTable"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="24" :offset="0">
            <el-form-item label="等第" prop="Level">
              <lazy-select
                ref="form_Level"
                :form="form"
                prop="Level"
                :options="[
                  { Id: 1, Name: '优秀' },
                  { Id: 2, Name: '良好' },
                  { Id: 3, Name: '及格' },
                  { Id: 4, Name: '不及格' },
                ]"
              ></lazy-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-tabs type="border-card" style="margin-bottom: 15px">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 学生成绩</span>
          <simple-table-list
            :data="tableStudentAchievement"
            :columns="columnsStudentAchievement"
          ></simple-table-list>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 处分记录</span>
          <simple-table-list
            :data="tableStudentPunishmentsRecord"
            :columns="columnsStudentPunishmentsRecord"
          ></simple-table-list>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 奖励记录</span>
          <simple-table-list
            :data="tableStudentRewardRecord"
            :columns="columnsStudentRewardRecord"
          ></simple-table-list>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 优秀干部</span>
          <simple-table-list
            :data="tableStudentExcellentCadre"
            :columns="columnsStudentExcellentCadre"
          ></simple-table-list>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 各项荣誉</span>
          <simple-table-list
            :data="tableStudentHonor"
            :columns="columnsStudentHonor"
          ></simple-table-list>
        </el-tab-pane>
      </el-tabs>
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>评语</span>
        </div>
        <el-row :gutter="20">
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="评语" prop="Comment">
              <Editor
                :form="form"
                prop="Comment"
                @blur="validateField('Comment')"
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
        Level: null,
        Comment: null,
      },
      /** 表单校验 */
      rules: {
        SemesterId: [{ required: true, message: "必填", trigger: "change" }],
        StudentSchoolClassId: [
          { required: true, message: "必填", trigger: "change" },
        ],
        StudentId: [{ required: true, message: "必填", trigger: "change" }],
        Level: [{ required: true, message: "必填", trigger: "change" }],
        Comment: [{ required: true, message: "必填", trigger: "blur" }],
      },
      tableStudentAchievement: [],
      tableStudentPunishmentsRecord: [],
      tableStudentRewardRecord: [],
      tableStudentExcellentCadre: [],
      tableStudentHonor: [],
      columnsStudentAchievement: [
        {
          prop: "Type",
          label: "类型",
          pipe: "enum",
          pipeArgs: [
            { Id: 1, Name: "平时" },
            { Id: 2, Name: "期中" },
            { Id: 3, Name: "期末" },
            { Id: 4, Name: "总评" },
          ],
        },
        { prop: "CurriculumName", label: "课程" },
        { prop: "Score", label: "成绩" },
      ],
      columnsStudentPunishmentsRecord: [
        { prop: "Reason", label: "扣分原因", pipe: "editor" },
        {
          prop: "CreatedTime",
          label: "扣分时间",
          pipe: "date",
          pipeArgs: ["YYYY-MM-DD hh:mm"],
        },
        { prop: "Score", label: "分值" },
      ],
      columnsStudentRewardRecord: [
        { prop: "Name", label: "奖项名称" },
        {
          prop: "CreatedTime",
          label: "时间",
          pipe: "date",
          pipeArgs: ["YYYY-MM-DD hh:mm"],
        },
      ],
      columnsStudentExcellentCadre: [
        { prop: "Name", label: "干部名称" },
        {
          prop: "CreatedTime",
          label: "当选时间",
          pipe: "date",
          pipeArgs: ["YYYY-MM-DD hh:mm"],
        },
      ],
      columnsStudentHonor: [
        { prop: "Name", label: "荣誉名称" },
        {
          prop: "CreatedTime",
          label: "获得时间",
          pipe: "date",
          pipeArgs: ["YYYY-MM-DD hh:mm"],
        },
      ],
    };
  },
  mounted() {
    let that = this;
    if (this.id) {
      this.$get("/api/student-moral-comment/" + this.id, null).then(function (
        r
      ) {
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
          that.form.Level = r.Level;
          if (r.Level) {
            that.$refs.form_Level.handleSelectFocus();
          }
          that.form.Comment = r.Comment;
          that.searchTable();
        }
      });
    }
  },
  methods: {
    validateField(prop) {
      this.$refs.form.validateField(prop);
    },
    handleSubmit() {
      var that = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          var request = that.id ? that.$put : that.$post;
          request("/api/student-moral-comment/", that.form).then(function (r) {
            that.$emit("handleSubmit");
          });
        } else {
          return false;
        }
      });
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
        this.$get("/api/student-moral-comment/student-achievement", data).then(
          function (r) {
            that.tableStudentAchievement = r.Items;
          }
        );
        this.$get(
          "/api/student-moral-comment/student-punishments-record",
          data
        ).then(function (r) {
          that.tableStudentPunishmentsRecord = r.Items;
        });
        this.$get(
          "/api/student-moral-comment/student-reward-record",
          data
        ).then(function (r) {
          that.tableStudentRewardRecord = r.Items;
        });
        this.$get(
          "/api/student-moral-comment/student-excellent-cadre",
          data
        ).then(function (r) {
          that.tableStudentExcellentCadre = r.Items;
        });
        this.$get("/api/student-moral-comment/student-honor", data).then(
          function (r) {
            that.tableStudentHonor = r.Items;
          }
        );
      } else {
        that.tableStudentAchievement = [];
        that.tableStudentPunishmentsRecord = [];
        that.tableStudentRewardRecord = [];
        that.tableStudentExcellentCadre = [];
        that.tableStudentHonor = [];
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