<template>
    <div class="footer flex flex-align-center">
        <router-link to="/" :class="$route.path.indexOf('/home') !== -1? 'activeFooter' : ''">
            <i class="iconfont icon-icon-test"></i>
            <p>首页</p>
        </router-link>

        <router-link to="/strategy" :class="$route.path.indexOf('/strategy') !== -1? 'activeFooter' : ''">
            <i class="iconfont icon-fuligonglve"></i>
            <p>攻略</p>
        </router-link>

        <router-link to="/service" :class="$route.path.indexOf('/service') !== -1? 'activeFooter' : ''">
            <i class="iconfont icon-guanjiaowangtubiao11"></i>
            <p>客服</p>
        </router-link>

        <router-link to="/center" :class="$route.path.indexOf('/center') !== -1? 'activeFooter' : ''">
            <i class="iconfont icon-wode"></i>
            <p>我的</p>
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.footer {
    width: 100%;
    height: 1.2rem; // background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: white;
    a {
        text-align: center;
        color: #999997;
        width: 25%;
        i{
            font-size: .55rem;
        }
        p {
            font-size: .36rem;
            // font-weight: 600;
        }
    }
    .activeFooter{
        color:#2F3A8A;
    }
}
</style>
