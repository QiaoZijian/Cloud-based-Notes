/**
 * Created by Qiao on 1/21/15.
 */
/*
 *********  用户操作编码  *********
 在扩展程序那边代码记:
 100: 打开某个pdf（屏幕宽度）
 120/121: 显示/关闭笔记区域

 140:下载某个pdf
 150:关闭某个pdf

 400: 假发布笔记(相关区域)

 在我的页面里记:
 110: 翻页（此时有多少相关笔记？）
 130/131: 切换查看最新/最热笔记

 200: 查看某个笔记(该笔记一套相关信息)
 操作某个笔记——
 210/211: 假/真回复(该笔记一套相关信息)
 220/221: 赞/取消赞(该笔记一套相关信息)
 230/231: 关注/取消关注(该笔记一套相关信息)
 240/241: 收藏/取消收藏(该笔记一套相关信息)

 300: 查阅某人资料(谁)

 直接在服务器端记：
 250:编辑某个笔记(该笔记经过编辑的相关信息)
 260:删除某个笔记(该笔记一套相关信息)

 401: 真发布笔记(绝大部分信息)
 */
var ToServer = "http://127.0.0.1:8880" ;
//100:打开某个pdf
function recordStart(who, courseID, pdf, ifDisNotes, bodyWidth, chromeVersion){
//    console.log(arguments);
    jQuery.ajax({
        url:ToServer+'/recordStart',
        type:'post',
        data:{
            who: who,
            when: new Date().getTime(),
            whatCourse: courseID,
            whatPDF: pdf,
            doWhat: 100,
            status: [ifDisNotes, bodyWidth, chromeVersion]
        },
        success:function(response){
         //   console.log(response);
        },
        error:function(response){

        }
    });
}
//120/121:展开关闭笔记区域
function recordOperateNoteDis(who, courseID, pdf, page, operate){
//    console.log(arguments);
    //operate == 1 , 展开笔记区域 —— 120
    //operate == 0 , 关闭笔记区域 —— 121
    jQuery.ajax({
        url:ToServer+'/recordOperateNoteDis',
        type:'post',
        data:{
            who: who,
            when: new Date().getTime(),
            whatCourse: courseID,
            whatPDF: pdf,
            whatPage: page,
            doWhat: operate == 0 ? 121 : 120
        },
        success:function(response){
         //   console.log(response);
        },
        error:function(response){

        }
    });
}
//140: 下载某个pdf
function recordDownload(who, courseID, pdf){
    jQuery.ajax({
        url:ToServer + '/recordDownload',
        type:'post',
        data:{
            who: who,
            when: new Date().getTime(),
            whatCourse: courseID,
            whatPDF: pdf,
            doWhat: 140
        },
        success:function(response){
            console.log(response);
        },
        error:function(response){

        }
    });
}
//150 关闭某个pdf
function recordEnd(who, courseID, pdf){
    jQuery.ajax({
        url:ToServer + '/recordEnd',
        type:'post',
        data:{
            who: who,
            when: new Date().getTime(),
            whatCourse: courseID,
            whatPDF: pdf,
            doWhat: 150
        },
        success:function(response){
           // console.log(response);
        },
        error:function(response){

        }
    });
}
//400: 假发布笔记即准备发布笔记
function recordFakeNote(who, courseID, pdf, page, relContent){
    //console.log(arguments);
    jQuery.ajax({
        url:ToServer + '/recordFakeNote',
        type:'post',
        data:{
            who: who,
            when: new Date().getTime(),
            whatCourse: courseID,
            whatPDF: pdf,
            whatPage: page,
            doWhat: 400,
            status: [relContent]
        },
        success:function(response){
            console.log(response);
        },
        error:function(response){

        }
    });
}