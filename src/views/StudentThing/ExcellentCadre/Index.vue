<template>
  <div class="SubWebPage">
    <simple-page-list :setting="setting"></simple-page-list>
  </div>
</template>

<script>
import Vue from "vue";
import SimplePageList from "@/components/SimplePageList.vue";
export default Vue.extend({
  components: { SimplePageList },
  methods: {},
  data() {
    return {
      setting: {
        title: "优秀干部",
        action: "/api/student-excellent-cadre",
        searchFormItem: [
          { type: "text", prop: "Keywords", label: "关键字", span: 8 },
          {
            type: "select",
            prop: "SemesterId",
            label: "学期",
            action: "/api/semester/dropdown-box",
            options: [],
            immediate: true,
            loading: false,
            span: 8,
          },
          {
            type: "select",
            prop: "SchoolClassId",
            label: "班级",
            action: "/api/school-class/dropdown-box",
            options: [],
            immediate: true,
            loading: false,
            span: 8,
          },
        ],
        titleBtns: [
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "StudentThing_ExcellentCadre_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "StudentThing_ExcellentCadre_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "StudentThing_ExcellentCadre_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student-excellent-cadre",
            power: "StudentThing_ExcellentCadre_Delete",
          },
        ],
        columns: [
          { prop: "StudentSchoolClassName", label: "班级" },
          { prop: "StudentName", label: "学生" },
          { prop: "Name", label: "名称" },
          {
            prop: "CreatedTime",
            label: "日期",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm"],
            width: "140px",
          },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/student-excellent-cadre",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Code",
                label: "编号",
                type: "text",
                span: 12,
              },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                span: 12,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/student-excellent-cadre",
            show: false,
            id: undefined,
            items: [
              {
                prop: "SemesterId",
                label: "学期",
                type: "select",
                required: true,
                span: 24,
                action: "/api/semester/dropdown-box",
                options: [],
                immediate: true,
                loading: false,
              },
              {
                prop: "StudentSchoolClassId",
                label: "班级",
                type: "select",
                required: true,
                span: 24,
                action: "/api/school-class/dropdown-box",
                options: [],
                immediate: true,
                loading: false,
                refresh: ["StudentId"],
              },
              {
                prop: "StudentId",
                label: "学生",
                type: "select",
                required: true,
                span: 24,
                action: "/api/student/dropdown-box",
                params: { $classId: "StudentSchoolClassId" },
                options: [],
                loading: false,
              },
              {
                prop: "Name",
                label: "名称",
                type: "text",
                required: true,
                max: 256,
                span: 24,
              },
            ],
          },
        ],
      },
    };
  },
});
</script>

<style lang="sass" scoped>
</style>