<template>
  <div class="home">
    <div class="home-fixed">

      <Scroll :data="line" class="new-content" ref="scroll" v-on:pulldown="_pulldown" :pulldown="true" :listen-scroll="listenScroll" :probe-type="3" @scroll="scroll">
        <div>
          <!-- <div class="common-header">
            <div class="common-header-box flex flex-align-center">
              <div class="common-header-gprs odd-ellipsis">
                {{cityAddress}}
              </div>
              <div class="common-header-ipt flex flex-align-center" @click="goSearch">
                <div>
                  <i class="iconfont icon-sousuo"></i>
                </div>
                <div>
                  <input type="text" placeholder="输入关键词搜索线路1" readonly>
                </div>
              </div>
            </div>
          </div> -->

          <div class="new-header">
            沈铁国旅
          </div>

          <!-- 轮播图 -->
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in imglist" :key="index">
              <img :src="item.file_url" alt="">
            </mt-swipe-item>
          </mt-swipe>
          <!-- <swiper :list="imglist" auto style="width:100%;margin:0 auto;" height="3rem" dots-class="custom-bottom" dots-position="center"></swiper> -->

          <!--作为悬停时候使用 -->
          <ul class="home-ul clearfix"  ref="homeCon">
            <li>
              <router-link to="/TrainTravel">
                <img src="../../common/images/home-li-1.png" alt="">
                <p class="home-ul-p">旅游专列</p>
              </router-link>
            </li>
            <li>
              <router-link to="/LineTravel">
                <img src="../../common/images/home-li-2.png" alt="">
                <p class="home-ul-p">旅游专线</p>
              </router-link>
            </li>
            <li>
              <router-link to="/Car">
                <img src="../../common/images/home-li-3.png" alt="">
                <p class="home-ul-p">观光车</p>
              </router-link>
            </li>
            <li>
              <router-link to="/trainByCar">
                <img src="../../common/images/home-li-4.png" alt="">
                <p class="home-ul-p">火车拉汽车</p>
              </router-link>
            </li>
            <li>
              <router-link to="/OutTravel">
                <img src="../../common/images/home-li-5.png" alt="">
                <p class="home-ul-p">出境游</p>
              </router-link>
            </li>
            <li>
              <router-link to="/Near">
                <img src="../../common/images/nearby.png" alt="">
                <p class="home-ul-p">周边游</p>
              </router-link>
            </li>
            <li>
              <router-link to="/hotel">
                <img src="../../common/images/home-li-7.png" alt="">
                <p class="home-ul-p">宾馆住宿</p>
              </router-link>
            </li>
            <li>
              <router-link to="/Ticket">
                <img src="../../common/images/home-li-8.png" alt="">
                <p class="home-ul-p">票务预订</p>
              </router-link>
            </li>

            <li>
              <router-link to="/gate">
                <img src="../../common/images/home-li-6.png" alt="">
                <p class="home-ul-p">景区门票</p>
              </router-link>
            </li>
            <li>
              <router-link to="/About">
                <img src="../../common/images/home-li-10.png" alt="">
                <p class="home-ul-p">关于我们</p>
              </router-link>
            </li>
          </ul>

          <div class="home-con">
            <div class="home-tuijian-header flex flex-align-center">
              <div class="home-title-i">
                <i class="iconfont icon-xingli"></i>
              </div>
              <div class="home-title">
                精选推荐
              </div>
            </div>
            <div class="home-tuijian">
              <div class="home-tuijian-list" v-for="item in line" :key="item.id" @click="onLineDetail(item)">
                <div class="home-tuijian-list-img">
                  <img :src="item.pic_url" alt="">
                  <span>{{item.city_name}}出发</span>
                </div>
                <div class="home-tuijian-list-bottom">
                  <p class="even-ellipsis">
                    {{item.title}}
                  </p>
                  <div class="home-tuijian-text flex flex-align-center">
                    <div class="home-tuijian-span">
                      <span style="margin-right:.15rem;" v-for="(list,index) in item.line_type" :key="list" v-if="index < 3">{{list}}</span>
                    </div>
                    <div class="home-tuijian-price flex-1">
                      <span>￥{{item.min_price}}
                        <span class="qi">起</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="home-con">
            <div class="home-tuijian-header flex flex-align-center">
              <div class="home-title-i">
                <i class="iconfont icon-xingli"></i>
              </div>
              <div class="home-title">
                产品攻略
              </div>
              <div class="home-more flex-1" @click="onTripsMore">
                更多>
              </div>
            </div>
            <div class="home-gonglve">
              <div class="home-gonglve-item flex flex-align-center" v-for="item in trips" :key="item.id" @click="onTripsDetail(item)">
                <div class="home-gonglve-img">
                  <img :src="item.file_url" alt="">
                </div>
                <div class="home-gonglve-right flex-1">
                  <p class="home-gonglve-title even-ellipsis">{{item.subject}} </p>
                  <p class="home-gonglve-time">发布时间:{{item.crts}}</p>
                  <p class="home-gonglve-span">
                    <span>
                      <i class="iconfont icon-liulan"></i>
                      ({{item.view}})
                    </span>
                    <!-- <span>
                  <i class="iconfont icon-fenxiang"></i>
                  (210)
                </span> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>

    <!-- 定位用,不用显示 -->
    <div id="container"></div>
    <div class="top" @click="onGoTop" v-show="topHide">
      <img src="../../common/images/top.png" alt="">
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll";
import HomeUl from "@/pages/home/Home-ul";
import { Swiper, SwiperItem } from "vux";
export default {
  name: "home",
  data() {
    return {
      cityAddress: "沈阳",
      imglist: [],
      line: [],
      trips: [],
      topHide: false,
      scrollY: 0,
    };
  },
  methods: {
    goSearch() {
      this.$router.push({
        name: "search"
      });
    },
    onGoTop() {
      // 手机端支持第一个
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //上拉加载 重新加载数据
    _pulldown() {
      this.getBanner();
      this.getList();
    },
    // 滚动距离
    scroll(pos) {
      this.scrollY = pos.y;
    },
    // 轮播图
    getBanner() {
      this.$http
        .post("/api_public/get_banner")
        .then(res => {
          this.imglist = res.data.list;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 获取数据
    getList() {
      this.$http
        .post("/api_public/get_index_list")
        .then(res => {
          this.line = res.data.line;
          this.trips = res.data.trips;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 推荐详情
    onLineDetail(item) {
      if (item.product_type == 1) {
        this.$router.push({
          name: "TrainTravel-detail",
          params: { id: item.id }
        });
      } else {
        this.$router.push({
          name: "LineTravelDetail",
          params: { id: item.id }
        });
      }
    },
    // 攻略更多
    onTripsMore() {
      this.$router.push({ name: "strategy" });
    },
    // 攻略详情
    onTripsDetail(item) {
      this.$router.push({ name: "strategy-detail", params: { id: item.id } });
    }
  },
  created() {
    this.getBanner();
    this.getList();
    this.listenScroll = true;
    // let cityName = sessionStorage.getItem("cityName");
    // cityName = cityName.slice(0, cityName.length - 1);
    // this.cityAddress = cityName;
  },
  watch: {
    scrollY(newY, oldY) {
      if (Math.abs(newY) >= 400) {
        this.topHide = true;
      } else {
        this.topHide = false;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // var map = new BMap.Map("container");
      // var point = new BMap.Point(116.331398, 39.897445);
      // map.centerAndZoom(point, 12);

      // function myFun(result) {
      //   var cityName = result.name;
      //   sessionStorage.setItem("cityName", cityName);
      //   // map.setCenter(cityName);
      // }
      // var myCity = new BMap.LocalCity();
      // myCity.get(myFun);

      // 精选推荐距离元素顶端的高度 homeCon
      // this.homeConTop = this.$refs.homeCon.offsetTop;
    });
  },
  destroyed() {},
  activated() {
    this.$refs.scroll.refresh();
  },
  components: {
    Swiper,
    SwiperItem,
    HomeUl,
    Scroll
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.new-header{background:#ffffff;color:#333333;padding: .13rem .2rem .13rem .22rem;text-align: center;font-size: .34rem;font-weight: 400;}
.top { width: 1rem; position: fixed;right: 0.2rem; bottom: 1.5rem;z-index: 98;
  img {
    width: 100%;
  }
}
@import "../../common/css/home/home";
</style>
