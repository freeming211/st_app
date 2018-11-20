<template>
  <div class="order-detail">
    <x-header :left-options="{backText: ''}">订单填写</x-header>

    <div class="order-detail-title" style="background: #ffffff !important;">
      <div class="order-detail-t-box">
        <div class="order-detail-name">
          <p>{{scenic_name}}</p>
        </div>

        <div class="order-detail-title-bottom">
          <div class="or-bottom-train">
            团期：
            <span>{{sTime}}</span>
          </div>
          <div class="or-bottom-train">
            人数：
            <span>{{chengren}}成人 {{child}}儿童</span>
          </div>
        </div>
      </div>
    </div>

    <div class="order-detail-userInfo" v-show="trainTypeShow">
      <div class="order-detail-news flex flex-align-center flex-pack-justify">
        <p class="order-detail-news-left">
          <i class="iconfont icon-xingli"></i>在线选铺
        </p>
      </div>

      <div class="order-detail-list">
        <ul class="train-type clearfix">
          <li v-for="(item,index) in trainType" @click="onAddClass(index)" :key="item.type" :class="{'active-li':index==typeNum}">{{item.name}}</li>
        </ul>

        <!-- 硬座 -->
        <ul class="train-type clearfix" v-show="yingShow">
          <li v-for="(item,index) in yingTypeBox" @click="onYing(item,index)" :class="{'active-li':index==ying_type_active}">{{item.name}}</li>
        </ul>
        <!-- 软座 -->
        <ul class="train-type clearfix" v-show="!yingShow">
          <li @click="onRuan(0)" :class="{'active-li':ruan_type_active}">{{ruanType[0]}}上
            <span v-if="ruanType[1] != 0">/{{ruanType[1]}}下</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="order-detail-userInfo">
      <div class="order-detail-news flex flex-align-center flex-pack-justify">
        <p class="order-detail-news-left">
          <i class="iconfont icon-xingli"></i>出游人
        </p>
        <p @click="onUser">
          <i class="iconfont icon-tianjialianxiren addUser"></i>
        </p>
      </div>

      <div class="train-order-chuyou flex flex-align-center flex-pack-justify" v-for="(item,index) in userList" :key="item.id">
        <div class="chuyou-num">出游人{{index+1}}</div>
        <div class="chuyou-name">{{item.name}}
          <span>*</span>
        </div>
        <!-- <div class="three-choice flex">
                    <div class="three-choice-up active-t">上</div>
                    <div class="three-choice-m">中</div>
                    <div class="three-choice-down">下</div>
                </div> -->
        <div class="three-choice" @click="onSplice(index)">
          <div class="three-choice-down right">x</div>
        </div>
      </div>
    </div>

    <div class="order-detail-userInfo">
      <div class="order-detail-news flex flex-align-center flex-pack-justify">
        <p class="order-detail-news-left">
          <i class="iconfont icon-xingli"></i>联系人
        </p>
        <p @click="onCoupon" style="color:#262f81">
          <i class="iconfont icon-youhuiquan"></i> 优惠券</p>
      </div>

      <div class="order-detail-list">
        <div class="order-detail-padding-box" style="padding:0 .1rem !important;border:none;">
          <div class="order-up border-b flex flex-align-center">
            <div class="order-up-one">
              联系人：
            </div>
            <div class="order-up-two">
              <input type="text" placeholder="填写取票人姓名" v-model="username">
            </div>
          </div>
          <div class="order-up border-b flex flex-align-center">
            <div class="order-up-one">
              手机号：
            </div>
            <div class="order-up-two">
              <input type="text" placeholder="填写手机号码" v-model="mobile">
            </div>
          </div>
          <div class="order-up border-b flex flex-align-center">
            <div class="order-up-one">
              邮箱：
            </div>
            <div class="order-up-two">
              <input type="text" placeholder="填写邮箱" v-model="eMail">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="order-detail-userInfo" v-show="addion_price.length>0">
      <div class="order-detail-news flex flex-align-center flex-pack-justify">
        <p class="order-detail-news-left">
          <i class="iconfont icon-xingli"></i>附加费
        </p>
      </div>

      <div class="order-detail-list" v-for="(item,index) in addion_price" :key="item.id">
        <div class="flex flex-align-center flex-pack-justify train-type">
          <div class="extra-left">
            <span>{{item.title}}</span>
            <p class="odd-ellipsis" @click="popInfo(item)">
              <em>?</em>
              <span class="extra-info">
                {{item.remark}}
              </span>
            </p>
          </div>
          <div class="extra-sel flex-1">
            <select name="" id="" v-model="item.money" @change="optChange(item.money,item.costs,index)">
              <!-- <option :value="item.costs*list" v-for="list in allPerson" :key="list">￥{{item.costs}}/份*{{list}}</option> -->
              <option :value="item.costs*list" v-for="list in allPerson" :key="list">￥{{item.costs}}/份*{{list}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="train-order-true flex">
      <div class="train-order-true-left flex">
        <span class="all">订单总额</span>
        <span class="price">
          <span class="yuan">￥</span> {{order_account}} </span>
        <!-- <span class="order-icon"><i class="iconfont icon-xiangshangjiantouarrowup"></i></span> -->
      </div>
      <div class="train-order-true-right flex-1" @click="onBuy">
        提交订单
      </div>
    </div>

    <!-- 优惠券弹出 -->
    <div v-transfer-dom>
      <popup v-model="showPopup" height="100%">
        <div class="popup">

          <div class="myTicket-item">
            <div class="myTicket-list zhuangxian" :style="{background:(couponNum == index)?'#e7f3f5':''}" v-for="(item,index) in coupon" :key="item.id" @click="onExCoupon(item,index)">
              <div class="myTicket-list-top flex flex-align-center">
                <div class="myTicket-num">
                  <span>￥
                    <span class="yuan">{{item.value}}</span>
                  </span>
                </div>
                <div class="myTicket-top-text">
                  <p class="myTicket-name odd-ellipsis">{{item.title}}</p>
                  <p class="myTicket-time">{{item.start_time}}至{{item.end_time}}</p>
                </div>
              </div>
              <div class="myTicket-list-bottom flex flex-align-center">
                <div class="flex flex-align-center" style="width:1.95rem;">
                  <!-- <div class="myTicket-sanjiao">
                                专列
                            </div> -->
                  <div style="margin-top:.15rem;text-align:center;" class="flex-1">
                    {{item.rangeName}}
                  </div>
                </div>
                <div style="margin-top:.15rem;">
                  满{{item.min_order}}可使用
                </div>
              </div>
            </div>
          </div>

          <div class="popup-cancel" @click="showPopup=false">
            返回订单
          </div>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import {
  XHeader,
  Rater,
  Group,
  Cell,
  Range,
  TransferDom,
  Popup,
  AlertModule
} from "vux";
import { Toast } from "mint-ui";
export default {
  name: "order-detail",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Rater,
    Group,
    Cell,
    Range,
    Popup
  },
  data() {
    return {
      seat_struct: [], //铺位类型
      oldItem: "",
      couponNum: "",
      showPopup: false,
      scenic_name: "",
      chengren: "",
      child: "",
      typeNum: 0,
      trainType: [],
      trainTypeShow: false, // 控制是否隐藏铺位
      btnHide: false,
      start: 5,
      order_account: "", // 订单总额
      ceid: "", // 优惠券编号
      sTime: "",
      eMail: "",
      mobile: "",
      username: "", // 取票人信息,登录账号者名称
      userList: [], // 出游人列表
      yingType: [], // 硬座方案
      yingTypeBox: [], // 硬座box
      ruanType: [], // 软座列表
      allType: [], // 全部座位列表
      yingShow: true,
      lineId: "", // 景区编号
      tickets_price: "", // 门票价格
      dateTime: "", // 出行时间
      tourist: "",
      ruan_price: "", // 软卧价格
      ying_price: "", // 硬卧价格
      ruan_type_active: true, // 软卧样式选择
      ying_type_active: "", // 硬卧样式选择
      coupon: [], // 优惠券列表
      allPerson: [], // 用于遍历附加费
      extraMoney: [], // 用于存储附加费金额
      addion_price: [],
      fjfAJAX: []
    };
  },
  methods: {
    // 附加费弹出
    popInfo(item) {
      AlertModule.show({
        title: item.title,
        content: item.remark,
        onShow() {
          console.log("Module: I'm showing");
        },
        onHide() {
          console.log("Module: I'm hiding now");
        }
      });
    },
    // 附加费改变
    optChange(money, costs, n) {
      if (this.extraMoney[n] == undefined) {
        this.extraMoney[n] = 0;
      }
      this.order_account = this.order_account + money - this.extraMoney[n];
      this.extraMoney.splice(n, 1, money);

      this.fjfAJAX.splice(n, 1, money / costs);
      console.log(this.extraMoney);
      console.log(this.fjfAJAX);
    },
    onBuy() {
      if (this.userList.length < 1) {
        Toast({ message: "出行人不得为空", duration: 1000 });
        return;
      }
      let person_num = this.chengren + this.child;
      if (this.userList.length != person_num) {
        Toast({ message: "出行人数不等于订单总人数", duration: 1000 });
        return;
      }
      if (this.username == "") {
        Toast({ message: "取票人不得为空", duration: 1000 });
        return;
      }
      if (this.mobile == "") {
        Toast({ message: "取票人手机不得为空", duration: 1000 });
        return;
      }
      if (this.eMail == "") {
        Toast({ message: "取票人邮箱不得为空", duration: 1000 });
        return;
      }

      let tourist = [];
      for (let i = 0; i < this.userList.length; i++) {
        tourist.push(this.userList[i].id);
      }

      tourist = tourist.join(",");

      if (this.seat_struct == "") {
        let first = 1;
        let second = this.yingTypeBox[0].string;
        second = second.replace(/,/g, "-");
        this.seat_struct.push(first);
        this.seat_struct.push(second);
      }

      let seat_struct = String(this.seat_struct);

      // 附加费格式
      let extraMoney = this.fjfAJAX.join(",");

      if (!this.trainTypeShow) {
        seat_struct = "";
      }
      var qs = require("qs");
      this.$http
        .post(
          "/api_order/submit_zl_order",
          qs.stringify({
            sid: this.oldItem.sid, // 供应商编号
            total_price: this.order_account, // 订单总价
            person_struct: sessionStorage.getItem("person_num"), //人员结构
            seat_struct: seat_struct, // 铺位类型
            product_id: this.lineId, // 产品编号
            line_type: this.oldItem.product_type, //产品类型
            ceid: this.ceid, // 优惠券编号
            user_name: this.username, // 联系人姓名
            user_email: this.eMail, //联系人邮箱
            user_tel_num: this.mobile, // 联系人电话号码
            id_num: this.id_num,
            price: this.tickets_price,
            person_num: this.chengren + this.child, // 订单总人数
            total_num_ch: this.chengren, // 订单大人数
            departure_city: this.oldItem.city_name, // 出发城市
            line_name: this.oldItem.title, // 线路名称
            line_number: this.oldItem.product_num, // 线路编号
            user_date: this.dateTime, // 出游时间
            tourist: tourist, // 出游人编号
            fjf: extraMoney
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            Toast({ message: "订单已生成", duration: 1000 });
            this.$router.push({
              name: "LineTravel_payment",
              params: { order_id: res.data.order_id }
            });
          } else {
            Toast({ message: "订单提交失败", duration: 1000 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onUser() {
      this.$router.push({
        name: "person",
        params: { name: "TrainTravel-order" }
      });
    },
    onSplice(i) {
      this.userList.splice(i, 1);
    },
    // 硬卧软卧切换
    onAddClass(index) {
      this.typeNum = index;
      this.allType = [];
      // 硬座列表
      if (index == 0) {
        this.allType = [...this.yingType];
        this.seat_struct = [];
        this.yingShow = true;
        this.order_account = this.ying_price[0] + this.tickets_price;
        this.ying_type_active = 0;
        let first = 1;
        let second = this.yingTypeBox[0].string;
        second = second.replace(/,/g, "-");
        this.seat_struct.push(first);
        this.seat_struct.push(second);
      } else {
        console.log("ruanzuo");
        // this.allType = [...this.ruanType];
        this.seat_struct = [];
        this.yingShow = false;
        // 附加费变动,选座位价格出现的bug
        let sum = 0;
        for (var i = 0; i < this.extraMoney.length; i++) {
          sum += this.extraMoney[i];
        }
        this.order_account = this.ruan_price + this.tickets_price + sum;
        let first = 0;
        let second;
        if (this.ruanType.length > 1) {
          second = this.ruanType[0] + "-" + this.ruanType[1];
        } else {
          second = this.ruanType[0];
        }
        this.seat_struct.push(first);
        this.seat_struct.push(second);
      }
    },
    // 硬卧具体切换
    onYing(item, index) {
      this.seat_struct = [];
      this.ying_type_active = index;
      // 附加费变动,选座位价格出现的bug
      let sum = 0;
      for (var i = 0; i < this.extraMoney.length; i++) {
        sum += this.extraMoney[i];
      }
      this.order_account = this.order_account =
        this.ying_price[index] + this.tickets_price + sum;
      let first = 1;
      let second = item.string;
      second = second.replace(/,/g, "-");
      this.seat_struct.push(first);
      this.seat_struct.push(second);

      console.log(this.extraMoney);
      console.log(sum);
    },
    // 软卧具体的切换
    onRuan(n) {
      if (n == 0) {
        this.ruan_type_active = true;
      } else {
        this.ruan_type_active = false;
      }
    },
    getDetail(product_id, date, person_num, price_type) {
      var qs = require("qs");
      this.$http
        .post(
          "/api_order/order_zhuanlie_product",
          qs.stringify({
            product_id: product_id,
            date: date,
            person_num: person_num,
            price_type: price_type
          })
        )
        .then(res => {
          if (res.data.code != 200) {
            Toast({ message: "价格获取失败", duration: 1000 });
          } else {
            console.log(res);
            this.scenic_name = res.data.data.scenic_name;
            this.sTime = res.data.data.date;
            this.eMail = res.data.data.email;
            this.mobile = res.data.data.mobile;
            this.username = res.data.data.username;
            this.tickets_price = res.data.data.tickets_price;
            this.chengren = res.data.data.person[1];
            this.child = res.data.data.person[2];
            // 总人数数组
            let allChild = this.chengren + this.child;
            for (let i = 0; i < allChild + 1; i++) {
              this.allPerson.push(i);
            }
            // 用户身份证
            this.id_num = res.data.data.id_num;
            //   软座选择
            this.ruanType = res.data.data.seat[0];
            //   硬座选择
            this.yingType = res.data.data.seat[1];
            for (let i = 0; i < res.data.data.seat[1].length; i++) {
              this.toggleType([...this.yingType[i]]);
            }
            //   初始化选择--选硬座
            this.allType = res.data.data.seat[1];

            // 软卧价格
            this.ruan_price = res.data.data.seat_price[0];

            // 硬卧价格
            this.ying_price = res.data.data.seat_price[1];

            // 初始化 总价--硬卧
            if (this.price_type == 3 || this.price_type == 4) {
              this.order_account =
                res.data.data.seat_price[1][0] + this.tickets_price;
            } else {
              this.order_account = this.tickets_price;
            }

            // 附加费
            this.addion_price = res.data.data.addion_price;
            if (this.addion_price.length > 0) {
              for (let i = 0; i < this.addion_price.length; i++) {
                this.addion_price[i].money = 0;
                this.extraMoney[i] = 0;
                this.fjfAJAX[i] = 0;
              }
            }
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 硬座格式转化
    toggleType(...a) {
      let o = {};
      if (a[0].length > 2) {
        if (a[0][1] == 0) {
          o.name = `${a[0][0]}上/${a[0][2]}下`;
        } else if (a[0][0] == 0) {
          o.name = `${a[0][1]}中/${a[0][2]}下`;
        } else {
          o.name = `${a[0][0]}上/${a[0][1]}中/${a[0][2]}下`;
        }
        o.type = a;
        o.string = a.join("");
      } else if (a[0].length == 2) {
        if (a[0][0] == 0) {
          o.name = `${a[0][1]}中`;
        } else {
          o.name = `${a[0][0]}上/${a[0][1]}中`;
        }
        o.type = a;
        o.string = a.join("");
      } else {
        o.name = `${a[0][0]}上`;
        o.type = a;
        o.string = a.join("");
      }
      this.yingTypeBox.push(o);
    },
    // 弹出优惠券
    onCoupon() {
      if (this.coupon.length < 1) {
        Toast({ message: "暂无优惠券可用", duration: 1000 });
      } else {
        this.showPopup = true;
      }
    },
    // 选择优惠券
    onExCoupon(item, index) {
      this.couponNum = index;
      this.ceid = item.id;
      this.showPopup = false;
    }
  },
  created() {
    // 得到之前订单的详情,接口没有。从列表接口获取
    this.oldItem = JSON.parse(sessionStorage.getItem("row"));
    console.log(this.oldItem);
    // 周边游、专线、出境三种产品类型没有软卧，需与PC端一致
    if (
      this.oldItem.product_type == "2" ||
      this.oldItem.product_type == "3" ||
      this.oldItem.product_type == "5"
    ) {
      this.trainType = [{ name: "硬卧", id: 0, type: 1 }];
    } else {
      this.trainType = [
        { name: "硬卧", id: 0, type: 1 },
        { name: "软卧", id: 1, type: 2 }
      ];
    }
    let lineId = sessionStorage.getItem("lineId");
    this.lineId = lineId;
    let date = sessionStorage.getItem("date");
    this.dateTime = date;
    let person_num = sessionStorage.getItem("person_num");
    this.userList = sessionStorage.getItem("userList");
    this.price_type = sessionStorage.getItem("price_type");
    if (this.userList != null) {
      this.userList = JSON.parse(this.userList);
    } else {
      this.userList = [];
    }
    if (this.price_type == 3 || this.price_type == 4) {
      this.trainTypeShow = true;
    }
    this.getDetail(lineId, date, person_num, this.price_type);
  },
  watch: {
    order_account() {
      this.couponNum = null;
      this.ceid = "";
      var qs = require("qs");
      this.$http
        .post(
          "/api_coupon/ajax_get_coupon",
          qs.stringify({
            range: 1,
            order_price: this.order_account
          })
        )
        .then(res => {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].range == 1) {
              res.data.list[i].rangeName = "专列";
            } else if (res.data.list[i].range == 2) {
              res.data.list[i].rangeName = "专线";
            } else if (res.data.list[i].range == 3) {
              res.data.list[i].rangeName = "出境";
            }
          }
          this.coupon = res.data.list;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.active-li {
  color: #282e75 !important;
  border: 1px solid #282e75 !important;
}
@import "../../common/css/order/order";
</style>
