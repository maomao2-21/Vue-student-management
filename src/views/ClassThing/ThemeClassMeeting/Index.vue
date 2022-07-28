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
        title: "主题班会",
        action: "/api/class-meeting",
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
            refresh: ["Week"],
          },
          {
            type: "select",
            prop: "Week",
            label: "周",
            action: "/api/semester/week-dropdown-box",
            params: { $id: "SemesterId" },
            options: [],
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
            power: "ClassThing_ThemeClassMeeting_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "ClassThing_ThemeClassMeeting_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "ClassThing_ThemeClassMeeting_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/class-meeting",
            power: "ClassThing_ThemeClassMeeting_Delete",
          },
        ],
        columns: [
          { prop: "Title", label: "班课课题" },
          { prop: "WeekText", label: "时间", width: "70px" },
          { prop: "NumberSection", label: "课节", width: "50px" },
          { prop: "TotalSection", label: "节数", width: "50px" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/class-meeting",
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
                prop: "Title",
                label: "班课课题",
                type: "text",
                span: 24,
              },
              {
                prop: "Objective",
                label: "本课目的",
                type: "editor",
                span: 24,
              },
              {
                prop: "Form",
                label: "本课形式",
                type: "editor",
                span: 24,
              },
              {
                prop: "ProcessDesign",
                label: "过程设计",
                type: "editor",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/class-meeting",
            show: false,
            id: undefined,
            size: "80%",
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
                refresh: ["Week"],
              },
              {
                type: "select",
                prop: "Week",
                label: "周",
                required: true,
                span: 12,
                action: "/api/semester/week-dropdown-box",
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
                prop: "NumberSection",
                label: "课节",
                type: "text",
                required: true,
                pattern: /^([1-9]\d*)$/,
                patternMsg: "请输入正整数！",
                span: 12,
              },
              {
                prop: "TotalSection",
                label: "节数",
                type: "text",
                required: true,
                pattern: /^([1-9]\d*)$/,
                patternMsg: "请输入正整数！",
                span: 12,
              },
              {
                prop: "Title",
                label: "班课课题",
                type: "text",
                required: true,
                max: 10240,
                span: 24,
              },
              {
                prop: "Objective",
                label: "本课目的",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "Form",
                label: "本课形式",
                type: "editor",
                max: 10240,
                span: 24,
              },
              {
                prop: "ProcessDesign",
                label: "过程设计",
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