<template>
  <div class="index-header">
    <div class="index-header-content">
      <div class="index-left display-start">
        <p @click="goIndex()" id="index-p1">惠民汇付个人中心</p>
        <p @click="toIndex(1)" class="index-p index-ped">首页</p>
        <p @click="toIndex(2)" class="index-p">设置</p>
        <p @click="toIndex(3)" class="index-p">交易流水</p>
      </div>
      <div class="index-right">
        {{name}}
        <div @click="goOut()" class="goOut">退出</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "用户"
    };
  },
  methods: {
    toIndex(e) {
      this.$router.replace({ name: "b_frame0" + e });
    },
    goOut() {
      localStorage.clear()
      this.$router.replace({ name: "b_login" });
    },
    goIndex() {
      this.$router.replace({ name: "b_frame01" });
    }
  },
  mounted() {
    if (localStorage.getItem("userNumber")) {
      this.name = localStorage.getItem("userNumber");
    } else {
      this.name = "用户";
    }
  }
};
</script>
<style scoped>
.display-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.display-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.index-header {
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: #ffffff;
}
.index-header-content {
  width: 1200px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.index-left p {
}
#index-p1 {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  border-right: 1px solid #c4c2c2;
  padding-right: 30px;
  margin-right: 30px;
  cursor: pointer;
}
.index-p {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-right: 40px;
  height: 27px;
  line-height: 27px;
  padding: 0 20px;
  color: #333333;
  border-radius: 5px;
  cursor: pointer;
}
.index-p:hover {
  color: #ffffff;
  background-color: #62bd72;
}
.index-ped {
  color: #ffffff;
  background-color: #62bd72;
}
.index-right {
  cursor: pointer;
  font-size: 16px;
  height: 80px;
  width: 100px;
  text-align: center;
  line-height: 80px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  position: relative;
}
.goOut {
  position: absolute;
  left: 0;
  top: 80px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  font-size: 15px;
  color: #666666;
  text-align: center;
  display: none;
}
.index-right:hover .goOut {
  display: inline;
}
</style>

