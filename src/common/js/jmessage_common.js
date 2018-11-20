/**
 * Created by ZLB on 2017/11/29.
 */

const host_name = "http://sy.66diqiu.cn/"
const jpush_appkey = '881f6f62337171b429f6ceff'
import axios from 'axios'

window.JIM = new JMessage({})



//初始化
function init(username,password,that) {
    axios.get(host_name + 'app/im/get_sign')
        .then(function (data) {
            var data = data.data
            JIM.init(data).onSuccess(function (data) {
                console.log('success11:' + JSON.stringify(data));
                login(username,password,that)  //初始化成功后进行登录
            }).onFail(function (data) {
                console.log('error:' + JSON.stringify(data))
            });
        })
        .catch(function (data) {
            console.log(data)
        })

}

//判断初始化是否成功
function isInit() {
    return JIM.isInit()
    // console.log(JIM.isInit())

}

//判断是否登录
function isLogin() {
    return JIM.isLogin()
}


// 退出
function loginOut(){
    JIM.loginOut(); 
    console.log("退出了"+JIM.loginOut()); 
}

//登录
function login(username,password,that) {
    JIM.login({
        'username': username,
        'password': password
    }).onSuccess(function (data) {
        console.log('success:' + JSON.stringify(data));
        localStorage.setItem("username", data.username);
        JIM.onMsgReceive(function (data) {
            data = JSON.stringify(data);
            console.log('1msg_receive:' + data);
        });

        JIM.onMsgReceive(function (data) {
            var msg = data.messages[0]
            var msg_text = msg['content'].msg_body.text
            var msg_ctime_ms = msg['ctime_ms']
            that.msg_arr.push({
                content: msg_text,
                crts: msg_ctime_ms,
                local: false
            })

            // data = JSON.stringify(data);
            console.log('接收的消息:' + JSON.stringify(msg));

            //获取极光IM的msg_id
            var jpush_im_id = msg['msg_id'];
            var msg_from = 2;  //客服发的消息
            var from_user = msg['from_username'];
            var to_user = msg['content']['target_id'];
            var msg_content = msg['content']['msg_body']['text']
            //消息保存到数据库
            var params = new URLSearchParams()
            params.append('jpush_im_id',jpush_im_id)
            params.append('msg_from',msg_from)
            params.append('from_user',from_user)
            params.append('to_user',to_user)
            params.append('msg_content',msg_content)

            var save_img_msg_url = host_name + 'app/im/save_im_msg';
            axios.post(save_img_msg_url,params).then(function (response) {
                //do something
            }).catch(function (response) {
                //do something
            })

            

        });

        JIM.onEventNotification(function (data) {
            console.log('event_receive: ' + JSON.stringify(data));
        });

        JIM.onSyncConversation(function (data) { //离线消息同步监听
            console.log('event_receive: ' + data);
        });

        JIM.onUserInfUpdate(function (data) {
            console.log('onUserInfUpdate : ' + JSON.stringify(data));
        });

        JIM.onSyncEvent(function (data) {
            console.log('onSyncEvent : ' + JSON.stringify(data));
        });

        JIM.onMsgReceiptChange(function (data) {
            console.log('onMsgReceiptChange : ' + JSON.stringify(data));
        });

        JIM.onSyncMsgReceipt(function (data) {
            console.log('onSyncMsgReceipt : ' + JSON.stringify(data));
        });

        JIM.onMutiUnreadMsgUpdate(function (data) {
            console.log('onConversationUpdate : ' + JSON.stringify(data));
        });

        JIM.onTransMsgRec(function (data) {
            console.log('onTransMsgRec : ' + JSON.stringify(data));
        });

    }).onFail(function (data) {

        console.log('error:' + JSON.stringify(data));
    }).onTimeout(function (data) {
        console.log('timeout:' + JSON.stringify(data));
    });
}

//发送单聊信息
function sendSingleMsg(target_username,msg_content) {
    JIM.sendSingleMsg({
        // 'target_username' : 'admin',
        'target_username' : target_username,
        'appkey' :  jpush_appkey,
        'content' : msg_content,
        'no_offline' : false,
        'no_notification' : false,
        //'custom_notification':{'enabled':true,'title':'title','alert':'alert','at_prefix':'atprefix'}
        need_receipt:false
    }).onSuccess(function(data,msg) {
        var jpush_im_id = data['msg_id']
        var to_user = data['target_username']
        var from_user = msg['content']['from_id']
        var params = new URLSearchParams();
        params.append('jpush_im_id', jpush_im_id);
        params.append('to_user', to_user);
        params.append('from_user', from_user);
        params.append('msg_from', 1);
        params.append('msg_content', msg_content);
        // console.log('success data:' + JSON.stringify(data));
        // console.log('succes msg:' + JSON.stringify(msg));
        console.log('保存的信息：' + JSON.stringify(params))
        //保存消息到cs_sy_im_message表
        //消息保存到数据库
        var save_img_msg_url = host_name + 'app/im/save_im_msg';
        axios.post(save_img_msg_url,params).then(function (response) {
            console.log(response)
        }).catch(function (response) {
            console.log(response)
        })


    }).onFail(function(data) {
        console.log('error:' + JSON.stringify(data));
    });
}





export {
    init,isInit,login,isLogin,sendSingleMsg,loginOut
}


