jQuery(document).ready(function() {    
	init();
});

var metaClassId,spu,skus,marketAttrs;

function init(){
	initSpuData();
	initClassInfo();
}

function initClassInfo(){
	var params = new Object();
	params.spuId = spuId;
	$.mypost({
		params:params,
		url:basePath+"/search/querySkuIndexBySpuId.do",
		callback:function(result){
			if(result.length>0){
				var index = result[0];
				var classPathIds = index.classId1+"|"+index.classId2+"|"+index.classId3;
				var classPathNames = index.classPath;
				var metaClassName = index.fcategoryName;
				
				$("#product_edit_form input[name='classIds']").val(classPathIds);
				$("#product_edit_form input[name='classPath']").val(classPathNames);
				$("#product_edit_form input[name='fcategoryName']").val(metaClassName);
				$("#classPath").html(index.classPathNames);
				
			}
		}
	});
}

function initSpuData(){
	var params = new Object();
	params.spuId = spuId;
	$.mypost({
		params:params,
		url:basePath+"/api/spu/querySpuById.do",
		callback:function(result){
			//showSpuDetail(result);
			spu = result;
			metaClassId = result.fcategoryId;
			showSpuDetail(spu);
			initValidate();
			initMetaClass();
			showSpuImgs();
		}
	});
}

function showSpuImgs(){
	var imgs = spu.picsList;
	for(var i=1;i<=imgs.length;i++){
		//showUploadedImage(imgs[i].fpicUrl);
		showUploadedImage("fileinput-new-"+i,imgs[i-1].fpicUrl);
	}
}

function showSpuDetail(spu){
	$("#classPath").html(spu.classPath);
	$("#product_edit_form input[name='fcategoryId']").val(spu.fcategoryId);
	$("#product_edit_form input[name='fspuTitle']").val(spu.fspuTitle);
	$("#product_edit_form input[name='fspuShortName']").val(spu.fspuShortName);
	$("#product_edit_form textarea[name='fspuPromotDesc']").val(spu.fspuPromotDesc);
	$("#product_edit_form input[name='fspuBrandName']").val(spu.fspuBrandName);
	$("#product_edit_form input[name='fspuSizex']").val(spu.fspuSizeX);
	$("#product_edit_form input[name='fspuSizey']").val(spu.fspuSizeY);
	$("#product_edit_form input[name='fspuSizez']").val(spu.fspuSizeZ);
	$("#product_edit_form input[name='fspuNetWeight']").val(spu.fspuNetWeight);
	$("#product_edit_form input[name='fspuWeight']").val(spu.fspuWeight);
	$("#product_edit_form input[name='fspuPackagingRatio']").val(spu.fspuPackagingRatio);
	$("#product_edit_form input[name='fspuMeasurementUnit']").val(spu.fspuMeasurementUnit);
	$("#product_edit_form input[name='fspuSaleUnit']").val(spu.fspuSaleUnit);
	$("#product_edit_form input[name='fspuMinBuyCount']").val(spu.fspuMinBuyCount);
	$("#product_edit_form input[name='fspuPurchaseMultiple']").val(spu.fspuPurchaseMultiple);
	$("#product_edit_form input[name='fspuPurchtaxRate']").val(spu.fspuPurchtaxRate);
	$("#product_edit_form input[name='fspuWeight']").val(spu.fspuWeight);
	
	$("#pro_description").val(spu.grap.fskuDetail);
	
	var prop = spu.fspuProperty.split(",");
	if(prop[0]==1){
		$("#product_edit_form input[name='isInvoice']").eq(0).attr("checked",true);
	}else{
		$("#product_edit_form input[name='isInvoice']").eq(1).attr("checked",true);
	}
	if(prop[1]==1){
		$("#input-return-check").attr("checked",true);;
	}else{
		$("#input-return-check").attr("checked",false);
	}
}

function initMetaClass(){
	if(!$.isEmpty(metaClassId)){
		initAttr();
		initBrand();
	}
}

/**
 * 获取商品属性
 **/
function initAttr(){
	var param = new Object();
	param.metaClassId = metaClassId;
	$.mypost({
		 url:basePath+"/api/attr/queryAttr.do",
		 params:param,
		 callback:function(result){
			 showCommonAttrs(result.commonAttrs);
			 marketAttrs = result.marketAttrs;
			 initSkuData();
		 }
	 });
}
/**
 * 将sku属性拼接到销售属性中
 * */
function skuJoinMarketAttrs(){
	//skus,marketAttrs;
	
	//循环遍历skus
	for(var i=0;i<skus.length;i++){
		var sku = skus[i];
		var attrs = sku.attrList;
		
		//循环遍历sku的属性
		for(var j=0;j<attrs.length;j++){
			var attr = attrs[j];
			//属性值小于0 表示是自定义属性值
			
			if(attr.fskuOptionId<0){
				var mattr;
				var inx;
				//获取与sku属性相应的销售属性
				for(var k=0;k<marketAttrs.length;k++){
					if(marketAttrs[k].attrId==attr.fskuAttrId){
						mattr = marketAttrs[k];
						inx = k;
						break;
					}
				}
				
				if(!$.isEmpty(mattr)){
					var token = false;//默认属性值不包含该自定义属性
					var options = mattr.options
					for(var k=0;k<options.length;k++){
						if(options[k].optionId==attr.fskuOptionId){
							token = true;
							break;
						}
					}
					
					if(!token){
						//如果不包含该属性值//{optionId: 1, optionText: "其他1"}
						var option = new Object();
						option.optionId = attr.fskuOptionId;
						option.optionText = attr.fskuOptionName;
						marketAttrs[inx].options[marketAttrs[inx].options.length]=option;
						
					}
					
				}
			}
			
		}
	}
	
}



/**
 * 获取sku
 * */
function initSkuData(){
	var params = new Object();
	params.spuId = spuId;
	$.mypost({
		params:params,
		url:basePath+"/api/sku/querySkuBySpuId.do",
		callback:function(result){
			skus = result;
			
			skuJoinMarketAttrs();
			//初始化sku显示
			showMarketAttrs(marketAttrs);
		}
	});
}

function showMarketAttrs(marketAttrs){
	/*var result = [{"attrId":43454,"attrShowTxt":"颜色","isText":0,"isSelect":1,"options":[{"optionId":1,"optionText":"绿色"},{"optionId":2,"optionText":"红色"},{"optionId":3,"optionText":"蓝色"},{"optionId":4,"optionText":"白色"}]},
	              {"attrId":43455,"attrShowTxt":"尺寸","isText":0,"isSelect":1,"options":[{"optionId":1,"optionText":"M"},{"optionId":2,"optionText":"L"},{"optionId":3,"optionText":"XL"},{"optionId":4,"optionText":"XXL"}]},
	              {"attrId":43456,"attrShowTxt":"年龄","isText":0,"isSelect":1,"options":[{"optionId":1,"optionText":"16岁以下"},{"optionId":2,"optionText":"16-20岁"},{"optionId":3,"optionText":">20岁"}]}];
	
	marketAttrs = result;*/
	
	if($.isEmpty(marketAttrs)){
		
	}else{
		var html = "";
		for(var i=0;i<marketAttrs.length;i++){
			html += getRowMarketAttrHtml(marketAttrs[i],i);
		}
		
		$("#product_edit_standard").html(html);
		
		$("#product_edit_standard .new_box").click(function(){
			var i = $(this).attr("data-index");
			var val = parseInt($(this).attr("data-count"));
			addNewBox(this,i,val);
			val--;
			$(this).attr("data-count",val);
		});
		
		showProductEditTable();
		$('.sz_checkbox').on('change',function(){

	        // console.log(pro_edtable);
			showProductEditTable();

	    })
	}
	
}

function showProductEditTable(){
	//清空表
	$("#product_edit_table").html("");
	
	var num = $(".stand_loop").size();
	var array = new Array(num);
	var locat = new Array();
	//统计每个销售属性的选择的个数
	for(var i=0;i<num;i++){
		array[i] = $('input[name="pro_st_'+i+'"]:checked').size();
		locat.push(i);
	}
	
	//动态生成table  Head
	var tableHeadHtml = '<tr><th class="wn100">是否主商品</th>';
	for(var i=0;i<num;i++){
		if(array[i]>0){
			tableHeadHtml += '<th class="wn100">'+$("#stand_loop_label_"+i).html()+'</th>';
		}
	}
	tableHeadHtml +=  '<th class="">价格（元）<span class="red">* </span></th>'
		+'<th class="">库存<span class="red">* </span></th>'
		//+'<th class="">供应商商品编码</th>'
		+'<th class="">商品条码</th></tr>';
	
	//动态生成table  body	
	var tablebodyHtml = '';
	
	/*if(mulNext(array,0)==0){
	tablebodyHtml == '';
	break;
	}*/
	
	
	
	for(var i=0;i<mulNext(array,0);i++){
		var tr = '';
       /* if(i==0){
            tr+=    '<td><input type="radio" class="group-checkable" name="radio009" checked></td>';
        }else{
            tr+=    '<td><input type="radio" class="group-checkable" name="radio009"></td>';
        }*/
        
        var tempAttrList = new Array();
        
        for(var j=0;j<locat.length;j++){
        	var rowSpan = mulNext(array,locat[j]+1);
        	if(i%rowSpan==0){
        		if(array[locat[j]]>0){
        			//该属性勾选的值
        			$input_checked = $('input[name="pro_st_'+locat[j]+'"]:checked').eq(parseInt(i/rowSpan)%array[locat[j]]);
        			$input_stand_loop = $input_checked.parents(".stand_loop");
        			var attrid = $input_stand_loop.attr("data-attid");
        			var attrname = $input_stand_loop.attr("data-attname");
        			tr+= '<td data-attId="'+attrid+'" data-attName="'+attrname+'" data-optionid="'+$input_checked.val()+'" data-optionname="'+$input_checked.attr("data-optionname")+'" class="skuattr" rowspan="'+rowSpan+'">'+$input_checked.attr("data-optionname")+'</td>';
        		}
        	}
        	
        	if(array[locat[j]]>0){
        		var tempAttr = new Object();
        		$input_c = $('input[name="pro_st_'+locat[j]+'"]:checked').eq(parseInt(i/rowSpan)%array[locat[j]]);
        		tempAttr.attrId = $input_c.parents(".stand_loop").attr("data-attid");
        		tempAttr.optionId = $input_c.val();
        		tempAttrList.push(tempAttr);
        	}
        }
        var sku = searchSkuByAttrs(tempAttrList);
        
        if(sku!=null){
        	var price = parseFloat(sku.fskuReferPrice)/100;
        	tr+= '<td><input class="form-control number" name="skuPrice-'+i+'" value="'+price+'" required number></td>';
            tr+= '<td><input class="form-control number" name="skuStock-'+i+'"  value="'+sku.fskuNumber+'" required number></td>';
           // tr+= '<td><input class="form-control" name="skuSppulierCode" value="'+sku.fspuLocalCode+'" ></td>';
            tr+= '<td><input class="form-control " name="skuBarCode" value="'+sku.fbarcode+'" ></td>';
            tr+='</tr>';
            
            var checkedHtml = '';
            if(sku.fmain==1){
            	checkedHtml = 'checked="checked"';
            }
            tr = '<td><input type="radio" class="group-checkable" name="radio009" '+checkedHtml+'></td>'+tr;
            tr = '<tr data-skuid="'+sku.fskuId+'">'+tr;
        }else{
        	tr+= '<td><input class="form-control number" name="skuPrice-'+i+'" required number></td>';
            tr+= '<td><input class="form-control number" name="skuStock-'+i+'" required number></td>';
            //tr+= '<td><input class="form-control" name="skuSppulierCode"  ></td>';
            tr+= '<td><input class="form-control" name="skuBarCode" ></td>';
            tr+='</tr>';
            tr = '<td><input type="radio" class="group-checkable" name="radio009"></td>'+tr;
            tr = '<tr>'+tr;
        }
        
        tablebodyHtml += tr;
	}
	
	
	//拼接成table
	var tableHtml = '<table cellpadding="0" cellspacing="0" border="0" width="100%"><thead>'+tableHeadHtml+'</thead><tbody id="pro_edtable">'+tablebodyHtml+'</tbody></table>';
	
	$("#product_edit_table").html(tableHtml);
}

function addNewBox(dom,i,id){
	var cb_count = $(dom).parents(".stand_loop_li").find("> .checkbox_li").length;
	if(cb_count>20){
		layer.msg("每个规格最多只能有20个属性值");
		return;
	}
	
	var html = '<label class="checkbox_li"><input type="checkbox" class="group-checkable sz_checkbox" value="'+id+'" name="pro_st_'+i+'">'
				+'<input type="text" style="width:90px;box-sizing: border-box;cursor: auto;padding: 1px;border: 2px inset;"  onblur="if($(this).val().length>5){$(this).val($(this).val().substr(0,5));layer.msg(\'最多只能输入五个字符\')}">'
				+'<span class="inline deco del" style="font-size:12px;">删除</span></label>'
				
	var $html = $(html);	
	
	$html.find(".del").click(function(){
		$html.remove();
		showProductEditTable();
	});
	
	$html.find('.sz_checkbox').on('change',function(){
		var optionName = $(this).find("~ input").val();
		if($.isEmpty(optionName)){
			layer.msg("该选项没有值，不能选择");
			$(this).attr("checked",false);
		}else{
			$(this).attr("data-optionname",optionName);
			showProductEditTable();
		}

    });
	
	$html.find("input[type='text']").blur(function(){
		var $checkBox = $html.find('.sz_checkbox')
		if($checkBox.is(':checked')&&!$.isEmpty($(this).val())){
			$checkBox.attr("data-optionname",$(this).val());
			showProductEditTable();
		}
	});
				
	$html.insertBefore($(dom).parent());
}

function searchSkuByAttrs(rowAttrList){
	for(var i=0;i<skus.length;i++){
		var skuAttrList = skus[i].attrList;
		var token2 = false;
		for(var j=0;j<skuAttrList.length;j++){
			var skuAttr = skuAttrList[j];
			var token3=false;
			for(var k=0;k<rowAttrList.length;k++){
				var rowAttr = rowAttrList[k];
				if(rowAttr.attrId==skuAttr.fskuAttrId&&rowAttr.optionId==skuAttr.fskuOptionId){
					token3=true;
					break;
				}
			}
			if(!token3){
				break;
			}
			if(token3&&j==(skuAttrList.length-1)){
				token2=true;
			}
		}
		if(token2){
			return skus[i];
		}
	}
	return null;
}

/**
 * 计算数字数组从i位开始后面数据的乘积
 */
function mulNext(array,i){
	var n=1;
	for(i;i<array.length;i++){
		if(array[i]!=0){
			n *= array[i];
		}
	}
	return n;
}

function getRowMarketAttrHtml(row,i){
	var rowHtml = '<div class="stand_loop" data-attId="'+row.attrId+'" data-attName="'+row.attrShowTxt+'">'
					+'<label id="stand_loop_label_'+i+'" class="stand_loop_label">'+row.attrShowTxt+'</label>'
					+'<div class="stand_loop_li clearfix">';
	
	var minOptionId = -1;
	
	for(var k=0;k<row.options.length;k++){
		var option = row.options[k];
		var checkedHtml = '';
		if(checkMarketAttrWithSku(row.attrId,option.optionId)){
			checkedHtml = 'checked="checked"';
		}
		var optionHtml ='<label class="checkbox_li">'
							+'<input type="checkbox" '+checkedHtml+' class="group-checkable sz_checkbox" data-optionname="'+option.optionText+'" value="'+option.optionId+'" name="pro_st_'+i+'">'
							+'<span class="inline">'+option.optionText+'</span></label>';
		rowHtml	+= 	optionHtml;		
		
		if(minOptionId>option.optionId){
			minOptionId = option.optionId;
		}
	}
	
	minOptionId--;
	
	var addOptionBtnHtml ='<label class="checkbox_li"><span class="inline deco new_box" data-count="'+minOptionId+'" data-index="'+i+'">增加自定义选项</span></label>';
	
	rowHtml += addOptionBtnHtml;
	
	rowHtml += '</div></div>'
	return rowHtml;	
}

//校验当前属性是否被选中
function checkMarketAttrWithSku(attrid,optionId){
	for(var i=0;i<skus.length;i++){
		var attrList = skus[i].attrList;
		for(var j=0;j<attrList.length;j++){
			if(attrid==attrList[j].fskuAttrId&&optionId==attrList[j].fskuOptionId){
				return true;
			}
		}
	}
	return false;
}

function showCommonAttrs(commonAttrs){
	var spuAttrList = spu.spuAttrList;
	if($.isEmpty(commonAttrs)){
		$("#common_attr_box").parent().parent().remove();
	}else{
		var html = "";
		for(var i=0;i<commonAttrs.length;i++){
			var row = commonAttrs[i];
			var rowHtml = '<div class="form-group" data-type="'+row.isText+'" data-attId="'+row.attrId+'" data-attName="'+row.attrShowTxt+'"><label class="control-label col-md-2">'+row.attrShowTxt+'：</label><div class="col-md-9">';
			//获取当前的属性
			var spuAttr = null;
			for(var k=0;k<spuAttrList.length;k++){
				if(row.attrId==spuAttrList[k].fspuAttrid){
					spuAttr = spuAttrList[k];
					break;
				}
			}
			
			if(row.isText==1){
				if(!$.isEmpty(spuAttr)){
					rowHtml += '<input type="text required" class="form-control" value="'+spuAttr.fspuOptionName+'">';
				}else{
					rowHtml += '<input type="text required" class="form-control" value="">';
				}
			}
			
			if(row.isSelect == 1){
				rowHtml += '<select class="form-control select2me required" name="pro_pack" data-placeholder="" value="';
				if(!$.isEmpty(spuAttr)){
					rowHtml+=spuAttr.fspuOptionId;
				}
				rowHtml +='">'
				for(var j=0;j<row.options.length;j++){
					rowHtml += '<option value="'+row.options[j].optionId+'">'+row.options[j].optionText+'</option>';
				}
				rowHtml +='</select>';
			}
			
			rowHtml += '</div></div>';
			
			html += rowHtml;
		}
		$("#common_attr_box").append(html);
	}
}

/**
 * 获取品牌
 **/
function initBrand(){
	var param = new Object();
	param.metaClassId = metaClassId;
	$.mypost({
		 url:basePath+"/api/attr/queryBrand.do",
		 params:param,
		 callback:function(result){
			 showBrandSel(result);
		 }
	 });
}
/**
 * 展示品牌
 **/
function showBrandSel(result){
	var spuBrand = spu.fspuBrand;
	var html = "";
	for(var i=0;i<result.length;i++){
		html += '<option value="'+result[i].brandId+'">'+result[i].brandName+'</option>';
	}
	$("#pro_brand_sel").append(html);
	$("#pro_brand_sel").val(spuBrand);
	$('#pro_brand_sel').change();
}
function preSubmitForm(pro_description){
	var token = true;
	var data = pro_description.getData();
    $('.editor_length').html(data.length);
    if(parseInt(data.length)<=0){
        layer.msg('商品描述不能为空');
        token = false;
    }else if(parseInt(data.length)>parseInt($('.editor_max').text())){
   	 layer.msg('当前输入的内容已超出限定范围');
   	 token = false;
    }
    
    $("#product_edit_form textarea[name='htlmDetail']").val(data);
    
    assembleImgs();
    
    //校验是否上传图片
    if($("#product_edit_form > input[name='pics']").val().trim()==0){
    	token = false;
    	layer.msg('您还没有上传图片');
    }
    
    assembleCommonAttr();
    assembleSkus();
    //获取品牌名
    var brand = $("#product_edit_form").find("select[name='fspuBrand']>option:checked").html();
    $("#product_edit_form>input[name='fspuBrandName']").val(brand);
    
    if($("#input-return-check").is(":checked")){
    	$("#product_edit_form>input[name='isReturn']").val("1");
    }
    
    return token;
    
}

function assembleCommonAttr(){
	var commonAttrs= "";
	var array = new Array();
	$("#common_attr_box > .form-group").each(function(){
    	$this = $(this);
    	var attr = new Object();
    	attr.type = $this.attr("data-type");
    	attr.attrid = $this.attr("data-attid");
    	attr.attname = $this.attr("data-attname");
    	
    	if(attr.type==1){
    		attr.optionid = "";
    		attr.optionValue = $this.find("input").val();
    	}else{
    		attr.optionid = $this.find("select").val();
    		attr.optionValue = $this.find("select>option:checked").html();
    	}
    	
    	array.push(attr);
    });
	
	$("#product_edit_form > input[name='fcommonAttr']").val(JSON.stringify(array));
}

function assembleSkus(){
	var skus = new Array();
	var tempSkuAttr = new Array();
	$("#pro_edtable>tr").each(function(i){
		var sku = new Object();
		var attrs = new Array();
		var $tr = $(this);
		
		sku.skuId = $tr.attr("data-skuid");
		
		if(!$.isEmpty(fskuState)){
			sku.fskuState = fskuState;
		}
		
		for(var i=0;i < tempSkuAttr.length; i++){
			var temp = tempSkuAttr[i];
			if(temp.count>0){
				temp.count --;
				attrs.push(temp.attr);
			}
			tempSkuAttr[i] = temp;
		}
		
		$tr.find("td").each(function(k){
			var $td = $(this);
			if($td.hasClass("skuattr")){
				var attr = new Object();
				attr.attrId = $td.attr("data-attid");
				attr.attrName = $td.attr("data-attname");
				attr.optionId = $td.attr("data-optionid");
				attr.optionName = $td.attr("data-optionname");
				attrs.push(attr);
				
				var rowspan = parseInt($td.attr("rowspan"));
				if(rowspan>1){
					var obj = new Object();
					obj.count = rowspan-1;
					obj.attr = attr;
					tempSkuAttr.push(obj);
				}
			}else{
				$input = $td.find("input");
				if(k==0){
					//判断是够是主商品
					if($input.is(':checked')){
						sku.fmain = 1;
					}else{
						sku.fmain = 0;
					}
				}else{
					var iname = $input.attr("name");
					if(iname.indexOf("skuPrice")>-1){
						sku["skuPrice"] = $input.val();
					}else if(iname.indexOf("skuStock")>-1){
						sku["skuStock"] = $input.val();
					}else{
						sku[iname] = $input.val();
					}
				}
			}
		});
		sku.attrs = attrs;
		skus.push(sku);
	});
	$("#product_edit_form > input[name='skus']").val(JSON.stringify(skus));
}
var fskuState;
/**
 * 初始化标单验证
 * */
function initValidate(){
	 var pro_description = CKEDITOR.replace('pro_description',{
             language: 'zh-cn',
             height: 400,
             toolbar:"MyToolbar"
         });
         pro_description.on( 'blur', function( event ) { 
             var data = this.getData();
             $('.editor_length').html(data.length);
             if(parseInt(data.length)>parseInt($('.editor_max').text())){
                 alert('当前输入的内容已超出限定范围');
             }
         });


     $("#product_edit_form").validate({ 
    	 debug:true,
    	 submitHandler: function(form){   
    		 if(preSubmitForm(pro_description)){
    			 $.ajaxSubmit({
    				 form:form,
    				 success:function(){
    	    			console.log("添加成功");
    	    			var href = basePath+"/product/toList.do";
    	    		    window.location.href=href; 
    				 }
    			 });     
    		 }else{
    			 $("#form_submit").removeClass("disabled");
    	   		 $("#save_draft").removeClass("disabled");
    		 }
    	  },
    	  errorPlacement: function(error, element) {  
  		    error.appendTo(element.parent());  
  			} 
    	 });
     
     $("#save_draft").click(function(){
    	// alert("-save_draft--");
    	 fskuState = 2;
    	$("#product_edit_form").submit();
     });
     
     $("#form_submit").click(function(){
    	// alert("-form_submit--");
    	 fskuState = 1;
    	 
    	 if($("#product_edit_form").valid()){
			 $("#form_submit").addClass("disabled");
	   		 $("#save_draft").addClass("disabled");
    	 }
    	 
    	$("#product_edit_form").submit();
     }); 

     $('.select2me', $("#product_edit_form")).change(function () {
         $("#product_edit_form").validate().element($(this));
     });
     
     $("#pre_view_detail").click(function(){
    	 if(preSubmitForm(pro_description)){
    		 
    		 var formHtml = '<form id="preview_form" action="'+basePath+'/product/preView.do" method="post" style="display: none;" target="_blank"></form>';
    		 
    		 var $form = $(formHtml);
    		 
    		 $("#product_edit_form input").each(function(){
    			 var $this = $(this);
    			 if(!$.isEmpty($this.attr("name"))){
    				 var inputHtml = "<input type='hidden' value='"+$this.val()+"' name='"+$this.attr("name")+"'/>";
    				 $form.append(inputHtml);
    			 }
    		 });
    		 
    		 $("#product_edit_form select").each(function(){
    			 var $this = $(this);
    			 if(!$.isEmpty($this.attr("name"))){
    				 var inputHtml = "<input type='hidden' value='"+$this.val()+"' name='"+$this.attr("name")+"'/>";
    				 $form.append(inputHtml);
    			 }
    		 });
    		 
    		 $("#product_edit_form textarea").each(function(){
    			 var $this = $(this);
    			 if(!$.isEmpty($this.attr("name"))){
    				 var inputHtml = "<textarea name='"+$this.attr("name")+"'>"+$this.val()+"</textarea>";
    				 $form.append(inputHtml);
    			 }
    		 });
    		 
    		 $form.submit();
    	 }
     });

     jQuery.extend(jQuery.validator.messages, {
       required: "必选字段",
       remote: "请修正该字段",
       email: "请输入正确格式的电子邮件",
       url: "请输入合法的网址",
       date: "请输入合法的日期",
       dateISO: "请输入合法的日期 (ISO).",
       number: "请输入合法的数字",
       digits: "只能输入整数",
       creditcard: "请输入合法的信用卡号",
       equalTo: "请再次输入相同的值",
       accept: "请输入拥有合法后缀名的字符串",
       maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
       minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
       rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
       range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
       max: jQuery.validator.format("请输入一个最大为{0} 的值"),
       min: jQuery.validator.format("请输入一个最小为{0} 的值")
     }); 


     $('*[maxlength]').maxlength({
         alwaysShow: true,
         limitReachedClass: "label label-danger",
     });
     
  // 字符验证 
     jQuery.validator.addMethod("stringCheck", function(value, element) { 
     return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value); 
     }, "只能包括中文字"); 
}