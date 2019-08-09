<template>
  <div id="bodySolution">
    <div id="backgroundheight" :style="backgroundheight">
      <ul class="solution">
        <li
          @click="goDetail(item.solutionId)"
          v-for="(item,index) in solutionsD"
          :key="index"
          :style="item.backgroundDiv3"
        >
          <div class="solutionBack">
            <div class="solutionType">
              <div class="solutionTypeImg">
                <img :src="item.logoType" alt>
              </div>
              <p></p>
              <span>{{item.name}}</span>
            </div>
            <div class="solutionContent">
              <p>{{item.name}}</p>
              <p>{{item.content}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--<img class="quan05" :src="quan02" alt />-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      backgroundheight: {
        height: ""
      },
      solutionsD: "",
      quan02: require("../../assets/img/aboutUs/quan02.png")
    };
  },
  methods: {
    goDetail(e) {
      this.$store.commit('changeSolutionId',e)
      this.$router.push({
        name: "solutionDetail",
        params: {
          solutionId: e
        }
      });
    }
  },
  mounted() {
    var that = this;
    this.backgroundheight.height = document.body.clientHeight*1.2+'px';
    //热门解决方案
    this.$post(this.$api.api + "/gw/solution/list").then(res => {
      //console..log("解决方案列表", res);
      if (res.code == "0") {
        for (var i in res.data) {
          res.data[i].logoType = res.data[i].icon;
          res.data[i].backgroundDiv3 = {
            backgroundImage: "url(" + res.data[i].backImg + ")"
          };
          res.data[i].name = res.data[i].solutionCname;
          res.data[i].content = res.data[i].solutionTitle;
        }
        //console..log(res.data);
        var Lh = Math.ceil(res.data.length / 4) * 400;
        that.solutionsD = res.data;
        let scrollTop = document.body.clientHeight;
        if (Lh > scrollTop) {
          this.backgroundheight.height = Lh + "px";
        } else {
          this.backgroundheight.height = scrollTop * 1.1 + "px";
        }
      } else {
        // ////console..log(res.msg);
      }
    });
  }
};
</script>

<style scoped>
  #bodySolution{
    background-color: rgb(247, 248, 250);
  }
.solution {
  width: 1280px;
  /* height:800px; */
  margin: 80px auto;
  /* background: pink; */
  overflow: hidden;
}
.solution li {
  background: red;
  margin: 40px;
  float: left;
  width: 240px;
  height: 240px;
  /* background:rgba(0,0,0,1); */
  border-radius: 6px;
  /* opacity: 0.5017; */
  background: no-repeat center top;
  background-size: 100% 100%;
  overflow: hidden;
}

.solutionType {
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}
.solutionType p {
  width: 20px;
  height: 6px;
  margin: 10px auto;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
}
.solutionTypeImg{
  width: 60px;
  height: 60px;
  margin-top: 70px;
  border-radius: 50%;
   background: rgba(255, 255, 255, 1);
  position: relative;
}
.solutionTypeImg img {
  /* border-radius: 50%; */
  width:30px;
  position: absolute;
  left: 15px;
  top:15px;
  background: rgba(255, 255, 255, 1);
}
.solutionType span {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 33px;
}
.solutionContent {
  width: 100%;
  height: 100%;
  text-align: center;
  display: none;
}
.solutionContent p:first-child {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
  padding-top: 30px;
}
.solutionContent p:last-child {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  margin: 10px;
}
.solution li .solutionBack {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.solution li:hover .solutionContent {
  display: inline;
}
.solution li:hover .solutionType {
  display: none;
}
.solution li:hover .solutionBack {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
