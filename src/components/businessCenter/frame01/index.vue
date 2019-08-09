<template>
  <div>
    <frame/>
    <div style="height:80px;"></div>
    <div class="balance">
      <p class="balance-tit">账户余额</p>
      <div class="balance-effect space-between">
        <p class="effect-left">￥{{remainingSum|formatAmount}}</p>
        <div class="effect-right flex-end">
          <p @click="recharge('recharge')">充 值</p>
          <p @click="recharge('cashWithdrawal')">提 现</p>
        </div>
      </div>
      <div class="myBank space-between">
        <div class="myBank-left">
          <div class="bankNum space-between">
            <div class="flex-start">
              我的银行卡
              <p>{{bankNums}}</p>张
            </div>
            <router-link to="/bankList">全部银行卡</router-link>
          </div>
          <!--{{bankList}}-->
          <ul v-if="bankList.length!==0" class="showBank">
            <li v-for="(item,index) in bankList" :class="`showBank-list0${index+1}`">
              <div class="cardName">{{item.showBankId}}</div>
              <div>
                <p class="bankName">{{item.cardName}}</p>
                <p v-if="item.subCardType == 'D'" class="bankType">借记卡</p>
                <p v-if="item.subCardType == 'C'" class="bankType">贷记卡</p>
                <p v-if="item.subCardType == 'JKK'" class="bankType">健康卡</p>
                <p v-if="item.subCardType == 'SMK'" class="bankType">市民卡</p>
                <p v-if="item.subCardType == 'DTYGK'" class="bankType">地铁员工卡</p>
                <p class="bankNumbers">
                  <span>****</span>
                  <span>****</span>
                  <span>****</span>
                  <span>{{item.cardNo|hideCardNo}}</span>
                </p>
              </div>
            </li>
          </ul>
          <div v-if="bankList.length===0" class="showBank addbank" @click="goBindingBankCards">
            <img :src="addBank" alt/>
            <p>暂无银行卡，点击添加</p>
          </div>
        </div>
        <div class="myBank-right">
          <p class="bill">宽带缴费</p>
          <div class="bill_tit flex-start">
            <p>华数传媒网络有限公司</p>
          </div>
          <el-form :inline="true">
            <el-col :span="11" :offset="2">
              <el-form-item>
                <el-input v-model="accountId" placeholder="请输入您的客户编号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item>
                <el-button type="success" @click="ensure" :disabled="!accountId">确 认</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog width="350px" :center="true" title="宽带缴费" :visible.sync="dialogTableVisible">
      <div class="payTv">
        <ul>
          <li>
            <p>收费单位</p>
            <span>华数传媒网络有限公司</span>
          </li>
          <li>
            <p>户号</p>
            <span>{{account.accountId}}</span>
          </li>
          <li>
            <p>户名</p>
            <span>{{account.accountName}}</span>
          </li>
          <li>
            <p>账户余额</p>
            <span>{{account.billBalance}}元</span>
          </li>
          <li>
            <p>充值金额</p>
            <input
              @input="getQ(payNum)"
              oninput="if(value.length>5)value=value.slice(0,5)"
              type="number"
              v-model="payNum"
              placeholder="输入充值金额"
            />
            <div v-if="errn == 1" class="errMsg">请输入充值金额</div>
            <div v-if="errn == 2" class="errMsg">请输入大于 0 的金额</div>
          </li>
        </ul>
        <div class="payBut">
          <button @click="recharge('payment')">缴 费</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getUserInfo, wasuKDPaymentTotal} from '@/apis/common'
import frame from "../public/frame01";

export default {
  data () {
    return {
      bankNums: '0',//银行卡数量
      hu: false, //电视充值提示
      errn: 3, //重置金额判断
      dialogTableVisible: false, //电视充值弹框
      payNum: "", //电视充值金额
      huNumber: "", //电视户号
      bankList: "", //银行卡列表
      addBank: require("../../../assets/img/addImg.png"), //添加银行卡 +
      idCard: '',//身份证号码
      remainingSum: 0, //余额
      accountId: '',//户号
      account:{} //一户的信息
    };
  },
  components: {
    frame
  },
  methods: {
    ensure () {
      this.payNum = ''
      wasuKDPaymentTotal({accountId:this.accountId}).then(res => {
        if (res.code === 0) {
          this.dialogTableVisible = true
          this.account = res.data
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      })
    },
    goBindingBankCards () {
      this.$router.push('/bindingBankCards')
    },
    //电视缴费框展示
    showDia () {
      if (this.huNumber.length > 1) {
        this.dialogTableVisible = true;
      } else {
        this.hu = true;
      }
    },
    //户号
    getInput (e) {
      if (e.length > 1) {
        this.hu = false;
      }
    },
    //充值，提现，电视支付 跳转
    recharge (e) {
      if (e == "payment") {
        if (this.payNum.length < 1) {
          this.errn = 1;
          return;
        } else if (
          this.payNum == "0" ||
          this.payNum == "0." ||
          this.payNum == "-0." ||
          this.payNum == "-0"
        ) {
          this.errn = 2;
          return;
        } else if (this.payNum < 0) {
          this.errn = 2;
          return;
        } else {
          this.errn = 3;
          this.$router.push('/commodityPayment');
          localStorage.setItem('money', this.payNum)
          localStorage.setItem('payname', '宽带缴费')
          localStorage.setItem('flag', '2')
          localStorage.setItem('accountId',this.account.accountId)
        }
      } else {
        this.$router.push({name: e});
      }
    },
    //缴费金额
    getQ (e) {
      if (e < 0) {
        this.errn = 2;
      } else {
        this.errn = 3;
      }
    },
    //查询余额
    queryBalance (idCard) {
      this.$axios
        .post(this.HOST + "/queryBalance", {
          version: "1.0.0", //版本
          transCode: "UP0031", //交易代码
          chainNo: "008", //渠道号
          idCard: idCard, //证件号码
          idCardType: 0,
          psnId: "",
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
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
          if (res.data.code == "0000") {
            this.getBankCard(res.data.id_no);
            this.queryBalance(res.data.id_no);//获取余额
            localStorage.setItem('id_no', res.data.id_no)
          }
        });
    },
    //获取银行卡
    getBankCard (idCard) {
      this.$axios
        .post(this.HOST + "/qryBindCardList", {
          version: "1.0.0", //版本
          transCode: "UP0032", //交易代码
          chainNo: "008", //渠道号
          busType: "YHK",
          idCardType: "0", //身份证
          idCard: idCard, //身份证号
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("获取银行卡", res.data);
          if (res.data.respCode == "00") {
            this.bankNums = res.data.cardList.length
            // if (res.data.cardList.length > 1) {
            //   var list = res.data.cardList[0];
            //   list[0].card_no1 = list[0].cardNo.substring(
            //     list[0].cardNo.length - 4
            //   );
            //   this.bankList = list;
            // } else {
            //   this.bankList = res.data.cardList;
            // }
            this.bankList = res.data.cardList;
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
    //获取psnid
    getUserInfo () {
      getUserInfo({
        userId: localStorage.getItem('user_id')
      }).then(res => {
        if (res.code === 0) {
          localStorage.setItem('psnid', res.data.psnid)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    }
  },
  mounted () {
    this.userDtlQuery(); //查询用户资料
    this.getUserInfo(); //获取psnid
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

  .balance-effect {
    height: 100px;
    padding: 0 30px;
    border-bottom: 1px dashed #e7e7e7;
  }

  .effect-left {
    font-size: 40px;
    color: #333333;
    font-weight: bold;
  }

  .effect-right p {
    background: #13ae7f;
    font-size: 14px;
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 30px;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
  }

  .addbank {
    text-align: center;
    width: 400px;
    margin: 0 auto;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #999999;
    color: #666666;
    cursor: pointer;
  }

  .addbank img {
    width: 80px;
    margin: 40px 0 10px 0;
  }

  .bankNum {
    font-size: 15px;
    color: #666666;
    padding-right: 28px;
  }

  .bankNum p {
    color: #62bd72;
    margin: 0 5px;
  }

  .bankNum a {
    color: #4a90e2;
  }

  .myBank {
    margin: 30px;
  }

  .myBank-left {
    width: 50%;
  }

  .myBank-right {
    width: 48%;
    height: 200px;
    margin-top: 45px;
    margin-left: 3%;
    box-shadow: 2px 2px 2px 2px #e5e5e5;
    border-radius: 8px;
  }

  .showBank {
    height: 200px;
    margin-top: 30px;
    position: relative;
    z-index: 1;
  }

  .showBank li {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: linear-gradient(45deg, #369478 0%, #46e263 100%);
    width: 313px;
    height: 210px;
    border-radius: 7px;
    box-shadow: 2px 2px 2px 2px #e5e5e5;
    position: absolute;
    top: 0;
  }

  .showBank-list01 {
    left: 0;
    z-index: 4;
  }

  .showBank-list02 {
    left: 80px;
    z-index: 3;
  }

  .showBank-list03 {
    left: 160px;
    z-index: 2;
  }

  .cardName {
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    background: linear-gradient(45deg, #7ae7c8 0%, #50ee6d 100%);
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;
    border-radius: 50%;
    margin: 30px 22px 0 0;
    font-size: 16px;
  }

  .bankName {
    font-size: 18px;
    color: #ffffff;
    margin: 30px 0 0;
  }

  .bankType {
    font-size: 15px;
    color: #ffffff;
    margin: 20px 0;
  }

  .bankNumbers {
    font-size: 18px;
    color: #ffffff;
  }

  .bill {
    font-size: 20px;
    color: #333333;
    margin: 20px 30px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #e7e7e7;
  }

  .bill_tit {
    margin: 0 30px;
    font-size: 15px;
    color: #666666;
    margin-bottom: 30px;
  }

  .bill_tit p {
    width: 205px;
  }

  .bill_tit span {
    color: #62bd72 !important;
    margin: 0 5px;
  }

  .billPhone {
    margin: 20px 30px;
  }

  .nowPay {
    background: #13ae7f;
    font-size: 14px;
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 30px;
    border-radius: 5px;
    color: #ffffff;
    cursor: pointer;
  }

  .payTv {
    border-top: 1px solid #666666;
    padding-top: 20px;
  }

  .payTv ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px dashed #e5e5e5;
  }

  .payTv ul li:last-child {
    position: relative;
  }

  .errMsg {
    position: absolute;
    right: 10px;
    top: 45px;
    color: red;
    font-size: 13px;
  }

  .payTv ul li p {
    font-size: 16px;
    color: #666666;
  }

  .payTv ul li span {
    font-size: 16px;
    color: #999999;
  }

  .payTv ul li input {
    width: 100px;
    font-size: 16px;
    color: #999999;
    text-align: right;
  }

  .payBut {
    text-align: center;
    margin-top: 35px;
  }

  .payBut button {
    background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
    width: 170px;
    height: 35px;
    text-align: center;
    border-radius: 100px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }

  .hu {
    font-size: 14px;
    color: red;
    position: absolute;
    top: 45px;
    left: 15px;
  }
</style>
