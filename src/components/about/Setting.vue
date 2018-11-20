<template>
    <div class="setting">
        <!-- <mt-header title="会员权益">
                        <router-link to="/center" slot="left">
                            <mt-button icon="back"></mt-button>
                        </router-link>
                    </mt-header> -->
        <x-header :left-options="{backText: ''}">我的设置</x-header>
        <div class="setting-box">
            <group>
                <x-switch :title="('消息推送')" :value-map="['0', '1']" v-model="stringValue"></x-switch>
                <cell title="版本信息" :value="version"></cell>
            </group>
        </div>
        <div class="login-out" @click="layOut">
            退出登录
        </div>
    </div>
</template>

<script>
import { XHeader, XSwitch, Group, Cell } from "vux";
import { Toast } from "mint-ui";
export default {
  name: "setting",
  components: {
    XHeader,
    XSwitch,
    Group,
    Cell
  },
  data() {
    return {
      nickName: "尼克",
      stringValue: "1",
      version: "1.0.0"
    };
  },
  methods: {
    layOut() {
      var qs = require("qs");
      this.$http
        .post("/api_login/logout")
        .then(res => {
          if (res.data.status == 1) {
            this.$router.push({ name: "Home" });
            Toast({ message: "退出成功", duration: 1500 });
            sessionStorage.removeItem("loginToken");
            localStorage.removeItem("username");
          } else {
            Toast({ message: res.data.msg, duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.setting {
  .setting-box {
    .vux-label {
      font-size: 0.34rem;
    }
    .weui-label {
      font-size: 0.34rem;
    }
  }
  .login-out {
    width: 7.1rem;
    margin: 4rem auto 0;
    text-align: center;
    padding: 0.25rem 0;
    background: #ffffff;
    border-radius: 0.15rem;
    border: 1px solid #262f81;
    color: #262f81;
    font-size: 0.34rem;
  }
}
@import "../../common/css/center/center";
</style>
