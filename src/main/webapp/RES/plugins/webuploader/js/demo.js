// 文件上传
$list = $('#thelist'),
jQuery(function() {
    var $ = jQuery,
        $btn = $('#ctlBtn'),
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
        swf: resRoot + '/common/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: basePath+'/upload.file',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {id:'#picker',multiple:false},
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
   		showImage(src,file.id);
   		}, 200, 200 );
    	
    	layer.load(0, {shade: false});
        uploader.upload();
    });

    uploader.on('beforeFileQueued',function(file){
       //验证图片个数
    	var imglength =   $list.find('.img_url_provide').length;
        if(imglength < 5){
            return true;
        }else{
            layer.msg('最多只能上传5张');
            return false;
        }
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        /*var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 100 + '%' );*/
    	
    });

    uploader.on( 'uploadSuccess', function( file,data ) {
    	/*var pics = $("#product_edit_form > input[name='pics']").val();
    	if(pics!=null||pics!=""){
    		pics += "|";
    	}
    	$("#product_edit_form > input[name='pics']").val(pics+data.url);*/
    	$("#id_"+file.id).attr("img-url",data.url);
    	$("#id_"+file.id).find(".thumbnail").css("background","white");
    	$("#id_"+file.id).find(".uploading-product-img").attr("src",data.url);
    	/*$(".uploading-file .deleImg").remove();*/
    	layer.closeAll("loading");
    	//layer.msg("上传成功");
    });

    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find('p.state').text('上传出错');
    });

    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').fadeOut();
    });

    uploader.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }

        if ( state === 'uploading' ) {
            $btn.text('暂停上传');
        } else {
            $btn.text('开始上传');
        }
    });

    /*$btn.on( 'click', function() {
        if ( state === 'uploading' ) {
            uploader.stop();
        } else {
        	layer.load(0, {shade: false});
            uploader.upload();
        }
    });*/


    $('#thelist').on('click','.deleImg',function(event){
        $(this).parents(".fileinput-new").remove();
    });


});

function showImage(src,fileid){
	var html = '<div id="id_'+fileid+'" class="fileinput fileinput-new uploading-file img_url_provide" data-provides="fileinput" style="height:200px;overflow: visible;">'
           + '<div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 200px;position: relative;overflow: visible;">';
             
	html += '<div class="deleImg" style="position:absolute;top:-10px;right: -10px; " class="del"><img src="'+resRoot+'/common/images/delete.png"/></div>';
	
	html =html+ '<img class="uploading-product-img"  style="width: 200px; height: 190px;overflow: hidden;" src="'+src+'">' +'</div></div>';
	//$list.prepend(html);
	
	$(html).insertBefore("#uploader");
}

function showUploadedImage(src){
	var html = '<div img-url="'+src+'" class="fileinput fileinput-new uploading-file img_url_provide" data-provides="fileinput" style="height:200px;overflow: visible;padding-bottom:10px;">'
           + '<div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 200px;position: relative;overflow: visible;">';
	
	html += '<div class="deleImg" style="position:absolute;top:-10px;right: -10px; " class="del"><img src="'+resRoot+'/common/images/delete.png"/></div>';
	
	html =html+ '<img class="uploading-product-img" style="width: 200px; height: 190px;overflow: hidden;" src="'+src+'">' +'</div></div>';
	//$list.prepend(html);
	$(html).insertBefore("#uploader");
	/*var pics = $("#product_edit_form > input[name='pics']").val();
	if(!$.isEmpty(pics)){
		pics =pics + "|";
	}
	$("#product_edit_form > input[name='pics']").val(pics+src);*/
}

function assembleImgs(){
	$("#product_edit_form > input[name='pics']").val("");
	$(".img_url_provide").each(function(){
		var src = $(this).attr("img-url");
		
		var pics = $("#product_edit_form > input[name='pics']").val();
		if(!$.isEmpty(pics)){
			pics =pics + "|";
		}
		$("#product_edit_form > input[name='pics']").val(pics+src);
	});
}
