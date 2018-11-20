<template>
    <div class="login">
        <!-- <mt-header title="登录">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="login-bg">
            <img src="../../common/images/login.png" alt="">
        </div>
        <div class="backBtn" @click="backBtn">
          <i class="iconfont icon-fanhui"></i>后退
        </div>

        <div class="login-title">
            国有企业&nbsp;&nbsp;&nbsp;&nbsp;放心选择
        </div>

        <div class="login-ipt flex">
            <div class="login-form-icon">
                <i class="iconfont icon-shoujihao"></i>
            </div>
            <div class="login-form-info flex-1">
                <input type="text" placeholder="请输入手机号" v-model="mobile">
            </div>
        </div>
        <div class="login-ipt flex">
            <div class="login-form-icon">
                <i class="iconfont icon-mima"></i>
            </div>
            <div class="login-form-info flex-1">
                <input type="password" placeholder="请输入密码" v-model="pwd">
            </div>
        </div>

        <div class="login-forget flex flex-pack-justify">
            <p @click="onRegister">免费注册></p>
            <!-- <p @click="onForget">忘记密码?</p> -->
        </div>

        <div class="login-btn" @click="onLogin">
            登&nbsp;&nbsp;录
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      pwd: ""
    };
  },
  methods: {
    backBtn(){
      this.$router.go(-1)
    },
    onLogin() {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
      if (this.mobile == "") {
        Toast({ message: "请输入手机号", duration: 1000 });
        return;
      }
      if (!reg.test(this.mobile)) {
        Toast({ message: "请输入正确的手机号", duration: 1000 });
        return;
      }
      if (this.pwd == "") {
        Toast({ message: "密码不得为空", duration: 1000 });
        return;
      }
      var qs = require("qs");
      this.$http
        .post(
          "/api_login/login",
          qs.stringify({ mobile: this.mobile, pwd: this.pwd })
        )
        .then(res => {
          if (res.data.status == 200) {
            Toast({ message: res.data.msg, duration: 1500 });
            sessionStorage.setItem("loginToken", true);
            localStorage.setItem("userType", res.data.user_type);
            localStorage.setItem("username", res.data.username);
            // 跳转之前准备访问的地址
            let redirect = decodeURIComponent(
              this.$route.query.redirect || "/"
            );
            this.$router.push({
              //你需要接受路由的参数再跳转
              path: redirect
            });
          } else {
            Toast({ message: res.data.msg, duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onRegister() {
      this.$router.push({ name: "register" });
    }
    // onForget(){
    //     this.$router.push({ name: "forgetOne" });
    // }
  },
  created(){
    if(localStorage.getItem('loginToken') == 'true'){
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/login/login";
</style>
