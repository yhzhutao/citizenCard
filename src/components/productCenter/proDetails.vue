<template>
  <div class="blue">
    <div id="target" class="deve-D">
      <div :style="backgroundheight1" class="deve-left">
        <!-- <div class="deve-left-tit">
        <img :src="payLogo" alt>
        快捷支付
        </div>-->
        <ul class="deve-left-ul">
          <li v-for="(item,index) in indexlist" :key="index" class="deve-left-li1">
            <div class="deve-left-li1-p" @click="deveTit(index)">
              <p>
                <img :src="payLogo" alt />
                {{item.columnCname}}
              </p>
              <transition name="fade1">
                <img v-if="item.tr" :src="bottomImg0" alt />
                <img v-if="!item.tr" :src="bottomImg1" alt />
              </transition>
            </div>
            <div></div>
            <ol class="deve-left-ol" v-if="item.tr">
              <li
                v-for="(item1,index1) in item.columnProduct"
                :key="index1"
                @click="deveChosed(item1.prodId,index1)"
              >
                <p>{{item1.prodCname}}</p>
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="deve-right">
        <!-- 显示 -->
        <div class="deve-right-mao">
          <el-steps space="30px" direction="vertical" :active="active">
            <el-step v-for="(item,index) in mao" :key="index" class="el-step0" :title="item.name"></el-step>
          </el-steps>
        </div>
        <!-- 隐藏 -->
        <ul class="deve-right-meng">
          <li @click="toCheck(index,'9999')" v-for="(item,index) in mao" :key="index">{{item.name}}</li>
        </ul>
        <ul class="aboutDown">
          <!-- <li class="mao01" v-for="(item,index) in mao" :key="index">
            <p class="maoTit">love{{item.name}}</p>
            <div class="maoCon"> </div>
          </li>-->
          <li class="mao01">
            <p class="maoTit">{{productDetail.prodCname}}</p>
            <div class="maoCon" v-html="productDetail.prodTitle"></div>
          </li>
          <li class="mao01">
            <p class="maoTit">使用案例</p>
            <div class="maoCon" v-html="productDetail.prodDetail"></div>
          </li>
          <li class="mao01">
            <p class="maoTit">开通流程</p>
            <div class="maoCon" v-html="productDetail.process"></div>
          </li>
          <li class="mao01">
            <p class="maoTit">所需材料</p>
            <div class="maoCon" v-html="productDetail.material"></div>
          </li>
          <li class="mao01" v-if="tableDataName">
            <p class="maoTit">使用费率</p>
            <div class="maoCon">
              <div class="table">
                <el-table :border="boders" :data="tableData" style="width: 100%">
                  <el-table-column align="center" prop="date" label="服务名称"></el-table-column>
                  <el-table-column align="center" prop="name" label="费率"></el-table-column>
                  <el-table-column align="center" prop="address" label="服务期限"></el-table-column>
                </el-table>
              </div>
              <div class="feeDetail" v-html="productDetail.feeDetail"></div>
            </div>
          </li>
          <li class="mao02">
            <button @click="apply()" v-if="applys" class="apply">{{show}}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      tableDataName: false,
      csjg: "",
      applys: true,
      show: "申请产品",
      boders: true,
      tableData: [
        {
          date: "",
          name: "",
          address: ""
        }
      ],
      backgroundheight1: {
        height: ""
      },
      indexlist: "",
      scroll: "",
      active: 0,
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ],
      productDetail: "",
      mao: [
        { name: "快捷支付1" },
        { name: "使用案列" },
        { name: "开通流程" },
        { name: "所需材料" },
        { name: "使用费率" }
      ],
      down: require("../../assets/img/down.png"),
      payLogo: require("../../assets/img/payLogo.png"),
      selectionD: true,
      bottomImg0: require("../../assets/img/bottom.png"),
      bottomImg1: require("../../assets/img/bootomT.png"),
      ds: [{ tr: true }, { tr: false }, { tr: false }]
    };
  },
  mounted() {
    var target = document.getElementById("target");
    target.scrollIntoView();
    window.addEventListener("scroll", this.handleScroll);
    if (this.$route.params.id) {
      this.deveChosed(this.$route.params.id, this.$route.params.index1);
    }
    //获取总栏目
    this.$post(this.$api.api + "/gw/productcenter/indexlist").then(res => {
      if (res.code == "0") {
        var data = res.data.prods;
        for (var i in data) {
          data[i].tr = false;
        }
        if (this.$route.params.index) {
          var index = this.$route.params.index;
          data[index].tr = true;
        } else {
          data[0].tr = true;
        }
        this.indexlist = data;
        //console..log("服务类型", this.indexlist);
      }
    });
    this.backgroundheight1.height = document.body.clientHeight * 2 + "px";
    //审核装阿嚏 -1-未申请 0-审核中 1-未通过 2-通过
    this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
      if (res.code == "0") {
        // console.log("初" + res.data.csjg, "复" + res.data.fzjg);
        this.csjg = res.data.csjg;
        if (res.data.csjg == 2 || res.data.fzjg == 2) {
          this.applys = false;
        } else if (res.data.csjg == 0 || res.data.fzjg == 0) {
          this.show = "审核中";
        } else if (res.data.csjg == 1 || res.data.fzjg == 1) {
          //未通过，失败
          this.applys = false;
        } else {
          this.csjg = "true";
        }
      } else {
        if (res.msg.indexOf("token") > -1) {
          this.csjg = "wrong";
          this.$emit("frame", "0");
        } else if (res.msg == "token超时,请重新登录") {
          this.csjg = "wrong";
          this.$emit("frame", "0");
        }
      }
    });
  },
  methods: {
    //产品详情
    proDetail(e) {
      this.tableDataName = false;
      this.$post(this.$api.api + "/gw/productcenter/detail/" + e).then(res => {
        if (res.code == "0") {
          if (res.code == "0") {
            res.data.feeDetail = unescape(res.data.feeDetail);
            // .replace(/;|；|。/g, ";<br>")
            // .replace(/& lt;/g, "<")
            // .replace(/& gt;/g, ">")
            // .replace(/&lt;/g, "<")
            // .replace(/&gt;/g, ">");
            res.data.process = unescape(res.data.process);
            // .replace(/;|；/g, "；<br>")
            // .replace(/。/g, "。<br>")
            // .replace(/& lt;/g, "<")
            // .replace(/& gt;/g, ">")
            // .replace(/&lt;/g, "<")
            // .replace(/&gt;/g, ">");
            res.data.prodDetail = unescape(res.data.prodDetail);
            // .replace(/& lt;/g, "<")
            // .replace(/& gt;/g, ">")
            // .replace(/&lt;/g, "<")
            // .replace(/&gt;/g, ">");
            res.data.prodCname = unescape(res.data.prodCname);
            // .replace(/& lt;/g, "<")
            // .replace(/& gt;/g, ">")
            // .replace(/&lt;/g, "<")
            // .replace(/&gt;/g, ">");

            res.data.material = unescape(res.data.material);
            // .replace(/& lt;/g, "<")
            // .replace(/& gt;/g, ">")
            // .replace(/&lt;/g, "<")
            // .replace(/&gt;/g, ">");
            this.productDetail = res.data;
            this.mao[0].name = this.productDetail.prodCname;
            // console.log("产品详情", res.data.fee);
            if (res.data.fee) {
              this.tableDataName = true;
              var fee = JSON.parse(res.data.fee);
              this.tableData[0].date = fee[0];
              this.tableData[0].name = fee[1];
              this.tableData[0].address = fee[2];
              this.mao = [
                { name: this.mao[0].name },
                { name: "使用案列" },
                { name: "开通流程" },
                { name: "所需材料" },
                { name: "使用费率" }
              ];
            } else {
              this.mao = [
                { name: this.mao[0].name },
                { name: "使用案列" },
                { name: "开通流程" },
                { name: "所需材料" }
              ];
            }
          }
        }
      });
    },
    handleScroll() {
      var that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      $(".mao01").each(function(i) {
        var kl =
          $(".mao01")
            .eq(i)
            .offset().top - scrollTop;
        if (
          $(".mao01")
            .eq(i)
            .offset().top -
            scrollTop -
            130 <=
          0
        ) {
          that.toCheck(i);
        } else {
        }
      });
    },
    toCheck(e, v) {
      var ke = e;
      // console.log(this.mao.length - 1);
      if (e == this.mao.length - 1) {
        ke = this.mao.length;
      }
      this.active = ke;

      if (v) {
        if ((v = "9999")) {
          $("html,body").animate(
            {
              scrollTop:
                $(".mao01")
                  .eq(e)
                  .offset().top -
                100 +
                "px"
            },
            300
          );
        }
      }
    },
    deveTit(e) {
      if (this.indexlist) {
        if (this.indexlist[e].tr == true) {
          this.indexlist[e].tr = false;
        } else {
          var ds = this.indexlist;
          for (var i in ds) {
            this.indexlist[i].tr = false;
          }
          this.indexlist[e].tr = true;
        }
      }
    },
    apply() {
      if (this.csjg == "wrong") {
        this.$emit("frame", "0");
        this.$router.push({ name: "login" });
        this.$notify.info({
          title: "请先登陆",
          message: "",
          position: "bottom-right"
        });
        return;
      }
      if (this.csjg == "true") {
        this.$router.push({ name: "apply" });
      }
      if (this.show == "审核中") {
        this.$notify.info({
          title: "审核中",
          message: "请耐心等待结果",
          position: "bottom-right"
        });
        return;
      }
    },
    deveChosed(e, index) {
      //获取详情
      this.proDetail(e);
      if (index > "-1") {
        $(".deve-left-ol li")
          .eq(index)
          .css("color", "#62BD72");
        $(".deve-left-ol li")
          .eq(index)
          .siblings()
          .css("color", "#666666");
      }
    }
  },

  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
/* body{
    background-color: red;
} */
.fade-enter-active,
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
  /* transform: rotate(-180deg); */
  /* -ms-transform:rotate(7deg); 
-moz-transform:rotate(7deg); 	
-webkit-transform:rotate(7deg); 
-o-transform:rotate(7deg);  */
}
.blue {
  background: #f7f8fa;
  padding-top: 100px;
}
.deve-D {
  width: 1200px;
  margin: 0 auto;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.deve-left {
  width: 290px;
  padding-bottom: 500px;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  margin-right: 10px;
}
.deve-right {
  width: 895px;
  padding: 10px 40px 10px 20px;
  /* height: 900px; */
  background-color: #ffffff;
  position: relative;
}
.deve-right-mao {
  width: 140px;
  height: 110px;
  position: fixed;
  margin-left: 745px;
  z-index: 10;
  background: rgba(223, 165, 165, 0);
}
.deve-right-meng {
  width: 115px;
  position: fixed;
  margin-left: 740px;
  z-index: 11;
  font-size: 14px;
  line-height: 28.5px;
  text-align: center;
  color: transparent;
  cursor: pointer;
}
.deve-right-meng li {
}
@media all and (max-width: 1050px) {
  .deve-right-mao {
    display: none;
  }
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
}
.deve-left-ol li:hover {
  color: #1eb381;
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
.deve-left-ul .deve-left-li1:first-child .deve-left-li1-p {
  border-top: none;
}
.deve-left-li1-p img {
  width: 20px;
  margin-right: 11px;
}
.deve-left-li1-p p {
  margin-left: 40px;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  width: 740px;
  margin-bottom: 100px;
}
.aboutDown li {
  /* background: rgb(240, 196, 196); */
  margin-bottom: 10px;
}
.mao00 {
  height: 100px;
  background-color: #62bd72;
}
.mao02 {
  text-align: center;
}

.el-step0 {
  cursor: pointer;
}
.maoTit {
  font-size: 24px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}
.maoCon {
  margin: 20px 0 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.feeDetail {
  margin-top: 17px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.apply {
  width: 190px;
  height: 42px;
  margin: 0 auto 20px;
  border-radius: 100px;
  background: linear-gradient(90deg, #1eb381 0%, #7ade92 100%);
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.maoCon >>> * {
  word-break: break-all;
}
.maoCon >>> pre {
  overflow: scroll;
  overflow-y: hidden;
  background: #eceaea;
}
.maoCon >>> table {
  margin: 5px 0;
  border: 1px solid black;
}
.maoCon >>> tr {
  border: 1px solid black;
}
.maoCon >>> td {
  border: 1px solid black;
}
.maoCon >>> th {
  border: 1px solid black;
}
</style>
