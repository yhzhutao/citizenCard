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
                <img :src="item.logoType" alt />
              </div>
              <p></p>
              <span>{{item.name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script src='../../static/js/rem.js'>
</script>
<script>
export default {
  data() {
    return {
      backgroundheight: {
        height: ""
      },
      solutionsD: ""
    };
  },
  methods: {
    goDetail(e) {
      this.$store.commit("changeSolutionId", e);
      this.$router.push({
        name: "m_solutionDetail",
        params: {
          solutionId: e
        }
      });
    }
  },
  mounted() {
    var that = this;
    this.backgroundheight.height = document.body.clientHeight * 1.1 + "px";
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
        var Lh = Math.ceil(res.data.length / 2) * 400;
        that.solutionsD = res.data;
        let scrollTop = document.body.clientHeight;
        if (Lh > scrollTop) {
          this.backgroundheight.height = Lh/100 + "rem";
        } else {
          this.backgroundheight.height = scrollTop * 1.1/100 + "rem";
        }
      } else {
        // ////console..log(res.msg);
      }
    });
  }
};
</script>

<style scoped>
.solution {
  /* width: s; */
  /* height:800px; */
  margin:0 0.5rem 0.3rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.solution li {
  margin-top: 0.55rem;
  width: 3rem;
  height: 3rem;
  border-radius: 0.06rem;
  background: no-repeat center top;
  background-size: 100% 100%;
  overflow: hidden;
}

.solutionType {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.solutionType p {
  width: 0.5rem;
  height: 0.1rem;
  margin: 0.2rem auto 0.35rem;
  border-radius: 0.1rem;
  background: rgba(255, 255, 255, 1);
}
.solutionTypeImg {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  position: relative;
}
.solutionTypeImg img {
  /* border-radius: 50%; */
  width: 0.5rem;
  position: absolute;
  left: 0.25rem;
  top: 0.25rem;
  background: rgba(255, 255, 255, 1);
}
.solutionType span {
  font-size: 0.4rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.solution li .solutionBack {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
