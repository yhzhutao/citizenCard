<template>
  <div class="warp" :style="backgroundDiv1">
    <div class="right">
      <p class="title">注册</p>
      <ul>
        <li>
          <input type="text" v-model="name" value="name" placeholder="公司名称" />
          <span v-if="err0" class="errors">公司名称不可为空</span>
        </li>
        <li>
          <input
            style="width:3.5rem"
            minlength="6"
            maxlength="16"
            v-model="password"
            value="password"
            type="password"
            placeholder="6~16位密码，区分大小写"
          />
          <span v-if="err1" class="errors">密码不可为空</span>
          <span v-if="err8" class="errors">密码 6~16位</span>
        </li>
        <li>
          <input
            minlength="6"
            maxlength="16"
            v-model="passwordT"
            value="passwordT"
            type="password"
            placeholder="确认密码"
          />
          <span v-if="err2" class="errors">密码不可为空</span>
          <span v-if="err3" class="errors">两次密码输入不一致</span>
        </li>
        <li>
          <p class="number">+86</p>
          <input maxlength="11" v-model="number" value="number" type="text" placeholder="11位手机号码" />
          <span v-if="err4" class="errors">手机号码不可为空</span>
          <span v-if="err5" class="errors">手机号码格式错误</span>
        </li>
        <li>
          <input maxlength="6" v-model="code" value="code" type="text" placeholder="验证码" />
          <p class="right-li-p" @click="getCode()">{{codetext}}</p>
          <span v-if="err6" class="errors">验证码不可为空</span>
          <span v-if="err7" class="errors">验证码错误</span>
        </li>
      </ul>
      <el-button class="register" plain @click="register()">注册</el-button>
      <div class="another">
        <router-link to="/m_login">使用已有账户登录</router-link>
      </div>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'>
</script>
<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      phoneToken: "",
      name: "",
      password: "",
      passwordT: "",
      number: "",
      code: "",
      codetext: "获取验证码",
      codeTime: 60,
      loginLeft: require("../../assets/img/loginLeft.png"),
      backgroundDiv1: {
        backgroundImage: "url(" + require("../../assets/img/c1.jpg") + ")"
      },
      err0: false,
      err1: false,
      err2: false,
      err3: false,
      err4: false,
      err5: false,
      err6: false,
      err7: false,
      err8: false
    };
  },
  methods: {
    register() {
      if (this.name.length < 1) {
        this.err0 = true;
        return;
      } else {
        this.err0 = false;
      }
      //alert(this.password.length)
      if (this.password.length < 1) {
        this.err1 = true;
        return;
      } else {
        this.err1 = false;
      }
      if (this.password.length < 6) {
        this.err8 = true;
        return;
      } else {
        this.err8 = false;
      }
      if (this.password.length > 16) {
        this.err8 = true;
        return;
      } else {
        this.err8 = false;
      }
      if (this.passwordT.length < 1) {
        this.err2 = true;
        return;
      } else {
        this.err2 = false;
      }
      if (this.password !== this.passwordT) {
        this.err3 = true;
        return;
      } else {
        this.err3 = false;
      }
      if (this.number.length < 1) {
        this.err4 = true;
        return;
      } else {
        this.err4 = false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.number)) {
        this.err5 = true;
        return;
      } else {
        this.err5 = false;
      }
      if (this.code.length < 1) {
        this.err6 = true;
        return;
      } else {
        this.err6 = false;
      }
      if (this.phoneToken == "" || this.phoneToken == undefined) {
        this.err7 = true;
        return;
      } else {
        this.err7 = false;
      }
      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      const _key = "tyboot" + this.number + this.number;
      const _password = this.password;
      // //console..log(encryptByDES(_password, _key));
      this.$post(this.$api.api + "/gw/user/register", {
        companyName: this.name,
        passwd: encryptByDES(_password, _key),
        confirmPasswd: this.passwordT,
        mobile: this.number,
        verCode: this.code,
        sendType: "reg",
        phoneToken: this.phoneToken
      }).then(res => {
        loading.close();
        // console.log(res);
        if (res.code == "0") {
          this.$message({
            showClose: true,
            message: "欢迎进入惠民汇付",
            type: "success"
          });
          var authorization = res.data.token;
          localStorage.setItem("authorization", authorization);
          localStorage.setItem("username1", this.number);
          localStorage.setItem(
            "username",
            this.number.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
          );
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
    getCode() {
      var that = this;
      var times = that.codeTime;
      if (this.number.length < 1) {
        this.err4 = true;
        return;
      } else {
        this.err4 = false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.number)) {
        this.err5 = true;
        return;
      } else {
        this.err5 = false;
      }
      if (that.codetext !== "获取验证码") {
        // //console..log("stop");
        return;
      } else {
        var ti = setInterval(function() {
          times--;
          ////console..log(times);
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(ti);
            that.codetext = "获取验证码";
          }
        }, 1000);
      }
      this.$post(this.$api.api + "/gw/user/verification ", {
        mobile: this.number,
        sendType: "reg"
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
.number {
  padding-right: 0.2rem;
  margin-right: 0.2rem;
  border-right: 0.01rem solid black;
  font-size: 0.3rem;
}
.title {
  font-size: 0.4rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 0.03rem;
  margin-bottom: 0.35rem;
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
  padding-left: 0.2rem;
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
.right-li-p {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(19, 174, 127, 1);
  padding: 0 0.2rem;
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
.another {
  width: 5.2rem;
  margin: 0.2rem auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.another a {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 143, 255, 1);
}
.register {
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

