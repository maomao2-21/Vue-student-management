<!--头像 /*专用于学生头像，当默认头像失效或无头像时，根据学生性别显示头像*/-->
<template>
    <el-image :src="comAvatarSrc" class="divAvatarCont" :class="imgClass">
      <div slot="error" class="image-slot">
        <img :src="comGenderSrc" class="imgGender"  />
      </div>
    </el-image>
</template>

<script>
  export default {
    name: 'mAvatar',
    props: {
      // 头像图片地址
      src: {
        type: String,
        default: ''
      },
      // 性别用于显示默认头像的
      gender: {
        type: String,
        default: '男'
      },
      // 自定义图片样式,一般用于大小
      imgClass: String
    },
    data(){
      return{

      };
    },
    computed:{
      // 当没有头像时，需要显示男女头像
      comGenderSrc() {
        // 男 male 可后继再加条件
        if(this.gender === '男' || this.gender.toUpperCase() === 'MALE') {
          // 男
          return require('@/assets/image/img_avatar_male.png');
        } else {
          // 女
          return require('@/assets/image/img_avatar_female.png');
        }
      },
      // 拼接学生头像
      comAvatarSrc() {
        if(this.src.length>0) {
          return require('@/assets/image/'+this.src);
        } else {
          return this.src;
        }
      }
    }
  };
</script>

<style scoped="scoped">
  .divAvatarCont{
    width: 3.125rem;/*50px*/
    height: 3.125rem;/*50px*/
    border-radius: 50%;
  }
  .divAvatarCont .imgGender{
    width: 100%;
  }
</style>
