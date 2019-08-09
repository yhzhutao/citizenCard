<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  mounted() {
    if (this._isMobile()) {
      // 手机端
      this.$router.replace("/m_index/m_home");
      // this.$router.replace('/citizenCard');
    } else {
      // pc端
      // this.$router.replace("/citizenCard");
    }
  }
};
</script>

<style>
.el-step__title.is-process {
  color: #62bd72 !important;
}
.el-step__head.is-process {
  border-color: #62bd72 !important;
}
.el-carousel--horizontal {
  overflow: hidden !important;
}
.el-icon-close:before {
  font-size: 25px !important;
}
.el-dialog__title {
  line-height: 24px !important;
  font-size: 18px !important;
  padding-right: 10px !important;
  color: #303133 !important;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  color: #303133 !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  color: #303133 !important;
}
.el-message-box {
  width: 5.5rem !important;
  padding-bottom: 0.2rem !important;
  border-radius: 0.05rem !important;
  border: 0.01rem solid #ebeef5 !important;
  font-size: 0.25rem !important;
  -webkit-box-shadow: 0 0.2rem 0.12rem 0 rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 0.2rem 0.12rem 0 rgba(0, 0, 0, 0.1) !important;
}
.el-tabs__active-bar {
  height: 3px !important;
}
.el-tabs__nav-next,
.el-tabs__nav-prev {
  line-height: 80px !important;
}
.el-tabs__item {
  padding: 0 27px !important;
  height: 80px !important;
  line-height: 80px !important;

  font-size: 16px !important;
  font-weight: 400 !important;
  color: #333333 !important;
  position: relative !important;
}
.el-tabs__item:focus.is-active.is-focus:not(:active) {
  -webkit-box-shadow: 0 0 0px 0px transparent inset !important;
  box-shadow: 0 0 2px 2px transparent inset !important;
  border-radius: 3px !important;
}
.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
.el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 5px !important;
}

.el-tabs--bottom .el-tabs__item.is-bottom:last-child,
.el-tabs--bottom .el-tabs__item.is-top:last-child,
.el-tabs--top .el-tabs__item.is-bottom:last-child,
.el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: 7px !important;
}
.el-loading-spinner .el-loading-text {
  color: rgb(165, 245, 170) !important;
  margin: 7px 0 !important;
  font-size: 15px !important;
}
.el-loading-spinner i {
  color: rgb(165, 245, 170) !important;
  font-size: 40px !important;
}
.el-message {
  min-width: 6.9rem !important;
}
.el-step__icon {
  width: 12px !important;
  height: 12px !important;
  font-size: 30px !important;
}
.el-step__icon-inner {
  color: transparent !important;
}
.el-step__title {
  font-size: 14px !important;
}
.el-step.is-vertical .el-step__head {
  display: flex !important;
}
.el-step.is-vertical .el-step__main {
  padding-left: 0 !important;
}
.el-step.is-vertical .el-step__title {
  line-height: 15px !important;
}
.el-step.is-vertical .el-step__line {
  width: 2px !important;
  top: 2px !important;
  left: 5.5px !important;
}
.el-carousel__arrow {
  height: 70px !important;
  width: 70px !important;
}
.el-carousel__arrow i {
  font-size: 50px !important;
}
.el-radio__input.is-disabled .el-radio__inner,
.el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #f5f7fa !important;
  border-color: #e4e7ed !important;
}
.el-radio__input.is-disabled + span.el-radio__label {
  color: transparent !important;
}
</style>
