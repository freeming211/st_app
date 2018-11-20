<template>
    <div class="myTicket">
        <!-- <mt-header title="我的优惠券">
                    <router-link to="/center" slot="left">
                        <mt-button icon="back"></mt-button>
                    </router-link>
                </mt-header> -->
        <x-header :left-options="{backText: ''}">优惠券</x-header>
        <div class="myTicket-header">
            <ul class="clearfix">
                <li v-for="(item,index) in tabsList" @click="onAddClass(index)" :key="item.id" :class="{'order-active':index==orderNum}">{{item.name}}</li>
            </ul>
        </div>
        <div class="myTicket-item">
            <div class="myTicket-list zhuangxian" v-for="item in list" :key="item.id">
                <div class="myTicket-list-top flex flex-align-center">
                    <div class="myTicket-num">
                        <span :style="{color:(orderNum != 0)?'#bfbfbf':''}">￥
                            <span class="yuan" :style="{color:(orderNum != 0)?'#bfbfbf':''}">{{item.value}}</span>
                        </span>
                    </div>
                    <div class="myTicket-top-text">
                        <p class="myTicket-name odd-ellipsis">{{item.title}}</p>
                        <p class="myTicket-time">{{item.start_time}}至{{item.end_time}}</p>
                    </div>
                </div>
                <div class="myTicket-list-bottom flex flex-align-center">
                    <div class="flex flex-align-center" style="width:1.95rem;">
                        <!-- <div class="myTicket-sanjiao">
                            专列
                        </div> -->
                        <div style="margin-top:.15rem;text-align:center;" class="flex-1">
                            {{item.range}}
                        </div>
                    </div>
                    <div style="margin-top:.15rem;">
                        满{{item.min_order}}可使用
                    </div>
                </div>
                <!-- 真实情况需要判断 -->
                <img src="../../common/images/ticket-used.png" alt="" v-if="orderNum == 1">
                <img src="../../common/images/ticket-out.png" alt="" v-if="orderNum == 2"> 
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "myTicket",
  components: {
    XHeader
  },
  data() {
    return {
      status: 2,
      tabsList: [
        {
          name: "未使用",
          id: "0"
        },
        {
          name: "已使用",
          id: "1"
        },
        {
          name: "已过期",
          id: "2"
        }
      ],
      orderNum: 0,
      list: []
    };
  },
  methods: {
    onAddClass(i) {
      this.orderNum = i;
      this.list = [];
      if (i == 0) {
        this.getDetail(2);
      } else if (i == 1) {
        this.getDetail(1);
      } else {
        this.getDetail(3);
      }
    },
    getDetail(num) {
      var qs = require("qs");
      this.$http
        .post(
          "/api_coupon/coupon_exchange_list",
          qs.stringify({
            status: num
          })
        )
        .then(res => {
          this.list = res.data.list;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getDetail(2);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
