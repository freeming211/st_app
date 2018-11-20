<template>
    <div class="order-detail">
        <x-header :left-options="{backText: ''}">订单填写</x-header>

        <div class="order-detail-title" style="background: #ffffff !important;">
            <div class="order-detail-t-box">
                <div class="order-detail-name">
                   <p>{{name}}</p>
                </div>
            </div>
        </div>


        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-tuandui"></i>团期
                </p>
                <p style="margin-right:15px;" @click="onPupDate">
                    {{tuanQi}}
                </p>
            </div>

        </div>
        

        <group>
            <x-number :title="('购买数量：')" :value="1" :min="1" @on-change="change" v-model="roundValue"></x-number>
        </group>

        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-xingli"></i>联系人
                </p>
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
                            <input type="text" placeholder="填写邮箱" v-model="email">
                        </div>
                    </div>
                    <div class="order-up border-b flex flex-align-center">
                        <div class="order-up-one">
                            身份证：
                        </div>
                        <div class="order-up-two">
                            <input type="text" placeholder="填写身份证号" v-model="id_num">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-xingli"></i>取票须知
                </p>
            </div>

            <div class="order-detail-list">
                <div class="order-detail-padding-box" style="padding:0 .1rem !important;border:none;">
                    <div class="order-up border-b flex flex-align-center">
                        <div class="order-up-one">
                            备注：
                        </div>
                        <div class="order-up-two">
                            {{notes}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-xingli"></i>包含项目
                </p>
            </div>

            <div class="order-detail-list">
                <div class="order-detail-padding-box" style="padding:0 .1rem !important;border:none;">
                    <div class="order-up border-b flex flex-align-center">
                        <div class="order-up-one">
                            备注：
                        </div>
                        <div class="order-up-two">
                            {{include}}
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="train-order-true flex">
            <div class="train-order-true-left flex">
                <span class="all">订单总额</span>
                <span class="price"> <span class="yuan">￥</span> {{total_price}} </span>
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
              
              <div class="date-item clearfix">
                 <div class="one-date" v-for="(item,index) in date" :key="index" :class="{'date-active':index==orderNum}" @click="onDateCha(item,index)">
                     <p class="time">{{item.date}}</p>
                     <p class="yuan">￥{{item.low_price}}</p>
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
  XNumber,
  XSwitch,
  Divider
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
    Popup,
    XNumber,
    XSwitch,
    Divider
  },
  data() {
    return {
      id: "",
      name: "",
      category: "", // 票务类型
      date: [], // 团期
      scenic: "", // 景区id
      id_num: "", // 身份证号
      include: "", // 包含项目
      notes: "", // 取票须知
      username: "", // 默认用户名
      mobile: "", // 默认手机
      email: "", // 默认邮箱
      roundValue: 1,
      total_price: "", // 总价
      plusVal: 1,
      one_price: "",
      tuanQi: "", // 团期如何显示
      showPopup: false, // 弹出团期
      orderNum: "-1",
      day: ""
    };
  },
  methods: {
    getListDetail() {
      var qs = require("qs");
      this.$http
        .post("/api_ticket/book_tickets", qs.stringify({ ticket_id: this.id }))
        .then(res => {
          this.name = res.data.name;
          this.category = res.data.category;
          this.date = res.data.date;
          this.scenic = res.data.scenic;
          this.id_num = res.data.id_num;
          this.include = res.data.include == "" ? "无" : res.data.include;
          this.notes = res.data.notes == "" ? "无" : res.data.notes;
          this.username = res.data.username;
          this.mobile = res.data.mobile;
          this.email = res.data.email;
          if (this.date.length < 1) {
            this.total_price = "无";
            this.tuanQi = "无团期";
          } else {
            this.total_price = 0;
            this.tuanQi = "选择团期";
          }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    change(val) {
      this.plusVal = val;
      if (this.total_price != "无") {
        this.total_price = this.one_price * val;
      } else {
        return;
      }
    },
    onPupDate() {
      if (this.tuanQi == "无团期") {
        return;
      } else {
        this.showPopup = true;
      }
    },
    onDateCha(item, index) {
      this.orderNum = index;
      this.day = item.date;
      this.showPopup = false;
      this.total_price = item.low_price * this.plusVal;
      this.one_price = item.low_price;
      this.tuanQi = item.date;
    },
    onBuy() {
      if (this.total_price == "无") {
        Toast({ message: "该景点无团期", duration: 1000 });
        return;
      }
      if (this.total_price == 0) {
        Toast({ message: "请选择团期", duration: 1000 });
        return;
      }

      if (this.username == "") {
        Toast({ message: "请填写取票人姓名", duration: 1000 });
        return;
      }
      if (this.mobile == "") {
        Toast({ message: "请填写取票人手机号", duration: 1000 });
        return;
      }
      if (this.email == "") {
        Toast({ message: "请填写取票人邮箱", duration: 1000 });
        return;
      }
      if (this.id_num == "") {
        Toast({ message: "请填写取票人身份证号", duration: 1000 });
        return;
      }

      var qs = require("qs");
      this.$http
        .post(
          "/api_ticket/book_tickets_submit",
          qs.stringify({
            total_price: this.total_price,
            user_name: this.username,
            user_tel: this.mobile,
            id_num: this.id_num,
            ticket_id: this.id,
            date: this.day,
            scenic_id: this.scenic,
            num: this.plusVal
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            Toast({ message: "订单已生成", duration: 1000 });
            this.$router.push({
              name: "gate_payment",
              params: { order_id: res.data.order_id }
            });
          } else {
            Toast({ message: "订单提交失败", duration: 1000 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getListDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.date-active {
  color: #282e75 !important;
  border: 1px solid #282e75 !important;
}

.date-item {
  padding: 0.2rem 5% 1rem;
  .one-date {
    float: left;
    width: 30%;
    margin: 0.15rem 1%;
    text-align: center;
    border: 1px solid #999999;
    border-radius: 0.12rem;
    color: #666666;
    padding: 0.1rem 0 0.1rem;
  }
}
@import "../../common/css/order/order";
</style>
