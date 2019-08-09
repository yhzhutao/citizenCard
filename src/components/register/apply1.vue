<template>
  <div id="target" class="box">
    <headerL></headerL>
    <div class="header011">
      <div class="container container-header01">
        <p>注册</p>
        <img :src="next" alt />
        <p>商户申请</p>
      </div>
    </div>
    <div class="container tabList">
      <!-- 基本信息 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>基本信息</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>工商注册名称</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(company,0)"
              style="width:300px;"
              placeholder="请输入"
              maxlength="20"
              v-model="company"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>商户所在地</p>
          </div>
          <div class="list-right">
            <el-cascader
              :options="options"
              id="vvalue"
              v-model="selectedOptions2"
              @change="handleChange(selectedOptions2)"
              :props="{ expandTrigger: 'hover' }"
              style="width:300px;"
            ></el-cascader>
            <!-- <router-link to="/reexmaine01">复审01</router-link> -->
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>详细地址</p>
          </div>
          <div>
            <div class="list-right">
              <el-input
                @input="getInput(detailed,1)"
                style="width:964px;"
                maxlength="99"
                placeholder="请输入"
                v-model="detailed"
                clearable
              ></el-input>
            </div>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>实际控制人</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(control,2)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="10"
              v-model="control"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>注册资本</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(capital,3)"
              style="width:220px;"
              maxlength="10"
              @blur="ziben(capital)"
              placeholder="请输入"
              v-model="capital"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>开业时间</p>
          </div>
          <div class="list-right">
            <el-date-picker
              @change="getTime(openTime,0)"
              v-model="openTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </li>
      </ul>
      <!-- 营业执照 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>营业执照</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>营业执照号</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(licenseNumber,4)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="25"
              v-model="licenseNumber"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>证件有效期</p>
          </div>
          <div class="list-right">
            <el-date-picker
              @change="getTime(cerTime,1)"
              v-model="cerTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>

            <el-checkbox @change="checkes(0)" v-model="checked1">有效期为永久</el-checkbox>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>证件图片</p>
          </div>
          <div style="width:900px;overflow:hidden;" class="list-right">
            <div class="file01">
              <img :src="addImg" />
              <form enctype="multipart/form-data" class="uploadForm">
                <input @change="upload(0,'yyzhzhwj')" type="file" class="pic_img" accept="image/*" />
              </form>
            </div>
            <ol style="height:140px;">
              <li class="deleteImg">
                <img class="avatar-d" :src="avatar0" alt />
                <p class="deleteI">
                  <img @click="deleteImage(0,'yyzhzhwj')" :src="deleteI" />
                </p>
              </li>
            </ol>
          </div>
        </li>
      </ul>
      <!-- 开户 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>开户许可证</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>开户许可证号</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(openNumber,5)"
              style="width:220px;"
              maxlength="25"
              placeholder="请输入"
              v-model="openNumber"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>证件图片</p>
          </div>
          <div style="width:900px;overflow:hidden;" class="list-right">
            <div class="file01">
              <img :src="addImg" />
              <form enctype="multipart/form-data" class="uploadForm">
                <input @change="upload(1,'khxkzhwj')" type="file" class="pic_img" accept="image/*" />
              </form>
            </div>

            <ol style="height:140px;">
              <li class="deleteImg">
                <img class="avatar-d" :src="avatar1" alt />
                <p class="deleteI">
                  <img @click="deleteImage(1,'khxkzhwj')" :src="deleteI" />
                </p>
              </li>
            </ol>
          </div>
        </li>
      </ul>
      <!-- 法人信息 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>法人信息</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>法人</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(legalPerson,7)"
              style="width:220px;"
              maxlength="10"
              placeholder="请输入"
              v-model="legalPerson"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>法人身份证号</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(legalPersonNumber,6)"
              @blur="idCard(legalPersonNumber,6)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="18"
              v-model="legalPersonNumber"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>证件有效期</p>
          </div>
          <div class="list-right">
            <el-date-picker
              @change="getTime(legalPersonTime,2)"
              v-model="legalPersonTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>

            <el-checkbox @change="checkes(1)" v-model="checked2">有效期为永久</el-checkbox>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>证件图片</p>
          </div>
          <div style="width:800px;overflow:hidden;" class="list-right">
            <div style="margin-bottom:10px;" class="file01 idCard-d">
              <img :src="addImg" />
              <p>证件正面</p>
              <form enctype="multipart/form-data" class="uploadForm">
                <input @change="upload(2,'sffzm')" type="file" class="pic_img" accept="image/*" />
              </form>
            </div>

            <ol style="height:140px;">
              <li class="deleteImg">
                <img class="avatar-d" :src="avatar2" alt />
                <p class="deleteI">
                  <img @click="deleteImage(2,'sffzm')" :src="deleteI" />
                </p>
              </li>
            </ol>
            <div class="file01 idCard-d">
              <img :src="addImg" />
              <p>证件反面</p>
              <form enctype="multipart/form-data" class="uploadForm">
                <input @change="upload(3,'sfzbm')" type="file" class="pic_img" accept="image/*" />
              </form>
            </div>

            <ol style="height:140px;">
              <li class="deleteImg">
                <img class="avatar-d" :src="avatar3" alt />
                <p class="deleteI">
                  <img @click="deleteImage(3,'sfzbm')" :src="deleteI" />
                </p>
              </li>
            </ol>
          </div>
        </li>
      </ul>
    </div>
    <div class="container">
      <button id="ones" @click="goNext()" class="next-d">下一步</button>
      <!-- <router-link to="/apply01">下一步</router-link>
      <router-link to="/userInfo">信息查看</router-link>-->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import headerL from "../public/headerLittle";
import footerF from "../public/headerD";
import logo from "../../assets/img/aboutUs/flge.png";
import options from "../../../static/js/city.js";
export default {
  data() {
    return {
      deleteI: require("../../assets/img/delete.png"),
      userNumber: "",
      company: "", //注册名称
      control: "", //实际控制人
      capital: "", //注册资本
      openTime: "", //开业时间
      licenseNumber: "", //营业执照号
      cerTime: "", //营业证件有效期
      openNumber: "", //开户许可号
      legalPersonNumber: "", //法人身份证号
      legalPersonTime: "", //法人证件有效期
      legalPerson: "", //法人
      input: "",
      logo,
      next: require("../../assets/img/next.png"),
      value: "",
      options: options,
      selectedOptions: [],
      selectedOptions2: "", //商户地
      detailed: "", //详细地址
      dialogImageUrl: "",
      dialogVisible: false,
      value1: "",
      value2: "",
      checked1: "",
      checked2: "",
      addImg: require("../../assets/img/addImg.png"),
      file: "",
      avatar0: "",
      avatar1: "",
      avatar2: "",
      avatar3: ""
    };
  },
  components: {
    footerF,
    headerL
  },
  methods: {
    deleteImage(e, v) {
      localStorage.removeItem(e);
      if (e == "0") {
        this.avatar0 = "";
      }
      if (e == "1") {
        this.avatar1 = "";
      }
      if (e == "2") {
        this.avatar2 = "";
      }
      if (e == "3") {
        this.avatar3 = "";
      }
    },
    goFirst() {
      this.$router.push({ name: "citizenCard" });
    },
    checkes(i) {
      if (i == 0) {
        localStorage.setItem("checked1", this.checked1);
        this.cerTime = "";
        localStorage.setItem("cerTime", "");
      } else if (i == 1) {
        localStorage.setItem("checked2", this.checked2);
        this.legalPersonTime = "";
        localStorage.setItem("legalPersonTime", "");
      }
      // //console..log(this.checked1)
    },
    //上传图片
    upload(e, v) {
      var that = this;
      var pic_img = $(".pic_img").eq(e);
      var uploadForm = $(".uploadForm").eq(e);
      var formData = new FormData(uploadForm[0]); //创建一个forData
      formData.append("file", pic_img[0].files[0]); //把file添加进去  name命名为img
      formData.append("moduleName", v);
      formData.append("fileType", pic_img[0].files[0].type);

      const loading = this.$loading({
        lock: true,
        text: "上传中 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      $.ajax({
        url: that.$api.api + "/gw/a1/upload",
        data: formData,
        type: "POST",
        async: false,
        cache: false,
        headers: { Authorization: localStorage.getItem("authorization") },
        contentType: false,
        processData: false,
        success: function(data) {
          //成功
          loading.close();
          console.log(data);
          if (data.code == "1") {
            that.$notify.error({
              title: data.msg,
              message: "请更换",
              position: "bottom-right"
            });
            return;
          }
          if (data.msg.indexOf("token") > -1) {
            alert("登陆失效,请重新登陆");
            that.$router.push({ name: "login" });
          } else if (data.msg == "token超时,请重新登录") {
            alert("登陆失效,请重新登陆");
            that.$router.push({ name: "login" });
          }
          if (data.code == "0") {
            localStorage.setItem(v, data.data);
            if (e == 0) {
              that.avatar0 = data.data;
            } else if (e == 1) {
              that.avatar1 = data.data;
            } else if (e == 2) {
              that.avatar2 = data.data;
            } else if (e == 3) {
              that.avatar3 = data.data;
            }
          }
        },
        error: function(err) {
          //失败
          setTimeout(function() {
            loading.close();
          }, 2000);
          //console..log(err);
          that.$notify.error({
            title: "上传遇到问题",
            message: "图片大小不得 大于 10MB",
            position: "bottom-right"
          });
          return;
        }
      });
    },
    goNext() {
      var that = this;
      var citys = $("#vvalue")
        .find("input")
        .val()
        .split("/");
      if (this.company.length < 1) {
        this.$notify.error({
          title: "工商注册名称不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      } else {
        if (!/^[A-Z|a-z|0-9|\u4e00-\u9fa5]+$/.test(this.company)) {
          this.$notify.error({
            title: "工商注册名称不可包含特殊字符",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
      if (citys.length < 2) {
        this.$notify.error({
          title: "商户所在地不可为空",
          message: "请选择",
          position: "bottom-right"
        });
        return;
      }
      if (this.control.length < 2) {
        this.$notify.error({
          title: "实际控制人不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      } else {
        if (!/^[\u4e00-\u9fa5]+$/.test(this.control)) {
          this.$notify.error({
            title: "实际控制人仅可输入文字",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
      if (this.capital.length < 1) {
        this.$notify.error({
          title: "注册资本不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      } else {
        if (!/^[0-9]+$/.test(this.capital)) {
          this.$notify.error({
            title: "注册资本仅可为数字",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
      if (this.openTime.length < 1) {
        this.$notify.error({
          title: "开业时间不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (this.licenseNumber.length < 1) {
        this.$notify.error({
          title: "营业执照号不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      } else {
        if (!/^[0-9|a-z|A-Z]+$/.test(this.licenseNumber)) {
          this.$notify.error({
            title: "营业执照号仅可为数字或字母",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }

      if (this.checked1 == true) {
        //永久有效期
      } else if (this.cerTime.length < 1) {
        this.$notify.error({
          title: "证件有效期不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (this.avatar0.length < 1) {
        this.$notify.error({
          title: "营业执照图片不可为空",
          message: "请上传",
          position: "bottom-right"
        });
        return;
      }

      if (this.legalPerson.length < 1) {
        this.$notify.error({
          title: "法人不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      } else {
        if (!/^[\u4e00-\u9fa5]+$/.test(this.legalPerson)) {
          this.$notify.error({
            title: "法人仅可输入文字",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
      if (this.legalPersonNumber.length < 18) {
        this.$notify.error({
          title: "法人身份证号错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      } else {
        if (!/^[0-9|a-z|A-Z]+$/.test(this.legalPersonNumber)) {
          this.$notify.error({
            title: "身份证号仅可为数字或字母",
            message: "请重新填写",
            position: "bottom-right"
          });
          return;
        }
      }
      if (this.legalPersonNumber.length < 18) {
        this.$notify.error({
          title: "法人身份证号不正确",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (this.checked2 == true) {
        //永久
      } else if (this.legalPersonTime.length < 1) {
        this.$notify.error({
          title: "法人证件有效期不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (this.avatar1.length < 1) {
        this.$notify.error({
          title: "开户许可证图片不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (this.avatar2.length < 1) {
        this.$notify.error({
          title: "法人证件图片正面不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (this.avatar3.length < 1) {
        this.$notify.error({
          title: "法人证件图片反面不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }

      var da1 = "",
        da2 = "";
      if (this.checked1 == true) {
        da1 = "永久";
      } else {
        da1 = localStorage.getItem("cerTime");
      }
      if (this.checked2 == true) {
        da2 = "永久";
      } else {
        da2 = localStorage.getItem("legalPersonTime");
      }
      // //console..log(this.selectedOptions2);

      localStorage.setItem("szds", citys[0]);
      localStorage.setItem("szdsh", citys[1]);
      localStorage.setItem("szdq", citys[2]);
      localStorage.setItem("zzyxq", da1);
      localStorage.setItem("sfzyxq", da2);

      var data = {
        gszcmc: localStorage.getItem("company"), // 工商注册名称
        szds: localStorage.getItem("szds"), // 所在地省：
        szdsh: localStorage.getItem("szdsh"), // 所在地市
        szdq: localStorage.getItem("szdq"), // 所在地区：
        xxdz: localStorage.getItem("detailed"), // 详细地址：
        yyzhzhhm: localStorage.getItem("licenseNumber"), // 营业执照号码：
        zzyxq: localStorage.getItem("zzyxq"), // 证件有效期
        yyzhzhwj: localStorage.getItem("yyzhzhwj"), //营业执照图片
        khxkzh: localStorage.getItem("openNumber"), // 开户许可证号：
        khxkzhwj: localStorage.getItem("khxkzhwj"), // 开户许可证：
        frdb: localStorage.getItem("legalPerson"), // 法定代表人：
        sfz: localStorage.getItem("legalPersonNumber"), // 法人身份证号码：
        sfzyxq: localStorage.getItem("sfzyxq"), // 身份证有效期：
        sffzm: localStorage.getItem("sffzm"), //正面
        sfzbm: localStorage.getItem("sfzbm"), //反面
        sjkzr: localStorage.getItem("control"), //实际控制人
        zczb: localStorage.getItem("capital"), //注册资本
        kysj: localStorage.getItem("openTime") // 开业时间：
      };
      //console..log(data);

      that.$router.push({ name: "applySecond" });
    },
    getTime(e, v) {
      const d = new Date(e);
      const resDate =
        d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
      //console..log(resDate, v);
      if (v == "0") {
        //开业时间
        localStorage.setItem("openTime", resDate);
      } else if (v == "1") {
        //营业执照证件有效期
        localStorage.setItem("cerTime", resDate);
        this.checked1 = false;
        localStorage.setItem("checked1", "false");
      } else if (v == "2") {
        //法人证件有效期
        localStorage.setItem("legalPersonTime", resDate);
        this.checked2 = false;
        localStorage.setItem("checked2", "false");
      }
      function p(s) {
        return s < 10 ? "0" + s : s;
      }
    },
    idCard(e, i) {
      if (i == "6") {
        if (e.length < 18) {
          this.$notify.error({
            title: "法人身份证号信息错误",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
    },
    ziben(e) {
      //console..log(e.split(""));
      var e = e.split("");
      if (e.length > 1) {
        if (e[0] == 0) {
          this.$notify.error({
            title: "注册资本请输入大于0的值",
            message: "请修改",
            position: "bottom-right"
          });
          this.capital = "";
          localStorage.setItem("capital", "");
          return;
        }
      }
    },
    getInput(e, i) {
      if (i == "0") {
        //工商注册名称
        if (/^[A-Z|a-z|0-9|\u4e00-\u9fa5]+$/.test(e)) {
          localStorage.setItem("company", e);
        } else {
          localStorage.setItem("company", e);
          this.$notify.error({
            title: "工商注册名称不可包含特殊字符",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      } else if (i == "1") {
        //详细地址
        localStorage.setItem("detailed", e);
      } else if (i == "2") {
        //实际控制人

        if (/^[\u4e00-\u9fa5]+$/.test(e)) {
          localStorage.setItem("control", e);
        } else {
          localStorage.setItem("control", e);
          this.$notify.error({
            title: "实际控制人仅可输入文字",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      } else if (i == "3") {
        //注册资本
        if (/^[0-9]+$/.test(e)) {
          localStorage.setItem("capital", e);
        } else {
          localStorage.setItem("capital", e);
          this.$notify.error({
            title: "注册资本仅可为数字",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      } else if (i == "4") {
        //营业执照号
        if (/^[0-9|a-z|A-Z]+$/.test(e)) {
          localStorage.setItem("licenseNumber", e);
        } else {
          localStorage.setItem("licenseNumber", e);
          this.$notify.error({
            title: "营业执照号仅可为数字或字母",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      } else if (i == "5") {
        //开户许可证号
        localStorage.setItem("openNumber", e);
      } else if (i == "6") {
        //法人身份证号
        if (/^[0-9|a-z|A-Z]+$/.test(e)) {
          localStorage.setItem("legalPersonNumber", e);
        } else {
          localStorage.setItem("legalPersonNumber", e);
          this.$notify.error({
            title: "身份证号仅可为数字或字母",
            message: "请重新填写",
            position: "bottom-right"
          });
          return;
        }
      } else if (i == "7") {
        //法人
        if (/^[\u4e00-\u9fa5]+$/.test(e)) {
          localStorage.setItem("legalPerson", e);
        } else {
          localStorage.setItem("legalPerson", e);
          this.$notify.error({
            title: "法人仅可输入文字",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      } else {
        return;
      }
    },
    handleChange(value) {
      //console..log(value);
      this.selectedOptions2 = value;
      localStorage.setItem("selectedOptions2", JSON.stringify(value));
    },
    handleRemove(file, fileList) {
      //console..log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeImage(e, i) {
      var that = this;
      //console..log(i);
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("img", file);
      formData.append("moduleName", "564654");
      formData.append("fileType", "png");
      // formData.append("moduleName", "yyzhzhwj");
      // formData.append("fileType", file.type);
      //console..log(formData);
      that
        .$post(that.$api.api + "/gw/a1/upload", formData, {
          headers: {
            "Content-Type":
              "multipart/form-data;boundary=8513654831578458154813586"
          }
        })
        .then(res => {
          //console..log(res);
        });
      return;
      if (file) {
        this.file = file;
        //console..log(this.file);
        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function(e) {
          // 这里的this 指向reader
          //console..log(this);
          if (i == 0) {
            that.avatar0 = this.result;
            //营业执照图片
          } else if (i == 1) {
            that.avatar1 = this.result;
          } else if (i == 2) {
            that.avatar2 = this.result;
          } else if (i == 3) {
            that.avatar3 = this.result;
          }
        };
      }
    }
  },
  created() {},
  mounted() {
    var target = document.getElementById("target");
    target.scrollIntoView();
    if (localStorage.getItem("username")) {
      this.userNumber = localStorage.getItem("username");
    }
    if (localStorage.getItem("company")) {
      this.company = localStorage.getItem("company");
    }
    if (localStorage.getItem("detailed")) {
      this.detailed = localStorage.getItem("detailed");
    }
    if (localStorage.getItem("control")) {
      this.control = localStorage.getItem("control");
    }
    if (localStorage.getItem("capital")) {
      this.capital = localStorage.getItem("capital");
    }
    if (localStorage.getItem("licenseNumber")) {
      this.licenseNumber = localStorage.getItem("licenseNumber");
    }
    if (localStorage.getItem("openNumber")) {
      this.openNumber = localStorage.getItem("openNumber");
    }
    if (localStorage.getItem("legalPersonNumber")) {
      this.legalPersonNumber = localStorage.getItem("legalPersonNumber");
    }
    if (localStorage.getItem("openTime")) {
      this.openTime = localStorage.getItem("openTime");
    }
    if (localStorage.getItem("cerTime")) {
      this.cerTime = localStorage.getItem("cerTime");
    }
    if (localStorage.getItem("legalPersonTime")) {
      this.legalPersonTime = localStorage.getItem("legalPersonTime");
    }
    if (localStorage.getItem("legalPerson")) {
      this.legalPerson = localStorage.getItem("legalPerson");
    }
    if (localStorage.getItem("yyzhzhwj")) {
      this.avatar0 = localStorage.getItem("yyzhzhwj");
    }
    if (localStorage.getItem("khxkzhwj")) {
      this.avatar1 = localStorage.getItem("khxkzhwj");
    }
    if (localStorage.getItem("sffzm")) {
      this.avatar2 = localStorage.getItem("sffzm");
    }
    if (localStorage.getItem("sfzbm")) {
      this.avatar3 = localStorage.getItem("sfzbm");
    }
    if (localStorage.getItem("checked1")) {
      if (localStorage.getItem("checked1") == "true") {
        this.checked1 = true;
      } else {
        this.checked1 = false;
      }
    }
    if (localStorage.getItem("checked2")) {
      if (localStorage.getItem("checked2") == "true") {
        this.checked2 = true;
      } else {
        this.checked2 = false;
      }
    }
    if (localStorage.getItem("selectedOptions2")) {
      //console..log(JSON.stringify(localStorage.getItem("selectedOptions2")));
      // this.selectedOptions2 = localStorage.getItem("selectedOptions2");
    }
  }
};
</script>

<style scoped>
.next-d {
  width: 203px;
  height: 42px;
  text-align: center;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);

  font-weight: 400;
  border-radius: 100px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 30px 0;
  cursor: pointer;
}

.box {
  overflow: hidden;
  background: #f7f8fa;
  position: relative;
  width: 100%;
}
.logoTop {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.header {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e7e7e7;
  position: fixed;
  top: 0;
  z-index: 1000000 !important;
}
.nav {
  /* padding: 0 48px; */
  height: 80px;
  line-height: 80px;
  position: relative;
  z-index: 2;
}

.logo {
  width: 26px;
  height: 26px;
  margin-right: 10px;
}

.name {
  font-size: 18px;
  color: #333;
}
.navbar {
  display: flex;
  justify-content: flex-end;
}
.navbar p {
  margin-left: 60px;
}

.active {
  color: #419f48;
  border-bottom: 2px solid #419f48;
  height: 100%;
}
.active1 {
  color: #419f48;
}

.login-d {
  width: 73px;
  height: 30px;
  border-radius: 15px;
  border: none;
  background: #419f48;
  color: #fff;
  margin-left: 85px;
}

.header011 {
  width: 100%;
  margin: 80px 0 10px;
  height: 57px;
  background-color: #ffffff;
  border-bottom: 1px solid #e7e7e7;
}
.container-header01 {
  height: 57px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
}
.container-header01 a {
  color: #419f48;
}
.container-header01 img {
  width: 15px;
  height: 14px;
  margin: 0 8px;
}
.tabList {
  background-color: #ffffff;
}
.tabList-ul {
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.tabList-ul li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}
.mandatory {
  width: 7px;
  height: 7px;
  margin-right: 10px;
  background: red;
  border-radius: 50%;
}
.tabList-ul li:first-child div {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  width: 150px;
  text-align: right;
  font-weight: bold;
  margin: 30px 0 5px;
}
.list-left {
  width: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  margin-right: 32px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.list-right {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}
.list-right div {
  margin-right: 40px;
}
.file01 {
  width: 140px;
  height: 140px;
  text-align: center;
  line-height: 140px;
  background-color: #f6f6f6;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}
.file01 img {
  width: 30px;
  height: 30px;
}
.file01:hover {
  border: 1px dashed #13ae7f;
}
.idCard-d {
  font-size: 10px;
  color: #979797;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.idCard-d p {
  height: 30px;
  line-height: 30px;
}
.file01 input {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 140px;
  opacity: 0;
}

.login-ds {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-left: 80px;
}
.login-ds span:first-child {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background: #419f48;
}
.login-ds span:last-child {
  font-size: 17px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.login-d {
  width: 73px;
  height: 30px;
  border-radius: 15px;
  border: none;
  background: #419f48;
  color: #fff;
  margin-left: 85px;
}
.avatar-d {
  height: 140px;
  border-radius: 5px;
}
.deleteImg {
  height: 140px;
  margin-right: 40px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  z-index: 1;
}
.deleteI {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  text-align: center;
}
.deleteI img {
  width: 40px;
  margin-top: 50px;
}
.deleteImg:hover .deleteI {
  cursor: pointer;
  display: inline;
}
</style>
