<template>
  <div id="target" class="boxIndex">
    <div class="header-two">
      <div class="container header-all">
        <div @click="goFirst()" class="header-two-left logoTop">
          <img class="flge" :src="logo" alt/>
          <!-- <div class="fl name">惠民汇付</div> -->
        </div>
        <div class="logoTop2">
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label=" 首页 " name="first"></el-tab-pane>
              <el-tab-pane label=" 产品中心 " name="second"></el-tab-pane>
              <el-tab-pane label=" 解决方案 " name="third"></el-tab-pane>
              <el-tab-pane label=" 开放平台 " name="fourth"></el-tab-pane>
              <el-tab-pane label=" 帮助中心 " name="fifth"></el-tab-pane>
              <el-tab-pane label=" 关于我们 " name="sixth"></el-tab-pane>
            </el-tabs>
          </div>
          <!--<div class="login-ds">-->
          <!--<p class="business">-->
          <!--<router-link to="/b_login">商户中心</router-link>-->
          <!--</p>-->
          <!--</div>-->
          <div v-if="userNumber" class="login-ds">
            <span></span>
            <span class="login-span">{{userNumber}}</span>
            <div class="registerA">
              <div @click="switchPage(0)">商户中心</div>
              <div @click="switchPage(1)">切换账户</div>
              <div @click="switchPage(2)">退出登陆</div>
            </div>
          </div>
          <div v-if="!userNumber" class="login-ds">
            <button @click="goLogin()" class="login-d cur">登录</button>
          </div>
          <div class="login-ds" v-if="personalStatus==='1'">
            <p class="personal">
              <router-link to="/b_login">个人中心</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <h1>
        <router-link to="/userInfo">009900ss</router-link>
    </h1>-->
    <router-view @frame="frame"></router-view>
    <div v-if="footHide" class="footerD">
      <footerD @frame="frame"></footerD>
    </div>
  </div>
</template>

<script>
import logo from "../assets/img/aboutUs/flge.png";
import footerD from "../components/public/footerD";
import {getPersonalStatus} from '@/apis/common'

export default {
  data () {
    return {
      personalStatus: '',
      footHide: true,
      checkDe: require("../assets/img/check.png"),
      switchs: require("../assets/img/switch.png"),
      out: require("../assets/img/out.png"),
      userNumber: "",
      activeName: "first",
      tabIndex: "0",
      logo,
      screenWidth: document.body.clientWidth,
      hover1: false,
      hover2: false,
      hover3: false,
      hover4: false,
      hover5: false,
      timer: "",
      i: 0
    };
  },
  components: {
    footerD
  },
  computed: {
    // userNumber() {
    //   return this.$store.state.userNumber.replace(
    //     /^(\d{3})\d{4}(\d{4})$/,
    //     "$1****$2"
    //   );
    // },
    changeValue () {
      ////console..log(this.$store.state.activeValue);
      return (this.activeName = this.$store.state.activeValue);
    }
  },
  methods: {
    //获取个人中心状态 //展示或者不展示
    getPersonalStatus () {
      getPersonalStatus({}).then(res => {
        if (res.code === 0) {
          this.personalStatus = res.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    },
    switchPage (e) {
      if (e == 0) {
        this.$router.push({name: "examine"});
      }
      if (e == 1) {
        this.$store.commit("changeSwitch", 1);
        this.$router.push({name: "login", params: {clear: 1}});
      }
      if (e == 2) {
        localStorage.clear();
        this.$post(this.$api.api + "/gw/user/logout").then(res => {
          if (res.code == "0") {
            this.loginT();
            this.activeName = "first";
            this.$router.push({name: "citizenCard"});
            this.$notify.info({
              title: "已退出",
              message: "",
              position: "bottom-right"
            });
          }
        });
      }
    },
    frame (e) {
      if (e == "0") {
        localStorage.clear();
        this.loginT();
        return;
      }
      if (e == "1") {
        // this.footHide = false;
        return;
      }
      if (e == "2") {
        // this.footHide = true;
        return;
      }

      this.activeName = e;
      var target = document.getElementById("target");
      target.scrollIntoView();
    },
    goFirst () {
      this.$router.push({name: "citizenCard"});
    },
    goLogin () {
      this.$router.push({name: "login"});
    },
    handleClick (tab) {
      // ////console..log(tab.index, tab.label);
      this.tabIndex = tab.index;
      var target = document.getElementById("target");
      target.scrollIntoView();
      if (tab.index == "0") {
        this.$router.replace({name: "citizenCard"});
      } else if (tab.index == "1") {
        // this.footHide = false;
        this.$router.replace({name: "product"});
      } else if (tab.index == "2") {
        this.$router.replace({name: "solution"});
      } else if (tab.index == "3") {
        this.$router.replace({name: "development"});
      } else if (tab.index == "4") {
        this.$router.replace({name: "help"});
      } else if (tab.index == "5") {
        this.$router.replace({name: "aboutUs"});
      }
    },
    loginT () {
      if (localStorage.getItem("username")) {
        this.userNumber = localStorage.getItem("username");
      } else {
        this.userNumber = "";
      }
    }
  },
  mounted () {
    this.getPersonalStatus();
    var target = document.getElementById("target");
    target.scrollIntoView();
    this.activeName = this.$store.state.activeValue;
    this.loginT();
    if (this.tabIndex == "0") {
      this.$router.replace({name: "citizenCard"});
    }
    if (this.activeName == "first") {
      this.$router.replace({name: "citizenCard"});
    }
    if (this.activeName == "second") {
      this.$router.replace({name: "product"});
    }
    if (this.activeName == "third") {
      this.$router.replace({name: "solution"});
    }
    if (this.activeName == "fourth") {
      this.$router.replace({name: "development"});
    }
    if (this.activeName == "fifth") {
      this.$router.replace({name: "help"});
    }
    if (this.activeName == "sixth") {
      this.$router.replace({name: "aboutUs"});
    }
    if (this.$route.params !== "") {
      ////console..log(this.$route.params);
    }
    // alert(this.$store.state.activeValue)
  },
  created () {
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  watch: {
    activeName: function (newVal) {
      ////console..log(newVal);
    }
  }
};
</script>

<style scoped>
  .footerD {
    width: 100%;
    height: 90px;
    background: #62bd72;
    position: absolute;
    bottom: 0;
    z-index: 100;
  }

  .el-tabs__item {
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .cur {
    cursor: pointer;
  }

  .boxIndex {
    overflow: hidden;
    /* background: #f7f8fa; */
    position: relative;
    width: 100%;
    /* padding-bottom: 110px; */
  }

  .logoTop {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .logoTop2 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 94px;
  }

  .header-two-left {
    height: 80px;
  }

  .flge {
    height: 36px;
  }

  .header {
    width: 100%;
    background: #ffffff;
    box-shadow: 0 0 1px 1px #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    position: fixed;
    top: 0;
    z-index: 1111 !important;
  }

  .header-two {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 79px;
    z-index: 1111;
    background: #ffffff;
    box-shadow: 0 0 1px 1px #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
  }

  .header-all {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .nav {
    /* padding: 0 48px; */
    height: 80px;
    line-height: 80px;
    position: relative;
    z-index: 2;
  }

  .top-bg,
  .bottom,
  .bg0,
  .bg1,
  .bottom-banks {
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .mid-t {
    height: 62px;
    background-size: 62px 62px;
    background-repeat: no-repeat;
    background-position-x: 12px;
    position: relative;
    line-height: 62px;
  }

  .top-bg {
    position: relative;
    height: 1003px;
    z-index: 1;
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

  .navbar a {
    height: 100%;
    padding: 0 5px;
    margin-left: 60px;
  }

  .active {
    color: #62bd72;
    border-bottom: 2px solid #62bd72;
  }

  .login-d {
    width: 73px;
    height: 30px;
    border-radius: 15px;
    font-size: 16px !important;
    border: none;
    background: #62bd72;
    color: #fff;
  }

  .login-ds {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    margin-bottom: 20px;
    margin-left: 40px;
    cursor: pointer;
    position: relative;
  }

  .registerA {
    display: none;
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    padding-top: 5px;
    background: #ffffff;
    box-shadow: 0 1px 1px rgb(245, 243, 243);
  }

  .login-ds:hover .registerA {
    display: inline;
  }

  .registerA div {
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid rgba(245, 243, 243, 0.6);
    font-size: 14px;
    color: #666666;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .registerA div img {
    width: 20px;
    margin-right: 8px;
  }

  .registerA div:hover {
    color: #62bd72;
  }

  .login-ds span:first-child {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background: #62bd72;
  }

  .login-span {
    font-size: 14px !important;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .top {
    padding-top: 120px;
    position: relative;
  }

  .top > div {
    position: relative;
    z-index: 1;
  }

  .top > .top-card {
    position: absolute;
    top: 180px;
    left: 50%;
    z-index: 5;
  }

  .top > .top-card img {
    position: absolute;
  }

  .business {
    background: linear-gradient(90deg, #62bd72 0%, rgb(49, 223, 49) 100%);
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    border-radius: 50px;
    margin-left: 10px;
  }

  .business a {
    color: #ffffff;
    padding: 5px 16px;
  }

  .login-ds .personal a {
    color: #62BD72;
  }
</style>
