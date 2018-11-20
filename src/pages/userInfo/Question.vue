<template>
    <div class="question">

        <x-header :left-options="{backText: ''}">问卷调查</x-header>
        
        <div class="question-list flex flex-align-center">
            <div class="question-list-img">
                <img src="../../common/images/setting-question.png" alt="">
            </div>
            <div class="question-list-con flex-1">
                <div class="question-list-con-top flex flex-align-center flex-pack-justify">
                    <div class="question-list-con-left">
                        问卷调查
                    </div>
                    <!-- 具体情况根据后台返回值 -->
                    <div class="question-list-con-right question-bg-grey">
                        已参加
                    </div>
                </div>
                <div class="question-list-con-bottom">
                    会员对于集团所有旅游产品满意度问卷调查
                </div>
            </div>
        </div>
        <div class="question-list flex flex-align-center">
            <div class="question-list-img">
                <img src="../../common/images/setting-server.png" alt="">
            </div>
            <div class="question-list-con flex-1">
                <div class="question-list-con-top flex flex-align-center flex-pack-justify">
                    <div class="question-list-con-left">
                        问卷调查
                    </div>
                    <!-- 具体情况根据后台返回值 -->
                    <div class="question-list-con-right question-bg-grey">
                        已参加
                    </div>
                </div>
                <div class="question-list-con-bottom">
                    会员对于集团所有旅游产品满意度问卷调查
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "question",
  components: {
    XHeader
  },
  data() {
    return {
      
    };
  },
  methods: {
   
  },
  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/center";
</style>
