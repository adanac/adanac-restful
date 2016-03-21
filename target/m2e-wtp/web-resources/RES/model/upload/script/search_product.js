$(function(){
	//查询分页
	initDataGrid();
})

function initDataGrid(){
	   var datagrid = $("#dataGrid").datagrid({
	    	url: "${base}/search/product.do",
	    	noData: '<table class="table table-bordered table-hover">'+
            '<thead>'+
	            '<tr>'+
	            '<th class="wb10">商品图片</th>'+
	                '<th class="wb10">商品名称</th>'+
	                '<th class="wb10">品牌</th>'+
	                '<th class="wb10">类目</th>'+
	                '<th class="wb15">操作</th>'+
	            '</tr>'+
	        '</thead>',
	        col:
	          [
	           {
	            field: "fpicUrl",
	            title: "商品图片",
	            render: function( data ) {
	            	return "<img style='width:100px;height:100px;' src='" + data.row.pic.fpicUrl + "'</img>";
	            }
	          },{
	            field: "fspuTitle",
	            title: "商品名称"
		      },{
	            field: "fspuBrandName",
	            title: "品牌"
		      },{
	            field: "classPath",
	            title: "分类"
		      },{
	            field: "fspuId",
	            title: "操作",
	        	render: function( data ) {
	        		return '<a id ="query_spu_detail" value="'+data.value+'" class="btn btn-success">查看商品详情</a>';
	        	}
	          }],
		        attr: { "class": "table table-bordered table-hover" },
				sorter: "bootstrap",
				pager: "bootstrap",
				paramsDefault: {paging:10,fspuTitle:$("#fspuTitle").val()},
		        onBefore: function() {
					
				},
				onData: function( data ) {
					
				},
				onRowData: function( data, num, $tr ) {
					
				},
				onComplete: function() {
					
				}
	    })
}
$("#dataGrid").delegate("#query_spu_detail","click",function(){
	var spuId = $(this).attr("value");
	window.location.href="${base}/product/detail.do?spuId="+spuId;
});

//搜索过滤
$("#search_btn").click(function(){
	$("#dataGrid").datagrid( "page",1);//重置为第一页
	$("#dataGrid").datagrid( "fetch",{
		fspuTitle:$("#fspuTitle").val()
	});
})
