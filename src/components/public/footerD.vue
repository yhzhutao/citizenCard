<template>
  <div class="warp-F">
    <div class="tit-p">
      <p @click="goView('first')">首页</p>
      <span>|</span>
      <p @click="goView('second')">产品中心</p>
      <span>|</span>
      <p @click="goView('third')">解决方案</p>
      <span>|</span>
      <p @click="goView('fourth')">开放平台</p>
      <span>|</span>
      <p @click="goView('fifth')">帮助中心</p>
      <span>|</span>
      <p @click="goView('sixth')">关于我们</p>
    </div>
    <div>
      <p>Copyright &#169 2017 Zhejiang huiminhuifu ALL RIGHTS RESERVED</p>
      <p class="police">
        <!-- <img :src="jing" alt>
        浙ICP备88888888号 -->
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jing: require("../../assets/img/policeBadge.png")
    };
  },
  methods: {
    goView(e) {
      this.$store.commit("changeValue", e);
      this.$emit("frame", e);
      if (e == "first") {
        this.$router.replace({ name: "citizenCard" });
      } else if (e == "second") {
        this.$router.replace({ name: "product" });
      } else if (e == "third") {
        this.$router.replace({ name: "solution" });
      } else if (e == "fourth") {
        this.$router.replace({ name: "development" });
      } else if (e == "fifth") {
        this.$router.replace({ name: "help" });
      } else if (e == "sixth") {
        this.$router.replace({ name: "aboutUs" });
      }
    }
  }
};
</script>
<style scoped>
.warp-F {
  width: 100%;
  height: 110px;
  background-color: #3f4343;
  /* position: absolute;
  left: 0;
  bottom: 0; */
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.warp-F div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.warp-F div:first-child p {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.warp-F div:first-child span {
  color: #979797;
  margin: 0 10px;
}
.warp-F div:last-child {
  margin: 20px 0 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.warp-F div:last-child img {
  width: 17px;
  margin: 0 5px 0 20px;
}
.police {
  display: flex;
  align-items: center;
}
.tit-p span{
  font-size: 13px;
}
.tit-p p:hover {
  color: #62bd72 !important;
}
@media all and (max-width: 1100px) {
  .warp-F {
    width: 1100px;
  }
}
</style>
