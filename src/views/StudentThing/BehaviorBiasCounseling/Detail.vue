<template>
  <el-form :model="form" ref="form" label-width="120px" size="normal">
    <div class="form-body" style="bottom: 10px">
      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>辅导信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="学期">
              <span>{{ form.SemesterName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-form-item label="班级">
              <span>{{ form.StudentSchoolClassName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-form-item label="学生">
              <span>{{ form.StudentName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="主要偏常行为">
              <span v-html="form.BehaviorBias"></span>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="主要优点">
              <span v-html="form.Excellent"></span>
            </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
            <el-form-item label="家庭情况简要">
              <span v-html="form.FamilySummary"></span>
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
        <el-table :data="table" border stripe>
          <!-- 数据列 -->
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="handleTableFormatter"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
      </el-card>
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>辅导及转化情况</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <el-form-item label="辅导人">
              <span>{{ form.StudentName }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="24"
            :offset="0"
            v-for="(item, index) in form.StudentBehaviorBiasTutorContents"
            :key="index"
          >
            <el-form-item label="辅导内容">
              <span v-html="item.Content"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-form>
</template>

<script>
import moment from "moment/moment";
export default {
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
        BehaviorBias: null,
        Excellent: null,
        FamilySummary: null,
        Tutor: null,
        StudentBehaviorBiasTutorContents: null,
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
  created() {
    let that = this;
    if (this.id) {
      this.$get("/api/student-behavior-bias-tutor/" + this.id).then(function (
        r
      ) {
        if (r) {
          that.form.SemesterName = r.SemesterName;
          that.form.StudentSchoolClassName = r.StudentSchoolClassName;
          that.form.StudentName = r.StudentName;
          that.form.BehaviorBias = r.BehaviorBias;
          that.form.Excellent = r.Excellent;
          that.form.FamilySummary = r.FamilySummary;
          that.form.Tutor = r.Tutor;
          that.form.StudentBehaviorBiasTutorContents =
            r.StudentBehaviorBiasTutorContents;

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
              .$get("/api/student-behavior-bias-tutor/punishments-record", data)
              .then(function (rr) {
                that.table = rr.Items;
              });
          }
        }
      });
    }
  },
  methods: {
    handleTableFormatter(row, column, cellValue, index) {
      if (column.property == "CreatedTime") {
        if (cellValue == "0001-01-01T00:00:00+00:00") {
          cellValue = "--";
        } else {
          cellValue = moment(cellValue).format("YYYY-MM-DD hh:mm:ss");
        }
      }
      return cellValue;
    },
  },
};
</script>

<style lang="scss">
</style>