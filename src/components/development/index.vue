<template>
  <div style="background:#F7F8FA;padding:100px 0;">
    <div class="deve-D">
      <div :style="backgroundheight" class="deve-left">
        <ul class="deve-left-ul">
          <li @mouseleave="moveTleave()" @mouseenter="moveTenter()" class="allDeve">
            <div class="allDeve-div">
              <div class="allDeve-div-left">
                <!--<img :src="allDeveImg" alt />-->
                <!--全部文档-->
                <img :src="headerOne.icon||allDeveImg" alt/>
                {{headerOne.prodCname||'全部文档'}}
                <!--<img class="deve-left-img1" :src="headerOne.icon" alt />-->
                <!--<p style="font-weight: bold;" class="deve-left-font">{{headerOne.prodCname}}</p>-->
              </div>
              <img class="allDeve-div-right" :src="allDeveImgL" alt/>
            </div>
            <ul class="deve-left-list" :style="backgroundheight">
              <li v-for="(item,index) in headerList" :key="index" @click="changeTit(item)">
                <img class="deve-left-img" :src="item.icon" alt/>
                <p class="deve-left-font">{{item.prodCname}}</p>
              </li>
            </ul>
          </li>
          <!--<li class="chosedTit">-->
          <!--<img class="deve-left-img1" :src="headerOne.icon" alt />-->
          <!--<p style="font-weight: bold;" class="deve-left-font">{{headerOne.prodCname}}</p>-->
          <!--</li>-->
          <li :key="index" v-for="(item,index) in productList" class="deve-left-li1">
            <p class="deve-left-li1-p" @click="deveTit(index,item.docClassId,item.docClassCname)">
              <span>{{item.docClassCname}}</span>
              <img v-if="item.tr" :src="bottomImg0" alt/>
              <img v-if="!item.tr" :src="bottomImg1" alt/>
            </p>
            <ol class="deve-left-ol" v-if="item.tr">
              <li
                class="olLi"
                @click="rightDetails(item1.docId,index1,item1.docCname)"
                :key="index1"
                v-for="(item1,index1) in productList01"
              >{{item1.docCname}}
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="deve-right">
        <!--<p>{{navFirst}}/{{navSecond}}/{{navThird}}</p>-->
        <p>
          <span v-if="navFirst">{{navFirst}}/</span>
          <span v-if="navSecond">{{navSecond}}/</span>
          <span>{{navThird}}</span>
        </p>
        <div class="aboutDown-t">
          <p class="aboutDown-tp">{{docdetail.docCname}}</p>
          <div class="dataContent" v-html="docdetail.docDetail"></div>
        </div>
        <ul v-if="docdetailDown" class="aboutDown">
          <li>
            <p>附件下载</p>
          </li>
          <li v-for="(item,index) in docdetailDown" :key="index">
            <img class="aboutDownImg" :src="down" alt/>
            <span @click="downUrl(item.url,item.name)">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data () {
    return {
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
      ds: [{tr: true}, {tr: false}, {tr: false}],
      navFirst: '',// 一级导航条文字
      navSecond: '',// 二级导航条文字
      navThird: ''// 三级导航条文字
    };
  },
  methods: {
    moveTleave () {
      $(".deve-left-list").stop();
      $(".deve-left-list").slideUp();
    },
    moveTenter () {
      $(".deve-left-list").stop();
      $(".deve-left-list").slideDown();
    },
    deveTit (e, v, docClassCname) {
      this.navThird = ''
      this.navSecond = docClassCname
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
    getDoclist (e, nine) {
      // //console..log(e);
      this.$post(this.$api.api + "/gw/openplatform/doclist?docClassId=" + e).then(res => {
        if (res.code == "0") {
          this.productList01 = res.data;
          // //console..log("列表", this.productList01);
          console.log(res)
          if(res.data[0]){
            this.navThird = res.data[0].docCname
            // this.navThird = '123'
          }
          // console.log(this.navThird)
          if (nine) {
            if (nine == "999"&&res.data[0]) {
              this.rightDetails(res.data[0].docId, nine,res.data[0].docCname);
            }
          }
        }
      });
    },
    deveChosed (e) {
      //console..log(e);
      // this.style.color='red'
    },
    //文件下载
    downUrl (data, name) {
      let a = document.createElement("a");
      a.href = data;
      // a.download = "filename.txt";
      a.click();
      this.$notify.info({
        title: "正在准备下载 " + name,
        message: "请稍后",
        position: "bottom-right"
      });
      return;
    },
    //头部点击
    changeTit (item) {
      $(".deve-left-list").slideUp();
      this.allList(item.prodId, "999");
      this.docdetailDown = "";
      this.docdetail = "";
      this.productList = "";
      this.productList01 = "";
      this.headerOne = item;
      this.navSecond = ''
      this.navThird = ''
      this.navFirst = item.prodCname //设置一级nav 的name
    },
    //文档详情
    rightDetails (e, index,docCname) {
      this.navThird = docCname
      this.$post(this.$api.api + "/gw/openplatform/docdetail?docInfoId=" + e).then(res => {
        //console..log("详情", res);
        if (res.code == "0") {
          this.docdetail = res.data;
          if (this.docdetail.docDetail) {
            this.docdetail.docDetail = unescape(this.docdetail.docDetail);
          }
          if (res.data.annex) {
            this.docdetailDown = JSON.parse(res.data.annex);
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
    allList (id, nine) {
      this.$post(this.$api.api + "/gw/openplatform/list?prodId=" + id).then(res => {
        // //console..log("左总栏目", res);
        if (res.code == "0") {
          for (var i in res.data) {
            res.data[i].tr = false;
          }
          res.data[0].tr = true;
          this.productList = res.data;
          this.navSecond = this.productList.filter((item)=>(item.tr))[0].docClassCname
          if (nine) {
            if (nine == "999") {
              if (res.data.length > 0) {
                console.log(111111111111112)
                this.getDoclist(res.data[0].docClassId, nine);
              }
            }
          }
        }
      });
    }
  },
  mounted () {
    //获取总栏目列表
    this.$post(this.$api.api + "/gw/productcenter/productList").then(res => {
      if (res.code == "0") {
        //console..log("0001栏目(产品)列表", res);
        this.headerList = res.data;
        this.headerOne = res.data[0];
        // this.navThird = 'ppp'
        // this.navFirst = 'aaa'
        console.log(this.navThird)
        this.allList(res.data[0].prodId, "999");
        this.navFirst = res.data[0].prodCname
      }
    });
    this.backgroundheight.height = document.body.clientHeight * 2 + "px";
  }
};
</script>
<style scoped>
  .deve-D {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #f7f8fa;
  }

  .deve-left {
    width: 290px;
    background-color: #ffffff;
    border: 1px solid #e7e7e7;
    margin-right: 10px;
    /* overflow: scroll; */
  }

  .deve-right {
    width: 895px;
    padding: 30px;
    /* height: 900px; */
    background-color: #ffffff;
  }

  .deve-left-tit {
    padding: 33px 0 14px 40px;
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .deve-left-tit img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .deve-left-ol li {
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    padding-left: 70px;
    border-top: 1px solid #e7e7e7;
    background-color: #f7f8fa;
    font-size: 14px;
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
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #e7e7e7;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .deve-left-ul .deve-left-li1:first-child .deve-left-li1-p {
    border-top: none;
  }

  .deve-left-ul .deve-left-li1:last-child {
    border-bottom: 1px solid #e7e7e7;
  }

  .deve-left-li1-p img {
    width: 17px;
    margin-right: 21px;
  }

  .deve-left-li1-p span {
    margin-left: 70px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .deve-left-ol li:hover p {
    color: #62bd72;
  }

  .deve-left-li1:hover .deve-left-li1-p {
    background-color: aliceblue;
  }

  .selectionD {
    color: #62bd72;
  }

  .aboutDown {
    /* background: pink; */
    margin-bottom: 50px;
  }

  .aboutDown-t {
    margin-bottom: 50px;
  }

  /* .dataContent table{
    border:1px solid black!important;
  }
  tr{
    border:1px solid black!important;
  } */
  .aboutDown p {
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin: 20px 0;
  }

  .aboutDown-tp {
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin: 20px 0;
  }

  .aboutDown li {
    font-size: 14px;
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
    width: 20px;
    height: 20px;
    margin: 5px 10px 5px 0;
  }

  .bigTit {
    height: 90px;
    width: 1200px;
    margin: 0 auto 10px;
    background: #ffffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    position: relative;
  }

  .triangle {
    width: 19px;
  }

  /* .triangle:hover {
    transform-origin: center center;
    transform: rotate(180deg);
    transition: transform 2s;
  } */
  .bigDiv {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: relative; */
  }

  #bigDivimg1 {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  #bigDivimg2 {
    margin: 0 10px 0 20px;
  }

  .dataContent {
    line-height: 29px;
    font-size: 18px;
    letter-spacing: 0.7px;
  }

  .dataContent >>> * {
    word-break: break-all;
  }

  .dataContent >>> pre {
    overflow: scroll;
    overflow-y: hidden;
    background: #eceaea;
  }

  .dataContent img {
    margin: 10px 0;
  }

  .dataContent >>> table {
    margin: 10px 0;
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

  .allDeve {
    height: 50px;
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
    position: relative;
  }

  .allDeve-div {
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .allDeve-div-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 70px;
  }

  .allDeve-div-left img {
    width: 24px;
    margin-right: 10px;
  }

  .allDeve-div-right {
    width: 20px;
    margin: 4px 21px 0 0;
  }

  .deve-left-list {
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    /* height: 300px; */
    background-color: #ffffff;
    /* overflow-x: hidden; */
    display: none;
  }

  .deve-left-list li {
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 0 70px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }

  .deve-left-img {
    width: 23px;
    margin-right: 8px;
  }

  .deve-left-img1 {
    width: 23px;
    height: 23px;
    margin-left: 29px;
    margin-right: 8px;
  }

  .deve-left-font {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .chosedTit {
    height: 50px;
    line-height: 50px;
    padding-left: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

  }
</style>
