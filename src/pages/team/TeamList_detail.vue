<template>
    <div class="team">
        <x-header :left-options="{backText: ''}">带团详情</x-header>

        <div class="p-box">
            <div class="line flex flex-pack-justify">
                <div class="line-name">
                    {{product_info.title}}({{product_info.sub_title}})
                </div>
                <div class="line-status">
                    {{group_status}}
                </div>
            </div>

            <div class="line flex flex-pack-justify">
                <div>
                    {{go_date}}发团
                </div>
                <div v-if = "group_status != '已结束'">
                    当前行程:D{{now_day}}
                </div>
            </div>
        </div>
        <div id="map">
        </div>

        <div class="pos-icon" v-if = "group_status != '已结束'">
             <i class="iconfont icon-msnui-foresight pos" @click="_getAddress"></i>
             <span @click="_getAddress">{{posText}}</span>
        </div>
     

        <div class="p-box">
           <div class="leader flex flex-align-center"  v-if="guide != ''">
               <div class="leader-img odd-ellipsis">
                   {{guide.name}}
               </div>
               <div class="leader-name" @click="onTel(guide.tel)">
                    <p class="leader-tel">{{guide.tel}}<span>导游</span></p>
               </div>
           </div>

           <div class="leader flex flex-align-center" v-if="leader != ''">
               <div class="leader-img odd-ellipsis">
                   {{leader.name}}
               </div>
               <div class="leader-name" @click="onTel(leader.tel)">
                   <p class="leader-tel">{{leader.tel}}<span>领队</span></p>
               </div>
           </div>
        </div>

        <div class="p-box">
           <div class="spc-name flex flex-pack-justify flex-align-center">
               <div class="spc-com">
                   特殊情况记录
               </div>
               <!-- <div class="spc-add">
                   新增
               </div> -->
           </div>
           <div class="spc-list" v-for = "item in situation" :key="item.id">
               <div class="spc-list-address">
                   <i class="iconfont icon-dingwei1"></i>{{item.province}}{{item.city}}
               </div>

                <div class="spc-list-com">
                    {{item.content}}
                </div>

                <div class="spc-list-time">
                    {{item.create_time}}
                </div>

                <div class ="img-large">
                  <!-- @click="show(index)" -->
                  <img class="previewer-demo-img" v-for="(one, index) in item.releated_pic" :key="index" :src="one">
                  <!-- <div v-transfer-dom>
                    <previewer :list="item.pic" ref="previewer" :options="options"></previewer>
                  </div> -->
              </div>
           </div>
        </div>
        <div class="p-box" v-if = "group_status != '已结束'" style="padding-bottom:10px;">
           <div class="spc-name flex flex-pack-justify flex-align-center">
               <div class="spc-com">
                   新增特殊情况
               </div>
               <div class="spc-del" @click="onClearLog">
                   <i class="iconfont icon-shanchu"></i>
               </div>
           </div>

           <!-- <div class="spc-gprs">
               <span><i class="iconfont icon-msnui-foresight"></i>获得当前位置</span>
           </div> -->

           <textarea name="" id="" cols="30" rows="10" placeholder="请填写特殊情况说明" v-model="content"></textarea>

           <ul class="photos-ul clearfix">
             <li v-for = "(item,index) in imgList" :key="index">
               <img :src='item' alt="" >
               <i class="iconfont icon-jian1" @click="onReomvePic(index)"></i>
             </li>
             <li>
               <img class="addPhoto" src="../../common/images/addPhoto.png" alt="" @click="onChosePhoto">
             </li>
           </ul>

           <div class="spc-btn" @click="onSubmit">
               提交
           </div>
        </div>

        <!-- 照片上传使用 -->
        <actionsheet v-model="show2" :menus="menus2" @on-click-menu="photoClick" show-cancel></actionsheet>

    </div>
</template>

<script>
import {
  XHeader,
  Actionsheet,
  TransferDomDirective as TransferDom,
  Previewer
} from "vux";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "team",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    Previewer
  },
  data() {
    return {
      posText: "发送定位",
      go_date: "",
      guide: "",
      leader: "",
      situation: [],
      now_day: "",
      product_info: "",
      content: "",
      group_status: "",
      imgList: [],
      // 照片开始
      menus2: {
        menu1: "拍照",
        menu2: "从图库中选择"
      },
      show2: false,
      list: [
        {
          src: "https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg"
        },
        {
          src: "https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg"
        },
        {
          src: "https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg"
        }
      ],
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect();
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    };
  },
  methods: {
    _getAddress() {
      var map = new BMap.Map("map");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 14);
      var geolocation = new BMap.Geolocation();
      // 开启SDK辅助定位
      geolocation.enableSDKLocation();
      Indicator.open({
        text: "定位中...",
        spinnerType: "fading-circle"
      });
      var _this = this;
      geolocation.getCurrentPosition(function(r) {
        console.log(r);
        if (r.point.lat == 0) {
          Toast({ message: "定位失败", duration: 1500 });
          Indicator.close();
          return;
        }
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          Indicator.close();
          Toast({
            message: "当前位置:" + r.address.province + r.address.city,
            duration: 2500
          });
          _this.posText = "重新发送";
          //   map.addOverlay(mk);
          //   map.panTo(r.point);
          //   预留接口
          _this.uploadPos(r);
        } else {
          Toast({ message: "定位失败", duration: 1000 });
          Indicator.close();
        }
      });
    },
    getDetail() {
      var qs = require("qs");
      this.$http
        .post(
          "/api_user/group_row",
          qs.stringify({ product_id: this.product_id, go_date: this.go_date })
        )
        .then(res => {
          this.guide = res.data.guide;
          this.leader = res.data.leader;
          this.situation = res.data.situation;
          for(let i = 0;i<this.situation.length;i++){
            this.situation[i].picImg = [];
            for(let j = 0;j<this.situation[i].releated_pic.length;j++){
              let o = {};
              o.src = this.situation[i].releated_pic[j];
              this.situation[i].picImg.push(o);
            }
          }
          this.now_day = res.data.now_day;
          this.product_info = res.data.product_info;
          this.group_status = res.data.group_status;
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    uploadPos(r) {
      let province = r.address.province;
      let city = r.address.city;
      console.log(province + "," + city);
      var qs = require("qs");
      this.$http
        .post(
          "/api_user/upload_position",
          qs.stringify({
            product_id: this.product_id,
            go_date: this.go_date,
            lat: r.point.lat,
            lng: r.point.lng,
            province: province,
            city: city
          })
        )
        .then(res => {
          console.log(res);
          if ((res.data.status = 1)) {
            // Toast({ message: "上传成功", duration: 1000 });
          } else {
            Toast({ message: res.data.msg, duration: 1000 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onSubmit() {
      if (this.content == "") {
        Toast({ message: "特殊原因不得为空", duration: 1000 });
        return;
      }

      var map = new BMap.Map("map");
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 14);
      var geolocation = new BMap.Geolocation();
      // 开启SDK辅助定位
      geolocation.enableSDKLocation();
      Indicator.open({
        text: "发送中...",
        spinnerType: "fading-circle"
      });
      var _this = this;
      geolocation.getCurrentPosition(function(r) {
        console.log(r);
        if (r.point.lat == 0) {
          Toast({ message: "发送失败", duration: 1500 });
          Indicator.close();
          return;
        }
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          Indicator.close();
          //   map.addOverlay(mk);
          //   map.panTo(r.point);
          //   预留接口
          var qs = require("qs");
          _this.$http
            .post(
              "/api_user/log_situation",
              qs.stringify({
                product_id: _this.product_id,
                go_date: _this.go_date,
                province: r.address.province,
                city: r.address.city,
                content: _this.content,
                pic: _this.imgList
                // pic: [
                //   "http://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg",
                //   "http://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg"
                // ]
              })
            )
            .then(res => {
              console.log(res);
              if (res.data.status == 1) {
                _this.getDetail();
                _this.content = "";
                _this.imgList = [];
                Toast({ message: "上传成功", duration: 1500 });
              } else {
                Toast({ message: "上传失败", duration: 1500 });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          Toast({ message: "发送失败", duration: 1000 });
          Indicator.close();
        }
      });
    },
    onClearLog() {
      this.content = "";
    },
    onTel(tel) {
      window.location.href = "tel://" + tel;
    },
    onChosePhoto() {
      this.show2 = true;
    },
    // 添加照片
    photoClick(key) {
      if (key == "menu1") {
        console.log("相机");
        this.cameraTakePicture();
      } else if (key == "menu2") {
        this.pickImage();
        console.log("图库");
      }
    },
    // 相机
    cameraTakePicture() {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 80,
        targetHeight: 80
      });

      var _this = this;

      function onSuccess(imageData) {
        let imageDataSrc = "data:image/jpeg;base64," + imageData;
        console.log(imageDataSrc);
        var qs = require("qs");
        _this.$http
          .post(
            "http://sy.66diqiu.com/admin/upload/app_upload_thumb",
            qs.stringify({
              file: imageDataSrc
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.status == 1) {
              _this.imgList.push(res.data.file_url);
            } else {
              Toast({ message: "上传失败", duration: 1500 });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      function onFail(message) {
        alert("Failed because: " + message);
      }
    },
    // 图库
    pickImage() {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
      });

      var _this = this;

      function onSuccess(imageData) {
        let imageDataSrc = "data:image/jpeg;base64," + imageData;
        console.log(imageDataSrc);
        var qs = require("qs");
        _this.$http
          .post(
            "http://sy.66diqiu.com/admin/upload/app_upload_thumb",
            qs.stringify({
              file: imageDataSrc
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.status == 1) {
              _this.imgList.push(res.data.file_url);
            } else {
              Toast({ message: "上传失败", duration: 1500 });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      function onFail(message) {
        console.log("Failed because: " + message);
      }
    },
    onReomvePic(index) {
      this.imgList.splice(index, 1);
    },
    show(index) {
      this.$refs.previewer.show(index);
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   var map = new BMap.Map("map");
    //   var point = new BMap.Point(116.331398, 39.897445);
    //   map.centerAndZoom(point, 14);
    //   var geolocation = new BMap.Geolocation();
    //   // 开启SDK辅助定位
    //   geolocation.enableSDKLocation();
    //   geolocation.getCurrentPosition(function(r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //       var mk = new BMap.Marker(r.point);
    //       console.log(mk);
    //       map.addOverlay(mk);
    //       map.panTo(r.point);
    //     } else {
    //       Toast({ message: "地图初始化失败", duration: 1000 });
    //     }
    //   });
    // });
  },
  created() {
    // cordova相机插件
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {}
    this.product_id = this.$route.params.id;
    this.go_date = this.$route.params.time;
    this.getDetail();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/team/team";
</style>
