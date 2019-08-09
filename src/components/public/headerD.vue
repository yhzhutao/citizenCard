<template>
  <div id="target">
    <div class="header-two">
      <div class="container header-all">
        <div @click="goFirst()" class="header-two-left logoTop">
          <img style="height:36px;" :src="logo" alt />
          <!-- <div class="fl name">惠民汇付</div> -->
        </div>
        <div class="logoTop2">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首页" name="first"></el-tab-pane>
            <el-tab-pane label="产品中心" name="second"></el-tab-pane>
            <el-tab-pane label="解决方案" name="third"></el-tab-pane>
            <el-tab-pane label="开放平台" name="fourth"></el-tab-pane>
            <el-tab-pane label="帮助中心" name="fifth"></el-tab-pane>
            <el-tab-pane label="关于我们" name="sixth"></el-tab-pane>
          </el-tabs>
          <div class="login-ds">
            <!-- <p class="business">
              <router-link to="/b_login">商户中心</router-link>
            </p> -->
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../../assets/img/aboutUs/flge.png";
export default {
  data() {
    return {
      userNumber: "",
      activeName: "",
      tabIndex: "0",
      logo
    };
  },
  computed: {
    changeValue() {
      return (this.activeName = this.$store.state.activeValue);
    }
  },
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
    switchPage(e) {
      if (e == 0) {
        this.$router.push({ name: "examine" });
      }
      if (e == 1) {
        this.$store.commit("changeSwitch", 1);
        this.$router.push({ name: "login", params: { clear: 1 } });
      }
      if (e == 2) {
        localStorage.clear();
        this.$post(this.$api.api + "/gw/user/logout").then(res => {
          if (res.code == "0") {
            this.loginT();
            this.$router.push({ name: "citizenCard" });
            this.$notify.info({
              title: "已退出",
              message: "",
              position: "bottom-right"
            });
          }
        });
      }
    },
    goFirst() {
      this.$store.commit("changeValue", "first");
      this.$router.push({ name: "citizenCard" });
    },
    handleClick(tab) {
      if (tab.index == "0") {
        this.$store.commit("changeValue", "first");
      } else if (tab.index == "1") {
        this.$store.commit("changeValue", "second");
      } else if (tab.index == "2") {
        this.$store.commit("changeValue", "third");
      } else if (tab.index == "3") {
        this.$store.commit("changeValue", "fourth");
      } else if (tab.index == "4") {
        this.$store.commit("changeValue", "fifth");
      } else if (tab.index == "5") {
        this.$store.commit("changeValue", "sixth");
      }
      this.$router.push({ name: "citizenCard" });
    },
    loginT() {
      if (localStorage.getItem("username")) {
        this.userNumber = localStorage.getItem("username");
      } else {
        this.userNumber = "";
      }
    }
  },
  mounted() {
    this.loginT();
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
  font-size: 16px !important;
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
  height: 93px;
}
.header-two-left {
  height: 80px;
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
  border: none;
  background: #62bd72;
  color: #fff;
}
.login-ds {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 15px;
  margin-left: 40px;
  cursor: pointer;
  position: relative;
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
.registerA {
  display: none;
  width: 100%;
  position: absolute;
  top: 78px;
  left: 0;
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
}
.registerA div:hover {
  color: #62bd72;
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
</style>
