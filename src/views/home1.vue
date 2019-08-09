<template>
  <div id="target" class="aboutUs">
    <!-- :style="backgroundDiv1" -->
    <div class="about-one header-seiper">
      <div class="swiper-div">
        <el-carousel :arrow="never" height="474px">
          <el-carousel-item v-for="(item,index) in bannerList" :key="index">
            <div class="banner-item" :style="item.backgroundDiv">
              <div
                @click="openUrl(item.redirectUri)"
                style="background:rgba(255,255,255,0);height:100%;"
              >
                <!-- <div @click="openUrl(item.redirectUri)" class="container home-banner"> -->
                <!-- <p>{{item.bannerCname}}</p>
                <p v-html="item.bannerTitle"></p>-->
                <!-- </div> -->
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <img class="quan01" :src="quan01" alt>
      <img class="quan02" :src="quan04" alt>
      <img class="quan03" :src="quan03" alt>-->
    </div>
    <!-- 公告 -->
    <div class="notice">
      <div class="container notice-div">
        <img class="notice-img1" :src="noticeImg" alt />
        <div class="sw-div">
          <el-carousel
            indicator-position="none"
            height="67px"
            direction="vertical"
            :autoplay="true"
          >
            <el-carousel-item v-for="(item,index) in noticeData" :key="index">
              <div class="notice-p">
                <p
                  @click="goNotice(item1.newsId)"
                  :key="index1"
                  v-for="(item1,index1) in item"
                >【{{item1.day}}】{{item1.newsCname}}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="notice-img2">
          <p @click="goNotice('more')">查看更多公告</p>
          <img :src="checkMore" alt />
        </div>
      </div>
    </div>
    <!-- <router-link to="/map">Map</router-link> -->
    <!-- 服务 -->
    <div class="bigNews" :style="backgroundDiv1">
      <div class="us-tit us-tit1">
        <p class="us-titE">Service</p>
        <div>
          <p></p>服务能力
          <p></p>
        </div>
      </div>
      <div class="progess container">
        <!-- <img class="progess-img" :src="progess" alt> -->
        <ul class="progess-ul">
          <li @click="hpcolumnsD(item.columnId)" v-for="(item,index) in hpcolumns" :key="index">
            <img class="progess-li-img" :src="item.hpIcon" alt />
            <p class="progess-li-pindex"></p>
            <p class="progess-li-spanindx">{{item.columnCname}}</p>
            <div class="progess-li-div" v-html="item.columnTitle"></div>
          </li>
          <li @click="hpcolumnsD()">
            <img class="progess-li-img" :src="checkMore1" alt />
            <p class="progess-li-pindex"></p>
            <p class="progess-li-spanindx">更多服务</p>
            <div class="progess-li-div">查看惠民汇付所提供的其它优质服务</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 解决方案 -->
    <div class="about-one about-one-tit" :style="backgroundDiv2">
      <img class="quan05" :src="quan02" alt />
      <img class="rightQ1" :src="shi01" alt />
      <img class="quan04" :src="shi01" alt />
      <img class="quan014" :src="shi014" alt />
      <!-- <img class="about-one2" :src="oneImg1" alt> -->
      <div class="us-tit us-tit-hon">
        <p class="us-titE">Solution</p>
        <div>
          <p></p>解决方案
          <p></p>
        </div>
      </div>
      <div class="carousel-d">
        <ul class="solution-type">
          <li :key="index" v-for="(item,index) in solutionD" @click="checkDe(index)">
            <div class="solution-img" :class="{'imgEd':item.tr}">
              <img v-if="item.tr" :src="item.iconCheck" alt />
              <img v-if="!item.tr" :src="item.icon" alt />
            </div>
            <p :class="{'imgEdColor':item.tr}">{{item.solutionCname}}</p>
          </li>
        </ul>

        <div
          @click="goDetail(solutionC.solutionId)"
          class="solution-details"
          :style="solutionC.backgroundDiv4"
        >
          <div class="solution-content">
            <p>{{solutionC.solutionCname}}</p>
            <p>{{solutionC.solutionTitle}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <img class="rightR1" :src="shi01" alt> -->
    <img class="rightL1" :src="shi01" alt />
    <!-- 步骤指导 -->
    <div class="about-three">
      <div class="us-tit us-tit3">
        <p class="us-titE">Guide</p>
        <div>
          <p></p>接入指引
          <p></p>
        </div>
      </div>
      <div class="parteList">
        <div class="parteList-one">
          <div class="parteList-top">
            <img :src="guide01" alt />
            <span>1</span>
          </div>
          <div class="parteList-bottom">
            <p>提交资料</p>
            <p>填写商户工商信息，业务场景介绍。</p>
          </div>
        </div>
        <img class="doubleImg" :src="double" alt />
        <div class="parteList-one">
          <div class="parteList-top">
            <img style="width:45px;" :src="guide02" alt />
            <span>2</span>
          </div>
          <div class="parteList-bottom">
            <p>补充资料</p>
            <p>完善商户信息，核验经办人联系， 方便为您开通支付业务。</p>
          </div>
        </div>
        <img class="doubleImg" :src="double" alt />
        <div class="parteList-one">
          <div class="parteList-top">
            <img style="width:45px;margin-bottom:12px;" :src="guide03" alt />
            <span>3</span>
          </div>
          <div class="parteList-bottom">
            <p>签署协议</p>
            <p>签订《商户承诺函》、《惠民汇付 支付服务协议》</p>
          </div>
        </div>
      </div>
    </div>
    <button @click="huiPay()" class="huiPay">立即接入</button>
    <!-- <div v-if="!msgText" style="height:250px;"></div> -->
  </div>
</template>

<script>
// import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  data() {
    return {
      never: "never",
      checkMore1: require("../assets/img/checkMore.png"),
      csjg: "",
      msgText: true,
      noticeData: "",
      hpcolumns: "", //服务列表
      bannerList: "", //轮播
      solutionC: "",
      noticeImg: require("../assets/img/notice.png"),
      checkMore: require("../assets/img/nextGreen.png"),
      quan01: require("../assets/img/aboutUs/quna01.png"),
      quan03: require("../assets/img/aboutUs/quan03.png"),
      quan04: require("../assets/img/aboutUs/quan04.png"),
      quan02: require("../assets/img/aboutUs/quan02.png"),
      shi01: require("../assets/img/12.png"),
      shi014: require("../assets/img/16.png"),
      flge: require("../assets/img/aboutUs/flge.png"),
      solutionD: "",
      solution: [
        {
          name: "连锁商户",
          img: require("../assets/img/aboutUs/shi01.png"),
          tr: true
        },
        {
          name: "智慧医院",
          img: require("../assets/img/aboutUs/shi01.png"),
          tr: false
        },
        {
          name: "电商平台",
          img: require("../assets/img/aboutUs/shi01.png"),
          tr: false
        },
        {
          name: "停车场",
          img: require("../assets/img/aboutUs/shi01.png"),
          tr: false
        },
        {
          name: "公共交通",
          img: require("../assets/img/aboutUs/shi01.png"),
          tr: false
        }
      ],
      flge111: require("../assets/img/111.png"),
      double: require("../assets/img/double.png"),
      guide01: require("../assets/img/step01.png"),
      guide02: require("../assets/img/step02.png"),
      guide03: require("../assets/img/step03.png"),
      // bigNews: require("../../assets/img/aboutUs/bigNews.png"),
      progess: require("../assets/img/aboutUs/process.png"),
      oneImg: require("../assets/img/Group39.png"),
      banks: require("../assets/img/aboutUs/chinaBank.png"),
      backgroundDiv1: {
        backgroundImage: "url(" + require("../assets/img/2222.png") + ")"
      },
      backgroundDiv2: {
        backgroundImage: "url(" + require("../assets/img/111.png") + ")"
      }
    };
  },
  components: {
    // BaiduMap
  },
  computed: {
    userNumber() {
      return this.$store.getters.userNumber;
    }
  },
  methods: {
    openUrl(e) {
      if (e.length > 4) {
        window.open(e);
      }
    },
    goNotice(e) {
      this.gotop1();
      if (e == "more") {
        this.$router.push({ name: "noticeMore" });
        return;
      }
      this.$router.push({ name: "details", params: { id: e } });
    },
    hpcolumnsD(e) {
      this.$emit("frame", "second");
      this.$router.push({
        name: "product",
        params: { columnId: e }
      });
      var target = document.getElementById("target");
      target.scrollIntoView();
    },
    goDetail(e) {
      this.$emit("frame", "third");
      this.$store.commit("changeSolutionId", e);
      this.$router.push({
        name: "solutionDetail",
        params: {
          solutionId: e
        }
      });
      this.gotop1();
    },
    checkDe(e) {
      var solution = this.solutionD;
      for (var i in solution) {
        solution[i].tr = false;
      }
      solution[e].tr = true;
      this.solutionC = solution[e];
    },
    arrs(arr) {
      var a1 = [];
      for (var i in arr) {
        arr[i].day = arr[i].createDate.slice(5, 10);
        if (i % 3 == 0) {
          a1.push(i);
        }
      }
      var a3 = [];
      var l = a1.length;
      for (var i in a1) {
        var j = parseInt(i);
        if (a1[j + 1]) {
          a3.push(arr.slice(a1[j], a1[j + 1]));
        } else {
          a3.push(arr.slice(a1[j], a1[l]));
        }
      }
      return a3;
    },
    huiPay() {
      //  //console..log(localStorage.getItem("username"))
      if (localStorage.getItem("authorization")) {
        if (localStorage.getItem("username") == null) {
          this.$notify.info({
            title: "您还未登录",
            message: "请先登陆",
            position: "bottom-right"
          });
          this.$router.push({ name: "login" });
        } else {
          //审核装阿嚏 -1-未申请 0-审核中 1-未通过 2-通过
          this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(
            res => {
              if (res.data.csjg) {
                if (res.data.csjg !== "") {
                  //已申请
                  this.$router.push({ name: "examine" });
                  return;
                }
                if (res.data.fszt !== "" && res.data.fszt !== "-1") {
                  //已申请
                  this.$router.push({ name: "examine" });
                  return;
                }
              } else {
                //未申请
                this.$router.push({ name: "apply" });
              }
            }
          );
        }
      } else {
        this.$notify.info({
          title: "您还未登录",
          message: "请先登陆",
          position: "bottom-right"
        });
        this.$router.push({ name: "login" });
      }
    },
    gotop1() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  },
  mounted() {
    this.gotop1();
    
    this.$emit("frame", "first");
    var that = this;
    //轮播
    this.$post(this.$api.api + "/gw/banner/list").then(res => {
      //  // ////console..log("顶部banner", res);
      if (res.code == "0") {
        var data = res.data.bannerList;
        for (var i in data) {
          data[i].backgroundDiv = {
            backgroundImage: "url(" + data[i].bannerImg + ")"
          };
        }
        this.bannerList = data;
        if (this.bannerList.length > 1) {
          this.never = "hover";
        } else {
          this.never = "never";
        }
      }
    });
    //栏目分表
    this.$post(this.$api.api + "/gw/productcenter/hpcolumns").then(res => {
      //console..log("栏目分表", res);
      this.hpcolumns = res;
    });
    //解决方案
    this.$post(this.$api.api + "/gw/solution/hot").then(res => {
      if (res.code == "0") {
        //console..log('解决方案，',res.data);
        if (res.data.length > 0) {
          for (var i in res.data) {
            res.data[i].tr = false;
            res.data[i].backgroundDiv4 = {
              backgroundImage: "url(" + res.data[i].hotSolImg + ")"
            };
          }
        }
        res.data[0].tr = true;
        this.solutionD = res.data.slice(0, 5);
        this.solutionC = res.data[0];
      }
    });
    //公告
    this.$get(
      this.$api.api + "/gw/newsinfo/hpTitleList?newsType=0&newsDesc=1"
    ).then(res => {
      if (res.code == "0") {
        this.noticeData = this.arrs(res.data);
        // //console..log("公告", this.arrs(res.data));
      }
    });
  }
};
</script>
<style scoped>
.home-banner {
  height: 100%;
  text-align: left;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  cursor: pointer;
}
.banner-item {
  width: 100%;
  height: 100%;
  background: no-repeat center center;
  background-size: contain 100%;
}
.home-banner p:first-child {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 28px;
  width: 600px;
  margin: 0 0 12px 3px;
}
.home-banner p:last-child {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 22px;
  width: 600px;
  margin: 0 0 100px 3px;
}
.header-seiper {
  height: 474px;
  background: #f1f1f1;
}
.swiper-div {
  margin-top: 78px;
  /* background-color: #dcf3dd; */
  height: 474px;
  overflow: hidden;
}
.notice {
  width: 100%;
  height: 67px;
  background-color: #f1f1f1;
}
.notice-div {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.sw-div {
  width: 1032px;
  height: 67px;
}
.notice-p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1032px;
  height: 67px;
}

.notice-p p {
  width: 330px;
  height: 67px;
  line-height: 67px;
  text-align: left;
  margin: 0 6px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}
.notice-p p:hover {
  color: #62bd72;
}
.notice-img1 {
  width: 20px;
  height: 18px;
}
.notice-img2 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.notice-img2 p {
  color: #62bd72;
  font-weight: 400;
  cursor: pointer;
}
.notice-img2 img {
  width: 20px;
  height: 18px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.carousel-d {
  width: 1200px;
  margin: 60px auto 0;
  position: relative;
  z-index: 2;
  /* background-color: #62BD72; */
}
.solution-type {
  width: 1200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background: #8fe195; */
}
.solution-type li {
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
}
.solution-img {
  width: 81px;
  height: 81px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
  margin-bottom: 8px;
  overflow: hidden;
  background: #ffffff;
}
.solution-img img {
  width: 40px;
  margin-top: 20.5px;
  vertical-align: bottom;
}
.solution-type li:hover .solution-img {
  /* border: 1px solid #62bd72; */
  box-shadow: #e5e5e5 0 0 2px;
}
.imgEd {
  border: 1px solid #62bd72;
  box-shadow: #e5e5e5 0 0 2px;
}
.solution-type li:hover {
  color: #62bd72;
}
.imgEdColor {
  color: #62bd72;
}
.solution-details {
  width: 1200px;
  height: 350px;
  margin: 44px auto;
  background: no-repeat center center;
  background-size: 100%;
  position: relative;
  cursor: pointer;
}
.solution-content {
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 20px 30px;
  width: 411px;
  height: 174px;
  background: rgba(0, 206, 90, 0.87);
  border-radius: 10px;
  opacity: 0.8;
  text-align: left;
}
.solution-content p:first-child {
  font-size: 30px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 42px;
  letter-spacing: 1px;
  margin: 7px 0 5px;
}
.solution-content p:last-child {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
}

.flge {
  padding: 5% 0 7%;
  margin: 0 auto;
  width: 25%;
  z-index: 100;
  position: relative;
}
.flge img {
  width: 100%;
}
.flge111 {
  /* width: 70%; */
  height: 60%;
  /* padding-top: 69px; */
  margin: 0 auto;
}
@media all and (max-width: 1200px) {
  .aboutUs {
    width: 1200px;
    position: relative;
  }
}
.flge111 img {
  height: 100%;
}
.aboutUs {
  /* height: 200px; */
  text-align: center;
  margin-top: 60px;
  background-color: #f8f8fa;
}
.about-one1 {
  width: 100%;
  height: 543px;
}
.about-one2 {
  width: 100%;
  height: 951px;
}
.about-one3 {
  width: 100%;
  height: 557px;
}
.about-one {
  /* height: 445px; */
  /* width: 300px; */
  /* background: no-repeat center top;
  background-size: 100% 100%; */
  /* position: relative; */
}
.quan01 {
  width: 100px;
  /* background: red; */
  position: absolute;
  z-index: 0;
  left: 30%;
  top: 60%;
  animation: quan02 10s linear infinite;
}

.quan02 {
  width: 100px;
  /* background: green; */
  position: absolute;
  left: 2%;
  top: 50%;
  animation: quan02 10s linear infinite;
}
@keyframes quan02 {
  0% {
    transform: scale(2);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(2);
  }
}
.quan03 {
  width: 150px;
  /* background: gold; */
  position: absolute;
  top: 60%;
  right: 0;
  animation: quan02 10s linear infinite;
}
.us-tit {
  text-align: center;
  position: relative;
  z-index: 2;
}

.us-tit1 {
  margin: 100px 0 20px;
  /* background-color: red; */
}

.us-titE {
  font-size: 60px;
  color: #dedfe2;
  line-height: 30px;
  width: 100%;
  text-align: center;
  position: absolute;
  top: -30px;
  z-index: -1;
}
.us-tit div {
  font-size: 50px;
  color: #dedfe2;
  font-size: 30px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.us-tit div p {
  width: 31px;
  height: 8px;
  margin: 0 20px;
  background-color: #62bd72;
  border-radius: 50px;
}
.bigNews {
  padding: 0 0 10px;
  width: 100%;
  /* background-color: pink; */
  background: no-repeat center bottom;
  background-size: 100% 70%;
}
.bigNews-tit {
  height: 84px;
}
.bigNews-tit img {
  /* background-color: #62BD72; */
  height: 100%;
}
.progess {
  /* width: 100%; */
  /* background-color: red; */
  position: relative;
}

.progess-ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 60px 0;
  /* width: 960px;  */
  /* height: 300px; */
  /* overflow: hidden; */
}
.progess-ul li {
  width: 240px;
  height: 300px;
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 80px;
  margin-bottom: 50px;
  border: 1px solid #e5e5e5;
  /* box-shadow:#e5e5e5 0 0 2px; */
  cursor: pointer;
}
.progess-ul li:nth-child(4n) {
  margin-right: 0;
}
.progess-ul li:hover {
  border: 1px solid #62bd72;
  box-shadow: #e5e5e5 0 0 2px;
}
.progess-li-img {
  width: 60px;
  height: 61px;
  margin: 40px 0 15px;
}
.progess-li-pindex {
  width: 25px;
  height: 6px;
  border-radius: 10px;
  margin: 0 auto 13px;
  background-color: #62bd72;
}
.progess-li-spanindx {
  color: #333333;
  font-size: 18px;
  font-weight: 500;
}
.progess-li-div {
  margin: 13px 20px 0;
  font-size: 14px;
  color: #666666;
  text-align: center;
  line-height: 20px;
  letter-spacing: 1.3px;
}
/* .progess-ul li:nth-child(4n) {
  margin-right: 0;
} */
.rightQ1 {
  position: absolute;
  top: -65%;
  right: -2%;
  width: 80px;
  /* background-color: red; */
  animation: rightQ1 3s linear infinite;
}
@keyframes rightQ1 {
  0% {
    width: 80px;
    transform: rotate(0);
    /* opacity: 0.3; */
  }
  50% {
    /* opacity: 0.7; */
    width: 85px;
    transform: rotate(180deg);
  }
  100% {
    width: 80px;
    /* opacity: 0.3; */
    transform: rotate(360deg);
  }
}
.quan04 {
  position: absolute;
  top: 70%;
  left: -7%;
  width: 250px;
  /* background-color: pink; */
  animation: quan04 10s linear infinite;
}
@keyframes quan04 {
  0% {
    opacity: 0.6;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(50px);
  }
  100% {
    opacity: 0.6;
    transform: translateY(0);
  }
}
.quan014 {
  position: absolute;
  top: -7%;
  right: -9%;
  width: 250px;
  opacity: 0.8;
  /* z-index: -1; */
  animation: quan014 10s linear infinite;
}
@keyframes quan014 {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.about-one-tit {
  /* height: 600px; */
  /* background-color: #62BD72; */
  position: relative;
  background: no-repeat center top;
  background-size: 100% 100%;
  padding-bottom: 100px;
  padding-top: 120px;
}
.quan05 {
  width: 140px;
  /* background: red; */
  position: absolute;
  top: -8%;
  left: 3%;
  animation: quan05 10s linear infinite;
}
@keyframes quan05 {
  0% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1.5);
  }
}
/* .us-tit-hon {
  padding-top: 130px;
} */
.us-tit3 {
  margin: 60px 0 50px;
}
.parteList {
  width: 1200px;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.parteList-one {
  width: 230px;
  height: 220px;
  padding: 26px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(98, 189, 114, 1);
}
.doubleImg {
  width: 44px;
  margin: 0 60px;
}
.parteList-top {
  display: flex;
  justify-content: space-between;
  font-size: 60px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 84px;
}
.parteList-top span {
  /* background: red; */
}
.parteList-top img {
  width: 40px;
  /* height: 40px; */
  margin-top: 49px;
}
.parteList-bottom {
  text-align: left;
}
.parteList-bottom p:first-child {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  margin: 20px 0 5px;
}
.parteList-bottom p:last-child {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
}
.huiPay {
  margin: 60px auto 220px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 200px;
  height: 50px;
  border-radius: 100px;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  cursor: pointer;
}
.rightR1 {
  width: 50px;
  position: absolute;
  bottom: 100px;
  right: 30%;
}
.rightL1 {
  width: 200px;
  position: absolute;
  bottom: 0;
  right: -50px;
  opacity: 0.8;
  animation: rightL1 10s linear infinite;
}
@keyframes rightL1 {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
























