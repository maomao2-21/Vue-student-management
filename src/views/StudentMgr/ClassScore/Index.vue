<template>
  <div class="SubWebPage">
    <!-- 搜索表单 -->
    <el-form :model="form" ref="form" label-width="80px" size="normal">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>搜索</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="学期" prop="SemesterId">
              <lazy-select
                ref="form_SemesterId"
                :form="form"
                prop="SemesterId"
                action="/api/semester/dropdown-box"
                :immediate="true"
                :clearable="false"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级" prop="SchoolClassId">
              <lazy-select
                ref="form_SchoolClassId"
                :form="form"
                prop="SchoolClassId"
                action="/api/school-class/dropdown-box"
                :immediate="true"
                :clearable="false"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col v-show="tab == 'TypeScore'" :span="8">
            <el-form-item label="课程" prop="CurriculumId">
              <lazy-select
                ref="form_CurriculumId"
                :form="form"
                prop="CurriculumId"
                :options="curriculumOptions"
                :clearable="false"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col v-show="tab == 'CurriculumScore'" :span="8">
            <el-form-item label="类型" prop="Type">
              <lazy-select
                ref="form_Type"
                :form="form"
                prop="Type"
                :options="typeOptions"
                :clearable="false"
              ></lazy-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="search-form-btn-panel">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-card>
    </el-form>
    <!-- 列表 -->
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- 卡片标题 -->
      <div slot="header" class="">
        <span>学生成绩</span>
        <span v-for="(item, index) in titleBtns" :key="index">
          <pow-button
            type="title"
            class="table-card-btn"
            :options="item"
            @handleRefresh="search"
            @handleCustomBtnClick="handleCustomBtnClick"
          ></pow-button>
        </span>
      </div>
      <el-tabs
        v-model="tab"
        @tab-click="handleTabClick"
        type="border-card"
        style="margin-bottom: 15px"
      >
        <el-tab-pane
          name="CurriculumScore"
          v-if="$sysPow('StudentMgr_ClassScore_CurriculumScore')"
        >
          <span slot="label"><i class="el-icon-date"></i> 学期成绩汇总</span>
          <simple-table-list
            :data="dataCurriculumScore"
            :columns="columnsCurriculumScore"
          ></simple-table-list>
        </el-tab-pane>
        <el-tab-pane
          name="TypeScore"
          v-if="$sysPow('StudentMgr_ClassScore_TypeScore')"
        >
          <span slot="label"><i class="el-icon-date"></i> 课程成绩</span>
          <simple-table-list
            :data="dataTypeScore"
            :columns="columnsTypeScore"
          ></simple-table-list>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-drawer
      ref="drawerForm"
      title="添加"
      :visible.sync="formShow"
      direction="rtl"
      size="80%"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <form-page @handleSubmit="handleSubmit"></form-page>
    </el-drawer>
  </div>
</template>

<script>
import Vue from "vue";
import LazySelect from "@/components/LazySelect.vue";
import PowButton from "@/components/PowButton.vue";
import SimpleSearchForm from "@/components/SimpleSearchForm.vue";
import SimpleTableList from "@/components/SimpleTableList.vue";
import FormPage from "./Form.vue";
export default Vue.extend({
  components: {
    LazySelect,
    PowButton,
    SimpleSearchForm,
    SimpleTableList,
    FormPage,
  },
  methods: {
    reset() {
      this.form.SemesterId = undefined;
      this.form.SchoolClassId = undefined;
      this.form.Type = undefined;
      this.form.CurriculumId = undefined;
      this.$refs.form_SemesterId.setDefault();
      this.$refs.form_SchoolClassId.setDefault();
      this.$refs.form_Type.setDefault();
      this.$refs.form_CurriculumId.setDefault();
      this.search();
    },
    wait() {
      let that = this;
      if (
        this.form.SemesterId_load &&
        this.form.SchoolClassId_load &&
        this.form.CurriculumId_load
      ) {
        this.search();
      } else {
        setTimeout(function () {
          that.wait();
        }, 100);
      }
    },
    /** 查询 */
    search() {
      let that = this;
      let route = this.$route;
      let query = JSON.parse(JSON.stringify(route.query));
      query["SemesterId"] = this.form.SemesterId;
      query["SchoolClassId"] = this.form.SchoolClassId;
      query["Type"] = this.form.Type;
      query["CurriculumId"] = this.form.CurriculumId;
      query["Tab"] = this.tab;
      this.$router.push({ path: route.path, query: query });
      this.$get("/api/student-achievement/curriculum-score", query).then(
        function (r) {
          that.dataCurriculumScore = r;
        }
      );
      this.$get("/api/student-achievement/type-score", query).then(function (
        r
      ) {
        that.dataTypeScore = r;
      });
    },
    handleSubmit() {
      this.formShow = false;
      this.search();
      this.$refs.drawerForm.closeDrawer();
    },
    handleCustomBtnClick(btn, row, index) {
      if (btn.label == "添加") {
        this.formShow = true;
      }
    },
    handleTabClick(tab, event) {
      let route = this.$route;
      let query = JSON.parse(JSON.stringify(route.query));
      query["Tab"] = tab.name;
      this.$router.push({ path: route.path, query: query });
    },
  },
  mounted() {
    let that = this;
    let query = this.$route.query;
    if (query.SemesterId) {
      this.form.SemesterId = query.SemesterId;
      this.$refs.form_SemesterId.handleSelectFocus();
    }
    if (query.SchoolClassId) {
      this.form.SchoolClassId = query.SchoolClassId;
      this.$refs.form_SchoolClassId.handleSelectFocus();
    }
    if (query.Type) {
      this.form.Type = parseInt(query.Type);
      this.$refs.form_Type.handleSelectFocus();
    } else {
      this.form.Type = 4;
      this.$refs.form_Type.handleSelectFocus();
    }
    this.form.CurriculumId = query.CurriculumId;
    this.$get("/api/student-achievement/curriculum-dropdown-box", null).then(
      function (r) {
        for (let i = 0; i < r.length; i++) {
          const element = r[i];
          that.curriculumOptions.push(element);
          that.columnsCurriculumScore.push({
            prop: "CurriculumScore_" + element.Id,
            label: element.Name,
            nesting: true,
          });
        }
        if (query.CurriculumId) {
          that.$refs.form_CurriculumId.handleSelectFocus();
        } else {
          var defaultOption = r.filter((v) => v.Default);
          if (defaultOption && defaultOption.length > 0) {
            that.form.CurriculumId = defaultOption[0]?.Id;
            that.$refs.form_CurriculumId.handleSelectFocus();
          }
        }
        that.form.CurriculumId_load = true;
      }
    );
    if (query.Tab) {
      this.tab = query.Tab;
    }
    this.wait();
  },
  created() {},
  data() {
    return {
      form: {
        SemesterId: null,
        SchoolClassId: null,
        Type: null,
        CurriculumId: null,
      },
      curriculumOptions: [],
      typeOptions: [
        { Id: 1, Name: "平时" },
        { Id: 2, Name: "期中" },
        { Id: 3, Name: "期末" },
        { Id: 4, Name: "总评", Default: true },
      ],
      tab: "CurriculumScore",
      dataCurriculumScore: [],
      dataTypeScore: [],
      columnsCurriculumScore: [
        { prop: "StudentCode", label: "学号", width: "120px" },
        { prop: "StudentName", label: "姓名", width: "70px" },
      ],
      columnsTypeScore: [
        { prop: "StudentCode", label: "学号", width: "120px" },
        { prop: "StudentName", label: "姓名", width: "70px" },
        { prop: "TypeScore_Normal", label: "平时", nesting: true },
        { prop: "TypeScore_MidTerm", label: "期中", nesting: true },
        { prop: "TypeScore_FinalTerm", label: "期末", nesting: true },
        { prop: "TypeScore_Total", label: "总评", nesting: true },
      ],
      titleBtns: [
        {
          type: "custom",
          theme: "primary",
          icon: "el-icon-plus",
          label: "添加",
          power: "StudentMgr_ClassScore_Post",
        },
        {
          type: "import",
          theme: "primary",
          icon: "el-icon-plus",
          label: "导入",
          action: "/api/student-achievement/import-excel",
          template: "/api/student-achievement/download-excel-template",
          power: "StudentMgr_ClassScore_InportExcel",
        },
      ],
      formShow: false,
    };
  },
});
</script>

<style lang="sass" scoped>
.table-card-btn
  float: right
  margin-right: 5px
</style>