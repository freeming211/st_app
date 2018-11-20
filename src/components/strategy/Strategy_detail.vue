<template>
    <div class="strategy-detail">
        <x-header :left-options="{backText: ''}" class="strategy-header">行程攻略</x-header>

        <div class="strategy-con">
            <div class="strategy-detail-box">
                <div class="strategy-banner-line">
                    <img :src="item.file_url" alt="">
                    <div class="strategy-banner-pos">
                        <p class="strategy-banner-name even-ellipsis">{{item.subject}}</p>
                        <p class="strategy-banner-time">发布时间:{{item.crts}}</p>
                    </div>
                </div>
            </div>

            <div class="strategy-detail-talk" v-html="item.message">
            </div>
        </div>

        <!-- 浏览记录和分享,隐藏 -->
        <!-- <div class="strategy-footer flex flex-align-center">
            <div class="flex-1" style="border-right:1px solid #cccccc;">
                <i class="iconfont icon-liulan"></i>
                <p>{{item.view}}</p>
            </div>
            <div class="flex-1">
                <i class="iconfont icon-fenxiang"></i>
                <p></p>
            </div>
        </div> -->

    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "strategy-detail",
  components: {
    XHeader
  },
  data() {
    return {
      item: ""
    };
  },
  methods: {
    getListDetail() {
      var qs = require("qs");
      this.$http
        .post("/api_public/get_trips_row", qs.stringify({ id: this.id }))
        .then(res => {
          //   console.log(res);
          this.item = res.data.row;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);
    this.getListDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/strategy/strategy";
</style>
