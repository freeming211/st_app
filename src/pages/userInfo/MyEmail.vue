<template>
    <div class="myInfo">
        <!-- <mt-header title="修改邮箱">
            <router-link to="/myInfo" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <x-header :left-options="{backText: ''}">修改邮箱</x-header>

        <div class="nickname-ipt">
            <input type="text" v-model="userInfo.email">    
        </div>
        <div class="nickname-span">
            邮箱为接收出团通知等资料,请使用常用邮箱
        </div>
        <div class="nickname-btn" @click="onSubmit">
            <p>保存</p>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
import { Toast } from "mint-ui";
import { setTimeout } from 'timers';
export default {
  name: "myInfo",
  components: {
    XHeader
  },
  data() {
    return {
      userInfo: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.userInfo.email == "") {
        Toast({ message: "请填写邮箱", duration: 1500 });
        return;
      }

      var qs = require("qs");
      this.$http
        .post(
          "/api_user/change_user_info",
          qs.stringify({
            field: "email",
            value: this.userInfo.email,
            user_type: this.user_type
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            Toast({ message: "修改成功", duration: 1500 });
            setTimeout(()=>{
                this.$router.push({ name: "center"});
            },1500)
          } else {
            Toast({ message: "修改失败", duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(this.$route.params.userInfo);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
