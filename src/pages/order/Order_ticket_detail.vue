<template>
    <div class="order-detail">
        <x-header :left-options="{backText: ''}">订单详情</x-header>

        <div class="order-detail-title">
            <div class="order-detail-t-box">
                <div class="order-detail-name">
                   <!-- <p>{{ticket_row.scenic_name}}</p> -->
                   <p style="font-size:.34rem;">{{ticket_row.ticket_name}}</p>
                </div>
                

                <div class="order-detail-title-bottom flex flex-pack-justify flex-align-center">
                    <div class="or-bottom-name">
                        <!-- {{row.pay_status}} -->
                        <span v-if="row.order_status != '已取消'">{{row.pay_status}}</span> 
                        <span v-if="row.order_status == '已取消'">{{row.order_status}}</span>
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
                    <i class="iconfont icon-xingli"></i>门票信息
                </p>
                <!-- <p style="color:#252d81;">
                    使用说明
                </p> -->
            </div>

            <div class="order-detail-list">
                <div class="order-detail-padding-box">
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           景区名称：
                       </div>
                       <div class="order-up-right flex-1">
                          {{ticket_row.scenic_name}}
                       </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           门票名称：
                       </div>
                       <div class="order-up-right flex-1">
                           {{ticket_row.ticket_name}}
                       </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           使用日期：
                       </div>
                       <div class="order-up-right flex-1">
                           {{ticket_row.user_date}}
                       </div>
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
                       <div class="order-up-left">
                           订单编号：
                       </div>
                       <div class="order-up-right flex-1">
                           {{row.order_sn}}
                       </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           订单状态：
                       </div>
                       <div class="order-up-right flex-1">
                           {{row.order_status}}
                       </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           下单时间：
                       </div>
                       <div class="order-up-right flex-1">
                           {{row.add_time}}
                       </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                       <div class="order-up-left">
                           门票数量：
                       </div>
                       <div class="order-up-right flex-1">
                           {{ticket_row.num}}
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
                            {{contact_row.name}}
                        </div>
                    </div>
                    <div class="order-up flex flex-align-center">
                        <div class="order-up-one">
                            手机号：
                        </div>
                        <div class="order-up-two">
                            {{contact_row.phone_num}}
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
        <div class="order-footer" v-if = "((row.pay_status != '支付完成') || (row.pay_status == '未支付')) && (row.order_status !='已取消')" @click="onBuy">
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
      btnHide: false,
      order_id: "",
      ticket_row: "", // 票务信息
      contact_row: "", // 联系人信息
      row: ""
    };
  },
  methods: {
    getDetail() {
      var qs = require("qs");
      this.$http
        .post(
          "/api_order/ticket_order_detail",
          qs.stringify({
            order_id: this.order_id
          })
        )
        .then(res => {
          this.contact_row = res.data.contact_row;
          this.ticket_row = res.data.ticket_row;
          this.row = res.data.row;
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 支付
    onBuy() {
      this.$router.push({
        name: "gate_payment",
        params: { order_id: this.order_id }
      });
    },
    // 评价
    goComment() {
      let comParams = {};
      comParams.order_id = this.ticket_row.order_id;
      comParams.product_id = '';
      comParams.module = 'ticket';
      comParams.order_sn = this.row.order_sn;
      comParams.ticket_name = this.ticket_row.ticket_name;
      comParams.user_date = this.ticket_row.user_date;
      console.log(comParams);
      this.$router.push({ name: "comment",params:{comParams:comParams }});
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
