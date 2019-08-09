<template>
  <div class="header">
    <div class="container headerAs">
      <div @click="goFirst()" class="flexD">
        <img style="height:36px;" :src="logo" alt />
      </div>
      <div class="headerLeft">
        <!-- <p> -->
        <router-link to="/">首页</router-link>
        <!-- </p> -->
        <p class="active">商户申请</p>
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
</template>
<script>
import logo from "../../assets/img/aboutUs/flge.png";
export default {
  data() {
    return {
      userNumber: "",
      logo
    };
  },
  methods: {
    goFirst() {
      this.$router.push({ name: "citizenCard" });
    },
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
.header {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e7e7e7;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 1000000 !important;
}
.headerAs {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flexD {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.headerLeft {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 80px;
}
.headerLeft a{
  padding: 10px 0;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  margin-right: 50px;
  color: rgba(51, 51, 51, 1);
}
.active {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(98, 189, 114, 1);
  height: 80px;
  line-height: 80px;
  border-bottom: 2px solid #62bd72;
}
.login-ds {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-left: 40px;
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
  font-size: 15px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.login-d {
  width: 73px;
  font-size: 16px;
  height: 30px;
  border-radius: 15px;
  border: none;
  background: #62bd72;
  color: #fff;
  cursor: pointer;
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
  margin: 0!important;
}
</style>
