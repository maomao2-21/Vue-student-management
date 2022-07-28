<!--
  导出
-->
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true" class="btn btn-info ml-1 mr-1 pl-2 pr-2 btn-mini" v-html="onGetHtml()">
    </el-button>
    <el-dialog
      title="导出"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">



        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <div style="margin: 15px 0;"></div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  const cityOptions = ['帐号', '学号', '姓名', '性别','出生日期','入学年份','专业部','专业','专业方向代码','专业方向名称','班级名称','手机号码','学校邮箱','QQ号','微信号','民族','政治面貌','籍贯','户籍地','生源地','学位','身份证号','联系电话','工作单位'];
  export default {
    props:{
      // 图标
      comIcon:{
        type: String,
        default: 'fax-export-box-alt'
      },
      // 按钮名称
      conBtnName:{
        type: String,
        default: '导出'
      }
    },
    data() {
      return {
        checkAll: false,
        checkedCities: ['学号', '姓名'],
        cities: cityOptions,
        isIndeterminate: true,
        //弹出框属性
        dialogVisible: false
      };
    },
    methods: {
      // 全选
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      // 选择
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      // 按钮图标
      onGetHtml(){
        let strHtml = '';
        strHtml += '<svg class="icon" aria-hidden="true">';
        strHtml += '<use xlink:href="#'+this.comIcon+'"></use>';
        strHtml += '</svg>&nbsp;';
        strHtml += this.conBtnName;
        return strHtml;
      },
      // 关闭弹出框提示
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style>
</style>
