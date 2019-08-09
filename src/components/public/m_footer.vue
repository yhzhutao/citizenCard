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
    <div class="tit-p1">
      <p class="police">
        <img :src="jing" alt />
        浙ICP备88888888号
      </p>
      <p>Copyright &#169 2017 Zhejaing Huimingzhifu ALL RIGHTS RESERVED</p>
    </div>
  </div>
</template> 
<script src='../../static/js/rem.js'>
</script>
<script>
export default {
  data() {
    return {
      jing: require("../../assets/img/policeBadge.png")
    };
  },
  methods: {
    goView(e) {
      //   this.$store.commit("changeValue", e);
      //   this.$emit("frame", e);
      //   if (e == "first") {
      //     this.$router.push({ name: "citizenCard" });
      //   } else if (e == "second") {
      //     this.$router.push({ name: "product" });
      //   } else if (e == "third") {
      //     this.$router.push({ name: "solution" });
      //   } else if (e == "fourth") {
      //     this.$router.push({ name: "development" });
      //   } else if (e == "fifth") {
      //     this.$router.push({ name: "help" });
      //   } else if (e == "sixth") {
      //     this.$router.push({ name: "aboutUs" });
      //   }
    }
  }
};
</script>
<style scoped>
.warp-F {
  width: 100%;
  padding: 0.2rem 0;
  background-color: #3f4343;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tit-p {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tit-p1 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
}
.warp-F div:first-child p {
  font-size: 0.27rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.warp-F div:first-child span {
  color: #979797;
  font-size: 0.2rem;
  margin: 0 0.05rem;
}
.warp-F div:last-child {
  /* margin: 20px 0 10px; */
  font-size: 0.2rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.warp-F div:last-child img {
  width: 0.2rem;
  margin: 0;
  /* background: red; */
}
.tit-p1 p:last-child {
  margin-top: 0.05rem;
}
.police {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
</style>
