<template>
  <div id="target" class="box">
    <div class="tabList">
      <!-- 选择产品 -->
      <ul class="tabList-ul">
        <li style="border-bottom:0.01rem solid #e5e5e5;padding-bottom:0.3rem;">
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
          <div class="block block-one">
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
              style="width:6.7rem;"
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
              style="width:4.5rem;"
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
          <div>
            <div class="block">
              <el-input
                @input="getInput(2)"
                style="width:4.5rem;"
                placeholder="请输入"
                v-model="inputs[2].value"
                maxlength="30"
                clearable
              ></el-input>
            </div>
          </div>
        </li>
        <li>
          <div class="list-left">
            <p v-if="redM1" class="mandatory"></p>
            <p v-else-if="redM2" class="mandatory"></p>
            <p v-else></p>
            <p>ICP备案</p>
          </div>

          <div class="block">
            <el-input
              @input="getInput(3)"
              style="width:4.5rem;"
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
              style="width:2.5rem;"
              placeholder="请输入"
              v-model="inputs[4].value"
              maxlength="10"
              clearable
            ></el-input>

            <p class="zhi-d">至</p>

            <el-input
              @blur="getBlur(5)"
              @input="getInput(5)"
              style="width:2.5rem;"
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
          <div class="block">
            <el-input
              @input="getInput(6)"
              style="width:4.5rem;"
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

          <div class="block">
            <el-input
              @input="getInput(7)"
              style="width:4.5rem;"
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

          <div class="block">
            <el-input
              @input="getInput(8)"
              style="width:4.5rem;"
              maxlength="10"
              placeholder="请输入"
              v-model="inputs[8].value"
              clearable
            ></el-input>
          </div>
        </li>
      </ul>
    </div>
    <div style="text-align:center;" class>
      <div class="read-d">
        <el-checkbox v-model="checked"></el-checkbox>
        <p style="text-align:left;">我公司承诺，上述所有支付场景均为真实，可追踪的，并愿意配合杭州市民卡有限公司进行相关数据抽查验证</p>
      </div>
      <button @click="submit()" class="next-d">确认申请</button>
      <!-- <router-link to="/examine">examine</router-link> -->
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>

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
            this.$message({
              showClose: true,
              message: "请正确输入大于0的金额"
            });
            // this.$notify.error({
            //   title: "请正确输入大于0的金额",
            //   message: "",
            //   position: "bottom-right"
            // });
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
  margin: 0.1rem 0.3rem 0.1rem 0;
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
  cursor: pointer;
  display: flex;
  align-items: center;
}
.header {
  width: 100%;
  background: #ffffff;
  border-bottom: 0.015rem solid #e7e7e7;
  position: fixed;
  top: 0;
  z-index: 1000000 !important;
}
.nav {
  /* padding: 0 48px; */
  height: 0.8rem;
  line-height: 0.8rem;
  position: relative;
  z-index: 2;
}

.name {
  font-size: 0.25rem;
  color: #333;
}

.tabList {
  background-color: #ffffff;
}
.tabList-ul {
  border-bottom: 0.015rem solid rgba(238, 238, 238, 1);
}
.tabList-ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 0.35rem;
}
.mandatory {
  width: 0.1rem;
  height: 0.1rem;
  margin-right: 0.1rem;
  background: red;
  border-radius: 50%;
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
  /* width: 2rem; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: right;
  margin-left: 0.3rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.list-right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.2rem 0.3rem 0 0.6rem;
}
.block {
  margin: 0.2rem 0.3rem 0 0.6rem;
}
/* .block-one {
  width: 960px;
} */
.zhi-d {
  font-size: 0.27rem;
  text-align: center;
  width: 0.8rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.read-d {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.25rem;
  margin: 0 0.3rem;
  line-height: 0.35rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 0.3rem;
}
.read-d .el-checkbox {
  margin-right: 0.1rem;
}
</style>
