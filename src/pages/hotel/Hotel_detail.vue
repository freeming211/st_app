<template>
    <div class="hotel-detail">
        <x-header :left-options="{backText: ''}">酒店详情</x-header>

        <div class="hotel-detail-banner">
            <img :src="item.thumb" alt="">
            <div>
                <p>豪华型</p>
            </div>
        </div>

         <div class="hotel-detail-js">
             <div class="hotel-name">
                {{item.name}}
             </div>
             <div class="hotel-price">
                最低消费:￥{{item.low_price}}起
             </div>
             <div class="hotel-address">
                宾馆地址:{{item.address}}
             </div>
         </div>


         <div style="margin-bottom:1.2rem;">
            <div class="order-detail-box">
                <div class="common-detail-img">
                    <i class="iconfont icon-xingli"></i>酒店环境
                </div>
            </div>

            <div class="order-detail-item" v-html="item.introduce">
                
            </div>
         </div>

        <div class="order-footer" @click="onShowPop">
            酒店地图
        </div>

    </div>
</template>

<script>
import { XHeader} from "vux";
export default {
  name: "hotel-detail",
  components: {
    XHeader
  },
  data() {
    return {
      item: "",
    };
  },
  methods: {
    getListDetail() {
      var qs = require("qs");
      this.$http
        .post("/api_public/get_hotel_row", qs.stringify({ id: this.id }))
        .then(res => {
          this.item = res.data.row;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onShowPop() {
      this.$router.push({ name: "hotel-map",params:{item:JSON.stringify(this.item) }});
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getListDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/hotel/hotel";
</style>
