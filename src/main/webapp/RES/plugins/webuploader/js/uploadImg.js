// 文件上传
function initUpload(id) {
    var pickId = id,
   		container = $("#"+id).parents(".fileinput"),
   		$delBtn = container.find(".del-img"),
    	state = 'pending',
        uploader,
        isSupportBase64 = ( function() {
            var data = new Image();
            var support = true;
            data.onload = data.onerror = function() {
                if( this.width != 1 || this.height != 1 ) {
                    support = false;
                }
            }
            data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            return support;
        } )();

    uploader = WebUploader.create({

        // 不压缩image
        resize: false,

        // swf文件路径
        swf: 'http://localhost:8089/adanac-restful/RES/common/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'http://localhost:8089/adanac-restful/upload.file',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {id:'#'+id,multiple:false},
        duplicate:true,
        fileNumLimit:10
    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
    	
    	uploader.makeThumb( file, function( error, src ) {
   		 if ( error ) {
   		     $wrap.text( '不能预览' );
   		     return;
   		 }
   		showImage(id,src,file.id);
   		}, 200, 200 );
    	
    	layer.load(0, {shade: false});
        uploader.upload();
    });

    uploader.on('beforeFileQueued',function(file){
    	
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        /*var $li = $( '#'+file.id ),*/
    	
    });

    uploader.on( 'uploadSuccess', function( file,data ) {
    	container.addClass("img_url_provide");
    	container.attr("img-url",data.url);
    	$delBtn.show();
    	layer.closeAll("loading");
    });

    uploader.on( 'uploadError', function( file ) {
    });

    uploader.on( 'uploadComplete', function( file ) {
    });

    uploader.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }
    });
    
    $delBtn.click(function(){
    	container.removeClass("img_url_provide");
    	container.find("img").remove();
    	var url = container.attr("img-url");
    	container.attr("img-url","");
    	var picsInput = $("#product_edit_form > input[name='pics']");
    	var pics=(undefined==picsInput.val())?'':picsInput.val().replace(url+"|",'');
//    	var pics = picsInput.val().replace(url+"|","");
//    		pics = picsInput.val().replace(url,"");
    		pics = (undefined==picsInput.val())?'':picsInput.val().replace(url,"");
    		
    		$delBtn.hide();	
    });

};

$(function(){
	initUpload("fileinput-new-1");
	initUpload("fileinput-new-2");
	initUpload("fileinput-new-3");
	initUpload("fileinput-new-4");
	initUpload("fileinput-new-5");
});

function showImage(id,src,fid){
	var preview = $("#"+id).parents(".fileinput").find(".thumbnail");
	var html = '<img id="upload-img-'+fid+'" src="'+src+'" style="width:190px;height:190px;"/>';
	preview.html("");
	preview.append(html);
}

function showUploadedImage(id,src){
	var container = $("#"+id).parents(".fileinput"),
		$delBtn = container.find(".del-img"),
		preview = container.find(".thumbnail");
	
	var html = '<img src="'+src+'" style="width:190px;height:190px;"/>';
	preview.html("");
	preview.append(html);
	
	container.addClass("img_url_provide");
	container.attr("img-url",src);
	
	console.log($delBtn);
	
	$delBtn.show();
}


function assembleImgs(){
	$("#product_edit_form > input[name='pics']").val("");
	
	var url = $(".firstimg").attr("img-url");
	if($.isEmpty(url)){
		layer.msg("您还没有选择商品主图片");
		return;
	}
	
	$(".img_url_provide").each(function(){
		var src = $(this).attr("img-url");
		
		var pics = $("#product_edit_form > input[name='pics']").val();
		if(!$.isEmpty(pics)){
			pics =pics + "|";
		}
		$("#product_edit_form > input[name='pics']").val(pics+src);
	});
}
