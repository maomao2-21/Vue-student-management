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
        type: "card",
        span: 24,
        title: "学期活动计划",
        action: "/api/class-semester-activity-plan",
        searchFormItem: [
          {
            type: "select",
            prop: "SemesterId",
            label: "学期",
            action: "/api/semester/dropdown-box",
            options: [],
            immediate: true,
            loading: false,
            span: 8,
            refresh: ["Weeks"],
          },
          {
            type: "select",
            prop: "Weeks",
            label: "周",
            action: "/api/semester/double-week-dropdown-box",
            params: { $id: "SemesterId" },
            options: [],
            loading: false,
            span: 8,
          },
          {
            type: "select",
            prop: "SchoolClassId",
            label: "班级",
            immediate: true,
            action: "/api/school-class/dropdown-box",
            options: [],
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
            power: "ClassThing_SemesterActivityPlan_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "ClassThing_SemesterActivityPlan_Put",
          },
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "ClassThing_SemesterActivityPlan_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/class-semester-activity-plan",
            power: "ClassThing_SemesterActivityPlan_Delete",
          },
        ],
        columns: [
          { prop: "WeekText", label: "周", title: true },
          { prop: "Content", label: null, pipe: "editor" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/class-semester-activity-plan",
            show: false,
            id: undefined,
            size: "80%",
            items: [
              {
                prop: "SemesterName",
                label: "学期",
                type: "text",
                span: 12,
              },
              {
                prop: "WeekText",
                label: "周",
                type: "text",
                span: 12,
              },
              {
                prop: "SchoolClassName",
                label: "班级",
                type: "text",
                span: 12,
              },
              {
                prop: "CreatedTime",
                label: "创建时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm"],
                span: 12,
              },
              {
                prop: "Content",
                label: "主要活动计划",
                type: "editor",
                span: 24,
              },
              {
                prop: "Remark",
                label: "备注",
                type: "editor",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/class-semester-activity-plan",
            show: false,
            id: undefined,
            size: "80%",
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
                refresh: ["Weeks"],
              },
              {
                prop: "Weeks",
                label: "周",
                type: "select",
                required: true,
                span: 24,
                action: "/api/semester/double-week-dropdown-box",
                params: { $id: "SemesterId" },
                options: [],
                loading: false,
              },
              {
                prop: "SchoolClassId",
                label: "班级",
                type: "select",
                required: true,
                span: 24,
                action: "/api/school-class/dropdown-box",
                options: [],
                immediate: true,
                loading: false,
              },
              {
                prop: "Content",
                label: "主要活动计划",
                type: "editor",
                required: true,
                max: 10240,
                span: 24,
              },
              {
                prop: "Remark",
                label: "备注",
                type: "editor",
                max: 10240,
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