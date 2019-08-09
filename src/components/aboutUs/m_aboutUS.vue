<template>
  <div id="target" class="aboutUs">
    <div class="about-one about-one1" :style="backgroundDiv1">
      <div class="flge111">
        <img :src="flge111" alt />
      </div>
    </div>
    <!-- <div style="height:100px;"></div> -->
    <!-- 大事记 -->
    <div class="bigNews">
      <div class="us-tit">
        <p class="us-titE">Milepost</p>
        <div class="us-titDiv">
          <p></p>大事记
          <p></p>
        </div>
      </div>
      <div class="progess">
        <img class="progess-img" :src="progess" alt />
      </div>
    </div>
    <!-- 荣誉 -->
    <div class="about-one about-one-tit" :style="backgroundDiv2">
      <div class="us-tit">
        <p class="us-titE">Honor</p>
        <div class="us-titDiv">
          <p></p>荣誉
          <p></p>
        </div>
      </div>
      <div class="carousel-d">
        <el-carousel height="3.5rem" indicator-position="none" :interval="5000" arrow="always">
          <el-carousel-item v-for="(item,index) in honor" :key="index">
            <div class="carousel-img">
              <img :src="item" alt />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="about-three">
      <div class="us-tit">
        <p class="us-titE">Cooperation</p>
        <div class="us-titDiv">
          <p></p>合作伙伴
          <p></p>
        </div>
      </div>
      <div class="parteList">
        <img v-for="(item,index) in banks" :key="index" :src="item" alt />
      </div>
    </div>
    <!-- 联系我们 -->
    <div class="about-one about-map" :style="backgroundDiv3">
      <div class="us-tit">
        <p class="us-titE">Contact</p>
        <div class="us-titDiv">
          <p></p>联系我们
          <p></p>
        </div>
      </div>
      <div class="information">
        <div class="information-div">
          <div>
            <img :src="phone" alt />
            <span>0571-96225</span>
          </div>
          <div>
            <img :src="phone" alt />
            <span>0571-81602849</span>
          </div>
        </div>
        <div class="information-div">
          <div>
            <img :src="email" alt />
            <span>hzsmkpay@96225.com</span>
          </div>

          <div>
            <img style="width:0.28rem;margin-top:0.1rem;" :src="address" alt />
            <span>杭州市上城区婺江路217号近江时代大厦A座14楼</span>
          </div>
        </div>
      </div>
      <div class="map-d">
        <mapbaidu></mapbaidu>
      </div>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>

<script>
import mapbaidu from "../map/m_map";
import $ from "jquery";
export default {
  data() {
    return {
      honor: [
        require("../../assets/img/honor01.jpg"),
        require("../../assets/img/honor02.jpg"),
        require("../../assets/img/honor03.jpg"),
        require("../../assets/img/honor04.jpg"),
        require("../../assets/img/honor05.jpg")
      ],
      mapB: require("../../assets/img/map.jpg"),
      phone: require("../../assets/img/aboutUs/phone.png"),
      address: require("../../assets/img/aboutUs/dizhi.png"),
      email: require("../../assets/img/aboutUs/emile.png"),
      quan01: require("../../assets/img/aboutUs/quna01.png"),
      quan03: require("../../assets/img/aboutUs/quan03.png"),
      quan04: require("../../assets/img/aboutUs/quan04.png"),
      quan02: require("../../assets/img/aboutUs/quan02.png"),
      shi01: require("../../assets/img/aboutUs/shi01.png"),
      flge: require("../../assets/img/aboutUs/flge.png"),
      flge111: require("../../assets/img/aboutUs/111.png"),
      // bigNews: require("../../assets/img/aboutUs/bigNews.png"),
      progess: require("../../assets/img/aboutUs/process.png"),
      oneImg: require("../../assets/img/Group39.png"),
      banks: [
        require("../../assets/img/bank01.png"),
        require("../../assets/img/bank02.png"),
        require("../../assets/img/bank03.png"),
        require("../../assets/img/bank04.png"),
        require("../../assets/img/bank05.png"),
        require("../../assets/img/bank06.png"),
        require("../../assets/img/bank07.png"),
        require("../../assets/img/bank08.png"),
        require("../../assets/img/bank09.png"),
        require("../../assets/img/bank10.png"),
        require("../../assets/img/bank16.png"),
        require("../../assets/img/bank15.png"),
        require("../../assets/img/bank11.png"),
        require("../../assets/img/bank12.png"),
        require("../../assets/img/bank13.png"),
        require("../../assets/img/bank14.png")
      ],

      backgroundDiv1: {
        backgroundImage:
          "url(" + require("../../assets/img/aboutUs/back01.png") + ")"
      },
      backgroundDiv2: {
        backgroundImage:
          "url(" + require("../../assets/img/aboutUs/back02.png") + ")"
      },
      backgroundDiv3: {
        backgroundImage:
          "url(" + require("../../assets/img/aboutUs/back03.png") + ")"
      }
    };
  },
  components: {
    mapbaidu
  },
  methods: {
    checkMap() {
      this.$router.push({ name: "map" });
    }
  },
  mounted() {
    var target = document.getElementById("target");
    target.scrollIntoView();
    // $(".el-carousel__arrow").css("width", "30px");
    $("button").css({ width: "0.6rem", height: "0.6rem" });
    $(".el-carousel__arrow i ").css("font-size", "0.4rem");
  }
};
</script>
<style scoped>
.carousel-d {
  overflow: hidden;
}
.carousel-img {
  margin: 0 auto;
  height: 100%;
  /* background: green; */
}
.carousel-img img {
  height: 100%;
  /* margin-top: 25px; */
}
.flge {
  padding: 5% 0 7%;
  margin: 0 auto;
  width: 25%;
  z-index: 100;
  position: relative;
  border: 1px solid red;
}
.flge img {
  width: 100%;
}
.flge111 {
  /* width: 70%; */
  height: 2rem;
  margin: 0 auto;
}

.flge111 img {
  margin-top: 0.8rem;
  height: 100%;
}
.aboutUs {
  text-align: center;
  background-color: #ffffff;
}
.about-one1 {
  width: 100%;
  height: 3rem;
}
.about-one2 {
  width: 100%;
  height: 951px;
  border: 1px solid red;
}
.about-one3 {
  width: 100%;
  height: 557px;
}
.about-one {
  width: 100%;
  background: no-repeat center top;
  background-size: 100% 100%;
  /* position: relative; */
}
.bigNews {
  margin: 5% 0 0;
  /* background-color: pink; */
}
.bigNews-tit {
  height: 84px;
}
.bigNews-tit img {
  /* background-color: #62bd72; */
  height: 100%;
}
.progess {
  width: 85%;
  margin: 0 auto;
  position: relative;
}
.progess-img {
  width: 100%;
}

.about-one-tit {
  padding: 0.4rem 0;
  position: relative;
}

.parteList {
  /* width: 1300px; */
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.parteList img {
  width: 2.4rem;
  height: 0.8rem;
  margin-bottom: 0.1rem;
}

.about-map {
  position: relative;
  padding: 0.3rem;
}
.map-d {
  width: 100%;
  height: 6rem;
  overflow: hidden;
  background: #62bd72;
  /* border-radius:0.1rem; */
  /* box-shadow: 0 0 0.05rem gray; */
  position: absolute;
  bottom: -4.3rem;
  left: 0;
}
.map-d img {
  width: 100%;
}
.information {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 2rem;
}
.information img {
  width: 0.3rem;
  margin: 0.12rem 0.1rem;
}
.information-div div {
  text-align: left;
  font-size: 0.27rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #666666;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 0.32rem;
}
.information-div {
  /* display: flex;
  justify-content: center; */
}
/* 标题 */
.us-tit {
  position: relative;
  margin-top: 0.5rem;
}
.us-titDiv {
  font-size: 0.3rem;
  color: #333333;
  z-index: 3;
  /* background: red; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.us-titDiv p {
  width: 0.3rem;
  height: 0.1rem;
  background-color: #62bd72;
  border-radius: 0.1rem;
  margin: 0.5rem 0.2rem;
}
.us-titE {
  position: absolute;
  left: 0;
  top: 0.1rem;
  z-index: 0;
  width: 100%;
  text-align: center;
  color: #dedfe2;
  font-size: 0.5rem;
}
</style>
