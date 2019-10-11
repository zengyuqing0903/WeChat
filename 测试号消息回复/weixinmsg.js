// 处理用户消息的模块
const formatMsg = require('./fmtwxmsg');

function help() {
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}
function message(){
    return `班级：2017级1班
            姓名：曾雨晴
            学号：2017011702`;
}
// 处理用户发过来的消息
// 第一个参数是解析后的用户消息
// 第二个参数是要返回的消息对象
// 基本处理过程：根据用户发过来的消息判断消息类型并进行处理
function userMsg(wxmsg, retmsg) {
    /*
        关键词自动回复
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
    if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？' || wxmsg.Content == '帮助') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);//格式化消息并返回
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        }else if(wxmsg.Content == 'who'){
            retmsg.msg = message();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        }else {//非关键词原样返回消息
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {//非文本类型的消息
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                // 因为消息类型为空，所以会返回默认的文本消息
                // 提示类型不被支持
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;
exports.help = help;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

