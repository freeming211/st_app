<template>
  <div class="strategy">

    <x-header :left-options="{backText: ''}">行程攻略</x-header>
    <div class="scroll-div" v-show = "lists.length>0">
      <Scroll class="scroll-fixed" :data="lists" v-on:pulldown="_pulldown" :pulldown="true" :pullup="true" v-on:scrollToEnd="_getNews" ref="scroll">
        <div>
          <div class="home-gonglve">
            <div class="home-gonglve-item flex flex-align-center" @click="goDetail(item)" v-for="item in lists" :key="item.id">
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
                </p>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>

    <load-more :tip="'正在加载'" v-show="loadMore"></load-more>

    <div class="top" v-show="topHide" @click="onGoTop">
      <img src="../../common/images/top.png" alt="">
    </div>

    <myFooter></myFooter>
  </div>
</template>

<script>
import { LoadMore,XHeader } from "vux";
import Scroll from "@/base/scroll/scroll";
export default {
  name: "strategy",
  components: {
    LoadMore,
    Scroll,
    XHeader
  },
  data() {
    return {
      typelists: [
        { id: "0", name: "全部" },
        { id: "1", name: "专列" },
        { id: "2", name: "专线" },
        { id: "3", name: "出境游" },
        { id: "4", name: "观光车" }
      ],
      num: 0,
      topHide: false,
      lists: [],
      page: 1,
      loading: false,
      loadMore: true,
      searchIpt: "",
      searchBtn: false
    };
  },
  methods: {
    onToggle(obj, index) {
      this.num = index;
    },
    goDetail(item) {
      this.$router.push({ name: "strategy-detail", params: { id: item.id } });
    },
    onGoTop() {
      // 手机端支持第一个
      document.body.scrollTop = 0;
      //document.documentElement.scrollTop = 0
    },
    // 上拉刷新
    _pulldown() {
      this.getList();
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 80) {
        this.topHide = true;
      } else {
        this.topHide = false;
      }
    },
    _getNews() {
      this.getList();
    },
    // 获取列表
    getList(type) {
      if (this.loading) {
        return;
      }
      var qs = require("qs");
      this.$http
        .post("/api_public/trips_list", qs.stringify({ page: this.page }))
        .then(res => {
          if (
            (res.data.list == "" || res.data.list.length < 1) &&
            type == "search"
          ) {
          } else {
          }
          this.searchIpt = "";
          this.loadMore = false;
          this.lists = this.lists.concat([...res.data.list]);
          this.page++;
          if (res.data.list.length < 1 || res.data.list.length < 10) {
            this.loading = true;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onSearch() {
      this.getList();
    }
  },
  watch: {
    searchIpt(newV, oldV) {
      if (newV.length > 0) {
        this.searchBtn = true;
      } else {
        this.searchBtn = false;
      }
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/strategy/strategy";
</style>
