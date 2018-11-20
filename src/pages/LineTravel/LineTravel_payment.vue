<template>
    <div class="common-payment">
        <x-header :left-options="{backText: ''}">订单支付</x-header>
        <div class="payment-tips">
            <div class="payment-tips-name">
                {{go_date.line_name}}
            </div>
            <div class="payment-tips-lineBox flex flex-align-center flex-pack-justify">
                <!-- <div>
                    <span>成人:2人</span>|<span>儿童:1人</span>
                </div> -->
                <div>
                    游玩时间:{{go_date.go_date}}
                </div>
            </div>

            <!-- 人员信息 -->
            <div class="extra" v-show="price_type == '3' || price_type == '4'">
              <div class="extra-header">
                人员信息
              </div>
              <div class="extra-con flex flex-align-bottom flex-pack-justify" v-for="(item,index) in puweiNum">
                <div class="extra-info">
                  {{index+1}}:{{item}}
                  <span>
                    
                  </span>
                </div>
              </div>
            </div>


            <div class="payment-tips-lineBox flex flex-align-center flex-pack-justify" v-for = "item in seat_info">
                <div>
                    <span>{{item}}</span>
                </div>
            </div>
            <!-- 附加费新增 -->
            <div class="extra" v-show="fjf.length>0">
              <div class="extra-header">
                附加费
              </div>
              <div class="extra-con flex flex-align-bottom flex-pack-justify" v-for = "(item,index) in fjf">
                <div class="extra-info">
                  {{index+1}}.{{item.title}}:
                  <span>
                    {{item.costs}}*{{item.num}}
                  </span>
                </div>

                <div class="extra-money"> 
                  ￥{{item.money}}
                </div>
              </div>
            </div>

             <!-- 优惠卷 -->
            <div class="extra" v-show="coupon_row">
              <div class="extra-header">
                优惠券
              </div>
              <div class="extra-con flex flex-align-bottom flex-pack-justify">
                <div class="extra-info">
                  优惠券减免
                </div>

                <div class="extra-money"> 
                  - ￥{{coupon_row}}
                </div>
              </div>
            </div>

            <div class="payment-tips-money flex flex-align-center flex-pack-justify">
                <div class="payment-tips-money-title">
                    待支付
                </div>
                <div class="payment-tips-money-price">
                    ￥{{order_account}}
                </div>
            </div>
        </div>
        <div class="payment-choice">
            <div class="payment-choice-title">
                <i class="iconfont iconfont icon-xingli"></i>支付方式
            </div>
            <!-- <div class="payment-choice-list flex flex-align-center" @click="onChoice(0)">
                <div class="payment-choice-list-png">
                    <img src="../../common/images/weixin.png" alt="">
                </div>
                <div class="payment-choice-list-type">
                    微信支付
                </div>
                <div class="payment-choice-list-icon">
                    <i class="iconfont icon-xuanzhong" :style="{'color':(isChoiceA)?'#242f82':''}"></i>
                </div>
            </div> -->
            <div class="payment-choice-list flex flex-align-center" style="border:none;" @click="onChoice(1)">
                <img src="../../common/images/zhifubao.png" alt="" style="width: 1.12rem;margin-right:.15rem;">
                <div class="payment-choice-list-type">
                    支付宝支付
                </div>
                <div class="payment-choice-list-icon">
                    <i class="iconfont icon-xuanzhong" :style="{'color':(isChoiceB)?'#242f82':''}"></i>
                </div>
            </div>
        </div>

        <div class="payment-btn" @click="onComment">
            立即支付
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "common-payment",
  components: {
    XHeader
  },
  data() {
    return {
      num: 0,
      isChoiceA: false,
      isChoiceB: true,
      order_id: "",
      go_date: "",
      row: "",
      order_account: "",
      payInfo: "", // 后台返回签名
      fjf:[],
      seat_info:[], // 详情的遍历
      coupon_row:"", // 优惠券
      puweiNum:[],
      price_type:""
    };
  },
  methods: {
    onChoice(num) {
      if (num == 0) {
        this.isChoiceA = true;
        this.isChoiceB = false;
      } else {
        this.isChoiceA = false;
        this.isChoiceB = true;
      }
    },
    _getDetail() {
      var qs = require("qs");
      this.$http
        .post(
          "/api_order/line_order_detail",
          qs.stringify({ order_id: this.order_id })
        )
        .then(res => {
          // console.log(res)
          this.price_type = res.data.price_type
          this.go_date = res.data.go_date;
          this.row = res.data.row;
          this.fjf = res.data.fjf
          this.coupon_row = res.data.coupon_row.value
          if (res.data.coupon_row != "") {
            this.order_account =
              res.data.row.order_account - res.data.coupon_row.value;
          } else {
            this.order_account = res.data.row.order_account;
          }

          // 不同类型
          var person_arr = []
          for(let i = 0;i<res.data.person_arr.length;i++){
            if(res.data.person_arr[i] !=0){
              person_arr.push(i)
            }
          }
          let person_info = []
          if(res.data.price_type == 4){
            for(let i = 0;i<person_arr.length;i++){
                person_info[i] = res.data.person_info[person_arr[i]]
            }
            this.puweiNum = person_info
            for(let j =0;j<res.data.seat_arr.length;j++){
              if(res.data.seat_arr[j] != 0){
                this.seat_info.push(res.data.seat_info[j])
              }
            }
          }else if(res.data.price_type == 1){
            this.seat_info = res.data.person_info
          }else if(res.data.price_type == 2){
            for(let i = 0;i<person_arr.length;i++){
                person_info[i] = res.data.person_info[person_arr[i]]
            }
            this.seat_info = person_info
          }else if(res.data.price_type == 3){
            this.seat_info = res.data.seat_info
          }


        })
        .catch(function(err) {
          console.log(err);
        });
    },
    _app_alipay() {
      var qs = require("qs");
      this.$http
        .post(
          // "http://sy.66diqiu.cn/app/index/app_alipay",
          "http://jkzs.sytlj.com:8089/app/index/app_alipay",
          qs.stringify({ order_id: this.order_id })
        )
        .then(res => {
          console.log(res);
          this.payInfo = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onComment() {
      var that = this;
      var payInfo = this.payInfo;
      console.log(payInfo);
      cordova.plugins.AliPay.pay(
        payInfo,
        function success(e) {
          console.log(e);
          if (e.resultStatus == 9000) {
            that.$router.push({ name: "center" });
          }
        },
        function error(e) {}
      );
    }
  },
  created() {
    this.order_id = this.$route.params.order_id;
    this._getDetail();
    this._app_alipay();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/gate/gate";
</style>
