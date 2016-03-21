/**
 * 
 */
jQuery(document).ready(function() {    
	init();
});
//缓存
var array=new Array(4)

function init(){
	initDomLister();
	getTopPubNav();
}

function getTopPubNav(){
	$.mypost({
		 url:basePath+"/api/category/queryTopPubNavList.do",
		 callback:function(result){
			 showPubNav(result,1); 
			 array[0] = result;
		 }
	 });
}

function getNextPubNav(classId,level){
	var param = new Object();
	param.classId = classId;
	param.level = level;
	$.mypost({
		 url:basePath+"/api/category/queryNextLevelList.do",
		 params:param,
		 callback:function(result){
			 if(result.length==0||result==null){
	        		getMetaClass(classId);
	        	}else{
	        		showPubNav(result,level); 
	        		array[level-1] = result;
	        	}
		 }
	 });
}

function getMetaClass(classId){
	var param = new Object();
	param.classId = classId;
	
	$.mypost({
		 url:basePath+"/api/category/queryByLeafClassId.do",
		 params:param,
		 callback:function(result){
			 showMetaClass(result); 
	         array[3] = result;
		 }
	 });
}

//data:[{"mapId":0,"state":0,"classId":1005159,"parentClassId":0,"className":"母婴","containsMetaclass":0}]
//level:类目层次
function showPubNav(data,level){
	if(data.length==0||data==null){
		return;
	}
	
	var html = '<div class="pus_section ';
	if(level==1){
		html += "first";
	}
	html += '" data-level="'+level+'"><div class="pus_section_head">';
			       
	html += '<input class="form-control pus_sename" placeholder="请输入分类名称"></div><div class="pus_section_body"><div class="pus_section_list" id="pus_seli1"><ul id="pus_ul_'+level+'">';
	
	html = html +'</ul></div></div></div>';
	
	$("#pus_section_tab").append(html);
	showPubNavLi(data,level);
	//pusSenameLister();
}

function showPubNavLi(data,level){
	var html = "";
	for(var i=0;i<data.length;i++){
		var row = data[i];
		var liHtml = '<li><a href="javascript:void(0);" data-id="'+row.classId+'">'+row.className+'</a></li>';	
		html += liHtml;
	}
	$("#pus_ul_"+level).html(html);
}

//data:[{"mapId":0,"state":0,"classId":1005159,"parentClassId":0,"className":"母婴","containsMetaclass":0}]
//level:类目层次
function showMetaClass(data){
	if(data.length==0||data==null){
		return;
	}
	
	var html = '<div class="pus_section " data-level="999"><div class="pus_section_head">';
			       
	html += '<input class="form-control pus_sename" placeholder="请输入品类名称"></div><div class="pus_section_body"><div class="pus_section_list" id="pus_seli1"><ul id="pus_ul_999">';
	
	html = html +'</ul></div></div></div>';
	
	$("#pus_section_tab").append(html);
	showMetaClassLi(data);
	
}

function showMetaClassLi(data){
	var html = "";
	for(var i=0;i<data.length;i++){
		var row = data[i];
		var liHtml = '<li><a class="metaclass" href="javascript:void(0);" data-id="'+row.metaclassId+'">'+row.metaclassName+'</a></li>';	
		html += liHtml;
	}
	$("#pus_ul_999").html(html);
}

function removePubNav(level){
	$(".pus_section").each(function(){
		var thislevel = parseInt($(this).attr("data-level"));
		if(thislevel>level){
			console.log("thislevel>level");
			$(this).remove();
			array.pop();
		}
	});
}

function initPusNavListLister(){
	var search_keyword;
	var address_interval;
	var last_val;
	var level;
	var clear_interval = function() {
		if (address_interval)
			window.clearInterval(address_interval);
	};
	
	$("#pus_section_tab")
	.on(
			'click',
			'.pus_section_list>ul>li>a',function(){
				$(this).parents('ul').find('a').removeClass('checked');
			       $(this).addClass('checked');
			       
			       var classId = $(this).attr("data-id");
			       var level = parseInt($(this).parents('.pus_section').attr("data-level"));
			       //品类的Level 是999  等于999表示是该次点击的是品类
			       if(level<999){
			    	   removePubNav(level);
			    	   getNextPubNav(classId,level+1);
			       }
			       showTipPath();
			}).on(
					'focus',
					'.pus_section_head>input',function(){
						var that = $(this);
						last_val = that.val().trim();
						level = parseInt($(this).parents('.pus_section').attr("data-level"));
						clear_interval();
						address_interval = window.setInterval(function() {
							search_keyword = that.val().trim();
							if(search_keyword!=""&&search_keyword!=last_val){
								var data = new Array();
								var list = (level==999?array[3]:array[level-1]);
								for(var i=0;i<list.length;i++){
									var row = list[i];
									if(level!=999){
										if(row.className.indexOf(search_keyword)==0){
											data.push(row);
										}
									}else{
										if(row.metaclassName.indexOf(search_keyword)==0){
											data.push(row);
										}
									}
									
								}
								
								if(level!=999){
									showPubNavLi(data,level);
								}else{
									showMetaClassLi(data);
								}
								last_val = search_keyword;
							}else if(search_keyword==""){
								if(level!=999){
									showPubNavLi(array[level-1],level);
								}else{
									showMetaClassLi(array[3]);
								}
							}
						}, 100);
			}).on('blur','.pus_section_head>input',function(){
				clear_interval();	
			});
}

function showTipPath(){
	var select_path = "您当前选择的是：";
    var path = "";
    var pathIds = "";
    $('.pus_section_list').find('a').each(function(i){
 	   var $this = $(this);
 	   if($this.hasClass("checked")){
 		   if($this.hasClass("metaclass")){
 			   path = path + " > "+$this.html();
 		   }else{
 			   if(path!=""){
 				   path = path + "/"+$this.html();
 				   pathIds = pathIds + "|" + $this.attr("data-id");
 			   }else{
 				   path = $this.html();
 				   pathIds = $this.attr("data-id");
 			   }
 			   
 		   }
 	   }
    });
    $("#select_path_tip").html(select_path+path);
    $("#select_path_tip").attr("pathIds",pathIds);
    $("#select_path_tip").attr("path",path);
}

function initDomLister(){
	$('#search_product').on('click', function(event) {
   	 window.location.href=basePath+"/search/product.do"; ; 
       event.preventDefault();
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
   
   
	   
   $('#publish_btn').on('click', function() {
	   var metaclassid = $("#pus_ul_999 .checked").attr("data-id");
	   var metaclassName = $("#pus_ul_999 .checked").html();
	   if($.isEmpty(metaclassid)){
		   layer.msg('您还没有选择品类');
		   return;
	   }
	   var href = "${base}/product/form.do?metaClassId="+metaclassid;
	   href += "&metaClassName="+encodeURIComponent(encodeURIComponent(metaclassName));
	   href += "&classPath="+encodeURIComponent(encodeURIComponent($("#select_path_tip").attr("path")));
	   href += "&classIds="+$("#select_path_tip").attr("pathIds");
       window.location.href=href; 
   });   

   $('.pus_sename').on('keyup', function(event) {
       highlight($(this),$('#pus_seli1'));
       event.preventDefault();
   });

   $('#show_agreement').on('click', function(event) {
       layer.open({
           type: 2,
           title: '协议内容',
           shadeClose: true,
           shade: 0.8,
           area: ['60%', '90%'],
           content: resRoot+'/assets/agreement.html'
       });
       event.preventDefault();
   });
   
   initPusNavListLister();
}