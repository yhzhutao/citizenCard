<template>
  <div id="backgroundheight">
    <div>
      <p class="questionCname">{{data.questionCname}}</p>
      <div class="divs dataContent" v-html="data.questionDetail"></div>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>
<script>
export default {
  props: ["questionId"],
  data() {
    return {
      data: ""
    };
  },
  mounted() {
     this.$post(this.$api.api + "/gw/helpdoc/qDetail?questionId="+this.questionId).then(res => {
      res.questionDetail = unescape(res.questionDetail);
      this.data = res;
    });
  }
};
</script>
<style scoped>
.questionCname {
  font-size: 0.25rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 0.1rem;
  line-height: 0.3rem;
}
.divs {
  /* background: red; */
  padding-bottom: 1.1rem;
}
.dataContent {
  line-height: 0.29rem;
  letter-spacing: 0.01rem;
  word-wrap: break-word;
}
.dataContent p {
  /* margin: 10px 0; */
}

.dataContent >>> img {
  margin: 0.1rem 0;
}
.dataContent >>> * {
  word-break: break-all;
}
.dataContent >>> pre {
  overflow: scroll;
  overflow-y: hidden;
  background: #eceaea;
}
.dataContent >>> table {
  margin: 0.05rem 0;
  border: 0.015rem solid black;
}
.dataContent >>> tr {
  border: 0.015rem solid black;
}
.dataContent >>> td {
  border: 0.015rem solid black;
}
.dataContent >>> th {
  border: 0.015rem solid black;
}
</style>
