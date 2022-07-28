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
        title: "学生扣分记录",
        action: "/api/student-deduct-point-record",
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
            power: "StudentThing_DeductPointRecord_Post",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "StudentThing_DeductPointRecord_Put",
          },
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "StudentThing_DeductPointRecord_Get",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/student-deduct-point-record",
            power: "StudentThing_DeductPointRecord_Delete",
          },
        ],
        columns: [
          {
            prop: "StudentDeductPointRecordMultiples_StudentName",
            label: "学生",
            nesting: true,
            title: true,
          },
          { prop: "Reason", label: null, pipe: "editor" },
          { prop: "Score", label: "分数" },
          {
            prop: "CreatedTime",
            label: "记录时间",
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
            action: "/api/student-deduct-point-record",
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
                prop: "SchoolClassName",
                label: "班级",
                type: "text",
                span: 12,
              },
              {
                prop: "StudentDeductPointRecordMultiples_StudentName",
                nesting: true,
                label: "学生",
                type: "text",
                span: 12,
              },
              {
                prop: "Score",
                label: "分数",
                type: "text",
                span: 12,
              },
              {
                prop: "Reason",
                label: "原因",
                type: "editor",
                span: 24,
              },
              {
                prop: "StudentDeductPointRecordFileStorages",
                label: "附件",
                type: "files",
                span: 24,
              },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/student-deduct-point-record",
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
                refresh: ["StudentId"],
              },
              {
                prop: "StudentDeductPointRecordMultiples_StudentId",
                nesting: true,
                label: "学生",
                type: "select",
                required: true,
                span: 12,
                action: "/api/student/dropdown-box",
                params: { $classId: "SchoolClassId" },
                options: [],
                multiple: true,
                loading: false,
              },
              {
                prop: "Score",
                label: "分数",
                type: "text",
                required: true,
                pattern: /^([+-]?[1-9]\d*|0)$/,
                patternMsg: "请输入整数！",
                span: 12,
              },
              {
                prop: "Reason",
                label: "原因",
                type: "editor",
                required: true,
                max: 10240,
                span: 24,
              },
              {
                prop: "StudentDeductPointRecordFileStorages_FileStorageId",
                nesting: true,
                label: "附件",
                type: "files",
                action: "/api/file-storage/upload/StudentEverydayBehavior",
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