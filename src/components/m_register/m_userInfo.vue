<template>
  <div id="target" class="box">
    <div class="tabList">
      <!-- 基本信息 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>基本信息</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>工商注册名称</p>
          </div>
          <div class="list-right">{{allData.gszcmc}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>商户所在地</p>
          </div>
          <div
            class="list-right"
          >{{allData.szdsName}} - {{allData.szdshName}} - {{allData.szdqName}}</div>
        </li>
        <li v-if="allData.xxdz">
          <div class="list-left">
            <p></p>
            <p>详细地址</p>
          </div>
          <div>
            <div class="list-right">{{allData.xxdz}}</div>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>实际控制人</p>
          </div>
          <div class="list-right">{{allData.sjkzr}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>注册资本</p>
          </div>
          <div class="list-right">{{allData.zczb}}元</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>开业时间</p>
          </div>
          <div class="list-right">{{allData.kysj}}</div>
        </li>
      </ul>
      <!-- 营业执照 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>营业执照</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>营业执照号</p>
          </div>
          <div class="list-right">{{allData.yyzhzhhm}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>证件有效期</p>
          </div>
          <div class="list-right">{{allData.zzyxq}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>证件图片</p>
          </div>
          <div class="list-right">
            <img class="avatar-d" :src="allData.yyzhzhwj" alt />
          </div>
        </li>
      </ul>
      <!-- 开户 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>开户许可证</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>开户许可证号</p>
          </div>
          <div class="list-right">{{allData.khxkzh}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>证件图片</p>
          </div>
          <div  class="list-right">
            <img class="avatar-d" :src="allData.khxkzhwj" alt />
          </div>
        </li>
      </ul>
      <!-- 法人信息 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>法人信息</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>法定代表人</p>
          </div>
          <div class="list-right">{{allData.frdb}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>法人身份证号</p>
          </div>
          <div class="list-right">{{allData.sfz}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>证件有效期</p>
          </div>
          <div class="list-right">{{allData.sfzyxq}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>证件图片</p>
          </div>
          <div  class="list-right">
            <img class="avatar-d" :src="allData.sffzm" alt />
            <img class="avatar-d" :src="allData.sfzbm" alt />
          </div>
        </li>
      </ul>
      <!-- 选择产品 -->
      <ul class="tabList-ul">
        <li>
          <div>
            <p>选择产品</p>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>申请产品</p>
          </div>
          <!-- <div class="list-right block-one"> -->
          <div class="block list-right-des">
            <el-checkbox
              v-for="(item,index) in productListData"
              :key="index"
              v-model="checkedD"
              disabled
            >{{item}}</el-checkbox>
            <!-- <el-radio
              v-for="(item,index) in checkedsMer"
              :key="index"
              v-model="radio1"
              label="1"
            >{{item.name}}</el-radio>-->
          </div>
          <!-- </div> -->
        </li>
        <li v-if="allData.sycj">
          <div class="list-left">
            <p></p>
            <p>使用场景描述</p>
          </div>
          <div class="list-right list-right-des">{{allData.sycj}}</div>
        </li>
        <li v-if="allData.wzmc">
          <div class="list-left">
            <p></p>
            <p>网站名称</p>
          </div>
          <div class="list-right">{{allData.wzmc}}</div>
        </li>
        <li v-if="allData.wz">
          <div class="list-left">
            <p></p>
            <p>网址</p>
          </div>
          <div class="list-right">{{allData.wz}}</div>
        </li>
        <li v-if="allData.icp">
          <div class="list-left">
            <p></p>
            <p>ICP备案</p>
          </div>
          <div class="list-right">{{allData.icp}}</div>
        </li>

        <li>
          <div class="list-left">
            <p></p>
            <p>商户价格范围</p>
          </div>
          <div class="list-right">{{allData.jgfw1}}元 - {{allData.jgfw2}}元</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>平均单笔交易额</p>
          </div>
          <div class="list-right">{{allData.pjdbjye}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>最高单笔交易额</p>
          </div>
          <div class="list-right">{{allData.zgdbjye}}</div>
        </li>
        <li>
          <div class="list-left">
            <p></p>
            <p>日累计交易额</p>
          </div>

          <div class="list-right">{{allData.rljjye}}</div>
        </li>
      </ul>
    </div>
    <div style="text-align:center;">
      <button @click="goBack()" class="next-d">返回</button>
    </div>
    <div @click="toTop()" id="to-top-btn">
      <img :src="toTopImg" alt />
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>

<script>
import logo from "../../assets/logo.png";
import headerL from "../public/headerLittle";
import options from "../../../static/js/city.js";
export default {
  data() {
    return {
      productListData: "",
      jingyingData: "",
      sxfsffs: "", //手续费方式
      userNumber: "",
      allData: "",
      checkedD: true,
      radio1: "1",
      input: "",
      logo,
      toTopImg: require("../../assets/img/toTop.png"),
      next: require("../../assets/img/next.png"),
      value: "",
      options: options,
      selectedOptions: [],
      selectedOptions2: [],
      dialogImageUrl: "",
      dialogVisible: false,
      value1: "",
      value2: "",
      checked: true,
      addImg: require("../../assets/img/addImg.png"),
      file: "",
      avatar0: "",
      avatar1: "",
      avatar2: "",
      avatar3: "",
      checkedsMer: [
        { name: "代付", va: false },
        { name: "代收", va: false },
        { name: "B2B网关", va: false }
      ],
      checkeds: [
        { name: "代付", va: true },
        { name: "代收", va: false },
        { name: "B2B网关", va: false },
        { name: "B2C网关", va: false },
        { name: "快捷支付", va: false },
        { name: "聚合支付", va: false },
        { name: "账户支付", va: false },
        { name: "实名认证", va: false },
        { name: "扫码支付", va: false },
        { name: "账户支付", va: false },
        { name: "实名认证", va: false },
        { name: "扫码支付", va: false }
      ]
    };
  },
  components: {
    headerL
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toTop() {
      var target = document.getElementById("target");
      target.scrollIntoView();
    },
    handleChange(value) {
      // //console..log(value);
    },
    handleRemove(file, fileList) {
      // //console..log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeImage(e, i) {
      // //console..log(i);
      let file = e.target.files[0];
      if (file) {
        this.file = file;
        //console..log(this.file);
        let reader = new FileReader();
        let that = this;
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          // 这里的this 指向reader
          if (i == 0) {
            that.avatar0 = this.result;
          } else if (i == 1) {
            that.avatar1 = this.result;
          } else if (i == 2) {
            that.avatar2 = this.result;
          } else if (i == 3) {
            that.avatar3 = this.result;
          }
        };
      }
    },
    scrollToTop(el) {
      let topBtn = document.getElementById("to-top-btn");
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let browserHeight = window.outerHeight;
      if (scrollTop > browserHeight) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    },
    //经营范围
    jingying(data) {
      var das = [];
      for (var i in data) {
        if (data[i] == "00") {
          das.push("电商");
        }
        if (data[i] == "01") {
          das.push("餐饮/食品");
        }
        if (data[i] == "02") {
          das.push("生活/家居");
        }
        if (data[i] == "03") {
          das.push("咨询服务");
        }

        if (data[i] == "04") {
          das.push("票务/旅游 ");
        }
        if (data[i] == "05") {
          das.push("教育/培训");
        }
        if (data[i] == "06") {
          das.push("公益");
        }
        if (data[i] == "07") {
          das.push("娱乐/健身服务");
        }
        if (data[i] == "08") {
          das.push("交通运输");
        }
        if (data[i] == "09") {
          das.push("生活缴费");
        }
        if (data[i] == "10") {
          das.push("金融");
        }
        if (data[i] == "11") {
          das.push(this.allData.shjyfwqt);
        }
      }
      this.jingyingData = das;
    },
    productList(e) {
      var kk = [];
      this.$get(this.$api.api + "/gw/productcenter/productList").then(res => {
        if (res.code == "0") {
          //console..log(e.split(","));
          var eId = e.split(",");
          //console..log("产品列表", res.data); //prodId
          for (var i in res.data) {
            for (var j in eId) {
              if (res.data[i].prodId == eId[j]) {
                kk.push(res.data[i].prodCname);
              }
            }
          }
          this.productListData = kk;
        }
      });
    }
  },
  created() {},
  mounted() {
    //查看复审资料
    window.addEventListener("scroll", this.scrollToTop);

    this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
      // //console..log("申请状态", res);
      if (res.msg.indexOf("token") > -1) {
        alert("登陆失效,请重新登陆");
        this.$router.push({ name: "m_login" });
        return;
      }
      if (res.msg == "token超时,请重新登录") {
        alert("登陆失效,请重新登陆");
        this.$router.push({ name: "m_login" });
        return;
      }
      this.$get(this.$api.api + "/gw/a1/application/" + res.data.applyId).then(
        res => {
          if (res.code == "0") {
            this.allData = res.data;
            //console..log("复审资料", this.allData);
            if (this.allData.thfhfs == "00") {
              this.allData.thfhfs = "原路返回银行账户";
            } else if (this.allData.thfhfs == "01") {
              this.allData.thfhfs = "退回注册账户";
            } else if (this.allData.thfhfs == "02") {
              this.allData.thfhfs = "转账方式返还用户";
            } else if (this.allData.thfhfs == "03") {
              this.allData.thfhfs = "现金返还";
            } else {
              this.allData.thfhfs = "其它";
            }
            if (this.allData.sxfsffs == "00") {
              this.sxfsffs = "月结";
            } else if (this.allData.sxfsffs == "01") {
              this.sxfsffs = "实时扣收";
            } else {
              this.sxfsffs = "其它";
            }
            this.jingying(this.allData.shjyfw.split(","));
            this.productList(this.allData.prodId);
          }
        }
      );
    });
    //产品列表
    //产品列表
    this.$store.commit("changeValue", "first");

    if (localStorage.getItem("username")) {
      this.userNumber = localStorage.getItem("username");
    }
    this.toTop();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style scoped>
.el-checkbox {
  margin: 0.1rem 0.3rem 0.1rem 0;
}

#to-top-btn {
  position: fixed;
  right: 5%;
  bottom: 50%;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
}
#to-top-btn img {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.next-d {
  width: 2rem;
  height: 0.5rem;
  text-align: center;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  font-size: 0.25rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  border-radius: 1rem;
  color: rgba(255, 255, 255, 1);
  margin: 0.5rem auto 1rem;
}
.box {
  overflow: hidden;
  background: #f7f8fa;
  position: relative;
  width: 100%;
}
.logoTop {
  display: flex;
  align-items: center;
}


.name {
  font-size: 0.25rem;
  color: #333;
}

.tabList {
  background-color: #ffffff;
}
.tabList-ul {
  border-bottom: 0.02rem solid rgba(238, 238, 238, 1);
  width: 6.9rem;
  margin: 0 auto;
  overflow: hidden;
}
.tabList-ul li {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.3rem;
}

.tabList-ul li:first-child div {
  font-size: 0.35rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  text-align: right;
  font-weight: bold;
  margin: 0.3rem 0 0 0.3rem;
}
.list-left {
  width:2rem;
  text-align: right;
  margin-right: 0.3rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #666666;
}

.mer-d1 {
  width: 2.5rem;
  line-height: 1rem;
}
.mer-d {
  width: 3.5rem;line-height: 0.3rem;
}
.list-right {
  width:4.1rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333333;
}
.list-right div {
  margin-right: 0.3rem;
}


.avatar-d {
  height:1.5rem;
  /* background-color: #a2e7d3; */
  border-radius: 0.05rem;
  margin-right: 0.35rem;
  margin-bottom: 0.4rem;
}
.list-right-des {
  width:4.6rem;
}
</style>
