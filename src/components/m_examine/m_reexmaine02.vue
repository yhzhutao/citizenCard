<template>
  <div id="target" class="box">
    <div v-if="ffff">
      <div class="tabList">
        <!-- 商户信息 -->
        <ul class="tabList-ul">
          <li>
            <div>
              <p>商户信息</p>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>商户性质</p>
            </div>
            <div class="list-right">
              <el-select
                @change="shopType(0)"
                v-model="typeValue[0].value"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in murType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>商户经营范围</p>
            </div>
            <div class="another block-one">
              <div class="block block-one">
                <el-checkbox
                  v-for="(item,index) in checkeds"
                  :key="index"
                  @change="checkedD(index)"
                  v-model="item.va"
                >{{item.name}}</el-checkbox>
              </div>
              <div style="margin-left:0.6rem;">
                <el-checkbox @change="chAnother()" v-model="another">其它</el-checkbox>
                <el-input
                  @input="getInput(0)"
                  style="width:4.5rem;margin-top:10px;"
                  placeholder="请输入"
                  v-model="inputs[0].value"
                  clearable
                ></el-input>
              </div>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>网站功能</p>
            </div>
            <div class="list-right">
              <el-radio @change="readioChange(0,'00')" v-model="radioG[0]" label="1">充值</el-radio>
              <el-radio @change="readioChange(0,'01')" v-model="radioG[0]" label="2">提现</el-radio>
              <el-radio @change="readioChange(0,'10')" v-model="radioG[0]" label="3">以上均无</el-radio>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>退货返还方式</p>
            </div>
            <div class="list-right">
              <el-select
                @change="shopType(1)"
                v-model="typeValue[1].value"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in backType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>商户是否有实体店</p>
            </div>
            <div class="list-right">
              <el-radio @change="readioChange(1,'1')" v-model="radioG[1]" label="1">是</el-radio>
              <el-radio @change="readioChange(1,'0')" v-model="radioG[1]" label="2">否</el-radio>
            </div>
          </li>
          <li>
            <div class="list-left mer-d1">
              <p class="mandatory"></p>
              <p>目前是否与其他第三方支付机构合作</p>
            </div>
            <div class="list-right">
              <el-radio @change="readioChange(2,'1')" v-model="radioG[2]" label="1">是</el-radio>
              <el-radio @change="readioChange(2,'0')" v-model="radioG[2]" label="2">否</el-radio>
            </div>
          </li>
          <li>
            <div class="list-left mer-d">
              <p class="mandatory"></p>
              <p>是否有与其他第三方支付机构合作后终止合作情况</p>
            </div>
            <div class="list-right">
              <el-radio @change="readioChange(3,'1')" v-model="radioG[3]" label="1">是</el-radio>
              <el-radio @change="readioChange(3,'0')" v-model="radioG[3]" label="2">否</el-radio>
            </div>
          </li>
        </ul>
        <!-- 结算账户 -->
        <ul class="tabList-ul">
          <li>
            <div>
              <p>结算账户</p>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>账户名称</p>
            </div>
            <div class="list-right">
              <el-input
                @input="getInput(1)"
                style="width:4.5rem;"
                placeholder="请输入"
                v-model="inputs[1].value"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>结算账号</p>
            </div>
            <div class="list-right">
              <el-input
                @input="getInput(2)"
                style="width:4.5rem;"
                placeholder="请输入"
                v-model="inputs[2].value"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>联行号</p>
            </div>
            <div>
              <div class="block">
                <el-input
                  @input="getInput(3)"
                  style="width:4.5rem;"
                  placeholder="请输入"
                  v-model="inputs[3].value"
                  clearable
                ></el-input>
              </div>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>开户行名称</p>
            </div>

            <div class="block">
              <el-input
                @input="getInput(4)"
                style="width:4.5rem;"
                placeholder="请输入"
                v-model="inputs[4].value"
                clearable
              ></el-input>
            </div>
          </li>
          <li>
            <div class="list-left">
              <p class="mandatory"></p>
              <p>手续费收费方式</p>
            </div>
            <div class="block">
              <el-select
                @change="shopType(2)"
                v-model="typeValue[2].value"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in serviceCharge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </li>
        </ul>
      </div>

      <div class="read-d">
        <el-checkbox v-model="checked"></el-checkbox>
        <p>
          同意并阅读
          <router-link :to="{name:'promise01',params:{id:1}}">《承诺函1》</router-link>与
          <router-link :to="{name:'promise01',params:{id:2}}">《承诺函2》</router-link>的内容
        </p>
      </div>
      <div style="text-align:center;">
        <button @click="submit()" class="next-d">确认申请</button>
      </div>
    </div>
  </div>
</template>

<script>
import footerF from "../public/headerD";
import headerL from "../public/headerLittle";
import logo from "../../assets/logo.png";
export default {
  data() {
    return {
      userNumber: "",
      radioG: ["1", "1", "1", "1"], //网站功能,是否有实体店,第三方合作,第三方终止，
      radioGname: ["00", "1", "1", "1"],
      serviceCharge: [
        {
          value: "00",
          label: "月结"
        },
        {
          value: "01",
          label: "实时扣收"
        }
      ],
      backType: [
        {
          value: "00",
          label: "原路返回银行账户"
        },
        {
          value: "01",
          label: "退回注册账户"
        },
        {
          value: "02",
          label: "转账方式返还用户"
        },
        {
          value: "03",
          label: "现金返还"
        }
      ],
      murType: [
        {
          value: "00",
          label: "国营"
        },
        {
          value: "01",
          label: "集体"
        },
        {
          value: "02",
          label: "私营"
        },

        {
          value: "03",
          label: "合资"
        },
        {
          value: "04",
          label: "股份制"
        },
        {
          value: "05",
          label: "其它"
        }
      ],
      another: false,
      inputsAnother: "",
      authorization: "",
      ffff: true,
      inputs: [
        { value: "", name: "其它" },
        { value: "", name: "账户名称" },
        { value: "", name: "结算账号" },
        { value: "", name: "联行号" },
        { value: "", name: "开户行名称" }
      ],
      logo,
      next: require("../../assets/img/next.png"),
      value: "",
      selectedOptions2: [],
      dialogImageUrl: "",
      dialogVisible: false,
      typeValue: [
        { value: "", name: "商户性质" },
        { value: "", name: "退货返还方式" },
        { value: "", name: "手续费收费方式" }
      ],
      checked: true,
      checkeds: [
        { name: "电商", va: false, id: "00" },
        { name: "餐饮/食品", va: false, id: "01" },
        { name: "生活/家居", va: false, id: "02" },
        { name: "咨询服务", va: false, id: "03" },
        { name: "票务/旅游", va: false, id: "04" },
        { name: "教育/培训", va: false, id: "05" },
        { name: "公益", va: false, id: "06" },
        { name: "娱乐/健身服务", va: false, id: " 07" },
        { name: "交通运输", va: false, id: "08" },
        { name: "生活缴费", va: false, id: "09" },
        { name: "金融", va: false, id: "10" }
      ]
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
    //其它
    chAnother() {
      // //console..log(this.another);
      localStorage.setItem("another", this.another);
    },
    //几种单选
    readioChange(e, v) {
      this.radioGname[e] = v;
      //console..log(this.radioGname)
      localStorage.setItem("readioG", JSON.stringify(this.radioG));
      localStorage.setItem("radioGname", JSON.stringify(this.radioGname));
    },
    //提交
    submit() {
      // localStorage.clear()
      var that = this;
      var pros = [];
      for (var i in that.checkeds) {
        if (that.checkeds[i].va == true) {
          pros.push(that.checkeds[i].id);
        }
      }
      // //console..log(pros.join(","), this.typeValue, this.radioGname);
      if (pros.length < 1 && that.inputs[0].value.length < 1) {
        this.$message({
          showClose: true,
          message: "商户经营范围不可为空",
          type: "error"
        });
        return;
      }

      for (var j in that.inputs) {
        if (j == 0) {
          if (that.another == true) {
            if (that.inputs[0].value.length < 1) {
              that.$message({
                showClose: true,
                message: "您已勾选'其它',请输入内容",
                type: "error"
              });
              return;
            }
            pros.push("11");
          }
        } else if (that.inputs[j].value.length < 1) {
          that.$message({
            showClose: true,
            message: that.inputs[j].name + "不可为空",
            type: "error"
          });
          return;
        }
      }
      for (var e in that.inputs) {
        if (e == 1) {
          if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.inputs[e].value)) {
            that.$message({
              showClose: true,
              message: "请输入正确的账户名称",
              type: "error"
            });
            return;
          }
        }
        if (e == 2 || e == 3) {
          if (!/^[0-9]+$/.test(this.inputs[e].value)) {
            that.$message({
              showClose: true,
              message: "账号仅可为数字",
              type: "error"
            });
            return;
          }
        }
      }
      for (var i in this.typeValue) {
        if (that.typeValue[i].value.length < 1) {
          that.$message({
            showClose: true,
            message: that.typeValue[i].name + "不可为空",
            type: "error"
          });
          return;
        }
      }

      if (this.checked == false) {
        that.$message({
          showClose: true,
          message: "请阅读并同意《承诺函1》《承诺函2》",
          type: "error"
        });
        return;
      }
      // //console..log("证件正面", localStorage.getItem("sffzm1"));
      // //console..log("反面", localStorage.getItem("sfzbm2"));
      // //console..log("证件有效期", localStorage.getItem("agent"));
      // //console..log(that.inputs);
      var strp01 = JSON.parse(localStorage.getItem("inputValue"));
      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
        // //console..log(res);
        var data = {
          applyId: res.data.applyId, //初审id
          jbrCname: strp01[0].name, // 经办人姓名：
          jbrMobile: strp01[1].name, // 手机号：
          jbrEmail: strp01[2].name, // 电子邮箱：
          jbrFixedPhone: strp01[3].name, // 固定电话：
          jbrSfz: strp01[4].name, // 经办人身份证号码：
          jbrSfzyxq: localStorage.getItem("agent"), // 身份证有效期：
          jbrSffzm: localStorage.getItem("sffzm1"), // 经办人身份证正面：
          jbrSfzbm: localStorage.getItem("sfzbm2"), // 经办人身份证反面：
          czCname: strp01[5].name, // 商服操作人员 姓名：
          czEmail: strp01[6].name, // 电子邮箱：
          emailCode: strp01[7].name, // 邮箱验证码：
          czMobile: strp01[8].name, // 移动电话：
          shxz: this.typeValue[0].value, // 商户性质： 00-国营 01-集体 02-私营 03-合资 04-股份制 05-其他
          shjyfw: pros.join(","), // 商户经营范围：  00-电商 01-餐饮/食品 02-生活/家居 03-咨询服务 04-票务/旅游 05-教育/培训 06-公益 07-娱乐/健身服务 08-交通运输 09-生活缴费 10-金融 11-其他
          shjyfwqt: that.inputs[0].value, // 商户经营范围其他：
          wzgn: this.radioGname[0], // 网站功能：  00-充值 01-提现 10-以上均无
          thfhfs: this.typeValue[1].value, // 退货返还方式：  00-原路返回银行账户 01-退回注册账户 02-转账方式返还用户 03-现金返还
          stmd: this.radioGname[1], // 商户是否有实体门店：  0-无 1-有
          sfhz: this.radioGname[2], // 是否有其他三方支付机构合作：  0-无 1-有
          sfhzzz: this.radioGname[3], // 是否有与其他第三方支付机构合作后终止合作情况：  0-无 1-有
          jszhmc: that.inputs[1].value, // 结算账户 账户名称：
          jszh: that.inputs[2].value, // 结算帐号：
          lhh: that.inputs[3].value, // 联行号：
          khh: that.inputs[4].value, // 开户行名称：
          sxfsffs: this.typeValue[2].value, // 手续费收费方式：  00-月结 01-实时扣收
          cnsqr: "1" // 承诺函标记：  0-未确认 1-已确认
        };

        //复审
        this.$post(that.$api.api + "/gw/a1/application/reapply", data).then(
          res => {
            loading.close();
            //console..log(res);
            if (res.code == 0) {
              that.$message({
                showClose: true,
                message: "提交成功,请留意审核进度",
                type: "error"
              });
              localStorage.clear();
              localStorage.setItem("username", that.userNumber);
              localStorage.setItem("authorization", that.authorization);
              that.$router.push({ name: "examine" });
            } else if (res.code == "1") {
              that.$message({
                showClose: true,
                message: res.msg,
                type: "error"
              });
            }
          }
        );
      });
    },
    shopType(e) {
      // //console..log(e, this.typeValue);
      localStorage.setItem("typeValue", JSON.stringify(this.typeValue));
    },
    //获取输入值
    getInput(e) {
      if (e == 3) {
        if (!/^[0-9]+$/.test(this.inputs[e].value)) {
          that.$message({
            showClose: true,
            message: "银联号号仅可为数字",
            type: "error"
          });
          return;
        }
      }
      // //console..log(this.inputs[e].value);
      localStorage.setItem("inputsRe", JSON.stringify(this.inputs));
    },
    //多选
    checkedD(e) {
      // //console..log(e, this.checkeds[e]);
      localStorage.setItem("checkedsRe", JSON.stringify(this.checkeds));
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
    }
  },
  created() {
    // this.$get(this.$api.api + "/gw/productcenter/productList").then(res => {
    // if (res.code == 0) {
    //   that.$router.push({ name: "applySecond" });
    // }
    // //console..log(res);
    // });
  },
  mounted() {
    var target = document.getElementById("target");
    target.scrollIntoView();
    if (localStorage.getItem("username")) {
      this.userNumber = localStorage.getItem("username");
    }
    var target = document.getElementById("target");

    if (localStorage.getItem("authorization")) {
      this.authorization = localStorage.getItem("authorization");
    }
    if (localStorage.getItem("inputsRe")) {
      this.inputs = JSON.parse(localStorage.getItem("inputsRe"));
    }
    if (localStorage.getItem("checkedsRe")) {
      this.checkeds = JSON.parse(localStorage.getItem("checkedsRe"));
    }
    if (localStorage.getItem("readioG")) {
      this.radioG = JSON.parse(localStorage.getItem("readioG"));
    }
    if (localStorage.getItem("typeValue")) {
      this.typeValue = JSON.parse(localStorage.getItem("typeValue"));
    }
    if (localStorage.getItem("radioGname")) {
      this.radioGname = JSON.parse(localStorage.getItem("radioGname"));
    }
    if (localStorage.getItem("another")) {
      if (localStorage.getItem("another") == "true") {
        this.another = true;
      }
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

.read-d p a {
  color: #5b9ae4;
  text-decoration: underline;
}
</style>

