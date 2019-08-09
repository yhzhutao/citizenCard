<template>
  <div id="target" class="body">
    <headerD></headerD>
    <div v-if="detailsTr" class="container notice-all1">
      <ul class="notice-header1">
        <li @click="noticeLi(0)" :class="{'noticeLi':tabsCo1}">平台公告</li>
        <li @click="noticeLi(1)" :class="{'noticeLi':tabsCo2}">新闻资讯</li>
      </ul>
      <ul v-if="tabsCo1" class="noticeList">
        <li @click="checkDetails(item.newsId)" v-for="(item,index) in noticeDatas" :key="index">
          <p>
            {{item.newsCname}}
            <img v-show="item.newsDesc==1" :src="news" alt />
          </p>
          <p>{{item.createDate}}</p>
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
    <!-- <router-view @toFather='showMsg' :detailsD='detailsD'></router-view> -->
    <footerD></footerD>
  </div>
</template>
<script>
import headerD from "../public/headerD";
import footerD from "../public/footerD";
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
            this.pageSize = 5;
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
        this.getData(1, val, 5);
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
        this.getData(1, 1, 5);
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
        this.pageSize = 5;
        this.getData(1, 1, 5);
      }
    },
    checkDetails(e) {
      this.$router.push({ name: "details", params: { id: e } });
    }
  },
  components: {
    headerD,
    footerD
  },
  mounted() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.getData(0, 1, 10); //新闻
    this.$store.commit("changeValue", "first");
  },
  destroyed() {}
};
</script>
<style scoped>
.body {
  background-color: #f7f8fa;
  padding-top: 100px;
}

.notice-all1 {
  /* height: 900px; */
  width: 1200px;
  /* background-color: #ffffff; */
  overflow: hidden;
}
.notice-header1 {
  background: #ffffff;
}
.notice-header1 {
  height: 64px;
  box-shadow: 0 0 2px 2px #e0e1e3;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
  overflow: hidden;
  /* border-bottom:  */
}
.notice-header1 li {
  float: left;
  width: 70px;
  height: 64px;
  line-height: 80px;
  text-align: center;
  margin-left: 65px;
  font-size: 16px;
  cursor: pointer;
}
.noticeLi {
  border-bottom: 2px solid #419f48;
  color: #419f48;
}
.noticeList {
  padding: 0 40px;
  margin-top: 10px;
  height: 600px;
  background-color: #ffffff;
}
.noticeList li {
  /* padding: 0 40px; */
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  background-color: #ffffff;
}
.noticeList li p {
  cursor: pointer;
}
.newsList {
  padding: 0 40px;
  height: 620px;
  margin-top: 10px;
  background-color: #ffffff;
}
.newsList li {
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.noticeList p {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.noticeList img {
  width: 29px;
  /* height:17px; */
  margin-left: 10px;
}
.pages {
  text-align: center;
  background-color: #ffffff;
  padding-top: 80px;
  padding-bottom: 50px;
}
.newsList-left {
  width: 140px;
  height: 90px;
  border-radius: 5px;
  overflow: hidden;
  /* display: inline; */
}
.newsList-left img {
  width: 100%;
  height: 90px;
  margin-right: 50px;
  background-color: rgb(196, 235, 222);
}
.newsList-right {
  width: 960px;
  height: 90px;
  cursor: pointer;
}
.newsList-tit {
  /* display: flex;
  justify-content: space-between;
  align-items:flex-end; */
  margin: 2px 0 8px;
}
.newsList-tit p:first-child {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  color: rgba(51, 51, 51, 1);
}
.newsList-tit p:last-child {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.newsList-content {
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  /* line-height: 62px;
  height: 62px; */
  overflow: hidden;
}
</style>
