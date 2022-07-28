<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      size="normal"
    >
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
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="头像" prop="PhotoFileStorageId">
                <div>
                  <el-upload
                    style="
                      width: 295px;
                      height: 413px;
                      line-height: 413px;
                      text-align: center;
                      font-size: 32px;
                      background-color: #eee;
                      color: #999;
                    "
                    action=""
                    :multiple="false"
                    :show-file-list="false"
                    :auto-upload="true"
                    :before-upload="handleBeforeUploadPhoto"
                    :http-request="handleUploadPhoto"
                  >
                    <el-image
                      v-if="form.PhotoFileStoragePath"
                      style="width: 295px; height: 413px"
                      :src="form.PhotoFileStoragePath"
                      fit="cover"
                    ></el-image>
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :lg="16" :md="24" :offset="0">
              <el-form-item label="学号" prop="Code">
                <el-input v-model="form.Code" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="16" :md="24" :offset="0">
              <el-form-item label="姓名" prop="Name">
                <el-input v-model="form.Name" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="性别" prop="Gender">
                <lazy-select
                  ref="form_Gender"
                  :form="form"
                  prop="Gender"
                  :options="[
                    { Id: 1, Name: '男' },
                    { Id: 2, Name: '女' },
                  ]"
                ></lazy-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="困难生" prop="IsDifficult">
                <el-checkbox
                  v-model="form.IsDifficult"
                  :indeterminate="false"
                ></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="状态" prop="Status">
                <lazy-select
                  ref="form_Status"
                  :form="form"
                  prop="Status"
                  :options="[
                    { Id: 1, Name: '就读' },
                    { Id: 2, Name: '毕业' },
                    { Id: 3, Name: '休学' },
                  ]"
                ></lazy-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="入学年份" prop="EnrollmentYear">
                <el-date-picker
                  v-model="form.EnrollmentYear"
                  type="year"
                  format="yyyy"
                  value-format="yyyy"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="16" :md="24" :offset="0">
              <el-form-item label="班级" prop="SchoolClassId">
                <lazy-select
                  ref="form_SchoolClassId"
                  :form="form"
                  prop="SchoolClassId"
                  action="/api/school-class/dropdown-box"
                  :immediate="true"
                  @handleSelectChange="handleSchoolClassIdSelectChange"
                ></lazy-select>
              </el-form-item>
            </el-col>
            <el-col :lg="16" :md="24" :offset="0">
              <el-form-item
                label="专业部"
                prop="SchoolClassProfessionalDepartment"
              >
                {{ form.SchoolClassProfessionalDepartment }}
              </el-form-item>
            </el-col>
            <el-col :lg="16" :md="24" :offset="0">
              <el-form-item label="专业" prop="SchoolClassProfessional">
                {{ form.SchoolClassProfessional }}
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
            <span>家庭情况</span>
            <el-button
              @click="handleAddStudentContacts"
              type="primary"
              class="card-btn"
              size="mini"
              >添加</el-button
            >
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
                  <div
                    class="emergencyCont"
                    @click="handleDeleteStudentContacts(index)"
                  >
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#fax-times"></use>
                    </svg>
                  </div>
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
                  <div class="divBottomCont" v-if="item.Company">
                    <span class="spFont">{{ item.Company }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-alert
            v-else
            title="（还未添加家庭情况）"
            type="warning"
            show-icon
          >
          </el-alert>
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
                <Editor
                  :form="form"
                  prop="Hobby"
                  @blur="validateField('Hobby')"
                ></Editor>
              </el-form-item>
            </el-col>
            <el-col :lg="24" :md="24" :offset="0">
              <el-form-item label="个人特长" prop="PersonalSpecialty">
                <Editor
                  :form="form"
                  prop="PersonalSpecialty"
                  @blur="validateField('PersonalSpecialty')"
                ></Editor>
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
                <el-input v-model="form.IdCard" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="出生日期" prop="Birthday">
                <el-date-picker
                  v-model="form.Birthday"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="民族" prop="DicNationId">
                <lazy-select
                  ref="form_DicNationId"
                  :form="form"
                  prop="DicNationId"
                  action="/api/student/dic-nation-dropdown-box"
                ></lazy-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="籍贯" prop="NativeAddressAreaIds">
                <Area :ids.sync="form.NativeAddressAreaIds"></Area>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="户籍地" prop="RegisteredAddressAreaIds">
                <Area :ids.sync="form.RegisteredAddressAreaIds"></Area>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="生源地" prop="SourceAddressAreaIds">
                <Area :ids.sync="form.SourceAddressAreaIds"></Area>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="政治面貌" prop="DicPoliticCountenanceId">
                <lazy-select
                  ref="form_DicPoliticCountenanceId"
                  :form="form"
                  prop="DicPoliticCountenanceId"
                  action="/api/student/dic-politic-countenance-dropdown-box"
                ></lazy-select>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="家庭地址" prop="HomeAddress">
                <el-input
                  v-model="form.HomeAddress"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="家庭电话" prop="ContactNumber">
                <el-input
                  v-model="form.ContactNumber"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="邮编" prop="PostalCode">
                <el-input
                  v-model="form.PostalCode"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="学校邮箱" prop="SchoolEmail">
                <el-input
                  v-model="form.SchoolEmail"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="私人邮箱" prop="PrivateEmail">
                <el-input
                  v-model="form.PrivateEmail"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="QQ" prop="QQNumber">
                <el-input
                  v-model="form.QQNumber"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="微信号" prop="WeChatNumber">
                <el-input
                  v-model="form.WeChatNumber"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="手机号码" prop="PhoneNumber">
                <el-input
                  v-model="form.PhoneNumber"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="24" :offset="0">
              <el-form-item label="手机短号" prop="PhoneShortNumber">
                <el-input
                  v-model="form.PhoneShortNumber"
                  style="width: 100%"
                ></el-input>
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
            <el-button
              @click="handleAddStudentEducationalExperiences"
              type="primary"
              class="card-btn"
              size="mini"
              >添加</el-button
            >
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
          <el-alert
            v-else
            title="（还未添加教育经历）"
            type="warning"
            show-icon
          ></el-alert>
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
                <Editor
                  :form="form"
                  prop="Remark"
                  @blur="validateField('Remark')"
                ></Editor>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <el-row :gutter="20" class="form-footer">
        <el-col :span="12" :offset="0">
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-drawer
      ref="drawerFormStudentContact"
      title="添加家庭情况"
      :visible.sync="studentContactsShow"
      direction="rtl"
      :append-to-body="true"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <simple-form
        :items="studentContactsItems"
        @handleSubmit="handleStudentContactsSubmit"
      ></simple-form>
    </el-drawer>

    <el-drawer
      ref="drawerFormStudentEducationalExperiences"
      title="添加教育经历"
      :visible.sync="studentEducationalExperiencesShow"
      direction="rtl"
      :append-to-body="true"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <simple-form
        :items="studentEducationalExperiencesItems"
        @handleSubmit="handleStudentEducationalExperiencesSubmit"
      ></simple-form>
    </el-drawer>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
import LazySelect from "@/components/LazySelect.vue";
import Area from "@/components/Area.vue";
import SimpleForm from "@/components/SimpleForm.vue";
import moment from "moment";
export default {
  components: { Editor, LazySelect, Area, SimpleForm },
  created() {},
  mounted() {
    let that = this;
    if (this.id) {
      this.$get("/api/student/" + this.id, null).then(function (r) {
        if (r) {
          that.form.Id = r.Id;
          that.form.PhotoFileStorageId = r.PhotoFileStorageId;
          if (r.PhotoFileStorageId) {
            that.form.PhotoFileStoragePath =
              that.baseURL + r.PhotoFileStoragePath;
          }
          that.form.Name = r.Name;
          that.form.Gender = r.Gender;
          if (r.Gender) {
            that.$refs.form_Gender.handleSelectFocus();
          }
          that.form.IsDifficult = r.IsDifficult;
          that.form.EnrollmentYear = r.EnrollmentYear + "";
          that.form.Status = r.Status;
          if (r.Status) {
            that.$refs.form_Status.handleSelectFocus();
          }
          that.form.Code = r.Code;
          that.form.SchoolClassProfessionalDepartment =
            r.SchoolClassProfessionalDepartment;
          that.form.SchoolClassProfessional = r.SchoolClassProfessional;
          that.form.SchoolClassId = r.SchoolClassId;
          if (r.SchoolClassId) {
            that.$refs.form_SchoolClassId.handleSelectFocus();
          }
          that.form.StudentContacts = r.StudentContacts.sort(
            (a, b) => b.IsEmergency - a.IsEmergency
          );
          that.form.Hobby = r.Hobby;
          that.form.PersonalSpecialty = r.PersonalSpecialty;
          that.form.IdCard = r.IdCard;
          that.form.Birthday = r.Birthday;
          that.form.DicNationId = r.DicNationId;
          if (r.DicNationId) {
            that.$refs.form_DicNationId.handleSelectFocus();
          }
          that.form.NativeAddressAreaIds = r.NativeAddressAreaIds;
          that.form.RegisteredAddressAreaIds = r.RegisteredAddressAreaIds;
          that.form.SourceAddressAreaIds = r.SourceAddressAreaIds;
          that.form.DicPoliticCountenanceId = r.DicPoliticCountenanceId;
          if (r.DicPoliticCountenanceId) {
            that.$refs.form_DicPoliticCountenanceId.handleSelectFocus();
          }
          that.form.HomeAddress = r.HomeAddress;
          that.form.ContactNumber = r.ContactNumber;
          that.form.PostalCode = r.PostalCode;
          that.form.SchoolEmail = r.SchoolEmail;
          that.form.PrivateEmail = r.PrivateEmail;
          that.form.QQNumber = r.QQNumber;
          that.form.WeChatNumber = r.WeChatNumber;
          that.form.PhoneNumber = r.PhoneNumber;
          that.form.PhoneShortNumber = r.PhoneShortNumber;
          that.form.StudentEducationalExperiences = r.StudentEducationalExperiences.sort(
            (a, b) => moment(b.Start) - moment(a.Start)
          );
          that.form.Remark = r.Remark;
        }
      });
    } else {
      this.form.Status = 1;
      this.$refs.form_Status.handleSelectFocus();
    }
  },
  methods: {
    handleSchoolClassIdSelectChange(v, data) {
      let schoolClass = data.filter((d) => d.Id == v);
      if (schoolClass && schoolClass.length > 0) {
        this.form.SchoolClassProfessionalDepartment =
          schoolClass[0].ProfessionalDepartment;
        this.form.SchoolClassProfessional = schoolClass[0].Professional;
      } else {
        this.form.SchoolClassProfessionalDepartment = null;
        this.form.SchoolClassProfessional = null;
      }
    },
    handleBeforeUploadPhoto(file) {
      if (file.type.indexOf("image/") == -1) {
        this.$message.error("上传照片只能是 图片 格式!");
        return false;
      }
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error("上传照片大小不能超过 2MB!");
        return false;
      }
      return true;
    },
    handleUploadPhoto(res) {
      let that = this;
      const data = new FormData();
      data.append("file", res.file);
      this.$post("/api/file-storage/upload/StudentPhoto", data).then(function (
        r
      ) {
        that.form.PhotoFileStorageId = r.Id;
        that.form.PhotoFileStoragePath = that.baseURL + r.Path;
      });
    },
    validateField(prop) {
      this.$refs.form.validateField(prop);
    },
    handleAddStudentContacts() {
      this.studentContactsShow = true;
    },
    handleDeleteStudentContacts(index) {
      this.form.StudentContacts.splice(index, 1);
      if (this.form.StudentContacts && this.form.StudentContacts.length > 0) {
        this.form.StudentContacts[0].IsEmergency = true;
      }
    },
    handleStudentContactsSubmit(f) {
      this.studentContactsShow = false;
      if (f.IsEmergency == undefined || f.IsEmergency == null) {
        f.IsEmergency = false;
      }
      if (this.form.StudentContacts.length == 0) {
        f.IsEmergency = true;
      }
      if (f.IsEmergency && this.form.StudentContacts.length > 0) {
        for (let i = 0; i < this.form.StudentContacts.length; i++) {
          const element = this.form.StudentContacts[i];
          element.IsEmergency = false;
        }
      }
      this.form.StudentContacts.push(f);
      this.form.StudentContacts = this.form.StudentContacts.sort(
        (a, b) => b.IsEmergency - a.IsEmergency
      );
      this.$refs.drawerFormStudentContact.closeDrawer();
    },
    handleAddStudentEducationalExperiences() {
      this.studentEducationalExperiencesShow = true;
    },
    handleDeleteStudentEducationalExperiences(index) {
      this.form.StudentEducationalExperiences.splice(index, 1);
    },
    handleStudentEducationalExperiencesSubmit(f) {
      this.studentEducationalExperiencesShow = false;
      if (f.Dates && f.Dates.length == 2) {
        f.Start = f.Dates[0];
        f.End = f.Dates[1];
      }
      this.form.StudentEducationalExperiences.push(f);
      this.form.StudentEducationalExperiences = this.form.StudentEducationalExperiences.sort(
        (a, b) => moment(b.Start) - moment(a.Start)
      );
      this.$refs.drawerFormStudentEducationalExperiences.closeDrawer();
    },
    handleSubmit() {
      var that = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          var request = that.id ? that.$put : that.$post;
          request("/api/student", that.form).then(function (r) {
            that.$emit("handleSubmit");
          });
        } else {
          return false;
        }
      });
    },
  },
  filters: {
    date(v) {
      if (!v) {
        return "";
      }
      return moment(v).format("YYYY-MM-DD");
    },
  },
  props: {
    id: String,
  },
  data() {
    return {
      /** 表单数据 */
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
      /** 表单校验 */
      rules: {
        Code: [
          { required: true, message: "必填", trigger: "blur" },
          {
            max: 256,
            message: "文本长度不能超过 256 个字符",
            trigger: "blur",
          },
        ],
        Name: [
          { required: true, message: "必填", trigger: "blur" },
          {
            max: 256,
            message: "文本长度不能超过 256 个字符",
            trigger: "blur",
          },
        ],
        Gender: [{ required: true, message: "必填", trigger: "change" }],
        EnrollmentYear: [
          { required: true, message: "必填", trigger: "change" },
        ],
        SchoolClassId: [{ required: true, message: "必填", trigger: "change" }],
      },
      studentEducationalExperiencesShow: false,
      studentEducationalExperiencesItems: [
        {
          prop: "Name",
          label: "学校名称",
          type: "text",
          required: true,
          max: 256,
          span: 24,
        },
        {
          prop: "Education",
          label: "学历",
          type: "text",
          required: true,
          max: 256,
          span: 24,
        },
        {
          prop: "Dates",
          label: "教育时间",
          type: "daterange",
          required: true,
          span: 24,
        },
      ],
      studentContactsShow: false,
      studentContactsItems: [
        {
          prop: "IsEmergency",
          label: "紧急联系人",
          type: "check",
          span: 24,
        },
        {
          prop: "Name",
          label: "家长姓名",
          type: "text",
          required: true,
          max: 256,
          span: 24,
        },
        {
          prop: "Call",
          label: "家长称谓",
          type: "text",
          required: true,
          max: 2,
          span: 24,
        },
        {
          prop: "PhoneNumber",
          label: "家长联系电话",
          type: "text",
          required: true,
          max: 256,
          span: 24,
        },
        {
          prop: "Job",
          label: "家长职务",
          type: "text",
          max: 256,
          span: 24,
        },
        {
          prop: "Company",
          label: "家长单位",
          type: "text",
          max: 256,
          span: 24,
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped="scoped">
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