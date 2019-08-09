<template>
  <div class="warp" :style="backgroundDiv1">
    <div class="right">
      <img class="logoF" :src="logo" alt>
      <ul>
        <li>
          <img :src="mobileImg" alt>
          <input v-model="mobile" value="mobile" maxlength="11" type="text" placeholder="手机号">
          <span v-if="err0" class="errors">手机号码不可为空</span>
          <span v-if="err1" class="errors">手机号码格式不正确</span>
        </li>
        <li>
          <img :src="passImg" alt>
          <input v-model="password" value="password" type="password" placeholder="密码">
          <span v-if="err2" class="errors">密码不可为空</span>
          
        </li>
        <li style="">
          <div>
            <img :src="secure" alt>
            <input style="width:2rem;" v-model="code" value="code" maxlength="6" type="text" placeholder="验证码">
          </div>
          <p @click="getCode()">{{codetext}}</p>
          <span v-if="err3" class="errors">验证码不可为空</span>
          <span v-if="err4" class="errors">验证码错误</span>
        </li>
      </ul>
      <div class="other">
        <router-link to="/m_register">注册账户</router-link>
        <router-link to="/m_forget">忘记密码?</router-link>
      </div>
      <el-button class="login" plain @click="register()">登陆</el-button>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>
<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      logo: require("../../assets/img/aboutUs/flge.png"),
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
        backgroundImage: "url(" + require("../../assets/img/c1.jpg") + ")"
      },
      err0: false,
      err1: false,
      err2: false,
      err3: false,
      err4: false,
      err5: false
    };
  },
  mounted() {
  },
  methods: {
    register() {
      if (this.mobile.length < 1) {
        this.err0 = true;
        return;
      } else {
        this.err0 = false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.err1 = true;
        return;
      } else {
        this.err1 = false;
      }
      if (this.code.length < 1) {
        this.err3 = true;
        return;
      } else {
        this.err3 = false;
      }
      if (this.password.length < 1) {
        this.err2 = true;
        return;
      } else {
        this.err2 = false;
      }
      if (this.phoneToken == "" || this.phoneToken == undefined) {
        this.err4 = true;
        return;
      } else {
        this.err4 = false;
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
        //console.log(res);
        if (res.code == "0") {
          this.$message({
            showClose: true,
            message: "欢迎进入惠民汇付",
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
          this.$router.push({ name: "/m_index/m_home" });
        } else {
          this.$message({
            showClose: true,
            message: res.msg
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
        this.err0 = true;
        return;
      } else {
        this.err0 = false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.err1 = true;
        return;
      } else {
        this.err1 = false;
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
          this.$message({
            showClose: true,
            message: "已发送，注意查收"
          });
        } else {
          this.$message({
            showClose: true,
            message: res.msg
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
  height: 100%;
  width: 3rem;
  font-size: 0.3rem;
}
.warp {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background: no-repeat center top;
  background-size: auto 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  padding: 0.6rem 0.5rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.1rem;
  box-shadow: rgb(207, 202, 202) 0 0 0.05rem;
}
.right ul li {
  border-radius: 0.06rem;
  border: 0.01rem solid rgba(151, 151, 151, 1);
  width: 5.2rem;
  height: 0.8rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.errors {
  position: absolute;
  left: 0.1rem;
  bottom: -0.3rem;
  color: red;
  font-size: 0.25rem;
}
.right ul li:hover {
  border: 0.01rem solid rgb(39, 192, 146);
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
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(19, 174, 127, 1);
  padding: 0 0.1rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-left: 0.01rem solid rgba(151, 151, 151, 1);
}
.right ul img {
  width: 0.3rem;
  margin: 0 0.15rem 0 0.2rem;
}
.logoF {
  width: 3rem;
  margin-bottom: 0.65rem;
}
.other {
  width: 5.2rem;
  margin: 0.2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.other a {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 143, 255, 1);
}
.login {
  width: 5.2rem;
  height: 0.8rem;
  border-radius: 0.06rem;
  font-size: 0.3rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
}
</style>
