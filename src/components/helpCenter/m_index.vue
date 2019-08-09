<template>
  <div id="backgroundheight" class="deve-Div">
    <div class="deve-D">
      <div :style="backgroundheight1" class="deve-left">
        <div class="deve-left-tit">
          <img :src="payLogo" alt />
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
                <img v-if="item.tr" :src="bottomImg0" alt />
                <img v-if="!item.tr" :src="bottomImg1" alt />
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
        <div style="height:1rem;"></div>
      </div>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>
<script>
import $ from "jquery";
import quDetail from "./m_questionDetail";
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
        // console.log("文档列表", res);
        for (var i in res) {
          res[i].tr = false;
        }
        this.helpcolList = res;
      });
    },
    //获取热门问题
    getQuestion(p) {
       this.$post(this.$api.api + "/gw/helpdoc/question?page="+p+'&limit=10').then(res => {
        ////console..log("问题列表", res.total);
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
      // //console..log("帮助栏目", res);
      for (var i in res) {
        res[i].tr = false;
      }
      this.helpcol = res;
      this.helpdocK(res[0].helpDocId);
    });
    //热门问题列表
    this.getQuestion(1);
    document
      .getElementsByClassName("deve-left-li1-p")[0]
      .classList.add("leftTr");
    this.backgroundheight1.height = document.body.clientHeight * 1.5 + "px";
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
.deve-Div {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
}
.leftTr {
  background-color: aliceblue !important;
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
  width: 1.8rem;
  /* height: 900px; */
  background-color: #ffffff;
  border: 0.01rem solid #e7e7e7;
  margin-right: 0.1rem;
}
.deve-right {
  width: 5.6rem;
  padding: 0.3rem;
  /* height: 900px; */
  background-color: #ffffff;
}
.deve-left-tit {
  padding: 0.2rem 0;
  font-size: 0.23rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.deve-left-tit img {
  width: 0.28rem;
  height: 0.28rem;
  margin: 0 0.1rem 0 0.3rem;
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

.selectionD {
  color: #62bd72;
}

.questions {
  /* height: 600px; */
  /* position: relative; */
}
.questions li {
  height: 0.6rem;
  font-size: 0.2rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.6rem;
  padding-left: 0.1rem;
  border-bottom: 0.01rem solid #e7e7e7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.questions li:hover p {
  cursor: pointer;
  color: #62bd72;
}

.helpDeatilsP {
  font-size: 0.3rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 0.2rem;
}
.pages {
  text-align: center;
  width: 100%;
  margin: 0.5rem 0 0px;
  font-size: 0.2rem !important;
}
.color {
  color: #62bd72 !important;
}
.dataContent {
  line-height: 0.3rem;
  letter-spacing: 0.01rem;
  word-wrap: break-word;
}
.dataContent p {
  /* margin: 10px 0; */
}

.dataContent >>> img {
  margin: 0.1rem 0;
  width: 100% !important;
}
.dataContent >>> * {
  word-break: break-all;
}
.dataContent >>> p {
  font-size: 0.2rem !important;
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
