<template>
  <div id="target" class="container-all">
    <headerD></headerD>
    <div :style="backgroundDiv" class="container examine-d1">
      <!-- 审核第一步 -->
      <div v-if="sous[6].va">
        <div class="process-D1">
          <img :src="proOneL">
        </div>

        <p class="title-D1">资料审核中，请耐心等待</p>
        <div class="content-D1">
          <div class="content-D1-one">
            <p>申请单编号：{{applySerialNumber}}</p>
            <p>创建时间：{{createDate}}</p>
          </div>
          <div class="content-D1-two">
            <div class="examine-left">
              <img :src="proone" alt>
            </div>
            <ul class="examine-right">
              <li>
                <div class="examine-right-p1">
                  <p>1.提交资料</p>
                  <p>
                    <img :src="proing" alt>
                    审核中...
                  </p>
                </div>
                <div class="examine-right-p2">
                  <p>填写商户工商信息，业务场景介绍。</p>
                  <p @click="check('1')">查看资料</p>
                </div>
              </li>
              <li>
                <div class="examine-right-p1">
                  <p>2.补充资料</p>
                  <p></p>
                </div>
                <div class="examine-right-p2">
                  <p>完善商户信息，核验经办人联系，方便为您开通支付业务。</p>
                  <p></p>
                </div>
              </li>
              <li>
                <div class="examine-right-p1">
                  <p>3.协议签署</p>
                  <p></p>
                </div>
                <div class="examine-right-p2">
                  <p>签订《商户承诺函》、《惠民汇付支付服务协议》</p>
                  <p></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 审核驳回 -->
      <div v-if="sous[7].va">
        <div class="process-D1">
          <img :src="proFail">
        </div>
        <p class="title-D1">商户申请失败</p>
        <div class="error">
          <p>审核备注：{{errorY}}</p>
          <div class="error-div">
            <img
              @click="chickImg(item)"
              v-for="(item,index) in errorImg"
              :key="index"
              :src="item"
              alt
            >
            <!-- <img src alt>
            <img src alt>-->
          </div>
        </div>
        <div style="margin: 60px auto;text-align:center;">
          <button @click="reject()" class="reApply">重新申请</button>
        </div>
      </div>
      <!-- 审核失败 -->
      <div v-if="sous[2].va">
        <div class="process-D1">
          <img :src="proFail">
        </div>
        <p class="title-D1">商户申请失败</p>
        <div class="error">
          <p>审核备注：{{errorY}}</p>
          <div class="error-div">
            <img
              @click="chickImg(item)"
              v-for="(item,index) in errorImg"
              :key="index"
              :src="item"
              alt
            >
            <!-- <img src alt>
            <img src alt>-->
          </div>
        </div>
      </div>
      <!--初审 申请成功 -->
      <div v-if="sous[3].va">
        <div class="process-D1">
          <img :src="proSucc">
        </div>
        <div class="ex-success">
          <p>商户申请审核成功，请填写补充资料，便于为您开通结算功能</p>
          <router-link to="/reexmaine01">申请产品</router-link>
        </div>
      </div>
      <!--清结算 -->
      <div v-if="sous[0].va">
        <div class="process-D1">
          <img :src="proSucc">
        </div>
        <div class="ex-success" style="text-align:center;">
          <p>您的申请已通过！</p>
          <div @click="qjsw()" class="qjs">进入商户中心</div>
        </div>
      </div>
      <!-- 没有申请 -->
      <div v-if="sous[4].va">
        <div class="process-D1">
          <img :src="nodata">
        </div>
        <div class="ex-success">
          <p>您尚未申请任何产品，欢迎您申请入驻</p>
          <router-link to="/apply">申请产品</router-link>
        </div>
      </div>
      <!-- 审核 第三部 -->
      <div v-if="sous[5].va">
        <div class="process-D1">
          <img :src="proSucc">
        </div>
        <p class="title-D1">资料审核中，请耐心等待</p>
        <div class="content-D1">
          <div class="content-D1-one">
            <p>申请单编号：{{applySerialNumber}}</p>
            <p>创建时间：{{createDate}}</p>
          </div>
          <div class="content-D1-two">
            <div class="examine-left">
              <img :src="prothree" alt>
            </div>
            <ul class="examine-right">
              <li>
                <div class="examine-right-p1">
                  <p>1.提交资料</p>
                  <p>
                    <img :src="proed" alt>
                    已通过
                  </p>
                </div>
                <div class="examine-right-p2">
                  <p>填写商户工商信息，业务场景介绍。</p>
                  <p></p>
                </div>
              </li>
              <li>
                <div class="examine-right-p1">
                  <p>2.补充资料</p>
                  <p>
                    <img :src="proed" alt>
                    已通过
                  </p>
                </div>
                <div class="examine-right-p2">
                  <p>完善商户信息，核验经办人联系，方便为您开通支付业务。</p>
                  <p>
                    <router-link to="/userInfo02">查看资料</router-link>
                  </p>
                </div>
              </li>
              <li>
                <div class="examine-right-p1">
                  <p>3.协议签署</p>
                  <p>
                    <img :src="proing" alt>
                    开通中...
                  </p>
                </div>
                <div class="examine-right-p2">
                  <p>签订《商户承诺函》、《惠民汇付支付服务协议》</p>
                  <p @click="downList()">下载申请表</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 审核 第2部 -->
      <div v-if="sous[1].va">
        <div class="process-D1">
          <img :src="proOneL">
        </div>
        <p class="title-D1">资料审核中，请耐心等待</p>
        <div class="content-D1">
          <div class="content-D1-one">
            <p>申请单编号：{{applySerialNumber}}</p>
            <p>创建时间：{{createDate}}</p>
          </div>
          <div class="content-D1-two">
            <div class="examine-left">
              <img :src="protwo" alt>
            </div>
            <ul class="examine-right">
              <li>
                <div class="examine-right-p1">
                  <p>1.提交资料</p>
                  <p>
                    <img :src="proed" alt>
                    已通过
                  </p>
                </div>
                <div class="examine-right-p2">
                  <p>填写商户工商信息，业务场景介绍。</p>
                  <p></p>
                </div>
              </li>
              <li>
                <div class="examine-right-p1">
                  <p>2.补充资料</p>
                  <p>
                    <img :src="proing" alt>
                    审核中...
                  </p>
                </div>
                <div class="examine-right-p2">
                  <p>完善商户信息，核验经办人联系，方便为您开通支付业务。</p>
                  <p>
                    <router-link to="/userInfo02">查看资料</router-link>
                  </p>
                </div>
              </li>
              <li>
                <div class="examine-right-p1">
                  <p>3.协议签署</p>
                  <p>
                    <!-- <img :src="proing" alt>
                    开通中...-->
                  </p>
                </div>
                <div class="examine-right-p2">
                  <p>签订《商户承诺函》、《惠民汇付支付服务协议》</p>
                  <p></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <footerD class="footerD"></footerD>
  </div>
</template>
<script>
import headerD from "../public/headerD";
import $ from "jquery";
import footerD from "../public/footerD";
export default {
  data() {
    return {
      errorY: "公司网站填写有误，不能访问",
      errorImg: "",
      backgroundDiv: {
        height: ""
      },
      proOneL: require("../../assets/img/proOneLogo.png"),
      proFail: require("../../assets/img/proFailLogo.png"),
      proSucc: require("../../assets/img/proSucccLogo.png"),
      proone: require("../../assets/img/proone.png"),
      protwo: require("../../assets/img/protwo.png"),
      nodata: require("../../assets/img/nodata.png"),
      prothree: require("../../assets/img/prothree.png"),
      proing: require("../../assets/img/proing.png"),
      proed: require("../../assets/img/proed.png"),
      sous: [
        { va: false },
        { va: false },
        { va: false },
        { va: false },
        { va: false },
        { va: false },
        { va: false },
        { va: false },
        { va: false },
        { va: false },
        { va: false }
      ],
      createDate: "",
      applySerialNumber: "",
      heightA: document.body.clientHeight,
      proImg: require("../../assets/img/phone.png"),
      applyId: ""
    };
  },
  components: {
    footerD,
    headerD
  },
  methods: {
    chickImg(e) {
      window.open(e);
    },
    qjsw() {
      // window.location.href = "https://sh.96225.com/";
      // return;
      window.open("https://sh.96225.com/");
    },
    reject() {
      this.$router.push({ name: "reject01" });
    },
    check() {
      this.$router.push({ name: "userinfo", params: { id: this.applyId } });
    },
    downList() {
      let a = document.createElement("a");
      a.href =
        this.$api.api +
        "/gw/file/download?token=" +
        localStorage.getItem("authorization");
      a.click();
      this.$notify.info({
        title: "正在准备下载 申请表",
        message: "请稍后",
        position: "bottom-right"
      });
      return;
    }
  },
  mounted() {
    var that = this;
    var target = document.getElementById("target");
    target.scrollIntoView();
    // return;
    // 获取申请状态接口
    // 初审结果：CSJG    -1-未申请 0-审核中 1-未通过 2-通过
    const loading = this.$loading({
      lock: true,
      text: "查询中 ...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.5)"
    });
    for (var i in this.sous) {
      this.sous[i].va = false;
    }
    this.backgroundDiv.height =
      document.documentElement.clientHeight * 1.5 + "px";
    this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
      loading.close();
      if (res.msg.indexOf("token") > -1) {
        alert("登陆失效,请重新登陆");
        this.$router.push({ name: "login" });
        return;
      }
      if (res.msg == "token超时,请重新登录") {
        alert("登陆失效,请重新登陆");
        this.$router.push({ name: "login" });
        return;
      }
      if (res.code == 0) {
        //console..log("清结算" + res.data.qjsshzt);
        //console..log("初审结果", res.data.csjg, "复审结果", res.data.fszt);
        var csjg = res.data.csjg;
        var fszt = res.data.fszt;
        that.createDate = res.data.createDate;
        that.applySerialNumber = res.data.applySerialNumber;
        that.applyId = res.data.applyId;
        // if (res.data.qjsshzt) {
        if (res.data.qjsshzt == "0") {
          //审核中
          this.sous[5].va = true;
          return;
        }
        if (res.data.qjsshzt == "1") {
          //通过
          this.sous[0].va = true;
          return;
        }
        // }

        if (res.data.csjg) {
          if (fszt !== "" && fszt !== "-1") {
            //复审
            //审核中
            if (fszt == 0) {
              this.sous[1].va = true;
              return;
            } else if (fszt == 1) {
              //失败
              this.sous[2].va = true;
              that.errorY = res.data.fsbz;
              that.errorImg = res.data.fstp.split(",");
              return;
            } else if (fszt == 2) {
              //通过
              this.sous[5].va = true;
              return;
            } else if (fszt == 3) {
              //驳回
              this.sous[7].va = true;
              that.errorY = res.data.fsbz;
              that.errorImg = res.data.fstp.split(",");
              return;
            } else {
              //1-未申请
              this.sous[4].va = true;
              return;
            }
          } else {
            //初审
            if (csjg == 0) {
              //0-审核中
              this.sous[6].va = true;
              return;
            } else if (csjg == 1) {
              //1-未通过
              this.sous[2].va = true;
              that.errorY = res.data.csbz;
              that.errorImg = res.data.cstp.split(",");
              return;
            } else if (csjg == 2) {
              //2-通过
              this.sous[3].va = true;
              return;
            } else {
              //1-未申请宁
              this.sous[4].va = true;
              return;
            }
          }
        } else {
          this.sous[4].va = true;
          return;
        }
      }
    });
  }
};
</script>
<style scoped>
.container-all {
  background: #f7f8fa;
  /* padding-bottom: 150px; */
  position: relative;
  padding-top: 90px;
}
.footerD {
  /* background-color: red; */
  position: absolute;
  bottom: 0;
}
.examine-d1 {
  background-color: #ffffff;
  height: 900px;
  padding-top: 90px;
}
.process-D1 {
  margin: 0 auto 20px;
  width: 183px;
  height: 183px;
  /* background: pink; */
}
.process-D1 img {
  width: 100%;
  height: 100%;
}
.title-D1 {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin-bottom: 30px;
}
.content-D1 {
  width: 604px;
  padding: 0 45px;
  height: 334px;
  background: rgba(255, 255, 255, 1);
  border-radius: 7px;
  border: 1px solid rgba(151, 151, 151, 1);
  margin: 0 auto;
}
.content-D1-one {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  width: 100%;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 21px 0 30px;
}
.content-D1-two {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.examine-left {
  width: 25px;
  height: 250px;
  /* background: red; */
  margin-right: 13px;
}
.examine-left img {
  width: 100%;
  margin-top: 15px;
  /* background: red; */
}
.examine-right {
  width: 572px;
}
.examine-right li {
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;
}
.examine-right li:last-child {
  padding: 20px 0 0;
  border-bottom: none;
}
.examine-right-p1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.examine-right-p1 p:first-child {
  font-size: 22px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.examine-right-p1 p:last-child {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.examine-right-p1 p:last-child img {
  width: 15px;
  /* height: 15px; */
  /* background: rgba(98, 189, 114, 1); */
  margin-right: 13px;
}
.examine-right-p2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.examine-right-p2 p:first-child {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-left: 15px;
}
.examine-right-p2 p:last-child {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(74, 144, 226, 1);
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: underline;
}
.examine-right-p2 p:last-child a {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(74, 144, 226, 1);
}
.error {
  /* background: red; */
  margin-top: 100px;
}
.error p {
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.error-div {
  width: 1200px;
  margin: 0 auto;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.error-div img {
  margin: 10px;
  height: 90px;
  cursor: pointer;
}
.ex-success {
  text-align: center;
}
.ex-success p {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin: 25px auto 60px;
}
.ex-success a {
  /* width: 230px;
  height: 42px; */
  padding: 10px 85px;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  border-radius: 100px;
}
.qjs {
  width: 230px;
  height: 42px;
  margin: 0 auto;
  line-height: 42px;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  border-radius: 100px;
  cursor: pointer;
}
.reApply {
  width: 203px;
  height: 42px;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  border-radius: 100px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
</style>
