<template>
  <div class="home">
      <div class="header">
        <div>
          <span>惠民汇付</span>
        </div>
        <Ul class="header-ul">
          <li>首页</li>
          <li>产品中心</li>
          <li>解决方案</li>
          <li>开放平台</li>
          <li>帮助中心</li>
          <li>关于我们</li>
        </Ul>
        <div>
          <router-link to="/login">登陆</router-link>
        </div>
      </div>
      <div class="p1">rem</div>
      <div class="p2">vw</div>
      <div class="p3">px</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
.header,.header ul{
  display: -webkit-flex;
  justify-content: center;
  font-size:0.3rem;
}
.header-ul li{
margin: 0 5px;
}
.p1{
  height: 10px;
  width: 7.5rem;
  background: gold;
}
.p2{
  height: 10px;
  width: 10vw;
  background: gold;
}
.p3{
  height: 10px;
  width: 100px;
  background: gold;
}
</style>
