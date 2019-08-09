<template>
  <div>
    <frame/>
    <div style="height:80px;"></div>
    <div class="balance">
      <p class="balance-tit">账户余额</p>
      <div class="balance-effect space-between">
        <p class="effect-left">￥{{remainingSum|formatAmount}}</p>
        <div class="effect-right flex-end">
          <p></p>
          <p></p>
        </div>
      </div>
      <div>
        <ul class="rechargeType">
          <li
            @click="choiceM(item.name,index)"
            :class="{'rechargeType-ed':item.tr}"
            :key="index"
            v-for="(item,index) in rechargeNum"
          >{{item.name}} 元
          </li>
        </ul>
      </div>
      <div class="money flex-start">
        <p>请输入充值金额</p>
        <el-input
          type="number"
          oninput="if(value.length>5)value=value.slice(0,5)"
          @input="maxLen(money)"
          @blur="getBlue(money)"
          style="width:300px;font-size:20px;"
          placeholder="请输入"
          v-model="money"
          clearable
        ></el-input>
        <span>元</span>
      </div>
      <div class="nowPay">
        <button @click="nowRecharge()">立即充值</button>
      </div>
      <div class="remid">
        请您定期修改密码以保证支付安全
        <span @click="modifyPay()" class="modify">修改密码</span>
      </div>
    </div>
  </div>
</template>
<script>
import frame from "../public/frame01";

export default {
  data () {
    return {
      money: "50",
      money01: "",
      imgs: require("../../../assets/img/16.png"),
      nums: "",
      mobile: "",
      rechargeNum: [
        {name: "50", tr: true},
        {name: "100", tr: false},
        {name: "300", tr: false},
        {name: "500", tr: false},
        {name: "1000", tr: false},
        {name: "2000", tr: false}
      ],
      remainingSum: 0 //账户余额
    };
  },
  components: {
    frame
  },
  methods: {
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
            title: "充值金额仅可为整数",
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
        this.rechargeNum[i].tr = false;
      }
      this.rechargeNum[index].tr = true;
    },
    nowRecharge () {
      if (this.money.length > 1) {
        if (0 >= this.money) {
          this.$notify.error({
            title: "请输入大于0的金额",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
        if (!/^(0|\+?[1-9][0-9]*)$/.test(this.money)) {
          this.$notify.error({
            title: "充值金额仅可为整数",
            message: "请修改",
            position: "bottom-right"
          });
          return;
        }
        // this.$router.push({name: "payment", params: {money: this.money, payname: '余额充值',flag:'1'}});
        this.$router.push('/commodityPayment')
        localStorage.setItem('money',this.money)
        localStorage.setItem('payname','余额充值')
        localStorage.setItem('flag','1')
      } else {
        this.$notify({
          title: "请输入充值金额",
          message: "充值金额不可为空",
          type: "warning",
          position: "bottom-right"
        });
      }
    },
    modifyPay () {
      this.$router.push({name: "b_frame02", params: {modify: 1}});
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
    //获取17位流水号
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
  },
  mounted () {
    this.queryBalance()
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

  .rechargeType {
    margin: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .rechargeType li {
    width: 130px;
    height: 50px;
    border-radius: 5px;
    font-size: 15px;
    color: #999999;
    margin-right: 40px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #999999;
    cursor: pointer;
  }

  .rechargeType li:nth-child(6n) {
    margin-right: 0;
  }

  .rechargeType-ed {
    background: #62bd72;
    color: #ffffff !important;
    border: 1px solid #62bd72 !important;
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
    margin: 100px auto 30px;
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
