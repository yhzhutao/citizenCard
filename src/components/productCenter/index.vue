<template>
  <div id="target" class="warp">
    <div class="product-swiper" :style="productDiv">
      <el-carousel height="400px">
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
    <div class="container">
      <div v-for="(item,index) in indexlist" :key="index" class="pro-list">
        <p class="pro-tit">{{item.columnCname}}</p>
        <ol class="pro-d">
          <!-- <li> -->
          <li
            @click="goDetail(item1.prodId,index,index1)"
            v-for="(item1,index1) in item.columnProduct"
            :key="index1"
          >
            <img :src="item1.icon">
            <p class="p-p"></p>
            <span class="pro-name">{{item1.prodCname}}</span>
            <p class="pro-con">{{item1.prodTitle}}</p>
          </li>
        </ol>
      </div>
    </div>
    <div v-if="hideTr" style="height:500px"></div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      hideTr:true,
      hotprod: "", //轮播
      indexlist: "", //列表
      productDiv: {
        backgroundImage: "url(" + require("../../assets/img/c2.png") + ")"
      },
      backgroundDiv: {
        backgroundImage:"url(" + require("../../assets/img/c2.png") + ")"
      },
    };
  },
  methods: {
    goDetail(e, index, index1) {
      this.$router.push({
        name: "productDetail",
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
      this.hideTr = false;
    });
    var target = document.getElementById("target");
    target.scrollIntoView();
  }
};
</script>
<style scoped>
  #target{
    background-color: rgb(247, 248, 250);
  }
.warp {
  padding-bottom: 200px;
  background-color: #ffffff;
}
.product-swiper {
  width: 100%;
  height: 400px;
  margin-top: 80px;
  /* background: rgba(14, 13, 13, 0.4); */
  background: no-repeat center center;
  background-size: contain 100%;
}
.product-item {
  width: 100%;
  height: 100%;
  background: no-repeat center center;
  background-size: contain 100%;
}
.product-div {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.product-div p:first-child {
  font-size: 46px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 12px;
}
.product-div p:last-child {
  width: 550px;
  font-size: 25px;
  font-family: PingFangSC-Regular;
  line-height: 40px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 2px;
}
@media all and (max-width: 1200px) {
  .product-swiper {
    width: 1200px;
  }
}
.pro-list {
  /* height: 7000px; */
  /* background-color: #62BD72; */
  overflow: hidden;
}
.pro-tit {
  font-size: 31px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 44px;
  letter-spacing: 1px;
  margin: 60px 0 30px;
}
.pro-d {
  background-color: aqua;
}
.pro-d li {
  width: 256px;
  height: 316px;
  /* background: rebeccapurple; */
  float: left;
  margin: 1px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 50px;
  margin-bottom: 22px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  cursor: pointer;
}
.pro-d li:hover {
  border: 1px solid #62BD72;
   box-shadow:#e5e5e5 0 0 2px;
}
.pro-d li:nth-child(4n) {
  /* background: greenyellow; */
  margin-right: 0;
}
.pro-d li img {
  width: 100px;
}
.p-p {
  width: 30px;
  height: 7px;
  background-color: #62BD72;
  border-radius: 10px;
  margin: 20px 0;
}
.pro-name {
  font-size: 18px;
  font-weight:400;
  color: #333333;
}
.pro-con {
  font-size: 14px;
  /* font-weight: 500; */
  color: #666666;
  text-align: center;
  margin: 17px auto 0;
  width: 226px;
  line-height: 17px;
  letter-spacing: 1px;
}
</style>
