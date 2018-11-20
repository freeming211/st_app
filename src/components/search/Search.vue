<template>
  <div class="search" style="background:#ffffff;overflow:hidden;">
    <div class="search-box flex flex-align-center">
      <div class="search-ipt flex flex-align-center">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="请输入关键词搜索">
      </div>
      <router-link to="/home" class="search-a">
        取消
      </router-link>
    </div>

    <div class="search-detail">
      <div class="search-detail-title">
        热门搜索
      </div>
      <div class="search-detail-sapn">
          <ul class="clearfix">
             <li>
               <span>精选推荐</span>
             </li>
             <li>
               <span>古镇乡村</span>
             </li>
             <li>
               <span>专题景观</span>
             </li>
             <li>
               <span>主题乐园</span>
             </li>
             <li>
               <span>人文景观</span>
             </li>
             <li>
               <span>自然景观</span>
             </li>
             <li>
               <span>节日活动</span>
             </li>
             <li>
               <span>其他</span>
             </li>
             
          </ul>
      </div>
    </div>
    <div class="search-detail">
      <div class="search-detail-title">
        线路类型
      </div>
      <div class="search-detail-sapn">
          <ul class="clearfix">
             <li>
               <span>旅游专线</span>
             </li>
             <li>
               <span>旅游专线</span>
             </li>
             <li>
               <span>观光车</span>
             </li>
             <li>
               <span>出境游</span>
             </li>
             <li>
               <span>景点门票</span>
             </li>
             <li>
               <span>其他</span>
             </li>
             
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
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
.search-box {
  padding: .15rem .2rem .18rem;
  box-shadow:0px 5px 5px #ddd;
  padding-bottom:3px;
  background:white;
  position: relative;
  z-index: 2;
  .search-ipt {
    padding: .1rem 0;
    border: 1px solid #bfbfbf;
    width: 5.8rem;
    i {
      font-size: .6rem;
      height: .6rem;
      line-height: .5rem;
      color: #989898;
      display: inline-block;
      width: .75rem;
      text-align: center;
    }
    input {
      border: none;
      outline: none;
      font-size: .34rem;
      width: 4rem;
      height: .6rem;
      line-height: .6rem;
    }
  }
  .search-a {
    text-align: center;
    color: #3a418c;
    font-size: .32rem;
    width: 1.5rem;
  }
}

.search-detail{
  background: #ffffff;
  .search-detail-title{
    padding: .15rem 0 .18rem .1rem;
    margin:.23rem .1rem 0 .1rem; 
    background: #ffffff;
    box-sizing: border-box;
    border-bottom: 1px solid #b2b2b2;
    font-size: .34rem;
    color: #333333;
  }
  .search-detail-sapn{
    ul{
      width: 98%;
      margin: 0 auto;
      li{
        width: 33%;
        float: left;
        text-align: center;
        span{
          display: block;
          padding: .08rem 0;
          width: 80%;
          margin: .2rem auto;
          border: 1px solid #999999;
          color: #999999;
          font-size: .32rem;
        }
      }
    }
  }
}
</style>
