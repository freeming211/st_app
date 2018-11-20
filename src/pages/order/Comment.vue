<template>
    <div class="comment">
        <x-header :left-options="{backText: ''}">发布评价</x-header>
        <div class="comment-title">
            订单已完成,您的满意是我们的追求
        </div>
        <div class="comment-box">
            <div class="comment-box-detail">
                <div class="comment-box-num flex flex-align-center flex-pack-justify">
                    <div class="comment-box-num-left">
                        订单编号:{{comParams.order_sn}}
                    </div>
                    <div class="comment-box-num-right">
                        订单评价
                    </div>
                </div>
                <div class="com-name">
                    {{comParams.ticket_name}}
                </div>
                <div class="com-time">
                    游玩时间:{{comParams.user_date}}
                </div>
                <group>
                    <cell title="总评价">
                        <rater v-model="star"></rater>
                    </cell>
                </group>
                <div class="com-textarea">
                    <textarea name="" id="" cols="30" rows="5" placeholder="谈谈您对我们的意见" v-model="content"></textarea>
                </div>

                <ul class="photoList clearfix">
                    <li v-for="(item,index) in comment_pic"  :key="item">
                        <img class="addPhoto" :src="item" alt="">
                        <i class="iconfont icon-jian1" @click="onReomvePic(index)"></i>
                    </li>
                    <li @click="onChosePhoto">
                      <img class="addPhoto" src="../../common/images/addPhoto.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <div class="comment-btn" @click="onAlertShowBtn">
            发布评价
        </div>
        <div v-transfer-dom>
            <alert v-model="alertShow" :title="('恭喜您!订单评价成功!')" @on-show="onAlertShow" @on-hide="onAlertHide"> {{('获得'+sign_points+'分') }}</alert>
        </div>

        <!-- 照片上传使用 -->
        <actionsheet v-model="show2" :menus="menus2" @on-click-menu="photoClick" show-cancel></actionsheet>
    </div>  
</template>

<script>
import { Toast } from "mint-ui";
import {
  Group,
  XHeader,
  Rater,
  Cell,
  Range,
  AlertModule,
  Alert,
  Actionsheet,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  name: "comment",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Rater,
    Group,
    Cell,
    Range,
    Alert,
    Actionsheet
  },
  data() {
    return {
      // 照片开始
      menus2: {
        menu1: "拍照",
        menu2: "从图库中选择"
      },
      show2: false,
      // 照片截止
      alertShow: false,
      btnHide: false,
      star: 5,
      content: "", // 评论
      src: "",
      comment_pic: [],
      sign_points: "",
      //订单id，产品id 先写死
      // order_id: 12158,
      // product_id: 127,
      comParams: ""
    };
  },
  methods: {
    onAlertShow() {
      console.log("on show");
    },
    onAlertHide() {
      console.log("Plugin: I'm hiding now");
    },
    onAlertShowBtn() {
      if (this.star == 0) {
        Toast({ message: "请最少选择一颗星", duration: 1500 });
        return;
      }
      if (this.content.length < 1) {
        Toast({ message: "请填写您的意见", duration: 1500 });
        return;
      }

      var qs = require("qs");
      this.$http
        .post(
          "/api_user/comment",
          qs.stringify({
            content: this.content,
            comment_pic: this.comment_pic,
            order_id: this.comParams.order_id,
            product_id: this.comParams.product_id,
            module: this.comParams.module,
            star: this.star
          })
        )
        .then(res => {
          if (res.data.status == 1) {
            this.alertShow = true;
            this.sign_points = res.data.sign_points;
            this.$router.push({ name: "order", params: { num: 0 } });
          } else {
            Toast({ message: "评论失败", duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    imageuploaded(res) {
      alert(res.status);
      if (res.status == 1) {
        this.comment_pic.push(res.info);
      }
    },
    onChosePhoto() {
      this.show2 = true;
    },
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
              _this.comment_pic.push(res.data.file_url);
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
              _this.comment_pic.push(res.data.file_url);
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
    onReomvePic(i) {
      this.comment_pic.splice(i, 1);
    }
  },
  created() {
    // cordova相机插件
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {}
    this.comParams = this.$route.params.comParams;
    console.log(this.comParams);
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/order/order";
</style>
