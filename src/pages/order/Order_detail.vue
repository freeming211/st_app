<template>
    <div class="order-detail">
        <x-header :left-options="{backText: ''}">订单详情</x-header>

        <div class="order-detail-title">
            <div class="order-detail-t-box">
                <div class="order-detail-name">
                    {{go_date.line_name}}
                </div>

                <div class="order-detail-title-bottom flex flex-pack-justify flex-align-center">
                    <div class="or-bottom-name">
                        {{row.pay_status}}
                    </div>

                    <div class="or-bottom-price">
                        ￥{{row.order_account}}
                    </div>
                </div>
            </div>
        </div>

        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-xingli"></i>订单信息
                </p>
            </div>

            <div class="order-detail-list">
                <div class="order-detail-padding-box">
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            订单编号：
                        </div>
                        <div class="order-up-two">
                            {{go_date.line_number}}
                        </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            下单时间：
                        </div>
                        <div class="order-up-two">
                            {{row.add_time}}
                        </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            订单状态：
                        </div>
                        <div class="order-up-two">
                            {{row.pay_status}}
                        </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            发团日期：
                        </div>
                        <div class="order-up-two">
                            {{go_date.go_date}}
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
            </div>

            <div class="order-detail-list">
                <div v-for = "(item,index) in tourist_list" :key="item.id">
                    <div class="order-detail-padding-box">
                        <div class="order-up flex flex-align-center">
                            <div class="order-up-one">
                                出游人{{index+1}}：
                            </div>
                            <div class="order-up-two">
                                {{item.name}}
                            </div>
                        </div>
                        <div class="order-up flex flex-align-center">
                            <div class="order-up-one">
                                证件类型：
                            </div>
                            <div class="order-up-two">
                                {{item.id_card_type_name}}
                            </div>
                        </div>
                        <div class="order-up flex flex-align-center">
                            <div class="order-up-one">
                                证件号：
                            </div>
                            <div class="order-up-two">
                                {{item.id_number}}
                            </div>
                        </div>
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
                <div class="order-detail-padding-box">
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            姓名：
                        </div>
                        <div class="order-up-two">
                            {{contract_row.name}}
                        </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            手机号：
                        </div>
                        <div class="order-up-two">
                            {{contract_row.phone_num}}
                        </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            邮箱：
                        </div>
                        <div class="order-up-two">
                            {{contract_row.email}}
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="order-detail-userInfo">
            <div class="order-detail-news flex flex-align-center flex-pack-justify">
                <p class="order-detail-news-left">
                    <i class="iconfont icon-xingli"></i>订单金额
                </p>
                <!-- <p style="color:#f3b712;">
                    退款说明
                </p> -->
            </div>

            <div class="order-detail-list" style="margin-bottom:1.5rem;">
                <div class="order-detail-padding-box">
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           订单金额：
                       </div>
                       <div class="order-up-right flex-1">
                           ￥{{row.order_account}}
                       </div>
                    </div>
                    <!-- <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           代金券：
                       </div>
                       <div class="order-up-right flex-1">
                           ￥0
                       </div>
                    </div> -->
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           已付金额：
                       </div>
                       <div class="order-up-right flex-1" style="color:#f3b712;">
                           ￥{{row.paid_account}}
                       </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="order-footer" v-if = "row.pay_status == '支付完成' && row.is_comment == '0'" @click="goComment()">
            评价
        </div>
        <div class="order-footer" v-if = "((row.pay_status != '支付完成') || (row.pay_status == '未支付')) && (row.order_status !='3')" @click="onPayment">
            支付
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
      contract_row: "",
      go_date: "",
      row: "",
      tourist_list: ""
    };
  },
  methods: {
    getDetail() {
      var qs = require("qs");
      this.$http
        .post(
          "/api_order/line_order_detail",
          qs.stringify({
            order_id: this.order_id
          })
        )
        .then(res => {
          console.log(res);
          this.contract_row = res.data.contract_row;
          this.go_date = res.data.go_date;
          if (res.data.row.pay_status == 1) {
            res.data.row.pay_status = "未支付";
          } else if (res.data.row.pay_status == 2) {
            res.data.row.pay_status = "部分支付";
          } else if (res.data.row.pay_status == 3) {
            res.data.row.pay_status = "支付完成";
          } else if (res.data.row.pay_status == 4) {
            res.data.row.pay_status = "出票成功";
          }
          this.row = res.data.row;
          for (let i = 0; i < res.data.tourist_list.length; i++) {
            if (res.data.tourist_list[i].id_card_type == 1) {
              res.data.tourist_list[i].id_card_type_name = "身份证";
            } else if (res.data.tourist_list[i].id_card_type == 2) {
              res.data.tourist_list[i].id_card_type_name = "护照";
            } else if (res.data.tourist_list[i].id_card_type == 3) {
              res.data.tourist_list[i].id_card_type_name = "港澳通行证";
            } else if (res.data.tourist_list[i].id_card_type == 4) {
              res.data.tourist_list[i].id_card_type_name = "军官证";
            } else if (res.data.tourist_list[i].id_card_type == 5) {
              res.data.tourist_list[i].id_card_type_name = "其他";
            }
          }
          this.tourist_list = res.data.tourist_list;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onPayment() {
      this.$router.push({
        name: "LineTravel_payment",
        params: { order_id: this.order_id }
      });
    },
    // 评价
    goComment() {
      let comParams = {};
      comParams.order_id = this.row.order_id;
      comParams.product_id = this.row.product_id;
      comParams.module = "product";
      comParams.order_sn = this.row.order_sn;
      comParams.ticket_name = this.go_date.line_name;
      comParams.user_date = this.go_date.go_date;
      console.log(comParams);
      this.$router.push({ name: "comment", params: { comParams: comParams } });
    }
  },
  created() {
    this.order_id = this.$route.params.id;
    this.getDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/order/order";
</style>
