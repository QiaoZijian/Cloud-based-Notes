//the routes only
var controller = require('../controllers/index.js');
module.exports = function(app){
	app.get('/',controller.index); //大白纸
	app.get('/noteRecord',controller.noteRecord);	//跳转去笔记记录页面
	app.get('/noteDisplayTRY',controller.noteDisplayTRY);	//笔记展示静态页面模型
	app.get('/noteDisplay',controller.noteDisplay);		//跳转去笔记展示页面
	app.get('/getNotesOnAPage',controller.getNotesOnAPage);		//拿一页pdf上的所有笔记
	app.get('/profile',controller.profile);	//跳转去个人信息展示页面
	app.get('/profileTRY',controller.profileTRY);	//个人信息展示静态页面模型
	app.get('/getProfiles',controller.getProfiles);	//得到某人的个人信息
	app.get('/getMyBriefProfile',controller.getMyBriefProfile);	//得到我简短的信息

	app.post('/register',controller.register);	//注册
	app.post('/login',controller.login);	//登录
	app.post('/imageUpload',controller.imageUpload);	//图片上传
	app.post('/fileUpload',controller.fileUpload);	//文件上传
	app.post('/submitNote',controller.submitNote);	//提交笔记
    app.post('/clickThisNote',controller.clickThisNote); //点击量操作
	app.post('/replyToNote',controller.replyToNote);	//回复笔记
	app.post('/commentToReply',controller.commentToReply);	//评论回复
	app.post('/operateNote',controller.operateNote);	//操作笔记
	app.post('/praiseOrNotReply',controller.praiseOrNotReply);	//操作回复
    app.post('/editReply',controller.editReply);	//编辑回复
    app.post('/deleteReply',controller.deleteReply);	//删除回复
    app.post('/deleteComment',controller.deleteComment);	//删除评论
	app.post('/uploadHead',controller.uploadHead);	//上传头像
	app.post('/saveHead',controller.saveHead);	//保存头像
	app.post('/updateProfiles',controller.updateProfiles);	//修改个人信息
    app.post('/deleteNote',controller.deleteNote);	//个人主页中删除笔记
    app.post('/editNote',controller.editNote);	//个人主页中编辑笔记

/*
    ***************这之后的接口是用于行为记录的********************
*/
    app.post('/recordStart',controller.recordStart); //记录首次打开pdf信息
    app.post('/recordDownload',controller.recordDownload);  //记录下载某个pdf
    app.post('/recordEnd',controller.recordEnd); //记录关闭某个pdf
    app.post('/recordPageChange',controller.recordPageChange); //记录翻页操作
    app.post('/recordOperateNoteDis',controller.recordOperateNoteDis); //记录展开/关闭笔记区域

    app.post('/recordNewOrHot',controller.recordNewOrHot); //记录切换最新/最热
    app.post('/recordViewANote',controller.recordViewANote); //记录查看了一个笔记
    app.post('/recordFakeReply',controller.recordFakeReply); //记录想要回复笔记
    app.post('/recordRealReply',controller.recordRealReply); //记录确实回复了笔记
    app.post('/recordOperateReply',controller.recordOperateReply); //记录对笔记的操作
    app.post('/recordEdit',controller.recordEdit); //记录编辑操作
    app.post('/recordDelete',controller.recordDelete); //记录删除操作
    app.post('/recordViewInfo',controller.recordViewInfo); //记录查阅了谁的资料
    app.post('/recordFakeNote',controller.recordFakeNote); //记录打开了记录页面，准备发布笔记
    app.post('/recordRealNote',controller.recordRealNote); //记录发布了笔记

};
