<template>
    <div class="gate">
        <x-header :left-options="{backText: ''}">门票详情</x-header>  
            <div class="gate-detail-swipe">
                <mt-swipe :show-indicators="false" @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in pictures" :key="index">
                        <img :src="item" alt="">
                    </mt-swipe-item>
                </mt-swipe>
                <div class="gate-detail-swipe-pos flex flex-pack-justify flex-align-center">
                    <div>
                        {{level}}级景区
                    </div>
                    <div>
                        <i class="iconfont icon-tupian"></i>{{imgIndex}}/{{pictures.length}}
                    </div>
                </div>
            </div>

            <div class="gate-xs">
                <div class="gate-xs-name">
                    {{name}}
                </div>
                <div class="gate-xs-time flex">
                    <div class="gate-xs-time-left">
                        开放时间
                    </div>
                    <div class="flex-1">
                        {{visit_time}}
                    </div>
                </div>
                <div class="gate-xs-address flex">
                    <div class="gate-xs-time-left">
                        景点地址
                    </div>
                    <div class="flex-1" @click="goAddress">
                        {{address}}
                    </div>
                </div>
            </div>

            <div class="gate-ticket-box" v-show ="name.length > 0">
                <!-- 票务列表 -->
                <div class="gate-ticket-list" v-if="ticket_1 != undefined">
                    <div class="list-title flex flex-pack-justify">
                        <div class="list-title-type">
                            <i class="iconfont icon-piao"></i>成人票
                        </div>
                        <div class="list-title-down ">
                            <i class="iconfont icon-down-trangle-copy-copy"></i>
                        </div>
                    </div>

                    <div class="gate-type" v-for = "(item,index) in ticket_1" :key="index">
                        <div class="gate-type-name">
                            {{item.name}}
                        </div>
                        <div class="flex flex-align-center">
                            <div class="gate-type-left">
                               <p class="gate-type-span"><span><i class="iconfont icon-xuanzhong"></i>热销</span> <span></span></p>
                               <p class="gate-type-tips">订票须知</p>
                            </div>

                            <div class="gate-type-price flex-1">
                                <p class="gate-type-price-true">￥{{item.low_price}}</p>
                                <p class="gate-type-py">优惠{{item.special}}元</p>
                            </div>

                            <div class="gate-type-btn" @click="onBuy(item.id)">
                                <p class="gate-type-btn-up">立即</p>
                                <p class="gate-type-btn-down">预订</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gate-ticket-list" v-if="ticket_2 != undefined">
                    <div class="list-title flex flex-pack-justify">
                        <div class="list-title-type">
                            <i class="iconfont icon-piao"></i>儿童票
                        </div>
                        <div class="list-title-down ">
                            <i class="iconfont icon-down-trangle-copy-copy"></i>
                        </div>
                    </div>

                    <div class="gate-type" v-for = "item in ticket_2" :key="item.id">
                        <div class="gate-type-name">
                            {{item.name}}
                        </div>
                        <div class="flex flex-align-center">
                            <div class="gate-type-left">
                               <p class="gate-type-span"><span><i class="iconfont icon-xuanzhong"></i>热销</span> <span></span></p>
                               <p class="gate-type-tips">订票须知</p>
                            </div>

                            <div class="gate-type-price flex-1">
                                <p class="gate-type-price-true">￥{{item.low_price}}</p>
                                <p class="gate-type-py">优惠{{item.special}}元</p>
                            </div>

                            <div class="gate-type-btn" @click="onBuy(item.id)">
                                <p class="gate-type-btn-up">立即</p>
                                <p class="gate-type-btn-down">预订</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gate-ticket-list" v-if="ticket_3 != undefined">
                    <div class="list-title flex flex-pack-justify">
                        <div class="list-title-type">
                            <i class="iconfont icon-piao"></i>老年票
                        </div>
                        <div class="list-title-down ">
                            <i class="iconfont icon-down-trangle-copy-copy"></i>
                        </div>
                    </div>

                    <div class="gate-type" v-for = "item in ticket_3" :key="item.id">
                        <div class="gate-type-name">
                            {{item.name}}
                        </div>
                        <div class="flex flex-align-center">
                            <div class="gate-type-left">
                               <p class="gate-type-span"><span><i class="iconfont icon-xuanzhong"></i>热销</span> <span></span></p>
                               <p class="gate-type-tips">订票须知</p>
                            </div>

                            <div class="gate-type-price flex-1">
                                <p class="gate-type-price-true">￥{{item.low_price}}</p>
                                <p class="gate-type-py">优惠{{item.special}}元</p>
                            </div>

                            <div class="gate-type-btn" @click="onBuy(item.id)">
                                <p class="gate-type-btn-up">立即</p>
                                <p class="gate-type-btn-down">预订</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gate-ticket-list" v-if="ticket_4 != undefined">
                    <div class="list-title flex flex-pack-justify">
                        <div class="list-title-type">
                            <i class="iconfont icon-piao"></i>家庭票
                        </div>
                        <div class="list-title-down ">
                            <i class="iconfont icon-down-trangle-copy-copy"></i>
                        </div>
                    </div>

                    <div class="gate-type" v-for = "item in ticket_1" :key="item.id">
                        <div class="gate-type-name">
                            {{item.name}}
                        </div>
                        <div class="flex flex-align-center">
                            <div class="gate-type-left">
                               <p class="gate-type-span"><span><i class="iconfont icon-xuanzhong"></i>热销</span> <span></span></p>
                               <p class="gate-type-tips">订票须知</p>
                            </div>

                            <div class="gate-type-price flex-1">
                                <p class="gate-type-price-true">￥{{item.low_price}}</p>
                                <p class="gate-type-py">优惠{{item.special}}元</p>
                            </div>

                            <div class="gate-type-btn" @click="onBuy(item.id)">
                                <p class="gate-type-btn-up">立即</p>
                                <p class="gate-type-btn-down">预订</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gate-ticket-list" v-if="ticket_5 != undefined">
                    <div class="list-title flex flex-pack-justify">
                        <div class="list-title-type">
                            <i class="iconfont icon-piao"></i>亲子票
                        </div>
                        <div class="list-title-down ">
                            <i class="iconfont icon-down-trangle-copy-copy"></i>
                        </div>
                    </div>

                    <div class="gate-type" v-for = "item in ticket_1" :key="item.id">
                        <div class="gate-type-name">
                            {{item.name}}
                        </div>
                        <div class="flex flex-align-center">
                            <div class="gate-type-left">
                               <p class="gate-type-span"><span><i class="iconfont icon-xuanzhong"></i>热销</span> <span></span></p>
                               <p class="gate-type-tips">订票须知</p>
                            </div>

                            <div class="gate-type-price flex-1">
                                <p class="gate-type-price-true">￥{{item.low_price}}</p>
                                <p class="gate-type-py">优惠{{item.special}}元</p>
                            </div>

                            <div class="gate-type-btn" @click="onBuy(item.id)">
                                <p class="gate-type-btn-up">立即</p>
                                <p class="gate-type-btn-down">预订</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="gate-ticket-list" v-if="ticket_6 != undefined">
                    <div class="list-title flex flex-pack-justify">
                        <div class="list-title-type">
                            <i class="iconfont icon-piao"></i>特惠票
                        </div>
                        <div class="list-title-down ">
                            <i class="iconfont icon-down-trangle-copy-copy"></i>
                        </div>
                    </div>

                    <div class="gate-type" v-for = "item in ticket_1" :key="item.id">
                        <div class="gate-type-name">
                            {{item.name}}
                        </div>
                        <div class="flex flex-align-center">
                            <div class="gate-type-left">
                               <p class="gate-type-span"><span><i class="iconfont icon-xuanzhong"></i>热销</span> <span></span></p>
                               <p class="gate-type-tips">订票须知</p>
                            </div>

                            <div class="gate-type-price flex-1">
                                <p class="gate-type-price-true">￥{{item.low_price}}</p>
                                <p class="gate-type-py">优惠{{item.special}}元</p>
                            </div>

                            <div class="gate-type-btn" @click="onBuy(item.id)">
                                <p class="gate-type-btn-up">立即</p>
                                <p class="gate-type-btn-down">预订</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="gate-con">
                <!-- <ul class="gate-con-ul clearfix" :class="searchBarFixed == true ? 'com-order-fixed' :''">
                    <li v-for="(item,index) in tabsList" @click="onAddClass(index)" :key="item.type" :class="{'active-li':index==typeNum}">{{item.name}}</li>
                </ul> -->

                <!-- 景点介绍 -->
                <div class="gate-con-about">
                    <div class="gate-con-about-title">
                        景区描述
                    </div>

                    <div class="gate-con-about-box" v-html="content">
                        
                    </div>

                    <div class="gate-con-about-title jt">
                        交通
                    </div>

                    <div style="color:#333333;">
                        乘坐公交到[中街]或者[故宫西华门站下车]
                    </div>
                </div>
            </div>

            <!-- 景点点评 -->
            <!-- <div class="gate-con-talk">
                <div class="gate-con-talk-title">
                    精彩点评(9)
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
                </div>
            </div> -->
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "gate",
  components: {
    XHeader
  },
  data() {
    return {
      imgIndex: 1,
      typeNum: 0,
      tabsList: [{ name: "景点介绍", type: 0 }, { name: "点评", type: 1 }],
      orderTop: 0,
      searchBarFixed: false,
      address:"",
      visit_time:"",
      name:"",
      content:"",
      level:"",
      pictures:[],
      ticket_1:[],    //  成人票
      ticket_2:[],    //  儿童票
      ticket_3:[],    //  老人票
      ticket_4:[],    
      ticket_5:[],   
      ticket_6:[],    
    };
  },
  methods: {
    //轮播图索引
    handleChange(index) {
      this.imgIndex = index + 1;
    },
    onAddClass(index) {
      this.typeNum = index;
    },
    handleScroll() {
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   console.log(scrollTop);
    //   console.log(this.orderTop);
    //   if (scrollTop > this.orderTop) {
    //     this.searchBarFixed = true;
    //   } else {
    //     this.searchBarFixed = false;
    //   }
    },
    getListDetail() {
      var qs = require('qs');
      this.$http
        .post("/api_ticket/get_tickets_one", qs.stringify({'scenic_id':this.id}))
        .then(res => {
          //console.log(res);
          this.address = res.data.address;
          this.visit_time = res.data.visit_time;
          this.techanDetail = res.data.row;
          this.name = res.data.name;
          this.content = res.data.content;
          this.lat = res.data.lat;
          this.lng = res.data.lng;
          let level = res.data.level;
          this.pictures = res.data.pictures;
          this.ticket_1 = res.data.ticket_1;
          this.ticket_2 = res.data.ticket_2;
          this.ticket_3 = res.data.ticket_3;
          this.ticket_4 = res.data.ticket_4;
          this.ticket_5 = res.data.ticket_5;
          this.ticket_6 = res.data.ticket_6;
          if(level == 1){
              this.level = "A";
          }else if(level == 2){
              this.level = "AA";
          }else if(level == 3){
              this.level = "AAA";
          }else if(level == 4){
              this.level = "AAAA";
          }else if(level == 5){
              this.level = "AAAAA";
          }
        //   this.imgLength = res.data.row.pic.length;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onBuy(id){
         this.$router.push({ name: "gate-order",params:{id:id} });
    },
    goAddress(){
        let item = {};
        item.address = this.address;
        item.visit_time = this.visit_time;
        item.lat = this.lat;
        item.lng = this.lng;
        this.$router.push({ name: "gate-map",params:{item:item}});
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getListDetail();
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
    // this.orderTop = document.querySelector(".gate-con-ul").offsetTop;
  },
  destroyed() {
    // window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/gate/gate";
</style>
