<!--
  导入
-->
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true" class="btn btn-info ml-1 mr-1 pl-2 pr-2 btn-mini" v-html="onGetHtml()">


    </el-button>

    <el-dialog title="导入" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!--弹出框内容-->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        
        <el-button size="small" type="primary">点击上传文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

      </el-upload>
      <!--弹出框内容-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:{
      // 图标
      comIcon:{
        type: String,
        default: 'fax-import-box-alt'
      },
      // 按钮名称
      conBtnName:{
        type: String,
        default: '导入'
      }
    },
    data() {
      return {
        //弹出框属性
        dialogVisible: false,
        //上传组件地址
        fileList: []
      };
    },
    methods: {
      onGetHtml(){
        let strHtml = '';
        strHtml += '<svg class="icon" aria-hidden="true">';
        strHtml += '<use xlink:href="#'+this.comIcon+'"></use>';
        strHtml += '</svg>&nbsp;';
        strHtml += this.conBtnName;
        return strHtml;
      },
      // 关闭弹出框
      handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
          done();
        }).catch(_ => {});
      },
      // 删除临时上传文件
      handleRemove(file, fileList) {
        //console.log(file, fileList);
      },
      handlePreview(file) {
        //console.log(file);
      },
      // 上传提示
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // 删除临时图片提示框
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  };
</script>

<style>
</style>
