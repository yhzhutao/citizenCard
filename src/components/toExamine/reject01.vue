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
      <!-- 经办人信息 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>经办人信息</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>经办人姓名</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(0)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="10"
              v-model="inputValue[0].name"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>手机号</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(1)"
              @blur="getBlur(1)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="11"
              v-model="inputValue[1].name"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>电子邮箱</p>
          </div>
          <div>
            <div class="list-right">
              <el-input
                @input="getInput(2)"
                @blur="getBlur(2)"
                style="width:220px;"
                placeholder="请输入"
                maxlength="20"
                v-model="inputValue[2].name"
                clearable
              ></el-input>
            </div>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>固定电话</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(3)"
              @blur="getBlur(3)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="15"
              v-model="inputValue[3].name"
              clearable
            ></el-input>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>经办人身份证号</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(4)"
              @blur="getBlur(4)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="18"
              v-model="inputValue[4].name"
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
            <div style="margin-right:0;">
              <el-date-picker
                @change="getTime(agent)"
                v-model="agent"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
            <el-checkbox @change="checkedOne()" v-model="checked1">有效期为永久</el-checkbox>
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
                <input @change="upload(0,'sffzm1')" type="file" class="pic_img" accept="image/*" />
                <!-- <input type="button" onclick="upload()" value="点击上传"> -->
              </form>
              <!-- <input @change="changeImage($event,2)" type="file"> -->
            </div>

            <ol style="height:140px;">
              <li class="deleteImg">
                <img class="avatar-d" :src="avatar0" alt />
                <p class="deleteI">
                  <img @click="deleteImage(0,'sffzm1')" :src="deleteI" />
                </p>
              </li>
            </ol>
            <div class="file01 idCard-d">
              <img :src="addImg" />
              <p>证件反面</p>
              <form enctype="multipart/form-data" class="uploadForm">
                <input @change="upload(1,'sfzbm2')" type="file" class="pic_img" accept="image/*" />
              </form>
              <!-- <input @change="changeImage($event,3)" type="file"> -->
            </div>
            <ol style="height:140px;">
              <li class="deleteImg">
                <img class="avatar-d" :src="avatar1" alt />
                <p class="deleteI">
                  <img @click="deleteImage(1,'sfzbm2')" :src="deleteI" />
                </p>
              </li>
            </ol>
          </div>
        </li>
      </ul>

      <!-- 商服操作人员 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>商服操作人员</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>姓名</p>
          </div>
          <div class="list-right">
            <el-input
              @input="getInput(5)"
              style="width:220px;"
              maxlength="10"
              placeholder="请输入"
              v-model="inputValue[5].name"
              clearable
            ></el-input>
          </div>
        </li>
        <li class="li-email">
          <div class="list-left">
            <p class="mandatory"></p>
            <p>电子邮箱</p>
          </div>
          <div class="list-right list-rightE">
            <el-input
              @input="getInput(6)"
              @blur="getBlur(6)"
              style="width:220px;"
              placeholder="请输入"
              maxlength="20"
              v-model="inputValue[6].name"
              clearable
            ></el-input>
            <p>此邮箱用于接收秘钥，保存后不可变更，请确认后填写</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p class="mandatory"></p>
            <p>邮箱验证码</p>
          </div>
          <div class="list-right list-rightTwo">
            <div class="block">
              <el-input
                @input="getInput(7)"
                style="width:220px;"
                maxlength="6"
                placeholder="请输入"
                v-model="inputValue[7].name"
                clearable
              ></el-input>
            </div>
            <button @click="getCode()" class="getCode">{{codetext}}</button>
          </div>
        </li>
        <li class="li-email">
          <div class="list-left">
            <p class="mandatory"></p>
            <p>移动电话号</p>
          </div>
          <div class="list-right list-rightE">
            <el-input
              @input="getInput(8)"
              @blur="getBlur(8)"
              :disabled="dis"
              style="width:220px;"
              placeholder="请输入"
              maxlength="11"
              v-model="inputValue[8].name"
              clearable
            ></el-input>
            <p>注册手机号码，商户申请审核通过之后可联系平台修改</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="container">
      <button id="ones" @click="goNext()" class="next-d">下一步</button>
      <!-- <router-link to="/apply01">xiayibu</router-link>
      <router-link to="/reexmaine02">-reexmaine02</router-link>-->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import headerL from "../public/headerLittle";
import logo from "../../assets/logo.png";
import options from "../../../static/js/city.js";
export default {
  data() {
    return {
      dis: true,
      userNumber: "",
      userNumber1: "",
      inputValue: [
        { name: "", des: "经办人姓名" },
        { name: "", des: "手机号" },
        { name: "", des: "电子邮箱" },
        { name: "", des: "固定电话" },
        { name: "", des: "经办人身份证号" },
        { name: "", des: "商服操作人员姓名" },
        { name: "", des: "商服操作人员电子邮箱" },
        { name: "", des: "邮箱验证码" },
        { name: "", des: "移动电话号" }
      ],
      company: "", //注册名称
      control: "", //实际控制人
      capital: "", //注册资本
      openTime: "", //开业时间
      licenseNumber: "", //营业执照号
      cerTime: "", //营业证件有效期
      openNumber: "", //开户许可号
      legalPersonNumber: "", //法人身份证号
      agent: "", //法人证件有效期
      legalPerson: "", //法人
      input: "",
      logo,
      codeTime: "60",
      codetext: "发送验证码",
      next: require("../../assets/img/next.png"),
      value: "",
      options: options,
      selectedOptions: [],
      selectedOptions2: [], //商户地
      detailed: "", //详细地址
      dialogImageUrl: "",
      dialogVisible: false,
      value1: "",
      value2: "",
      checked1: false,
      checked2: "",
      addImg: require("../../assets/img/addImg.png"),
      file: "",
      avatar0: "",
      avatar1: "",
      avatar2: "",
      avatar3: "",
      deleteI: require("../../assets/img/delete.png")
    };
  },
  components: {
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
    //有效期为永久
    checkedOne() {
      if (this.checked1 == true) {
        localStorage.setItem("agent", "永久");
        this.agent = "";
      }
    },
    goFirst() {
      this.$router.push({ name: "citizenCard" });
    },
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
          if (data.code == "1") {
            that.$notify.error({
              title: data.msg,
              message: "请更换",
              position: "bottom-right"
            });
            return;
          }
          // ////console..log(data);
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
            }
          }
        },
        error: function(err) {
          //失败
          loading.close();
          // ////console..log(err);
          that.$notify.error({
            title: "上传遇到问题",
            message: "请稍后再试",
            position: "bottom-right"
          });
          return;
        }
      });
    },
    goNext() {
      // localStorage.clear()
      // console.log(this.inputValue);
      var that = this;
      for (var e in that.inputValue) {
        if (e == 2 || e == 6) {
          var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if (!myreg.test(this.inputValue[e].name)) {
            this.$notify.error({
              title: "邮箱格式错误",
              message: "请修改",
              position: "bottom-right"
            });
            return;
          }
        }
        if (e == 1 || e == 8) {
          if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.inputValue[e].name)) {
            this.$notify.error({
              title: "手机号格式错误",
              message: "请修改",
              position: "bottom-right"
            });
            return;
          }
        }
        if (e == 3) {
          if (this.inputValue[e].name.length > 1) {
            if (!/^[0-9|-|_|\/]+$/.test(this.inputValue[e].name)) {
              this.$notify.error({
                title: "固定电话格式错误",
                message: "请修改",
                position: "bottom-right"
              });
              return;
            }
          }
        }
        if (e == 4) {
          if (!/^[0-9|a-z|A-Z]{18}$/.test(this.inputValue[e].name)) {
            this.$notify.error({
              title: "身份证号格式错误",
              message: "请修改",
              position: "bottom-right"
            });
            return;
          }
        }
        if (e == 3) {
        } else {
          if (that.inputValue[e].name.length < 1) {
            that.$notify.error({
              title: that.inputValue[e].des + "不可为空",
              message: "请输入",
              position: "bottom-right"
            });
            return;
          }
        }
      }

      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.inputValue[2].name)) {
        this.$notify.error({
          title: "邮箱格式错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (this.avatar0.length < 1) {
        this.$notify.error({
          title: "经办人证件图片正面不可为空",
          message: "请上传",
          position: "bottom-right"
        });
        return;
      }
      if (this.avatar1.length < 1) {
        this.$notify.error({
          title: "经办人证件图片反面不可为空",
          message: "请上传",
          position: "bottom-right"
        });
        return;
      }

      that.$router.push({ name: "reject02" });
    },
    getTime(e) {
      const d = new Date(e);
      const resDate =
        d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
      //法人证件有效期
      localStorage.setItem("agent", resDate);
      this.checked1 = false;
      function p(s) {
        return s < 10 ? "0" + s : s;
      }
    },
    getBlur(e) {
      if (this.inputValue[e].name.length < 1) {
        return;
      }
      if (e == 2 || e == 6) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!myreg.test(this.inputValue[e].name)) {
          this.$notify.error({
            title: "邮箱格式错误",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
      if (e == 1 || e == 8) {
        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.inputValue[e].name)) {
          this.$notify.error({
            title: "手机号格式错误",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
      if (e == 3) {
        if (this.inputValue[e].name.length > 1) {
          if (!/^[0-9|-|_|\/]+$/.test(this.inputValue[e].name)) {
            this.$notify.error({
              title: "固定电话格式错误",
              message: "请修改",
              position: "bottom-right"
            });
            return;
          }
        }
      }
      if (e == 4) {
        if (!/^[0-9|a-z|A-Z]{18}$/.test(this.inputValue[e].name)) {
          this.$notify.error({
            title: "身份证号格式错误",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
    },
    getInput(e) {
      // ////console..log(e);
      // ////console..log(this.inputValue[e].name);
      localStorage.setItem("inputValue", JSON.stringify(this.inputValue));
    },
    getCode() {
      var that = this;
      var ti;
      var times = that.codeTime;
      if (this.inputValue[6].name.length < 1) {
        this.$notify.error({
          title: "邮箱不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.inputValue[6].name)) {
        // ////console..log(this.inputValue[6].name);
        this.$notify.error({
          title: "邮箱格式错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (that.codetext !== "发送验证码") {
        // ////console..log("stop");
        return;
      } else {
        ti = setInterval(function() {
          times--;
          // ////console..log(times);
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(ti);
            that.codetext = "发送验证码";
          }
        }, 1000);
      }
      // return;
      this.$post(this.$api.api + "/gw/a1/application/sendEmail", {
        emailAddress: this.inputValue[6].name,
        mobile: this.inputValue[8].name
      }).then(res => {
        // ////console..log(res);
        if (res.code == "0") {
          this.$notify({
            title: "邮件发送成功",
            message: "请注意查收",
            type: "success",
            position: "bottom-right"
          });
        } else {
          clearInterval(ti);
          that.codetext = "发送验证码";
          this.$notify.info({
            title: res.msg,
            message: "",
            position: "bottom-right"
          });
        }
      });
    }
  },
  created() {},
  mounted() {
    var target = document.getElementById("target");
    target.scrollIntoView();
    this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
      if (res.msg.indexOf("token") > -1) {
        alert("登陆失效,请重新登陆");
        this.$router.push({ name: "login" });
        return;
      }
      if (res.msg == "token超时,请重新登录") {
        alert("登陆失效,请重新登陆");
        this.$router.push({ name: "login" });
        return;
      }
      ////console..log(res.data);
      if (res.code == "0") {
        this.inputValue[0].name = res.data.jbrCname; //经办人姓名
        this.inputValue[1].name = res.data.jbrMobile; //手机号
        this.inputValue[2].name = res.data.jbrEmail; //电子邮箱
        this.inputValue[3].name = res.data.jbrFixedPhone; //"固定电话
        this.inputValue[4].name = res.data.jbrSfz; //经办人身份证号
        this.inputValue[5].name = res.data.czCname; //商服操作人员姓名
        this.inputValue[6].name = res.data.czEmail; //商服操作人员电子邮箱
        this.avatar0 = res.data.jbrSffzm; //经办人身份证正面：jbrSffzm
        this.avatar1 = res.data.jbrSfzbm; // 经办人身份证反面：jbrSfzbm
        this.inputValue[8].name = res.data.czMobile;
        localStorage.setItem("sffzm1", res.data.jbrSffzm);
        localStorage.setItem("sfzbm2", res.data.jbrSfzbm);
        if (res.data.jbrSfzyxq == "永久") {
          this.checked1 = true;
          this.agent = "";
        } else {
          this.agent = res.data.jbrSfzyxq; //身份证有效期
        }
      }
    });

    if (localStorage.getItem("username")) {
      this.userNumber = localStorage.getItem("username");
    }
    if (localStorage.getItem("inputValue")) {
      this.inputValue = JSON.parse(localStorage.getItem("inputValue"));
    }
    if (localStorage.getItem("sffzm1")) {
      this.avatar0 = localStorage.getItem("sffzm1");
    }
    if (localStorage.getItem("sfzbm2")) {
      this.avatar1 = localStorage.getItem("sfzbm2");
    }
    if (localStorage.getItem("agent")) {
      this.agent = localStorage.getItem("agent");
    }
  }
};
</script>

<style scoped>
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
  font-size: 14px;
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
.getCode {
  width: 95px;
  height: 40px;
  border-radius: 5px;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
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
  align-items: center;
  flex-wrap: wrap;
}
.list-rightE {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.list-rightE p {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 37px;
}
.li-email .list-left {
  margin-bottom: 40px;
}
.list-right div {
  margin-right: 40px;
}
.list-rightTwo div {
  margin-right: 10px;
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
