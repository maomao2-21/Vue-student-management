js相关

      this.$get(url, data).then(function (r) { });    // get请求  post put 在js/handle.js 里封装好了 暂时不需要
      this.$post(url,data).then(function (r) {});
      
      this.$delete("/api/role", { ids: row.Id }).then(function (r) {
        let querys = JSON.parse(JSON.stringify(that.$route.query));
        if (querys.PageIndex == 1 || querys.PageIndex == "1") {
          that.getData();
        } else {
          querys.PageIndex = 1;
          that.$router.push({ path: that.$route.path, query: querys });
        }
      });

      this.$timeToDay(time)                           // 转为年月日
      this.$timeToMin(time)                           // 转为分钟
      

页面相关

    watch: {                     // 有页面和关键字的时候使用
        $route(to, from) {
        this.getData();
        },
    },

     getData() {                // 获取数据 参数都放在路由上                           
      let that = this;
      let query=this.$route.query
      let Keywords = query.Keywords;
      let data = {
        Keywords: Keywords,
        PageIndex: query.PageIndex,
      };
      this.$get(url, data).then(function (r) {
        that.tabelList = r.Items;
        that.totalPage = r.TotalCount * 1;
      });
    },


组件相关

    搜索列表

        <searchList v-if="searchDataList" :searchDataList="searchDataList"></searchList>
        import searchList from "@/components/searchList.vue";
        components: {searchList},
        this.searchDataList = [          // name/名称 code/key data/null即可 type/类型 input select pickerMin(传的是字符串 time.split(',')[0] 自己拿数据   cascaderCity/城市选择
        )
            { name: "关键字", code: "Keywords", data: null, type: "input" },
        ];

    表格 

        <tabelList :tabelList="tabelList" :totalPage="totalPage" :tableData="tableData" @btnClick="btnClick"></tabelList>
        import tabelList from "@/components/tabelList.vue";
        components: {tabelList},
        tabelList  // 接口得到的数组

        this.tableData={
            titel: "角色列表",            // 列表名称
            haveIndex: true,             // 是否有序号
            propList: [                  // key 名称 
            { prop: "Name", label: "名称" },
            ],
            btnList: [                   // 操作按钮类型  btnType按钮类型 info/绿 warning/黄 err/红   name/名称 type/传回按钮值 sysPow/this.$sysPow('xxx') 权限 没有权限就true
            { btnType: "info", name: "查看", type: "look",sysPow:this.$sysPow('xxx') },

            ],
            // 头部按钮 
            topBtnList: [{ name: "新增", type: "topAdd",sysPow:this.$sysPow('xxx')}],

            bottomBtnList: [   // 底部按钮
              { name: "更改密码", type: "changePass",sysPow:this.$sysPow('xxx')},
            ],
      }

      totalPage/分页有了后开启页码
      btnClick(type, row, index)   // 类型 行数据 index

    新增/编辑 数据

    <editTemplate v-if="ruleFormList" :ruleFormList='ruleFormList' :rules='rules'></editTemplate>
    import editTemplate from "@/components/editTemplate.vue";
    components: {editTemplate},

          this.ruleFormList={
            title:title,       // 名称
            editId:editId,     // 如果是编辑就编辑id
            ajaxUrl:url,       // 请求接口
      
            trueData:{         // 如果有权限树 后面应该没有就相看权限
              setCheckedKeys:setCheckedKeys,
              TreeRoleFunctions:TreeRoleFunctions,
              oldRoleFunctions:oldRoleFunctions,
            },
   
            dataList:[       // name/名称 code/key data/data type/类型(input/textarea/tree/switch/select(value/label multiple 是否多选)  oldData:data.UserRoles(如果是有id的数组对象就传之前的数据) upId:需要最终上传的id   cascaderCity/城市  ) 
              {name:'Id' ,code:'Id'    ,data: Id,    type:'input',show:false},
              {name:'功能类型',code:'Type',data:Type,type:'select',show:true,span:12,options:this.options,multiple:false},
              {name:'角色',code:'UserRoles',data:data.UserRoles2,type:'select',show:true,span:12,options:this.UserRolesOptions,multiple:true,oldData:data.UserRoles,upId:'RoleId'}, 
              {name:'启用',code:'Enable',data: Enable,type:'switch',show:true,span:12}, 
              {name:'权限',code:'RoleFunctions',data:RoleFunctions,type:'tree',show:true,span:24}, 
            ] 
        } 
 
        rules // 同表单rules 

    查看 数据
     <detailList v-if="ruleFormList" :ruleFormList='ruleFormList' ></detailList>
    import detailList from "@/components/detailList.vue";
    components: {detailList},
                       that.ruleFormList={
                        title:'用户详情',
                        dataList:[
                            {name:'账号',data:r.Account},
                        ]

                            trueData:{
                                name:'权限',
                                setCheckedKeys:list,     // 要显示的tree
                                TreeRoleFunctions:r.TreeRoleFunctions,   // 总的tree
                            },
                    }

















// 列表直接复制
<template>
  <div class="SubWebPage" >
      <searchList v-if="searchDataList" :searchDataList="searchDataList"></searchList>
       <tabelList :tabelList="tabelList" :totalPage="totalPage" :tableData="tableData" @btnClick="btnClick"></tabelList>
  </div>
</template>

<script>
  import searchList from "@/components/searchList.vue";
  import tabelList from "@/components/tabelList.vue";
  export default {
    components: {searchList,tabelList},
    created() {
        this.searchDataList = [          // name/名称 code/key data/null即可 type/类型
            { name: "账号", code: "UserAccount", data: null, type: "input" },
            { name: "姓名", code: "UserName", data: null, type: "input" },
            { name: "异常消息", code: "ErrorContent", data: null, type: "input" },
            { name: "链接地址", code: "Path", data: null, type: "input" },
            { name: "时间范围", code: "Time", data: null, type: "pickerMin" },
        ];
        this.getData();

                this.tableData={
        titel: "角色列表",
        haveIndex: true,
        propList: [
          { prop: "Name", label: "名称" },
          { prop: "Remark", label: "描述" },
        ],
        btnList: [
          { btnType: "info", name: "查看", type: "look",sysPow:true },
          { btnType: "warning", name: "编辑", type: "edit" ,sysPow:this.$sysPow('SystemMgr_RoleMgr_Put')},
          { btnType: "err", name: "删除", type: "dell" ,sysPow:this.$sysPow('SystemMgr_RoleMgr_Delete')},
        ],
        topBtnList: [{ name: "新增", type: "topAdd",sysPow:this.$sysPow('SystemMgr_RoleMgr_Post')}],

      }

      }
    },
    data() {
      return {
        searchDataList:null,
        tabelList:null,
        totalPage:null,
        tableData:null,
      }
    },
    methods: {
           getData() {                // 获取数据 参数都放在路由上                           
            let that = this;
            let query=this.$route.query
            let time=query.Time
            let data = {
              UserAccount: query.UserAccount,
              UserName: query.UserName,
              ErrorContent: query.ErrorContent,
              Path: query.Path,
    
              MinCreatedTime:time?time.split(',')[0]:null,
              MaxCreatedTime:time?time.split(',')[1]:null,
    
            };
       
            this.$get('/api/log-exception', data).then(function (r) {
              let Items=r.Items;
              Items.forEach(element => {
                element.CreatedTime= that.$timeToMin(element.CreatedTime)  
              });
              that.tabelList = Items;
              that.totalPage = r.TotalCount * 1;
            });
          },
             btnClick(type, row, index){

              let that=this;
              if(type=='dell'){
                this.$delete("/api/log-exception", { ids: row.Id }).then(function (r) {
                  let querys = JSON.parse(JSON.stringify(that.$route.query));
                  if (querys.PageIndex == 1 || querys.PageIndex == "1") {
                    that.getData();
                  } else {
                    querys.PageIndex = 1;
                    that.$router.push({ path: that.$route.path, query: querys });
                  }
                });
              }else if(type=='look'){
                this.$router.push({path:"/LogException/Teacher/Details?Id="+row.Id})
              }
          
             }
    },
    watch: {                     // 有页面和关键字的时候使用
        $route(to, from) {
        this.getData();
        },
    },
  }
</script>

<style lang="scss" scoped>

</style>