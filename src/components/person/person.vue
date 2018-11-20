<template>
    <div class="person">
        <x-header :left-options="{backText: ''}">选择出游人</x-header> 
        <div class="header">
            <div class="middle-text">
                已选择<span>{{userList.length}}</span>/{{personList.length}}位联系人
            </div>
            <div class="pos-ab" @click="onAdd">
                <i class="iconfont icon-tianjialianxiren addUser"></i>
                <p>添加</p>
            </div>
        </div>

        <div class="contant">
            <div class="person-list" v-for="(item,index) in personList" :key="item.id" :class="{'active':item.active}">
                <div class="box">
                    <div @click="onPushArry(item,index)">
                        <p class="name">{{item.name}}</p>
                        <div class="number flex flex-pack-justify">
                            <div>
                                {{item.type}}:{{item.id_number}}
                            </div>
                            <!-- <div class="type">
                                成人
                            </div> -->
                        </div>
                    </div>

                    <div class="twoBtn clearfix">
                        <div class="right delete" @click="onDel(item)">
                            <i class="iconfont icon-shanchu"></i>
                            <span>删除</span>
                        </div>
                        <div class="right edit" @click="onEdit(item)">
                            <i class="iconfont icon-bianji"></i>
                            <span>编辑</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="fix-btn" @click = "onTrue">
            确定
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import { XHeader } from "vux";
import { MessageBox } from "mint-ui";
export default {
  name: "person",
  components: {
    XHeader
  },
  data() {
    return {
      userList: [],
      personList: [],
      backName:""
    };
  },
  methods: {
    onPushArry(item, index) {
      item.active = !item.active;
      if (this.userList == "" || this.userList.indexOf(item) == -1) {
          this.userList.push(item);
      }else if(this.userList.indexOf(item) > -1){
          let i = this.userList.indexOf(item);
          this.userList.splice(i,1);
      }
    },
    onTrue(){
        if(this.userList == ""){
            Toast({ message: "请至少选择一名", duration: 1500 });
            return
        }
        this.$router.push({ name: this.backName});
        sessionStorage.setItem("userList",JSON.stringify(this.userList));
    },
    onAdd() {
      this.$router.push({ name: "PersonEdit", params: { item: "新建",backName:this.backName } });
    },
    onDel(item) {
      MessageBox.confirm("", {
        message: "确定删除此联系人？",
        title: "提示",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(action => {
          if (action == "confirm") {
            var qs = require("qs");
            this.$http
              .post("/api_order/del_torist", qs.stringify({ id: item.id }))
              .then(res => {
                if (res.data.code == 200) {
                  Toast({ message: "删除成功", duration: 1500 });
                  this.getDetail();
                } else {
                  Toast({ message: "删除失败", duration: 1500 });
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    onEdit(item) {
      this.$router.push({ name: "PersonEdit", params: { item: item } });
    },
    getDetail() {
      var qs = require("qs");
      this.$http
        .post("/api_order/get_user_torist_list")
        .then(res => {
          if (res.data.code == 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].active = false;
              if (res.data.data[i].id_card_type == 1) {
                res.data.data[i].type = "身份证";
              } else if (res.data.data[i].id_card_type == 2) {
                res.data.data[i].type = "护照";
              } else if (res.data.data[i].id_card_type == 3) {
                res.data.data[i].type = "港澳通行证";
              } else if (res.data.data[i].id_card_type == 4) {
                res.data.data[i].type = "军官证";
              } else if (res.data.data[i].id_card_type == 5) {
                res.data.data[i].type = "其他护照";
              }
            }
            this.personList = res.data.data;
          } else {
            this.personList = [];
          }
          console.log(this.personList);
          //Toast({ message: res.data.msg, duration: 1500 });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getDetail();
    this.backName = this.$route.params.name;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../common/css/center/person";
</style>
