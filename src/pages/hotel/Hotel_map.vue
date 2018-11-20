<template>
    <div class="hotel-detail">
        <x-header :left-options="{backText: ''}">酒店地图</x-header>
        <div id="hotelMap">	
	</div>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "hotel-detail",
  components: {
    XHeader
  },
  data() {
    return {
      item: ""
    };
  },
  methods: {},
  mounted() {
    this.item = JSON.parse(this.$route.params.item);
    let longitude = this.item.longitude;
    longitude = longitude.split(' ');
    this.$nextTick(() => {
      // 百度地图API功能
      var map = new BMap.Map("hotelMap");
      var poi = new BMap.Point(longitude[0],longitude[1]);
      map.centerAndZoom(poi, 16);
      map.enableScrollWheelZoom();

      var content =
        '<div style="margin:0;line-height:20px;padding:2px;">' +
        "地址：" +
        this.item.address +
        "<br/>电话："+this.item.tel+"<br/>" +
        "</div>";

      //创建检索信息窗口对象
      var searchInfoWindow = null;
      searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        title: this.item.name, //标题
        width: 290, //宽度
        height: 65, //高度
        panel: "panel", //检索结果面板
        enableAutoPan: true, //自动平移
        enableSendToPhone: false,
        searchTypes: [
          BMAPLIB_TAB_TO_HERE, //到这里去
          BMAPLIB_TAB_FROM_HERE //从这里出发
        ]
      });
      var marker = new BMap.Marker(poi); //创建marker对象
      marker.addEventListener("click", function(e) {
        searchInfoWindow.open(marker);
      });
      searchInfoWindow.open(marker);
      map.addOverlay(marker); //在地图中添加marker
    });
  },
  created() {
    // this.item = JSON.parse(this.$route.params.item);
    // console.log(this.item);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#hotelMap {
  width: 100%;
  height: 100vh;
}
#BMapLib_sendToPhone0 {
  display: none !important;
}
@import "../../common/css/hotel/hotel";
</style>
