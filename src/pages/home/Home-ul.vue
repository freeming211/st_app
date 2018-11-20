<template>
    <div>
        <!--作为悬停时候使用 -->
        <ul class="home-ul clearfix" v-if="headerHide">
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
                <router-link to="/strategy">
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
    </div>
</template>

<script>
export default {
  props: {
    headerHide: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/css/home/home";
</style>
