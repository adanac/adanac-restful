var marketAttrs;

jQuery(document).ready(function() {    
	init();
});

function init(){
	initValidate();
}



/**
 * 初始化标单验证
 * */
function initValidate(){
	 var pro_description = null;
     window.onload = function(){
        
     };


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
    		 }
    	  },
    	  errorPlacement: function(error, element) { 
    		  	error.appendTo(element.parent()); 
    		}
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
     
    
      
      $("#form_submit").click(function(){
     	// alert("-form_submit--");
     	 fskuState = 1;
     	 if($("#product_edit_form").valid()){
     		 $("#form_submit").addClass("disabled");
     	 }
     	$("#product_edit_form").submit();
      }); 

     $('.select2me', $("#product_edit_form")).change(function () {
         $("#product_edit_form").validate().element($(this));
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
     })
     
  // 字符验证 
     jQuery.validator.addMethod("stringCheck", function(value, element) { 
     return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value); 
     }, "只能包括中文字"); 
}