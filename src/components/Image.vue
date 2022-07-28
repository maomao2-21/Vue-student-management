<template>
   <el-image :src="imgSrc" :preview-src-list="comImgPriview" :class="imgStyle"></el-image>
</template>

<script>
export default {
  name: 'mImage',
  props: {
    // 图片地址
    imgSrc: String,
    // 图片数组
    imgArr: [Array],
    // 图片Class
    imgStyle: String
  },
  computed:{
    comImgPriview(){
      const arrImgSrc = [''];
      if(this.imgArr !== undefined) {
        return this.imgArr;
      }
      arrImgSrc[0] = this.imgSrc;
      return arrImgSrc;
    }
  }
};
</script>

<style lang="less" scoped="scoped">
</style>
