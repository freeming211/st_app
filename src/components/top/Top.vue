<template>
    <div class="goTop">
        <div class="top" v-if="topHide"  @click="onGoTop">
            <img src="../../common/images/top.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'goTop',
    data() {
        return {

        }
    },
    props: {
        topHide: Boolean   //通过父组件的值来改变消失和显示
    },
    methods: {
        onGoTop(){
            this.$emit('onGoTop');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goTop {
    .top {
        width: 1rem;
        position: fixed;
        right: .2rem;
        bottom: 1.5rem;
        z-index: 98;
        img {
            width: 100%;
        }
    }
}
</style>
