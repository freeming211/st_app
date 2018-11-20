<template>
    <div class="myInfo">

        <x-header :left-options="{backText: ''}">个人中心</x-header>
        <div>
            <div class="myInfo-top">
                   <div class="myInfo-list flex flex-align-center flex-pack-justify">
                <div class="myInfo-list-title">修改头像</div>
                <div class="myInfo-list-right flex flex-align-center">
                    <img src="../../common/images/tx-02.png" alt="">
                </div>
            </div>
               </div>
            <!-- <group>
                <cell title="昵称" :value="userInfo.username" is-link @click.native="goNick"></cell>
            </group> -->
        </div>
        
        <div style="padding:0 .25rem 0 0rem;background:#ffffff;">
            <group>
                <cell title="姓名" :value="userInfo.realname"></cell>
                <cell title="昵称" :value="userInfo.username"></cell>
                <popup-picker title="性别" :data="list" v-model="sex" value-text-align="right" @on-change="changeSex"></popup-picker>
                <datetime
                    v-model="valueDate"
                    @on-change="changeTime"
                    :title="('生日')"
                    start-date="1920-01-01"
                    @on-cancel="log('cancel')"
                    @on-confirm="log('confirm')"
                    @on-hide="log('hide', $event)">
                </datetime>
                <cell title="邮箱" :value="userInfo.email" is-link @click.native="goEmail"></cell>
            </group>
        </div>
    </div>
</template>

<script>
import { Datetime, Group, XButton, Cell, PopupPicker, XHeader } from "vux";
import { Toast } from "mint-ui";
export default {
  name: "myInfo",
  components: {
    Datetime,
    Group,
    XButton,
    Cell,
    PopupPicker,
    XHeader
  },
  data() {
    return {
      img: "../../common/images/top.png",
      valueDate: "2015-11-12",
      sex: [],
      list: [["男", "女"]],
      userInfo: ""
    };
  },
  methods: {
    //时间选择插件
    log(str1, str2 = "") {
      console.log(str1, str2);
    },
    // 更改生日
    changeTime(value) {
      this._birthday(value);
    },
    _birthday(value){
      var qs = require("qs");
      this.$http
        .post(
          "/api_user/change_user_info",
          qs.stringify({
            field:"birthday",
            value: value,
            user_type: this.userInfo.user_type,
          })
        )
        .then(res => {
          if(res.data.code == 200){
            Toast({ message: "修改成功", duration: 1500 });
          }else{
            Toast({ message: "修改失败", duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 更改性别
    changeSex(value) {
      this._gender(value);
    },
    _gender(value) {
      value = value.join("")=="男"?1:2;
      var qs = require("qs");
      this.$http
        .post(
          "/api_user/change_user_info",
          qs.stringify({
            field:"gender",
            value: value,
            user_type: this.userInfo.user_type,
          })
        )
        .then(res => {
          if(res.data.code == 200){
            Toast({ message: "修改成功", duration: 1500 });
          }else{
            Toast({ message: "修改失败", duration: 1500 });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    goNick() {
      this.$router.push({ name: "myNick",params:{realname:this.userInfo.username,user_type:this.userInfo.user_type} });
    },
    goEmail() {
      this.$router.push({ name: "myEmail",params:{userInfo:JSON.stringify(this.userInfo)} });
    },
    openPicker() {
      this.$refs.picker.open();
    },
    confirm() {
      console.log("123");
    },
    onPickerHide() {
      this.pickerHide = true;
    },
    onValuesChange() {
      // this.pickerHide = false;
    }
  },
  created() {
    this.pickerValue = this.trueDate;
    this.userInfo = JSON.parse(this.$route.params.userInfo);
    if (this.userInfo.gender == 1) {
      this.userInfo.gender = "男";
      this.sex.push("男");
    } else {
      this.userInfo.gender = "女";
      this.sex.push("女");
    }
    this.valueDate = this.userInfo.birthday;
    console.log(this.userInfo);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
div,
p {
  font-size: 0.34rem !important;
}
@import "../../common/css/center/center";
</style>
