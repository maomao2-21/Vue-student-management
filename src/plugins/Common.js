import moment from 'moment/moment';

export default {
  install (Vue, options) {
/***********************************************************************************************
    系統配置
************************************************************************************************/

    //Regin API地址
    Vue.prototype.$ServerUrl = function(){
      return 'http://192.168.1.19:8070';
    };
    //Endregin API地址

    //Regin 上传文件地址
    Vue.prototype.$UploadSrc = function(obj){
      let strType = '';
      switch(obj){
        case 1:// 头像
          strType = 'Avatar/';
          break;
        case 2:// 图片/照片
          strType = 'Photo/';
          break;
        case 3:// 奖
          strType = 'PrizePunish/';
          break;
        case 4:// OFFICE类文件
          strType = 'WORD/';
          break;
      }
      return strType + this.$UploadTime();
    };
    //Endregin 上传文件地址


/***********************************************************************************************
    日志操作
************************************************************************************************/
    /*
      保存日志
      @objType:日志类型
      @objUrl:页面地址
    */
    Vue.prototype.$SaveLog = function(objType,objUrl){
      console.log('日志操作');
    };

/***********************************************************************************************
    Session类设置
************************************************************************************************/
    //Regin 保存登录凭证
    Vue.prototype.$SaveKey = function(obj){
      localStorage.setItem('accessToken',JSON.stringify(obj));
    };
    //Endregin 保存登录凭证

    //Regin 获取登录凭证
    Vue.prototype.$GetKey = function(){
      return JSON.parse(localStorage.getItem('accessToken'));
    };
    //Endregin 获取登录凭证

    /*Regin
      保存临时信息
      @objSessionName: 名称
      @objSessionValue: 值
    */
    Vue.prototype.$SaveSession = function(objSessionName,objSessionValue){
      localStorage.setItem(objSessionName,JSON.stringify(objSessionValue));
    };
    //Endregin 保存临时信息

    /*Regin
      获取临时信息
      @objSessionName: 名称
    */
    Vue.prototype.$GetSession = function(objSessionName){
      return JSON.parse(localStorage.getItem(objSessionName));
    };
    //Endregin 获取临时信息

    /*Regin
      删除临时信息
      @objSessionName: 名称为空时，删除所有
    */
    Vue.prototype.$RemoveSession = function(objSessionName){
      if(this.$Verify_Null(objSessionName)){
        localStorage.removeItem(objSessionName);
      }else{
        localStorage.clear();
      }
    };
    //Endregin 删除临时信息

/***********************************************************************************************
    各类时间转换
************************************************************************************************/
    //Regin 日历时间转换
    Vue.prototype.$TimeFormat_Calendar = function(objValue) {
      if ( objValue !== undefined ) {
        let letDate = objValue;
        let format = letDate.replace(/-/g, '/');
        let time= Date.parse(new Date(format));
        let transTime = moment(letDate).format('YYYY/MM/DD HH:mm:ss');
        let Mydate = new Date(transTime);
        return Mydate;
      }
      return objValue;
    };
    //Endregion 日历时间转换

    //Regin 上传活动报告所显示的时间
    Vue.prototype.$TimeFormat_Result = function(objTime) {
      let dateBegin = new Date(objTime);
      let dateNow = new Date();
      // 时间差的毫秒数
      let dateDiff = dateNow.getTime() - dateBegin.getTime();
      // 计算出相差天数
      let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
      // 计算天数后剩余的毫秒数
      let leave1 = dateDiff % (24 * 3600 * 1000);
      // 计算出小时数
      let hours = Math.floor(leave1 / (3600 * 1000));
      // 计算相差分钟数
      // 计算小时数后剩余的毫秒数
      let leave2 = leave1 % (3600 * 1000);
      // 计算相差分钟数
      let minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      //计算分钟数后剩余的毫秒数
      let leave3 = leave2 % (60 * 1000);
      let seconds = Math.round(leave3 / 1000);
      // dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒"
      if (parseInt(dayDiff) > 0) {
        return this.$TimeFormat_EN(objTime);
      } else {
        if (parseInt(hours) > 0) {
          return (hours + '小时前');
        } else {
          return (minutes + '分钟前');
        }
      }
      return (dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒");
    };
    //Endregion 上传活动报告所显示的时间

    //Regin 输出为英文格式
    Vue.prototype.$TimeFormat_EN = function(objValue) {
      if ( objValue !== undefined ) {
        let format = objValue.replace(/-/g, '/');
        let time= Date.parse(new Date(format));
        let transTime = moment(objValue).format('YYYY/MM/DD HH:mm:ss');
        let date = new Date(objValue);
        //年
        let letYear = date.getFullYear();
        // 月
        let letMonth = date.getMonth() + 1;
        letMonth = letMonth < 10 ? ('0' + letMonth) : letMonth;
        // 日
        let letDay = date.getDate();
        letDay = letDay < 10 ? ('0' + letDay) : letDay;
        // 时
        let letHour = date.getHours();
        letHour = letHour < 10 ? ('0' + letHour) : letHour;
        // 分
        let letMinute = date.getMinutes();
        letMinute = letMinute < 10 ? ('0' + letMinute) : letMinute;
        // 时
        let letSecond = date.getSeconds();
        letSecond = letSecond < 10 ? ('0' + letSecond) : letSecond;
        let letTime = letHour + ':' + letMinute;
        return (letYear + '-' + letMonth + '-' + letDay + ' ' + letTime);
      }
      return objValue;
    };
    //Endregin 输出为英文格式

    /*Regin
      时间格式化，输出为中文时间格式
      objValue：需要格式化的时间
      objType: 显示的需求 0：年月日；1：年月；2：月日
      isTime：是否显示时间
    */
    Vue.prototype.$TimeFormat = function(objValue,objType,isTime) {
      if ( objValue !== undefined ) {
        let format = objValue.replace(/-/g, '/');
        let time= Date.parse(new Date(format));
        let transTime = moment(objValue).format('YYYY/MM/DD HH:mm:ss');
        let date = new Date(transTime);
        //年
        let letYear = date.getFullYear();
        // 月
        let letMonth = date.getMonth() + 1;
        letMonth = letMonth < 10 ? ('0' + letMonth) : letMonth;
        // 日
        let letDay = date.getDate();
        letDay = letDay < 10 ? ('0' + letDay) : letDay;
        // 时
        let letHour = date.getHours();
        letHour = letHour < 10 ? ('0' + letHour) : letHour;
        // 分
        let letMinute = date.getMinutes();
        letMinute = letMinute < 10 ? ('0' + letMinute) : letMinute;
        // 时
        let letSecond = date.getSeconds();
        letSecond = letSecond < 10 ? ('0' + letSecond) : letSecond;
        let letTime = '';
        if (isTime) {
          letTime = letHour + ':' + letMinute;
        }
        switch (parseInt(objType)) {
          case 0:
            return (letYear + '年' + letMonth + '月' + letDay + '日' + ' '+ letTime);
          case 1:
            return (letYear + '年' + letMonth + '月' + ' '+ letTime);
          case 2:
            return (letMonth + '月' + letDay + '日' + ' '+ letTime);
        }
      }
      return objValue;
    };
    //Endregin 时间格式化，输出为中文时间格式

    //Regin 获取当前时间 用于上传时间 例如20200101
    Vue.prototype.$UploadTime = function(){
      let date = new Date();
      //年
      let letYear = date.getFullYear();
      // 月
      let letMonth = date.getMonth() + 1;
      letMonth = letMonth < 10 ? ('0' + letMonth) : letMonth;
      // 日
      let letDay = date.getDate();
      letDay = letDay < 10 ? ('0' + letDay) : letDay;
      return letYear.toString()+letMonth.toString()+letDay.toString();
    };


/***********************************************************************************************
    各类正则表达式
************************************************************************************************/
    /*Regin
      验证是否为空
      @false:空
    */
    Vue.prototype.$Verify_Null = function(obj){
      if(obj == null || obj == "") {
        return false;
      } else {
        return true;
      }
    };
    //Endregion 验证是否为空

  }
};
