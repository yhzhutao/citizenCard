<template>
  <div class="de-all">
    <div class="headerImg" :style="data.backgroundDiv4">
      <div class="blackC">
        <div class="container container-p">
          <p class="container-p1">{{data.solutionCname}}</p>
          <p class="container-p2">{{data.solutionContent}}</p>
        </div>
      </div>
    </div>
    <div class="white">
      <div class="container">
        <div class="details-left">
          <div class="case-all" :key="index" v-for="(item,index) in solutionInfo">
            <p class="caseA">{{item.solutionInfoCname}}</p>
            <div class="dataContent" v-html="item.solutionInfoDesc"></div>
          </div>
        </div>
        <div :style="backgroundheight" class="details-right">
          <p class="reva-tit">相关产品</p>
          <ul class="revalantImg">
            <li @click="check(item.prodId)" :key="index" v-for="(item,index) in data.prodSolution">
              <img :src="item.fileAddr" alt />
              <p class="revalantImg-p1"></p>
              <span class="revalantImg-span">{{item.prodCname}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      solutionInfo: "",
      backgroundheight: {
        height: ""
      },
      revalantImg: require("../../assets/img/reva01.png"),
      data: ""
    };
  },
  methods: {
    check(e) {
      this.$emit("frame", "second");
      this.$router.push({
        name: "productDetail",
        params: { id: e }
      });
    }
  },
  mounted() {
    //console.log(this.$store.state.activeValue);
    console.log(this.$api.api + "/gw/solution/detail")
    var subMit = this.$store.state.solutionId;
    this.$emit("frame", "third");
    var that = this;
    //解决方案详情
    this.$post(this.$api.api + "/gw/solution/detail?solutionId="+subMit).then(res => {    
      if (res.code == "0") {
        console.log("解决方案详情", res.data.solutionInfo);
        res.data.backgroundDiv4 = {
          backgroundImage: "url(" + res.data.detailImg + ")"
        };
        this.data = res.data;
        var solutionInfo = res.data.solutionInfo;
        for (var i in solutionInfo) {
          solutionInfo[i].solutionInfoDesc = unescape(
            solutionInfo[i].solutionInfoDesc
          );
        }
        this.solutionInfo = solutionInfo;
        var kl = res.data.prodSolution.length;
        if (kl > 8) {
          this.backgroundheight.height = kl * 110 + "px";
        } else {
          this.backgroundheight.height =
            document.body.clientHeight * 1.5 + "px";
        }
      } else {
        //console..log(res.msg);
      }
    });
  }
};
</script>
<style scoped>
.headerImg {
  height: 400px;
  background: rgb(231, 188, 188);
  margin-top: 80px;
  width: 100%;
  background: no-repeat center center;
  background-size: 100% 100%;
}
.blackC {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.container-p {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.container-p1 {
  font-size: 46px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  /* line-height: 65px; */
  /* padding: 60px 0 20px; */
  padding-bottom: 20px;
}
.container-p2 {
  width: 1190px;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
  letter-spacing: 2px;
}
.details-left {
  float: left;
  width: 800px;
  padding: 30px;
  padding-bottom: 100px;
  border-right: 1px solid rgba(231, 231, 231, 1);
}
.details-right {
  float: left;
  width: 349px;
  background-color: #ffffff;
  padding: 30px 30px;
  border-left: 1px solid rgba(231, 231, 231, 1);
}
.reva-tit {
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 35px;
  margin-left: 10px;
}
.revalantImg {
  overflow: hidden;
  width: 400px;
}
.revalantImg li {
  float: left;
  width: 108px;
  height: 108px;
  background-color: #ffffff;
  text-align: center;
  border-radius: 5px;
  margin: 5px 72px 29px 10px;
  border: 1px solid #f0f0f5;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.revalantImg li:hover {
  border: 1px solid #62db75;
  box-shadow: #f0f0f5 0 0 2.5px;
}
.revalantImg li img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.revalantImg-p1 {
  margin: 7px auto;
  width: 20px;
  height: 5px;
  border-radius: 10px;
  background-color: #62bd72;
}
.revalantImg-span {
  font-size: 15px;
  color: #000000;
  width: 100%;
}
.caseA {
  font-size: 24px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 20px;
}
.case-all {
  margin-bottom: 40px;
}
.white {
  /* border: 1px solid red; */
  overflow: hidden;
  background: #ffffff;
}
@media all and (max-width: 1000px) {
  .de-all {
    width: 1000px;
    position: relative;
  }
}
.dataContent {
  line-height: 29px;
 font-size: 20px;
  letter-spacing: 0.7px;
  word-wrap: break-word;
}
.dataContent p {
 
  /* margin: 10px 0; */
}
.dataContent img {
  margin: 10px 0;
}
.dataContent >>> * {
  word-break: break-all;
}
.dataContent >>> pre {
  overflow: scroll;
  overflow-y: hidden;
  background: #eceaea;
}
.dataContent >>> table {
  margin: 5px 0;
  border: 1px solid black;
}
.dataContent >>> tr {
  border: 1px solid black;
}
.dataContent >>> td {
  border: 1px solid black;
}
.dataContent >>> th {
  border: 1px solid black;
}
</style>
