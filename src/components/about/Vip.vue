<template>
    <div class="vip">
        <!-- <mt-header title="会员权益">
            <router-link to="/center" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->

        <x-header :left-options="{backText: ''}">会员权益</x-header>

        <div class="vip-box">
            <div class="vip-title">
                会员特权
            </div>
            <div style="background:#ffffff;">
                <div class="vip-title-text">
                    1.普通会员
                </div>
                <div class="vip-title-text">
                    您注册后即可成为国旅会员,并可享有如下礼遇
                </div>
                <div class="vip-title-text-padding">
                    <p>获得消费积分</p>
                    <p>获得最新旅游资讯</p>
                    <p>会员优惠券</p>
                </div>
            </div>
            <div style="background:#ffffff;">
                <div class="vip-title-text">
                    2.金卡会员
                </div>
                <div class="vip-title-text">
                    您注册后即可成为国旅会员,并可享有如下礼遇
                </div>
                <div class="vip-title-text-padding">
                    <p>获得消费积分</p>
                    <p>获得最新旅游资讯</p>
                    <p>会员优惠券</p>
                </div>
            </div>
            <div style="background:#ffffff;">
                <div class="vip-title-text">
                    3.白金会员
                </div>
                <div class="vip-title-text">
                    您注册后即可成为国旅会员,并可享有如下礼遇
                </div>
                <div class="vip-title-text-padding">
                    <p>获得消费积分</p>
                    <p>获得最新旅游资讯</p>
                    <p>会员优惠券</p>
                </div>
            </div>
            <div style="background:#ffffff;">
                <div class="vip-title-text">
                    4.钻石会员
                </div>
                <div class="vip-title-text">
                    您注册后即可成为国旅会员,并可享有如下礼遇
                </div>
                <div class="vip-title-text-padding">
                    <p>获得消费积分</p>
                    <p>获得最新旅游资讯</p>
                    <p>会员优惠券</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { XHeader } from 'vux';
export default {
  name: "vip",
  components: {
    XHeader
  },
  data() {
    return {
      nickName: "尼克"
    };
  },
  methods: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
