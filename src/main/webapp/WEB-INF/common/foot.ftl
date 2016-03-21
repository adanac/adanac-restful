

<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="${resRoot}/assets/global/plugins/respond.min.js"></script>
<script src="${resRoot}/assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
<!-- IMPORTANT! Load jquery-ui.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="${resRoot}/assets/global/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
<script src="${resRoot}/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
            <!-- 弹出层 -->
<script src="${resRoot}/assets/global/plugins/layer/layer.js" type="text/javascript"></script>
            <!-- 下拉菜单，可输入 -->
<script type="text/javascript" src="${resRoot}/assets/global/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<script type="text/javascript" src="${resRoot}/assets/global/plugins/select2/select2.min.js"></script>
<script type="text/javascript" src="${resRoot}/assets/global/plugins/select2/select2_locale_zh-CN.js"></script>
<script type="text/javascript" src="${resRoot}/assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js"></script>


<script src="${resRoot}/assets/admin/new/scripts/add_demo.js" type="text/javascript"></script>

<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="${resRoot}/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/new/scripts/comm.js" type="text/javascript"></script>
<script src="${resRoot}/assets/admin/new/scripts/base.js" type="text/javascript"></script>
<script src="${resRoot}/common/js/jquery.my.js" type="text/javascript"></script>
<script src="${resRoot}/common/js/json2.js" type="text/javascript"></script>

<!-- handlebars -->
<script type="text/javascript" src="${resRoot}/common/js/handlebars-v3.0.3.js"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
	
    jQuery(document).ready(function() {    

		var header=$("#headerdiv"),menu=$("#menudiv"),theme_panel=$("#theme_paneldiv"),footer=$("#footerdiv"),time;

        time=window.setInterval(function(){           
            if(footer.children("*").length>0&&header.children("*").length>0&&menu.children("*").length>0){
                Menu();
                Metronic.init(); // init metronic core components
                Layout.init(); // init current layout
                QuickSidebar.init(); // init quick sidebar
                Demo.init(); // init demo features
                clearInterval(time)
            }
        },100);
        
        $.getJSON("${base}/findAllJsonMenu.do?callback=?",{},
		function(data){
        	console.log(data);
			var mainMenuHtml = "";
			for(var i=0;i<data.length;i++){
				var menu = data[i].menu;
				var menuHref;
				if(data[i].subMenuList.length==0){
					menuHref = menu.url;
				}else{
					menuHref = "javascript:;";
				}
				var menuHtml = '<li><a href="'+menuHref+'"><i class="icon-diamond"></i><span class="title">';
				menuHtml += menu.name;
				menuHtml += '</span><span class="arrow "></span></a><ul class="sub-menu">';
				for(var j=0;j<data[i].subMenuList.length;j++){
					var subMenu = data[i].subMenuList[j];
					menuHtml += '<li><a href="'+subMenu.url+'">'+subMenu.name+'</a></li>';
				}
				menuHtml += '</ul></li>';
				
				mainMenuHtml += menuHtml;
			}
			
			$('ul.page-sidebar-menu').append(mainMenuHtml);
			$('ul.page-sidebar-menu li').find("a > span").each(function(){
				var $this = $(this);
				if($this.html()=="商品管理"){
					$this.parent().parent().addClass("active open");
				}
			});
		}, true); 
    });
</script>