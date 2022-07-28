<template>
  <div class="card">
    <div class="card-body">
      <div class="NoDataTipCont">
        <svg class="icon faxIcon color-warning" aria-hidden="true">
          <use xlink:href="#fax-exclamation-triangle-alt"></use>
        </svg>
        {{funShowFont()}}
        <router-link :to="comBtnHref" v-if="comIsBtn" class="btn ml-1 mr-1 pl-2 pr-2 btn-mini" :class="comBtnClass" v-html="funBtnIcon()">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      //显示文字
      comInfo:{
        type: String,
        default: '暂未有数据'
      },
      // 是否有按钮
      comIsBtn:{
        type: Boolean,
        default: false,
      },
      // 按钮链接地址
      comBtnHref:{
        type: String,
        default: ''
      },
      // 按钮图标
      comBtnIcon:{
        type: String,
        default: ''
      },
      // 按钮文字
      comBtnFont:{
        type: String,
        default: ''
      },
      // 按钮颜色CLASS
      comBtnClass:{
        type: String,
        default: 'btn-success'
      }
    },
    methods:{
      funBtnIcon(){
        let strHtml = '';
        strHtml +=' <svg class="icon" aria-hidden="true">';
        strHtml +='   <use xlink:href="#'+this.comBtnIcon+'"></use>';
        strHtml +=' </svg>&nbsp;';
        strHtml += this.comBtnFont;
        return strHtml;
      },
      funShowFont(){
        let strFont = this.comInfo;
        if(this.comIsBtn){
          // 显示按钮
          strFont +='，请点击';
        }
        return strFont;
      }

    },
    mounted() {

    }
  };
</script>

<style>
</style>
