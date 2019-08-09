import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
// import home from '@/views/index1.vue'
import Login from '@/components/Login/Login'
import Register from '@/components/register/register'
import Home1 from '@/views/home1.vue'
import Us from '@/components/aboutUs/index'
import Help from '@/components/helpCenter/index'
import Development from '@/components/development/index'
import Solution from '@/components/solution/index'
import Product from '@/components/productCenter/index'
import Apply from '@/components/register/apply1'
import Apply01 from '@/components/register/apply01'
import Examine from "@/components/toExamine/examine";
import Userinfo from '@/components/register/Userinfo';
import Userinfo02 from '@/components/register/Userinfo02';
import Notice from '@/components/notice/notice';
import Details from '@/components/notice/details';
import SolutionDetail from '@/components/solution/solutionDetail'
import ProductDetail from '@/components/productCenter/proDetails';
import Forget from '@/components/forgetP/index';
import Reexmaine01 from "@/components/toExamine/reexamine01";
import Reexmaine02 from "@/components/toExamine/reexamine02";
import Reject01 from "@/components/toExamine/reject01";
import Reject02 from "@/components/toExamine/reject02";
import Promise01 from '@/components/promise/Promise01';
import Maps from '@/components/map/map';
//移动端
import Mindex from '@/views/m_index';
import Mhome from '@/views/m_home';
import MaboutUS from '@/components/aboutUs/m_aboutUS';
import Mhelp from '@/components/helpCenter/m_index';
import Mlogin from '@/components/m_login/m_login';
import Mnotice from '@/components/notice/m_notice';
import Mdetails from '@/components/notice/m_details';
import MproductCenter from '@/components/productCenter/m_index';
import MproDetails from '@/components/productCenter/m_proDetails';
import Msolution from '@/components/solution/m_index';
import MsolutionDetail from '@/components/solution/m_solutionDetail';
import Mdevelopment from '@/components/development/m_index';
import Mexamine from '@/components/m_examine/index';
import Mforget from '@/components/m_login/m_forget';
import Mregister from '@/components/m_register/index';
import Mapply from '@/components/m_register/m_apply01';
import Mapply01 from '@/components/m_register/m_apply02';
import Mreexamine01 from '@/components/m_examine/m_reexmaine01';
import Mreexamine02 from '@/components/m_examine/m_reexmaine02';
import M_reject01 from '@/components/m_examine/m_reject01';
import M_reject02 from '@/components/m_examine/m_reject02';
import M_userInfo01 from '@/components/m_register/m_userInfo';
import M_userInfo02 from '@/components/m_register/m_userInfo02';
//商户中心
import B_login from '@/components/businessCenter/login';
import B_register from '@/components/businessCenter/register';
import ForgetLogin from '@/components/businessCenter/forgetL';
import B_name from '@/components/businessCenter/authentication/name';
import B_bank from '@/components/businessCenter/authentication/bank';
import B_frame01 from '@/components/businessCenter/frame01/index';
import B_frame02 from '@/components/businessCenter/frame02/index';
import B_frame03 from '@/components/businessCenter/frame03/index';
import BankList from '@/components/businessCenter/frame01/bankList';
import Binding from '@/components/businessCenter/frame01/binding';
import Recharge from '@/components/businessCenter/frame01/recharge';
import CashWithdrawal from '@/components/businessCenter/frame01/cashWithdrawal';
import Payment from '@/components/businessCenter/frame01/payment';
import PayState from '@/components/businessCenter/frame01/success';
import ForgetPay from '@/components/businessCenter/frame02/forgetPay';



Vue.use(Router)
const router = new Router({
  // mode:'history',
  routes: [{
      path: '/',
      component: index,
      children: [{
          path: '/citizenCard',
          name: 'citizenCard',
          component: Home1
        },
        {
          path: '/product',
          name: 'product',
          component: Product
        },
        {
          path: '/solution',
          name: 'solution',
          component: Solution
        },
        {
          path: '/development',
          name: 'development',
          component: Development
        },
        {
          path: '/help',
          name: 'help',
          component: Help
        },
        {
          path: '/us',
          name: 'aboutUs',
          component: Us
        },
        {
          path: '/solutionDetail',
          name: 'solutionDetail',
          component: SolutionDetail
        },
        {
          path: '/productDetail',
          name: 'productDetail',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/m_index',
      name: 'm_index',
      component: Mindex,
      children: [{
        path: '/m_index/m_home',
        name: 'm_home',
        component: Mhome
      }, {
        path: '/m_index/m_aboutUS',
        name: 'm_aboutUS',
        component: MaboutUS
      }, {
        path: '/m_index/m_help',
        name: 'm_help',
        component: Mhelp
      }, {
        path: '/m_index/m_notice',
        name: 'm_notice',
        component: Mnotice
      }, {
        path: '/m_index/m_productCenter',
        name: 'm_productCenter',
        component: MproductCenter
      }, {
        path: '/m_index/m_apply01',
        name: 'm_apply01',
        component: Mapply
      }, {
        path: '/m_index/m_apply02',
        name: 'm_apply02',
        component: Mapply01
      }, {
        path: '/m_index/m_solution',
        name: 'm_solution',
        component: Msolution
      }, {
        path: '/m_index/m_reexamine01',
        name: 'm_reexamine01',
        component: Mreexamine01
      }, {
        path: '/m_index/m_proDetails',
        name: 'm_proDetails',
        component: MproDetails
      }, {
        path: '/m_index/m_reexamine02',
        name: 'm_reexamine02',
        component: Mreexamine02
      }, {
        path: '/m_index/m_reject01',
        name: 'm_reject01',
        component: M_reject01
      }, {
        path: '/m_index/m_details',
        name: 'm_details',
        component: Mdetails
      }, {
        path: '/m_index/m_solutionDetail',
        name: 'm_solutionDetail',
        component: MsolutionDetail
      }, {
        path: '/m_index/m_reject02',
        name: 'm_reject02',
        component: M_reject02
      }, {
        path: '/m_index/m_examine',
        name: 'm_examine',
        component: Mexamine
      }, {
        path: '/m_index/m_userInfo01',
        name: 'm_userInfo01',
        component: M_userInfo01
      }, {
        path: '/m_index/m_userInfo02',
        name: 'm_userInfo02',
        component: M_userInfo02
      }, {
        path: '/m_index/m_development',
        name: 'm_development',
        component: Mdevelopment
      }]
    }, {
      path: '/m_login',
      name: 'm_login',
      component: Mlogin
    }, {
      path: '/m_register',
      name: 'm_register',
      component: Mregister
    }, {
      path: '/m_forget',
      name: 'm_forget',
      component: Mforget
    },
    {
      path: '/map',
      name: 'map',
      component: Maps
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }, {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply
    }, {
      path: '/apply01',
      name: 'applySecond',
      component: Apply01
    }, {
      path: '/examine',
      name: 'examine',
      component: Examine
    }, {
      path: '/userInfo',
      name: 'userinfo',
      component: Userinfo
    }, {
      path: '/userInfo02',
      name: 'userinfo02',
      component: Userinfo02
    }, {
      path: '/notice',
      name: 'noticeMore',
      component: Notice,
    }, {
      path: '/details',
      name: 'details',
      component: Details
    }, {
      path: '/reexmaine01',
      name: 'reexmaine01',
      component: Reexmaine01
    }, {
      path: '/reexmaine02',
      name: 'reexmaine02',
      component: Reexmaine02
    }, {
      path: '/promise01',
      name: 'promise01',
      component: Promise01
    }, {
      path: '/reject01',
      name: 'reject01',
      component: Reject01
    }, {
      path: '/reject02',
      name: 'reject02',
      component: Reject02
    }, {
      path: '/reject02',
      name: 'reject02',
      component: Reject02
    }, {
      path: '/b_login',
      name: 'b_login',
      component: B_login,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/b_register',
      name: 'b_register',
      component: B_register,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/authentication_name',
      name: 'authentication_name',
      component: B_name,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/authentication_bank',
      name: 'authentication_bank',
      component: B_bank,
      meta: {
        title: '惠民汇付'
      }
    },
    {
      path: '/b_frame01',
      name: 'b_frame01',
      component: B_frame01,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/b_frame02',
      name: 'b_frame02',
      component: B_frame02,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/b_frame03',
      name: 'b_frame03',
      component: B_frame03,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/bankList',
      name: 'bankList',
      component: BankList,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/bindingBankCards',
      name: 'binding',
      component: Binding,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/recharge',
      name: 'recharge',
      component: Recharge,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/cashWithdrawal',
      name: 'cashWithdrawal',
      component: CashWithdrawal,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/commodityPayment',
      name: 'payment',
      component: Payment,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/payState',
      name: 'payState',
      component: PayState,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/forgetPay',
      name: 'forgetPay',
      component: ForgetPay,
      meta: {
        title: '惠民汇付'
      }
    }, {
      path: '/forgetLogin',
      name: 'forgetLogin',
      component: ForgetLogin,
      meta: {
        title: '惠民汇付'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// // 全局路由守卫
// router.beforeEach((to, from, next) => {
//   //console..log('navigation-guards');
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//   const nextRoute = ['home1', 'help'];
//   let isLogin = true;  // 是否登录
//   // 未登录状态；当路由到nextRoute指定页时，跳转至login
//   //console..log(to.name)
//   //console..log(nextRoute.indexOf(to.name))
//   if (nextRoute.indexOf(to.name) >= 0) {  
//     if (!isLogin) {  
//       router.push({ name: 'login' })
//     }
//   }
//   // 已登录状态；当路由到login时，跳转至home 
//   if (to.name === 'login') {
//     if (isLogin) {
//       router.push({ name: 'home1' });
//     }
//   }
//   next();
// });
export default router;
