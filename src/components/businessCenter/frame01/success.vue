<template>
  <div>
    <frame />
    <div style="height:80px;"></div>
    <div class="balance">
      <div class="successImg">
        <img :src="imgs" alt />
      </div>
      <p>充值成功</p>
      <button @click="goHome()" class="confirm">确认</button>
    </div>
  </div>
</template>
<script>
import frame from "../public/frame01";
export default {
  data() {
    return {
      imgs: require("../../../assets/img/success.png")
    };
  },
  components: {
    frame
  },
  methods: {
    goHome() {
      this.$router.replace({ name: "b_frame01" });
    }
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
  width: 1000px;
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 0 0 3px 3px #e5e5e5;
  padding: 200px 30px;
  text-align: center;
  font-size: 16px;
  color: #666666;
  font-weight: bold;
}
.successImg {
  margin: 0 auto 30px;
  width: 120px;
  border-radius: 50%;
}
.successImg img {
  width: 100%;
}
.confirm {
  margin: 80px auto 30px;
  width: 180px;
  height: 40px;
  border-radius: 100px;
  background: linear-gradient(90deg, #13ae7f 0%, #8be695 100%);
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
</style>
