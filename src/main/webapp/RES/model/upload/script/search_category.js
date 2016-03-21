 jQuery(document).ready(function() {    
	 	init();
    });
 
 function init(){
	 initDomListener();
	 searchClassPath();
 } 
 
function searchClassPath(){
	 var search_key = $("#search_category_input").val().trim();
	 if(search_key.length>0){
		 var params = new Object();
		 params.keyWord = search_key;
		 $.mypost({
			 url:basePath+"/api/category/queryTreePathByKeyWord.do",
			 params:params,
			 callback:function(result){
				 showSearchResult(result);
			 }
		 });
	 }
}
 
//<li><a href="javascript:void()">彩妆/香水/美妆工具 >> 指甲油/美甲产品（新） >> 指甲彩妆</a></li>
function showSearchResult(result){
	var html = "";
	for(var i=0;i<result.length;i++){
		var row = result[i];
		html +='<li><a href="javascript:void(0);" data-metaClassName="'+row.metaClassName+'" data-classIds="'+row.classIds+'" data-metaclassid="'+row.metaClassId+'">'+row.path+'</a></li>';
	}
		
	$("#search_result_list").append(html);	
	$("#search_count_tip").html(result.length);
}

function getSpuFromServer(metaClassId){
	//http://localhost:8888/cissTool-web/api/spu/querySpuByMetaClass.do?metaClassId=2
	var params = new Object();
	params.metaClassId = metaClassId;
	$.mypost({
		params:params,
		url:basePath+"/api/spu/querySpuByMetaClass.do",
		callback:function(result){
//			layer.msg("加载成功");
			var html = "";
			for(var i=0;i<result.length;i++){
				var row = result[i];
				var picUrl = "";
				if(!$.isEmpty(row.pic)){
					picUrl = row.pic.fpicUrl;
				}
				
				html += '<li><a title="'+row.fspuTitle+'" href="'+basePath+'/product/detail.do?spuId='+row.fspuId+'"><img src="'+picUrl+'"></a></li>';
			}
			$("#product_emp_list").html(html);
		}
	});
}
 
 function initDomListener(){
	 	$('#search_product').on('click', function(event) {
       	 window.location.href=basePath+"/search/product.do"; ; 
           event.preventDefault();
           /* Act on the event */
       });


    	$('#search_category_btn').on('click', function(event) {
    		   var search_key = $('#search_category_input').val().trim();
    		   if(search_key.length==0){
    			   layer.msg('您还没有输入类目名');
    			   return;
    		   }
    		   var href = basePath+"/search/category.do?searchKey="+encodeURIComponent(encodeURIComponent(search_key));
    	       window.location.href=href; 
    	       event.preventDefault();
    	 });


        // secate_list
        $('#search_result_list').on('click','li>a' ,function(event) {

            $(this).parents('ul').find('a').removeClass('checked');
            $(this).addClass('checked');
            
            $("#publish_btn").removeClass("disabled");
            
            getSpuFromServer($(this).attr("data-metaclassid"));

            event.preventDefault();
            /* Act on the event */
        });
        
        $("#publish_btn").click(function(){
        	if($(this).hasClass("disabled")){
        		layer.msg("请先选择类目再点击发布");
        	}else{
        	   var $li = $('#search_result_list>li').find(".checked");
    		   var href = "${base}/product/form.do?metaClassId="+$li.attr("data-metaclassid");
	    		   href += "&metaClassName="+encodeURIComponent(encodeURIComponent($li.attr("data-metaclassname")));
	    		   href += "&classPath="+encodeURIComponent(encodeURIComponent($li.html()));
	    		   href += "&classIds="+$li.attr("data-classids");
	    	       window.location.href=href; 
        	}
        });


        $('#show_agreement').on('click', function(event) {
            layer.open({
                type: 2,
                title: '弹出查看协议内容',
                shadeClose: true,
                shade: 0.8,
                area: ['60%', '90%'],
                content: 'agreement.html'
            });
            event.preventDefault();
            /* Act on the event */
        });
 }