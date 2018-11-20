<template>
  <div class="center">
    <!-- 用户界面 -->
    <div v-if ="person">
          <div class="center-header">
        我的
        <div class="header-right" @click="goMsg">
          <i class="iconfont icon-xiaoxi1"></i>
        </div>
      </div>


      <div class="center-banner flex flex-pack-justify flex-align-center">
        <div class="center-banner-left flex flex-align-center">
          <div class="center-photo" @click="goMyInfo()">
            <img src="../../common/images/tx-02.png" alt="">
            <img class="center-photo-v" src="../../common/images/centerV.png" alt="">
          </div>

          <div class="center-text">
            <p>{{user_row.username}}</p>
            <p>{{user_row.mobile}}</p>
            <p class="center-huiyuan" @click="goVip">
              <span>{{member_level}}</span>
            </p>
          </div>

        </div>
        <div class="center-banner-qiandao" @click="onQian">
          签到送积分
        </div>
      </div>

      <div class="center-list flex flex-align-center">
        <div class="center-list-one" @click="goOrder(0)">
          <p>
            <i class="iconfont icon-dingdan"></i>
          </p>
          <p>我的订单</p>
        </div>
        <div class="center-list-two" @click="goOrder(1)">
          <p>
            <i class="iconfont icon-payment"  style="color:#10c5d9;"></i>
          </p>
          <p>待处理</p>
        </div>
        <div class="center-list-thr" @click="goOrder(2)">
          <p>
            <i class="iconfont icon-pen-square" style="color:#82D017;"></i>
          </p>
          <p>待评论</p>
        </div>
      </div>
      <div class="center-list flex flex-align-center">
        <div class="center-list-one" style="background:#fefdf6;color:#f5b612;border-left:3px solid #f6c235;">
          <p>
            <i class="iconfont icon-dingdan"></i>
          </p>
          <p>我的钱包</p>
        </div>
        <div class="center-list-two" @click="goIntegral()">
          <p class="color-num" style="color:#FE864A;">{{integral}}</p>
          <p>积分</p>
        </div>
        <div class="center-list-thr" @click="goMyTicket()">
          <p class="color-num" style="color:#37ADBB;">{{coupon_count}}张</p>
          <p>优惠券</p>
        </div>
      </div>
      <div class="center-list flex flex-align-center">
        <div class="center-list-one" style="background:#fef7f9;color:#f03d58;border-left:3px solid #f14b62;">
          <p>
            <i class="iconfont icon-fuwu"></i>
          </p>
          <p>我的服务</p>
        </div>
        <!-- <div class="center-list-two" @click="goShare()">
          <p>
            <i class="iconfont icon-fenxiang2" style="color:#d466dc;"></i>
          </p>
          <p>分享</p>
        </div> -->
        <div class="center-list-thr" @click="goSetting()">
          <p>
            <i class="iconfont icon-05" style="color:#4196f3;"></i>
          </p>
          <p>设置</p>
        </div>
      </div>

      <div class="mark" v-if="isMark" @touchmove.prevent>
      </div>
      <div class="qiandao-png" v-if="isMark" @touchmove.prevent >
          <img src="../../common/images/qiandao.png" alt="">
          <p class="signPoints"> <span>+</span> {{signPoints}} <span>分</span> </p>
      </div>
    </div>

    <!-- 员工界面 -->
    <div v-if ="!person">
          <div class="center-header">
        我的
        <div class="header-right" @click="goMsg">
          <i class="iconfont icon-xiaoxi1"></i>
        </div>
      </div>


      <div class="center-banner flex flex-pack-justify flex-align-center">
        <div class="center-banner-left flex flex-align-center">
          <div class="center-photo">
            <img src="../../common/images/tx-02.png" alt="">
            <img class="center-photo-v" src="../../common/images/centerV.png" alt="">
          </div>

          <div class="center-text">
            <p>{{guide_user_row.username}}</p>
            <p>{{guide_user_row.mobile}}</p>
            <p class="center-huiyuan">
              <span>公司员工</span>
            </p>
          </div>

        </div>
        <div class="center-banner-qiandao" >
          沈阳总公司
        </div>
      </div>

      <div class="center-list flex flex-align-center">
        <div class="center-list-one">
          <p>
            <i class="iconfont icon-neibujixiao"></i>
          </p>
          <p>绩效管理</p>
        </div>
        <div class="center-list-two">
          <p>
            <i class="iconfont icon-jixiaokaoping"  style="color:#10c5d9;"></i>
          </p>
          <p>本月绩效</p>
        </div>
        <div class="center-list-thr">
          <p>
            <i class="iconfont icon-icon-test1" style="color:#82D017;"></i>
          </p>
          <p>历史绩效</p>
        </div>
      </div>
      <div class="center-list flex flex-align-center">
        <div class="center-list-one" style="background:#fefdf6;color:#f5b612;border-left:3px solid #f6c235;">
          <p>
            <i class="iconfont icon-tuandui"></i>
          </p>
          <p>带团管理</p>
        </div>
        <div class="center-list-two"  @click="goTeamList()">
          <p>
            <i class="iconfont icon-renyuanpaiban" style="color:#4196f3;"></i>
          </p>
          <p>带团列表</p>
        </div>
        <div class="center-list-thr">
          <p>
            <i class="iconfont icon-renyuandanganguanli" style="color:#d466dc;"></i>
          </p>
          <p>累计排名</p>
        </div>
      </div>

      <div class="center-list flex flex-align-center">
        <div class="center-list-one" style="background:#fef7f9;color:#f03d58;border-left:3px solid #f14b62;">
          <p>
            <i class="iconfont icon-fuwu"></i>
          </p>
          <p>我的服务</p>
        </div>
        <div class="center-list-thr" @click="goSetting()">
          <p>
            <i class="iconfont icon-05" style="color:#4196f3;"></i>
          </p>
          <p>设置</p>
        </div>
      </div>

      <div class="mark" v-if="isMark" @touchmove.prevent>
      </div>
      <div class="qiandao-png" v-if="isMark" @touchmove.prevent >
          <img src="../../common/images/qiandao.png" alt="">
          <p class="signPoints"> <span>+</span> {{signPoints}} <span>分</span> </p>
      </div>
    </div>
    
    <myFooter></myFooter>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "center",
  data() {
    return {
      coupon_count: "",
      member_level: "",
      user_row: "",
      guide_user_row:"",
      integral: "",
      isMark: false,
      person: true // false 表示 用户，true 职工
    };
  },
  methods: {
    onQian() {
      this.$http
        .post("/api_user/sign")
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.isMark = true;
            this.signPoints = res.data.sign_points;
            this.getAllIntegral();
            setTimeout(() => {
              this.isMark = false;
            }, 2000);
          } else {
            Toast({ message: res.data.msg, duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    goMsg() {
      this.$router.push({ name: "centerMsg" });
    },
    goMyInfo() {
      this.$router.push({ name: "myInfo",params:{userInfo:JSON.stringify(this.user_row)}});
    },
    goVip() {
      this.$router.push({ name: "vip" });
    },
    //订单
    goOrder(i) {
      this.$router.push({ name: "order", params: { num: i } });
    },
    //积分
    goIntegral() {
      this.$router.push({ name: "integral" });
    },
    //优惠券
    goMyTicket() {
      this.$router.push({ name: "myTicket" });
    },
    //分享
    goShare() {
      this.$router.push({ name: "share" });
    },
    //设置
    goSetting() {
      this.$router.push({ name: "setting" });
    },
    goTeamList() {
      this.$router.push({ name: "teamList" });
    },
    // 总积分
    getAllIntegral() {
      this.$http
        .post("/api_user/get_user_integral")
        .then(res => {
          if (res.data.status == -2) {
            Toast({ message: "登录超时", duration: 1500 });
            localStorage.removeItem("loginToken");
            this.$router.push({ name: "Home" });
          }
          this.coupon_count = res.data.coupon_count;
          this.member_level = res.data.member_level;
          this.user_row = res.data.user_row;
          console.log(res)
          this.integral = res.data.integral == null?0:res.data.integral;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 导游,领队信息
    getGuideInfo() {
      this.$http
        .post("/api_user/get_user_row")
        .then(res => {
          // console.log(res);
          this.guide_user_row = res.data.user_row;
          if (res.data.status == -2) {
            Toast({ message: "登录超时", duration: 1500 });
            localStorage.removeItem("loginToken");
            this.$router.push({ name: "Home" });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    let userType = localStorage.getItem("userType");
    // 普通用户
    if (userType == 1) {
      this.getAllIntegral();
      this.person = true;
    } else {
      this.getGuideInfo();
      this.person = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
