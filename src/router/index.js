import Vue from 'vue'
import Router from 'vue-router'
import { MessageBox } from 'mint-ui'
import axios from 'axios'

// import Hello from '@/components/Hello'
// 首页
const Home = r => require.ensure([], () => r(require('@/pages/home/Home')))
// 出境游
const OutTravel = r => require.ensure([], () => r(require('@/pages/OutTravel/OutTravel')))
const OutTravelDetail = r => require.ensure([], () => r(require('@/pages/OutTravel/OutTravel_detail')))
const OutTravelOrder = r => require.ensure([], () => r(require('@/pages/OutTravel/OutTravel_order')))

//周边游
const Near = r => require.ensure([], () => r(require('@/pages/Near/Near')))

// 专线
const LineTravel = r => require.ensure([], () => r(require('@/pages/LineTravel/LineTravel')))
const LineTravelDetail = r => require.ensure([], () => r(require('@/pages/LineTravel/LineTravel_detail')))
const LineTravelOrder = r => require.ensure([], () => r(require('@/pages/LineTravel/LineTravel_order')))
const LineTravelPayment = r => require.ensure([], () => r(require('@/pages/LineTravel/LineTravel_payment')))
// 专线-观光车-出境游共用日期
const LineTravelDate = r => require.ensure([], () => r(require('@/pages/LineTravel/LineTravel_date')))

// 旅游专列
const TrainTravel = r => require.ensure([], () => r(require('@/pages/TrainTravel/TrainTravel')))
const TrainTravelDetail = r => require.ensure([], () => r(require('@/pages/TrainTravel/TrainTravel_detail')))
const TrainTravelDate = r => require.ensure([], () => r(require('@/pages/TrainTravel/TrainTravel_date')))
const TrainTravelOrder = r => require.ensure([], () => r(require('@/pages/TrainTravel/TrainTravel_order')))


// 观光车
const Car = r => require.ensure([], () => r(require('@/pages/Car/Car')))
const CarDetail = r => require.ensure([], () => r(require('@/pages/Car/Car_detail')))
const CarOrder = r => require.ensure([], () => r(require('@/pages/Car/Car_order')))
const Ticket = r => require.ensure([], () => r(require('@/pages/Ticket/Ticket')))

// 酒店
const Hotel = r => require.ensure([], () => r(require('@/pages/hotel/hotel')))
const HotelDetail = r => require.ensure([], () => r(require('@/pages/hotel/hotel_detail')))
const HotelMap = r => require.ensure([], () => r(require('@/pages/hotel/hotel_map')))

// 门票
const Gate = r => require.ensure([], () => r(require('@/pages/gate/Gate')))
const GateDetail = r => require.ensure([], () => r(require('@/pages/gate/Gate_detail')))
const GateOrder = r => require.ensure([], () => r(require('@/pages/gate/Gate_order')))
const GatePayment = r => require.ensure([], () => r(require('@/pages/gate/Gate_payment')))
const GateMap = r => require.ensure([], () => r(require('@/pages/gate/Gate_map')))
// 登录
const Login = r => require.ensure([], () => r(require('@/pages/login/Login')))
const Register = r => require.ensure([], () => r(require('@/pages/login/Register')))
const ForgetOne = r => require.ensure([], () => r(require('@/pages/login/ForgetOne')))
const ForgetTwo = r => require.ensure([], () => r(require('@/pages/login/ForgetTwo')))
// 404
const Error = r => require.ensure([], () => r(require('@/components/404')))

// 关于我们
const About = r => require.ensure([], () => r(require('@/components/About/About')))
// Vip
const Vip = r => require.ensure([], () => r(require('@/components/About/Vip')))

// 火车拉汽车
const TrainByCar = r => require.ensure([], () => r(require('@/components/About/TrainByCar')))

// 设置
const Setting = r => require.ensure([], () => r(require('@/components/About/Setting')))

const Search = r => require.ensure([], () => r(require('@/components/search/Search')))
// 攻略
const Strategy = r => require.ensure([], () => r(require('@/components/strategy/Strategy')))
const StrategyDetail = r => require.ensure([], () => r(require('@/components/strategy/Strategy_detail')))

const Service = r => require.ensure([], () => r(require('@/components/service/Service')))
// 个人中心
const Center = r => require.ensure([], () => r(require('@/components/center/Center')))
const CenterMsg = r => require.ensure([], () => r(require('@/components/center/Center_message')))
const CenterMsgDetail = r => require.ensure([], () => r(require('@/components/center/Center_message_detail')))

// 我的
const MyInfo = r => require.ensure([], () => r(require('@/pages/userInfo/MyInfo')))
const MyNick = r => require.ensure([], () => r(require('@/pages/userInfo/MyNick')))
const MyEmail = r => require.ensure([], () => r(require('@/pages/userInfo/MyEmail')))

// 我的订单
const Order = r => require.ensure([], () => r(require('@/pages/order/Order')))
const CommentPage = r => require.ensure([], () => r(require('@/pages/order/Comment')))
const OrderDetail = r => require.ensure([], () => r(require('@/pages/order/Order_detail')))
const OrderTicketDetail = r => require.ensure([], () => r(require('@/pages/order/Order_ticket_detail')))   //门票订单详情
const OrderTrainDetail = r => require.ensure([], () => r(require('@/pages/order/Order_train_detail')))     //专列订单详情

// 我的积分
const Integral = r => require.ensure([], () => r(require('@/pages/userInfo/Integral')))
const IntegralList = r => require.ensure([], () => r(require('@/pages/userInfo/Integral_List')))
const IntegralTo = r => require.ensure([], () => r(require('@/pages/userInfo/Integral_To')))

// 优惠券
const MyTicket = r => require.ensure([], () => r(require('@/pages/userInfo/MyTicket')))

// 员工--带团列表
const TeamList = r => require.ensure([], () => r(require('@/pages/team/teamList')))
const TeamListDetail = r => require.ensure([], () => r(require('@/pages/team/teamList_detail')))

// 添加出游人
const Person = r => require.ensure([], () => r(require('@/components/person/Person')))
const PersonEdit = r => require.ensure([], () => r(require('@/components/person/Person_edit')))

// 分享
const Share = r => require.ensure([], () => r(require('@/pages/userInfo/Share')))

// 问卷调查
const Question = r => require.ensure([], () => r(require('@/pages/userInfo/question')))

const MyFooter = r => require.ensure([], () => r(require('@/components/footer/MyFooter')))

Vue.component('myFooter', MyFooter)
Vue.use(Router)

const ROUTER = new Router({
  // mode:'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { keepAlive: true }
    },
    // 出境游
    {
      path: '/OutTravel',
      name: 'OutTravel',
      component: OutTravel
    },
    // 出境游详情
    {
      path: '/OutTravelDetail/:id',
      name: 'OutTravelDetail',
      component: OutTravelDetail
    },
    // 出境游订单
    {
      path: '/OutTravelOrder',
      name: 'OutTravelOrder',
      component: OutTravelOrder
    },
    // 周边游
    {
      path: '/Near',
      name: 'Near',
      component: Near
    },
    // 专列
    {
      path: '/TrainTravel',
      name: 'TrainTravel',
      component: TrainTravel
    },
    // 专列详情
    {
      path: '/TrainTravel-detail/:id',
      name: 'TrainTravel-detail',
      component: TrainTravelDetail,
      meta: { keepAlive: false }
    },
    // 专列选团期
    {
      path: '/TrainTravel-date',
      name: 'TrainTravel-date',
      component: TrainTravelDate,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 专列订单
    {
      path: '/TrainTravel-order',
      name: 'TrainTravel-order',
      component: TrainTravelOrder,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 专线
    {
      path: '/LineTravel',
      name: 'LineTravel',
      component: LineTravel
    },
    // 专线选团期--专线-观光车-出境游
    {
      path: '/LineTravel-date',
      name: 'LineTravel-date',
      component: LineTravelDate,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 专线详情
    {
      path: '/LineTravelDetail/:id',
      name: 'LineTravelDetail',
      component: LineTravelDetail
    },
    // 专线下单
    {
      path: '/LineTravelOrder',
      name: 'LineTravelOrder',
      component: LineTravelOrder
    },
    // 专线支付
    {
      path: '/LineTravel_payment/:order_id',
      name: 'LineTravel_payment',
      component: LineTravelPayment,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 观光车
    {
      path: '/Car',
      name: 'Car',
      component: Car
    },
    // 观光车详情
    {
      path: '/CarDetail/:id',
      name: 'CarDetail',
      component: CarDetail
    },
    // 观光车预定
    {
      path: '/CarOrder',
      name: 'CarOrder',
      component: CarOrder
    },
    // 酒店
    {
      path: '/hotel',
      name: 'hotel',
      component: Hotel
    },
    // 酒店详情
    {
      path: '/hotel-detail/:id',
      name: 'hotel-detail',
      component: HotelDetail
    },
    // 酒店地图
    {
      path: '/hotel-map/:item',
      name: 'hotel-map',
      component: HotelMap
    },
    // 门票地图
    {
      path: '/gate-map/:item',
      name: 'gate-map',
      component: GateMap
    },
    // 景区门票
    {
      path: '/gate',
      name: 'gate',
      component: Gate
    },
    // 景区门票详情
    {
      path: '/gate-detail/:id',
      name: 'gate-detail',
      component: GateDetail
    },
    // 景区门票预订
    {
      path: '/gate-order/:id',
      name: 'gate-order',
      component: GateOrder,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    // 景区门票支付
    {
      path: '/gate_payment/:order_id',
      name: 'gate_payment',
      component: GatePayment
    },
    // 搜索
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 票务预订
    {
      path: '/Ticket',
      name: 'Ticket',
      component: Ticket,
      meta: { keepAlive: true }
    },
    // 攻略
    {
      path: '/strategy',
      name: 'strategy',
      component: Strategy,
      meta: { keepAlive: true }
    },
    // 攻略详情
    {
      path: '/strategy-detail/:id',
      name: 'strategy-detail',
      component: StrategyDetail
    },
    // 客服
    {
      path: '/service',
      name: 'service',
      component: Service,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 个人中心
    {
      path: '/center',
      name: 'center',
      component: Center,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 我的消息
    {
      path: '/centerMsg',
      name: 'centerMsg',
      component: CenterMsg
    },
    // 我的消息详情
    {
      path: '/centerMsgDetail',
      name: 'centerMsgDetail',
      component: CenterMsgDetail
    },
    // 我的
    {
      path: '/myInfo/:userInfo',
      name: 'myInfo',
      component: MyInfo
    },
    // 我的订单
    {
      path: '/order/:num',
      name: 'order',
      component: Order,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 我的订单--专线详情
    {
      path: '/order_detail/:id',
      name: 'order_detail',
      component: OrderDetail
    },
    // 我的订单--专列详情
    {
      path: '/order_train_detail/:id',
      name: 'order_train_detail',
      component: OrderTrainDetail
    },
    // 我的订单-门票-详情
    {
      path: '/order_ticket_detail/:id',
      name: 'order_ticket_detail',
      component: OrderTicketDetail
    },
    // 我的订单--评价
    {
      path: '/comment/:comParams',
      name: 'comment',
      component: CommentPage
    },
    // 我的昵称
    {
      path: '/myNick/:realname/:user_type',
      name: 'myNick',
      component: MyNick
    },
    // 我的邮箱
    {
      path: '/myEmail/:userInfo',
      name: 'myEmail',
      component: MyEmail
    },
    // 我的积分
    {
      path: '/integral',
      name: 'integral',
      component: Integral,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 我的积分兑换列表
    {
      path: '/integral_list',
      name: 'integral_list',
      component: IntegralList
    },
    // 我的积分兑换列表
    {
      path: '/integral_to',
      name: 'integral_to',
      component: IntegralTo
    },
    // 优惠券
    {
      path: '/myTicket',
      name: 'myTicket',
      component: MyTicket,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 分享
    {
      path: '/share',
      name: 'share',
      component: Share
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // 忘记密码01
    {
      path: '/forgetOne',
      name: 'forgetOne',
      component: ForgetOne
    },
    // 忘记密码02
    {
      path: '/forgetTwo',
      name: 'forgetTwo',
      component: ForgetTwo
    },
    // 员工带团列表
    {
      path: '/teamList',
      name: 'teamList',
      component: TeamList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },

    },
    // 员工带团详情
    {
      path: '/teamListDetail/:id/:time',
      name: 'teamListDetail',
      component: TeamListDetail,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    // 关于我们
    {
      path: '/About',
      name: 'About',
      component: About
    },
    // 会员等级
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },
    // 选择出游人
    {
      path: '/person/:name',
      name: 'person',
      component: Person
    },
    // 新建/编辑 出游人
    {
      path: '/PersonEdit/:item/:backName',
      name: 'PersonEdit',
      component: PersonEdit
    },
    // 火车拉汽车
    {
      path: '/trainByCar',
      name: 'trainByCar',
      component: TrainByCar
    },
    // 设置
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    // 问卷调查
    {
      path: '/question',
      name: 'question',
      component: Question
    },
    // 404
    {
      path: '*',
      name: 'Hello',
      component: Error
    }
  ]
})

export default ROUTER

ROUTER.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})


var token
ROUTER.beforeEach((to, from, next) => {
  axios
      .post("/api_login/is_login")
      .then(res => {
        token = res.data.status
      })
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    var loginToken = sessionStorage.getItem("loginToken");
    // alert(loginToken)
    // alert(token)
    if (loginToken || token == 1) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      MessageBox.confirm('', {
        message: '您未登录,是否登录？',
        title: '提示',
        confirmButtonText: '登录',
        cancelButtonText: '我再看看'
      }).then(action => {
        if (action == 'confirm') {
          next({
            path: '/login',
            query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      }).catch(err => {
        if (err == 'cancel') {
          return
        }
      });
    }
  }
  else {
    next();
  }
})


