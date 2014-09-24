var target = null;
window.addEventListener("message", function (e) {
	
	alert(e);
	if(!localStorage.id || localStorage.id != e.data){
		localStorage.id = e.data;
	}
});
window.addEventListener("load",function (e){
	target = $("#targetID").text();
	getProfiles(target);
});
//为之后创建page需要的显示信息做准备
function displayNULL(str){
	if(!str){
		return "未填写此信息";
	}
	else return str;
}
//输入是一个数组信息，返回一个将数组信息以手风琴方式展示出来的父DOM
function displayNotesArray(array, accordionID){
	//大手风琴为返回
	$accordion = $('<div class="panel-group" id="'+accordionID+'">');
	for(var i = 0 ; i < array.length ; i++){
		$panel_div = $('<div class="panel panel-default">'+
						  '<div class="panel-heading">'+
		                    '<h4 class="panel-title">'+
		                      '<span class="label label-success">'+array[i].type+'</span>&nbsp;&nbsp;'+
		                      '<a data-toggle="collapse" data-parent="#'+accordionID+'" href="#collapse'+i+accordionID+'">'+
		                         array[i].title + '<small class="text-primary noteTime">'+
		                         array[i].time+'</small><small class="noteUser"><span class="glyphicon glyphicon-user"></span> <strong>'+
		                         array[i].from+'</strong></small></a>'+
		                    '</h4>'+
		                  '</div>'+
		                '</div>');
		$panel_collapse=$('<div id="collapse'+i+accordionID+'" class="panel-collapse collapse">'+
					        '<div class="panel-body">'+
					          '<p><span class="noteInfo">课件：</span>'+array[i].name+'</p>'+
					          '<p><span class="noteInfo">页码：</span>'+array[i].pageIndex+'</p>'+
					          '<p><span class="noteInfo">摘要：</span>'+array[i].abstract+'</p>'+   
					          '<a href="'+array[i].URL+"#page="+array[i].pageIndex+"&index="+array[i].noteIndex+
					          	'" class="enterToNote" target="_blank">点此进入 >>></a>'+
					        '</div>'+
					      '</div>')
		$panel_div.append($panel_collapse);
		$accordion.append($panel_div);
	}
	return $accordion;
}
//展示个人信息
function displayProfile(information){
	/*information的结构
	{	baseInfo:{	userID: ,
				    nickname: ,
				    role: string, 
				    head: , 
				    mobilephone: ,
				    email: } ,
		notes: [{
					URL: ,
            		pageIndex: ,
            		noteIndex: ,
					title: ,
					type: string,
					from: string name,
					time: ,
					abstract: 
		}],
		collects:[] , 同上
		concerns:[]}
	*/
	var baseInfo = information.baseInfo;
	var notes = information.notes;
	var collects =information.collects;
	var concerns = information.concerns;
	//是不是我自己
	var if_mine = (localStorage.id == target)? true: false;
	//左边个人资料里有我还是ta的差别，右边只有修改的时候有差
	var whose = (if_mine == true)? "我":baseInfo.nickname;
	$profile_ul = $("#profile_left ul");
	$info_li = $('<li class="active"><a href="#profile" data-toggle="tab">'+
		'<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;'+whose+'的资料</a></li>');
	$notes_li = $('<li><a href="#notes"  data-toggle="tab"><span class="glyphicon glyphicon-pencil"></span>'+
		'<span class="badge pull-right">'+notes.length+'</span>&nbsp;&nbsp;'+whose+'的笔记/问题</a></li>');
	$concerns_li = $('<li><a href="#concerns"  data-toggle="tab"><span class="glyphicon glyphicon-eye-open"></span>'+
		'<span class="badge pull-right">'+concerns.length+'</span>&nbsp;&nbsp;'+whose+'的关注</a></li>');
	$collects_li = $('<li><a href="#collects"  data-toggle="tab"><span class="glyphicon glyphicon-star"></span>'+
		'<span class="badge pull-right">'+collects.length+'</span>&nbsp;&nbsp;'+whose+'的收藏</a></li>'); 
	$profile_ul.append($info_li,$notes_li,$concerns_li,$collects_li);

	//右边
	//个人资料板块
	$profile_div=$("#profile");
	$profile_panel=$('<div class="panel panel-primary"></div>');
	
	$profile_heading=$('<div class="panel-heading"><h3 class="panel-title">'+whose+'的资料</h3></div>');
	$profile_panel.append($profile_heading);

	$profile_body=$('<div class="panel-body"></div>');
	$profile_body_head=$('<div id="headPhoto"><img src="'+baseInfo.head+'" class="img-rounded" id="head_icon"></div>');
	if(if_mine){
		$profile_body_head.append('<footer><a href="#" id="changeHead">换头像</a></footer>');
	}
	$profile_body.append($profile_body_head);

	var nickname=(if_mine==true)?'<input type="text" class="form-control" id="nickname" placeholder="未填写此信息" value="'+baseInfo.nickname+
									'">': '<p class="form-control-static" id="nickname">'+baseInfo.nickname+'</p>';
	var cellphone=(if_mine==true)?'<input type="text" class="form-control" id="cellphone" placeholder="未填写此信息" value="'+baseInfo.mobilephone+
									'">': '<p class="form-control-static" id="cellphone">'+displayNULL(baseInfo.mobilephone)+'</p>';
	var email=(if_mine==true)?'<input type="text" class="form-control" id="email" placeholder="未填写此信息" value="'+baseInfo.email+
									'">': '<p class="form-control-static" id="email">'+displayNULL(baseInfo.email)+'</p>';	
	$profile_body_user = $('<div id="userProfile">'+
			                '<form class="form-horizontal" role="form">'+
			                  '<div class="form-group">'+
			                    '<label class="col-sm-3 control-label">学号/教工号:</label>'+
			                    '<div class="col-sm-7">'+
			                      '<p class="form-control-static" id="user_id">'+baseInfo.userID+'</p>'+
			                    '</div>'+
			                  '</div>'+
			                  '<div class="form-group">'+
			                    '<label for="nickname" class="col-sm-3 control-label">昵称:</label>'+
			                    '<div class="col-sm-7">'+nickname+
			                    '</div>'+
			                  '</div>'+
			                  '<div class="form-group">'+
			                    '<label class="col-sm-3 control-label">身份:</label>'+
			                    '<div class="col-sm-7">'+
			                      '<p class="form-control-static">'+baseInfo.role+'</p>'+
			                    '</div>'+
			                  '</div>'+
			                  '<div class="form-group">'+
			                    '<label for="cellphone" class="col-sm-3 control-label">手机号:</label>'+
			                    '<div class="col-sm-7">'+cellphone+
			                    '</div>'+
			                  '</div>'+
			                  '<div class="form-group">'+
			                    '<label for="email" class="col-sm-3 control-label">E-mail:</label>'+
			                    '<div class="col-sm-7">'+email+
			                    '</div>'+
			                  '</div>'+
			                '</form>'+
			              '</div>');
	if(if_mine){
		$profile_body_user.find("form").append('<div class="form-group">'+
							                    '<div class="col-sm-offset-4 col-sm-8">'+
							                      '<button type="submit" class="btn btn-primary" id="submitFix">提交修改</button>'+
							                    '</div>'+
							                  '</div>');
	}
	$profile_body.append($profile_body_user);
	$profile_panel.append($profile_body);
	$profile_div.append($profile_panel);

	//note部分
	$note_div=$("#notes");
	$note_panel=$('<div class="panel panel-primary">'+
		            '<div class="panel-heading">'+
		              '<h3 class="panel-title">'+whose+'的笔记/问题</h3>'+
		            '</div>'+
		          '<div>');
	$note_pannel_body=$('<div class="panel-body"></div>');
	$note_pannel_body.append(displayNotesArray(notes, "accordionNotes"));
	$note_panel.append($note_pannel_body);
	$note_div.append($note_panel);

	//concern部分
	$concern_div=$("#concerns");
	$concern_panel=$('<div class="panel panel-primary">'+
		            '<div class="panel-heading">'+
		              '<h3 class="panel-title">'+whose+'的关注</h3>'+
		            '</div>'+
		          '<div>');
	$concern_pannel_body=$('<div class="panel-body"></div>');
	$concern_pannel_body.append(displayNotesArray(concerns, "accordionConcerns"));
	$concern_panel.append($concern_pannel_body);
	$concern_div.append($concern_panel);

	//collect部分
	$collect_div=$("#collects");
	$collect_panel=$('<div class="panel panel-primary">'+
		            '<div class="panel-heading">'+
		              '<h3 class="panel-title">'+whose+'的收藏</h3>'+
		            '</div>'+
		          '<div>');
	$collect_pannel_body=$('<div class="panel-body"></div>');
	$collect_pannel_body.append(displayNotesArray(collects, "accordionCollects"));
	$collect_panel.append($collect_pannel_body);
	$collect_div.append($collect_panel);

}
$(document).ready(function(){
	//换头像popover的设置
	var headPopSetting = {
		placement: "bottom",
	    html: true,
	    selector: "#changeHead",
	    title: function() {
	      return "头像的最佳尺寸为128*128";
	    },
	    content: function() {
	      return '<form id="headForm" enctype="multipart/form-data" method="post" action="">' +
                  '<input type="file" name="file" id="headUpdate" accept="image/*" />' +
                '</form>' +
                '<button class="btn btn-primary" id="uploadHead" disabled="disabled">上传头像</button>'+
                '<button class="btn btn-success" id="saveHead" disabled="disabled">保存修改</button>';
	    }
	}
	//动态加载后也可以使用此pop
	$('body').popover(headPopSetting);

	//选择文件后才可点击上传
	$(document).on("change","#headUpdate",function(){
		$("#uploadHead").removeAttr("disabled");
	});
	//上传
	$(document).on("click","#uploadHead",function(){
		if($("#headUpdate").val()){
			var form = document.getElementById("headForm");
			var form_data = new FormData(form);
			uploadHead(form_data);
			$(this).text("上传中...").attr("disabled","disabled");
		}
		return false;
	});
	//保存
	$(document).on("click","#saveHead",function(){
		if($("#headUpdate").val()){
			var userID = Number($("#user_id").text());
			var head = $("#headPhoto").find("img").attr("src");
			saveHead(userID, head);
			$(this).text("保存中...").attr("disabled","disabled");
		}
		return false;
	});

	//提交对自己信息的修改
	$(document).on("click","#submitFix",function(){
		$(this).text("提交中...").attr("disabled","disabled");
		updateProfiles($("#user_id").text(),$("#nickname").val(),$("#cellphone").val(),$("#email").val());	
		return false;
	});
	
});