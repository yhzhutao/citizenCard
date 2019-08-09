<template>
  <div class="warp" :style="backgroundDiv1">
    <div class="box">
      <div class="left">
        <img :src="loginLeft" alt>
      </div>
      <div class="right">
        <p class="title">重置登陆密码</p>
        <ul>
          <li>
            <p class="number">+86</p>
            <input maxlength="11" v-model="number" value="number" type="text" placeholder="11位手机号码">
          </li>
          <li>
            <input maxlength="6" v-model="code" value="code" type="text" placeholder="验证码">
            <p class="right-li-p" @click="getCode()">{{codetext}}</p>
            <!-- <el-button class="right-li-p" plain @click="getCode()">{{codetext}}</el-button> -->
          </li>
          <li>
            <input
              minlength="6"
              maxlength="16"
              v-model="password"
              value="password"
              type="password"
              placeholder="6~16位密码，区分大小写"
            >
          </li>
          <li>
            <input
              minlength="6"
              maxlength="16"
              v-model="passwordT"
              value="passwordT"
              type="password"
              placeholder="确认密码"
            >
          </li>
        </ul>
        <!-- <div class="other">
          <p>注册账户</p>
          <p>忘记密码?</p>
        </div>-->
        <!-- <button class="register">注册</button> -->
        <el-button class="register" plain @click="register()">确认重置</el-button>
        <!-- <div class="login">
          <router-link to="/login">使用已有账户登录</router-link>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      ti: "",
      phoneToken: "",
      name: "",
      password: "",
      passwordT: "",
      number: "",
      loginLeft: require("../../assets/img/loginLeft.png"),
      code: "",
      codetext: "获取验证码",
      codeTime: 60,
      backgroundDiv1: {
        backgroundImage: "url(" + require("../../assets/img/c1.jpg") + ")",
        height: ""
      }
    };
  },
  mounted() {
    this.backgroundDiv1.height =
      document.documentElement.clientHeight - 1 + "px";
  },
  methods: {
    register() {
      var that = this;

      if (this.number.length < 1) {
        this.$notify.error({
          title: "手机号码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.number)) {
        this.$notify.error({
          title: "手机号码格式错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (this.code.length < 1) {
        this.$notify.error({
          title: "验证码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (this.password.length < 1) {
        this.$notify.error({
          title: "密码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (this.password.length < 6) {
        this.$notify.error({
          title: "密码 6~16位",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (this.password.length > 16) {
        this.$notify.error({
          title: "密码 6~16位",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (this.password !== this.passwordT) {
        this.$notify.error({
          title: "两次密码输入不一致",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (this.phoneToken == "" || this.phoneToken == undefined) {
        this.$notify.error({
          title: "验证码错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      const _key = "tyboot" + this.number + this.number;
      const _password = this.password;
      this.$post(this.$api.api + "/gw/user/forgetPassword", {
        passwd: encryptByDES(_password, _key),
        confirmPasswd: encryptByDES(_password, _key),
        mobile: this.number,
        verCode: this.code,
        phoneToken: this.phoneToken,
        sendType: "backpwd"
      }).then(res => {
        loading.close();
        // //console..log(res);
        if (res.code == "0") {
          this.$notify({
            title: "密码重置成功",
            message: "跳转至登陆页面...",
            type: "success",
            position: "bottom-right"
          });
          setTimeout(() => {
            that.$router.push({ name: "login" });
          }, 500);
        } else {
          this.$notify.info({
            title: res.msg,
            message: ""
          });
          clearInterval(that.ti);
          that.codetext = "获取验证码";
        }
      });
      function encryptByDES(message, key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
          iv: CryptoJS.enc.Utf8.parse("01234567"),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
      }
    },
    getCode() {
      var that = this;
      var times = that.codeTime;
      if (this.number.length < 1) {
        this.$notify.error({
          title: "手机号码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.number)) {
        this.$notify.error({
          title: "手机号码格式错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      if (that.codetext !== "获取验证码") {
        // //console..log("stop");
        return;
      } else {
        that.ti = setInterval(function() {
          times--;
          ////console..log(times);
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(that.ti);
            that.codetext = "获取验证码";
          }
        }, 1000);
      }
      this.$post(this.$api.api + "/gw/user/verification ", {
        mobile: this.number,
        sendType: "backpwd"
      }).then(res => {
        // //console..log(res);
        if (res.code == "0") {
          this.phoneToken = res.data.phoneToken;
          this.$notify({
            title: "已发送",
            message: "请注意查收",
            type: "success",
            position: "bottom-right"
          });
        } else {
          this.$notify.info({
            title: res.msg,
            message: ""
          });
        }
      });
    }
  }
};
</script>
<style scoped>
input {
  height: 36px;
  width: 90%;
  padding-left: 10px;
}
.warp {
  width: 100%;
  /* height: 800px; */
  background: no-repeat center top;
  background-size: 100% 100%;
}
.title {
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
  letter-spacing: 3px;
  margin-bottom: 20px;
}
@media all and (max-width: 1200px) {
  .warp {
    width: 1200px;
  }
}
.box {
  position: absolute;
  width: 724px;
  height: 520px;
  top: 50%;
  left: 50%;
  margin-left: -362px;
  margin-top: -260px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
}
.left {
  width: 254px;
  height: 520px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: linear-gradient(0, #1eb381 0%, #7ade92 100%);
}
.left img {
  height: 520px;
}
.right {
  width: 470px;
  height: 520px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.right ul li {
  border-radius: 2px;
  border: 1px solid rgba(151, 151, 151, 1);
  width: 270px;
  height: 36px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.right ul li:hover {
  border: 1px solid rgb(39, 192, 146);
}
.right ul li:last-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right ul li:last-child div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* width: 100px; */
}
.right-li-p {
  cursor: pointer;
  width: 130px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(19, 174, 127, 1);
  padding: 0 10px;
  height: 23ps;
  line-height: 23px;
  border: none;
  border-radius: 0;
  border-left: 1px solid rgba(151, 151, 151, 1);
  background-color: none;
}
.right img {
  width: 16px;
  height: 20px;
  background: rgba(153, 153, 153, 1);
  margin: 0 11px 0 20px;
}
.number {
  width: 50px;
  text-align: center;
  height: 23px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 23px;
  border-right: 1px solid rgba(151, 151, 151, 1);
}
.other {
  width: 270px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 143, 255, 1);
  margin: 6px auto 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.register {
  cursor: pointer;
  width: 270px;
  height: 42px;
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
}
.login {
  cursor: pointer;
  margin-top: 20px;
  color: #000;
}
.login a {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 143, 255, 1);
}
</style>
