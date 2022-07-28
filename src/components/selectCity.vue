<template>
  <div>
    <el-select
      clearable
      v-model="ProvinceAreaId"
      class="selectClass"
      @change="ProvinceChange(ProvinceAreaId, 1)"
      placeholder="请选择"
    >
      <el-option
        v-for="item in ProvinceOptions"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id"
      >
      </el-option>
    </el-select>

    <el-select
      clearable
      v-if="CityOptions"
      v-model="CityAreaId"
      class="selectClass"
      @change="ProvinceChange(CityAreaId, 2)"
      placeholder="请选择"
    >
      <el-option
        v-for="item in CityOptions"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id"
      >
      </el-option>
    </el-select>

    <el-select
      clearable
      v-model="AreaId"
      v-if="AreaOptions"
      class="selectClass"
      @change="ProvinceChange(AreaId)"
      placeholder="请选择"
    >
      <el-option
        v-for="item in AreaOptions"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { get } from "@/assets/request/http";
export default {
  props:{
    isEdit:Boolean ,
    editCityData:String
  },
  created() {
    let that = this;
    this.$get("/api/area/area-dropdown-box", null).then(function (r) {
      that.ProvinceOptions = r;
    });

    let ProvinceAreaId = this.$route.query.ProvinceAreaId;
    if(this.editCityData){
      ProvinceAreaId=this.editCityData
    }
    if (ProvinceAreaId) {
      let arr = ProvinceAreaId.split(",");
      if (arr[0]) {
        this.ProvinceAreaId = arr[0];
        this.$get("/api/area/area-dropdown-box?parentid=" + arr[0], null).then(
          function (r) {
            that.CityOptions = r;
          }
        );
      }
      if (arr[1]) {
        this.CityAreaId = arr[1];
        this.$get("/api/area/area-dropdown-box?parentid=" + arr[1], null).then(
          function (r) {
            that.AreaOptions = r;
          }
        );
      }
      if (arr[2]) {
        this.AreaId = arr[2];
      }
    }
  },
  data() {
    return {
      ProvinceAreaId: null,
      CityAreaId: null,
      AreaId: null,

      ProvinceOptions: null, // 省
      CityOptions: null, // 市
      AreaOptions: null, // 区
    };
  },
  methods: {
    upCityList() {
      
      if(this.isEdit){
         if(!this.CityAreaId && this.CityOptions){
            this.$emit("getCityList", null);
         }else if(!this.AreaId && this.AreaOptions){
            this.$emit("getCityList", null);
         }else {
            this.$emit("getCityList", [
              this.ProvinceAreaId ? this.ProvinceAreaId : "",
              this.CityAreaId ? this.CityAreaId : "",
              this.AreaId ? this.AreaId : "",
            ]);
         }
       return 
      }
      
      this.$emit("getCityList", [
        this.ProvinceAreaId ? this.ProvinceAreaId : "",
        this.CityAreaId ? this.CityAreaId : "",
        this.AreaId ? this.AreaId : "",
      ]);
      
    },
    ProvinceChange(val, index) {
      let that = this;
      if (!val) {
        if (index == 1) {
          this.CityOptions = null;
          this.AreaOptions = null;
          this.CityAreaId = null;
          this.AreaId = null;
        } else if (index == 2) {
          this.AreaOptions = null;
          this.AreaId = null;
        }
        that.upCityList();
        return;
      }
      if (index == 1) {
        this.CityOptions = null;
        this.AreaOptions = null;
        this.CityAreaId = null;
        this.AreaId = null;
      } else if (index == 2) {
        this.AreaOptions = null;
        this.AreaId = null;
      }
      that.upCityList();
      this.$get("/api/area/area-dropdown-box?parentid=" + val, null).then(
        function (r) {
          if (index == 1) {
            if(r.length>0){
              that.CityOptions = r;
            }
            that.upCityList();
          } else if (index == 2) {
            if(r.length>0){
              that.AreaOptions = r;
            }
            that.upCityList();
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.formControl {
  width: 100%;
}
.selectClass {
  width: 33.33%;
}
</style>