<template>
  <el-form :model="form" ref="form" label-width="120px" size="normal">
    <div class="form-body" style="bottom: 10px">
      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>品德评语</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="学期">
              <span>{{ form.SemesterName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="班级">
              <span>{{ form.StudentSchoolClassName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="学生">
              <span>{{ form.StudentName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="等第">
              <span v-if="form.Level == 1">优秀</span>
              <span v-else-if="form.Level == 2">良好</span>
              <span v-else-if="form.Level == 3">及格</span>
              <span v-else-if="form.Level == 4">不及格</span>
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
          <span slot="label"><i class="el-icon-date"></i> 惩处记录</span>
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
          <el-col :span="24" :offset="0">
            <el-form-item label="评语">
              <span v-html="form.Comment"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-form>
</template>

<script>
import moment from "moment/moment";
import SimpleTableList from "@/components/SimpleTableList.vue";
export default {
  components: { SimpleTableList },
  props: {
    id: String,
  },
  data() {
    return {
      title: "",
      size: "80%",
      form: {
        SemesterName: null,
        StudentSchoolClassName: null,
        StudentName: null,
        Level: null,
        Comment: null,
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
  created() {
    let that = this;
    if (this.id) {
      this.$get("/api/student-moral-comment/" + this.id).then(function (r) {
        if (r) {
          that.form.SemesterName = r.SemesterName;
          that.form.StudentSchoolClassName = r.StudentSchoolClassName;
          that.form.StudentName = r.StudentName;
          that.form.Level = r.Level;
          that.form.Comment = r.Comment;

          if (r.StudentId) {
            let data = {};
            if (r.SemesterId) {
              data.SemesterId = r.SemesterId;
            }
            if (r.SchoolClassId) {
              data.SchoolClassId = r.StudentSchoolClassId;
            }
            data.StudentId = r.StudentId;
            data.PageSize = 1000;
            that
              .$get("/api/student-moral-comment/student-achievement", data)
              .then(function (rr) {
                that.tableStudentAchievement = rr.Items;
              });
            that
              .$get(
                "/api/student-moral-comment/student-punishments-record",
                data
              )
              .then(function (rr) {
                that.tableStudentPunishmentsRecord = rr.Items;
              });
            that
              .$get("/api/student-moral-comment/student-reward-record", data)
              .then(function (rr) {
                that.tableStudentRewardRecord = rr.Items;
              });
            that
              .$get("/api/student-moral-comment/student-excellent-cadre", data)
              .then(function (rr) {
                that.tableStudentExcellentCadre = rr.Items;
              });
            that
              .$get("/api/student-moral-comment/student-honor", data)
              .then(function (rr) {
                that.tableStudentHonor = rr.Items;
              });
          } else {
            that.tableStudentAchievement = [];
            that.tableStudentPunishmentsRecord = [];
            that.tableStudentRewardRecord = [];
            that.tableStudentExcellentCadre = [];
            that.tableStudentHonor = [];
          }
        }
      });
    }
  },
};
</script>

<style lang="scss">
</style>