<!--
  删除按钮 有弹出提示框
-->
<template>
  <button type="button" :class="comClass" v-html="funGetHtml()" @click="funConfirm"></button>
</template>

<script>
  export default {
    props:{
      // 按钮名称
      comName:{
        type:String,
        default:'删除'
      },
      // 按钮样式
      comClass:{
        type:String,
        default: 'btn btn-danger'
      },
      // 图标
      comIcon:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        strHtml:''
      };
    },
    mounted() {

    },
    methods: {
      // 按钮图标
      funGetHtml(){
        let strHtml = '';
        if(this.comIcon!=''){
          strHtml += '<svg class="icon" aria-hidden="true">';
          strHtml += '<use xlink:href="#'+this.comIcon+'"></use>';
          strHtml += '</svg>&nbsp;';
          strHtml += this.comName;
        }else{
          strHtml = this.comName;
        }
        return strHtml;
      },
      funConfirm() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  };
</script>

<style>
</style>
