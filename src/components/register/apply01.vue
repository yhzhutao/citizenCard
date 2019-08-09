<template>
  <div id="target" class="box">
    <div v-if="ffff">
      <headerL></headerL>
      <div class="header011">
        <div class="container container-header01">
          <p>注册</p>
          <img :src="next" alt>
          <p>商户申请</p>
        </div>
      </div>

      <div class="container tabList">
        <!-- 选择产品 -->
        <ul class="tabList-ul">
          <li>
            <div>
              <p>选择产品</p>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>申请产品</p>
            </div>
            <!-- <div class="list-right block-one"> -->
            <div class="list-right block-one">
              <el-checkbox
                v-for="(item,index) in checkeds"
                :key="index"
                @change="checkedD(index)"
                v-model="item.va"
              >{{item.prodCname}}</el-checkbox>
            </div>
            <!-- </div> -->
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>使用场景描述</p>
            </div>
            <div class="list-right">
              <el-input
                @input="getInput(0)"
                style="width:964px;"
                placeholder="请输入"
                maxlength="99"
                v-model="inputs[0].value"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p v-if="redM1" class="mandatory"></p>
              <p v-else-if="redM2" class="mandatory"></p>
              <p v-else></p>
              <p>网站名称</p>
            </div>
            <div class="list-right">
              <el-input
                @input="getInput(1)"
                style="width:220px;"
                placeholder="请输入"
                maxlength="30"
                v-model="inputs[1].value"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p v-if="redM1" class="mandatory"></p>
              <p v-else-if="redM2" class="mandatory"></p>
              <p v-else></p>
              <p>网址</p>
            </div>
         
              <div class="list-right">
                <el-input
                  @input="getInput(2)"
                  style="width:220px;"
                  placeholder="请输入"
                  v-model="inputs[2].value"
                  maxlength="30"
                  clearable
                ></el-input>
             
            </div>
          </li>
          <li>
            <div class="list-left">
              <p v-if="redM1" class="mandatory"></p>
              <p v-else-if="redM2" class="mandatory"></p>
              <p v-else></p>
              <p>ICP备案</p>
            </div>

            <div class="list-right">
              <el-input
                @input="getInput(3)"
                style="width:220px;"
                placeholder="请输入"
                v-model="inputs[3].value"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>商户价格范围</p>
            </div>
            <div class="list-right">
      
                <el-input
                  @input="getInput(4)"
                  @blur="getBlur(4)"
                  style="width:220px;"
                  placeholder="请输入"
                  v-model="inputs[4].value"
                  maxlength="10"
                  clearable
                ></el-input>
         
              <p class="zhi-d">至</p>
          
                <el-input
                  @blur="getBlur(5)"
                  @input="getInput(5)"
                  style="width:220px;"
                  placeholder="请输入"
                  v-model="inputs[5].value"
                  maxlength="10"
                  clearable
                ></el-input>
          
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>平均单笔交易额</p>
            </div>
            <div class="list-right">
              <el-input
                @input="getInput(6)"
                style="width:220px;"
                placeholder="请输入"
                v-model="inputs[6].value"
                maxlength="10"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>最高单笔交易额</p>
            </div>

            <div class="list-right">
              <el-input
                @input="getInput(7)"
                style="width:220px;"
                placeholder="请输入"
                maxlength="10"
                v-model="inputs[7].value"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>日累计交易额</p>
            </div>

            <div class="list-right">
              <el-input
                @input="getInput(8)"
                style="width:220px;"
                maxlength="10"
                placeholder="请输入"
                v-model="inputs[8].value"
                clearable
              ></el-input>
            </div>
          </li>
        </ul>
      </div>
      <div class="container">
        <div class="read-d">
          <el-checkbox v-model="checked"></el-checkbox>
          <p>我公司承诺，上述所有支付场景均为真实，可追踪的，并愿意配合杭州市民卡有限公司进行相关数据抽查验证</p>
        </div>
        <button @click="submit()" class="next-d">确认申请</button>
        <!-- <router-link to="/examine">examine</router-link> -->
      </div>
    </div>
    <!-- <footerF></footerF> -->
  </div>
</template>

<script>
import footerF from "../public/headerD";
import headerL from "../public/headerLittle";
import logo from "../../assets/logo.png";
import options from "../../../static/js/city.js";
export default {
  data() {
    return {
      userNumber1: "",
      userNumber: "",
      redM1: "",
      redM2: "",
      must1: "",
      must2: "",
      authorization: "",
      ffff: true,
      inputs: [
        { value: "", name: "使用场景描述" },
        { value: "", name: "网站名称" },
        { value: "", name: "网址" },
        { value: "", name: "ICP备案" },
        { value: "", name: "商户价格范围" },
        { value: "", name: "商户价格范围" },
        { value: "", name: "平均单笔交易额" },
        { value: "", name: "最高单笔交接额" },
        { value: "", name: "日累计交易额" }
      ],
      logo,
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
      checkeds: ""
    };
  },
  components: {
    footerF,
    headerL
  },
  methods: {
    goFirst() {
      this.$router.push({ name: "citizenCard" });
    },
    //提交
    submit() {
      var that = this;
      var pros = [];
      for (var i in that.checkeds) {
        if (that.checkeds[i].va == true) {
          pros.push(that.checkeds[i].prodId);
        }
      }
      if (pros.length < 1) {
        this.$notify.error({
          title: "申请的产品类型不可为空",
          message: "请选择",
          position: "bottom-right"
        });
        return;
      }

      var must1 = this.must1;
      var must2 = this.must2;
      //console..log(that.inputs);
      for (var j in that.inputs) {
        that.getInput(j, "999");
        if (that.inputs[j].value.length < 1) {
          if (j == 1) {
            if (
              that.checkeds[must1].va == true ||
              that.checkeds[must2].va == true
            ) {
              that.$notify.error({
                title: that.inputs[j].name + "不可为空",
                message: "请填写",
                position: "bottom-right"
              });
              return;
            } else {
              //可不填
            }
          } else if (j == 2) {
            if (
              that.checkeds[must1].va == true ||
              that.checkeds[must2].va == true
            ) {
              that.$notify.error({
                title: that.inputs[j].name + "不可为空",
                message: "请填写",
                position: "bottom-right"
              });
              return;
            } else {
              //可不填
            }
          } else if (j == 3) {
            if (
              that.checkeds[must1].va == true ||
              that.checkeds[must2].va == true
            ) {
              that.$notify.error({
                title: that.inputs[j].name + "不可为空",
                message: "请填写",
                position: "bottom-right"
              });
              return;
            } else {
              //可不填
            }
          } else {
            that.$notify.error({
              title: that.inputs[j].name + "不可为空",
              message: "请填写",
              position: "bottom-right"
            });
            return;
          }
        }
      }
      if (this.checked == false) {
        that.$notify.error({
          title: "请勾选承诺",
          message: "",
          position: "bottom-right"
        });
        return;
      }

      var szdsName = JSON.parse(localStorage.getItem("selectedOptions2"));
      if (szdsName == null) {
        that.$notify.error({
          title: "请先选择商户所在地",
          message: "",
          position: "bottom-right"
        });
        return;
      }
      var data = {
        gszcmc: localStorage.getItem("company"), // 工商注册名称
        szdsName: localStorage.getItem("szds"), // 所在地省：
        szdshName: localStorage.getItem("szdsh"), // 所在地市
        szdqName: localStorage.getItem("szdq"), // 所在地区：
        szds: szdsName[0], // 所在地省：
        szdsh: szdsName[1], // 所在地市;
        szdq: szdsName[2], // 所在地区：
        xxdz: localStorage.getItem("detailed"), // 详细地址：
        yyzhzhhm: localStorage.getItem("licenseNumber"), // 营业执照号码：
        zzyxq: localStorage.getItem("zzyxq"), // 证件有效期
        yyzhzhwj: localStorage.getItem("yyzhzhwj"), //营业执照图片
        khxkzh: localStorage.getItem("openNumber"), // 开户许可证号：
        khxkzhwj: localStorage.getItem("khxkzhwj"), // 开户许可证：
        frdb: localStorage.getItem("legalPerson"), // 法定代表人：
        sfz: localStorage.getItem("legalPersonNumber"), // 法人身份证号码：
        sfzyxq: localStorage.getItem("sfzyxq"), // 身份证有效期：
        sffzm: localStorage.getItem("sffzm"), //正面
        sfzbm: localStorage.getItem("sfzbm"), //反面
        sjkzr: localStorage.getItem("control"), //实际控制人
        zczb: localStorage.getItem("capital"), //注册资本
        kysj: localStorage.getItem("openTime"), // 开业时间：
        prodId: pros.join(","), //申请产品pros.join(",")
        sycj: this.inputs[0].value, //场景描述
        wzmc: this.inputs[1].value, // 网站名称：
        wz: this.inputs[2].value, // 网址：wz
        icp: this.inputs[3].value, // ICP备案号：icp
        jgfw1: this.inputs[4].value, // 商户价格范围：jgfw1    jgfw2
        jgfw2: this.inputs[5].value, // 商户价格范围：jgfw1    jgfw2
        pjdbjye: this.inputs[6].value, // 平均单笔交易额：pjdbjye
        zgdbjye: this.inputs[7].value, // 最高单笔交易额：zgdbjye
        rljjye: this.inputs[8].value, // 日累计交易额：rljjye
        cnsqr: "" // 承诺书确认标记：cnsqr
      };
      //console..log(data);

      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });

      this.$post(that.$api.api + "/gw/a1/application/apply", data).then(res => {
        loading.close();
        //console..log(res);
        if (res.code == 0) {
          this.$notify({
            title: "提交成功",
            message: "请留意审核进度",
            type: "success",
            position: "bottom-right"
          });
          localStorage.clear();
          localStorage.setItem("authorization", that.authorization);
          localStorage.setItem("username", that.userNumber);
          localStorage.setItem("username1", that.userNumber1);
          that.$router.push({ name: "examine" });
        } else {
          this.$notify.info({
            title: res.msg,
            message: res.data,
            position: "bottom-right"
          });
        }
      });
    },
    //价格判断
    getBlur() {
      if (parseInt(this.inputs[5].value) <= parseInt(this.inputs[4].value)) {
        this.$notify({
          title: "最终价格不可小于等于开始价格",
          message: "请修改",
          type: "warning",
          position: "bottom-right"
        });
        this.inputs[5].value = "";
        localStorage.setItem("inputs", JSON.stringify(this.inputs));
      }
    },
    //获取输入值
    getInput(e, v) {
      if (this.inputs[e].value.length < 1) {
        return;
      }
      if (e == 4 || e == 5 || e == 6 || e == 7 || e == 8) {
        if (/^[0-9]+$/.test(this.inputs[e].value)) {
          var value = this.inputs[e].value.split("");
          if (value[0] == 0) {
            localStorage.setItem("inputs", JSON.stringify(this.inputs));
            this.$notify.error({
              title: "请正确输入大于0的金额",
              message: "",
              position: "bottom-right"
            });
            return;
          } else {
            localStorage.setItem("inputs", JSON.stringify(this.inputs));
            return;
          }
        } else {
          localStorage.setItem("inputs", JSON.stringify(this.inputs));
          this.$notify.error({
            title: "金额仅可为数字",
            message: "请重新填写",
            position: "bottom-right"
          });
          return;
        }
      }
      if (e == 2) {
        if (v == "999") {
          return;
        }
        if (
          /^[a-z|A-Z|0-9|&|~|`|*|=|+|-|,|·|。|，|：|:|；|.|\/]+$/.test(
            this.inputs[e].value
          )
        ) {
          localStorage.setItem("inputs", JSON.stringify(this.inputs));
          return;
        } else {
          localStorage.setItem("inputs", JSON.stringify(this.inputs));
          this.$notify.error({
            title: "请输入正确的网址",
            message: "",
            position: "bottom-right"
          });
          return;
        }
      }
      localStorage.setItem("inputs", JSON.stringify(this.inputs));
    },
    //多选
    checkedD(e) {
      // //console..log(e, this.checkeds);
      this.redM1 = this.checkeds[this.must1].va;
      this.redM2 = this.checkeds[this.must2].va;
      localStorage.setItem("checkeds", JSON.stringify(this.checkeds));
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
    indexVf(arr, n) {
      for (var i in arr) {
        if (arr[i].prodCname.indexOf(n) != -1) {
          return i;
        }
      }
    },
    productList() {
      this.$get(this.$api.api + "/gw/productcenter/productList").then(res => {
        if (res.code == 0) {
          for (var i in res.data) {
            res.data[i].va = false;
          }
          this.checkeds = res.data;
          this.must1 = this.indexVf(res.data, "B2C");
          this.must2 = this.indexVf(res.data, "B2B");
          //console..log("申请产品列表", res.data);
          // that.$router.push({ name: "applySecond" });
        }
      });
    }
  },
  created() {},
  mounted() {
    var target = document.getElementById("target");
    target.scrollIntoView();
    if (localStorage.getItem("username")) {
      this.userNumber = localStorage.getItem("username");
      this.userNumber1 = localStorage.getItem("username1");
    }
    if (localStorage.getItem("authorization")) {
      this.authorization = localStorage.getItem("authorization");
    }
    if (localStorage.getItem("inputs")) {
      this.inputs = JSON.parse(localStorage.getItem("inputs"));
    }
    if (localStorage.getItem("checkeds")) {
      this.checkeds = JSON.parse(localStorage.getItem("checkeds"));
      this.must1 = this.indexVf(this.checkeds, "B2C");
      this.must2 = this.indexVf(this.checkeds, "B2B");
      this.redM1 = this.checkeds[this.must1].va;
      this.redM2 = this.checkeds[this.must2].va;
    } else {
      this.productList();
    }
  }
};
</script>

<style scoped>
.el-checkbox {
  margin: 10px 20px 10px 0;
}
.next-d {
  cursor: pointer;
  width: 203px;
  height: 42px;
  text-align: center;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  border-radius: 100px;
  color: rgba(255, 255, 255, 1);
  margin: 30px 0;
}

.box {
  overflow: hidden;
  background: #f7f8fa;
  position: relative;
  width: 100%;
}
.logoTop {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.header {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e7e7e7;
  position: fixed;
  top: 0;
  z-index: 1000000 !important;
}
.nav {
  /* padding: 0 48px; */
  height: 80px;
  line-height: 80px;
  position: relative;
  z-index: 2;
}

.logo {
  width: 26px;
  height: 26px;
  margin-right: 10px;
}

.name {
  font-size: 18px;
  color: #333;
}
.navbar {
  display: flex;
  justify-content: flex-end;
}
.navbar p {
  margin-left: 60px;
}

.active {
  color: #419f48;
  border-bottom: 2px solid #419f48;
  height: 100%;
}
.active1 {
  color: #419f48;
}

.login-d {
  width: 73px;
  height: 30px;
  border-radius: 15px;
  border: none;
  background: #419f48;
  color: #fff;
  margin-left: 85px;
}

.header011 {
  width: 100%;
  margin: 80px 0 10px;
  height: 57px;
  background-color: #ffffff;
  border-bottom: 1px solid #e7e7e7;
}
.container-header01 {
  height: 57px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
}
.container-header01 a {
  color: #419f48;
}
.container-header01 img {
  width: 15px;
  height: 14px;
  margin: 0 8px;
}
.tabList {
  background-color: #ffffff;
}
.tabList-ul {
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.tabList-ul li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}
.mandatory {
  width: 7px;
  height: 7px;
  margin-right: 10px;
  background: red;
  border-radius: 50%;
}
.tabList-ul li:first-child div {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  width: 150px;
  text-align: right;
  font-weight: bold;
  margin: 30px 0 5px;
}
.list-left {
  width: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  margin-right: 32px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.list-right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.list-right div {
  margin-right: 8px;
}
.block-one {
  width: 960px;
}
.zhi-d {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-right: 15px;
}
.read-d {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 30px;
}
.read-d .el-checkbox {
  margin-right: 10px;
}
.login-ds {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-left: 80px;
}
.login-ds span:first-child {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
  background: #419f48;
}
.login-ds span:last-child {
  font-size: 17px !important;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.login-d {
  width: 73px;
  height: 30px;
  border-radius: 15px;
  border: none;
  background: #419f48;
  color: #fff;
  margin-left: 85px;
}
</style>
