<template>
    <div class="hotel">
        <x-header :left-options="{backText: ''}">宾馆住宿</x-header>

        <load-more :tip="'正在加载'" v-if="loadTrue"></load-more>

        <div class="hotel-box" v-infinite-scroll="getList"  infinite-scroll-disabled="loading"  infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
            <div class="hotel-box-item flex flex-align-center" @click="goDetail(item)" v-for="item in lists" :key="item.id">
                <div class="hotel-box-img">
                    <img :src="item.thumb" alt="">
                </div>
                <div class="hotel-box-con flex-1">
                    <div class="hotel-box-con-name even-ellipsis">
                        {{item.name}}
                    </div>
                    <div class="hotel-box-con-span">
                        <span>{{item.hotel_type}}</span>
                    </div>
                    <div class="hotel-box-con-adress odd-ellipsis">
                        {{item.address}}
                    </div>
                    <div class="hotel-box-con-price">
                        ￥{{item.low_price}} <span class="qi">起</span>
                    </div>
                </div>
            </div>
        </div>

        <div class = "noDate" v-if="noDate">
            暂无数据...
        </div>
    </div>
</template>

<script>
import { XHeader,LoadMore } from "vux";
export default {
  name: "hotel",
  components: {
    XHeader,
    LoadMore
  },
  data() {
    return {
      searchIpt: "",
      lists: [],
      page: 1,
      loading: false,
      showPop: false,
      noDate:false,
      loadTrue:true
    };
  },
  methods: {
    getList(type) {
      this.loading = true;
      var qs = require("qs");
      this.$http
        .post(
          "/api_public/hotel_list",
          qs.stringify({ page: this.page, title: this.searchIpt })
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
    goDetail(item) {
      this.$router.push({ name: "hotel-detail",params: { id: item.id }});
    },
    // 搜索
     onSearch() {
      this.searchIpt = this.searchIpt.replace(/(^\s*)|(\s*$)/g, "");
      this.page = 1;
      this.lists = [];
      this.getList("search");
    },
  },
  created() {
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/hotel/hotel";
</style>
