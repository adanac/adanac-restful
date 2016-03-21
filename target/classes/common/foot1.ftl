<!-- IMPORTANT! Load jquery-ui.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="${resRoot}/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="${resRoot}/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
            <!-- 下拉菜单，可输入 -->

<script type="text/javascript" src="${resRoot}/assets/global/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<script type="text/javascript" src="${resRoot}/assets/global/plugins/select2/select2.min.js"></script>
<script type="text/javascript" src="${resRoot}/assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js"></script>
            <!-- 日期插件 -->
<link type="text/css" href="${resRoot}/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet"/>
<script type="text/javascript"  src="${resRoot}/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script type="text/javascript"  src="${resRoot}/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>
			<!-- 左侧折叠控件 -->
<script src="${resRoot}/assets/admin/pages/scripts/components-dropdowns.js"></script>

			<!-- 页面整体控件 -->
<script src="${resRoot}/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/new/scripts/comm.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/new/scripts/base.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/new/scripts/bases.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script src="${resRoot}/common/js/common.js" type="text/javascript"></script>
<!-- handlebars -->
<script type="text/javascript" src="${resRoot}/common/js/plugin/handlebars-v3.0.3.js"></script>
<script>
jQuery(document).ready(function() {    

		var header=$("#headerdiv"),menu=$("#menudiv"),theme_panel=$("#theme_paneldiv"),footer=$("#footerdiv"),time;
        
        
	   //header.load("pages/common/header.ftl");
        //menu.load("pages/common/menu.ftl");
       // theme_panel.load("pages/common/theme-panel.ftl");
		//footer.load("pages/common/footer.ftl");
        time=window.setInterval(function(){     
            if(header.children("*").length>0&&menu.children("*").length>0){

                Metronic.init(); // init metronic core components
                Layout.init(); // init current layout
                QuickSidebar.init(); // init quick sidebar
                Demo.init(); // init demo features
                Menu();
                clearInterval(time);
            }
        },100)
         
		
        
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            language: 'zh-CN',
            autoclose: true
        });
        
        //加载菜单
        var myTemplate = Handlebars.compile($("#meuns-template").html());
        $.getJSON("${base}/findAllJsonMenu.do?callback=?",{},
		function(data){
			$('ul.page-sidebar-menu').append(myTemplate(data));
			$('ul.page-sidebar-menu li:nth-child(5)').attr("class","active open");
		}, true)
    });
</script>