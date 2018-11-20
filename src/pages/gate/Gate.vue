<template>
    <div class="gate">
        <x-header :left-options="{backText: ''}">景区门票</x-header>
        <!-- 另一种共有样式 头部 -->
        <!-- <div class="com-line-box">
            <div class="com-line-box-ipt flex flex-align-center flex-pack-center">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" placeholder="请输入关键词搜索">
            </div>
        </div> -->
        <load-more :tip="'正在加载'" v-if="loadTrue"></load-more>
        <div class="gate-box">
           <!-- <ul>
               <li>
                   <div>排序</div>
                   <i></i>
               </li>
           </ul> -->

           <div class="gate-list" v-infinite-scroll="getList"  infinite-scroll-disabled="loading"  infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
                <div class="gate-item flex" @click="goDetail(item)" v-for="item in lists" :key="item.id" >
                    <div class="gate-item-img">
                        <img :src="item.file_url" alt="">
                    </div>
                    <div class="gate-item-con flex-1">
                       <p class="gate-item-con-title even-ellipsis">{{item.name}}</p>
                       <!-- <p class="gate-item-con-time">开放时间: {{item.visit_time}}</p> -->
                       <span class="gate-item-span">{{item.cat_name}}</span>
                       <p class="gate-item-price" v-if ="item.low_price != null"><span>￥{{item.low_price}}</span>起</p>
                       <p class="gate-item-price" v-else><span style="color:#a0a0a0;">暂无报价</span></p>
                    </div>
                </div>
           </div>
             
        </div>

    </div>
</template>

<script>
import { XHeader,LoadMore } from "vux";
export default {
  name: "gate",
  components: {
    XHeader,
    LoadMore
  },
  data() {
    return {
      lists: [],
      page: 1,
      loading: false,
      loadTrue:true
    };
  },
  methods: {
    getList(type) {
      this.loading = true;
      var qs = require("qs");
      this.$http
        .post(
          "/api_ticket/get_tickets_list",
          qs.stringify({ page: this.page,pagesize:10})
        )
        .then(res => {
          //  console.log(res);
          this.loadTrue = false;
          if (
            (res.data == "" || res.data.length < 1) &&
            type == "search"
          ) {
            this.noDate = true;
          } else {
            this.noDate = false;
          }
          this.lists = this.lists.concat([...res.data]);
          this.page++;
          this.loading = false;
          if (res.data.length < 1) {
            this.loading = true;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    goDetail(item) {
      this.$router.push({ name: "gate-detail" ,params: { id: item.id }});
    }
  },
  created() {
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/gate/gate";
</style>
