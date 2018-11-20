<template>
    <div class="order-detail">
        <x-header :left-options="{backText: ''}">订单填写</x-header>

        <div class="order-detail-title" style="background: #ffffff !important;">
            <div class="order-detail-t-box">
                <div class="order-detail-name">
                   <p>沈阳故宫</p>
                </div>
                

                <div class="order-detail-title-bottom">
                    <div class="or-bottom-train">
                       日期：<span>2017-07-27</span>
                    </div>
                    <div class="or-bottom-train">
                       人数：<span>2成人 2儿童</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-xingli"></i>联系人信息
                </p>
            </div>

            <div class="order-detail-list">
                <div class="order-detail-padding-box" style="padding:0 .1rem !important;border:none;">
                    <div class="order-up border-b flex flex-align-center">
                        <div class="order-up-one">
                            取票人：
                        </div>
                        <div class="order-up-two">
                            <input type="text" placeholder="填写取票人姓名">
                        </div>
                    </div>
                    <div class="order-up border-b flex flex-align-center">
                        <div class="order-up-one">
                            手机号：
                        </div>
                        <div class="order-up-two">
                            <input type="text" placeholder="填写手机号码">
                        </div>
                    </div>
                    <div class="order-up border-b flex flex-align-center">
                        <div class="order-up-one">
                            邮箱：
                        </div>
                        <div class="order-up-two">
                            <input type="text" placeholder="填写邮箱">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-xingli"></i>出游人信息
                </p>
                <p><i class="iconfont icon-tianjialianxiren addUser"></i></p>
            </div>

            <div class="train-order-chuyou flex flex-align-center">
                <div class="chuyou-num line-order">出游人1</div>
                <div class="chuyou-name line-order-name">刘柳<span>*</span></div>
            </div>
            <div class="train-order-chuyou flex flex-align-center">
                <div class="chuyou-num line-order">出游人2</div>
                <div class="chuyou-name line-order-name">刘雪<span>*</span></div>
            </div>
            <div class="train-order-chuyou flex flex-align-center">
                <div class="chuyou-num line-order">出游人3</div>
                <div class="chuyou-name line-order-name">刘雪<span>*</span></div>
            </div>
            <div class="train-order-chuyou flex flex-align-center">
                <div class="chuyou-num line-order">出游人4</div>
                <div class="chuyou-name line-order-name">刘雪<span>*</span></div>
            </div>
            <div class="train-order-chuyou flex flex-align-center">
                <div class="chuyou-num line-order">出游人5</div>
                <div class="chuyou-name line-order-name">刘雪<span>*</span></div>
            </div>
            <div class="train-order-chuyou flex flex-align-center">
                <div class="chuyou-num line-order">出游人6</div>
                <div class="chuyou-name line-order-name">刘雪<span>*</span></div>
            </div>
            <div class="train-order-chuyou flex flex-align-center">
                <div class="chuyou-num line-order">出游人7</div>
                <div class="chuyou-name line-order-name">刘雪<span>*</span></div>
            </div>
        </div>

        <div class="order-ticket flex flex-pack-justify" @click="goMyTicket">
            <div>
                使用优惠券
            </div>
            <div class="order-ticket-go">
                2张
                <i class="iconfont icon-return-copy"></i>
            </div>
        </div>

        <div class="train-order-true flex">
            <div class="train-order-true-left flex">
                <span class="all">订单总额</span>
                <span class="price"> <span class="yuan">￥</span> 3070 </span>
                <span class="order-icon"><i class="iconfont icon-xiangshangjiantouarrowup"></i></span>
            </div>
            <div class="train-order-true-right flex-1" @click="onBuy">
                提交订单
            </div>
        </div>


    </div>
</template>

<script>
import { XHeader, Rater, Group, Cell, Range } from "vux";
export default {
  name: "order-detail",
  components: {
    XHeader,
    Rater,
    Group,
    Cell,
    Range
  },
  data() {
    return {
      btnHide: false,
      start:5
    };
  },
  methods: {
    onBuy(){
        this.$router.push({ name: "LineTravel_payment" });
    },
    goMyTicket(){
        this.$router.push({ name: "myTicket" });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/order/order";
</style>
