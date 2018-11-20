<template>
    <div class="login">
        <!-- <mt-header title="忘记密码">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="login-bg">
            <img src="../../common/images/login.png" alt="">
        </div>

        <div class="login-title">
            国有企业&nbsp;&nbsp;&nbsp;&nbsp;放心选择
        </div>

        <div class="login-box">
            <div class="login-ipt flex">
                <div class="login-form-icon">
                    <i class="iconfont icon-shoujihao"></i>
                </div>
                <div class="login-form-info flex-1">
                    <input type="text" placeholder="请输入手机号">
                </div>
            </div>
            <div class="login-ipt flex">
                <div class="login-form-icon">
                    <i class="iconfont icon-verify"></i>
                </div>
                <div class="login-form-info flex-1">
                    <input type="text" placeholder="请输入验证码">
                </div>
                <div class="login-form-yan">
                    获取验证码
                </div>
            </div>

            <div class="login-ipt flex">
            <div class="login-form-icon">
                <i class="iconfont icon-mima"></i>
            </div>
            <div class="login-form-info flex-1">
                <input type="password" placeholder="请输入密码">
            </div>
        </div>
        <div class="login-ipt flex">
            <div class="login-form-icon">
                <i class="iconfont icon-mima"></i>
            </div>
            <div class="login-form-info flex-1">
                <input type="password" placeholder="请输入密码">
            </div>
        </div>

            <div class="login-btn">
                确认修改
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      text: "获取动态码",
      time: 60
    };
  },
  methods: {
    onYan() {
      // 先对手机号码进行验证
      let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
      if (this.user.tel == "") {
        Toast({ message: "请输入手机号", duration: 1000 });
        return;
      }
      if (!reg.test(this.user.tel)) {
        Toast({ message: "请输入正确的手机号", duration: 1000 });
        return;
      }
      //手机号码验证通过

      //验证是否存在
      var qs = require("qs");
      this.$http
        .post(
          "/api_user/send_sms",
          qs.stringify({ mobile: this.user.tel, type: 1 })
        )
        .then(res => {
          if (res.data.status == 1) {
            console.log(res);
            Toast({ message: res.data.msg, duration: 1500 });
            if (this.text != "获取动态码") {
              return;
            }
            // Toast({ message: "验证码已发送", duration: 2000 });
            let interval = window.setInterval(() => {
              if (this.time-- <= 1) {
                this.time = 60;
                this.text = "获取动态码";
                window.clearInterval(interval);
              } else {
                this.text = `${this.time}s`;
              }
            }, 1000);
          } else {
            Toast({ message: res.data.msg, duration: 1500 });
            return;
          }
        })
        .catch(function(err) {
          console.log(err);
          return;
        });
    },
    onLogin() {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
      if (this.user.tel == "") {
        Toast({ message: "请输入手机号", duration: 1000 });
        return;
      }
      if (!reg.test(this.user.tel)) {
        Toast({ message: "请输入正确的手机号", duration: 1000 });
        return;
      }
      if (this.user.yan == "") {
        Toast({ message: "请输入验证码", duration: 1000 });
        return;
      }
      if (this.user.pwd == "") {
        Toast({ message: "密码不得为空", duration: 1000 });
        return;
      }
      if (this.user.pwdTwo == "") {
        Toast({ message: "请再次输入密码", duration: 1000 });
        return;
      }
      if (this.user.pwd !== this.user.pwdTwo) {
        Toast({ message: "两次密码不一致", duration: 1000 });
        return;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/login/login";
</style>
