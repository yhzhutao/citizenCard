<template>
  <div id="target">
    <div class="details-D">
      <div class="details-all">
        <p class="details-tit">{{datas.newsCname}}</p>
        <div class="details-data">
          <span>{{datas.createDate}}</span>
        </div>
      </div>
      <div class="details-content dataContent" v-html="datas.newsDetail"></div>
    </div>
    <div id="showIf" v-if="shows"></div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>
<script>
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
  created() {},
  mounted() {
    var that = this;
    var target = document.getElementById("target");
    target.scrollIntoView();
    //console..log(this.$route.params.id);

    var bh = document.body.clientHeight;
    $("#showIf").css("height", bh - 400 / 100 + "rem");
    this.$get(
      this.$api.api + "/gw/newsinfo/detail/" + this.$route.params.id
    ).then(res => {
      //console.log("详情", res);
      if (res.code == "0") {
        res.data.newsDetail = unescape(res.data.newsDetail);
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
.details-D {
  margin: 0 auto;
  background-color: #ffffff;
}

.details-all {
  /* background-color: aqua; */
  text-align: center;
  border-bottom: 0.01rem solid #e5e5e5;
  margin: 0 0.4rem 0.25rem;
  padding: 0.25rem 0;
}
.details-tit {
  font-size: 0.35rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
  margin: 0.1rem 0 0.2rem;
}
.details-data {
  font-size: 0.25rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.details-content {
  margin: 0 0.3rem;
  padding-bottom: 0.05rem;
}
.dataContent {
  line-height: 0.32rem;
  font-size: 0.25rem;
  letter-spacing: 0.015rem;
  word-wrap: break-word;
}
.dataContent>>> p {
  margin: 0.05rem 0;
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

