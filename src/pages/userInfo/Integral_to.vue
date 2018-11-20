<template>
    <div class="integral">
        <!-- <mt-header title="积分兑换">
            <router-link to="/integral_list" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>         -->

        <x-header :left-options="{backText: ''}">积分兑换</x-header>

        <div class="integral-buy">
            <img src="../../common/images/integral.png" alt="">
            <p class="integral-buy-title">{{item.title}}({{item.range}})</p>
            <p class="integral-buy-fan"><span>满{{item.min_order}}立减</span>{{item.value}}</p>
            <p class="integral-buy-time">{{item.start_time}}至{{item.end_time}}</p>
            <button class="integral-buy-btn" @click="onExchange(item.id)">{{item.integral_exchange}}积分兑换</button>
        </div>

    </div>
</template>

<script>
import { XHeader } from "vux";
import { Toast } from "mint-ui";
export default {
  name: "integral",
  components: {
    XHeader
  },
  data() {
    return {
      item: ""
    };
  },
  methods: {
    onExchange(id) {
      var qs = require("qs");
      this.$http
        .post(
          "/api_coupon/coupon_exchange	",
          qs.stringify({ coupon_id: id})
        )
        .then(res => {
            // console.log(res);
            if(res.data.status == 1){
                Toast({ message: res.data.msg, duration: 1500 });
            }else{
                Toast({ message: res.data.msg, duration: 1500 });
            }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.item = this.$route.params.item;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
