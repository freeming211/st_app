<template>
    <div class="ticket">
        <x-header :left-options="{backText: ''}">票务预订</x-header>

        <load-more :tip="'正在加载'" v-if="loadTrue"></load-more>

        <div class="ticket-fixed">
           <Scroll :data = "lists" ref="scroll" class="ticket-content" :pullup = "true" @scrollToEnd = "_scrollEnd" @scroll="scroll" :listenScroll = "listenScroll" :probe-type="probeType">
               <div class="ticket-box">
                  <div class="ticket-list" v-for="item in lists" :key="item.id">
                      <div class="ticket-list-one flex flex-pack-justify">
                          <div class="ticket-list-name">
                              {{item.name}}
                          </div>
                      </div>

                      <div class="ticket-list-tel">
                        <i class="iconfont icon-dianhua1"></i>
                        {{item.phone}}
                      </div>

                      <div class="ticket-list-time">
                          营业时间：{{item.business_time}}
                      </div>

                      <div class="ticket-list-address">
                          <i class="iconfont icon-dingwei1"></i>
                          {{item.address}}
                      </div>
                  </div>
              </div>
           </Scroll>
        </div>
    </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll";
import { XHeader,LoadMore } from "vux";
export default {
  name: "ticket",
  components: {
    XHeader,
    LoadMore,
    Scroll
  },
  data() {
    return {
      lists: [],
      page: 1,
      loading: false,
      loadTrue:true,
      listenScroll:true,
      probeType:3,
      scrollY:0
    };
  },
  methods: {
    getList() {
      if(this.loading){
        return
      }
      var qs = require("qs");
      this.$http
        .post("/api_public/piaowu_list", qs.stringify({ page: this.page }))
        .then(res => {
          this.loadTrue = false
          this.lists = this.lists.concat([...res.data.list]);
          this.page++;
          if (res.data.list.length < 1) {
            this.loading = true;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    _scrollEnd(){
      this.getList()
    },
    scroll(pos){
      this.scrollY = pos.y
    }
  },
  watch: {
    // scrollY(newY){
    //   console.log(newY)
    // }
  },
  created() {
    this.getList();
  },
  activated() {
    // this.$refs.scroll.refresh()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ticket-fixed{
  position: fixed;
  top:.95rem;
  bottom: 0;
  width: 100%;
  .ticket-content{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
  }
}
.ticket-box {
  .ticket-list {
    background: #ffffff;
    margin: 0 0 .3rem;
    border-radius: 0.1rem;
    padding: 0.25rem 0.15rem 0.23rem 0.2rem;
    border-top: 0.05rem dashed #f3b712;
    .ticket-list-one {
      .ticket-list-name {
        font-size: 0.34rem;
        width: 4.45rem;
      }
    }
    .ticket-list-tel {
      width: 100%;
      text-align: left;
      margin-top: 0.1rem;
      font-size: 0.3rem;
      i {
        color: #e8bf42;
      }
    }
    .ticket-list-time {
      padding: 0.15rem 0 0.15rem;
      font-size: 0.32rem;
      color: #999999;
      border-bottom: 1px solid #e5e5e5;
    }
    .ticket-list-address {
      color: #666666;
      font-size: 0.34rem;
      margin: 0.15rem 0;
      i {
        color: #36439f;
      }
    }
  }
}
</style>
