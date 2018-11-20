<template>
  <div class="service">
    

    <x-header :left-options="{backText: ''}">客服</x-header>

    <div class="ser-title">
        在线客服为您答疑
    </div>
<!-- 
    <ul class="clearfix">
      <li>专列行程</li>
      <li>专线行程</li>
      <li>出境行程</li>
      <li class="li-noboder">观光车</li>
    </ul>
    <ul class="clearfix">
      <li>旅游攻略</li>
      <li>资费详情</li>
      <li>导游服务</li>
      <li class="li-noboder">订单咨询</li>
    </ul> -->

    <div id="chatContainer" style="margin-bottom:1.8rem;">
        <div class="ser-talkBox clearfix" v-for="item in msg_arr">
      <!-- 接收方 begin-->
      <div class="ser-left left clearfix" v-if="!item.local">
          <div class="ser-img left">
            <img src="../../common/images/kefu.png" alt="">
          </div>
        <div class="ser-text right" >
          <div class="ser-text-time">
            {{ new Date(item.crts).toLocaleString() }}
          </div>
          <div class="ser-text-box">
            {{ item.content }}
          </div>
          <div class="triangle-left"></div>
        </div>
      </div>
      <!--接收方 end-->
      <!--发送方 begin-->
      <div class="ser-right right clearfix" v-else>
        <div class="ser-img right">
          <img src="../../common/images/zixun.png" alt="">
        </div>
        <div class="ser-text left">
          <div class="ser-text-time right-time">
            {{ new Date().toLocaleString() }}
          </div>
          <div class="ser-text-box">
              {{ item.content }}
          </div>
          <div class="triangle-right"></div>
        </div>
      </div>
      <!--发送方 end-->
    </div>
    </div>

    <div class="ser-footer">
      <!-- <div class="ser-footer-icon">
          <i class="iconfont icon-biaoqing"></i>
          <i class="iconfont icon-tupian1"></i>
          <i class="iconfont icon-fujiaxiangmu"></i>
      </div> -->
      <div class="ser-footer-send flex flex-pack-justify flex-align-center">
          <div class="ser-footer-send-ipt">
             <input type="text" placeholder="点击输入内容..." @focus="onKeyBoard()" id="search" v-model="msg_content">
          </div>

          <div class="ser-footer-send-btn" @click="send_msg">
            发送
          </div>
      </div>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import axios from "axios";
import {
  init,
  isInit,
  login,
  isLogin,
  sendSingleMsg,
  loginOut
} from "../../common/js/jmessage_common";
import { XHeader } from "vux";
export default {
  name: "service",
  components: {
    XHeader
  },
  data() {
    return {
      msg_arr: [], //接收的消息
      msg_content: ""
    };
  },
  methods: {
    onKeyBoard() {
      let sIpt = document.getElementById("search");
      console.log(sIpt);
      setTimeout(() => {
        sIpt.scrollIntoView(true);
        console.log("我发送了");
      }, 200);
    },
    send_msg() {
      this.msg_content = this.msg_content.replace(/(^\s*)|(\s*$)/g, "");
      if (this.msg_content == "") {
        return;
      }
      this.msg_arr.push({ content: this.msg_content, local: true });

      //调用极光IM接口发送消息，返回极光IM的msg_id
      sendSingleMsg("admin", this.msg_content);

      this.msg_content = "";
    }
  },
  created() {
    const host_name = "http://sy.66diqiu.com/";
    var that = this;
    var username = localStorage.getItem("username"),
      password = "123456";
    loginOut();
    init(username, password, that); //初始化
    console.log("极光登录了");
    console.log(isInit());
  },
  watch: {
    msg_arr() {
      this.$nextTick(() => {
        let container = this.$el.querySelector("#chatContainer");
        container.scrollTop = container.scrollHeight;
        document.body.scrollTop = container.scrollHeight;
        console.log(container.scrollTop);
        console.log(container.scrollHeight);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/service/service";
</style>
