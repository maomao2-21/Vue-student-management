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
        title: "学校列表",
        action: "/api/school",
        searchFormItem: [
          { type: "text", prop: "Keywords", label: "关键字", span: 12 },
          {
            type: "daterange",
            prop: "CreatedTime",
            label: "创建时间",
            span: 12,
          },
          { type: "area", prop: "AreaIds", label: "地区", span: 12 },
        ],
        titleBtns: [
          {
            type: "drawer",
            theme: "primary",
            icon: "el-icon-plus",
            label: "添加",
            drawer: "form",
            power: "SystemMgr_School_Post",
          },
          {
            type: "import",
            theme: "primary",
            icon: "el-icon-plus",
            label: "导入Excel",
            action: "/api/school/import-excel",
            template: "/api/school/download-excel-template",
            power: "SystemMgr_School_ImportExcel",
          },
        ],
        rowBtns: [
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_School_Get",
          },
          {
            type: "drawer",
            theme: "warning",
            icon: "el-icon-edit",
            label: "编辑",
            drawer: "form",
            power: "SystemMgr_School_Put",
          },
        ],
        batchBtns: [
          {
            type: "api",
            theme: "danger",
            icon: "el-icon-delete",
            label: "删除",
            method: "delete",
            action: "/api/school",
            power: "SystemMgr_School_Delete",
          },
        ],
        columns: [
          { prop: "Code", label: "标识码" },
          { prop: "Name", label: "名称" },
          { prop: "Area", label: "地区" },
          { prop: "Address", label: "地址" },
        ],
        check: true,
        index: true,
        drawers: [
          {
            name: "detail",
            type: "detail",
            action: "/api/school",
            show: false,
            id: undefined,
            items: [
              { prop: "Name", label: "名称", type: "text", span: 24 },
              { prop: "Code", label: "标识码", type: "text", span: 24 },
              { prop: "Area", label: "地区", type: "text", span: 24 },
              { prop: "Address", label: "学校地址", type: "text", span: 24 },
              { prop: "Leader", label: "行政负责人", type: "text", span: 24 },
              {
                prop: "LeaderJob",
                label: "行政负责人职务",
                type: "text",
                span: 24,
              },
              {
                prop: "OrganizerType",
                label: "举办者类型",
                type: "text",
                span: 24,
              },
              {
                prop: "EducationType",
                label: "办学类型",
                type: "text",
                span: 24,
              },
              {
                prop: "PartyGovernmentLeaderJob",
                label: "党政负责人职务",
                type: "text",
                span: 24,
              },
              {
                prop: "PartyGovernmentLeader",
                label: "党政负责人",
                type: "text",
                span: 24,
              },
              { prop: "Telephone", label: "办公电话", type: "text", span: 24 },
              { prop: "PostalCode", label: "邮政编码", type: "text", span: 24 },
              { prop: "AreaCode", label: "区号", type: "text", span: 24 },
              { prop: "Fax", label: "传真", type: "text", span: 24 },
            ],
          },
          {
            name: "form",
            type: "form",
            action: "/api/school",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Name",
                label: "名称",
                type: "text",
                required: true,
                max: 512,
                span: 24,
              },
              {
                prop: "Code",
                label: "标识码",
                type: "text",
                max: 128,
                span: 24,
              },
              {
                prop: "AreaIds",
                label: "地区",
                type: "area",
                span: 24,
              },
              {
                prop: "Address",
                label: "学校地址",
                type: "text",
                max: 512,
                span: 24,
              },
              {
                prop: "Leader",
                label: "行政负责人",
                type: "text",
                max: 256,
                span: 24,
              },
              {
                prop: "LeaderJob",
                label: "行政负责人职务",
                type: "text",
                max: 256,
                span: 24,
              },
              {
                prop: "OrganizerType",
                label: "举办者类型",
                type: "text",
                max: 128,
                span: 24,
              },
              {
                prop: "EducationType",
                label: "办学类型",
                type: "text",
                max: 128,
                span: 24,
              },
              {
                prop: "PartyGovernmentLeaderJob",
                label: "党政负责人职务",
                type: "text",
                max: 256,
                span: 24,
              },
              {
                prop: "PartyGovernmentLeader",
                label: "党政负责人",
                type: "text",
                max: 256,
                span: 24,
              },
              {
                prop: "Telephone",
                label: "办公电话",
                type: "text",
                max: 64,
                span: 24,
              },
              {
                prop: "PostalCode",
                label: "邮政编码",
                type: "text",
                max: 64,
                span: 24,
              },
              {
                prop: "AreaCode",
                label: "区号",
                type: "text",
                max: 64,
                span: 24,
              },
              { prop: "Fax", label: "传真", type: "text", max: 64, span: 24 },
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