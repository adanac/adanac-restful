// 文件上传
jQuery(function() {
    var uploader,
    	$uploadBtn = $("#upload_btn");

    uploader = WebUploader.create({

        // 不压缩image
        resize: false,

        // swf文件路径
        swf: 'http://localhost:8089/adanac-restful/RES/plugins/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: 'http://localhost:8089/adanac-restful/upload.file',

        duplicate:true
       /* fileNumLimit:9*/
    });


    uploader.on( 'uploadSuccess', function( file,data ) {
       // console.info(data);
    	layer.msg('上传成功');
    });

    uploader.on( 'uploadError', function( file ) {
    	layer.msg('上传出错');
    });

    uploader.on( 'uploadComplete', function( file ) {
    	layer.msg("上传完成");
    });

    $uploadBtn.on( 'click', function() {
        layer.msg($("input[name='file'][name='first_img']").val());
    });
    
    console.log(uploader);


});
