<template>
    <div class="team">
        <x-header :left-options="{backText: ''}">带团列表</x-header>

        <div class="team-loading" v-for="item in list" :key="item.id">
            <div class="team-list flex flex-align-center" @click="goDetail(item)">
                <div class="quan">
                    {{item.product_type}}
                </div>
                <div class="line">
                    <p class="odd-ellipsis line-name">{{item.title}}</p>
                    <p class="line-time">发团时间:{{item.go_date}}</p>
                </div>
                <div class="flex-1 status status-ing">
                    {{item.status}}
                </div>
            </div>

            <!-- <div class="map">
                
            </div> -->
        </div>

        <!-- <div class="team-loading">
            <div class="team-list flex flex-align-center" @click="goDetail()">
                <div class="quan">
                    观光车
                </div>
                <div class="line">
                    <p class="odd-ellipsis line-name">沈阳-莫斯科路线</p>
                    <p class="line-time">发团时间:2017-10-10</p>
                </div>
                <div class="flex-1 status status-end">
                    行程结束
                </div>
            </div>
        </div> -->

        <!-- <div class="team-loading">
            <div class="team-list flex flex-align-center">
                <div class="quan">
                    观光车
                </div>
                <div class="line">
                    <p class="odd-ellipsis line-name">沈阳-莫斯科路线沈阳-莫斯科路线沈阳-莫斯科路线沈阳-莫斯科路线沈阳-莫斯科路线</p>
                    <p class="line-time">发团时间:2017-10-10</p>
                </div>
                <div class="flex-1 status status-end">
                    行程结束
                </div>
            </div>
        </div> -->

        <!-- <div class="team-loading">
            <div class="team-list flex flex-align-center">
                <div class="quan">
                    观光车
                </div>
                <div class="line">
                    <p class="odd-ellipsis line-name">沈阳-莫斯科路线</p>
                    <p class="line-time">发团时间:2017-10-10</p>
                </div>
                <div class="flex-1 status status-end">
                    行程结束
                </div>
            </div>
        </div> -->

        <!-- <div class="team-loading">
            <div class="team-list flex flex-align-center">
                <div class="quan">
                    观光车
                </div>
                <div class="line">
                    <p class="odd-ellipsis line-name">沈阳-莫斯科路线</p>
                    <p class="line-time">发团时间:2017-10-10</p>
                </div>
                <div class="flex-1 status status-end">
                    行程结束
                </div>
            </div>
        </div> -->

    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "team",
  components: {
    XHeader
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    goDetail(item) {
      this.$router.push({ name: "teamListDetail", params: { id: item.product_id,time:item.go_date } });
    },
    // 列表
    getList() {
      this.$http
        .post("/api_user/group_list")
        .then(res => {
          this.list = res.data.list;
        //   console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/team/team";
</style>
