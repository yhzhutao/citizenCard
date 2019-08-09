<template>
  <div>
    <frame/>
    <div style="height:80px;"></div>
    <div class="balance">
      <div class="balance-tit">
        <p>
          商品名称：
          <span>{{payname}}</span>
        </p>
        <p>
          订单金额：
          <span style="color:#FF4D39;font-size:18px;">￥</span>
          <span style="color:#FF4D39;font-weight:bold;font-size:22px;">{{payMoney}}</span>
        </p>
      </div>
      <div>
        <p v-if="descFlag" class="choiceBank">选择支付方式</p>
        <p v-if="!descFlag" class="choiceBank">暂无可支付方式,请添加新卡</p>
        <ul class="rechargeType" :style="showHide">
          <li
            @click="choiceFirst"
            v-if="surplus.balance"
            :class="{'rechargeType-ed':firstFlag}"
          >
            <div class="rechargeTypeLeft flex-start">
              <img :src="rmb" alt="" style="width: 60px;margin-left: 30px">
              <!--{{surplus}}-->
              <p>互联网账户余额：￥{{surplus.balance|formatAmount}}</p>
            </div>
            <div class="rechargeTypeRight">
              <img v-if="firstFlag" :src="choiceD" alt/>
            </div>
          </li>
          <li
            @click="choiceM(item.name,index)"
            :class="{'rechargeType-ed':item.tr}"
            :key="index"
            v-for="(item,index) in rechargeNum"
          >
            <div class="rechargeTypeLeft flex-start">
              <!--<img :src="item.img" alt/>-->
              <img :src="imgs" alt/>
              <p>
                {{item.cardName}}
                <span>({{item.cardNo|hideCardNo}})</span>
              </p>

              <!--<span>{{item.tit}}</span>-->
              <span>{{{'C':'贷记卡','D':'借记卡'}[item.subCardType]}}</span>
              <span>| 快捷支付</span>
            </div>
            <div class="rechargeTypeRight">
              <img v-if="item.tr" :src="choiceD" alt/>
            </div>
          </li>
        </ul>
        <div v-if="!ifUp" class="showMe space-between">
          <div
            @click="addBankCard()"
            style="cursor:pointer;border:1px solid #999999;border-radius:5px;padding:8px;"
            class="flex-start"
          >
            <img :src="addBank" alt/>
            <p style="width:5px;"></p>添加新卡
          </div>
          <div v-if="rechargeNum.length>3" style="cursor: pointer;" @click="upDown()" class="flex-end">
            展开
            <img :src="bootom" alt/>
          </div>
        </div>
        <div v-if="ifUp" class="showMe space-between">
          <div
            @click="addBankCard()"
            style="cursor:pointer;border:1px solid #999999;border-radius:5px;padding:8px;"
            class="flex-start"
          >
            <img :src="addBank" alt/>
            <p style="width:5px;"></p>添加新卡
          </div>
          <div style="cursor: pointer;" @click="upDown()" class="flex-end">
            收起
            <img :src="bootomT" alt/>
          </div>
        </div>
      </div>

      <div class="nowPay">
        <button @click="nowRecharge()">立即支付</button>
      </div>
      <div class="remid">
        请您定期修改密码以保证支付安全
        <span @click="modifyPay()" class="modify">修改密码</span>
      </div>
    </div>
    <!--<el-dialog-->
    <!--top="35vh"-->
    <!--width="600px"-->
    <!--:center="true"-->
    <!--title="请输入支付密码"-->
    <!--:visible.sync="dialogTableVisible"-->
    <!--&gt;-->
    <!--<div class="kuang">-->
    <!--<ul class="passwordK">-->
    <!--<li v-for="(item,index) in number" :key="index">{{item.num}}</li>-->
    <!--</ul>-->
    <!--<input @input="getWord()" v-model="wordP" maxlength="6" type="password" class="kuangInput"/>-->
    <!--<p class="forget">忘记支付密码</p>-->
    <!--</div>-->
    <!--</el-dialog>-->
    <el-dialog
      top="35vh"
      width="600px"
      :center="true"
      title="验证码"
      :visible.sync="dialogTableVisible">
      <el-form :inline="true">
        <el-row>
          <el-col :span="14" :offset="2">
            <el-form-item>
              <el-input v-model="verCode" placeholder="请输入验证码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button @click="pay">获取验证码</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="10">
            <el-button type="success" @click="payAction">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import frame from "../public/frame01";
import {pay, qryPayway} from '@/apis/frame01.js'
import {formatDate, formatMoney} from '@/common/utils'
import {getSign, wasuKDPaymentTotal, addWasuChargeOrder} from '@/apis/common'

export default {
  data () {
    return {
      wordP: "",
      ifUp: false,
      money: "",
      money01: "",
      payname: "",
      payMoney: 0,
      imgs: require("../../../assets/img/16.png"),
      rmb: require("../../../assets/img/money.png"),
      choiceD: require("../../../assets/img/choiceD.png"),
      bootomT: require("../../../assets/img/bootomT.png"),
      bootom: require("../../../assets/img/bottom.png"),
      addBank: require("../../../assets/img/addImg.png"),
      nums: "",
      mobile: "",
      showHide: {
        height: "310px"
      },
      rechargeNum: [
        // {
        //   img: require("../../../assets/img/money.png"),
        //   bank: "互联网账户余额 100.00",
        //   tit: "余额支付",
        //   tr: false
        // },
        // {
        //   img: require("../../../assets/img/16.png"),
        //   bank: "上海浦发银行（899）",
        //   tit: "储蓄卡 | 快捷支付",
        //   tr: false
        // },
        // {
        //   img: require("../../../assets/img/16.png"),
        //   bank: "上海浦发银行（899）",
        //   tit: "储蓄卡 | 快捷支付",
        //   tr: false
        // },
        // {
        //   img: require("../../../assets/img/16.png"),
        //   bank: "上海浦发银行（899）",
        //   tit: "储蓄卡 | 快捷支付",
        //   tr: false
        // },
        // {
        //   img: require("../../../assets/img/16.png"),
        //   bank: "上海浦发银行（899）",
        //   tit: "储蓄卡 | 快捷支付",
        //   tr: false
        // },
        // {
        //   img: require("../../../assets/img/16.png"),
        //   bank: "上海浦发银行（899）",
        //   tit: "储蓄卡 | 快捷支付",
        //   tr: false
        // }
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
      mersign: '',
      cardTokenList: [],
      surplus: {},//账户余额的单条数据,
      orderNo: '',//订单号
      dateTime: '',
      firstFlag: true,//账户余额是否显示
      phoneToken: '', //第二次请求pay接口时需要传入的参数
      verCode: '',//用于支付的验证码,
      descFlag: 'true'
    };
  },
  components: {
    frame
  },
  mounted () {
    //获取cardtoken 获取支付方式
    this.qryPayway()

    //获取可支付途径
    // this.getBankCard()
    // if (this.$route.params.money) {
    //   this.payMoney = this.$route.params.money;
    //   this.payname = this.$route.params.payname;
    // }
    // if (this.$route.params.payname == "余额充值") {
    //   this.rechargeNum.splice(0, 1);
    // }
    this.payMoney = localStorage.getItem('money')
    this.payname = localStorage.getItem('payname')
  },
  methods: {
    choiceFirst () {
      for (var i in this.rechargeNum) {
        this.$set(this.rechargeNum[i], 'tr', false)
      }
      this.firstFlag = true
    },
    getSign () {
      let cardnumber = ''
      let cardToken = ''
      let goods = ''
      let mertxtypeid = ''
      if (this.firstFlag) {
        console.log(111111)
        cardToken = this.surplus.cardToken
      } else {
        console.log(22222222)
        cardnumber = this.rechargeNum.filter((item) => item.tr)[0].cardNo
        cardToken = this.rechargeNum.filter((item) => item.tr)[0].cardToken
      }
      console.log(cardnumber)
      console.log(cardToken)
      if (localStorage.getItem('flag') === '1') {
        goods = '账户充值'
        mertxtypeid = 'PSRC'
      } else {
        goods = '华数充值'
        mertxtypeid = 'PSTX'
      }
      this.orderNo = this.randomNumber(7)
      this.dateTime = formatDate()
      getSign({
        version: '1.0.0',// 版本
        transCode: 'UP0002',// 交易代码
        reqSeq: this.randomNumber(17), //流水号
        merCode: '000081',//商户号
        chainNo: '008',
        psnid: localStorage.getItem('psnid'),
        mertxtypeid,
        cardnumber, //卡号
        orderNo: this.orderNo, //订单号
        amount: formatMoney(this.payMoney),//交易金额
        goods,//商品信息
        dateTime: this.dateTime,
        mersign: this.mersign,
        cardToken
      }).then(res => {
        if (res.code === 0) {
          this.mersign = res.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      })
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
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("获取银行卡", res.data);
          if (res.data.respCode == "00") {
            this.rechargeNum = res.data.cardList;
          }
        });
    },
    nowRecharge () {
      this.dialogTableVisible = true;
      this.verCode = ''
      //获取支付接口需要的数据签名
      this.getSign()
    },
    addBankCard () {
      this.$router.push('/bindingBankCards');
    },
    getWord () {
      console.log(this.wordP)
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

        // setTimeout(() => {
        //   loading.close();
        //   this.$router.replace({name: "payState"});
        // }, 1000);
        //支付
        this.pay()
      }
    },
    //获取cardToken
    qryPayway () {
      qryPayway({
        version: '1.0.1',
        transCode: 'UP0003',
        reqSeq: this.randomNumber(17),
        merCode: '000081',
        chainNo: '008',
        psnid: localStorage.getItem('psnid')
      }).then(res => {
        if (res.respCode === '00') {
          if (localStorage.getItem('flag') === '1') {
            // this.rechargeNum = res.cardList
            if (res.cardList) {
              this.rechargeNum = res.cardList.filter((item) => item.cardType === 'YHK')
              this.$set(this.rechargeNum[0], 'tr', true)
              this.firstFlag = false
            } else {
              this.descFlag = false
            }
          } else {
            if (res.cardList) {
              this.rechargeNum = res.cardList.filter((item) => item.cardType === 'YHK')
              this.surplus = res.cardList.filter((item) => item.cardType === 'ACC')[0]
            } else {
              this.descFlag = false
            }
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: res.respDesc
          })
        }
      })
    },
    payAction () {
      let cardnumber = ''
      let cardToken = ''
      let goods = ''
      let mertxtypeid = ''
      if (this.firstFlag) {
        cardToken = this.surplus.cardToken
      } else {
        cardnumber = this.rechargeNum.filter((item) => item.tr)[0].cardNo
        cardToken = this.rechargeNum.filter((item) => item.tr)[0].cardToken
      }
      if (localStorage.getItem('flag') === '1') {
        goods = '充值'
        mertxtypeid = 'PSRC'
      } else {
        goods = '消费'
        mertxtypeid = 'PSTX'
      }
      // let cardnumber = this.rechargeNum.filter((item) => item.tr)[0].cardNo
      // let cardToken = this.rechargeNum.filter((item) => item.tr)[0].cardToken
      if (this.verCode) {
        pay({
          version: '1.0.0',// 版本
          transCode: 'UP0002',// 交易代码
          reqSeq: this.randomNumber(17), //流水号
          merCode: '000081',//商户号
          chainNo: '008',
          psnid: localStorage.getItem('psnid'),
          mertxtypeid,
          cardnumber, //卡号
          orderNo: this.orderNo, //订单号
          amount: formatMoney(this.payMoney),//交易金额
          goods,//商品信息
          dateTime: this.dateTime,
          mersign: this.mersign,
          cardToken,
          phoneToken: this.phoneToken,
          verCode: this.verCode
        }).then(res => {
          if (res.respCode === '00') {
            if (localStorage.getItem('flag') === '1') {
              if (res.status === '1') {
                this.$notify.success({
                  title: '成功',
                  message: '充值成功'
                })
              }
              if (res.status === '3') {
                this.$notify.success({
                  title: '成功',
                  message: '充值处理中,请稍候'
                })
              }
              this.$router.push('/b_frame01')
            } else {
              //这里调用addWasuChargeOrder接口
              this.addWasuChargeOrder()
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: res.respDesc
            })
          }
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '验证码不能为空'
        })
      }
    },

    addWasuChargeOrder () {
      wasuKDPaymentTotal({accountId: localStorage.getItem('accountId')}).then(res => {
        if (res.code === 0) {
          this.dialogTableVisible = true
          let account = res.data
          account = Object.assign({}, account, {
            'userId': localStorage.getItem('user_id'),
            price: this.payMoney * 100,
            payOrderId: this.orderNo
          })
          addWasuChargeOrder(account).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$notify.success({
                title: '成功',
                message: '缴费成功'
              })
              this.$router.push('/b_frame01')
            } else {
              this.$notify.error({
                title: '错误',
                message: res.msg
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    },
    pay () {
      const loading = this.$loading({
        lock: true,
        text: "请稍后 ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      let cardnumber = ''
      let cardToken = ''
      let goods = ''
      let mertxtypeid = ''
      if (this.firstFlag) {
        cardToken = this.surplus.cardToken
      } else {
        cardnumber = this.rechargeNum.filter((item) => item.tr)[0].cardNo
        cardToken = this.rechargeNum.filter((item) => item.tr)[0].cardToken
      }
      if (localStorage.getItem('flag') === '1') {
        goods = '充值'
        mertxtypeid = 'PSRC'
      } else {
        goods = '消费'
        mertxtypeid = 'PSTX'
      }
      // let cardnumber = this.rechargeNum.filter((item) => item.tr)[0].cardNo
      // let cardToken = this.rechargeNum.filter((item) => item.tr)[0].cardToken
      pay({
        version: '1.0.0',// 版本
        transCode: 'UP0002',// 交易代码
        reqSeq: this.randomNumber(17), //流水号
        merCode: '000081',//商户号
        chainNo: '008',
        psnid: localStorage.getItem('psnid'),
        mertxtypeid,
        cardnumber, //卡号
        orderNo: this.orderNo, //订单号
        amount: formatMoney(this.payMoney),//交易金额
        goods,//商品信息
        dateTime: this.dateTime,
        mersign: this.mersign,
        cardToken
      }).then(res => {
        if (res.respCode === '00') {
          this.phoneToken = res.phoneToken
          this.$notify.success({
            title: '成功',
            message: '验证码发送成功'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.respDesc
          })
        }
      })
      loading.close()
    },
    upDown () {
      this.ifUp = !this.ifUp;
      if (this.ifUp == true) {
        this.showHide.height = "100%";
      } else {
        this.showHide.height = "310px";
      }
    },
    recharge () {
      this.$router.push({name: "recharge"});
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
    choiceM (val, index) {
      this.money = val;
      // if (index == 0) {
      //   return;
      // }
      this.firstFlag = false
      for (var i in this.rechargeNum) {
        this.$set(this.rechargeNum[i], 'tr', false)
        // this.rechargeNum[i].tr = false;
      }
      // this.rechargeNum[index].tr = true;
      this.$set(this.rechargeNum[index], 'tr', true)
    },
    modifyPay () {
      this.$router.push({name: "b_frame02", params: {modify: 1}});
    }
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
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding: 0 0 20px 30px;
    border-bottom: 1px solid #e7e7e7;
    line-height: 30px;
  }

  .balance-tit span {
    color: #666666;
    font-weight: 500;
  }

  .rechargeType {
    margin: 0 30px;
    overflow: hidden;
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

  .choiceBank {
    font-size: 18px;
    color: #666666;
    margin: 20px 30px 0;
  }
</style>
