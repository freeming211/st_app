<template>
    <div class="order">
        <x-header :left-options="{backText: ''}">我的订单</x-header>

        <div class="order-header">
            <ul class="clearfix">
                <li v-for="(item,index) in tabsList" @click="onAddClass(index)" :key="item.id" :class="{'order-active':index==orderNum}">{{item.name}}</li>
            </ul>
        </div>

        <div class="order-box">
            <!-- <div class="order-list" v-for="(item,index) in orderList" :key="item.order_sn" @click="goDetail(item)" v-if = "item.order_status != '已取消'"> -->
            <div class="order-list" v-for="(item,index) in orderList" :key="item.order_sn" @click="goDetail(item)">
                <div class="order-list-one flex flex-pack-justify">
                    <div class="order-list-num odd-ellipsis">
                        订单编号:{{item.order_sn}}
                    </div>
                    <div class="ticket-list-type" style="color:#262f81;">
                        {{item.order_type_name}}订单
                    </div>
                </div>

                <div class="order-line-name">
                      {{item.ticket_name}}
                </div>
                <div class="order-line-name">
                      {{item.line_name}}
                </div>
                <div class="order-line-ticket" v-if="item.order_type_name == '门票'" >
                      <span>{{item.ticket_type}}{{item.ticket_num}}张</span>
                </div>
                <div class="order-line-ticket" v-if="item.order_type_name == '线路'">
                      <span>出游人数:{{item.total_num}}/人</span>
                </div>
                <div class="order-line-time flex flex-align-bottom flex-pack-justify">
                      <div class="order-line-time-left">
                        出游时间:{{item.go_date}}{{item.user_date}}
                      </div>

                      <div class="order-line-time-right">
                        <span>￥<span class="yuan">{{item.order_account}}</span></span>
                      </div>
                </div>

                <div class="order-list-bottom flex flex-pack-justify">
                      <div >
                        <span v-if="item.order_status != '已取消'">{{item.pay_status}}</span> 
                        <span v-if="item.order_status == '已取消'">{{item.order_status}}</span>
                      </div>

                      <div class="flex">
                        <div class="order-btn flex">
                          <p class="order-btn-cancel" @click.stop="onCancel(item,index)" v-if="(item.pay_status == '未支付') && (item.order_status !='已取消')">取消</p>
                          <p class="order-btn-payment" v-if="((item.pay_status != '支付完成') || (item.pay_status == '未支付')) && (item.order_status !='已取消')" style="color:#f3b712;border:1px solid #f3b712;">支付</p>
                          <p class="order-btn-about" v-if="(item.pay_status == '支付完成') && (item.is_comment == 0)" @click.stop="goTalk(item)">评价</p>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  name: "order",
  components: {
    XHeader
  },
  data() {
    return {
      tabsList: [
        { name: "全部", id: "0" },
        { name: "待处理", id: "1" },
        { name: "待评论", id: "2" }
      ],
      orderList: [],
      orderNum: "",
      pay_status: null, // 待支付
      is_comment: null // 待评价
    };
  },
  methods: {
    onAddClass(i) {
      this.orderNum = i;
      if (this.orderNum == 1) {
        this.pay_status = 1;
        this.is_comment = null;
      } else if (this.orderNum == 2) {
        this.pay_status = null;
        this.is_comment = 0;
      } else if (this.orderNum == 0) {
        this.is_comment = null;
        this.pay_status = null;
      }
    },
    goTalk(item) {
      let comParams = {};
      comParams.order_id = item.order_id;
      comParams.product_id =
        item.product_id == undefined ? "" : item.product_id;
      comParams.module = item.order_type_name == "线路" ? "product" : "ticket";
      comParams.order_sn = item.order_sn;
      comParams.ticket_name =
        item.ticket_name == undefined ? item.line_name : item.ticket_name;
      comParams.user_date =
        item.user_date == undefined ? item.go_date : item.user_date;
      console.log(comParams);
      this.$router.push({ name: "comment", params: { comParams: comParams } });
    },
    goDetail(item) {
      // 区分门票和线路
      if (item.order_type == "ticket") {
        this.$router.push({
          name: "order_ticket_detail",
          params: { id: item.order_id }
        });
      } else if (item.price_type == 1 || item.price_type == 2) {
        this.$router.push({
          name: "order_detail",
          params: { id: item.order_id }
        });
      } else if (item.price_type == 3 || item.price_type == 4) {
        this.$router.push({
          name: "order_train_detail",
          params: { id: item.order_id }
        });
      }
    },
    getList() {
      var qs = require("qs");
      this.$http
        .post(
          "/api_order/get_order_list",
          qs.stringify({
            pay_status: this.pay_status,
            is_comment: this.is_comment
          })
        )
        .then(res => {
          console.log(res);
          for (var i in res.data) {
            if (res.data[i].order_type == "line") {
              res.data[i].order_type_name = "线路";
            } else if (res.data[i].order_type == "ticket") {
              res.data[i].order_type_name = "门票";
            }
          }
          this.orderList = res.data.reverse();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onCancel(item, index) {
      MessageBox.confirm("", {
        message: "您是否取消该订单？",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "考虑一下"
      })
        .then(action => {
          if (action == "confirm") {
            var qs = require("qs");
            this.$http
              .post(
                "/api_order/change_order_status",
                qs.stringify({
                  id: item.order_id,
                  order_status: 3
                })
              )
              .then(res => {
                // console.log(res);
                if (res.data.status == 1) {
                  this.getList();
                  Toast({ message: "订单已取消", duration: 1000 });
                } else {
                  Toast({ message: "删除失败", duration: 1000 });
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            return;
          }
        });
    }
  },
  created() {
    this.orderNum =
      this.$route.params.num == undefined ? 0 : this.$route.params.num;
    if (this.orderNum == 1) {
      this.pay_status = 1;
    } else if (this.orderNum == 2) {
      this.is_comment = 0;
    }
    this.getList();
  },
  watch: {
    orderNum() {
      this.getList();
      clearInterval(this.timer);
      if (this.orderNum != 2) {
        this.timer = setInterval(() => {
          this.getList();
          console.log("刷新了");
        }, 10000);
      }
    }
  },
  destroyed() {
    console.log("定时器停止");
    clearInterval(this.timer);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/order/order";
</style>
