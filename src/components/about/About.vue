<template>
    <div class="about">
        <!-- <mt-header title="关于我们">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <x-header :left-options="{backText: ''}">关于我们</x-header>

        <div class="about-bannner">
            <img src="../../common/images/about.png" alt="">
        </div>

        <div class="about-con" v-html="item.content">
    
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "about",
  components: {
    XHeader
  },
  data() {
    return {
      item:''
    };
  },
  methods: {
    getDetail() {
      var qs = require("qs");
      this.$http
        .post(
          "/api_public/get_about_row "
        )
        .then(res => {
          console.log(res);
          this.item =res.data.row;
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
.about-bannner {
  width: 100%;
  height: 2.8rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.about-con {
  padding: 0.25rem 0.12rem;
  background: #ffffff;
  p {
    font-size: 0.32rem;
    line-height: 0.4rem;
  }
}
</style>
