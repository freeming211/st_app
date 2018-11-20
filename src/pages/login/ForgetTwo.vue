<template>
    <div class="login">
        <!-- <mt-header title="忘记密码">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header> -->
        <div class="login-bg">
            <img src="../../common/images/login.png" alt="">
        </div>

        <div class="login-title">
            国有企业&nbsp;&nbsp;&nbsp;&nbsp;放心选择
        </div>

        <div class="login-ipt flex">
            <div class="login-form-icon">
                <i class="iconfont icon-mima"></i>
            </div>
            <div class="login-form-info flex-1">
                <input type="password" placeholder="请输入密码">
            </div>
        </div>
        <div class="login-ipt flex">
            <div class="login-form-icon">
                <i class="iconfont icon-mima"></i>
            </div>
            <div class="login-form-info flex-1">
                <input type="password" placeholder="请输入密码">
            </div>
        </div>

        <div class="login-forget flex flex-pack-justify">

        </div>

        <div class="login-btn">
            完&nbsp;&nbsp;成
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
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
@import '../../common/css/login/login';
</style>
