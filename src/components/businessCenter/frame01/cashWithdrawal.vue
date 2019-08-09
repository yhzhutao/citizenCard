<template>
  <div>
    <frame/>
    <div style="height:80px;"></div>
    <div class="balance">
      <div class="balance-tit">
        可提现余额：
        <span>￥{{remainingSum|formatAmount}}</span>
      </div>
      <div>
        <p v-if="this.rechargeNum.length>0" class="choiceBank">选择到账卡</p>
        <p v-if="this.rechargeNum.length===0" class="choiceBank">暂无到账卡,请添加</p>
        <ul class="rechargeType" :style="showHide">
          <li
            @click="choiceM(item.name,index)"
            :class="{'rechargeType-ed':item.tr}"
            :key="index"
            v-for="(item,index) in rechargeNum"
          >
            <div class="rechargeTypeLeft flex-start">
              <img :src="imgs" alt/>
              <p>
                {{item.cardName}}
                <span>{{item.cardNo|hideCardNo}}</span>
              </p>
              <span>{{{'C':'贷记卡','D':'借记卡'}[item.subCardType]}}</span>
              <span>| 快捷支付</span>
            </div>
            <div class="rechargeTypeRight">
              <img v-if="item.tr" :src="choiceD" alt/>
            </div>
          </li>
        </ul>
        <div v-if="!ifUp" class="showMe flex-end">
          <div v-if="this.rechargeNum.length>3" style="cursor: pointer;" @click="upDown()" class="flex-end">
            展开
            <img :src="bootom" alt/>
          </div>
        </div>
        <div v-if="ifUp" class="showMe flex-end">
          <div style="cursor: pointer;" @click="upDown()" class="flex-end">
            收起
            <img :src="bootomT" alt/>
          </div>
        </div>
      </div>
      <div class="money flex-start">
        <!--<p>请输入提现金额</p>-->
        <!--<el-input-->
        <!--type="number"-->
        <!--oninput="if(value.length>5)value=value.slice(0,5)"-->
        <!--@input="maxLen(money)"-->
        <!--@blur="getBlue(money)"-->
        <!--style="width:300px;font-size:20px;"-->
        <!--placeholder="请输入"-->
        <!--v-model="money"-->
        <!--clearable-->
        <!--&gt;</el-input>-->
        <!--<span>元</span>-->
        <el-form :inline="true" :model="params" :rules="rules" ref="moneyForm">
          <el-form-item label="请输入提现金额:" prop="money">
            <el-input v-model="params.money" placeholder="提现金额" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="allPAy()">全部提现</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="nowPay">
        <button @click="nowRecharge()">立即提现</button>
      </div>
      <div class="remid">
        请您定期修改密码以保证支付安全
        <span @click="modifyPay()" class="modify">修改密码</span>
      </div>
    </div>
    <el-dialog
      top="35vh"
      width="600px"
      :center="true"
      title="请输入支付密码"
      :visible.sync="dialogTableVisible"
    >
      <div class="kuang">
        <ul class="passwordK">
          <li v-for="(item,index) in number" :key="index">{{item.num}}</li>
        </ul>
        <input @input="getWord()" v-model="wordP" maxlength="6" type="password" class="kuangInput"/>
        <p class="forget" @click="goModifyPwd">忘记支付密码</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import frame from "../public/frame01";
import {withdraw, qryAllBankNo} from '@/apis/frame01'
import {regCollection, encryptByDES, formatDate} from '@/common/utils'
import {getSign} from '@/apis/common'

export default {
  data () {
    return {
      wordP: "",
      ifUp: false,
      money: "",
      params: {},
      money01: "",
      imgs: require("../../../assets/img/16.png"),
      choiceD: require("../../../assets/img/choiceD.png"),
      bootomT: require("../../../assets/img/bootomT.png"),
      bootom: require("../../../assets/img/bottom.png"),
      nums: "",
      mobile: "",
      showHide: {
        height: "310px"
      },
      rechargeNum: [
        // { name: "50", tr: true },
        // { name: "100", tr: false },
        // { name: "300", tr: false },
        // { name: "500", tr: false },
        // { name: "1000", tr: false },
        // { name: "2000", tr: false }
      ],
      number: [
        {num: ""},
        {num: ""},
        {num: ""},
        {num: ""},
        {num: ""},
        {num: ""}
      ],
      dialogTableVisible: false,
      remainingSum: 0, //可提现余额
      rules: {
        money: [{
          validator: (rule, value, callback) => {
            if (value && value !== '') {
              if (!regCollection.positiveInteger.test(value) || (value * 100 > this.remainingSum)) {
                callback(new Error('请输入大于0的整数且不超过账户余额'))
              } else {
                callback()
              }
            } else {
              callback(new Error('请输入提现金额')
              )
            }
          },
          trigger: ['blur']
        }]
      },
      sign: '', //签名
      orderNumber: '',//订单号
      dateTime: '',
      payeeAccount: '',//长卡号
      reqSeq: ''//流水号加签名
    };
  },
  inject: ["reload"],
  components: {
    frame
  },
  methods: {
    goModifyPwd () {
      this.$router.push({name: 'b_frame02', params: {modify: 1}})
    },
    getWord () {
      var pw = this.wordP.split("");
      var number = 6; //输入最大值
      var list = this.number;
      for (var i = 0; i < number; i++) {
        if (pw[i]) {
          list[i].num = "·";
        } else {
          list[i].num = "";
        }
      }
      if (pw.length == 6) {
        this.dialogTableVisible = false;
        this.qryAllBankNo()
      }
    },
    upDown () {
      this.ifUp = !this.ifUp;
      if (this.ifUp == true) {
        this.showHide.height = "100%";
      } else {
        this.showHide.height = "310px";
      }
    },
    allPAy () {
      this.$set(this.params, 'money', parseFloat(this.remainingSum) / 100)
    },
    recharge () {
      this.$router.push({name: "recharge"});
    },
    maxLen (e) {
      //   var val = e.split("");
      //   if (val.length > 5) {
      //     if (0 >= e) {
      //       this.money = "";
      //       return;
      //     } else {
      //       this.money = val.slice(0, 5).join("");
      //     }
      //   }
    },
    getBlue (e) {
      if (e.length > 1) {
        if (0 >= e) {
          this.$notify.error({
            title: "请输入大于0的金额",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
        if (!/^(0|\+?[1-9][0-9]*)$/.test(e)) {
          this.$notify.error({
            title: "提现金额仅可为整数",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
      }
    },
    //选择充值金额
    choiceM (val, index) {
      this.money = val;
      for (var i in this.rechargeNum) {
        // this.rechargeNum[i].tr = false;
        this.$set(this.rechargeNum[i], 'tr', false)
      }
      // this.rechargeNum[index].tr = true;
      this.$set(this.rechargeNum[index], 'tr', true)
    },
    nowRecharge () {
      this.number = [{num: ""},
        {num: ""},
        {num: ""},
        {num: ""},
        {num: ""},
        {num: ""}]
      this.wordP = ''
      if (this.params.money) {
        this.dialogTableVisible = true;
      } else {
        this.$notify.error({
          title: '错误',
          message: '请输入提现金额'
        })
      }
    },
    //获取全卡号
    qryAllBankNo () {
      let shortBankNo = this.rechargeNum.filter((item) => (item.tr))[0].cardNo
      qryAllBankNo({
        version: '1.0.0',
        transCode: 'UP0021',
        reqSeq: this.randomNumber(17),
        chainNo: '008',
        psnId: localStorage.getItem('psnid'),
        shortBankNo
      }).then(res => {
        if (res.respCode === '00') {
          this.payeeAccount = res.bankCardNo
          this.getSign()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.respDesc
          })
        }
      })
    },
    //获取签名
    getSign () {
      // this.payeeAccount = this.rechargeNum.filter((item) => (item.tr))[0].cardNo
      this.dateTime = formatDate()
      this.orderNumber = this.randomNumber(7)
      this.reqSeq = this.randomNumber(17)
      getSign({
        version: '1.0.0',
        transCode: 'WD0001',
        reqSeq: this.reqSeq,
        merCode: '000081',
        chainNo: '008',
        dateTime: this.dateTime,
        orderNo: this.orderNumber,
        amount: (this.params.money * 100).toString(),
        payerPsnId: localStorage.getItem('psnid'),
        busType: 'MAINACC',
        payeeAccount: this.payeeAccount,
        payPassword: encryptByDES(this.wordP),
        ip: '192.168.36.151',
        sign: ''
      }).then(res => {
        if (res.code === 0) {
          this.sign = res.data
          this.withdraw()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    },
    //提现
    withdraw () {
      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      withdraw({
        version: '1.0.0',
        transCode: 'WD0001',
        reqSeq: this.reqSeq,
        merCode: '000081',
        chainNo: '008',
        dateTime: this.dateTime,
        orderNo: this.orderNumber,
        amount: (this.params.money * 100).toString(),
        payerPsnId: localStorage.getItem('psnid'),
        busType: 'MAINACC',
        payeeAccount: this.payeeAccount,
        payPassword: encryptByDES(this.wordP),
        ip: '192.168.36.151',
        sign: this.sign
      }).then(res => {
        loading.close()
        // console.log(888999, res)
        if (res.status === '1') {
          this.$notify.success({
            title: '成功',
            message: '提现成功'
          })
          //刷新页面
          this.reload()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.respDesc
          })
        }
        // this.$router.replace({name: "b_frame01"});
      })
    },
    modifyPay () {
      this.$router.push({name: "b_frame02", params: {modify: 1}});
    },
    //可提现余额查询
    qryWDBalance () {
      this.$axios
        .post(this.HOST + "/qryWDBalance", {
          version: "1.0.0", //版本
          transCode: "WD0002", //交易代码
          chainNo: "001", //渠道号
          reqSeq: this.randomNumber(17), //请求流水号
          psnId: ""
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("可提现余额查询", res);
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
    //获取getPsnId
    getPsnId (id, name) {
      this.$axios
        .post(this.HOST + "/getPsnId", {
          version: "1.0.0", //版本
          transCode: "UP0018", //交易代码
          chainNo: "006", //渠道号
          name: name,
          idCard: id,
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{smid:localStorage.getItem('smid')}
        })
        .then(res => {
          console.log("获取getPsnId", res);
          if (res.data.respCode == "0000") {
            this.qryWDBalance();
          }
        });
    },
    //查询余额
    queryBalance () {
      this.$axios
        .post(this.HOST + "/queryBalance", {
          version: "1.0.0", //版本
          transCode: "UP0031", //交易代码
          chainNo: "008", //渠道号
          idCard: localStorage.getItem('id_no'), //证件号码
          idCardType: 0,
          psnId: "",
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{smid:localStorage.getItem('smid')}
        })
        .then(res => {
          if (res.data.respCode == "00") {
            this.remainingSum = parseFloat(res.data.balanceList[0].amt1)
              + parseFloat(res.data.balanceList[0].amt2)
              + parseFloat(res.data.balanceList[0].amt3)
              + parseFloat(res.data.balanceList[0].amt4)
              + parseFloat(res.data.balanceList[0].amt5)
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.respDesc
            })
          }
        });
    },
    //获取银行卡
    getBankCard () {
      let idCard = localStorage.getItem('id_no')
      this.$axios
        .post(this.HOST + "/qryBindCardList", {
          version: "1.0.0", //版本
          transCode: "UP0032", //交易代码
          chainNo: "008", //渠道号
          busType: "YHK",
          idCardType: "0", //身份证
          idCard, //身份证号
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{smid:localStorage.getItem('smid')}
        })
        .then(res => {
          console.log("获取银行卡", res.data);
          if (res.data.respCode == "00") {
            this.rechargeNum = res.data.cardList;
            if (this.rechargeNum.length > 0) {
              this.$set(this.rechargeNum[0], 'tr', true)
            }
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
            this.getPsnId(res.data.id_no, res.data.name);
          }
        });
    }
  },
  mounted () {
    this.userDtlQuery()
    this.queryBalance()
    //获取银行卡列表
    this.getBankCard()
  }
};
</script>
<style scoped>
  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .flex-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .balance {
    width: 1100px;
    margin: 50px auto;
    border-radius: 10px;
    box-shadow: 0 0 3px 3px #e5e5e5;
    padding: 30px;
  }

  .balance-tit {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 0 0 20px 30px;
    border-bottom: 1px solid #e7e7e7;
  }

  .balance-tit span {
    color: #ff4d39;
  }

  .rechargeType {
    margin: 0 30px;
    overflow: hidden;
  }

  .choiceBank {
    font-size: 18px;
    color: #666666;
    margin: 20px 30px;
  }

  .rechargeType li {
    height: 80px;
    background-color: #ffffff;
    border-radius: 3px;
    margin: 20px 0;
    text-align: center;
    line-height: 50px;
    border: 1px solid #999999;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rechargeTypeLeft img {
    width: 60px;
    margin: 0 30px;
  }

  .rechargeTypeLeft p {
    text-align: left;
    width: 400px;
    font-weight: bold;
    font-size: 18px;
    color: #666666;
  }

  .rechargeTypeLeft span {
    font-size: 18px;
    color: #666666;
  }

  .rechargeType-ed {
    border: 2px solid #62bd72 !important;
  }

  .rechargeTypeRight {
    width: 30px;
    margin-right: 30px;
    height: 35px;
  }

  .rechargeTypeRight img {
    width: 100%;
  }

  .showMe {
    margin: 5px 30px 30px;
    font-size: 16px;
    color: #999999;
    text-align: right;
  }

  .showMe img {
    width: 18px;
    height: 18px;
    margin: 0 2px 0 5px;
  }

  .allPAy {
    color: #999999 !important;
    margin-left: 20px !important;
    cursor: pointer;
    text-decoration: underline;
  }

  .money p {
    margin: 30px;
    color: #666666;
    font-weight: bold;
    font-size: 16px;
  }

  .money span {
    color: #999999;
    margin-left: 5px;
    font-size: 15px;
  }

  .nowPay {
    text-align: center;
    margin: 100px auto 20px;
  }

  .nowPay button {
    background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
    width: 180px;
    height: 40px;
    text-align: center;
    border-radius: 100px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }

  /* 密码框 */
  .kuang {
    position: relative;
  }

  .passwordK {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    border-top: 1px solid #666666;
    padding-top: 30px;
  }

  .passwordK li {
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 2px solid #666666;
    font-size: 50px;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
    color: #000000;
  }

  .kuangInput {
    position: absolute;
    left: 75px;
    top: 35px;
    width: 350px;
    height: 50px;
    font-size: 50px;
    opacity: 0;
  }

  /* 忘记密码 */
  .forget {
    width: 100px;
    margin: 20px auto 0;
    text-align: center;
    font-size: 15px;
    color: #4a90e2;
    text-decoration: underline;
    cursor: pointer;
  }

  .remid {
    text-align: center;
    font-size: 14px;
    color: #999999;
    margin-bottom: 40px;
  }

  .modify {
    text-decoration: underline;
    cursor: pointer;
  }

  .modify:hover {
    color: #4a90e2 !important;
  }
</style>
