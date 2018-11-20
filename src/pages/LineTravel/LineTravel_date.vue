<template>
    <div class="hello">

       <x-header :left-options="{backText: ''}">团期和人数</x-header>
        
        <!-- 年份 月份 -->
        <div class="month">
            <ul>
                <!--点击会触发pickpre函数，重新刷新当前日期  -->
                <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                    <span class="choose-year">{{ currentYear }}</span>
                    <span class="choose-month">{{ currentMonth }}月</span>
                </li>
                <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li style="color:red">六</li>
            <li style="color:red">日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
            <li v-for="(dayobject,index) in days" :key="index" @click="onDay(dayobject)" :class="{'choose-active':dayobject.color}" :style="{background:( dayOne== dayobject.trueDay)?'rgb(217, 244, 251)':''}">
                <!--本月-->
                <!--如果不是本月  改变类名加灰色-->

                <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                <!--如果是本月  还需要判断是不是这一天-->
                <span v-else-if="new Date(dayobject.trueDay).getTime() < new Date(today).getTime()" class="other-month">
                    {{ dayobject.day.getDate() }}
                </span>
                <span v-else :class="{'other-month':dayobject.lowPrice ==null}">
                    <!--今天  同年同月同日-->
                    <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                    <span v-else>{{ dayobject.day.getDate() }}</span>
                </span>
                <p class="price" v-if = "dayobject.lowPrice != null">
                  ￥{{dayobject.lowPrice}}
                </p>
            </li>
        </ul>

        <div class="person-num">
            <div class="p-li flex flex-align-center flex-pack-justify" v-for="item in personList" :key="item.id">
              <div class="age">
                {{item.name}}
              </div>
              <div class="plus-right flex flex-align-center flex-pack-justify">
                  <div class="icon" @click="onReduce(item)">
                    <i class="iconfont icon-jian1"></i>
                  </div>
                  <div class="num">
                    {{item.num}}
                  </div>
                    
                  <div class="icon" @click="onPlus(item)">
                    <i class="iconfont icon-jia1"></i>
                  </div>
              </div>
            </div>

            <div class="next" @click="onNext">
                继续确认行程
            </div>
        </div>
    </div>
</template>

<script>
import { XHeader } from "vux";
import { Toast } from "mint-ui";
export default {
  name: "HelloWorld",
  components: {
    XHeader
  },
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [], //单元格中数组组合
      dayArry: [], //选中日期数组
      dayOne: "", //选中日期
      today: "", //当前日期
      personList: [
        // 人数列表
        { name: "70岁以上", id: 0, num: 0 },
        { name: "65-69岁", id: 1, num: 0 },
        { name: "60-64岁", id: 2, num: 0 },
        { name: "60岁以下", id: 3, num: 0 },
        { name: "儿童", id: 4, num: 0 },
        { name: "儿童(不占铺)", id: 5, num: 0 }
      ],
      lineId: "",
      schedule: [] // 团期
    };
  },
  created() {
    // this.initData(null);
    // 计算今天时间
    let now = new Date();
    let nowDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    this.today = nowDate;
    this.lineId = sessionStorage.getItem("lineId");
    this.getDetail();
  },
  methods: {
    onReduce(item) {
      if (item.num == 0) {
        item.num = 0;
      } else {
        item.num--;
      }
    },
    onPlus(item) {
      item.num++;
    },
    onNext() {
      if (this.dayOne == "") {
        Toast({ message: "请选择出团时间", duration: 1000 });
        return;
      }
      let time = [];
      let sum = 0;
      for (let i = 0; i < this.personList.length; i++) {
        console.log(this.personList[i].num);
        sum += this.personList[i].num;
      }
      if (sum == 0) {
        Toast({ message: "请添加出团人员", duration: 1000 });
        return;
      }

      if (sum > 10) {
        Toast({ message: "人数不得超过10人", duration: 1000 });
        return;
      }
      for (let i = 0; i < this.personList.length; i++) {
        time.push(this.personList[i].num);
      }
      time = time.join(",");

      this.$router.push({ name: "LineTravelOrder"});

      sessionStorage.setItem("date", this.dayOne);
      sessionStorage.setItem("person_num", time);
      sessionStorage.removeItem("userList");
    },
    // 获取费用价格
    getDetail() {
      var qs = require("qs");
      this.$http
        .post(
          "/api_order/get_zl_product_schedule_price",
          qs.stringify({ product_id: this.lineId })
        )
        .then(res => {
            // console.log(res);
          if (res.data.code == 200) {
            this.schedule = res.data.data.schedule;
            this.lowPrice = res.data.data.low_price;
            var now = new Date();
            this.initData(this.formatDate(now.getFullYear(), now.getMonth()+1, 1));
          } else {
            Toast({ message: "团期获取失败", duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onDay(item) {
      //选中时间
      let str = this.formatDate(
        item.day.getFullYear(),
        item.day.getMonth() + 1,
        item.day.getDate()
      );
      if (item.lowPrice == null) {
        return;
      }

      for (let i = 0; i < this.days.length; i++) {
        this.days[i].color = false;
      }
      this.dayOne = str;
      console.log(this.dayOne);
    },
    initData(cur) {
      var leftcount = 0; //存放剩余数量
      var date;
      if (cur) {
        date = new Date(cur);
      } else {
        var now = new Date();
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
        d.setDate(35);
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      //初始化本周
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d;
        let filtersDay = this.formatDate(
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        );
        dayobject.trueDay = filtersDay;
        this.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
      }
      //其他周
      for (var i = 1; i <= 35 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject = {};
        dayobject.day = d;
        let filtersDay = this.formatDate(
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        );
        dayobject.trueDay = filtersDay;
        this.days.push(dayobject);
      }

      for (let i = 0; i < this.days.length; i++) {
        for (let k = 0; k < this.schedule.length; k++) {
          if (this.days[i].trueDay == this.schedule[k]) {
            this.days[i].lowPrice = this.lowPrice;
          }
        }
      }
    },
    pickPre(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickYear: function(year, month) {
      alert(year + "," + month);
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../common/css/date/date";
</style>
