<template>
  <div class="bank">
    <div class="container nameBorder">
      <p class="name-tit">银行卡认证</p>
      <ul class="input-ul">
        <!-- 银行卡号 -->
        <li>
          <div class="input-left display-end">
            <p class="input-left-p1"></p>
            <p class="input-left-p2">银行卡号</p>
          </div>
          <div style="position: relative;" class="input-right display-start">
            <div class="bankAdv">{{bankAdv}}</div>
            <el-input
              @change="getInput(0)"
              @blur="getBlur(0)"
              style="width:300px;"
              placeholder="请输入"
              type="number"
              oninput="if(value.length>19)value=value.slice(0,19)"
              v-model="name[0].value"
              clearable
            ></el-input>
          </div>
        </li>
        <!-- 持卡人姓名 -->
        <li>
          <div class="input-left display-end">
            <p class="input-left-p1"></p>
            <p class="input-left-p2">持卡人姓名</p>
          </div>
          <div class="input-right display-start">
            <el-input
              @change="getInput(1)"
              @blur="getBlur(1)"
              style="width:300px;"
              placeholder="请输入"
              maxlength="10"
              v-model="name[1].value"
              clearable
              :disabled="true"
            ></el-input>
          </div>
        </li>
        <!-- 身份证号 -->
        <li>
          <div class="input-left display-end">
            <p class="input-left-p1"></p>
            <p class="input-left-p2">证件号码 (二代身份证)</p>
          </div>
          <div class="input-right display-start">
            <el-input
              @change="getInput(2)"
              @blur="getBlur(2)"
              style="width:300px;"
              maxlength="18"
              placeholder="请输入"
              v-model="name[2].value"
              clearable
              :disabled="true"
            ></el-input>
          </div>
        </li>
        <!-- 手机号 -->
        <li>
          <div class="input-left display-end">
            <p class="input-left-p1"></p>
            <p class="input-left-p2">手机号</p>
          </div>
          <div class="input-right display-start">
            <el-input
              @change="getInput(3)"
              @blur="getBlur(3)"
              style="width:300px;"
              placeholder="请输入"
              v-model="name[3].value"
              type="number"
              oninput="if(value.length>11)value=value.slice(0,11)"
              clearable
            ></el-input>
          </div>
        </li>
        <!-- 验证吗 -->
        <li>
          <div class="input-left display-end">
            <p class="input-left-p1"></p>
            <p class="input-left-p2">验证码</p>
          </div>
          <div class="input-right display-start">
            <el-input
              @change="getInput(4)"
              @blur="getBlur(4)"
              style="width:180px;"
              placeholder="请输入"
              v-model="name[4].value"
              type="number"
              oninput="if(value.length>6)value=value.slice(0,6)"
              clearable
            ></el-input>
            <button @click="getCode()" class="code">{{codetext}}</button>
            <!--<el-col :span="3" :offset="1">-->
              <!--<el-button type="success" @click="getCode()">获取验证码</el-button>-->
            <!--</el-col>-->
          </div>
        </li>
      </ul>
      <div class="promise">
        <el-checkbox style="margin-right:0;" v-model="checked">已阅读并同意</el-checkbox>
        <span
              @click="openUrl('https://mobilepay.96225.com/exthtml/agreement/kuaijiezhifuxieyi.html')"
        >《快捷支付协议》</span>
      </div>
      <!--<div @click="goNext()" class="next-go" :disable="!checked">下一步</div>-->
      <el-row>
        <el-col :span="5" :offset="10">
          <el-button @click="goNext()" type="success" :disabled="!checked">下一步</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      codetext: "获取验证码",
      codeTime: 60,
      isNot: false,
      checked: true,
      bankAdv: "",
      bankInfo: "",
      psnid: "",
      name: [
        {value: "", name: "银行卡号"},
        {value: "", name: "持卡人姓名"},
        {value: "", name: "身份证号码"},
        {value: "", name: "手机号"},
        {value: "", name: "验证码"}
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      bankno: ""
    };
  },
  methods: {
    getInput (e) {
      // console.log(this.name[e].value);
    },
    getBlur (e, name) {
      if (e == 0) {
        if (this.name[e].value.length > 1) {
          this.getBankInfo();
        }
      }
      if (e == 1) {
        if (
          !/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,10}$/.test(this.name[e].value)
        ) {
          this.$notify.error({
            title: "真实姓名错误",
            message: "请修改"
            // position: "bottom-right"
          });
          return;
        }
      }
      if (e == 2) {
        if (
          !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.name[e].value)
        ) {
          this.$notify.error({
            title: "身份证号格式错误",
            message: "请修改"
            // position: "bottom-right"
          });
          return;
        }
      }
      if (e == 3) {
        if (!/^1[3456789]\d{9}$/.test(this.name[e].value)) {
          this.$notify.error({
            title: "手机号格式错误",
            message: "请修改"
            // position: "bottom-right"
          });
          return;
        } else {
          if (name == "go") {
            this.signBank();
          }
        }
      }
    },
    //获取银行信息
    getBankInfo () {
      this.$axios
        .post(this.HOST + "/getBankInfo", {
          version: "1.0.0", //版本
          transCode: "UP0005", //交易代码
          chainNo: "008", //渠道号
          reqSeq: this.randomNumber(17), //请求流水号
          cardNo: this.name[0].value
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("获取银行信息", res);
          // bankName: "招商银行"
          // bankShortName: "cmb"
          // cardType: "D"
          if (res.data.isSupport == "0") {
            this.bankAdv = res.data.respDesc;
            this.bankInfo = false;
          } else {
            this.bankAdv = "";
            this.bankInfo = res.data;
            for (var i in this.qrybanksupport) {
              if (res.data.bankName == this.qrybanksupport[i].bankname) {
                this.bankno = this.qrybanksupport[i].bankno;
              }
            }
          }
        });
    },
    //获取流水号
    randomNumber (len) {
      var day = new Date().getTime().toString();
      var len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZ0123456789";
      var maxPos = chars.length;
      var pwd = "";
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd + day;
    },
    //绑卡
    bind_user_card () {
      if (this.bankInfo == false) {
        this.$notify.error({
          title: "不支持改银行卡",
          message: "请更换"
          // position: "bottom-right"
        });
        this.bankAdv = "不支持改银行卡，请更换";
        return;
      } else {
        this.bankAdv = "";
      }
      // return
      this.$axios
        .post(
          this.SEVER,
          {
            user_id: localStorage.getItem("user_id"),
            user_system: "0035",
            card_type: "01", //卡的种类
            card_no: this.name[0].value, //卡号
            id_type: "01", //证件类型
            id_no: this.name[2].value, //证件号码
            mobile: this.name[3].value, //手机号码
            nickname: this.name[1].value, //姓名
            bank_no: this.bankno, //银行号
            bank_name: this.bankInfo.bankName
          },
          {
            headers: {
              _si: "TRA003010111",
              _cn: "IFSP01",
              _tn: this.randomNumber(17),
              smid:localStorage.getItem('smid')
            }
          }
        )
        .then(res => {
          console.log("绑卡", res);
          if (res.data.code == "0000") {
            this.$notify({
              title: "绑卡交易处理成功",
              message: " ",
              type: "success"
              // position: "bottom-right"
            });
            this.$router.push({name: "b_frame01"});
          } else if (res.data.code == "0001") {
            this.$notify.error({
              title: res.data.message,
              message: "请修改"
              // position: "bottom-right"
            });
          } else {
            this.$notify.error({
              title: res.data.message,
              message: "请修改"
              // position: "bottom-right"
            });
          }
        });
    },
    //点击绑卡
    goNext () {
      for (var i in this.name) {
        console.log(this.name[i].name, this.name[i].value);
        if (this.name[i].value.length < 1) {
          this.$notify.error({
            title: this.name[i].name + "不可为空",
            message: "请填写"
            // position: "bottom-right"
          });
          return;
        }
        this.getBlur(i, "go");
      }
      return;
    },
    //发送验证码
    getCode () {
      if (!/^1[3456789]\d{9}$/.test(this.name[3].value)) {
        this.$notify.error({
          title: "手机号格式错误",
          message: "请修改"
          // position: "bottom-right"
        });
        return;
      }
      var that = this;
      var times = that.codeTime;
      if (that.codetext !== "获取验证码") {
        return;
      } else {
        var ti = setInterval(function () {
          times--;
          that.codetext = times + "s后获取";
          if (times < 1) {
            clearInterval(ti);
            that.codetext = "获取验证码";
          }
        }, 1000);
        this.$axios
          .post(
            this.SEVER ,
            {
              mobile: this.name[3].value,
              business_type: "08" //快捷绑定
            },
            {
              headers: {
                _si: "TRA003010152",
                _cn: "IFSP01",
                _tn: this.randomNumber(17),
                smid:localStorage.getItem('smid')
              }
            }
          )
          .then(res => {
            console.log("发送验证码", res);
            if (res.data.code == "0000") {
              this.$notify({
                title: res.data.message,
                message: "请注意查收",
                type: "success"
              });
            } else {
              clearInterval(ti);
              this.$notify.info({
                title: res.data.message,
                message: ""
                // position: "bottom-right"
              });
            }
          });
      }
    },
    //验证 验证码
    verify_sms_code () {
      this.$axios
        .post(
          this.SEVER,
          {
            mobile: this.name[3].value,
            business_type: "08", //快捷绑定
            veri_code: this.name[4].value
          },
          {
            headers: {
              _si: "TRA003010153",
              _cn: "IFSP01",
              _tn: this.randomNumber(17),
              smid:localStorage.getItem('smid')
            }
          }
        )
        .then(res => {
          console.log("验证  验证码", res);
          if (res.data.code == "0000") {
            this.bind_user_card();
          } else {
            this.$notify.error({
              title: res.data.desc,
              message: ""
              // position: "bottom-right"
            });
          }
          // this.bind_user_card()
        });
    },
    //查看快捷支付协议
    openUrl (url) {
      window.open(url);
    },
    //签约
    signBank () {
      this.$axios
        .post(this.HOST + "/sign", {
          version: "1.0.1", //版本
          transCode: "UP0011", //交易代码
          chainNo: "008", //渠道号
          // name: this.bankInfo.bankName, //银行卡户名
          name: this.name[1].value,//姓名
          certType: 0, //证件类型
          certNo: this.name[2].value, //证件号码
          phone: this.name[3].value, //银行预留手机号
          cardType: "YHK", //银行卡
          subCardType: "D", //D：借记卡；C：贷记卡
          cardNo: this.name[0].value, //银行卡号
          psnid: this.psnid, //商户号
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("签约", res);
          //token 20190719113458000011959830
          if (res.data.respCode == "00") {
            if (res.data.smsFlag == "1") {
              this.verify_sms_code();
            } else {
              this.bind_user_card();
            }
          } else {
            this.$notify.error({
              title: res.data.respDesc,
              message: "请修改"
              // position: "bottom-right"
            });
          }
        });
    },
    //可用银行列表
    qrybanksupport () {
      this.$axios
        .post(this.HOST + "/qrybanksupport", {
          version: "1.0.0", //版本
          transCode: "UP0006", //交易代码
          chainNo: "008", //渠道号
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("可用银行列表", res);
          if (res.data.respCode == "00") {
            this.qrybanksupport = res.data.bankCards;
          }
        });
    },
    //查询用户资料
    userDtlQuery () {
      this.$axios
        .post(
          this.SEVER,
          {user_id: localStorage.getItem("user_id")},
          {
            headers: {
              _si: "TRA003010136",
              _cn: "IFSP01",
              _tn: this.randomNumber(17),
              smid:localStorage.getItem('smid')
            }
          }
        )
        .then(res => {
          console.log("查询用户信息", res);
          if (res.data.code == "0000") {
            this.name[1].value = res.data.name;
            this.name[2].value = res.data.id_no;
            this.createAccount(res.data.name, res.data.id_no);
          }
        });
    },
    //获取psnid (开通支付账户)
    createAccount (name, id) {
      this.$axios
        .post(this.HOST + "/createAccount", {
          version: "1.0.1", //版本
          transCode: "UP0008", //交易代码
          chainNo: "008", //渠道号
          reqSeq: this.randomNumber(17), //请求流水号
          idnumber: id, //证件号码
          name: name, //姓名
          userid: localStorage.getItem("user_id"),
          mobile: localStorage.getItem("userNumber")
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("获取psnid (开通支付账户)", res);
          if (res.data.respCode == "00") {
            this.psnid = res.data.psnid;
          }
        });
    }
  },
  mounted () {
    this.randomNumber(17);
    this.qrybanksupport();
    this.userDtlQuery();
  }
};
</script>
<style scoped lang="scss">
  .bank {

    .display-end {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .display-start {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .nameBorder {
      border-radius: 15px;
      padding: 30px;
      margin: 50px auto;
      box-shadow: #e5e5e5 0 0 10px;
    }

    .input-ul li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 30px 0;
    }

    .input-left {
      width: 170px;
      margin-right: 32px;
    }

    .input-left-p1 {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255, 64, 43, 1);
      margin-right: 5px;
    }

    .input-left-p2 {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    .name-tit {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      padding: 0 0 20px 30px;
      border-bottom: 1px solid #e7e7e7;
    }

    .forgetP {
      width: 130px;
      color: #62bd72;
      font-size: 14px;
      margin-left: 20px;
    }

    .next-go {
      text-align: center;
      margin: 50px auto 0;
      width: 180px;
      height: 40px;
      border-radius: 100px;
      line-height: 40px;
      background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }

    /* 获取验证码 */
    .code {
      width: 100px;
      height: 38px;
      margin-left: 18px;
      color: #ffffff;
      font-size: 14px;
      border-radius: 5px;
      cursor: pointer;
      background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
    }

    .promise {
      text-align: center;
      padding-top: 30px;
      margin-bottom: 30px;
    }

    .promise span {
      color: #4a90e2;
      font-size: 15px;
      cursor: pointer;
    }

    .bankAdv {
      font-size: 13.5px;
      color: red;
      position: absolute;
      top: 45px;
      left: 15px;
    }
  }
</style>
