<template>
    <div class="out-travel" style="min-height:100%;">
        <x-header :left-options="{backText: ''}">出境游</x-header>
        <!-- 另一种共有样式 头部 -->
        <div class="com-line-box">
            <div class="com-line-box-ipt flex flex-align-center flex-pack-center">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" placeholder="请输入关键词搜索" v-model="searchIpt">
                <span @click="onSearch" v-show = "searchBtn">搜索</span>
            </div>
        </div>
        <!-- 线路公共样式条件筛选 -->
        <div class="com-order-box" :class="searchBarFixed == true ? 'com-order-fixed' :''">
            <ul class="clearfix">
                <li v-for="(item,index) in tabsList" :key="item.name" @click="onAddClass(index)" class="flex flex-align-center flex-pack-center " :class="{'com-order-active':index==orderNum}">
                    <div>{{item.name}}</div>
                    <div>
                        <i class="iconfont icon-xialajiantouxiangxia"></i>
                    </div>
                </li>
            </ul>
            <!-- 出发地 -->
            <div class="com-order-box-start" v-if = "sAddShow">
                <div style="padding:.1rem .15rem 0;">
                    <flexbox :gutter="0" wrap="wrap">
                        <flexbox-item :span="1/4" v-for="(item,index) in go_city" :key="item.name">
                            <div class="flex-demo odd-ellipsis" :class="{'city-active':index==go_city_Num}" @click="onGoCity(item,index)">{{item.name}}</div>
                        </flexbox-item>
                    </flexbox>
                </div>

                <div class="com-order-box-footer flex">
                    <div @click="onSAddress()">取消</div>
                    <div @click="onReset(1)">重置</div>
                    <div class="com-order-box-footer-btn flex-1" @click="onGetList()">确定</div>
                </div>
            </div>
            <!-- 目的地 -->
            <div class="com-order-box-start" v-if = "eAddShow">
                <div style="padding:.1rem .15rem 0;">
                    <flexbox :gutter="0" wrap="wrap">
                        <flexbox-item :span="1/4" v-for="(item,index) in dest_city" :key="item.name">
                            <div class="flex-demo odd-ellipsis" :class="{'city-active':index==dest_city_Num}" @click="onDestCity(item,index)">{{item.name}}</div>
                        </flexbox-item>
                    </flexbox>
                </div>

                <div class="com-order-box-footer flex">
                    <div @click="onSAddress()">取消</div>
                    <div @click="onReset(2)">重置</div>
                    <div class="com-order-box-footer-btn flex-1" @click="onGetList()">确定</div>
                </div>
            </div>
            <!-- 排序 -->
            <div class="com-order-box-start" v-if = "orderShow">
                <div class="com-order-box-start-order flex flex-align-center"  v-for="(item,index) in orderLists" :key="item.id" @click="onOrder(item,index)" :class="{'com-order-active':index==orderThreeNum}">
                    <div class="com-order-start-one">{{item.name}}</div>
                    <div class="com-order-start-gou" v-if = "index == orderThreeNum"><i class="iconfont icon-duihao"></i></div>
                </div>
            </div>
        </div>
        <load-more :tip="'正在加载'" v-if="loadTrue"></load-more>
        <div class="travel-box" v-infinite-scroll="getList"  infinite-scroll-disabled="loading"  infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
            <div class="travel-box-list flex" @click="goDetail(item)" v-for="item in lists" :key="item.id">
                <div class="travel-box-img">
                    <img :src="item.pic_url" alt="">
                </div>
                <div class="travel-box-con flex-1">
                    <p class="travel-box-title even-ellipsis">{{item.title}}</p>
                    <p class="travel-box-span odd-ellipsis" >
                        <span v-for="(list,index) in item.line_type" :key="list" v-if ="index<2">{{list}}</span>
                    </p>
                    <!-- <p class="travel-box-time odd-ellipsis">
                        发团日期：<span>09-1,</span><span>09-2,</span><span>09-3</span>
                    </p> -->
                    <div class="travel-box-info flex flex-pack-justify flex-align-center">
                        <p class="travel-box-info-city">{{item.city_name}}出发</p>
                        <p class="travel-box-info-price">
                            <span>
                                ￥{{item.min_price}}
                                <span class="qi">起</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mark" v-if="mark"  @touchmove.prevent></div>
        <div class = "noDate" v-if="noDate">
            暂无数据...
        </div>
    </div>
</template>

<script>
import { XHeader, Flexbox, FlexboxItem, Range, Group, Cell,LoadMore } from "vux";
export default {
  name: "out-travel",
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    Range,
    Group,
    Cell,
    LoadMore
  },
  data() {
    return {
      // 固定搜索 滚动 条件筛选样式
      tabsList: [
        {
          name: "出发地",
          num: 0
        },
        {
          name: "目的地",
          num: 1
        }
        // ,
        // {
        //   name: "排序",
        //   num: 2
        // }
      ],
      //排序
      orderLists: [
        { name: "不限", id: 0, type: 0 },
        { name: "近期销量最高", id: 1, type: 1 },
        { name: "价格由高到低", id: 2, type: 2 },
        { name: "价格由低到高", id: 3, type: 3 }
      ],
      loadTrue:true,
      searchIpt: "", // 搜索内容
      dest_city: [], // 目的地
      dest_city_Num:0,
      city:0,      // 出发地参数
      go_city: [],  // 出发地
      d_city:0,    // 目的地参数
      go_city_Num:0,
      noDate: false,
      orderNum: "5",
      searchBarFixed: false,
      orderTop: 0,
      mark: false, // 遮罩
      sAddShow: false, // 出发地模块
      eAddShow: false, // 目的地模块
      orderShow: false, // 排序模块
      orderThreeNum: 0, // 排序判断颜色
      choiceShow: false, // 筛选模块
      orderFourNum: 0, // 排序判断颜色
      dataMoney: 0, // range 初始值
      //   接口需要获取的值
      lists: [],
      page: 1,
      loading: false,
      searchBtn:false   // 搜索按钮隐藏
    };
  },
  methods: {
    onAddClass(i) {
      this.mark = true;
      this.orderNum = i;
      // 出发地
      if (i == 0) {
        this.sAddShow = true;
        this.eAddShow = false;
        this.orderShow = false;
        this.choiceShow = false;
      } else if (i == 1) {
        this.sAddShow = false;
        this.eAddShow = true;
        this.orderShow = false;
        this.choiceShow = false;
      } else if (i == 2) {
        this.sAddShow = false;
        this.eAddShow = false;
        this.orderShow = true;
        this.choiceShow = false;
      } else if (i == 3) {
        this.sAddShow = false;
        this.eAddShow = false;
        this.orderShow = false;
        this.choiceShow = true;
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > this.orderTop) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    },
    // 获取列表
    getList(type) {
      this.loading = true;
      var qs = require("qs");
      this.$http
        .post(
          "/api_line/line_list",
          qs.stringify({
            product_type: 3,
            page: this.page,
            title: this.searchIpt,
            city:this.city,
            d_city:this.d_city
          })
        )
        .then(res => {
          //console.log(res);
	  this.loadTrue = false;
          if (
            (res.data.list == "" || res.data.list.length < 1) &&
            type == "search"
          ) {
            this.noDate = true;
          } else {
            this.noDate = false;
          }
          this.lists = this.lists.concat([...res.data.list]);
          this.page++;
          this.loading = false;
          if (res.data.list.length < 1) {
            this.loading = true;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    // 获取条件列表
    getSearchList() {
      var qs = require("qs");
      this.$http
        .post("/api_line/get_line_marks")
        .then(res => {
          // console.log(res);
          this.dest_city = res.data.dest_city;
          this.go_city = res.data.go_city;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    // 搜索框搜索
    onSearch() {
      this.searchIpt = this.searchIpt.replace(/(^\s*)|(\s*$)/g, "");
      this.page = 1;
      this.lists = [];
      this.getList("search");
    },
    // 出发地选择
    onGoCity(item,index){
      this.go_city_Num = index;
      this.city = item.go_id;
    },
    // 目的地选择
    onDestCity(item,index){
      this.dest_city_Num = index;
      this.d_city = item.dest_id;
    },
    // 重置出发地目的地
    onReset(n){
        // 出发地
        if(n == 1){
          this.go_city_Num = 0;
          this.city = 0;
        }else{
          this.dest_city_Num = 0;
          this.d_city = 0;
        }
    },
    // 确认选择
    onGetList(){
      this.page = 1;
      this.lists = [];
      this.onSAddress();
      this.getList("search");
      this.noDate = false;
      this.loadTrue = true;
    },
    // 去详情
    goDetail(item) {
      this.$router.push({
        name: "TrainTravel-detail",
        params: { id: item.id }
      });
    },
    // 蒙层关闭
    onMark() {
      this.mark = false;
    },
    // 所有的关闭
    onSAddress() {
      this.sAddShow = false;
      this.eAddShow = false;
      this.choiceShow = false;
      this.onMark();
    },
    // 排序选择
    onOrder(item, index) {
      this.orderShow = false;
      this.orderThreeNum = index;
      this.onMark();
    },
    // 筛选滚动条
    onRangeChange(val) {
      this.dataMoney = val;
    }
  },
  created() {
    this.getList();
    this.getSearchList();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.orderTop = document.querySelector(".com-order-box").offsetTop;
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    searchIpt(newY,oldY){
      if(newY.length > 0){
        this.searchBtn = true
      }else{
         this.searchBtn = false
         console.log(123)
         this.page = 1
         this.getList()
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.flex-demo {
  text-align: center;
  color: #c2c2c2;
  background-color: #ffffff;
  border: 1px solid #c2c2c2;
  padding: 0.1rem 0;
  margin: 0.1rem auto 0.15rem;
  font-size: 0.34rem;
  border-radius: 0.05rem;
  background-clip: padding-box;
  width: 90%;
}
@import "../../common/css/travel/travel";
</style>












