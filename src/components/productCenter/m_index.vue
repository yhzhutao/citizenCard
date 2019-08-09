<template>
  <div id="target" class="warp">
    <div class="product-swiper" :style="productDiv">
      <el-carousel arrow="always" height="4rem">
        <el-carousel-item v-for="(item,index) in hotprod" :key="index">
          <div class="product-item" :style="item.backgroundDiv">
            <div style="background:rgba(0,0,0,0.2);height:100%;">
              <div class="product-div">
                <p>{{item.prodCname}}</p>
                <p>{{item.prodTitle}}</p>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="height:0.3rem;"></div>
    <div class>
      <div v-for="(item,index) in indexlist" :key="index" class="pro-list">
        <p class="pro-tit">{{item.columnCname}}</p>
        <ol class="pro-d">
          <li
            @click="goDetail(item1.prodId,index,index1)"
            v-for="(item1,index1) in item.columnProduct"
            :key="index1"
          >
            <img :src="item1.icon" />
            <p class="p-p"></p>
            <span class="pro-name">{{item1.prodCname}}</span>
            <!-- {{item1.prodTitle}} -->
            <p class="pro-con"></p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      hotprod: "", //轮播
      indexlist: "", //列表
      productDiv: {
        backgroundImage: "url(" + require("../../assets/img/c2.png") + ")"
      },
      backgroundDiv: {
        backgroundImage: "url(" + require("../../assets/img/c2.png") + ")"
      }
    };
  },
  methods: {
    goDetail(e, index, index1) {
      this.$router.push({
        name: "m_proDetails",
        params: { id: e, index: index, index1: index1 }
      });
    },
    handleScroll(id) {
      var that = this;
      setTimeout(function() {
        for (var i in that.indexlist) {
          if (that.indexlist[i].columnId == id) {
            $("html,body").animate(
              {
                scrollTop:
                  $(".pro-list")
                    .eq(i)
                    .offset().top -
                  50 +
                  "px"
              },
              200
            );
          }
        }
      }, 200);
    }
  },
  mounted() {
    //热门产品(顶部)
    this.$post(this.$api.api + "/gw/productcenter/hotprod").then(res => {
      if (res.code == "0") {
        var data = res.data.hotProds;
        for (var i in data) {
          data[i].backgroundDiv = {
            backgroundImage: "url(" + data[i].hotProdImg + ")"
          };
        }
        this.hotprod = data;
        //////console..log("热门产品", this.hotprod);
      }
    });
    //服务类型
    this.$post(this.$api.api + "/gw/productcenter/indexlist").then(res => {
      if (res.code == "0") {
        //////console..log("服务类型", res);
        //{{item.columnId}}
        this.indexlist = res.data.prods;
        if (this.$route.params.columnId) {
          this.handleScroll(this.$route.params.columnId);
        }
      }
    });
    var target = document.getElementById("target");
    target.scrollIntoView();
    $("button").css({
      width: "0.6rem",
      height: "0.6rem",
      "margin-left": "-0.3rem",
      "margin-right": "-0.3rem"
    });
    $(".el-carousel__arrow i ").css("font-size", "0.4rem");
  }
};
</script>
<style scoped>
.warp {
  background-color: #ffffff;
}
.product-swiper {
  width: 7.5rem;
  height: 4rem;
  overflow: hidden;
  /* background: rgba(14, 13, 13, 0.4); */
  background: no-repeat center center;
  background-size: contain 100%;
}
.product-item {
  width: 100%;
  height: 100%;
  background: no-repeat center center;
  background-size: auto 100%;
}
.product-div {
  /* width: 1200px; */
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.product-div p:first-child {
  font-size: 0.35rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  margin: 0 0.6rem 0.1rem 0.6rem;
}
.product-div p:last-child {
  font-size: 0.25rem;
  font-family: PingFangSC-Regular;
  line-height: 0.4rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 0.01rem;
  margin: 0 0.6rem;
}

.pro-list {
  /* height: 7000px; */
  /* background-color: #62BD72; */
  overflow: hidden;
  margin: 0 0.3rem;
}
.pro-tit {
  font-size: 0.35rem;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 0.4rem;
  letter-spacing: 0.01rem;
  margin: 0.1rem 0 0.3rem 0;
  padding: 0 0 0.3rem 0;
  border-bottom: 0.01rem solid #e5e5e5;
}
.pro-d {
  background-color: aqua;
}
.pro-d li {
  width: 2rem;
  height: 2.2rem;
  float: left;
  border-radius: 0.08rem;
  margin-right: 0.4rem;
  margin-bottom: 0.3rem;
  border: 0.01rem solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.pro-d li:hover {
  border: 1px solid #62bd72;
  box-shadow: #e5e5e5 0 0 2px;
}
.pro-d li:nth-child(3n) {
  /* background: greenyellow; */
  margin-right: 0;
}
.pro-d li img {
  width: 0.7rem;
  margin-top: 0.1rem;
}
.p-p {
  width: 0.4rem;
  height: 0.1rem;
  background-color: #62bd72;
  border-radius: 0.1rem;
  margin: 0.1rem 0 0.15rem;
}
.pro-name {
  font-size: 0.3rem;
  font-weight: 400;
  color: #333333;
  text-align: center;
}
.pro-con {
  font-size: 14px;
  /* font-weight: 500; */
  color: #666666;
  text-align: center;
  margin: 17px auto 0;
  width: 2.2rem;
  line-height: 17px;
  letter-spacing: 1px;
}
</style>
