<template>
  <div>
    <span v-for="(item, index) in areas" :key="index">
      <el-select
        v-model="ids[index]"
        value-key="Id"
        placeholder="请选择地区"
        clearable
        filterable
        @change="change($event, index)"
        :style="
          'width: calc((100% - 10px) / ' +
          len +
          ');' +
          (index < len - 1 ? 'margin-right: 5px' : '')
        "
      >
        <el-option
          v-for="item in areas[index]"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        >
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    ids: Array,
    len: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      areaIds: [],
      areas: [[]],
    };
  },
  created() {
    console.log(this.len);
    var that = this;
    this.$get("/api/area/area-dropdown-box", null).then(function (r) {
      that.areas.splice(0, 1, r);
    });
    this.build();
  },
  methods: {
    build() {
      var that = this;
      if (that.ids && that.ids[0]) {
        that
          .$get("/api/area/area-dropdown-box", {
            parentid: that.ids[0],
          })
          .then(function (r) {
            that.areas.splice(1, 2, r);
            if (that.ids[1]) {
              that
                .$get("/api/area/area-dropdown-box", {
                  parentid: that.ids[1],
                })
                .then(function (r) {
                  that.areas.splice(2, 1, r);
                });
            }
          });
      }
    },
    change(value, index) {
      let that = this;
      if (value) {
        if (index != this.len - 1) {
          this.$get("/api/area/area-dropdown-box", { parentid: value }).then(
            function (r) {
              that.ids.splice(index + 1, 2 - index);
              that.areas.splice(index + 1, 2 - index, r);
              that.$emit("handleChange", that.ids);
            }
          );
        } else {
          that.ids.splice(0, 0);
          that.areas.splice(0, 0);
          that.$emit("handleChange", that.ids);
        }
      } else {
        that.ids.splice(index, 3 - index);
        that.areas.splice(index + 1, 2 - index);
        that.$emit("handleChange", that.ids);
      }
    },
  },
  watch: {
    ids(val) {
      if (val.length == 0) {
        this.areas.splice(1, 2);
      }
      if (this.areaIds.length == 0 && val.length != 0) {
        this.build();
      }
      this.areaIds = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>