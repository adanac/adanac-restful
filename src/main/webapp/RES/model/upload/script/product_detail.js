jQuery(function() {
	initSpuData();
	initSkuData();
});

function initSpuData(){
	var params = new Object();
	params.spuId = spuId;
	$.mypost({
		params:params,
		url:basePath+"/api/spu/querySpuById.do",
		callback:function(result){
			showSpuDetail(result);
		}
	});
}

function showSpuDetail(spu){
	$("#fspuId").val(spuId);
	$("#fcategoryId").val(spu.fcategoryId);
	$("#classPath").html(spu.classPath);
	$("#fspuTitle").html(spu.fspuTitle);
	$("#fspuShortName").html(spu.fspuShortName);
	$("#fspuPromotDesc").html(spu.fspuPromotDesc);
	$("#fspuBrandName").html(spu.fspuBrandName);
	$("#fspuSizeX").html(spu.fspuSizeX);
	$("#fspuSizeY").html(spu.fspuSizeY);
	$("#fspuSizeZ").html(spu.fspuSizeZ);
	$("#fspuNetWeight").html(spu.fspuNetWeight);
	$("#fspuWeight").html(spu.fspuWeight);
	$("#fspuPackagingRatio").html(spu.fspuPackagingRatio+"%");
	$("#fspuMeasurementUnit").html(spu.fspuMeasurementUnit);
	$("#fspuSaleUnit").html(spu.fspuSaleUnit);
	$("#fspuMinBuyCount").html(spu.fspuMinBuyCount);
	$("#fspuPurchaseMultiple").html(spu.fspuPurchaseMultiple);
	$("#fspuPurchtaxRate").html(spu.fspuPurchtaxRate+"%");
	
	$("#fskuDetail").html(spu.grap.fskuDetail);
	
	var spuAttrsHtml = "";
	for(var i=0;i<spu.spuAttrList.length;i++){
		var attr = spu.spuAttrList[i];
		spuAttrsHtml += '<div class="form-group">'
				            +'<label class="control-label col-md-2">'+attr.fspuAttrName+'：</label>'
				            +'<div class="col-md-9 pa_t5">'+attr.fspuOptionName+'</div></div>';
	}
	$("#spu_attr_list").html(spuAttrsHtml);
	
	var picsHtml = "";
	for(var i=0;i<spu.picsList.length;i++){
		picsHtml += ' <li><img src="'+spu.picsList[i].fpicUrl+'"></li>';
	}
	$("#pic_list_ul").html(picsHtml);
	
	var prop = spu.fspuProperty.split(",");
	if(prop[0]==1){
		$("#isInvoice").html("有");
	}else{
		$("#isInvoice").html("无");
	}
	if(prop[1]==1){
		$("#tuihuo_check").attr("checked",true);;
	}else{
		$("#tuihuo_check").attr("checked",false);
	}
	
	/*$("img").css("max-width","600px");*/
	$("#fskuDetail img").css("height", "auto");

}

function initSkuData(){
	var params = new Object();
	params.spuId = spuId;
	$.mypost({
		params:params,
		url:basePath+"/api/sku/querySkuBySpuId.do",
		callback:function(result){
			initSkuTable(result);
		}
	});
}

function initSkuTable(skus){
	//因为返回的sku的属性顺序可能不一致，取第一个sku的属性作为展示的顺序
	var attrList = skus[0].attrList;
	var headHtml = '<thead><tr><th class="wn100">是否主商品</th>';
	for(var i=0;i<attrList.length;i++){
		headHtml+='<th class="wn100">'+attrList[i].fskuAttrName+'</th>'
	}
	headHtml+='<th class="">价格（元）</th>'
             +'<th class="">库存</th>'
             +'<th class="">供应商商品编码</th>'
             +'<th class="">商品条码</th>'
         +'</tr></thead>';
	var bodyHtml = '<tbody>';
	
	for(var i=0;i<skus.length;i++){
		var sku = skus[i];
		var trHtml = '<tr>';
		
		if(sku.fmain == 1){
			trHtml += '<td> <i class="fa fa-circle"></i></td>';
		}else{
			trHtml += '<td> <i class="fa fa-circle-o"></i></td>';
		}
		//只有当前的sku的属性id与当前列属性ID相等才展示
		for(var j=0;j<attrList.length;j++){
			var skuAttrList = sku.attrList;
			for(var k=0;k<skuAttrList.length;k++){
				if(skuAttrList[k].fskuAttrId == attrList[j].fskuAttrId){
					trHtml += '<td>'+skuAttrList[k].fskuOptionName+'</td>';
				}
			}
		}
		
		trHtml += '<td>'+(sku.fskuReferPrice/100)+'</td>';
		trHtml += '<td>'+sku.fskuNumber+'</td>';
		trHtml += '<td>'+sku.fspuLocalCode+'</td>';
		trHtml += '<td>'+sku.fbarcode+'</td>';
		
		trHtml += '</tr>';
		bodyHtml += trHtml;
	}
	
	bodyHtml += '</tbody>';
	
	var tableHtml  = headHtml+bodyHtml;
	$("#sku_attr_table").html(tableHtml);
}



//返回
function back()
{
	window.location.href="${base}/search/toProduct.do";
}

$("#edit_spu").click(function(){
	var fspuId = $("#fspuId").val();
	var fcategoryId = $("#fcategoryId").val();
	window.location.href="${base}/product/copyEdit.do?fspuId="+fspuId+"&fcategoryId="+fcategoryId;
});