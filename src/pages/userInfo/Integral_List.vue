<template>
    <div class="integral">
        <!-- <mt-header title="积分兑换">
            <router-link to="/integral" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <x-header :left-options="{backText: ''}">积分兑换</x-header>

        <div class="integral-ticket flex flex-align-bottom" @click="goIntegralTo(item)" v-for="item in list" :key="item.id">
            <div class="integral-ticket-img">
                <img src="../../common/images/integral.png" alt="">
            </div>

            <div class="integral-ticket-middle">
                <p class="money-ticket">{{item.title}}</p>
                <p class="time">{{item.start_time}}至{{item.end_time}}</p>
            </div>

            <div class="integral-ticket-num flex-1">
                <span>{{item.integral_exchange}}<span class="jifen">积分</span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "integral",
  components: {
    XHeader
  },
  data() {
    return {
        list:[]
    };
  },
  methods: {
    goIntegralTo(item) {
      this.$router.push({ name: "integral_to",params:{item:item} });
    },
    getDetail() {
      this.$http
        .post(
          "/api_coupon/coupon_list"
        )
        .then(res => {
          console.log(res);
          this.list = res.data.list;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
      this.getDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
