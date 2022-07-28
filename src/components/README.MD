<template>
  <div class="SubWebPage">
    <!-- 组件 -->
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
      // 组件配置选项
      options: {
        title: "用户列表",  //列表标题
        action: "/api/user", // 列表接口地址
        searchFormItem: [ // 搜索表单
          { type: "text", prop: "Keywords", label: "关键字", span: 12 },
          {
            type: "daterange", // 类型 text 文本框 daterange 时间范围 select 下拉框 area 省市区三级地区
            prop: "CreatedTime", // 绑定数据属性名
            label: "创建时间", // 标签
            span: 12, // 布局 最大24格
          },
          {
            type: "select",
            prop: "SchoolId",
            label: "学校",
            action: "/api/school/school-dropdown-box", // 下拉框数据接口
            options: [], // 下拉框数据 有action时 [] 写死的话 [{Id:"值",Name:"名称"}]
            loading: false, // 加载 类型为下拉框时带上 用于控制加载下拉框数据
            span: 12,
          },
          { type: "area", prop: "AreaIds", label: "地区", span: 24 },
        ],
        titleBtns: [ // 标题按钮 即 顶部按钮
          {
            type: "drawer", // 类型 drawer 打开抽屉 api 请求接口 modal 打开模态框（未实现）
            theme: "primary", // 主题颜色 primary default info warning danger
            icon: "el-icon-plus", // 图标
            label: "添加", // 按钮名称
            drawer: "form", // 抽屉名称 对应 name
            power: "SystemMgr_UserMgr_Post", // 权限代码 在/系统管理/功能管理里 找到对应功能的Code
          },
        ],
        rowBtns: [ // 行按钮
          {
            type: "drawer",
            theme: "default",
            icon: "el-icon-info",
            label: "查看",
            drawer: "detail",
            power: "SystemMgr_UserMgr_Get",
          },
        ],
        batchBtns: [ // 批量按钮 即 底部按钮
          {
            type: "api",
            theme: "success",
            icon: "el-icon-edit",
            label: "启用",
            method: "post", // 请求方式 get post put delete
            action: "/api/user/enable", // 接口地址
            params: { Enable: true }, // 传参 （批量按钮默认传Ids 无需手传）
            power: "SystemMgr_UserMgr_Enable",
          },
        ],
        columns: [ // 列表 列信息
          { prop: "SchoolName", label: "学校" },
          { prop: "Code", label: "工号", width: "90px" },
          { prop: "Account", label: "账号", width: "110px" },
          { prop: "Name", label: "姓名" },
          {
            prop: "Enable", // 绑定数据属性名
            label: "启用", // 标题
            pipe: "bool", // 管道 bool 布尔 date 日期
            pipeArgs: ["是", "否"], // 管道参数 布尔时 传两个 第一个代表true时 第二个代表false时
            width: "50px", // 列宽
          },
          { prop: "UserRoles_RoleName", label: "角色", nesting: true },
          {
            prop: "CreatedTime",
            label: "注册时间",
            pipe: "date",
            pipeArgs: ["YYYY/MM/DD hh:mm:ss"], // 管道参数 日期时 传一个 日期格式化 参考moment
            width: "140px",
          },
        ],
        check: true, // 显示复选框
        index: true, // 显示序号
        drawers: [ // 抽屉
          // 批量操作 抽屉 演示
          {
            name: "repassword", // 抽屉名称
            type: "form", // 类型 form 表单 detail 详细
            action: "/api/user/re-password", // 请求接口
            show: false, // 显示 带上就行 用于显示控制
            ids: [], // Id 批量操作传ids 单个操作 传id: undefined
            items: [ // 表单元素
              {
                prop: "Password", // 绑定属性名
                label: "密码", // 标签
                type: "text", // 类型 text 文本 
                required: true, // 必填
                pattern: /^[0-9a-zA-Z\x21-\x7e]{5,24}$/, // 正则校验
                patternMsg: "密码只能由字母、数字、标点符号组成的5~24位字符！", // 正则校验错误提示
                span: 12, // 布局
              },
            ],
          },
          // 查看 抽屉 演示
          {
            name: "detail",
            type: "detail",
            action: "/api/user",
            show: false,
            id: undefined, // Id
            items: [
              {
                prop: "Account", // 绑定属性名
                label: "账号", // 标签
                type: "text", // 类型 text 文本
                span: 12, // 布局
              },
              {
                prop: "Enable",
                label: "启用",
                type: "text",
                span: 12,
                pipe: "bool", // 管道 bool 布尔 date 日期
                pipeArgs: ["是", "否"],
              },
              {
                prop: "UserRoles_RoleName",
                // 嵌套属性名 例如：后端给的数据为 
                // {
                //      UserRoles: [
                //          {
                //              RoleName: ""
                //          }
                //      ]
                // }
                // prop 使用下划线隔开 显示效果为 a,b,c
                nesting: true, 
                label: "角色",
                type: "text",
                span: 12,
              },
              {
                prop: "CreatedTime",
                label: "注册时间",
                type: "text",
                pipe: "date",
                pipeArgs: ["YYYY/MM/DD hh:mm:ss"],
                span: 12,
              },
            ],
          },
          // 添加/编辑 抽屉 演示
          {
            name: "form",
            type: "form",
            action: "/api/user",
            show: false,
            id: undefined,
            items: [
              {
                prop: "Account",
                label: "账号",
                type: "text", // 类型 text 文本 check 复选框 select 选择器 area 省市区三级地区
                required: true,
                pattern: /^[0-9a-zA-Z]{5,24}$/,
                patternMsg: "账号只能由字母、数字组成的5~24位字符！",
                span: 12,
              },
              {
                prop: "Enable",
                label: "启用",
                type: "check",
                default: true, // 默认值（有bug 未实现）
                span: 12,
              },
              {
                prop: "SchoolId",
                label: "学校",
                type: "select",
                span: 12,
                action: "/api/school/school-dropdown-box", // 接口地址
                options: [], // 下拉框数据
                loading: false, // 加载
              },
              {
                prop: "UserRoles_RoleId",
                // 嵌套属性名 例如：后端给的数据为 
                // {
                //      UserRoles: [
                //          {
                //              RoleId: ""
                //          }
                //      ]
                // }
                nesting: true,
                label: "角色",
                type: "select", // select 选择器 带上 multiple: true 代表多选选择器
                max: 256,
                span: 12,
                action: "/api/user/roles", // 接口地址
                options: [], // 下拉框数据
                multiple: true, // 多选
                loading: false, // 加载
              },
              {
                prop: "AreaIds",
                label: "地区",
                type: "area",
                span: 24,
              },
              {
                prop: "SchoolClassId",
                label: "班级",
                type: "select",
                required: true,
                span: 24,
                action: "/api/school-class/dropdown-box",
                options: [],
                loading: false,
                refresh: ["StudentId"], // 值变化时 刷新其他表单元素的数据 目前仅用于刷新select 作为联动使用
              },
              {
                prop: "StudentId",
                label: "学生",
                type: "select",
                required: true,
                span: 24,
                action: "/api/student/dropdown-box",
                params: { $classId: "SchoolClassId" }, // 传参 带上$代表从其他表单元素取值 这里的意思是 从SchoolClassId表单元素取值 传参赋值给参数classId
                options: [],
                loading: false,
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