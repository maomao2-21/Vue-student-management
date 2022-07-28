<template>
  <el-form :model="form" ref="form" label-width="120px" size="normal">
    <div class="form-body">
      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>基础信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :lg="8" :md="24" :offset="0" style="text-align: center">
            <div
              style="
                display: inline-block;
                width: 180px;
                height: 250px;
                line-height: 250px;
                text-align: center;
                font-size: 32px;
                background-color: #eee;
                color: #999;
              "
            >
              <el-image
                v-if="form.PhotoFileStoragePath"
                style="width: 180px; height: 250px"
                :src="form.PhotoFileStoragePath"
                fit="cover"
              ></el-image>
              <!-- <i v-else class="el-icon-plus"></i> -->
            </div>
          </el-col>
          <el-col :lg="16" :md="24" :offset="0">
            <div class="infoList clearfix">
              <span class="spName">{{ form.Name }}</span>
              <span class="spGender">
                <svg
                  class="icon maleColor"
                  aria-hidden="true"
                  v-if="form.Gender == 1"
                >
                  <use xlink:href="#fax-mars-circle-alt"></use>
                </svg>
                <svg class="icon femaleColor" aria-hidden="true" v-else>
                  <use xlink:href="#fax-mars-circle-alt"></use>
                </svg>
              </span>
              <span class="spLabel" v-if="form.IsDifficult"
                ><label>困难生</label></span
              >
            </div>
            <div class="infoList clearfix">
              <span class="spFonts">{{ form.EnrollmentYear }}</span>
              <span class="spFonts" v-if="form.Status == 1">就读</span>
              <span class="spFonts" v-else-if="form.Status == 2">毕业</span>
              <span class="spFonts" v-else-if="form.Status == 3">休学</span>
            </div>
            <div class="infoList clearfix">
              <span class="spFonts">
                <svg class="icon faxSize" aria-hidden="true">
                  <use xlink:href="#fax-font-number-o"></use>
                </svg>
                {{ form.Code }}
              </span>
              <span class="spFonts">
                <svg class="icon faxSize" aria-hidden="true">
                  <use xlink:href="#fax-font-ban-o"></use>
                </svg>
                {{ form.SchoolClassProfessionalDepartment }}&nbsp;/&nbsp;{{
                  form.SchoolClassProfessional
                }}&nbsp;/&nbsp;{{ form.SchoolClassName }}
              </span>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>家庭情况</span>
        </div>
        <el-row v-if="form.StudentContacts.length > 0" :gutter="20">
          <el-col
            v-for="(item, index) in form.StudentContacts"
            :key="index"
            :lg="8"
            :md="12"
            :sm="24"
            :offset="0"
          >
            <el-card
              shadow="always"
              :body-style="{ padding: '20px' }"
              style="margin-bottom: 15px"
            >
              <div class="familyList">
                <div class="divTopCont">
                  <div
                    class="appellativeCont VerticalMid"
                    style="
                      text-overflow: ellipsis;
                      overflow: hidden;
                      word-break: break-all;
                      white-space: nowrap;
                    "
                  >
                    <el-tooltip
                      effect="dark"
                      :content="item.Call"
                      placement="bottom"
                    >
                      <span>{{ item.Call }}</span>
                    </el-tooltip>
                  </div>
                  <div class="memberName">
                    {{ item.Name }}&nbsp;<span
                      class="spLabel"
                      v-if="item.IsEmergency"
                      >紧急联系人</span
                    >
                  </div>
                  <div class="memberPhone">{{ item.PhoneNumber }}</div>
                  <div class="memberPosition" v-if="item.Job">
                    <span class="spFont">{{ item.Job }}</span>
                  </div>
                </div>
                <div class="divBottomCont" v-if="item.Job">
                  <span class="spFont">{{ item.Company }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-alert v-else title="暂无数据" type="warning" show-icon> </el-alert>
      </el-card>

      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>兴趣特长</span>
        </div>
        <el-row :gutter="20">
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="兴趣爱好" prop="Hobby">
              <span v-html="form.Hobby"></span>
            </el-form-item>
          </el-col>
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="个人特长" prop="PersonalSpecialty">
              <span v-html="form.PersonalSpecialty"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>其他相关信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="身份证号" prop="IdCard">
              {{ form.IdCard }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="出生日期" prop="Birthday">
              {{ form.Birthday | date }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="民族" prop="DicNationName">
              {{ form.DicNationName }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="籍贯" prop="NativeAddressProvinceAreaName">
              <span v-if="form.NativeAddressProvinceAreaName">{{
                form.NativeAddressProvinceAreaName
              }}</span>
              <span v-if="form.NativeAddressCityAreaName">
                {{ form.NativeAddressCityAreaName }}</span
              >
              <span v-if="form.NativeAddressAreaName">
                {{ form.NativeAddressAreaName }}</span
              >
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="户籍地" prop="SourceAddressProvinceAreaName">
              <span v-if="form.SourceAddressProvinceAreaName">{{
                form.SourceAddressProvinceAreaName
              }}</span>
              <span v-if="form.SourceAddressCityAreaName">
                {{ form.SourceAddressCityAreaName }}</span
              >
              <span v-if="form.SourceAddressAreaName">
                {{ form.SourceAddressAreaName }}</span
              >
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item
              label="生源地"
              prop="RegisteredAddressProvinceAreaName"
            >
              <span v-if="form.RegisteredAddressProvinceAreaName">{{
                form.RegisteredAddressProvinceAreaName
              }}</span>
              <span v-if="form.RegisteredAddressCityAreaName">
                {{ form.RegisteredAddressCityAreaName }}</span
              >
              <span v-if="form.RegisteredAddressAreaName">
                {{ form.RegisteredAddressAreaName }}</span
              >
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="政治面貌" prop="DicPoliticCountenanceName">
              {{ form.DicPoliticCountenanceName }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="家庭地址" prop="HomeAddress">
              {{ form.HomeAddress }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="家庭电话" prop="ContactNumber">
              {{ form.ContactNumber }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="邮编" prop="PostalCode">
              {{ form.PostalCode }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="学校邮箱" prop="SchoolEmail">
              {{ form.SchoolEmail }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="私人邮箱" prop="PrivateEmail">
              {{ form.PrivateEmail }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="QQ" prop="QQNumber">
              {{ form.QQNumber }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="微信号" prop="WeChatNumber">
              {{ form.WeChatNumber }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="手机号码" prop="PhoneNumber">
              {{ form.PhoneNumber }}
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :offset="0">
            <el-form-item label="手机短号" prop="PhoneShortNumber">
              {{ form.PhoneShortNumber }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>教育经历</span>
        </div>
        <el-row
          v-if="form.StudentEducationalExperiences.length > 0"
          :gutter="20"
        >
          <el-col
            v-for="(item, index) in form.StudentEducationalExperiences"
            :key="index"
            :lg="6"
            :md="12"
            :sm="24"
            :offset="0"
          >
            <el-card
              shadow="always"
              :body-style="{ padding: '20px' }"
              style="margin-bottom: 15px"
            >
              <div class="schoolInfo">
                {{ item.Name }}
                <span class="spTime"
                  >{{ item.Start | date }}&nbsp;-&nbsp;{{
                    item.End | date
                  }}</span
                >
              </div>
              <div class="schoolLevel">
                <span class="spFont">{{ item.Education }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-alert v-else title="暂无数据" type="warning" show-icon> </el-alert>
      </el-card>

      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
        style="margin-bottom: 15px"
      >
        <div slot="header">
          <span>备注</span>
        </div>
        <el-row :gutter="20">
          <el-col :lg="24" :md="24" :offset="0">
            <el-form-item label="备注" prop="Remark">
              <span v-html="form.Remark"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-form>
</template>

<script>
import moment from "moment/moment";
export default {
  filters: {
    date(v) {
      if (!v) {
        return "";
      }
      return moment(v).format("YYYY-MM-DD");
    },
  },
  created() {
    let that = this;
    if (this.id) {
      this.$get("/api/student/" + this.id).then(function (r) {
        if (r) {
          that.form.Id = r.Id;
          if (r.PhotoFileStorageId) {
            that.form.PhotoFileStoragePath =
              that.baseURL + r.PhotoFileStoragePath;
          }
          that.form.Name = r.Name;
          that.form.Gender = r.Gender;
          that.form.IsDifficult = r.IsDifficult;
          that.form.EnrollmentYear = r.EnrollmentYear + "";
          that.form.Status = r.Status;
          that.form.Code = r.Code;
          that.form.SchoolClassProfessionalDepartment =
            r.SchoolClassProfessionalDepartment;
          that.form.SchoolClassProfessional = r.SchoolClassProfessional;
          that.form.SchoolClassName = r.SchoolClassName;
          that.form.StudentContacts = r.StudentContacts.sort(
            (a, b) => b.IsEmergency - a.IsEmergency
          );
          that.form.Hobby = r.Hobby??"--";
          that.form.PersonalSpecialty = r.PersonalSpecialty??"--";
          that.form.IdCard = r.IdCard??"--";
          that.form.Birthday = r.Birthday??"--";
          that.form.DicNationName = r.DicNationName??"--";
          that.form.NativeAddressProvinceAreaName =
            r.NativeAddressProvinceAreaName??"--";
          that.form.NativeAddressCityAreaName = r.NativeAddressCityAreaName??"--";
          that.form.NativeAddressAreaName = r.NativeAddressAreaName??"--";
          that.form.RegisteredAddressProvinceAreaName =
            r.RegisteredAddressProvinceAreaName??"--";
          that.form.RegisteredAddressCityAreaName =
            r.RegisteredAddressCityAreaName??"--";
          that.form.RegisteredAddressAreaName = r.RegisteredAddressAreaName??"--";
          that.form.SourceAddressProvinceAreaName =
            r.SourceAddressProvinceAreaName??"--";
          that.form.SourceAddressCityAreaName = r.SourceAddressCityAreaName??"--";
          that.form.SourceAddressAreaName = r.SourceAddressAreaName??"--";
          that.form.DicPoliticCountenanceName = r.DicPoliticCountenanceName??"--";
          that.form.HomeAddress = r.HomeAddress??"--";
          that.form.ContactNumber = r.ContactNumber??"--";
          that.form.PostalCode = r.PostalCode??"--";
          that.form.SchoolEmail = r.SchoolEmail??"--";
          that.form.PrivateEmail = r.PrivateEmail??"--";
          that.form.QQNumber = r.QQNumber??"--";
          that.form.WeChatNumber = r.WeChatNumber??"--";
          that.form.PhoneNumber = r.PhoneNumber??"--";
          that.form.PhoneShortNumber = r.PhoneShortNumber??"--";
          that.form.StudentEducationalExperiences = r.StudentEducationalExperiences.sort(
            (a, b) => moment(b.Start) - moment(a.Start)
          );
          that.form.Remark = r.Remark??"--";
        }
      });
    }
  },
  props: {
    id: String,
  },
  data() {
    return {
      form: {
        PhotoFileStorageId: null,
        PhotoFileStoragePath: null,
        Name: null,
        Gender: null,
        IsDifficult: false,
        EnrollmentYear: null,
        Status: null,
        Code: null,
        SchoolClassProfessionalDepartment: null,
        SchoolClassProfessional: null,
        SchoolClassId: null,

        StudentContacts: [],

        Hobby: null,
        PersonalSpecialty: null,

        IdCard: null,
        Birthday: null,
        DicNationId: null,
        NativeAddressAreaIds: [],
        RegisteredAddressAreaIds: [],
        SourceAddressAreaIds: [],
        DicPoliticCountenanceId: null,
        HomeAddress: null,
        ContactNumber: null,
        PostalCode: null,
        SchoolEmail: null,
        PrivateEmail: null,
        QQNumber: null,
        WeChatNumber: null,
        PhoneNumber: null,
        PhoneShortNumber: null,

        StudentEducationalExperiences: [],

        Remark: null,
      },
    };
  },
};
</script>

<style lang="css" scoped="scoped">
.infoList {
  padding-bottom: 17px;
}
.infoList .spName {
  font-size: 32px;
  color: #212e48;
  padding-right: 30px;
  height: 40px;
}
.infoList .spGender {
  font-size: 32px;
  padding-right: 30px;
  height: 40px;
}
.infoList .spLabel {
  height: 40px;
}
.infoList .spLabel label {
  position: absolute;
  top: 10px;
  background-color: #dd4b39;
  border: 1px solid #cf3421;
  border-radius: 5px;
  font-weight: normal;
  color: #ffffff;
  padding: 2px 10px;
  margin-bottom: 0;
}
.infoList .spFonts {
  color: #3b475d;
  padding-right: 30px;
  padding-left: 30px;
  border-right: 1px solid #d6d6d6;
}
.infoList .spFonts:first-child {
  padding-left: 0;
}
.infoList .spFonts:last-child {
  border-right: none;
}
.infoList .spMedal {
  padding-right: 15px;
}
.infoList .spFonts .faxSize {
  font-size: 18px;
}
.infoList .spFonts .icon {
  color: #b1b1b1;
}
.card-btn {
  float: right;
  margin-right: 5px;
}

.familyList {
  border: 2px solid #f0f0f0;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  overflow: hidden;
}
.familyList .divTopCont {
  padding-left: 80px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.familyList .divTopCont .appellativeCont {
  background-color: #069df7;
  color: #ffffff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  top: 15px;
  left: 15px;
}
.familyList .divTopCont .memberName {
  font-size: 18px;
  color: #303c54;
  font-weight: bold;
}
.familyList .divTopCont .memberName .spLabel {
  font-size: 12px;
  background-color: #e7f2ff;
  color: #2296ec;
  padding: 4px 10px;
  border-radius: 4px;
}
.familyList .divTopCont .memberPhone {
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
  color: #313d55;
}
.familyList .divTopCont .memberPosition .spFont {
  background-color: #7582a5;
  color: #ffffff;
  font-size: 14px;
  padding: 3px 10px;
}
.familyList .divBottomCont {
  border-top: 1px solid #f8f8f8;
  padding-top: 5px;
}
.familyList .divBottomCont .spFont {
  background-color: #f9f9f9;
  color: #3e4960;
  display: block;
  text-align: center;
  padding: 5px;
  letter-spacing: 1px;
}
.familyList .emergencyCont {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #dc3545;
  color: #ffffff;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 0px 5px 0px 5px;
  cursor: pointer;
}
.familyList .emergencyCont:hover {
  background-color: #c82333;
}

.schoolInfo {
  color: #4d5669;
}
.schoolInfo .spTime {
  color: #aeaebe;
  font-size: 14px;
}
.schoolLevel {
  padding-top: 5px;
}
.schoolLevel .spFont {
  font-size: 14px;
  color: #aeaebe;
  border: 1px solid #dfdfdf;
  border-radius: 30px;
  padding: 3px 30px;
}
</style>