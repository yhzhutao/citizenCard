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
            <div class="list-right another block-one">
              <div class="block block-one">
                <el-checkbox
                  v-for="(item,index) in checkeds"
                  :key="index"
                  @change="checkedD(index)"
                  v-model="item.va"
                >{{item.name}}</el-checkbox>
              </div>
              <div>
                <el-checkbox @change="chAnother()" v-model="another">其它</el-checkbox>
                <el-input
                  @input="getInput(0)"
                  style="width:220px;margin-top:10px;"
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
              <el-radio @change="readioChange(0,'00')" v-model="radioG[0]" label="00">充值</el-radio>
              <el-radio @change="readioChange(0,'01')" v-model="radioG[0]" label="01">提现</el-radio>
              <el-radio @change="readioChange(0,'10')" v-model="radioG[0]" label="10">以上均无</el-radio>
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
              <el-radio @change="readioChange(1,'0')" v-model="radioG[1]" label="0">否</el-radio>
            </div>
          </li>
          <li>
            <div class="list-left mer-d1">
              <p class="mandatory"></p>
              <p>目前是否与其他第三方支付机构合作</p>
            </div>
            <div class="list-right">
              <el-radio @change="readioChange(2,'1')" v-model="radioG[2]" label="1">是</el-radio>
              <el-radio @change="readioChange(2,'0')" v-model="radioG[2]" label="0">否</el-radio>
            </div>
          </li>
          <li>
            <div class="list-left mer-d">
              <p class="mandatory"></p>
              <p>是否有与其他第三方支付机构合作后终止合作情况</p>
            </div>
            <div class="list-right">
              <el-radio @change="readioChange(3,'1')" v-model="radioG[3]" label="1">是</el-radio>
              <el-radio @change="readioChange(3,'0')" v-model="radioG[3]" label="0">否</el-radio>
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
                style="width:220px;"
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
                style="width:220px;"
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
                  style="width:220px;"
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
                style="width:220px;"
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
      <div class="container">
        <div class="read-d">
          <el-checkbox v-model="checked"></el-checkbox>
          <p>
            同意并阅读
            <router-link :to="{name:'promise01',params:{id:1}}">《承诺函1》</router-link>与
            <router-link :to="{name:'promise01',params:{id:2}}">《承诺函2》</router-link>的内容
          </p>
        </div>
        <button @click="submit()" class="next-d">确认申请</button>
      </div>
    </div>
    <!-- <footerF></footerF> -->
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
        { name: "娱乐/健身服务", va: false, id: "07" },
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
      // ////console..log(this.another);
      localStorage.setItem("another", this.another);
    },
    //几种单选
    readioChange(e, v) {
      this.radioGname[e] = v;
      ////console..log(this.radioGname);
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
      // ////console..log(pros.join(","), this.typeValue, this.radioGname);
      if (pros.length < 1 && that.inputs[0].value.length < 1) {
        this.$notify.error({
          title: "商户经营范围不可为空",
          message: "请选择",
          position: "bottom-right"
        });
        return;
      }

      for (var j in that.inputs) {
        if (j == 0) {
          if (that.another == true) {
            if (that.inputs[0].value.length < 1) {
              that.$notify.error({
                title: "您已勾选 其它 ",
                message: "请输入内容【商户经营范围】",
                position: "bottom-right"
              });
              return;
            }
            pros.push("11");
          }
        } else if (that.inputs[j].value.length < 1) {
          that.$notify.error({
            title: that.inputs[j].name + "不可为空",
            message: "请填写",
            position: "bottom-right"
          });
          return;
        }
      }
      for (var e in that.inputs) {
        if (e == 1) {
          if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.inputs[e].value)) {
            this.$notify.error({
              title: "请输入正确的账户名称",
              message: "请修改",
              position: "bottom-right"
            });
            return;
          }
        }
        if (e == 2 || e == 3) {
          if (!/^[0-9]+$/.test(this.inputs[e].value)) {
            this.$notify.error({
              title: "账号仅可为数字",
              message: "请修改",
              position: "bottom-right"
            });
            return;
          }
        }
      }
      for (var i in this.typeValue) {
        if (that.typeValue[i].value.length < 1) {
          this.$notify.error({
            title: that.typeValue[i].name + "不可为空",
            message: "请选择",
            position: "bottom-right"
          });
          return;
        }
      }

      if (this.checked == false) {
        that.$notify.error({
          title: "请阅读并同意",
          message: "《承诺函1》《承诺函2》",
          position: "bottom-right"
        });
        return;
      }
      // ////console..log("证件正面", localStorage.getItem("sffzm1"));
      // ////console..log("反面", localStorage.getItem("sfzbm2"));
      // ////console..log("证件有效期", localStorage.getItem("agent"));
      // ////console..log(that.inputs);
      var strp01 = JSON.parse(localStorage.getItem("inputValue"));
      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
        // ////console..log(res);
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
        // ////console..log(data);
        
        //复审
        this.$post(that.$api.api + "/gw/a1/application/reapply", data).then(
          res => {
            loading.close();
            ////console..log(res);
            if (res.code == 0) {
              this.$notify({
                title: "提交成功",
                message: "请留意审核进度",
                type: "success",
                position: "bottom-right"
              });
              localStorage.clear();
              localStorage.setItem("username", that.userNumber);
              localStorage.setItem("authorization", that.authorization);
              that.$router.push({ name: "examine" });
            } else if (res.code == "1") {
              this.$notify.error({
                title: "错误",
                message: res.msg,
                position: "bottom-right"
              });
            }
          }
        );
      });
    },
    shopType(e) {
      // ////console..log(e, this.typeValue);
      localStorage.setItem("typeValue", JSON.stringify(this.typeValue));
    },
    //获取输入值
    getInput(e) {
      if (e == 3) {
        if (!/^[0-9]+$/.test(this.inputs[e].value)) {
          this.$notify.error({
            title: "银联号号仅可为数字",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
      // ////console..log(this.inputs[e].value);
      localStorage.setItem("inputsRe", JSON.stringify(this.inputs));
    },
    //多选
    checkedD(e) {
      // ////console..log(e, this.checkeds[e]);
      localStorage.setItem("checkedsRe", JSON.stringify(this.checkeds));
    },
    handleChange(value) {
      // ////console..log(value);
    },
    handleRemove(file, fileList) {
      // ////console..log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //商户经营范围
    shjyfwD(da) {
      var newK = da.replace(/\s*/g,"").split(",");
      var checkeds = this.checkeds;
      // ////console..log(newK);
      for (var i in checkeds) {
        for (var j in newK) {
          if (checkeds[i].id == newK[j]) {
            this.checkeds[i].va = true;
          }
        }
      }
    }
  },
  created() {
    // this.$get(this.$api.api + "/gw/productcenter/productList").then(res => {
    // if (res.code == 0) {
    //   that.$router.push({ name: "applySecond" });
    // }
    // ////console..log(res);
    // });
  },
  mounted() {
    var target = document.getElementById("target");
    target.scrollIntoView();
    this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
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
      if (res.code == "0") {
        this.inputs[1].value = res.data.jszhmc; //账户名称
        this.inputs[2].value = res.data.jszh; //结算账号
        this.inputs[3].value = res.data.lhh; //联行号
        this.inputs[4].value = res.data.khh; //开户行名称
        //其它
        if (res.data.shjyfwqt) {
          this.inputs[0].value = res.data.shjyfwqt;
          this.another = true;
        }
        // 商户性质
        this.typeValue[0].value = res.data.shxz;

        // 退货返还方
        this.typeValue[1].value = res.data.thfhfs;
        // 手续费收费方式
        this.typeValue[2].value = res.data.sxfsffs;
        //商户经营范围
        this.shjyfwD(res.data.shjyfw);
        //商户是否有实体门店
        this.radioG[1] = res.data.stmd;
        //是否有其他三方支付机构合作
        this.radioG[2] = res.data.sfhz;
        //是否有与其他第三方支付机构合作后终止合作情况
        this.radioG[3] = res.data.sfhzzz;
        //网站功能
        this.radioG[0] = res.data.wzgn;
      }
    });
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
  margin: 10px 20px 10px 0;
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
  font-size: 14px;
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
.another {
  flex-direction: column;
  align-items: flex-start;
}
.mer-d1 {
  width: 262px;
}
.mer-d {
  width: 348px;
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
.read-d p a {
  color: #5b9ae4;
  text-decoration: underline;
}
</style>
