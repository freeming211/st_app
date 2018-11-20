<template>
    <div class="tByCar">
        <x-header :left-options="{backText: ''}">火车拉汽车</x-header>

        <div class="tByCar-title">
            沈阳铁路局为更好服务社会，为较远距离的自驾游客户提供汽车运输服务，特开展自驾游汽车运输服务。
        </div>

        <div class="tByCar-con">
            <div class="tByCar-tabs">
                <ul class="clearfix">
                    <li v-for="(item,index) in tabsList" @click="onAddClass(index)" :class="{'order-active':index==orderNum}">{{item.name}}</li>
                </ul>
            </div>

            <div class="tByCar-detail" v-html="textHtml">
                <!-- {{textHtml}} -->
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "tByCar",
  components: {
    XHeader
  },
  data() {
    return {
      tabsList: [
        { name: "产品介绍", num: 0 },
        { name: "办理流程", num: 1 },
        { name: "产品优势", num: 2 }
      ],
      orderNum: 0,
      textHtml: "",
      introduce: "",
      carTips:'',
      product_advance: ""
    };
  },
  methods: {
    onAddClass(i) {
      this.orderNum = i;
      if (i == 0) {
        this.textHtml = "";
        this.textHtml = this.introduce;
      } else if (i == 1) {
        this.textHtml = "";
         this.textHtml = this.carTips;
      } else if (i == 2) {
        this.textHtml = "";
        this.textHtml = this.product_advance;
      }
    },
    getListDetail() {
      var qs = require("qs");
      this.$http
        .post("/api_public/get_pull_car	", qs.stringify({ scenic_id: this.id }))
        .then(res => {
          this.textHtml = res.data.introduce;
          this.introduce = res.data.introduce;
          this.carTips = `${res.data.car_address}<br/>${res.data.car_date}<br/>${res.data.car_depart}<br/>${res.data.car_price}<br/>${res.data.extend_service}<br/>`
          this.product_advance = res.data.product_advance;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getListDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
