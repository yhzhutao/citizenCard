<template>
  <div id="backgroundheight">
    <div>
      <p class="questionCname">{{data.questionCname}}</p>
      <div class="divs dataContent" v-html="data.questionDetail"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["questionId"],
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    // var h = document.getElementById("backgroundheight").offsetHeight;
    // this.$emit("offsetHeight", h);
    // //console..log(this.questionId);
    this.$post(this.$api.api + "/gw/helpdoc/qDetail?questionId="+this.questionId).then(res => {
      res.questionDetail = unescape(res.questionDetail);
      this.data = res;
    });
  }
};
</script>
<style scoped>
.questionCname {
  font-size: 24px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 10px;
  line-height: 33px;
}
.divs {
  /* background: red; */
  padding-bottom: 110px;
}
.dataContent {
  line-height: 29px;
  letter-spacing: 0.7px;
  word-wrap: break-word;
}
.dataContent p {
  /* margin: 10px 0; */
}
.dataContent img {
  margin: 10px 0;
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
  margin: 5px 0;
  border: 1px solid black;
}
.dataContent >>> tr {
  border: 1px solid black;
}
.dataContent >>> td {
  border: 1px solid black;
}
.dataContent >>> th {
  border: 1px solid black;
}
</style>
