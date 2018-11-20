<template>
    <div class="share">
        <!-- <mt-header title="我的分享">
            <router-link to="/center" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <x-header :left-options="{backText: ''}">我的分享</x-header>

        <div class="share-list">
            <div class="share-list-top flex flex-pack-justify flex-align-center">
                <div class="share-icon">
                    <i class="iconfont icon-fenxiang2"></i>已分享
                </div>
                <div class="share-time">
                    2017-07-28
                </div>
            </div>

            <div class="share-list-bottom flex flex-align-top">
                <div class="share-img">
                    <img src="../../common/images/share01.png" alt="">
                </div>
                <div class="share-text flex-1">
                    “张氏帅府博物馆”原“张学良旧居陈列馆”，座落在全国重点文物保护单位张学良旧居内
                </div>
            </div>
        </div>
        <div class="share-list">
            <div class="share-list-top flex flex-pack-justify flex-align-center">
                <div class="share-icon">
                    <i class="iconfont icon-fenxiang2"></i>已分享
                </div>
                <div class="share-time">
                    2017-07-28
                </div>
            </div>

            <div class="share-list-bottom flex flex-align-top">
                <div class="share-img">
                    <img src="../../common/images/share02.png" alt="">
                </div>
                <div class="share-text flex-1">
                    沈阳植物园，位于沈阳市东陵区高坎镇中马村，被命名为“辽宁省五十大佳景”
                </div>
            </div>
        </div>
        <div class="share-list">
            <div class="share-list-top flex flex-pack-justify flex-align-center">
                <div class="share-icon">
                    <i class="iconfont icon-fenxiang2"></i>已分享
                </div>
                <div class="share-time">
                    2017-07-28
                </div>
            </div>

            <div class="share-list-bottom flex flex-align-top">
                <div class="share-img">
                    <img src="../../common/images/share04.png" alt="">
                </div>
                <div class="share-text flex-1">
                    “张氏帅府博物馆”原“张学良旧居陈列馆”，座落在全国重点文物保护单位张学良旧居内
                </div>
            </div>
        </div>
        <div class="share-list">
            <div class="share-list-top flex flex-pack-justify flex-align-center">
                <div class="share-icon">
                    <i class="iconfont icon-fenxiang2"></i>已分享
                </div>
                <div class="share-time">
                    2017-07-28
                </div>
            </div>

            <div class="share-list-bottom flex flex-align-top">
                <div class="share-img">
                    <img src="../../common/images/share03.png" alt="">
                </div>
                <div class="share-text flex-1">
                    “张氏帅府博物馆”原“张学良旧居陈列馆”，座落在全国重点文物保护单位张学良旧居内
                </div>
            </div>
        </div>
        <div class="share-list">
            <div class="share-list-top flex flex-pack-justify flex-align-center">
                <div class="share-icon">
                    <i class="iconfont icon-fenxiang2"></i>已分享
                </div>
                <div class="share-time">
                    2017-07-28
                </div>
            </div>

            <div class="share-list-bottom flex flex-align-top">
                <div class="share-img">
                    <img src="../../common/images/share03.png" alt="">
                </div>
                <div class="share-text flex-1">
                    “张氏帅府博物馆”原“张学良旧居陈列馆”，座落在全国重点文物保护单位张学良旧居内
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {XHeader} from "vux";
export default {
  name: "share",
  components: {
      XHeader
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
