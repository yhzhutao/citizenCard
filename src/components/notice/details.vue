<template>
  <div id="target" class="noticeDa1">
    <headerD></headerD>
    <div class="container details-D">
      <div class="details-all">
        <p class="details-tit">{{datas.newsCname}}</p>
        <div class="details-data">
          <span>{{datas.createDate}}</span>
        </div>
      </div>
      <div class="details-content dataContent" v-html="datas.newsDetail"></div>
    </div>
    <div id="showIf" v-if="shows"></div>
    <footerD class="footerD"></footerD>
  </div>
</template>
<script>
import headerD from "../public/headerD";
import footerD from "../public/footerD";
import $ from "jquery";
export default {
  data() {
    return {
      shows: true,
      hah: $(".dataContent").height(),
      id: this.$route.params.id,
      datas: ""
    };
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f8fa");
  },
  created() {},
  mounted() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.$store.commit("changeValue", "first");
    var that = this;
    var target = document.getElementById("target");
    // target.scrollIntoView();
    // //console..log(this.$route.params.id);

    var bh = document.body.clientHeight;
    $("#showIf").css("height", bh - 400 + "px");
    this.$get(
      this.$api.api + "/gw/newsinfo/detail/" + this.$route.params.id
    ).then(res => {
      //console..log("详情", res);
      if (res.code == "0") {
        res.data.newsDetail = unescape(res.data.newsDetail);
        // .replace(/& lt;/g, "<")
        // .replace(/& gt;/g, ">")
        // // .replace(/& #40;/g, "(")
        // // .replace(/& #41;/g, ")")
        // .replace(/<\/table>/g, "</table><br>");
        this.datas = res.data;
      }
      setTimeout(function() {
        var he = $(".dataContent").height();
        bh = bh - 100;
        if (he > bh) {
          that.shows = false;
        }
      }, 2000);
    });
  },
  computed: {},
  components: {
    headerD,
    footerD
  },
  watch: {
    hah: function(n) {
      //console..log(n);
    }
  },
  beforeDestroy() {
    // document.querySelector("body").removeAttribute("style");
  }
};
</script>
<style scoped>
.noticeDa1 {
  /* position: relative; */
}
.details-D {
  margin: 91px auto;
  background-color: #ffffff;
}

.details-all {
  /* background-color: aqua; */
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  margin: 0 40px 25px;
  padding: 25px 0;
}
.details-tit {
  font-size: 23px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  margin-bottom: 5px;
}
.details-data {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.details-content {
  margin: 0 150px;
  padding-bottom: 50px;
}
.dataContent {
  line-height: 29px;
  font-size: 18px;
  letter-spacing: 0.7px;
  word-wrap: break-word;
}
.dataContent p {
  /* margin: 10px 0; */
}
.dataContent >>> * {
  word-break: break-all;
}
.dataContent >>> pre {
  overflow: scroll;
  overflow-y: hidden;
  background: #eceaea;
}
.dataContent img {
  margin: 10px 0;
}
.dataContent >>> table {
  /* width: 100%; */
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

