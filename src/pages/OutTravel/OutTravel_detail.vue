<template>
    <div class="gate">
        <x-header :left-options="{backText: ''}">行程详情</x-header>  
            <div class="gate-detail-swipe">
                <div class="xc-img">
                    <img :src="item.pic_url" alt="">
                </div>
                <div class="gate-detail-swipe-pos flex flex-pack-justify flex-align-center">
                    <div>
                       {{item.city_name}}出发
                    </div>
                    <div>
                        编号:{{item.product_num}}
                    </div>
                </div>
            </div>

            <div class="gate-xs">
                <div class="gate-xs-name">
                    {{item.title}}
                </div>
                <div class="gate-xs-time flex">
                    <div class="gate-xs-time-left xs-price">
                        <span>￥{{item.min_price}}</span>起/人
                    </div>
                </div>
            </div>

            <div class="xs-date-box flex flex-pack-justify" v-show = "goLists.length>0">
                <div class="xs-date" v-for = "(item,index) in goLists" :key="item.go_date" v-if = "index < 4" @click="onBuy">
                    <p>{{item.go_date}}{{item.week}}</p> 
                    <!-- <p>￥3500<span>起</span></p>  -->
                </div>
            </div>

            

            <div class="gate-con">
                <ul class="gate-con-ul-four clearfix" :class="searchBarFixed == true ? 'com-order-fixed' :''">
                    <li v-for="(item,index) in tabsList" @click="onAddClass(index)" :key="item.type" :class="{'active-li':index==typeNum}">{{item.name}}</li>
                </ul>

                <!-- 景点介绍 -->
                <div class="gate-con-about">
                    <div class="gate-con-about-title">
                        <i class="iconfont icon-lvyou"></i> 产品简介
                    </div>

                    <div class="gate-con-about-box" style="border:none;">
                        {{item.sub_title}}
                    </div>
                    <!-- <div class="gate-con-about-box">
                        沈阳故宫是我国仅存的两大宫殿建筑群之一，沈阳故宫占地面积六万多平方米，有古建筑114座，500多间，至今保存完好，是一处包含着丰富历史文化内涵的古代遗址。在宫廷遗址上建立的沈阳故宫博物院是著名的古代宫廷艺术博物馆，藏品中包含十分丰富的宫廷艺术品。
                        <img src="../../common/images/tuijian-1.png" alt="">
                    </div> -->
                </div>
            </div>

            <div class="xs-day-box" v-show = "days.length > 0">
                <div class="xs-day-list" v-for = "(item,index) in days" :key="item.id">
                    <div class="xs-day-list-title flex flex-pack-justify flex-align-center">
                        <div class="xs-day-icon">
                            <i class="iconfont icon-hangcheng"></i>第{{index+1}}天
                        </div>

                        <div class="xs-day-address">
                           {{item.title}}
                        </div>
                    </div>

                    <div class="xs-day-con">
                        <div class="xs-day-con-title">
                            {{item.info}}
                        </div>

                        <div class="xs-day-text" v-for = "(list,index) in item.releated_scenic" :key="list.sid">
                            <div v-for="one in list" :key="one.id">
                                {{one.name}}
                                <img :src="one.url" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="xs-day-con">
                        <div class="xs-day-con-title">
                            三餐
                        </div>
                        <div>
                            早餐:{{item.breakfast}} 中餐：{{item.lunch}} 晚餐：{{item.supper}}
                        </div>
                    </div>
                    <div class="xs-day-con">
                        <div class="xs-day-con-title">
                            交通
                        </div>
                        <div>
                            {{item.traffic}}
                        </div>
                    </div>
                    <div class="xs-day-con">
                        <div class="xs-day-con-title">
                            住宿
                        </div>
                        <div>
                            {{item.hotel}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="xs-feiyong">
                <div class="xs-feiyong-title">
                    <i class="iconfont icon-lingqiandaijinbi"></i>线路特色
                </div>
                <p v-html="item.line_trait">
                </p>
            </div>

            <div class="xs-order">
                <div class="xs-feiyong-title">
                    <i class="iconfont icon-toubaoxuzhi-copy"></i>温馨提示
                </div>
                <p v-html="item.reminder">

                </p>
            </div>

            <div class="xs-order">
                <div class="xs-feiyong-title">
                    <i class="iconfont icon-toubaoxuzhi-copy"></i>补充协议
                </div>
                <p v-html="item.agreement">

                </p>
            </div>

            <!-- 景点点评 -->
            <div class="gate-con-talk" style="margin-bottom:1.5rem;">
                <!-- <div class="gate-con-talk-title">
                    精彩点评(3)
                </div>

                <div class="gate-con-talk-list">
                    <div class="list-up flex flex-align-center">
                        <div class="list-up-img">
                            <img src="../../common/images/tx-01.png" alt="">
                        </div>
                        <div class="list-up-name">
                            <p>李大锤</p>
                            <p class="list-up-time">2017-01-17 09:25</p>
                        </div>
                        <div class="list-up-star flex-1">
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                        </div>
                    </div>

                    <div class="list-about">
                        主人热情好客，各种海鲜美味丰盛，让您大饱口福！自家有车免费接站，宏远渔家是您旅游休闲的好去处！
                    </div>

                    <div class="list-img">
                        <ul class="clearfix">
                            <li>
                                <img src="../../common/images/gate-list-01.png" alt="">
                            </li>
                            <li>
                                <img src="../../common/images/gate-list-02.png" alt="">
                            </li>
                            <li>
                                <img src="../../common/images/gate-list-03.png" alt="">
                            </li>
                            <li>
                                <img src="../../common/images/gate-list-04.png" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="gate-con-talk-list">
                    <div class="list-up flex flex-align-center">
                        <div class="list-up-img">
                            <img src="../../common/images/tx-02.png" alt="">
                        </div>
                        <div class="list-up-name">
                            <p>李大大</p>
                            <p class="list-up-time">2017-01-17 09:25</p>
                        </div>
                        <div class="list-up-star flex-1">
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                        </div>
                    </div>

                    <div class="list-about">
                        主人热情好客，各种海鲜美味丰盛，让您大饱口福！自家有车免费接站，宏远渔家是您旅游休闲的好去处！
                    </div>
                </div>
                <div class="gate-con-talk-list">
                    <div class="list-up flex flex-align-center">
                        <div class="list-up-img">
                            <img src="../../common/images/tx-03.png" alt="">
                        </div>
                        <div class="list-up-name">
                            <p>李莉美</p>
                            <p class="list-up-time">2017-01-17 09:25</p>
                        </div>
                        <div class="list-up-star flex-1">
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                            <i class="iconfont icon-xing1"></i>
                        </div>
                    </div>

                    <div class="list-about">
                        主人热情好客，各种海鲜美味丰盛，让您大饱口福！自家有车免费接站，宏远渔家是您旅游休闲的好去处！
                    </div>
                </div> -->
            </div>

            <div class="fixed-footer-order flex-align-center flex">
                <div @click="goHome">
                    <i class="iconfont icon-icon-test"></i>
                    <p>首页</p>
                </div>
                <div @click="goService">
                    <i class="iconfont icon-guanjiaowangtubiao11"></i>
                    <p>客服</p>
                </div>
                <!-- <div>
                    <i class="iconfont icon-fenxiang"></i>
                    <p>分享</p>
                </div> -->
                <div class="now-btn flex-1" @click="onBuy">立即预定</div>
            </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
import { Toast } from "mint-ui";
export default {
  name: "gate",
  components: {
    XHeader
  },
  data() {
    return {
      // 几个tips 头部高度
      oneTop: "",
      twoTop: "",
      thrTop: "",
      fourTop: "",
      imgIndex: 1,
      typeNum: 0,
      tabsList: [
        { name: "产品简介", type: 0 },
        { name: "行程介绍", type: 1 },
        { name: "线路特色", type: 2 },
        { name: "温馨提示", type: 3 }
      ],
      orderTop: 0,
      searchBarFixed: false,
      // 接口需要的参数
      days: [],
      goLists: [],
      item: ""
    };
  },
  methods: {
    getListDetail() {
      var qs = require("qs");
      this.$http
        .post("/api_line/get_line_row", qs.stringify({ id: this.id }))
        .then(res => {
          console.log(res);
          this.item = res.data.row;
          this.days = res.data.days;
          this.goLists = res.data.go;
          this.$nextTick(() => {
            this.oneTop = document.querySelector(".gate-con-about").offsetTop;
            this.twoTop = document.querySelector(".xs-day-box").offsetTop;
            this.thrTop = document.querySelector(".xs-feiyong").offsetTop;
            this.fourTop = document.querySelector(".xs-order").offsetTop;
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onAddClass(index) {
      this.typeNum = index;
      if (index == 0) {
        document.body.scrollTop = this.oneTop;
      } else if (index == 1) {
        document.body.scrollTop = this.twoTop;
      } else if (index == 2) {
        document.body.scrollTop = this.thrTop;
      } else if (index == 3) {
        document.body.scrollTop = this.fourTop;
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //   if (scrollTop > this.orderTop) {
      //     this.searchBarFixed = true;
      //   } else {
      //     this.searchBarFixed = false;
      //   }
    },
    onBuy() {
      if(this.goLists < 1){
          Toast({ message: "该线路暂无团期", duration: 2000 });
          return;
      }
      this.$router.push({ name: "LineTravel-date" });
      sessionStorage.setItem("lineId", this.id);
      sessionStorage.setItem("row", JSON.stringify(this.item));
      //this.$router.push({ name: "TrainTravel-order" });
    },
    goHome() {
      this.$router.push({ name: "Home" });
    },
    goService() {
      this.$router.push({ name: "service" });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getListDetail();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/gate/gate";
</style>
