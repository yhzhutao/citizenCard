<template>
  <div :style="backgroundDiv">
    <headerF></headerF>
    <div style="height:100px;"></div>
    <div v-if="ids" class="promise">
      <p class="promise-tit">承诺函 1</p>
      <p class="promise-con">
        本人
        <span class="attion">{{name}}</span>
        （{{company}}公司法定代表人）承诺，自主自愿于杭州市民卡有限公司开立支付账户/商户号，提交的所有开户证明文件均真实有效。
      </p>
      <p class="promise-con">
        本人
        <span class="attion">{{company}}</span> （单位）充分了解并清楚知晓出租、出借、出售、购买账户的相关法律责任和惩戒措施，承诺依法依规开立和使用本单位账户。
      </p>
    </div>
    <div v-else class="promise">
      <p class="promise-tit">承诺函 2</p>
      <p
        class="promise-con"
      >根据《中华人民共和国外汇管理条例》、《国家外汇管理局关于开展支付机构跨境外汇支付业务试点的通知》等相关法律法规、监管要求及贵公司的相关规定，我公司郑重承诺：“不得将贵公司提供的产品及相关接口用于从事与外汇相关的业务；不得将贵公司提供的产品以及相关接口开放给其他从事外汇相关业务的风险商户。</p>
      <p
        class="promise-con"
      >否则，贵公司有权暂停或终止与我公司的支付协议，有权冻结我公司的业务结算款、保证金等相关资金并向相关监管部门报送我公司的违规行为，我公司自行承担因违反本承诺产生的一切损失，如贵公司因此不得已参加诉讼或者被行政处罚的，由此产生的一切费用，包括但不限于诉讼费、仲裁费（若有）、保全费、评估费、公证费、执行费、律师代理费、差旅费、裁判文书确定的赔偿款、行政处罚款等，均由我公司承担”。本承诺函作为合作协议的重要组成部分，具有同等法律效力，未经贵公司书面同意不可撤销或变更。</p>
    </div>
  </div>
</template>
<script>
import headerF from "../public/headerD.vue";
export default {
  data() {
    return {
      backgroundDiv:{
        height:''
      },
      ids: true,
      name: "XXX",
      company: "XXX"
    };
  },
  mounted() {
    // //console..log(this.$route.params);
      this.backgroundDiv.height =
      document.documentElement.clientHeight+ "px";
    var id = this.$route.params.id;
    if (id == 1) {
      this.ids = true;
    } else {
      this.ids = false;
    }
    this.$get(this.$api.api + "/gw/a1/application/applyStatus").then(res => {
      // //console..log("申请状态", res);
      this.$get(this.$api.api + "/gw/a1/application/" + res.data.applyId).then(
        res => {
          if (res.code == "0") {
            this.name = res.data.frdb;
            this.company = res.data.gszcmc;
            // //console..log("查看复审资料", res.data);
            //
          }
        }
      );
    });
  },
  components: {
    headerF
  }
};
</script>
<style scoped>
.promise {
  width: 1000px;
  margin: 0 auto 100px;
}
.promise-tit {
  text-align: center;
  font-size: 27px;
  line-height: 100px;
  font-weight: bold;
  color: #333333;
}
.promise-con {
  line-height: 40px;
  /* text-align: center; */
  text-indent: 35px;
  font-size: 18px;
  color: #333333;
  margin: 10px 0;
}
.attion{
    font-weight: bold;
}
</style>
