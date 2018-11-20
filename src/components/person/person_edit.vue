<template>
    <div class="myInfo">

        <x-header :left-options="{backText: ''}">出游人</x-header>
        <div style="padding:0 .25rem 0 0rem;background:#ffffff;">
            <group>
                <div class="weui-cell personDiv clearfix flex-pack-justify">
                    姓名
                    <input type="text" class="personIpt" v-model="name">
                </div>
                <div class="weui-cell personDiv clearfix flex-pack-justify">
                    手机号
                    <input type="text" class="personIpt" v-model="phone_num">
                </div>
                 <popup-picker title="证件类型" :data="card_type" v-model="type" value-text-align="right" @on-change="changeSex"></popup-picker>
                <div class="weui-cell personDiv clearfix flex-pack-justify">
                    证件号
                    <input type="text" class="personIpt" v-model="id_number">
                </div>
                <!-- <cell title="姓名" value="刘柳"></cell> -->
                <!-- <popup-picker title="性别" :data="list" v-model="sex" value-text-align="right" @on-change="changeSex"></popup-picker> -->
                <datetime
                    v-model="valueDate"
                    @on-change="changeTime"
                    :title="('生日')"
                    start-date="1920-01-01"
                    @on-cancel="log('cancel')"
                    @on-confirm="log('confirm')"
                    @on-hide="log('hide', $event)">
                </datetime>
            </group>
        </div>

        <div class="f-btn" @click="onBtn">
            确 认
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
    //name，phone_num，id_card_type，id_number，birth
    return {
      valueDate: "1970-01-01",
      type: ["身份证"],
      card_type: [["身份证", "护照", "港澳通行证", "军官证", "其他"]],
      name: "", // 用户姓名
      phone_num: "", // 用户电话
      id_card_type: "身份证", // 证件类型
      id_number: "", // 证件号码
      birth: "1970-01-01", // 生日
      item: "",
      backName:""
    };
  },
  methods: {
    //时间选择插件
    log(str1, str2 = "") {
      console.log(str1, str2);
    },
    //选择生日
    changeTime(value) {
      this.birth = value;
    },
    changeSex(value) {
      this.id_card_type = String(value);
    },
    goNick() {
      this.$router.push({ name: "myNick" });
    },
    goEmail() {
      this.$router.push({ name: "myEmail" });
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
    },
    onBtn() {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
      if (this.name == "") {
        Toast({ message: "姓名不得为空", duration: 1000 });
        return;
      }
      if (this.phone_num == "") {
        Toast({ message: "手机号不得为空", duration: 1000 });
        return;
      }
      if (this.phone_num != "" && !reg.test(this.phone_num)) {
        Toast({ message: "请输入正确的手机号", duration: 1000 });
        return;
      }
      if (this.id_number == "") {
        Toast({ message: "证件号不得为空", duration: 1000 });
        return;
      }
      let type;
      if (this.id_card_type == "身份证") {
        type = 1;
      } else if (this.id_card_type == "护照") {
        type = 2;
      } else if (this.id_card_type == "港澳通行证") {
        type = 3;
      } else if (this.id_card_type == "军官证") {
        type = 4;
      } else if (this.id_card_type == "其他") {
        type = 5;
      }

      if (this.item == "新建") {
        var qs = require("qs");
        this.$http
          //   name，phone_num，id_card_type，id_number，birth
          .post(
            "/api_order/add_torist",
            qs.stringify({
              name: this.name,
              phone_num: this.phone_num,
              id_card_type: type,
              id_number: this.id_number,
              birth: this.birth
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              Toast({ message: "添加成功", duration: 1500 });
              this.$router.push({ name: "person",params:{name:this.backName} });
            } else {
              Toast({ message: "添加失败", duration: 1500 });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        var qs = require("qs");
        this.$http
          //   name，phone_num，id_card_type，id_number，birth
          .post(
            "/api_order/edit_torist",
            qs.stringify({
              id: this.item.id,
              name: this.name,
              phone_num: this.phone_num,
              id_card_type: type,
              id_number: this.id_number,
              birth: this.birth
            })
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              Toast({ message: "修改成功", duration: 1500 });
              this.$router.push({ name: "person" });
            } else {
              Toast({ message: "修改失败", duration: 1500 });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.pickerValue = this.trueDate;
    this.item = this.$route.params.item;
    this.backName = this.$route.params.backName;
    console.log(this.item);
    if (this.item != "新建") {
      this.name = this.item.name;
      this.phone_num = this.item.phone_num;
      this.type = this.item.type.split(",");
      this.id_number = this.item.id_number;
      this.birth = String(this.item.birth);
      this.valueDate = String(this.item.birth);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
div,
p {
  font-size: 0.34rem !important;
}
.personDiv {
  position: relative;
  .personIpt {
    position: absolute;
    right: 15px;
    text-align: right;
    border: none;
    outline: none;
    font-size: 0.32rem;
    top: 10px;
  }
}
.f-btn {
  width: 90%;
  margin: 0.5rem auto;
  background: #262f81;
  color: #ffffff;
  padding: 0.18rem 0;
  text-align: center;
  border-radius: 0.2rem;
}
@import "../../common/css/center/center";
</style>
