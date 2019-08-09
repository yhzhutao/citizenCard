<template>
  <div id="backgroundheight" class="deve-Div">
    <div class="deve-D">
      <div :style="backgroundheight1" class="deve-left">
        <div class="deve-left-tit">
          <img :src="payLogo" alt>
          帮助中心
        </div>
        <ul class="deve-left-ul">
          <!-- 热门问题 -->
          <li class="deve-left-li1">
            <p class="deve-left-li1-p" @click="deveTit('a')">
              <span>热门问题</span>
            </p>
          </li>
          <li :key="index" v-for="(item,index) in helpcol" class="deve-left-li1">
            <p class="deve-left-li1-p" @click="deveTit(index,item.helpColId)">
              <span>{{item.helpColCname}}</span>
              <transition name="fade1">
                <img v-if="item.tr" :src="bottomImg0" alt>
                <img v-if="!item.tr" :src="bottomImg1" alt>
              </transition>
            </p>
            <ol class="deve-left-ol" v-if="item.tr">
              <li
                @click="helpcolDetails(item.helpDocId,index)"
                :key="index"
                v-for="(item,index) in helpcolList"
              >{{item.helpDocCname}}</li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="deve-right">
        <div id="twoDiv">
          <component :questionId="questionId" :is="componentId"></component>
        </div>
        <!-- <quDetail></quDetail> -->
        <div class="questions" v-if="questionsTr">
          <ol>
            <li
              :key="index"
              v-for="(item,index) in questionsData"
              @click="detailD(item.questionId)"
            >
              <p>{{item.questionCname}}</p>
            </li>
          </ol>
          <div class="pages">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <div v-if="questionsTr1">
          <div>
            <p class="helpDeatilsP">{{helpDeatils.helpDocCname}}</p>
            <div class="dataContent" v-html="helpDeatils.helpDocDetail"></div>
          </div>
        </div>
        <div style="height:100px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import quDetail from "./questionDetail";
export default {
  data() {
    return {
      height: "",
      clientHeight: "",
      backgroundheight: {
        height: ""
      },
      backgroundheight1: {
        height: ""
      },
      questionId: "",
      total: 100, //总条数
      currentPage3: 1,
      questionsData: "",
      down: require("../../assets/img/down.png"),
      payLogo: require("../../assets/img/helpCenter.png"),
      selectionD: true,
      bottomImg0: require("../../assets/img/bottom.png"),
      bottomImg1: require("../../assets/img/bootomT.png"),
      ds: [{ tr: false }, { tr: false }, { tr: false }],
      questions: true,
      componentId: "",
      questionsTr: true,
      questionsTr1: false,
      helpcol: "", //帮助栏目
      helpcolList: "", //文档列表
      helpDeatils: "" //文档详情
    };
  },
  components: {
    quDetail
  },
  methods: {
    message(e) {
      // alert(e + "00000000000000000000");
      ////console..log(e);
    },
    handleSizeChange(val) {
      ////console..log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      ////console..log(val);
      this.getQuestion(val);
    },
    deveTit(e, id) {
      if (e == "a") {
        this.componentId = "";
        this.questionsTr = true;
        this.questionsTr1 = false;
        document
          .getElementsByClassName("deve-left-li1-p")[0]
          .classList.add("leftTr");
        for (var i in this.helpcol) {
          this.helpcol[i].tr = false;
        }
        for (var i in this.helpcolList) {
          this.helpcolList[i].tr = false;
        }
      } else {
        this.helpdocK(id);
        document
          .getElementsByClassName("deve-left-li1-p")[0]
          .classList.remove("leftTr");
        if (this.helpcol) {
          if (this.helpcol[e].tr == true) {
            this.helpcol[e].tr = false;
          } else {
            var ds = this.helpcol;
            for (var i in ds) {
              this.helpcol[i].tr = false;
            }
            this.helpcol[e].tr = true;
          }
        }
      }
    },
    detailD(e) {
      if (e) {
        this.questionId = e;
      }
      this.componentId = quDetail;

      this.questionsTr = false;
      this.questionsTr1 = false;
    },
    deveChosed(e) {
      ////console..log(e);
      // this.style.color='red'
    },
    //文档详情
    helpcolDetails(e, index) {
      this.componentId = "";
      this.questionsTr = false;
      this.questionsTr1 = true;
      $(".deve-left-ol")
        .find("li")
        .eq(index)
        .css("color", "#62bd72");
      $(".deve-left-ol")
        .find("li")
        .eq(index)
        .siblings()
        .css("color", "#666666");
      this.$post(this.$api.api + "/gw/helpdoc/docDetail?helpDocId="+e).then(res => {
        // //console..log("文档详情", res);
        if (res.helpDocDetail) {
          res.helpDocDetail = unescape(res.helpDocDetail);
          // .replace(
          //   /<\/table>/g,
          //   "</table><br>"
          // );
        }
        this.helpDeatils = res;
      });
    },
    //文档列表
    helpdocK(e) {
      // //console..log(e);
      this.helpcolList = "";
      this.$post(this.$api.api + "/gw/helpdoc/helpdoc?helpColId="+e).then(res => {
        //  //console..log("文档列表", res);
        for (var i in res) {
          res[i].tr = false;
        }
        this.helpcolList = res;
      });
    },
    //获取热门问题
    getQuestion(p) {
      this.$post(this.$api.api + "/gw/helpdoc/question?page="+p+'&limit=10').then(res => {
        console.log("问题列表", res.total);
        this.total = parseInt(res.total);
        this.questionsData = res.records;
      });
    },
    changeFixed(clientHeight) {
      // alert(clientHeight);
    }
  },
  mounted() {
    var that = this;
    //左侧栏目
    this.$post(this.$api.api + "/gw/helpdoc/helpcol").then(res => {
      // console.log("帮助栏目", res);
      for (var i in res) {
        res[i].tr = false;
      }
      this.helpcol = res;
      this.helpdocK(res[0].helpColId);
    });
    //热门问题列表
    this.getQuestion(1);
    document
      .getElementsByClassName("deve-left-li1-p")[0]
      .classList.add("leftTr");
    this.backgroundheight1.height = document.body.clientHeight *1.5 + "px";
  },
  watch: {
    clientHeight() {
      //如果clientHeight 发生改变，这个函数就会运行
      ////console..log(this.clientHeight);
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>
<style scoped>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade1-enter-active,
.fade1-leave-active {
  transition: opacity 0.3s;
}
.fade1-enter,
.fade1-leave-active {
  opacity: 0;
} */
.deve-Div {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  background-color: #f7f8fa;
}
.leftTr {
  background-color: aliceblue !important;
}
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
  /* height: 900px; */
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  margin-right: 10px;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: rgba(102, 102, 102, 1);
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
.aboutDown p {
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
.aboutDown img {
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 5px 10px 5px 0;
}
.questions {
  /* height: 600px; */
  /* position: relative; */
}
.questions li {
  height: 50px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 50px;
  padding-left: 5px;
  border-bottom: 1px solid #e7e7e7;
}
.questions li:hover p {
  cursor: pointer;
  color: #62bd72;
}

.helpDeatilsP {
  font-size: 24px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}
.pages {
  text-align: center;
  width: 100%;
  margin: 35px 0 0px;
  /* position: absolute;
  bottom: 15px;
  left: 0; */
}
.color {
  color: #62bd72 !important;
}
.dataContent {
  line-height: 29px;
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
