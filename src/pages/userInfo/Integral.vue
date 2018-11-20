<template>
    <div class="integral">
        <x-header :left-options="{backText: ''}">我的积分</x-header>

        <div class="integral-top">
            <p class="integral-title">账户积分</p>
            <div class="integral-num">{{integral}}</div>
            <img src="../../common/images/bottom.png" alt="">
            <span class="integral-btn" @click="goIntegralList()">兑换优惠券</span>
        </div>

        <div class="integral-item">
            <p>积分纪录</p>
            <div class="integral-list flex flex-align-center flex-pack-justify" v-for="(list,index) in lists">
                <div class="integral-list-icon">
                    <div v-if="list.ponits_type != 'minus'" style="color:#363d89;">
                        <i class="iconfont icon-shouru"></i>+{{list.sign_points}}
                    </div>
                    <div v-else style="color:#fe8748;">
                        <i class="iconfont icon-zhichu"></i>-{{list.sign_points}}
                    </div>
                </div>
                <div class="integral-list-text">
                    {{list.rulename}}
                </div>
                <div class="integral-list-time">
                    {{list.sign_time}}
                </div>
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
      lists: [],
      integral:''
    };
  },
  methods: {
    goIntegralList() {
      this.$router.push({ name: "integral_list" });
    },
    // 总积分
    getAll() {
      this.$http
        .post("/api_user/get_user_integral ")
        .then(res => {
          this.integral = res.data.integral;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 积分列表
    getIntegralList() {
      this.$http
        .post("/api_user/get_integral")
        .then(res => {
          this.lists = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getAll();
    this.getIntegralList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
