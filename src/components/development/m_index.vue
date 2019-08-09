<template>
  <div style="background:#F7F8FA;">
    <!-- <div style="height:1rem;"></div> -->
    <div class="deve-D">
      <div :style="backgroundheight" class="deve-left">
        <ul class="deve-left-ul">
          <li @click="moveTleave()" class="allDeve">
            <div class="allDeve-div">
              <div class="allDeve-div-left">
                <img :src="allDeveImg" alt />
                全部文档
              </div>
              <img class="allDeve-div-right" :src="allDeveImgL" alt />
            </div>
            <ul class="deve-left-list" :style="backgroundheight">
              <li v-for="(item,index) in headerList" :key="index" @click="changeTit(item)">
                <img class="deve-left-img" :src="item.icon" alt />
                <p class="deve-left-font">{{item.prodCname}}</p>
              </li>
            </ul>
          </li>
          <li class="chosedTit">
            <img class="deve-left-img1" :src="headerOne.icon" alt />
            <p style="font-weight: bold;" class="deve-left-font">{{headerOne.prodCname}}</p>
          </li>
          
          <li :key="index" v-for="(item,index) in productList" class="deve-left-li1">
            <p class="deve-left-li1-p" @click="deveTit(index,item.docClassId)">
              <span>{{item.docClassCname}}</span>
              <img v-if="item.tr" :src="bottomImg0" alt />
              <img v-if="!item.tr" :src="bottomImg1" alt />
            </p>
            <ol class="deve-left-ol" v-if="item.tr">
              <li
                class="olLi"
                @click="rightDetails(item1.docId,index1)"
                :key="index1"
                v-for="(item1,index1) in productList01"
              >{{item1.docCname}}</li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="deve-right">
        <div class="aboutDown-t">
          <p class="aboutDown-tp">{{docdetail.docCname}}</p>
          <div class="dataContent" v-html="docdetail.docDetail"></div>
        </div>
        <ul v-if="docdetailDown" class="aboutDown">
          <li>
            <p>附件下载</p>
          </li>
          <li v-for="(item,index) in docdetailDown" :key="index">
            <img class="aboutDownImg" :src="down" alt />
            <span @click="downUrl(item.url,item.name)">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'>
</script>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      showTr: false,
      backgroundheight: {
        height: ""
      },
      productTit: "",
      productList: "",
      productList01: "",
      docdetail: "",
      docdetailDown: "",
      headerList: "",
      headerOne: "",
      chosedTitImg: require("../../assets/img/allDeve.png"),
      allDeveImg: require("../../assets/img/allDeve.png"),
      allDeveImgL: require("../../assets/img/allDeveL.png"),
      three: require("../../assets/img/three03.png"),
      down: require("../../assets/img/down.png"),
      payLogo: require("../../assets/img/payLogo.png"),
      selectionD: true,
      bottomImg0: require("../../assets/img/bottom.png"),
      bottomImg1: require("../../assets/img/bootomT.png"),
      ds: [{ tr: true }, { tr: false }, { tr: false }]
    };
  },
  methods: {
    moveTleave() {
      if (this.showTr == false) {
        $(".deve-left-list").stop();
        $(".deve-left-list").slideDown();
        this.showTr = true;
      } else {
        $(".deve-left-list").stop();
        $(".deve-left-list").slideUp();
        this.showTr = false;
      }
    },
    deveTit(e, v) {
      if (this.productList[e].tr == true) {
        this.productList[e].tr = false;
        return;
      }
      var ds = this.productList;
      for (var i in ds) {
        this.productList[i].tr = false;
      }
      this.productList[e].tr = true;
      //获取列表
      //console..log(e);
      //console..log(this.productList);
      this.productList01 = "";
      this.getDoclist(v);
    },
    //获取列表
    getDoclist(e, nine) {
      // //console..log(e);
      this.$post(this.$api.api + "/gw/openplatform/doclist?docClassId="+e).then(res => {
        if (res.code == "0") {
          this.productList01 = res.data;
          // //console..log("列表", this.productList01);
          if (nine) {
            if (nine == "999") {
              this.rightDetails(res.data[0].docId, nine);
            }
          }
        }
      });
    },
    deveChosed(e) {
      //console..log(e);
      // this.style.color='red'
    },
    //文件下载
    downUrl(data, name) {
      let a = document.createElement("a");
      a.href = data;
      a.download = "filename.txt";
      a.click();
      this.$notify.info({
        title: "正在准备下载 " + name,
        message: "请稍后",
        position: "bottom-right"
      });
      return;
    },
    //头部点击
    changeTit(item) {
        $(".deve-left-list").slideUp();
      this.allList(item.prodId, "999");
      this.docdetailDown = "";
      this.docdetail = "";
      this.productList = "";
      this.productList01 = "";
      this.headerOne = item;
    },
    //文档详情
    rightDetails(e, index) {
      //console..log(e, index);
      this.$post(this.$api.api + "/gw/openplatform/docdetail?docInfoId="+e).then(res => {
        //console..log("详情", res);
        if (res.code == "0") {
          this.docdetail = res.data;
          if (this.docdetail.docDetail) {
            this.docdetail.docDetail = unescape(this.docdetail.docDetail);
          }
          ////console..log(res.data.annex);
          if (res.data.annex) {
            this.docdetailDown = JSON.parse(res.data.annex);
            //console..log(this.docdetailDown);
          } else {
            this.docdetailDown = "";
          }
        }
      });
      if (index !== "999") {
        $(".olLi").css("color", "#666666");
        $(".olLi")
          .eq(index)
          .css("color", "#62bd72");
      }
      if (index == "999") {
        this.productList[0].tr = true;
      }
    },
    //获取总栏目
    allList(id, nine) {
      this.$post(this.$api.api + "/gw/openplatform/list?prodId="+id).then(res => {
        // //console..log("左总栏目", res);
        if (res.code == "0") {
          for (var i in res.data) {
            res.data[i].tr = false;
          }
          res.data[0].tr = false;
          this.productList = res.data;
          if (nine) {
            if (nine == "999") {
              if (res.data.length > 0) {
                this.getDoclist(res.data[0].docClassId, nine);
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    //获取总栏目列表
    this.$post(this.$api.api + "/gw/productcenter/productList").then(res => {
      if (res.code == "0") {
        //console..log("0001栏目(产品)列表", res);
        this.headerList = res.data;
        this.headerOne = res.data[0];
        this.allList(res.data[0].prodId, "999");
      }
    });
    this.backgroundheight.height = document.body.clientHeight * 1.5 + "px";
  }
};
</script>
<style scoped>
.fixedTop {
  position: fixed;
  top: 0.8rem;
  left: 0;
  width: 100%;
}
.deve-D {
  width: 7.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f7f8fa;
  overflow: hidden;
}
.deve-left {
  width: 2rem;
  background-color: #ffffff;
  border: 0.01rem solid #e7e7e7;
  margin-right: 0.1rem;
  /* overflow: scroll; */
}
.deve-right {
  width: 5.4rem;
  padding: 0.2rem;
  /* height: 900px; */
  background-color: #ffffff;
}
.deve-left-tit {
  padding: 0.33rem 0 0.14rem 0.4rem;
  font-size: 0.25rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.deve-left-tit img {
  width: 0.2rem;
  height: 0.2rem;
  margin-right: 0.1rem;
}
.deve-left-ol li {
  cursor: pointer;
  height: 0.5rem;
  line-height: 0.4rem;
  padding-left: 0.5rem;
  border-top: 0.01rem solid #e7e7e7;
  background-color: #f7f8fa;
  font-size: 0.18rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.deve-left-ol li:hover {
  color: #62bd72 !important;
}
.deve-left-li1-p {
  cursor: pointer;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  border-top: 0.01rem solid #e7e7e7;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.deve-left-ul .deve-left-li1:first-child .deve-left-li1-p {
  border-top: none;
}
.deve-left-ul .deve-left-li1:last-child {
  border-bottom: 0.01rem solid #e7e7e7;
}
.deve-left-li1-p img {
  width: 0.17rem;
  margin-right: 0.2rem;
}
.deve-left-li1-p span {
  margin-left: 0.35rem;
  font-size: 0.19rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.deve-left-li1:hover .deve-left-li1-p {
  background-color: aliceblue;
}

.selectionD {
  color: #62bd72;
}
.aboutDown {
  /* background: pink; */
  margin-bottom: 0.5rem;
}
.aboutDown-t {
  margin-bottom: 0.5rem;
}
/* .dataContent table{
  border:1px solid black!important;
}
tr{
  border:1px solid black!important;
} */
.aboutDown p {
  font-size: 0.2rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin: 0.2rem 0;
}
.aboutDown-tp {
  font-size: 0.25rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin: 0.2rem 0;
}
.aboutDown li {
  font-size: 0.25rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.aboutDown span {
  cursor: pointer;
}
.aboutDown span:hover {
  color: #62bd72;
}
.aboutDownImg {
  cursor: pointer;
  width: 0.2rem;
  height: 0.2rem;
  margin: 0.05rem 0.1rem 0.05rem 0;
}
.bigTit {
  height: 0.9rem;
  /* width: 1200px; */
  margin: 0 auto 0.1rem;
  background: #ffffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  position: relative;
}
.triangle {
  width: 0.2rem;
}
/* .triangle:hover {
  transform-origin: center center;
  transform: rotate(180deg);
  transition: transform 2s;
} */
.bigDiv {
  height: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative; */
}

#bigDivimg1 {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
}
#bigDivimg2 {
  font-size: 0.28rem;
  margin: 0 0.1rem 0 0.2rem;
}
.dataContent {
  line-height: 0.25rem;
  font-size: 0.25rem;
  letter-spacing: 0.01rem;
}
.dataContent >>> img {
  margin: 0.1rem 0;
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
.dataContent >>> h2 {
  margin: 0.01rem 0;
}
.dataContent >>> table {
  width: 100% !important;
  margin: 0.05rem 0;
  border: 0.015rem solid black;
  font-size: 0.2rem !important;
}
.dataContent >>> tr {
  border: 0.015rem solid black;
  font-size: 0.2rem !important;
}
.dataContent >>> td {
  border: 0.015rem solid black;
  font-size: 0.2rem !important;
}
.dataContent >>> th {
  border: 0.015rem solid black;
  font-size: 0.2rem !important;
}
.allDeve {
  height: 0.72rem;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  position: relative;
}
.allDeve-div {
  font-size: 0.2rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 0.72rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.allDeve-div-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0.3rem;
}
.allDeve-div-left img {
  width: 0.24rem;
  margin-right: 0.1rem;
}
.allDeve-div-right {
  width: 0.2rem;
  margin: 0.04rem 0.2rem 0 0;
}
.deve-left-list {
  position: absolute;
  left: 0;
  top: 0.72rem;
  width: 100%;
  /* height: 300px; */
  background-color: #ffffff;
  /* overflow-x: hidden; */
  display: none;
}

.deve-left-list li {
  height: 0.4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 0.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}
.deve-left-img {
  width: 0.23rem;
  margin-right: 0.08rem;
}
.deve-left-img1 {
  width: 0.23rem;
  height: 0.23rem;
  margin-left: 0.29rem;
  margin-right: 0.08rem;
}
.deve-left-font {
  font-size: 0.15rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.chosedTit {
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
