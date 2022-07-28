<template>
  <div class="SubWebPage">
    <simple-search-form
      ref="searchForm"
      :items="items"
      @search="search"
    ></simple-search-form>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- 卡片标题 -->
      <div slot="header" class="">
        <span>班干部的设置</span>
        <pow-button
          v-for="btn in btns"
          :key="btn.label"
          type="title"
          class="table-card-btn"
          :options="btn"
          @handleRefresh="search"
          @handleCustomBtnClick="handleCustomBtnClick"
        ></pow-button>
      </div>
      <el-form :model="form" ref="form" label-width="120px" size="normal">
        <div style="bottom: 10px">
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="班长">
                <span v-if="$sysPow('StudentMgr_ExcellentCadre_Post')">
                  <el-select
                    key="Monitor"
                    v-model="form.MonitorId"
                    value-key="Id"
                    placeholder="请选择"
                    clearable
                    filterable
                    @change="handleSelectChange($event, 10, form.Monitor)"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="student in students"
                      :key="student.Id"
                      :label="student.Name"
                      :value="student.Id"
                    >
                    </el-option>
                  </el-select>
                </span>
                <span v-else>{{ form.Monitor }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="副班长">
                <span v-if="$sysPow('StudentMgr_ExcellentCadre_Post')">
                  <el-select
                    key="DeputyMonitor"
                    v-model="form.DeputyMonitorIds"
                    value-key="Id"
                    placeholder="请选择"
                    clearable
                    filterable
                    :multiple="true"
                    @change="handleSelectChange($event, 11, form.DeputyMonitor)"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="student in students"
                      :key="student.Id"
                      :label="student.Name"
                      :value="student.Id"
                    >
                    </el-option>
                  </el-select>
                </span>
                <span v-else>{{ form.DeputyMonitors }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-row :gutter="20">
                <el-col
                  :span="24"
                  :offset="0"
                  v-for="item in committees"
                  :key="item.Id"
                >
                  <el-form-item
                    :label="item.Name"
                    v-if="
                      form.Committees &&
                      ($sysPow('StudentMgr_ExcellentCadre_Post') ||
                        form.Committees[item.Id])
                    "
                  >
                    <span v-if="$sysPow('StudentMgr_ExcellentCadre_Post')">
                      <el-select
                        v-model="form.CommitteeIds[item.Id]"
                        value-key="Id"
                        placeholder="请选择"
                        clearable
                        filterable
                        :multiple="true"
                        @change="handleSelectChange($event, 20, item.Id)"
                        style="width: calc(100% - 120px)"
                      >
                        <el-option
                          v-for="student in students"
                          :key="student.Id"
                          :label="student.Name"
                          :value="student.Id"
                        >
                        </el-option>
                      </el-select>
                    </span>
                    <span v-else>{{ form.Committees[item.Id] }}</span>
                    <el-button
                      v-if="$sysPow('StudentMgr_ExcellentCadre_Put')"
                      style="margin-left: 20px"
                      type="warning"
                      size="mini"
                      icon="el-icon-edit"
                      @click="handleReName(20, item.Id, item.Name)"
                    ></el-button>
                    <el-button
                      v-if="$sysPow('StudentMgr_ExcellentCadre_Delete')"
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="handleRemove(20, item.Id)"
                    ></el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-row :gutter="20">
                <el-col
                  :span="24"
                  :offset="0"
                  v-for="item in curriculums"
                  :key="item.Id"
                >
                  <el-form-item
                    :label="item.Name + '课代表'"
                    v-if="
                      form.Curriculums &&
                      ($sysPow('StudentMgr_ExcellentCadre_Post') ||
                        form.Curriculums[item.Id])
                    "
                  >
                    <span v-if="$sysPow('StudentMgr_ExcellentCadre_Post')">
                      <el-select
                        v-model="form.CurriculumIds[item.Id]"
                        value-key="Id"
                        placeholder="请选择"
                        clearable
                        filterable
                        :multiple="true"
                        @change="handleSelectChange($event, 30, item.Id)"
                        style="width: calc(100% - 120px)"
                      >
                        <el-option
                          v-for="student in students"
                          :key="student.Id"
                          :label="student.Name"
                          :value="student.Id"
                        >
                        </el-option>
                      </el-select>
                    </span>
                    <span v-else>{{ form.Curriculums[item.Id] }}</span>
                    <el-button
                      v-if="$sysPow('StudentMgr_ExcellentCadre_Put')"
                      style="margin-left: 20px"
                      type="warning"
                      size="mini"
                      icon="el-icon-edit"
                      @click="handleReName(30, item.Id, item.Name)"
                    ></el-button>
                    <el-button
                      v-if="$sysPow('StudentMgr_ExcellentCadre_Delete')"
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="handleRemove(30, item.Id)"
                    ></el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>

    <el-drawer
      title="添加"
      :visible.sync="formShow"
      direction="rtl"
      :append-to-body="true"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <Form :key="formKey" @handleSubmit="search"></Form>
    </el-drawer>
  </div>
</template>

<script>
import Vue from "vue";
import SimpleSearchForm from "@/components/SimpleSearchForm.vue";
import PowButton from "@/components/PowButton.vue";
import Form from "./Form.vue";
export default Vue.extend({
  components: { SimpleSearchForm, PowButton, Form },
  mounted() {
    this.wait();
  },
  methods: {
    handleReName(type, id, name) {
      let that = this;
      this.$prompt("请填写名称", "重命名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: name,
      })
        .then(({ value }) => {
          let data = {};
          data.Id = id;
          data.Type = type;
          data.Name = value;
          that.$post("/api/student-excellent-cadre/re-name", data).then((r) => {
            that.search();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消重命名",
          });
        });
    },
    handleRemove(type, id) {
      let that = this;
      let data = {};
      data.Id = id;
      data.Type = type;
      this.$delete("/api/student-excellent-cadre", data).then((r) => {
        that.search();
      });
    },
    handleCustomBtnClick() {
      this.formShow = true;
      this.formKey++;
    },
    handleSelectChange(v, type, id) {
      let that = this;
      let data = {};
      this.$refs.searchForm.setQuery(data);
      if (type == 10 && !v) {
        data.StudentIds = [];
      } else if (type == 10 && v) {
        data.StudentIds = [v];
      } else {
        data.StudentIds = v;
      }
      data.Type = type;
      if (data.Type == 20) {
        data.StudentExcellentCadreCommitteeId = id;
      } else if (data.Type == 30) {
        data.CurriculumId = id;
      }
      if (!data.SemesterId) {
        this.$message({
          type: "info",
          message: "请选择学期！",
        });
        return;
      }
      if (!data.SchoolClassId) {
        this.$message({
          type: "info",
          message: "请选择班级！",
        });
        return;
      }
      this.$post("/api/student-excellent-cadre", data).then((r) => {
        that.search();
      });
    },
    wait() {
      let that = this;
      if (
        this.$refs.searchForm.form.SemesterId_load &&
        this.$refs.searchForm.form.SchoolClassId_load
      ) {
        this.search();
      } else {
        setTimeout(function () {
          that.wait();
        }, 100);
      }
    },
    search() {
      this.formShow = false;
      let that = this;
      this.committees_load = false;
      this.curriculums_load = false;
      this.$get(
        "/api/student-excellent-cadre/committee-dropdown-box",
        null
      ).then((r) => {
        that.committees = r;
        that.committees_load = true;
      });

      this.$get(
        "/api/student-excellent-cadre/curriculum-dropdown-box",
        null
      ).then((r) => {
        that.curriculums = r;
        that.curriculums_load = true;
      });

      this.$get("/api/student/dropdown-box", {
        classid: this.$refs.searchForm.form.SchoolClassId,
      }).then((r) => (that.students = r));

      this.waitList();
    },
    waitList() {
      let that = this;
      if (this.committees_load && this.curriculums_load) {
        this.searchList();
      } else {
        setTimeout(function () {
          that.waitList();
        }, 100);
      }
    },
    searchList() {
      let that = this;
      let route = this.$route;
      let query = JSON.parse(JSON.stringify(route.query));
      this.$refs.searchForm.setQuery(query);
      this.$router.push({ path: route.path, query: query });
      this.$get("/api/student-excellent-cadre", query).then((r) => {
        let form = {};
        form.Committees = {};
        form.CommitteeIds = {};
        form.Curriculums = {};
        form.CurriculumIds = {};
        // 班长
        if (r.Monitor) {
          form.MonitorId = r.Monitor.StudentId;
          form.Monitor = r.Monitor.StudentName;
        } else {
          form.MonitorId = null;
          form.Monitor = null;
        }
        // 副班长
        if (r.DeputyMonitor) {
          form.DeputyMonitorIds = r.DeputyMonitor.map((v) => v.StudentId);
          form.DeputyMonitors = r.DeputyMonitor.map((v) => v.StudentName).join(
            ", "
          );
        } else {
          form.DeputyMonitorIds = [];
          form.DeputyMonitors = null;
        }
        // 委员
        for (let i = 0; i < that.committees.length; i++) {
          const element = that.committees[i];
          if (r.Committees[element.Id]) {
            form.CommitteeIds[element.Id] = r.Committees[element.Id].map(
              (v) => v.StudentId
            );
            form.Committees[element.Id] = r.Committees[element.Id]
              .map((v) => v.StudentName)
              .join(", ");
          } else {
            form.CommitteeIds[element.Id] = [];
            form.Committees[element.Id] = null;
          }
        }
        // 课代表
        for (let i = 0; i < that.curriculums.length; i++) {
          const element = that.curriculums[i];
          if (r.Curriculums[element.Id]) {
            form.CurriculumIds[element.Id] = r.Curriculums[element.Id].map(
              (v) => v.StudentId
            );
            form.Curriculums[element.Id] = r.Curriculums[element.Id]
              .map((v) => v.StudentName)
              .join(", ");
          } else {
            form.CurriculumIds[element.Id] = [];
            form.Curriculums[element.Id] = null;
          }
        }
        that.form = form;
      });
    },
  },
  data() {
    return {
      items: [
        {
          prop: "SemesterId",
          label: "学期",
          type: "select",
          required: true,
          span: 12,
          action: "/api/semester/dropdown-box",
          options: [],
          immediate: true,
          loading: false,
        },
        {
          prop: "SchoolClassId",
          label: "班级",
          type: "select",
          required: true,
          span: 12,
          action: "/api/school-class/dropdown-box",
          options: [],
          immediate: true,
          loading: false,
        },
      ],
      committees_load: false,
      curriculums_load: false,
      committees: [],
      curriculums: [],
      students: [],
      form: {},
      btns: [
        {
          type: "custom",
          theme: "primary",
          icon: "el-icon-plus",
          label: "添加",
          drawer: "form",
          power: "StudentMgr_ExcellentCadre_Post",
        },
      ],
      formShow: false,
      formKey: 0,
    };
  },
});
</script>

<style lang="sass">
.table-card-btn
  float: right
  margin-right: 5px
</style>