// 文件上传
function initUploader(id){
    var $ = jQuery,
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
        
        pick:id,

        duplicate:false,
        fileNumLimit:1
    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
    	uploader.makeThumb( file, function( error, src ) {
   		 if ( error ) {
   		     layer.msg( '不能预览' );
   		     return;
   		 }
   		 
   		 $(id).find("img").attr("src",src);
   		 
   		}, 100, 100 );
    	
    	layer.load(0, {shade: false});
        uploader.upload();
    });

    uploader.on('beforeFileQueued',function(file){


    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        
    });

    uploader.on( 'uploadSuccess', function( file,data ) {
    	var imgUrl = data.url;
    	
    	$(id).attr("data-imgurl",imgUrl);
    	$(id).addClass("uploaded");
    	
    });

    uploader.on( 'uploadError', function( file ) {
    	layer.msg('上传出错');
    });

    uploader.on( 'uploadComplete', function( file ) {
    	layer.msg("上传完成");
    	layer.closeAll("loading");
    });

    uploader.on( 'all', function( type ) {

    });

};

