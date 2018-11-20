<template>
    <div class="centerMsg">
        <!-- <mt-header title="我的消息">
            <router-link to="/center" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <x-header :left-options="{backText: ''}">我的消息</x-header>

        <div class="centerMsg-box flex flex-align-center" @click="goDetail()">
            <div class="centerMsg-box-img">
                <img src="../../common/images/centerMsg01.png" alt="">
            </div>
            <div class="centerMsg-box-right flex-1">
                <div class="centerMsg-box-right-top flex flex-align-center flex-pack-justify">
                    <div class="msg-title">
                     通知通告   
                    </div>
                    <div class="msg-time">
                      2017-08-03 11:20:35
                    </div>

                </div>
                <div class="centerMsg-box-right-bottom odd-ellipsis">
                    恭喜您！！订单服务完成,发布评价赚积分 恭喜您！！订单服务完成,发布评价赚积分
                </div>
            </div>
        </div>
        <div class="centerMsg-box flex flex-align-center">
            <div class="centerMsg-box-img">
                <img src="../../common/images/centerMsg02.png" alt="">
            </div>
            <div class="centerMsg-box-right flex-1">
                <div class="centerMsg-box-right-top flex flex-align-center flex-pack-justify">
                    <div class="msg-title">
                     系统提示   
                    </div>
                    <div class="msg-time">
                      2017-08-03 11:20:35
                    </div>

                </div>
                <div class="centerMsg-box-right-bottom odd-ellipsis">
                    恭喜您！！线路订单支付成功
                </div>
            </div>
        </div>
        <div class="centerMsg-box flex flex-align-center">
            <div class="centerMsg-box-img">
                <img src="../../common/images/centerMsg01.png" alt="">
            </div>
            <div class="centerMsg-box-right flex-1">
                <div class="centerMsg-box-right-top flex flex-align-center flex-pack-justify">
                    <div class="msg-title">
                     通知通告   
                    </div>
                    <div class="msg-time">
                      2017-08-03 11:20:35
                    </div>

                </div>
                <div class="centerMsg-box-right-bottom odd-ellipsis">
                    恭喜您！！订单服务完成,发布评价赚积分 恭喜您！！订单服务完成,发布评价赚积分
                </div>
            </div>
        </div>
        <div class="centerMsg-box flex flex-align-center">
            <div class="centerMsg-box-img">
                <img src="../../common/images/centerMsg02.png" alt="">
            </div>
            <div class="centerMsg-box-right flex-1">
                <div class="centerMsg-box-right-top flex flex-align-center flex-pack-justify">
                    <div class="msg-title">
                     系统提示   
                    </div>
                    <div class="msg-time">
                      2017-08-03 11:20:35
                    </div>

                </div>
                <div class="centerMsg-box-right-bottom odd-ellipsis">
                    恭喜您！！线路订单支付成功
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "centerMsg",
  components: {
    XHeader
  },
  data() {
    return {};
  },
  methods: {
    goDetail() {
      this.$router.push({ name: "centerMsgDetail" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
