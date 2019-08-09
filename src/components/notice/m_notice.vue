<template>
  <div id="target" class="body">
    <div v-if="detailsTr" class="notice-all">
      <ul class="notice-header">
        <li @click="noticeLi(0)" :class="{'noticeLi':tabsCo1}">平台公告</li>
        <li @click="noticeLi(1)" :class="{'noticeLi':tabsCo2}">新闻资讯</li>
      </ul>
      <ul v-if="tabsCo1" class="noticeList">
        <li @click="checkDetails(item.newsId)" v-for="(item,index) in noticeDatas" :key="index">
          <p class="noticeList-li-p">{{item.newsCname}}</p>
          <!-- {{item.createDate}} -->
          <p class="zhiTop">
            <img v-show="item.newsDesc==1" :src="news" alt />
          </p>
        </li>
      </ul>
      <ul v-if="tabsCo2" class="newsList">
        <li @click="checkDetails(item.newsId)" :key="index" v-for="(item,index) in newsList">
          <div class="newsList-left">
            <img :src="item.imgAddr" alt />
          </div>
          <div class="newsList-right">
            <div class="newsList-tit">
              <p>{{item.newsCname}}</p>
              <p></p>
            </div>
            <p class="newsList-content">{{item.createDate}}</p>
          </div>
        </li>
      </ul>
      <div class="pages">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template> <script src='../../static/js/rem.js'> </script>
<script>
export default {
  data() {
    return {
      t: 0,
      pageSize: 10,
      tabsCo1: true,
      tabsCo2: false,
      total: 10,
      detailsD: "有没有收到",
      detailsTr: true,
      imgs: require("../../assets/img/phone.png"),
      activeName: "first",
      currentPage3: 1,
      news: require("../../assets/img/topOne.png"),
      newsList: [
        {
          img: require("../../assets/img/phone.png"),
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          content:
            "为了保护您的账户使用安全，微信支付将于2019年3月11日起，限制商户平台（PC端）不可多人同时登录同一账号。若有多人同时登录同一账号，系统将自动使原登录者退出下线，只允许最新登录者保持登录状态。如有商户号多人管理需求，请使用管理员账户登录商户平台，在“账户中心-账户设置-员工账号管理”添加员工账号进行……"
        },
        {
          img: require("../../assets/img/phone.png"),
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          content:
            "为了保护您的账户使用安全，微信支付将于2019年3月11日起，限制商户平台（PC端）不可多人同时登录同一账号。若有多人同时登录同一账号，系统将自动使原登录者退出下线，只允许最新登录者保持登录状态。如有商户号多人管理需求，请使用管理员账户登录商户平台，在“账户中心-账户设置-员工账号管理”添加员工账号进行……"
        },
        {
          img: require("../../assets/img/phone.png"),
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          content:
            "为了保护您的账户使用安全，微信支付将于2019年3月11日起，限制商户平台（PC端）不可多人同时登录同一账号。若有多人同时登录同一账号，系统将自动使原登录者退出下线，只允许最新登录者保持登录状态。如有商户号多人管理需求，请使用管理员账户登录商户平台，在“账户中心-账户设置-员工账号管理”添加员工账号进行……"
        }
      ],
      noticeDatas: [
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        },
        {
          name: "结算付款和提现到账银行卡临时维护通知",
          data: "2010-01-01",
          new: true
        }
      ]
    };
  },
  created() {
    // //console..log("00000");
  },
  methods: {
    getData(t, p, ps) {
      this.$get(this.$api.api + "/gw/newsinfo/titleList", {
        newsType: t, // 0-公告 1-新闻
        page: p,
        pageSize: ps
      }).then(res => {
        if (t == 0) {
          this.pageSize = 10;
          this.noticeDatas = res.data.records;
          //console..log("公告列表", res);
          this.total = parseInt(res.data.total);
        } else {
          if (res.code == "0") {
            this.pageSize = 7;
            this.newsList = res.data.records;
            //console..log("新闻列表", res);
            this.total = parseInt(res.data.total);
          }
        }
      });
    },
    handleSizeChange(val) {
      //console..log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console..log(val);
      if (this.t == 0) {
        this.getData(0, val, 10);
      } else {
        this.getData(1, val, 7);
      }
    },
    noticeLi(e) {
      this.currentPage3 = 1;
      if (e == 0) {
        this.getData(0, 1, 10);
        this.t = 0;
        this.tabsCo1 = true;
        this.tabsCo2 = false;
      } else {
        this.t = 1;
        this.getData(1, 1, 7);
        this.tabsCo1 = false;
        this.tabsCo2 = true;
      }
    },
    handleClick(tab, event) {
      //console..log(tab.index);
      if (tab.index == 0) {
        this.pageSize = 10;
        this.getData(0, 1, 10);
      } else {
        this.pageSize = 7;
        this.getData(1, 1, 7);
      }
    },
    checkDetails(e) {
      this.$router.push({ name: "m_details", params: { id: e } });
    }
  },
  mounted() {
    this.getData(0, 1, 10); //新闻
    var target = document.getElementById("target");
    target.scrollIntoView();
  },
  destroyed() {}
};
</script>
<style scoped>
.body {
  background-color: #f7f8fa;
}

.notice-all {
  /* height: 900px; */
  /* width: 1200px; */
  /* background-color: #ffffff; */
  overflow: hidden;
}
.notice-header {
  width: 100%;
  background: #ffffff;
  position: fixed;
  left: 0;
  top: 0.8rem;
}
.notice-header {
  height: 0.7rem;
  box-shadow: 0 0 0.02rem 0.02rem #e0e1e3;
  overflow: hidden;
}
.notice-header li {
  float: left;
  width: 0.9rem;
  height: 0.71rem;
  text-align: center;
  line-height: 0.8rem;
  margin-left: 0.65rem;
  font-size: 0.35rem;
}
.noticeLi {
  border-bottom: 0.04rem solid #419f48;
  font-weight: 500;
  color: #419f48;
}
.noticeList {
  padding: 0 0.3rem;
  margin-top: 0.85rem;
  height:10rem;
  background-color: #ffffff;
}
.noticeList li {
  /* padding: 0 40px; */
  height: 1rem;
  padding: 0 0.2rem;
  border-bottom: 0.01rem solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: PingFangSC-Regular;
  color: rgba(51, 51, 51, 1);
  background-color: #ffffff;
}
.noticeList-li-p {
  font-weight: 400;
  font-size: 0.29rem;
  line-height: 0.35rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.newsList {
  padding: 0 0.3rem;
  height: 10rem;
  margin-top: 0.85rem;
  background-color: #ffffff;
}
.newsList li {
  border-bottom: 0.01rem solid #e5e5e5;
  padding: 0.2rem 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.noticeList p {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.zhiTop {
  width: 0.55rem;
  margin-left: 0.1rem;
}
.zhiTop img {
  width: 100%;
}
.pages {
  text-align: center;
  background-color: #ffffff;
  padding-top: 0.8rem;
  padding-bottom: 0.5rem;
}
.newsList-left {
  width: 1.4rem;
  height: 1rem;
  margin-right: 0.5rem;
  border-radius: 0.05rem;
  overflow: hidden;
}
.newsList-left img {
  width: 100%;
  height: 100%;
  background-color: rgb(196, 235, 222);
}
.newsList-right {
  height: 0.9rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
}
.newsList-tit {
  margin: 0.02rem 0 0.08rem;
}
.newsList-tit p:first-child {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
   white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  color: rgba(51, 51, 51, 1);
}
.newsList-tit p:last-child {
  font-size: 0.27rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.newsList-content {
  font-size: 0.27rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);

  overflow: hidden;
}
</style>
