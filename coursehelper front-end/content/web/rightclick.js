function genericOnClick(info, tab) {
  if(localStorage.logged){
    var rangy_selection = rangy.getSelection();
    //console.log(rangy_selection.getBoundingClientRect())

    var ser_selection = rangy.serializeSelection(rangy_selection,true);

    //rangy使用了他的序列化。
    //rangy_selection.refresh();
    //rangy.deserializeSelection(String serializedSelection);
    var src = "http://127.0.0.1:8880/noteRecord";
    $.modal('<iframe src="' + src + '" id="noteRecordFrame" >', {
      closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
      overlayId: 'note-overlay',
      containerId: 'note-container',
      opacity:5,
      position: [$("body").height()-535,$("body").width()-750],
      onShow: function(){
        $("#noteRecordFrame").load(function(){
          var iframedata = new Object();
          iframedata.key="userid" ;
          iframedata.value=localStorage.id ;
          window.frames[1].postMessage(iframedata,src);

          var iframedata = new Object();
          iframedata.key="url" ;
          iframedata.value=DEFAULT_URL ;
          window.frames[1].postMessage(iframedata,src);

          var iframedata = new Object();
          iframedata.key="name" ;
          iframedata.value=document.title ;
          window.frames[1].postMessage(iframedata,src);

          var iframedata = new Object();
          iframedata.key = "page";
          iframedata.value = PDFView.page ;
          window.frames[1].postMessage(iframedata,src);

          var iframedata = new Object();
          iframedata.key = "about";
          iframedata.value = ''+ rangy_selection ;
          window.frames[1].postMessage(iframedata,src);

          var iframedata = new Object();
          iframedata.key = "selection";
          iframedata.value = ser_selection ;
          window.frames[1].postMessage(iframedata,src);
        });
      }
    });
  }
  else{
    alert("请登录！");
  }
}

// Create one test item for each context type.
var contexts = ["page","selection"];
chrome.contextMenus.removeAll(function (){
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title ;

    if(context == "page")
        title = "为本页记笔记/提问" ;
    else
        title = "针对 '%s' 记笔记/提问" ;

    var id = chrome.contextMenus.create({"title": title, 
                                "contexts":[context],
                                "onclick": genericOnClick});
    console.log("'" + context + "' item:" + id);
  }
});

//update 后的 入口方式！！

$(document).ready(function(){
  //可收起笔记区域
  $("#middle").click(function(){
    if($(this).attr("data")=="open"){
      $(this).attr("data","close");
      $("#left").css("width","98%");
      $("#right").css("width","0%");
      $(this).find("p").text("<<展开笔记区域<<");
      var event = document.createEvent('UIEvents');
      event.initUIEvent('resize', false, false, window, 0);
      window.dispatchEvent(event);
    }else{
      $(this).attr("data","open");
      $("#left").css("width","61%");
      $("#right").css("width","37%");
      $(this).find("p").text(">>收起笔记区域>>");
      var event = document.createEvent('UIEvents');
      event.initUIEvent('resize', false, false, window, 0);
      window.dispatchEvent(event);
    }
  });
  

  //selection的下角标
  $(document).on("mouseup",".page .textLayer",function (e){
    var selection = window.getSelection();
    if(selection.type == "Range"){
      range = selection.getRangeAt(0);        
      $("#recordTooltip").css({"display":"block","left":e.pageX+5,"top":e.pageY+5});
      //以鼠标up时的坐标来作为显示的基坐标
    }       
  }); 
  //取消selection的下角标
  $(document).on("mousedown",".page .textLayer",function(){
    $("#recordTooltip").css({"display":"none"});     
  }); 

  $(document).on("click","#recordTooltip",function(){
    $(this).css({"display":"none"}); 
    if(localStorage.logged){
      var rangy_selection = rangy.getSelection();
      //console.log(rangy_selection.getBoundingClientRect())

      var ser_selection = rangy.serializeSelection(rangy_selection,true);

      //rangy使用了他的序列化。
      //rangy_selection.refresh();
      //rangy.deserializeSelection(String serializedSelection);
      var src = "http://127.0.0.1:8880/noteRecord";
      $.modal('<iframe src="' + src + '" id="noteRecordFrame" >', {
        closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
        overlayId: 'note-overlay',
        containerId: 'note-container',
        opacity:5,
        position: [$("body").height()-535,$("body").width()-750],
        onShow: function(){
          $("#noteRecordFrame").load(function(){
            var iframedata = new Object();
            iframedata.key="userid" ;
            iframedata.value=localStorage.id ;
            window.frames[1].postMessage(iframedata,src);

            var iframedata = new Object();
            iframedata.key="url" ;
            iframedata.value=DEFAULT_URL ;
            window.frames[1].postMessage(iframedata,src);

            var iframedata = new Object();
            iframedata.key="name" ;
            iframedata.value=document.title ;
            window.frames[1].postMessage(iframedata,src);

            var iframedata = new Object();
            iframedata.key = "page";
            iframedata.value = PDFView.page ;
            window.frames[1].postMessage(iframedata,src);

            var iframedata = new Object();
            iframedata.key = "about";
            iframedata.value = ''+ rangy_selection ;
            window.frames[1].postMessage(iframedata,src);

            var iframedata = new Object();
            iframedata.key = "selection";
            iframedata.value = ser_selection ;
            window.frames[1].postMessage(iframedata,src);
          });
        }
      });
    }
    else{
      alert("请登录！");
    }
    return false;
  });
});