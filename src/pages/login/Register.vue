<template>
    <div class="login">
        <!-- <mt-header title="注册">
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
                    <i class="iconfont icon-verify"></i>
                </div>
                <div class="login-form-info flex-1">
                    <input type="text" placeholder="请输入验证码" v-model="vcode">
                </div>
                <div class="login-form-yan" @click="onYan">
                    {{text}}
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

            </div>

            <div class="login-btn" @click="onLogin">
                完成注册
            </div>

            <div class="login-check">
                <label for="check">
                    <input type="checkbox" name="" id="check" v-model="checkTrue">
                    <span>已同意
                        <span>《沈阳国旅服务条款》</span>
                    </span>
                </label>
            </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      text: "获取动态码",
      checkTrue: true,
      time: 60,
      mobile: "",
      vcode: "",
      pwd: ""
    };
  },
  methods: {
    backBtn(){
      this.$router.go(-1)
    },
    // 验证码
    onYan() {
      // 先对手机号码进行验证
      let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
      if (this.mobile == "") {
        Toast({ message: "请输入手机号", duration: 1000 });
        return;
      }
      if (!reg.test(this.mobile)) {
        Toast({ message: "请输入正确的手机号", duration: 1000 });
        return;
      }

      if (this.text != "获取动态码") {
        return;
      }

      //发送验证码
      var qs = require("qs");
      this.$http
        .post("/api_login/send_vcode", qs.stringify({ mobile: this.mobile }))
        .then(res => {
          if (res.data.code == 200) {
            Toast({ message: "动态码已发送", duration: 1500 });
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
      if (this.mobile == "") {
        Toast({ message: "请输入手机号", duration: 1000 });
        return;
      }
      if (!reg.test(this.mobile)) {
        Toast({ message: "请输入正确的手机号", duration: 1000 });
        return;
      }
      if (this.vcode == "") {
        Toast({ message: "请输入验证码", duration: 1000 });
        return;
      }
      if (this.pwd == "") {
        Toast({ message: "密码不得为空", duration: 1000 });
        return;
      }

      if (!this.checkTrue) {
        Toast({ message: "请同意服务条款", duration: 1000 });
        return;
      }

      //提交信息
      var qs = require("qs");
      this.$http
        .post(
          "/api_login/register",
          qs.stringify({
            mobile: this.mobile,
            pwd: this.pwd,
            vcode: this.vcode
          })
        )
        .then(res => {
          console.log(res);
            if (res.data.code == 200) {
              Toast({ message: "注册成功", duration: 1000 });
              this.$router.push({ name: "login" });
            } else {
              Toast({ message: res.data.msg, duration: 1000 });
            }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/login/login";
</style>
