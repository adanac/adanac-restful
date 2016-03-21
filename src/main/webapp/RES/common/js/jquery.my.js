/**
 * 封装采用函数，便于后期统一处理请求错误
 */
jQuery.mypost = function(opt){
		var index = layer.load(0, {shade: false});
		$.ajax( {  
		    url:opt.url,// 跳转到 action  
		    type:'post',  
		    data:opt.params,
		    cache:false,  
		    dataType:'json',  
		    success:function(data) {  
		        if(data.status =="1" ){  
		        	opt.callback(data.result);
		        }else{  
		            alert(data.errorMsg); 
		        }  
		        layer.close(index);
		     },  
		     error : function(e) {  
		    	  layer.msg("异常！:"); 
		          layer.close(index);
		     }  
		});
	}

jQuery.isEmpty = function(obj){
	if(obj==null||obj==''||obj== undefined){
		return true;
	}
	return false;
}

jQuery.ajaxSubmit = function(opt){
	$.mypost({
		url:$(opt.form).attr("action"),
		params:$(opt.form).serialize(),
		callback:opt.success
	});
}

jQuery.getJsonByForm = function(frm){
	var o = {};
    var a = $(frm).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}