<template>
  <div>
    <frame />
    <div style="height:80px;"></div>
    <div class="balance">
      <p class="balance-tit">已绑定银行卡</p>
      <ul class="showBank flex-start">
        <li v-for="(item,index) in bankList" :key="index" class="showBank-list01">
          <div @click="delBankCard(index,item.cardToken)" class="deleteBank">
            <div class="deleteBank-div">
              <img :src="delBank" alt />
              <span>解除绑定</span>
            </div>
          </div>
          <div class="cardName">{{item.showBankId}}</div>
          <div>
            <p class="bankName" v-html="item.cardName">上海浦发银行</p>
            <p v-if="item.subCardType == 'D'" class="bankType">借记卡</p>
            <p v-if="item.subCardType == 'C'" class="bankType">贷记卡</p>
            <p v-if="item.subCardType == 'JKK'" class="bankType">健康卡</p>
            <p v-if="item.subCardType == 'SMK'" class="bankType">市民卡</p>
            <p v-if="item.subCardType == 'DTYGK'" class="bankType">地铁员工卡</p>
            <p class="bankNumbers">
              <span>******</span>
              <span>******</span>
              <span>******</span>
              <span v-html="item.cardNo">8799</span>
            </p>
          </div>
        </li>
        <li @click="bindBank()" class="showBank-list03">
          <img :src="addBank" />
          <p>添加银行卡</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import frame from "../public/frame01";
export default {
  data() {
    return {
      imgs: require("../../../assets/img/16.png"),
      addBank: require("../../../assets/img/addImg.png"),
      delBank: require("../../../assets/img/delete.png"),
      nums: "",
      mobile: "",
      bankList: ""
    };
  },
  components: {
    frame
  },
  methods: {
    //去绑卡
    bindBank() {
      this.$router.push({ name: "binding" });
    },
    //获取银行卡
    getUserBankCardInfo(idCard) {
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
            var list = res.data.cardList;
            for (var i in list) {
              list[i].cardNo = list[i].cardNo.substring(
                list[i].cardNo.length - 4
              );
            }
            this.bankList = list;
            this.qrybanksupport();
            console.log("获取银行卡", list);
          }
        });
    },
    //删除银行卡
    delBankCard(index, value) {
      this.$confirm("此操作将永久删除该银行卡, 是否继续?", "解绑提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(this.HOST + "/unsign", {
              version: "1.0.0", //版本
              transCode: "UP0004", //交易代码
              chainNo: "008", //渠道号
              busType: "YHK",
              cardToken: value,
              psnid: localStorage.getItem('psnid'),
              reqSeq: this.randomNumber(17) //请求流水号
            },{
              headers:{
                smid:localStorage.getItem('smid')
              }
            })
            .then(res => {
              if (res.data.respCode == "00") {
                this.bankList.splice(index, 1);
                this.$notify({
                  title: "成功",
                  message: "银行卡解绑成功",
                  // position: "bottom-right",
                  type: "success"
                });
              }
            });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    randomNumber(len) {
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
    //可用银行列表
    qrybanksupport() {
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
            // bank_no
            var bankCards = res.data.bankCards;
            var list = this.bankList;
            for (var i in bankCards) {
              for (var j in list) {
                if (list[j].bank_no == bankCards[i].bankno) {
                  this.bankList[j].bank_name = bankCards[i].bankname;
                }
              }
            }
          }
        });
    },
    //查询用户资料
    userDtlQuery() {
      this.$axios
        .post(
          this.SEVER,
          { user_id: localStorage.getItem("user_id") },
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
            this.getUserBankCardInfo(res.data.id_no);
            this.getPsnId(res.data.id_no, res.data.name);
          }
        });
    },
    //获取getPsnId
    getPsnId(id, name) {
      this.$axios
        .post(this.HOST + "/getPsnId", {
          version: "1.0.0", //版本
          transCode: "UP0018", //交易代码
          chainNo: "008", //渠道号
          name: name,
          idCard: id,
          reqSeq: this.randomNumber(17) //请求流水号
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("获取getPsnId", res);
          if (res.data.respCode == "0000") {
            this.getSignByCard();
          }
        });
    },
    //签约查询
    getSignByCard() {
      this.$axios
        .post(this.HOST + "/createAccount", {
          version: "1.0.1", //版本
          transCode: "UP0028", //交易代码
          chainNo: "008", //渠道号
          psnId: "",
          userid: localStorage.getItem("user_id"),
          reqSeq: "1EE5C59F0A1700100057306C855PSN" //请求流水号
        },{
          headers:{
            smid:localStorage.getItem('smid')
          }
        })
        .then(res => {
          console.log("签约查询", res);
        });
    }
  },
  mounted() {
    this.userDtlQuery();//查询用户资料
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

.showBank {
  margin-top: 30px;
  padding: 0 30px;
  flex-wrap: wrap;
}
.showBank-list01 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(45deg, #369478 0%, #46e263 100%);
  width: 313px;
  height: 190px;
  border-radius: 7px;
  overflow: hidden;
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;
}
.deleteBank {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  display: none;
}
.deleteBank-div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
}
.deleteBank-div img {
  width: 40px;
  margin-right: 10px;
}
.showBank-list01:hover .deleteBank {
  display: block;
}
.cardName {
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  background: linear-gradient(45deg, #7ae7c8 0%, #50ee6d 100%);
  font-weight: bold;
  color:#ffffff;
  border-radius: 50%;
  margin: 30px 22px 0 0;
  font-size: 16px;
}
.bankName {
  font-size: 17px;
  color: #ffffff;
  margin: 30px 0 0;
}
.bankType {
  font-size: 14px;
  color: #ffffff;
  margin: 20px 0;
}
.bankNumbers {
  font-size: 17px;
  color: #ffffff;
}
.showBank-list03 {
  width: 313px;
  height: 190px;
  border-radius: 7px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #e5e5e5;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  color: #666666;
  font-size: 15px;
}
.showBank-list03 img {
  width: 80px;
  margin-bottom: 15px;
}
.showBank-list03 span {
  background: #c04545;
}
.showBank li:nth-child(3n) {
  margin-right: 0;
}
</style>
