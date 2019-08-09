<template>
  <div>
    <frame />
    <div style="height:80px;"></div>
    <div class="tradingFlow">
      <div class="balance-tit space-between">
        <div class="balance-titL">当前账户余额：<span>￥{{remainingSum|formatAmount}}</span></div>

        <!--<div class="balance-titR">-->
          <!--<span>查询时间：</span>-->
          <!--<el-date-picker-->
            <!--v-model="value1"-->
            <!--type="daterange"-->
            <!--@change="getTimeSE()"-->
            <!--range-separator="至"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期"-->
          <!--&gt;</el-date-picker>-->
          <!--&lt;!&ndash; </div> &ndash;&gt;-->
        <!--</div>-->
      </div>

      <el-table :data="tradeList" stripe style="width: 100%">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column width="250px" align="center" prop="orderNum" label="订单号"></el-table-column>
        <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
        <el-table-column align="center" prop="type" label="交易类型"></el-table-column>
        <el-table-column align="center" prop="money" label="金额(元)"></el-table-column>
        <el-table-column align="center" prop="state" label="支付状态"></el-table-column>
        <el-table-column width="250px" align="center" prop="time" label="交易时间"></el-table-column>
      </el-table>
      <div class="setPage space-between">
        <div class="pageLeft">
          <span>每页显示</span>
          <el-select
            @change="showPage()"
            size="small"
            style="width:70px;"
            v-model="pageSize"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>共{{total}}条</span>
        </div>
        <div class="pageRight">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import frame from "../public/frame03";
export default {
  data() {
    return {
      value1: [],
      value2: "",
      nums: 10,
      psnid: "",
      currentPage: 1, //当前页
      pageSize: 10, //每页条数
      total: 20, //总条数
      sTime: "", //开始，查询时间
      eTime: "", //结束，查询时间
      options: [
        {
          value: 10,
          label: "10"
        },
        {
          value: 15,
          label: "15"
        },
        {
          value: 20,
          label: "20"
        }
      ],
      tradeList: [],
      remainingSum:0
    };
  },
  components: {
    frame
  },
  methods: {
    //获取查询的时间段
    getTimeSE() {
      console.log(this.value1);
      this.qryTrade(this.psnid);
    },
    showPage() {
      this.currentPage = 1
      console.log(this.currentPage + "页" + this.pageSize + "条");
      this.qryTrade(this.psnid);
    },
    handleCurrentChange(val) {
      console.log(this.currentPage + "页" + this.pageSize + "条");
      this.qryTrade(this.psnid);
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
          console.log("查询用户信息", res);
          if (res.data.code == "0000") {
            this.getPsnId(res.data.id_no, res.data.name);
            this.queryBalance(res.data.id_no);//获取余额
          }else{
            this.$notify.error({
              title:'错误',
              message:res.data.message
            })
          }
        });
    },
    //获取余额
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
    //获取getPsnId
    getPsnId(id, name) {
      this.$axios
        .post(this.HOST + "/createAccount", {
          version: "1.0.1", //版本
          transCode: "UP0008", //交易代码
          chainNo: "006", //渠道号
          userid: localStorage.getItem("user_id"),
          reqSeq: this.randomNumber(17), //请求流水号
          idnumber: id, //证件号码
          name: name, //姓名
          mobile: localStorage.getItem("userNumber")
        },{
          headers:{smid:localStorage.getItem('smid')}
        })
        .then(res => {
          console.log("获取getPsnId", res);
          if (res.data.respCode == "00") {
            this.psnid = res.data.psnid;
            this.qryTrade(res.data.psnid);
          }
        });
    },
    //30位流水号
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
    //查询流水
    qryTrade(psnid) {
      console.log({
        version: "1.0.0", //版本
        transCode: "UP0019", //交易代码
        chainNo: "001", //渠道号
        psnId: psnid,
        startTime: this.value1[0].replace(/-/g, ""), //开始
        endTime: this.value1[1].replace(/-/g, ""), //结束
        reqSeq: this.randomNumber(17), //请求流水号
        currentPage: this.currentPage, //当前页
        pageSize: this.pageSize //显示条数
      });
      this.$axios
        .post(this.HOST + "/qryTrade", {
          version: "1.0.0", //版本
          transCode: "UP0019", //交易代码
          chainNo: "001", //渠道号
          psnId: psnid,
          startTime: this.value1[0].replace(/-/g, ""), //开始
          endTime: this.value1[1].replace(/-/g, ""), //结束
          reqSeq: this.randomNumber(17), //请求流水号
          currentPage: this.currentPage, //当前页
          pageSize: this.pageSize //显示条数
        },{
          headers:{smid:localStorage.getItem('smid')}
        })
        .then(res => {
          console.log("查询流水", res.data);
          if (res.data.respCode == "00") {
            this.tradeList = [];
            this.total = res.data.totalCount;
            var tradeList = res.data.tradeList;
            if (tradeList.length > 1) {
              for (var i in tradeList) {
                this.tradeList.push({
                  id: i + 1,//序号
                  orderNum: tradeList[i].orderNo,//订单号
                  // name: tradeList[i].merchantName,//商品名称
                  name: tradeList[i].orderDesc,//商品名称
                  type: tradeList[i].tradeTypeDesc,//交易类型
                  money: tradeList[i].amount / 100,//金额
                  state: tradeList[i].statusDesc,//支付状态
                  time: tradeList[i].txTime//交易时间
                });
              }
            } else {
              this.tradeList.push({
                id: "0",
                orderNum: "无",
                name: "无",
                type: "无",
                money: "0",
                state: "无",
                time: "无"
              });
            }
          }
        });
    },
    //查询时间转化
    getNewData(n, data, show) {
      var myData = "";
      if (data) {
        myData = data;
      } else {
        myData = new Date();
      }
      var y = myData.getFullYear();
      var m = myData.getMonth() + n;
      var d = myData.getDate();
      var m1 = m - 1;
      if (m.toString().length < 2) {
        m = "0" + m;
      }
      if (d.toString().length < 2) {
        d = "0" + d;
      }
      if (m1.toString().length < 2) {
        m1 = "0" + m1;
      }
      if (m == "00") {
        m = "12";
        y = y - 1;
      }
      if (show) {
        this.value1 = [y + "-" + m1 + "-" + d, y + "-" + m + "-" + d];
        console.log(this.value1);
      }
      return y + "" + m + "" + d;
    }
  },
  mounted() {
    this.userDtlQuery(); //查询用户资料
    this.getNewData(1, new Date(), 1); //显示默认时间
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
.tradingFlow {
  width: 1100px;
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 0 0 3px 3px #e5e5e5;
  padding: 30px;
}
.balance-tit {
  padding: 0 0 20px 30px;
  border-bottom: 1px solid #e7e7e7;
}
.balance-titL {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.setPage {
  margin: 30px;
}
.pageLeft span {
  margin-right: 15px;
  font-size: 14px;
  color: #666666;
}
.pageLeft span:last-child {
  margin-left: 15px;
}
.balance-titR {
  margin: 10px 0;
}
</style>
