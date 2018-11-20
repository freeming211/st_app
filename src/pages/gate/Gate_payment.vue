<template>
    <div class="common-payment">
        <x-header :left-options="{backText: ''}">订单支付</x-header>
        <div class="payment-tips">
            <div class="payment-tips-name">
                {{ticket_row.scenic_name}}({{ticket_row.ticket_name}})
            </div>
            <div class="payment-tips-lineBox flex flex-align-center flex-pack-justify">
                <div>
                    <span>门票数量:{{ticket_row.num}}张</span>
                </div>
                <div>
                    游玩时间:{{ticket_row.user_date}}
                </div>
            </div>
            <div class="payment-tips-money flex flex-align-center flex-pack-justify">
                <div class="payment-tips-money-title">
                    待支付
                </div>
                <div class="payment-tips-money-price">
                    ￥{{row.order_account}}
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
      ticket_row:""
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
          "/api_order/ticket_order_detail",
          qs.stringify({ order_id: this.order_id })
        )
        .then(res => {
          console.log(res);
          this.ticket_row = res.data.ticket_row;
          this.row = res.data.row;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    _app_alipay() {
      var qs = require("qs");
      this.$http
        .post(
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
