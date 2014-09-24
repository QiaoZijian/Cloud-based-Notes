var USER = '';

//提交笔记
function submitNote(userID, URL, pdfName, pageIndex, note){
	//console.log();
	jQuery.ajax({
		url:'/submitNote',
		type:'post',
		data:{
			userID: userID,
			URL: URL,
			pdfName: pdfName,
			pageIndex: pageIndex,
			note: note
		},
		success:function(response){
			//console.log(response);
			if(response.status == "success"){
				$("#mySuccessBody").html(response.msg);
				$("#myModalSuccess").modal({
					backdrop: "static",
					keyboard: false
				});
			}
			else{
				$("#myErrorBody").text(response.msg);
				$("#myModalError").modal('show');
			}	
		},
		error:function(response){
			console.log(response);
		}
	});
}

//得到一页的笔记
function getNotesOnAPage(pdf_URL, pdf_page, callback){
	//console.log();
	jQuery.ajax({
		url:'/getNotesOnAPage',
		type:'get',
		data:"pdf_url="+ pdf_URL + "&pdf_page=" + pdf_page, 
		success:function(response){
			//console.log(response);
			if(response.status == 'success'){
				UsersThisPage[pdf_page] = response.result.users;

				if(callback){
					var notes = response.result.notes;
					//按时间排序后		
					callback(notes,0);
					//按热度排序后
					callback(notes,1);
				}	

				scrollBottom = 9999999 //更新完本页信息，本页的scroll就会清空		
			}
			else{
				console.log(response.msg);
			}
		},
		error:function(response){
			console.log(response);
		}
	});
}

//提交对笔主的回复
function replyToNote(userID, URL, pageIndex, noteIndex, body, callback){
	jQuery.ajax({
		url:'/replyToNote',
		type:'post',
		data:{
			userID: userID,
			URL: URL,
			pageIndex: pageIndex,
			noteIndex: noteIndex,
			body: body
		},
		success:function(response){
			//回复内容清空
			$('#redactor_content_1').setCode("<p>...</p>");
			//新写的一个replyli,response.result 是该note
			fakeDisReply("#replys" ,response.result , response.result.replys.length - 1);
			//关闭modal
			$("#closeReplyModal").click();
			//更新
			//getNotesOnAPage(URL, pageIndex, callback);
				
		},
		error:function(response){
			
		}
	});
}

//提交对某个reply或者comment的评论
function commentToReply(userID, URL, pageIndex, noteIndex, replyIndex, to, body, callback){
	jQuery.ajax({
		url:'/commentToReply',
		type:'post',
		data:{
			userID: userID,
			URL: URL,
			pageIndex: pageIndex,
			noteIndex: noteIndex,
			replyIndex: replyIndex,
			to: to,
			body: body
		},
		success:function(response){
			//console.log(response);
			//清空
			$("#replys ul li .commentBox:visible textarea").val("");
			//新写的一个comment,response.result 是该comment
			fakeDisComment("#replys ul li .commentBox:visible" ,response.result);
			//提交框可以none了
			$("#replys ul li .commentBox:visible").css("display","none");
			//更新
			//getNotesOnAPage(URL, pageIndex, callback);	 
		},
		error:function(response){
			
		}
	});
}

//对note进行功能性操作
function operateNote(userID, URL, pageIndex, noteIndex, which, upordown, callback){
	//which 有0，1，2 三个选项：0-赞功能，1-关注功能，2-收藏功能
	//upordown 有0，1 两个选项：0-增加， 1-减少
	jQuery.ajax({
		url:'/operateNote',
		type:'post',
		data:{
			userID: userID,
			URL: URL,
			pageIndex: pageIndex,
			noteIndex: noteIndex,
			which: which,
			upordown: upordown 
		},
		success:function(response){
			//console.log(response);

			$activeA = $(".activeOperation");

			if(which == 0){
				if(upordown == 0){//点赞
					$activeA.removeClass("notePraiseA");
					$activeA.addClass("noNotePraiseA");
					$activeA.html('<span class="glyphicon glyphicon-thumbs-up"></span><span> 已赞('+response.result.length+')</span>');
					if($activeA.parent().hasClass("panel-footer")){
						$activeA.parent().siblings(".panel-body").data().praises = response.result;
					}
				}else{//取消赞
					$activeA.removeClass("noNotePraiseA");
					$activeA.addClass("notePraiseA");
					$activeA.html('<span class="glyphicon glyphicon-thumbs-up"></span><span> 赞('+response.result.length+')</span>');
					if($activeA.parent().hasClass("panel-footer")){
						$activeA.parent().siblings(".panel-body").data().praises = response.result;
					}
				}
			}
			else if(which==1){
				if(upordown == 0){//+关注
					$activeA.removeClass("noteConcernA");
					$activeA.addClass("noNoteConcernA");
					$activeA.html('<span class="glyphicon glyphicon-eye-close"></span><span> 已关注('+response.result.length+')</span>');
					if($activeA.parent().hasClass("panel-footer")){
						$activeA.parent().siblings(".panel-body").data().concerns = response.result;
					}
				}else{//-关注
					$activeA.removeClass("noNoteConcernA");
					$activeA.addClass("noteConcernA");
					$activeA.html('<span class="glyphicon glyphicon-eye-open"></span><span> 关注('+response.result.length+')</span>');
					if($activeA.parent().hasClass("panel-footer")){
						$activeA.parent().siblings(".panel-body").data().concerns = response.result;
					}
				}
			}
			else{
				if(upordown == 0){//+收藏
					$activeA.removeClass("noteCollectA");
					$activeA.addClass("noNoteCollectA");
					$activeA.html('<span class="glyphicon glyphicon-star"></span><span> 已收藏('+response.result.length+')</span>');
				}else{//-收藏
					$activeA.removeClass("noNoteCollectA");
					$activeA.addClass("noteCollectA");
					$activeA.html('<span class="glyphicon glyphicon-star-empty"></span><span> 收藏('+response.result.length+')</span>');
				}
			}
			
			$activeA.removeClass("activeOperation");
			//更新
			//getNotesOnAPage(URL, pageIndex, callback);	 
		},
		error:function(response){
			
		}
	});
}

//对reply进行功能性操作,只有赞与取消赞
function operateReply(userID, URL, pageIndex, noteIndex, replyIndex, upordown, callback){
	//upordown 有0，1 两个选项：0-增加， 1-减少
	jQuery.ajax({
		url:'/praiseOrNotReply',
		type:'post',
		data:{
			userID: userID,
			URL: URL,
			pageIndex: pageIndex,
			noteIndex: noteIndex,
			replyIndex: replyIndex,
			upordown: upordown 
		},
		success:function(response){
			console.log(response);

			$activeA = $(".activeReplyPraise");

			if(upordown == 0){//点赞
				$activeA.removeClass("replyPraise");
				$activeA.addClass("noReplyPraise");
				$activeA.html('<span class="glyphicon glyphicon-thumbs-up"></span><span> 已赞('+response.result.length+')</span>');
			}else{//取消赞
				$activeA.removeClass("noReplyPraise");
				$activeA.addClass("replyPraise");
				$activeA.html('<span class="glyphicon glyphicon-thumbs-up"></span><span> 赞('+response.result.length+')</span>');
			}
		
			
			$activeA.removeClass("activeReplyPraise");
			//更新
			//getNotesOnAPage(URL, pageIndex, callback);	 
		},
		error:function(response){
			
		}
	});
}

//得到用户资料
function getProfiles(target_userID){
	jQuery.ajax({
		url:'/getProfiles',
		type:'get',
		data:{
			userID: target_userID
		},
		success:function(response){
			if(response.status == "success"){
				//这个response比较复杂，直接作为参数给展示函数，具体内容可去该函数查看
				displayProfile(response);
			}
			else{
				alert(response.msg);
			}
		},
		error:function(response){
			console.log('ajax error');
		}
	})
}
//上传个人头像
function uploadHead(formdata){
	jQuery.ajax({
		url: '/uploadHead',
		type: 'post',
		data: formdata,
		mimeType:"multipart/form-data",
    	contentType: false,
        cache: false,
        processData:false,
		success:function(response){
			//reponse是head的img的相对地址
			$("#headPhoto").find("img").attr("src",response);
			//又可以上传新头像了，并且也可以点击保存了
			$("#uploadHead").text("上传头像").removeAttr("disabled");
			$("#saveHead").removeAttr("disabled");
		},
		error:function(response){
			
		}
	});
}
//保存个人头像
function saveHead(userID, head){
	//console.log(form_data);
	jQuery.ajax({
		url: '/saveHead',
		type: 'post',
		data: {
			userID: userID,
			headURL: head
		},
		success:function(response){
			$("#saveHead").text("保存成功！");
			setTimeout("$('#changeHead').popover('hide');",500);
			//过一阵再隐藏该popover，告诉用户已成功
		},
		error:function(response){
			console.log("ajax error");
		}
	});
}
//提交个人信息的修改
function updateProfiles(userID, nickname, mobilephone, email){
	//console.log(form_data);
	jQuery.ajax({
		url: '/updateProfiles',
		type: 'post',
		data: {
			userID: userID,
			nickname: nickname,
			mobilephone: mobilephone,
			email: email
		},
		success:function(response){
			//console.log(response);
			$("#submitFix").text("提交成功！");
			setTimeout("$('#submitFix').text('提交修改').removeAttr('disabled');",1000);
			//成功后的1秒后再显示回可提交状态
		},
		error:function(response){
			console.log("ajax error");	
		}
	});
}


