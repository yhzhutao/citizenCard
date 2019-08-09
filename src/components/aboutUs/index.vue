<template>
  <div id="target" class="aboutUs">
    <div class="about-one" :style="backgroundDiv1">
      <!-- <img class="about-one1" :src="oneImg" alt> -->
      <div class="flge">
        <img :src="flge" alt>
      </div>
      <div class="flge111">
        <img :src="flge111" alt>
      </div>
      <img class="quan01" :src="quan01" alt>
      <img class="quan02" :src="quan04" alt>
      <img class="quan03" :src="quan03" alt>
    </div>
    <div style="height:100px;"></div>
    <div class="bigNews">
      <div class="us-tit us-tit1">
        <p class="us-titE">Milepost</p>
        <div>
          <p></p>大事记
          <p></p>
        </div>
      </div>
      <div class="progess">
        <img class="progess-img" :src="progess" alt>
        <img class="shi01" :src="shi01" alt>
        <img class="quan04" :src="quan02" alt>
      </div>
    </div>
    <div class="about-one about-one-tit" :style="backgroundDiv2">
      <img class="quan05" :src="quan02" alt>
      <!-- <img class="about-one2" :src="oneImg1" alt> -->
      <div style="height:50px;"></div>
      <div class="us-tit us-tit-hon">
        <p class="us-titE">Honor</p>
        <div>
          <p></p>荣誉资质
          <p></p>
        </div>
      </div>
      <div class="carousel-d">
        <el-carousel height="400px" indicator-position="none" :interval="5000" arrow="always">
          <el-carousel-item v-for="(item,index) in honor" :key="index">
            <div class="carousel-img">
              <img :src="item" alt>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="about-three">
      <div class="us-tit us-tit3">
        <p class="us-titE">Cooperation</p>
        <div>
          <p></p>合作伙伴
          <p></p>
        </div>
      </div>
      <div class="parteList">
        <img v-for="(item,index) in banks" :key="index" :src="item" alt>
      </div>
    </div>
    <div class="about-one about-map" :style="backgroundDiv3">
      <!-- <img class="about-one3" :src="oneImg2" alt> -->
      <div class="us-tit us-tit4">
        <p class="us-titE">Contact</p>
        <div>
          <p></p>联系我们
          <p></p>
        </div>
      </div>
      <div class="information">
        <div class="information-div">
          <div>
            <img :src="phone" alt>
            <span>0571-81602849</span>
          </div>

          <div>
            <img style="width:13px;margin-left:32px;" :src="address" alt>
            <span>杭州市上城区婺江路217号近江时代大厦A座14楼</span>
          </div>
        </div>
        <div class="information-div">
          <div>
            <img :src="phone" alt>
            <span>0571-96225</span>
          </div>
          <div>
            <img :src="email" alt>
            <span>hzsmkpay@96225.com</span>
          </div>
        </div>
      </div>
      <div class="map-d">
        <mapbaidu></mapbaidu>
      </div>
    </div>
    <div style="height:100px;"></div>
  </div>
</template>

<script>
import mapbaidu from "../map/map";
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
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.carousel-d {
  width: 1000px;
  margin: 60px auto 0;
  overflow: hidden;
  /* background-color: #62bd72; */
}
h3 {
  /* background-color: red; */
  width: 100px;
}
.carousel-img {
  margin: 0 auto;
  height: 400px;
  /* background: green; */
}
.carousel-img img {
  height: 400px;
  /* margin-top: 25px; */
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
@media all and (max-width: 1000px) {
  .aboutUs {
    width: 1000px;
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
  background-color: #ffffff;
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
  height: 445px;
  /* width: 300px; */
  background: no-repeat center top;
  background-size: 100% 100%;
  /* position: relative; */
}
.quan01 {
  width: 100px;
  /* background: red; */
  position: absolute;
  z-index: 1;
  left: 30%;
  top: 30%;
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
  top: 5%;
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
  top:-30px;
  z-index:-1;
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
  width: 60%;
  margin: 0 auto;
  position: relative;
}
.progess-img {
  width: 100%;
}
.shi01 {
  position: absolute;
  left: -10%;
  top: 35%;
  width: 50px;
  /* background-color: #62bd72; */
  animation: quan02 10s linear infinite;
}
.quan04 {
  position: absolute;
  top: 15%;
  right: -20%;
  width: 60px;
  /* background-color: pink; */
  animation: quan02 10s linear infinite;
}
.about-one-tit {
  height: 850px;
  padding-top: 50px;
  /* padding-bottom: 200px; */
  /* background-color: #62bd72; */
  position: relative;
}
.quan05 {
  width: 140px;
  /* background: red; */
  position: absolute;
  top: -10%;
  left: 3%;
  animation: quan02 10s linear infinite;
}
.us-tit-hon {
  margin-top: 130px;
}
.us-tit3 {
  margin: 60px 0 50px;
}
.parteList {
  width: 1300px;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.parteList img {
  width: 270px;
  height: 80px;
  margin: 20px;
}
.us-tit4 {
  /* background-color: red; */
  /* margin-top: 200px; */
}
.about-map {
  margin-bottom: 500px;
  padding-top: 200px;
}
.map-d {
  width: 1200px;
  height: 485px;
  overflow: hidden;
  font-size: 50px;
  /* line-height: 485px; */
  background: #62bd72;
  border-radius: 7px;
  box-shadow: 0 0 5px gray;
  margin: 50px auto 150px;
  cursor: pointer;
}
.map-d img {
  width: 100%;
}
.information {
  width: 700px;
  margin: 50px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.information img {
  width: 16px;
  margin: 0 5px 0 30px;
}
.information-div div {
  text-align: left;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 25px;
}
.information-div {
  /* display: flex;
  justify-content: center; */
}
</style>
