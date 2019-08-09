<template>
  <div class="de-all">
    <div class="headerImg" :style="data.backgroundDiv4">
      <div class="blackC">
        <div class="container-p">
          <p class="container-p1">{{data.solutionCname}}</p>
          <p class="container-p2">{{data.solutionContent}}</p>
        </div>
      </div>
    </div>
    <div class="white">
      <div class="details-left">
        <div class="case-all" :key="index" v-for="(item,index) in solutionInfo">
          <p class="caseA">{{item.solutionInfoCname}}</p>
          <div class="dataContent" v-html="item.solutionInfoDesc"></div>
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
    //console..log(this.$store.state.activeValue);
    var subMit = this.$store.state.solutionId;
    this.$emit("frame", "third");
    var that = this;
    //解决方案详情
    this.$post(this.$api.api + "/gw/solution/detail?solutionId="+subMit).then(res => {
      if (res.code == "0") {
        // console.log("解决方案详情", res.data.solutionInfo);
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
          this.backgroundheight.height = kl * 110/100 + "rem";
        } else {
          this.backgroundheight.height =
            document.body.clientHeight * 1.5/100 + "rem";
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
  height: 4rem;
  background: rgb(231, 188, 188);
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
  height: 4rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.container-p1 {
  font-size: 0.4rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  padding-bottom: 0.2rem;
}
.container-p2 {
  font-size: 0.3rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.35rem;
  letter-spacing: 0.01rem;
}
.details-left {
  padding: 0.3rem;
  padding-bottom: 1rem;
}
.caseA {
  font-size: 0.35rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 0.2rem;
}
.case-all {
  margin-bottom: 0.4rem;
}
.white {
  overflow: hidden;
  background: #ffffff;
}

.dataContent {
  line-height: 0.3rem;
  font-size: 0.27rem;
  letter-spacing: 0.01rem;
  word-wrap: break-word;
}

.dataContent >>> img {
  margin: 0.1rem 0;
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
  margin: 0.05rem 0;
  border: 0.015rem solid black;
}
.dataContent >>> tr {
 border: 0.015rem solid black;
}
.dataContent >>> td {
  border: 0.015rem solid black;
}
.dataContent >>> th {
 border: 0.015rem solid black;
}
</style>
