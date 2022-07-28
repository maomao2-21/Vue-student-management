<!--
  班主任手册 - 德育概况
-->
<template>
  <div class="SubWebPage">
    <!-- 搜索表单 -->
    <el-form :model="form" ref="form" label-width="80px" size="normal">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="学期" prop="semesterId">
              <lazy-select
                ref="form_semesterId"
                :form="form"
                prop="semesterId"
                action="/api/semester/dropdown-box"
                :immediate="true"
                @handleSelectChange="search"
              ></lazy-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级" prop="classId">
              <lazy-select
                ref="form_classId"
                :form="form"
                prop="classId"
                action="/api/school-class/dropdown-box"
                :immediate="true"
                @handleSelectChange="search"
              ></lazy-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>

    <div class="card">
      <div class="card-header border-0">
        <div class="d-flex justify-content-between">
          <h3 class="card-title titleCont">
            <span class="spIcon"></span>
            德育概况
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-2 infoItemCont">
            <div class="divItemList clearfix">
              <div class="divNum">
                <span class="spTitle">本学期</span>
                {{ CurrentSemesterStudentEverydayBehaviorCount }}
              </div>
              <div class="divNum">
                <span class="spTitle">上学期</span>
                {{ PrevSemesterStudentEverydayBehaviorCount }}
              </div>
            </div>
            <div class="divItemFont">学生日常行为</div>
          </div>
          <div class="col-sm-2 infoItemCont">
            <div class="divItemList clearfix">
              <div class="divNum">
                <span class="spTitle">本学期</span>
                {{ CurrentSemesterStudentRewardRecordCount }}
              </div>
              <div class="divNum">
                <span class="spTitle">上学期</span>
                {{ PrevSemesterStudentRewardRecordCount }}
              </div>
            </div>
            <div class="divItemFont">学生获奖</div>
          </div>
          <div class="col-sm-2 infoItemCont">
            <div class="divItemList clearfix">
              <div class="divNum">
                <span class="spTitle">本学期</span>
                {{ CurrentSemesterClassAwardWinningCount }}
              </div>
              <div class="divNum">
                <span class="spTitle">上学期</span>
                {{ PrevSemesterClassAwardWinningCount }}
              </div>
            </div>
            <div class="divItemFont">班级获奖</div>
          </div>
          <div class="col-sm-2 infoItemCont">
            <div class="divItemList clearfix">
              <div class="divNum">
                <span class="spTitle">本学期</span>
                {{ CurrentSemesterStudentHonorCount }}
              </div>
              <div class="divNum">
                <span class="spTitle">上学期</span>
                {{ PrevSemesterStudentHonorCount }}
              </div>
            </div>
            <div class="divItemFont">三好学生</div>
          </div>
          <div class="col-sm-2 infoItemCont">
            <div class="divItemList clearfix">
              <div class="divNum">
                <span class="spTitle">本学期</span>
                {{ CurrentSemesterStudentExcellentCadreCount }}
              </div>
              <div class="divNum">
                <span class="spTitle">上学期</span>
                {{ PrevSemesterStudentExcellentCadreCount }}
              </div>
            </div>
            <div class="divItemFont">优秀学生干部</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header border-0">
        <div class="d-flex justify-content-between">
          <h3 class="card-title titleCont">
            <span class="spIcon"></span>
            学生日常行为
          </h3>
        </div>
        <el-link
          style="position: absolute; right: 20px; top: 20px"
          type="primary"
          :underline="false"
          href="#/StudentThing/EverydayBehavior/Index"
          >查看更多</el-link
        >
      </div>
      <div class="card-body">
        <el-tabs type="border-card" style="margin-bottom: 15px">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 本学期</span>
            <simple-table-list
              :data="tableCurrentData"
              :columns="tableColumns"
            ></simple-table-list>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 上学期</span>
            <simple-table-list
              :data="tablePrevData"
              :columns="tableColumns"
            ></simple-table-list>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="card">
      <div class="card-header border-0">
        <div class="d-flex justify-content-between">
          <h3 class="card-title titleCont">
            <span class="spIcon"></span>
            德育等级
          </h3>
        </div>
      </div>
      <div class="card-body boxCont">
        <div class="boxTitle">
          <div class="awardsLabelCont clearfix">
            <div class="divItemList">
              <span class="spIcon VerticalMid">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#fax-circle"></use>
                </svg>
              </span>
              本学期
            </div>
            <div class="divItemList">
              <span class="spIcon VerticalMid">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#fax-circle"></use>
                </svg>
              </span>
              上学期
            </div>
          </div>
        </div>
        <div class="barAwardsCont">
          <div
            id="ChartCountStudentStudentMoralComment"
            style="width: 100%; height: calc(350rem * 0.0625)"
          ></div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header border-0">
        <div class="d-flex justify-content-between">
          <h3 class="card-title titleCont">
            <span class="spIcon"></span>
            处分情况
          </h3>
        </div>
      </div>
      <div class="card-body boxCont">
        <div class="boxTitle">
          <div class="awardsLabelCont clearfix">
            <div class="divItemList">
              <span class="spIcon VerticalMid">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#fax-circle"></use>
                </svg>
              </span>
              本学期
            </div>
            <div class="divItemList">
              <span class="spIcon VerticalMid">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#fax-circle"></use>
                </svg>
              </span>
              上学期
            </div>
          </div>
        </div>
        <div class="barAwardsCont">
          <div
            id="ChartCountStudentStudentPunishmentsRecord"
            style="width: 100%; height: calc(350rem * 0.0625)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazySelect from "@/components/LazySelect.vue";
import SimpleTableList from "@/components/SimpleTableList.vue";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
export default {
  components: {
    LazySelect,
    SimpleTableList,
  },
  mounted() {
    let query = this.$route.query;
    if (query.semesterId) {
      this.form.semesterId = query.semesterId;
      this.$refs.form_semesterId.handleSelectFocus();
    }
    if (query.classId) {
      this.form.classId = query.classId;
      this.$refs.form_classId.handleSelectFocus();
    }

    this.wait();
  },
  created() {},
  methods: {
    wait() {
      let that = this;
      if (this.form.semesterId_load && this.form.classId_load) {
        this.search();
      } else {
        setTimeout(function () {
          that.wait();
        }, 300);
      }
    },
    /** 查询 */
    search() {
      let that = this;
      let route = this.$route;
      let query = JSON.parse(JSON.stringify(route.query));
      if (this.form.semesterId) {
        let semesters = this.$refs.form_semesterId.data;
        let currentIndex = -1;
        for (let i = 0; i < semesters.length; i++) {
          const semester = semesters[i];
          if (semester.Id == this.form.semesterId) {
            currentIndex = i;
            break;
          }
        }
        let prevIndex = currentIndex - 1;
        this.prevSemesterId = prevIndex > -1 ? semesters[prevIndex] : null;

        query["semesterId"] = this.form.semesterId;
        if (this.form.classId) {
          query["classId"] = this.form.classId;
        }
        this.$router.push({ path: route.path, query: query });
        this.$get(
          "/api/class-moral-education-summary/student-everyday-behavior",
          {
            SemesterId: this.form.semesterId,
            SchoolClassId: this.form.classId,
            PageSize: 5,
          }
        ).then(function (r) {
          that.tableCurrentData = r.Items ?? [];
        });
        if (this.prevSemesterId) {
          this.$get(
            "/api/class-moral-education-summary/student-everyday-behavior",
            {
              SemesterId: this.prevSemesterId,
              SchoolClassId: this.form.classId,
              PageSize: 5,
            }
          ).then(function (r) {
            that.tablePrevData = r.Items ?? [];
          });
        } else {
          this.tablePrevData = [];
        }
        this.$get("/api/class-moral-education-summary", query).then(function (
          r
        ) {
          that.CountStudentStudentMoralComment =
            r.CountStudentStudentMoralComment ?? "--";
          that.CountStudentStudentMoralCommentX =
            r.CountStudentStudentMoralCommentX ?? "--";
          that.CountStudentStudentPunishmentsRecord =
            r.CountStudentStudentPunishmentsRecord ?? "--";
          that.CountStudentStudentPunishmentsRecordX =
            r.CountStudentStudentPunishmentsRecordX ?? "--";
          that.CurrentSemesterStudentEverydayBehaviorCount =
            r.CurrentSemesterStudentEverydayBehaviorCount ?? "--";
          that.PrevSemesterStudentEverydayBehaviorCount =
            r.PrevSemesterStudentEverydayBehaviorCount ?? "--";
          that.CurrentSemesterClassAwardWinningCount =
            r.CurrentSemesterClassAwardWinningCount ?? "--";
          that.CurrentSemesterStudentExcellentCadreCount =
            r.CurrentSemesterStudentExcellentCadreCount ?? "--";
          that.CurrentSemesterStudentHonorCount =
            r.CurrentSemesterStudentHonorCount ?? "--";
          that.CurrentSemesterStudentRewardRecordCount =
            r.CurrentSemesterStudentRewardRecordCount ?? "--";
          that.PrevSemesterClassAwardWinningCount =
            r.PrevSemesterClassAwardWinningCount ?? "--";
          that.PrevSemesterStudentExcellentCadreCount =
            r.PrevSemesterStudentExcellentCadreCount ?? "--";
          that.PrevSemesterStudentHonorCount =
            r.PrevSemesterStudentHonorCount ?? "--";
          that.PrevSemesterStudentRewardRecordCount =
            r.PrevSemesterStudentRewardRecordCount ?? "--";
          that.initChart(
            "ChartCountStudentStudentMoralComment",
            r.CountStudentStudentMoralCommentX,
            r.CountStudentStudentMoralComment
          );
          that.initChart(
            "ChartCountStudentStudentPunishmentsRecord",
            r.CountStudentStudentPunishmentsRecordX,
            r.CountStudentStudentPunishmentsRecord
          );
        });
      }
    },
    initChart(id, x, y) {
      let chart = echarts.init(document.getElementById(id));
      let option = this.getChartOption(x, y);
      chart.setOption(option);
    },
    getChartOption(x, y) {
      let series = [];
      for (let i = 0; i < y.length; i++) {
        const element = y[i];
        var item = {
          type: "bar",
          label: {
            show: false,
          },
          barWidth: 10,
          barGap: "30%",
          itemStyle: {
            normal: {
              barBorderRadius: [11, 11, 0, 0],
            },
          },
          data: element,
        };
        series.push(item);
      }
      return {
        grid: {
          top: "10%",
          left: "4%",
          right: "0%",
          bottom: "10%",
        },
        color: ["#7E66F6", "#E9E9E9"],
        xAxis: {
          type: "category",
          data: x,
          axisLabel: {
            color: "#939393",
            fontSize: 14,
            interval: 0,
            formatter: function (value) {
              var str = "";
              str += value + "\n";
              return str;
            },
          },
          axisLine: {
            lineStyle: {
              color: "#F3F3F3",
              width: 1,
            },
          },
          axisTick: {
            show: false, //不显示刻度
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14,
              color: "#939393",
            },
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: "#F3F3F3",
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: series,
      };
    },
  },
  data() {
    return {
      form: {
        semesterId: null,
        classId: null,
      },
      prevSemesterId: null,
      tableCurrentData: [],
      tablePrevData: [],
      tableColumns: [
        {
          prop: "StudentEverydayBehaviorMultiples_StudentName",
          label: "学生",
          nesting: true,
          title: true,
          width:"200px"
        },
        { prop: "Reason", label: "原因", pipe: "editor" },
        { prop: "Score", label: "分数", width: "50px" },
        {
          prop: "CreatedTime",
          label: "记录时间",
          pipe: "date",
          pipeArgs: ["YYYY/MM/DD hh:mm"],
          width: "140px",
        },
      ],
      CountStudentStudentMoralComment: [[0]],
      CountStudentStudentMoralCommentX: [""],
      CountStudentStudentPunishmentsRecord: [[0]],
      CountStudentStudentPunishmentsRecordX: [""],
      CurrentSemesterStudentEverydayBehaviorCount: "--",
      PrevSemesterStudentEverydayBehaviorCount: "--",
      CurrentSemesterClassAwardWinningCount: "--",
      CurrentSemesterStudentExcellentCadreCount: "--",
      CurrentSemesterStudentHonorCount: "--",
      CurrentSemesterStudentRewardRecordCount: "--",
      PrevSemesterClassAwardWinningCount: "--",
      PrevSemesterStudentExcellentCadreCount: "--",
      PrevSemesterStudentHonorCount: "--",
      PrevSemesterStudentRewardRecordCount: "--",
    };
  },
};
</script>

<style scoped="scoped">
.col-sm-2 {
  flex: 0 0 20%;
  max-width: 20%;
}
.infoItemCont {
}
.infoItemCont .divItemList {
  margin-top: -10px;
  border-right: 1px solid #efefef;
}
.infoItemCont:last-child .divItemList {
  border-right: none;
}
.infoItemCont .divItemList .divNum {
  position: relative;
  font-family: "OswaldLight";
  float: left;
  width: 49.9%;
  font-size: 42px;
  text-align: center;
  letter-spacing: 1px;
  color: #348dff;
}
.infoItemCont .divItemList .divNum .spTitle {
  display: block;
  font-size: 14px;
  color: #000000;
  padding: 2px 5px;
  border-radius: 4px;
  margin-bottom: -10px;
}
.infoItemCont .divItemList .divNum:last-child {
  color: #b0afaf;
}
.infoItemCont .divItemList .divNum:last-child .spTitle {
  color: #6c757e;
}
.infoItemCont .divItemFont {
  text-align: center;
}

.divBoxHeight {
  height: 30.625rem; /*490px*/
}

.boxCont .boxTitle {
  position: relative;
}

.boxCont .picBox {
  text-align: center;
  position: relative;
}
.boxCont .picBox50 {
  float: left;
  width: 49.9%;
}

.boxCont .picBox .divTotalCont {
  position: absolute;
  left: 0;
  right: 0;
  top: 4.375rem; /*70px*/
}
.boxCont .picBox .divTotalCont .spNum {
  display: block;
  font-family: "OswaldLight";
  font-size: 2.875rem; /*46px*/
  letter-spacing: 0.125rem; /*2px*/
}
.boxCont .picBox .divTotalCont .spFont {
  display: block;
  color: #939393;
  letter-spacing: 0.0625rem; /*1px*/
}
.boxCont .picInfo {
  float: left;
  width: 49.9%;
}
.boxCont .picInfo .divInfoItem {
  padding-top: 1.875rem; /*30px*/
  padding-left: 3.75rem; /*60px*/
}
.boxCont .picInfo .divItemList {
  position: relative;
  padding-top: 0.625rem; /*10px*/
  padding-bottom: 0.625rem; /*10px*/
  padding-left: 1.875rem; /*30px*/
}
.boxCont .picInfo .divItemList .spIcon {
  position: absolute;
  top: 0.625rem; /*10px*/
  left: 0;
}

.boxCont .picInfo .divItemList .spPct {
  color: #4c4c51;
  font-size: 1.125rem; /*18px*/
  font-family: Arial, Helvetica, sans-serif;
}
.boxCont .picInfo .divItemList .spLabel {
  padding-left: 0.625rem; /*10px*/
  color: #939393;
}
.boxCont .picInfo .divItemList .spNum {
  color: #939393;
}
.boxCont .pieDivideBox {
  padding-top: 2.5rem; /*40px*/
}
.boxCont .pieDivideBox .divTotalCont {
  top: 6.25rem; /*100px*/
}

.awardsLabelCont {
  position: absolute;
  top: -20px;
  right: 0;
}
.awardsLabelCont .divItemList {
  float: left;
  padding-right: 1.875rem; /*30px*/
  position: relative;
  padding-left: 1.875rem; /*30px*/
}
.awardsLabelCont .divItemList .spIcon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2rem; /*32px*/
}

.awardsLabelCont .divItemList:nth-child(1) .icon {
  color: #7e66f6;
}
.awardsLabelCont .divItemList:nth-child(2) .icon {
  color: #e9e9e9;
}
</style>
