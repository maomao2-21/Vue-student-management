<!--后台网站框架-->
<template>
  <div class="tmpl_IndexPage webDefault">
    <!--头部-->
    <comHeader @handleSwitchSchool="handleSwitchSchool"></comHeader>

    <!--菜单-->
    <comMenu></comMenu>

    <!--子页内容-->

    <router-view
      v-wechat-title="$route.meta.title"
      v-if="load"
      style="margin-bottom: 50px"
    />

    <div id="toTop" class="VerticalMid">
      <el-tooltip class="item" effect="dark" content="返回顶部" placement="top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#fax-font-top-o"></use>
        </svg>
      </el-tooltip>
    </div>
    <div
      style="
        text-align: center;
        font-size: 14px;
        color: rgb(102, 102, 102);
        position: fixed;
        padding: 0px 10px;
        height: 20px;
        line-height: 20px;
        bottom: 0px;
        background-color: #fff;
        z-index: 999;
        left: 16.875rem;
        right: 2.5rem;
      "
    >
      Copyright 2009-2029 © 尧瑶科技 All rights reserved
    </div>
  </div>
</template>

<script>
import comHeader from "@/components/Header.vue";
import comMenu from "@/components/Menu.vue";

export default {
  beforeRouteUpdata(to, form, next) {
    next();
  },
  name: "web_Default",
  components: {
    comHeader,
    comMenu,
  },
  data() {
    return {
      load: true,
    };
  },
  methods: {
    handleSwitchSchool() {
      this.load = false;
      this.$nextTick(() => {
        this.load = true;
        this.$router.push({ query: {} });
      });
    },
  },
  created() {
    var logierData = JSON.parse(localStorage.getItem("loginData")) || [];

    if (logierData == false) {
      // this.$router.push("/Headmaster/Login");
    }
    // console.log(this.$router);
  },
  watch: {
    $route(to, from) {
      // var logierData = JSON.parse(localStorage.getItem("loginData")) || [];
      // if (logierData == false) {
      //   this.$router.push("/Headmaster/Login");
      // }
      // var logierData = JSON.parse(localStorage.getItem("loginData")).RoleCode;
      // console.log(this.$route);
      // const Headmaster = window.location.pathname
      //   .replace("/", "")
      //   .replace("/", "");
      // if (Headmaster != logierData) {
      //   this.$router.push("/Login");
      // } else {
      //   window.location.pathname = "Admin";
      // }
    },
  },
  mounted() {
    /*
      $(window).scroll(function() {
        if ($(this).scrollTop() != 0) {
          $("#toTop").fadeIn();
        } else {
          $("#toTop").fadeOut();
        }
      });

      $("#toTop").click(function() {
        $("body,html").animate({
          scrollTop: 0,
        },800);
      });
      */
    //首页
    //this.$router.replace('Home/Index');
    /****************************************
        学生基础信息
      *****************************************/
    //this.$router.replace('Student/Index');//列表
    //this.$router.replace('Student/Details');//详情
    //this.$router.replace('Student/Edit');//编辑
    /****************************************
        班级学生
      *****************************************/
    //this.$router.replace('Student/Adviser');//列表
    //this.$router.replace('Student/Commentsedit');//评语
    /****************************************
        成绩管理
      *****************************************/
    //this.$router.replace('Score/Index');//成绩管理 列表
    //this.$router.replace('Score/Details');//成绩管理 详情
    /****************************************
        班级成绩
      *****************************************/
    //this.$router.replace('Score/Adviser');//班级成绩 详情
    //this.$router.replace('Score/Course');//班级成绩 汇总
    //this.$router.replace('Score/AdviserScoreRecord');//班级成绩 录入
    /****************************************
        处分管理
      *****************************************/
    //this.$router.replace('StudentPenalize/Index');//列表
    //this.$router.replace('StudentPenalize/Details');//详情
    //this.$router.replace('StudentPenalize/Edit');//编辑
    /****************************************
        素养活动
      *****************************************/
    //this.$router.replace('LiteracyActivities/IndexPro');//列表
    //this.$router.replace('LiteracyActivities/DetailsPro');//详情
    //this.$router.replace('LiteracyActivities/DetailsPro_Class');//详情
    //this.$router.replace('LiteracyActivities/DetailsPro_NoImg');//详情
    //this.$router.replace('LiteracyActivities/Roster');//确认名单
    //this.$router.replace('LiteracyActivities/Confirm');//结果审核
    //this.$router.replace('LiteracyActivities/PrizeList');//获奖评比
    //this.$router.replace('LiteracyActivities/PrizeEdit');//获奖评比 编辑
    //this.$router.replace('LiteracyActivities/PrizeCreate');//获奖评比 新增
    //this.$router.replace('LiteracyActivities/PrizeView');//获奖评比 详情
    //this.$router.replace('LiteracyActivities/CreateSimplify');//新增无流程活动
    //this.$router.replace('LiteracyActivities/CreatePro');//新增流程活动
    /****************************************
        素养活动(班主任)
      *****************************************/
    //this.$router.replace('LiteracyActivitiesRecord/AdviserDuration'); // 学生个人活动记录
    //this.$router.replace('LiteracyActivitiesRecord/Details'); // 学生个人活动记录 详情
    //this.$router.replace('LiteracyActivitiesRecord/DurationAudit'); // 学生个人活动记录 审核
    /****************************************
        竞赛
      *****************************************/
    //this.$router.replace('LiteracyEvent/CompetitionList'); //竞赛活动 列表
    //this.$router.replace('LiteracyEvent/CompetitionDetails'); //竞赛活动 详情
    //this.$router.replace('LiteracyEvent/CompetitionCreate'); //竞赛活动 新增
    //this.$router.replace('LiteracyEventAward/Index'); //竞赛活动 获奖信息 列表
    //this.$router.replace('LiteracyEventAward/Create'); //竞赛活动 获奖信息 新增
    //this.$router.replace('LiteracyEvent/TrainingList'); //竞赛活动 技能集训 列表
    //this.$router.replace('LiteracyEvent/TrainingDetails'); //竞赛活动 技能集训 详情
    //this.$router.replace('LiteracyEvent/TrainingCreate'); //竞赛活动 技能集训 详情
    /****************************************
        社会实践
      *****************************************/
    //this.$router.replace('LiteracyEvent/SocialList'); //社会实践 列表
    /****************************************
        主题活动
      *****************************************/
    //this.$router.replace('LiteracyEvent/StudyList'); //主题活动 列表
    /****************************************
        学生社团
      *****************************************/
    //this.$router.replace('LiteracyEvent/ClubList'); //学生社团 列表
    /****************************************
        日常行为
      *****************************************/
    //this.$router.replace('BehaviorRecord/Index'); //日常行为 列表
    //this.$router.replace('BehaviorRecord/Create'); //日常行为 新增
    //this.$router.replace('BehaviorRecord/AuditList'); //日常行为 批量审核
    //this.$router.replace('BehaviorRecord/Details'); //日常行为 详情
    /****************************************
        班级日常行为
      *****************************************/
    //this.$router.replace('BehaviorRecord/Adviser'); //班级日常行为 列表
    //this.$router.replace('BehaviorRecord/AdviserDetails'); //班级日常行为 详情
    //this.$router.replace('BehaviorRecord/AdviserAudit'); //班级日常行为 审核
    /****************************************
        班级自我记录
      *****************************************/
    //this.$router.replace('SelfReport/Adviser'); //班级自我记录 列表
    //this.$router.replace('SelfReport/AdviserDetails'); //班级自我记录 列表
    /****************************************
        自我记录
      *****************************************/
    //this.$router.replace('SelfReport/Index'); //自我记录 列表
    /****************************************
        文明寝室
      *****************************************/
    //this.$router.replace('CivilizedDorm/Index'); //列表
    /****************************************
        竞赛获奖
      *****************************************/
    //this.$router.replace('StudentPrize/Index'); //列表
    /****************************************
        班级日志
      *****************************************/
    //this.$router.replace('DailyClass/AdviserCreate'); //列表
    /****************************************
        学生评语
      *****************************************/
    //this.$router.replace('StudentComments/Index'); //列表
    /****************************************
        班级宿舍扣分
      *****************************************/
    //this.$router.replace('DormDemerit/Adviser'); //列表
    /****************************************
        学生疾病管理
      *****************************************/
    //this.$router.replace('IllnessRoster/Index'); //列表
    //this.$router.replace('IllnessRoster/Adviser'); //列表
    /****************************************
        班干部评比
      *****************************************/
    //this.$router.replace('StudentPosition/Index'); //列表
    //this.$router.replace('StudentPosition/Create'); //列表
    /****************************************
        房源管理
      *****************************************/
    //this.$router.replace('Dorm/Index'); //列表
    //this.$router.replace('Dorm/Create'); //列表
    //this.$router.replace('Dorm/Room'); //列表
    //this.$router.replace('DormManage/Index'); //宿舍管理
    //this.$router.replace('DormManage/Building'); //宿舍管理
    //this.$router.replace('DormManage/Floor'); //宿舍管理 详情
    //this.$router.replace('DormStar/Index'); //宿舍管理 详情
    //this.$router.replace('DormChg/Index'); //宿舍管理 详情
    //this.$router.replace('DormDemerit/Index'); //宿舍管理 详情
    //this.$router.replace('DormDemerit/Create'); //宿舍管理 详情
    //this.$router.replace('GrowthArchives/Details'); //成长档案 详情
    //this.$router.replace('ArchivesType/Index'); //档案类型 列表
    //this.$router.replace('CoreLiteracy/Index'); //核心素养参数 列表
    //this.$router.replace('CoreLiteracyReport/Index'); //核心素养评价 列表
    //this.$router.replace('CoreLiteracyReport/Details'); //核心素养评价 列表
    //this.$router.replace('LiteracyReport/Details'); //核心素养评价 列表
  },
};
</script>

<style scoped="scoped">
#toTop {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 99;
  display: none;
  padding: 2px 8px;
  cursor: pointer;
  background-color: #f7f7f7;
  color: #444444;
  border: 1px solid #dddddd;
  font-size: 26px;
  border-radius: 5px;
}
#toTop:hover {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
}
</style>
