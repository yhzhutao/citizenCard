<template>
  <div id="target">
    <!-- 顶部轮播 -->
    <div class="swiper-div">
      <el-carousel :arrow="never" height="3.1rem">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <div class="banner-item" :style="item.backgroundDiv">
            <div
              @click="openUrl(item.redirectUri)"
              style="background:rgba(255,255,255,0);height:100%;"
            ></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 新闻公告 -->
    <div class="notice">
      <img class="notice-img1" :src="noticeImg" alt />
      <div class="sw-div">
        <el-carousel
          indicator-position="none"
          height="0.7rem"
          direction="vertical"
          :autoplay="true"
        >
          <el-carousel-item v-for="(item,index) in noticeData" :key="index">
            <div class="notice-p">
              <p @click="goNotice(item.newsId)">【{{item.createDate.slice(5, 10)}}】{{item.newsCname}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="notice-img2">
        <router-link to="/m_index/m_notice">更多公告</router-link>
        <img :src="checkMore" alt />
      </div>
    </div>
    <!-- 更多服务//产品中心 -->
    <div class="bigNews" :style="backgroundDiv1">
      <div class="us-tit">
        <p class="us-titE">Service</p>
        <div class="us-titDiv">
          <p></p>服务能力
          <p></p>
        </div>
      </div>
      <div class="progess">
        <ul class="progess-ul">
          <li @click="hpcolumnsD(item.columnId)" v-for="(item,index) in hpcolumns" :key="index">
            <div class="sever-left">
              <img class="progess-li-img" :src="item.hpIcon" alt />
              <p class="progess-li-span">{{item.columnCname}}</p>
            </div>

            <div class="progess-li-div" v-html="item.columnTitle"></div>
          </li>
          <li @click="hpcolumnsD()">
            <div class="sever-left">
              <img class="progess-li-img" :src="checkMore1" alt />
              <p class="progess-li-span">更多服务</p>
            </div>
            <div class="progess-li-div">查看惠民汇付所提供的其它优质服务</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 解决方案 -->
    <div>
      <div class="us-tit">
        <p class="us-titE">Solution</p>
        <div class="us-titDiv">
          <p></p>解决方案
          <p></p>
        </div>
      </div>
      <ul class="solution-type">
        <li :key="index" v-for="(item,index) in solutionD" @click="checkDe(index,item.solutionId)">
          <div class="solution-img" :class="{'imgEd':item.tr}">
            <img v-if="item.tr" :src="item.iconCheck" alt />
            <img v-if="!item.tr" :src="item.icon" alt />
          </div>
          <p :class="{'imgEdColor':item.tr}">{{item.solutionCname}}</p>
        </li>
      </ul>
    </div>
    <!-- 接入指引 -->
    <div>
      <div class="us-tit">
        <p class="us-titE">Guide</p>
        <div class="us-titDiv">
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
            <img :src="guide02" alt />
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
            <img style="height:0.4rem;margin-bottom:0.1rem;" :src="guide03" alt />
            <span>3</span>
          </div>
          <div class="parteList-bottom">
            <p>签署协议</p>
            <p>签订《商户承诺函》、《惠民汇付 支付服务协议》</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src='../../static/js/rem.js'>
</script>
<script>
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
      window.open(e);
    },
    goNotice(e) {
      this.$router.push({ name: "m_details", params: { id: e } });
      var target = document.getElementById("target");
      target.scrollIntoView();
    },
    hpcolumnsD(e) {
      this.$emit("frame", "second");
      this.$router.push({
        name: "m_productCenter",
        params: { columnId: e }
      });
      var target = document.getElementById("target");
      target.scrollIntoView();
    },
    goDetail(e) {
      this.$emit("frame", "third");
      this.$store.commit("changeSolutionId", e);
      this.$router.push({
        name: "m_solutionDetail",
        params: {
          solutionId: e
        }
      });
    },
    checkDe(e, id) {
      var solution = this.solutionD;
      for (var i in solution) {
        solution[i].tr = false;
      }
      solution[e].tr = true;
      this.solutionC = solution[e];
      this.$emit("frame", "third");
      this.$store.commit("changeSolutionId", id);
      this.$router.push({
        name: "m_solutionDetail",
        params: {
          solutionId: id
        }
      });
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
    }
  },
  mounted() {
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
        this.solutionD = res.data.slice(0, 5);
        this.solutionC = res.data[0];
      }
    });
    //公告
    this.$get(
      this.$api.api + "/gw/newsinfo/hpTitleList?newsType=0&newsDesc=1"
    ).then(res => {
      if (res.code == "0") {
        this.noticeData = res.data;
        //  this.arrs(res.data);
        // console.log("公告", res.data);
      }
    });
  }
};
</script>
<style scoped>
/* 顶部轮播 */
.swiper-div {
  width: 100%;
  height: 3.1rem;
  background-color: rgb(210, 236, 236);
}
.banner-item {
  width: 100%;
  height: 100%;
  background: no-repeat center center;
  background-size: auto 100%;
}
/* 标题 */
.us-tit {
  position: relative;
  padding: 0.4rem 0 0.3rem;
  margin: 0 0.3rem 0.6rem;
  border-bottom: 0.01rem solid #e5e5e5;
  box-shadow: 0px 0.2rem 0.1rem -0.15rem #e5e5e5;
}
.us-titDiv {
  font-size: 0.3rem;
  color: #333333;
  /* background: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.us-titDiv p {
  width: 0.3rem;
  height: 0.1rem;
  background-color: #62bd72;
  border-radius: 0.1rem;
  margin: 0 0.2rem;
}
.us-titE {
  position: absolute;
  left: 0;
  top: 0.1rem;
  z-index: -1;
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.5rem;
}
/* 新闻公告 */
.notice {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f1f1;
}
.notice-img1 {
  width: 0.3rem;
  margin: 0 0.1rem 0 0.3rem;
}
.notice-img2 {
  width: 2.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.notice-img2 a {
  color: #62bd72;
  font-size: 0.25rem;
}
.notice-img2 img {
  width: 0.3rem;
  margin: 0 0.2rem 0 0;
}
.sw-div {
  width: 100%;
  font-size: 0.25rem;
  line-height: 0.7rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
/* 服务 */
.progess-ul {
  /* display: flex;
  justify-content: space-around;
  flex-wrap: wrap; */
}
.progess-ul li {
  margin: 0.1rem 0.3rem;
  padding: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  margin-bottom: 0.3rem;
  background-color: #ffffff;
  border: 0.01rem solid #e5e5e5;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.08rem rgb(233, 230, 230);
}
.progess-li-img {
  width: 0.8rem;
  margin-bottom: 0.1rem;
}
.sever-left {
  font-size: 0.28rem;
  width: 20%;
  font-weight: 400;
  text-align: center;
  color: #333333;
}
.progess-li-div {
  width: 78%;
  margin-left: 2%;
  font-size: 0.27rem;
  color: #666666;
  line-height: 0.3rem;
  letter-spacing: 0.02rem;
}
/* 接入指引 */
.parteList {
  /* width: 1200px; */
  margin: 0 auto 0.1rem;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  align-items: center;
}
.parteList-one {
  width: 1.8rem;
  height: 3.2rem;
  padding: 0.1rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.1rem;
  border: 0.01rem solid rgba(98, 189, 114, 1);
}
.doubleImg {
  width: 0.3rem;
  margin: 0 0.15rem;
}
.parteList-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  /* line-height: 84px; */
}
.parteList-top span {
  /* background: red; */
}
.parteList-top img {
  /* width: 0.5rem; */
  height: 0.5rem;
  margin-top: 0.2rem;
}
.parteList-bottom {
  text-align: left;
}
.parteList-bottom p:first-child {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  /* line-height: 25px; */
  margin: 0.2rem 0 0.1rem;
}
.parteList-bottom p:last-child {
  font-size: 0.25rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  letter-spacing: 0.01rem;
  color: rgba(153, 153, 153, 1);
  line-height: 0.3rem;
}
/* 解决方案 */
.solution-type {
  /* width: 1200px; */
  margin: 0.3rem;
  display: flex;
  justify-content: space-around;

  flex-wrap: wrap;
  align-items: center;
  /* background: #8fe195; */
}
.solution-type li {
  text-align: center;
  font-size: 0.25rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
}
.solution-img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 0.01rem solid #e5e5e5;
  margin-bottom: 0.1rem;
  overflow: hidden;
  background: #ffffff;
}
.solution-img img {
  width: 0.5rem;
  margin-top: 0.25rem;
  vertical-align: bottom;
}
.solution-type li:hover .solution-img {
  /* border: 1px solid #62bd72; */
  box-shadow: #e5e5e5 0 0 2px;
}
.imgEd {
  border: 0.01rem solid #62bd72;
  box-shadow: #e5e5e5 0 0 0.02rem;
}
.solution-type li:hover {
  color: #62bd72;
}
</style>
