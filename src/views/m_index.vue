<template>
  <div id="target">
    <div class="headerIndex">
      <div @click="showType(0)" class="headerLeft">
        <img class="triangle1" :src="typeH" alt>
      </div>
      <div @click="goFirst()" class="bigLogo">
        <img class="flge" :src="logo" alt>
      </div>
      <div @click="showType(1)" class="headerLeft">
        <img :src="mine" alt>
      </div>
      <ol class="leftList">
        <li :key="index" v-for="(item,index) in indexDatas">
          <p @click="goPage(0,item.id)">{{item.name}}</p>
        </li>
      </ol>
      <ol class="rightList" style="text-align:right;">
        <!-- <li>
          <p @click="goPage(2,'m_examine')">商户中心</p>
        </li> -->
        <li>
          <p @click="goPage(1,'m_login')">切换用户</p>
        </li>
        <li>
          <p @click="goPage(2,'out')">（{{userNumber}}）退出登陆</p>
        </li>
      </ol>
    </div>
    <div style="height: 0.8rem;"></div>
    <!-- <div class="logoTop2">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label=" 首页 " name="first"></el-tab-pane>
            <el-tab-pane label=" 产品中心 " name="second"></el-tab-pane>
            <el-tab-pane label=" 解决方案 " name="third"></el-tab-pane>
            <el-tab-pane label=" 开放平台 " name="fourth"></el-tab-pane>
            <el-tab-pane label=" 帮助中心 " name="fifth"></el-tab-pane>
            <el-tab-pane label=" 关于我们 " name="sixth"></el-tab-pane>
          </el-tabs>
          <div v-if="userNumber" class="login-ds">
            <span></span>
            <span>{{userNumber}}</span>
            <div class="registerA">
              <div @click="switchPage(0)">商户中心</div>
              <div @click="switchPage(1)">切换账户</div>
              <div @click="switchPage(2)">退出登陆</div>
            </div>
          </div>
          <div v-if="!userNumber" class="login-ds">
            <button @click="goLogin()" class="login-d cur">登录</button>
          </div>
    </div>-->
    <!-- <h1>
        <router-link to="/userInfo">009900ss</router-link>
    </h1>-->
    <router-view></router-view>
    <div style="height:1rem;"></div>
  </div>
</template>
<script src='../../static/js/rem.js'>
</script>
<script>
import $ from "jquery";
import logo from "../assets/img/aboutUs/flge.png";
import footerD from "../components/public/m_footer";
import '../../static/js/rem'
export default {
  data() {
    return {
      showsL: false,
      showsR: false,
      logo,
      userNumber: "",
      mine: require("../assets/img/mine.png"),
      typeH: require("../assets/img/typeH.png"),
      indexDatas: [
        { name: "首页", id: "m_home" },
        { name: "产品中心", id: "m_productCenter" },
        { name: "解决方案", id: "m_solution" },
        { name: "开放平台", id: "m_development" },
        { name: "帮助中心", id: "m_help" },
        { name: "关于我们", id: "m_aboutUS" }
      ]
    };
  },
  methods: {
    goFirst() {
      this.$router.push({ name: "m_home" });
    },
    showType(e) {
      if (e == 0) {
        if (this.showsL == false) {
          if (this.showsR == true) {
            $(".rightList").stop();
            $(".rightList").slideUp();
            this.showsR = false;
          }
          $(".leftList").stop();
          $(".leftList").slideDown();
          $(".triangle1").css({
            "transform-origin": "center center",
            transform: "rotate(-180deg)",
            transition: "transform 0.8s"
          });
          this.showsL = true;
        } else {
          $(".leftList").stop();
          $(".leftList").slideUp();
          $(".triangle1").css({
            "transform-origin": "center center",
            transform: "rotate(0deg)",
            transition: "transform 0.8s"
          });
          this.showsL = false;
        }
      } else {
        if (this.userNumber == "" || this.userNumber == null) {
          this.$router.push({ name: "m_login" });
          return;
        }
        if (this.showsR == false) {
          if (this.showsL == true) {
            $(".leftList").stop();
            $(".leftList").slideUp();
            $(".triangle1").css({
              "transform-origin": "center center",
              transform: "rotate(0deg)",
              transition: "transform 0.8s"
            });
            this.showsL = false;
          }
          $(".rightList").stop();
          $(".rightList").slideDown();
          this.showsR = true;
        } else {
          $(".rightList").stop();
          $(".rightList").slideUp();
          this.showsR = false;
        }
      }
    },
    loginT() {
      if (localStorage.getItem("username")) {
        this.userNumber = localStorage.getItem("username");
      } else {
        this.userNumber = "";
      }
    },
    goPage(index, value) {
      if (this.showsR == true) {
        $(".rightList").stop();
        $(".rightList").slideUp();
        this.showsR = false;
      }
      if (this.showsL == true) {
        $(".leftList").stop();
        $(".leftList").slideUp();
        $(".triangle1").css({
          "transform-origin": "center center",
          transform: "rotate(0deg)",
          transition: "transform 0.8s"
        });
        this.showsL = false;
      }

      if (index == 2) {
        return;
      }
      this.$router.push({ name: value });
    }
  },
  components: { footerD },
  computed: {},
  created() {
    // this.$router.replace('/m_index/m_home')
  },
  mounted() {
    this.loginT();
  },
  beforeDestroy() {},
  watch: {}
};
</script>

<style scoped>
/* .footerD{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
} */
.headerIndex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 0.01rem solid #f8f8fa;
  height: 0.8rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.headerLeft {
  height: 0.4rem;
  margin: 0 0.3rem;
}
.headerLeft img {
  height: 100%;
}
.bigLogo {
  height: 0.45rem;
}
.bigLogo img {
  height: 100%;
}

.leftList,
.rightList {
  position: fixed;
  left: 0;
  top: 0.8rem;
  z-index: 99;
  bottom: 0;
  width: 100%;
  background-color: rgba(98, 189, 114, 0.9);
  /* filter: blur(1px); */
  display: none;
}

.leftList li,
.rightList li {
  border-bottom: 0.01rem solid #000000;
  font-size: 0.3rem;
  padding: 0.3rem;
  margin: 0 30px;
  color: #000000;
}
</style>
