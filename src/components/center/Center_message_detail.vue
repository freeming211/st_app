<template>
    <div class="center-msg-detail">
        <!-- <mt-header title="我的消息">
            <router-link to="/centerMsg" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <x-header :left-options="{backText: ''}">消息详情</x-header>

        <div class="msg-detail-tile">
            <div>2017年积分兑换优惠券开始啦</div>
            <p>2017-08-14  系统消息</p>
        </div>

        <div class="msg-detail-text">
            <p>优惠券办理时间:每日9:00-18:00</p>
            <p>最高提现额度:根据用户选择的银行卡和提现方式不同有不同的额度,请以提现时的页面提示为准</p>
            <p>最高提现额度:根据用户选择的银行卡和提现方式不同有不同的额度,请以提现时的页面提示为准</p>
        </div>
    </div>
</template>

<script>
import { XHeader } from 'vux';
export default {
  name: "center-msg-detail",
  components: {
    XHeader
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
