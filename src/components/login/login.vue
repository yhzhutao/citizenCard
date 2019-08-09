<template>
  <div class="warp" :style="backgroundDiv1">
    <div class="box">
      <div class="left">
        <img :src="loginLeft" alt />
      </div>
      <div class="right">
        <ul>
          <li>
            <img :src="mobileImg" alt />
            <input v-model="mobile" value="mobile" maxlength="11" type="text" placeholder="手机号" />
          </li>
          <li>
            <img :src="passImg" alt />
            <input v-model="password" value="password" type="password" placeholder="密码" />
          </li>
          <li>
            <div>
              <img :src="secure" alt />
              <input v-model="code" value="code" maxlength="6" type="text" placeholder="验证码" />
            </div>
            <p @click="getCode()">{{codetext}}</p>
          </li>
        </ul>
        <div class="other">
          <router-link to="/register">注册账户</router-link>
          <router-link to="/forget">忘记密码?</router-link>
        </div>
        <el-button class="login" plain @click="register()">登陆</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      phoneToken: "",
      number: "",
      mobile: "",
      password: "",
      code: "",
      codetext: "获取验证码",
      codeTime: 60,
      loginLeft: require("../../assets/img/loginLeft.png"),
      passImg: require("../../assets/img/password.png"),
      mobileImg: require("../../assets/img/mobile.png"),
      secure: require("../../assets/img/secure.png"),
      backgroundDiv1: {
        backgroundImage: "url(" + require("../../assets/img/c1.jpg") + ")",
        height: ""
      }
    };
  },
  mounted() {
    this.backgroundDiv1.height = document.documentElement.clientHeight + "px";
  },
  methods: {
    register() {
      if (this.mobile.length < 1) {
        this.$notify.error({
          title: "手机号码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
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
      if (this.phoneToken == "" || this.phoneToken == undefined) {
        this.$notify.error({
          title: "验证码错误",
          message: "请修改",
          position: "bottom-right"
        });
        return;
      }
      const _key = "tyboot" + this.mobile + this.mobile;
      const _password = this.password;

      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      this.$post(this.$api.api + "/gw/user/login", {
        passwd: encryptByDES(_password, _key),
        mobile: this.mobile,
        verCode: this.code,
        sendType: "syslogin",
        phoneToken: this.phoneToken
      }).then(res => {
        loading.close();
        ////console..log(res);
        if (res.code == "0") {
          this.$notify({
            title: "登陆成功",
            message: "欢迎进入惠民汇付",
            position: "bottom-right",
            type: "success"
          });
          if (this.$route.params.clear) {
            localStorage.clear();
          } else if (this.$store.state.switchs == 1) {
            localStorage.clear();
          } else {
            //none
          }
          var authorization = res.data.token;
          localStorage.setItem("authorization", authorization);
          localStorage.setItem(
            "username",
            this.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
          );
          localStorage.setItem("username1", this.mobile);
          this.$router.replace({ name: "examine" });
        } else {
          this.$notify.info({
            title: res.msg,
            message: "",
            position: "bottom-right"
          });
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
    forgetP() {},
    getCode() {

      var that = this;
      var times = that.codeTime;
      if (this.mobile.length < 1) {
        this.$notify.error({
          title: "手机号码不可为空",
          message: "请输入",
          position: "bottom-right"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
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
        var ti = setInterval(function() {
          times--;
          // //console..log(times);
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(ti);
            that.codetext = "获取验证码";
          }
        }, 1000);
      }
      this.$post(this.$api.api + "/gw/user/verification ", {
        mobile: this.mobile,
        sendType: "syslogin"
      }).then(res => {
        // console.log(res);
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
            message: "",
            position: "bottom-right"
          });
        }
      });
    }
  },

  destroyed() {
    // loading.colse()
  }
};
</script>
<style scoped>
input {
  height: 36px;
  width: 120px;
}
.warp {
  width: 100%;
  /* height: 800px; */
  background: no-repeat center top;
  background-size: 100% 100%;
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
.right ul li:last-child p {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(19, 174, 127, 1);
  padding: 0 10px;
  height: 23ps;
  line-height: 23px;
  border-left: 1px solid rgba(151, 151, 151, 1);
}
.right img {
  width: 16px;
  /* height: 20px; */
  /* background: rgba(153, 153, 153, 1); */
  margin: 0 11px 0 20px;
}
.other {
  width: 270px;
  margin: 6px auto 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.other a {
  cursor: pointer;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 143, 255, 1);
}
.login {
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
</style>
