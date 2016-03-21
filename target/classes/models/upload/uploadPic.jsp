<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String resRoot = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/" +"RES";
%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>
<title>上传图片demo</title>
			<!-- Jquery  -->
<script src="<%=resRoot %>/common/js/jquery-1.11.0.min.js" type="text/javascript"></script>
            <!-- 弹出层 -->
<script src="<%=resRoot %>/assets/global/plugins/layer/layer.js" type="text/javascript"></script>
</head>
<body>


<!-- BEGIN CONTAINER -->
<div>
    	

<!-- 2、图片和详细说明 -->
<form id="product_edit_form">
<h3 class="form-section">商品图片和描述</h3>
<span><%=path%></span>
<span><%=basePath%></span>
<div><%=resRoot %></div>
<!-- 商品图片 -->            
                                        
                                        <div class="form-group">
                                            <label class="control-label col-md-2"><span class="required" aria-required="true">* </span>商品图片：</label>
                                            <div class="col-md-9">


                                                <div class="clearfix">

                                                    <div class="fileinput fileinput-new firstimg"  data-provides="fileinput">
                                                        <div class="fileinput-preview thumbnail first" data-trigger="fileinput" style="width: 200px; height: 200px;">
                                                        </div>
                                                        <div class="clearfix">
                                                            <span class="btn default btn-file f_l">
                                                                <span id="fileinput-new-1" class="fileinput-new">选择图片</span>
                                                                <span class="fileinput-exists">更换图片</span>
                                                            </span>
                                                            <a href="javascript:;" class="btn red fileinput-exists f_r del-img" data-dismiss="fileinput">删除图片</a>
                                                        </div>
                                                    </div>
													
													
													<hr/>

                                                </div>

                                                <small class="note_small">第一张图为默认主图，建议图片尺寸在750*750像素以上，图片请避免全文字。</small>

                                            </div>
                                        </div>
                                        
                                        
</form>


                        </div>

			<!-- ##########主要内容结束########## -->
			
            <!-- 表单美化 -->
<link   href="<%=resRoot %>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
<!-- <script src="<%=resRoot %>/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script> -->

            <!-- 日期插件 -->
<link type="text/css"           href="<%=resRoot %>/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet"/>
<script type="text/javascript"  src="<%=resRoot %>/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script type="text/javascript"  src="<%=resRoot %>/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>
            <!-- ckeditor编辑器 
<script type="text/javascript" src="<%=resRoot %>/assets/global/plugins/ckeditor/ckeditor.js"></script>-->
            <!-- 表单验证插件 -->
<script type="text/javascript" src="<%=resRoot %>/assets/global/plugins/jquery-validation/js/jquery.validate.js"></script>
<script type="text/javascript" src="<%=resRoot %>/assets/global/plugins/jquery-validation/js/additional-methods.min.js"></script>
            <!-- 最大数字 -->
<script src="<%=resRoot %>/assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js" type="text/javascript"></script>
            <!-- 选择图片显示 -->
<link rel="stylesheet" type="text/css" href="<%=resRoot %>/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css"/>
<!-- <script type="text/javascript" src="<%=resRoot %>/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js"></script> -->


<!--<script src="<%=resRoot %>/assets/admin/new/scripts/product_size.js" type="text/javascript"></script>
<script type="text/javascript" charset="utf-8" src="<%=resRoot %>/plugins/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="<%=resRoot %>/plugins/ueditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="<%=resRoot %>/plugins/ueditor/lang/zh-cn/zh-cn.js"></script>-->

<script type="text/javascript" src="<%=resRoot %>/plugins/webuploader/js/webuploader.js"></script>
<script type="text/javascript" src="<%=resRoot %>/plugins/webuploader/js/uploadImg.js"></script>

<script src="<%=resRoot %>/model/upload/script/uploadPic.js" type="text/javascript"></script>
<script src="<%=resRoot %>/model/upload/script/myupload.js" type="text/javascript"></script>

</body>
<!-- END BODY -->
</html>