<template>
    <div class="myInfo">
        <!-- <mt-header title="修改昵称">
            <router-link to="/myInfo" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->

         <x-header :left-options="{backText: ''}">修改昵称</x-header>

        <div class="nickname-ipt">
            <input type="text" v-model="nickName">    
        </div>
        <div class="nickname-span">
            昵称要求为4-16位字符,支持中文、英文、数字...
        </div>
        <div class="nickname-btn" @click="onSubmit">
            <p>保存</p>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
import { Toast } from "mint-ui";
export default {
  name: "myInfo",
  components: {
    XHeader
  },
  data() {
    return {
      nickName: "",
      user_type: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.nickName == "") {
        Toast({ message: "请填写昵称", duration: 1500 });
        return;
      }

      var qs = require("qs");
      this.$http
        .post(
          "/api_user/change_user_info",
          qs.stringify({
            field: "username",
            value: this.nickName,
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
    this.nickName = this.$route.params.realname;
    this.user_type = this.$route.params.user_type;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
