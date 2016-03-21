$(function(){
	initDataGrid();
})

$.serializeObject = function (form) {
    var o = {};
    $.each(form.serializeArray(), function (index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
};
//搜索过滤
$('#search_btn').on('click',function(){
	
	var query_form = $('#query_form');
	
	var parm = $.serializeObject(query_form);
	
	$("#dataGrid").datagrid( "page",1);//重置为第一页
	$("#dataGrid").datagrid( "fetch",parm);
	
}); 

//切换商品列表展示
$('#tabs').delegate('#tab','click',function(){
	var tabval = $(this).attr("value");
	$("#fskuState").val(tabval);
	var query_form = $('#query_form');
	
	var parm = $.serializeObject(query_form);
	
	$("#dataGrid").datagrid( "page",1);//重置为第一页
	$("#dataGrid").datagrid( "fetch",parm);
	
	if("1"==tabval){
		$("#batch_opt_pane > .btn-down").show();
		$("#batch_opt_pane > .btn-up").hide();
	}else if("2"==tabval){
		$("#batch_opt_pane > .btn-down").hide();
		$("#batch_opt_pane > .btn-up").show();
	}else if("3"==tabval){
		$("#batch_opt_pane > .btn-down").hide();
		$("#batch_opt_pane > .btn-up").hide();
	}else{
		$("#batch_opt_pane > .btn-down").hide();
		$("#batch_opt_pane > .btn-up").hide();
	}
}); 

function initDataGrid(){
	   var datagrid = $("#dataGrid").datagrid({
	    	url: basePath+"/product/list.do",
	    	noData: '<table class="table table-striped table-bordered table-hover dataTable no-footer ta_c product_list_table" id="sample_2" role="grid" aria-describedby="sample_2_info">'+
                '<thead>'+
		            '<tr>'+
		                '<th class="ta_c wb5">'+
		                '<input type="checkbox" class="group-checkable" id="checkbox_all"></th>'+
		                '<th class="ta_c wb10">商品编码</th>'+
		                '<th class="ta_c wb10">商品图片</th>'+
		                '<th class="ta_c wb20">商品名称</th>'+
		                '<th class="ta_c wb20">供应商</th>'+
		                '<th class="ta_c ">品牌</th>'+
		                '<th class="ta_c wb10">分类</th>'+
		                '<th class="ta_c ">价格</th>'+
		                '<th class="ta_c wb5">库存</th>'+
		                '<th class="ta_c wn120">商品状态</th>'+
		                '<th class="ta_c wn150">操作</th>'+
		            '</tr>'+
                 '</thead>',
	        col:
	         [{
				field: "fskuId",
			    title: '<input type="checkbox" id="checkAll" name="checkAll">',
			  	render: function( data ) {
			  		var str='<input type="checkbox" name="subBox" status= "'+data.row.fskuState+'" value="' + data.value + '"';
			  		if(1 != data.row.fskuState&&2 != data.row.fskuState)
		  			{
			  			str += 'disabled';
		  			}
			  		str = str + '>';
			  		return str;
			    },
  	            attr: { "class": "ta_c wb5" }
			  },{
  	            field: "fspuLocalCode",
  	            title: "商品编码",
  	            attr: { "class": "ta_c wb10" }
	  	      },{
	            field: "fpicUrl",
	            title: "商品图片",
	            render: function( data ) {
	            	return "<div id='upload_img_"+data.row.fskuId+"'><img  style='width:100px;height:100px;' src='" + data.value + "'</img></div>";
	            },
  	            attr: { "class": "ta_c wb10" }
	          },{
	            field: "fspuTitle",
	            title: "商品名称",
	            render: function( data ) {
	            	var str = data.row.fskuKeyAttrDesc;
	            	if($.isEmpty(str)){
	            		str = data.row.fskuKeyAttr;
	            	}
	            	var col = data.row.fspuTitle
	            	if(!$.isEmpty(str)){
	            		var skusAttrs = str.split(/[,|]/);
	            		if(skusAttrs.length>0){
	            			col+="("
	            			for(var i=0;i<skusAttrs.length;i++){
	            				var option = skusAttrs[i].split(":");
	            				if(option.length>1&&isNaN(option[1])){
	            					if(i==0){
	            						col += option[1];
	            					}else{
	            						col += ","+option[1]; 
	            					}
	            				}
	            			}
	            			col+=")";
	            		}
	            	}
	            	return col.replace("()","");
	            },
  	            attr: { "class": "ta_c wb20" }
		      },{
	            field: "supplierName",
	            title: "供应商",
	            attr: { "class": "ta_c wb10" }
			  },{
	            field: "fspuBrandName",
	            title: "品牌",
  	            attr: { "class": "ta_c wb10" }
		      },{
	            field: "classPath",
	            title: "分类",
  	            attr: { "class": "ta_c wb10" }
		      },{
	            field: "fskuReferPrice",
	            title: "价格",
	            render: function( data ) {
	            	return "￥" + data.value/100;
	            },
  	            attr: { "class": "ta_c" }
		      },{
	            field: "fskuNumber",
	            title: "库存",
  	            attr: { "class": "ta_c wb5" }
		      },{
	            field: "fskuState",
	            title: "商品状态",
	            attr: { "class": "ta_c wb10" },
	            render: function( data ) {
	            	if(1 == data.value ){
	            		return "已发布";
	            	}else if(2 == data.value){
	            		return "未发布";
	            	}else if(3 == data.value){
	            		return "违规下架";
	            	}else{
	            		return "未知";
	            	}
	            }
		      },{
	            field: "fskuId",
	            title: "操作",
	        	render: function( data ) {
                    var up = '<a style="display:inline;" href="javascript:;" class="btn btn-xs red" title="上架" disabled><i class="fa fa-upload"></i></a>';
                    var wdown = '<a style="display:inline;" href="javascript:;" class="btn btn-xs red" title="违规下架" disabled><i class="glyphicon glyphicon-ban-circle"></i></a>';
	        		var down = '<a style="display:inline;" href="javascript:;" class="btn btn-xs red" title="下架" disabled><i class="fa fa-download"></i></a>';
	        		if(1==data.row.fskuState){
		        			down = '<a style="display:inline;" id="downSku" value = "'+data.value+'" class="btn btn-xs red" title="下架"><i class="fa fa-download"></i></a>';
		        			wdown = '<a style="display:inline;" id="wdownSku" value = "'+data.value+'" class="btn btn-xs red" title="违规下架"><i class="glyphicon glyphicon-ban-circle"></i></a>';
        			}else if(2==data.row.fskuState || 3==data.row.fskuState){
        				up = '<a style="display:inline;" id="upSku" value = "'+data.value+'" class="btn btn-xs red" title="上架"><i class="fa fa-upload"></i></a>';
    				}
                    return '<a style="display:inline;" id="skuDetail" value = "'+data.row.fspuId+'" class="btn btn-xs green" title="查看"><i class="fa fa-search"></i></a>'+
                    '<a style="display:inline;" href="'+basePath+'/product/modify.do?spuId='+data.row.fspuId+'" class="btn btn-xs blue" title="编辑"><i class="fa fa-gear"></i></a>'+
                    down+up+wdown;
	        	},
  	            attr: { "class": "ta_c wb20" }
	          }],
		        attr: { "class": "table table-striped table-bordered table-hover dataTable no-footer ta_c product_list_table" },
				sorter: "bootstrap",
				pager: "bootstrap",
				paramsDefault: {paging:10},
		        onBefore: function() {
					
				},
				onData: function( data ) {
					
				},
				onRowData: function( data, num, $tr ) {
					
				},
				onComplete: function() {
					
					/*$("#dataGrid img").each(function(){
						console.log($(this).parent().attr("id"));
						initUploader("#"+$(this).parent().attr("id"));
					});*/
					
							            
				}
	    })
}
//全选
$("#dataGrid").delegate("#checkAll","click",function(){
	var tabval = $("#fskuState").val();
	console.log((tabval=="1"||tabval=="2"));
	if(!(tabval=="1"||tabval=="2")){
		return;
	}
	//全选
	if($(this).prop("checked"))
	{
		$("[name='subBox']").each(function(){
			var value = $(this).attr("status");
			$(this).prop("checked","true");
		});
	}
	//全不选
	else
	{
		$("[name='subBox']").each(function(){
			$(this).removeAttr("checked");
		});
	}
})

//上架Sku
$("#dataGrid").delegate("#upSku","click",function(){
		var ids = $(this).attr("value");
		dowmSku(ids,1);
})
//下架Sku
$("#dataGrid").delegate("#downSku","click",function(){
		var ids = $(this).attr("value");
		dowmSku(ids,2);
})
//违规下架Sku
$("#dataGrid").delegate("#wdownSku","click",function(){
		var ids = $(this).attr("value");
		dowmSku(ids,3);
})
//一级类目查询二级类目
$("#nav1").click(function(){
	var classId1 = $(this).val();
	if(classId1=="")
	{
		$("#nav2").html("");
		$("#nav3").html("");
		$("#nav4").html("");
		$("#nav5").html("");
	}
	else
	{
		var params = new Object();
		params.mapId = 0;
		params.classId = classId1;
		$.mypost({
			 url:basePath+"/api/category/queryNextLevelList.do",
			 params:params,
			 callback:function(result){
				var options = '<option value="">--请选择--</option>';
				$.each(result,function(i,res){
					options += '<option value="'+res.classId+'">'+res.className+'</option>'
				});
				$("#nav2").html(options);
			 }
		 })
	}
});

//二级类目查询三级类目
$("#nav2").click(function(){
	var classId2 = $(this).val();
	if(classId2=="")
	{
		$("#nav3").html("");
		$("#nav4").html("");
		$("#nav5").html("");
	}
	else
	{
		var params = new Object();
		params.mapId = 0;
		params.classId = classId2;
		$.mypost({
			 url:basePath+"/api/category/queryNextLevelList.do",
			 params:params,
			 callback:function(result){
				var options = '<option value="">--请选择--</option>';
				$.each(result,function(i,res){
					options += '<option value="'+res.classId+'">'+res.className+'</option>'
				});
				$("#nav3").html(options);
			 }
		 })
	}
});

//三级类目查询品类
$("#nav3").click(function(){
	var classId3 = $(this).val();
	if(classId3=="")
	{
		$("#nav4").html("");
		$("#nav5").html("");
	}
	else
	{
		var params = new Object();
		params.mapId = 0;
		params.classId = classId3;
		$.mypost({
			 url:basePath+"/api/category/queryByLeafClassId.do",
			 params:params,
			 callback:function(result){
				var options = '<option value="">--请选择--</option>';
				$.each(result,function(i,res){
					options += '<option value="'+res.metaclassId+'">'+res.metaclassName+'</option>'
				});
				$("#nav4").html(options);
			 }
		 })
	}
});

//品类查询品牌
$("#nav4").click(function(){
	var classId4 = $(this).val();
	if(classId4=="")
	{
		$("#nav5").html("");
	}
	else
	{
		var params = new Object();
		params.metaClassId = classId4;
		$.mypost({
			 url:basePath+"/api/attr/queryBrand.do",
			 params:params,
			 callback:function(result){
				console.info(result);
				var options = '<option value="">--请选择--</option>';
				$.each(result,function(i,res){
					options += '<option value="'+res.brandId+'">'+res.brandName+'</option>'
				});
				$("#nav5").html(options);
			 }
		 })
	}
});

// 查询商品详情
$("#dataGrid").delegate("#skuDetail","click",function(){
	var spuId = $(this).attr("value");
	window.location.href =basePath+"/product/detail.do?spuId="+spuId;
});

// 清除条件
$("#clear_btn").click(function(){
	$("#fspuTitle").val("");
	$("#fspuLocalCode").val("");
	$('span[id^="select2-chosen"]').html("");
	
	reSetting(0);
});

function reSetting(l){
	if(l<=4){
		$("#nav5").html('<option value=""></option>');
		$("#nav5").val("");
		$("#nav5").change();
	}
	if(l<=3){
		$("#nav4").html('<option value=""></option>');
		$("#nav4").val("");
		$("#nav4").change();
	}
	if(l<=2){
		$("#nav3").html('<option value=""></option>');
		$("#nav3").val("");
		$("#nav3").change();
	}
	if(l<=1){
		$("#nav2").html('<option value=""></option>');
		$("#nav2").val("");
		$("#nav2").change();
	}
	
	if(l<=0){
		$("#nav1").val("");
		$("#nav1").change();
	}
	
	
}

//批量下架
function allDownSku()
{
	var str = "";
	$("[name='subBox']:checked").each(function(){
		str += $(this).attr("value")+",";
	});
	str = str.substring(0,str.length-1);
	if(str.length==0)
	{
		alert("请选择要下架的商品");
		return;
	}
	dowmSku(str,2);
}

//批量下架
function allUpSku()
{
	var str = "";
	$("[name='subBox']:checked").each(function(){
		str += $(this).attr("value")+",";
	});
	str = str.substring(0,str.length-1);
	if(str.length==0)
	{
		alert("请选择要上架的商品");
		return;
	}
	dowmSku(str,1);
}

//下架
function dowmSku(ids,status)
{
	var str;
	if(status ==1)
	{
		str = "确定要上架商品么？";
	}else if(status ==2)
	{
		str = "确定要下架商品么？";
	}else if(status ==3)
	{
		str = "确定要违规下架商品么？";
	}
	if(confirm(str))
	{
		var params = new Object();
		params.fskuIds = ids;
		params.fskuState = status;
		$.mypost({
			 url:basePath+"/product/downSku.do",
			 params:params,
			 callback:function(result){
				if(result=="1")
				{
					$('#search_btn').click();
				}
				else
				{
					alert("下架失败！");	
				}
			 }
		 })
	}
}

