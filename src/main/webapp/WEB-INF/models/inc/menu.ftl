
	<!-- BEGIN SIDEBAR -->
	
	<div id="menu" class="page-sidebar-wrapper">
		<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		<div class="page-sidebar navbar-collapse collapse" style="position: relative;">
			<!-- BEGIN SIDEBAR MENU -->
			<!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
			<!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
			<!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
			<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
			<!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
			<!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
			<ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
				<!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
				<li class="sidebar-toggler-wrapper">
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					<div class="sidebar-title">
                    运营中心
                    </div>
					<div class="sidebar-toggler">
					</div>
					<!-- END SIDEBAR TOGGLER BUTTON -->
				</li>
				<!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
				<li class="sidebar-search-wrapper">
					<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
					<!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
					<!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
					<form class="sidebar-search " action="extra_search.html" method="POST">
						<a href="javascript:;" class="remove">
						<i class="icon-close"></i>
						</a>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search...">
							<span class="input-group-btn">
							<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
							</span>
						</div>
					</form>
					<!-- END RESPONSIVE QUICK SEARCH FORM -->
				</li>
																													
				<!-- <li>
					<a href="javascript:;">
					<i class="icon-diamond"></i>
					<span class="title">商品管理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="http://192.168.1.58:8081/cissTool-web/product/toList.do">
							商品管理</a>
						</li>
						<li>
							<a href="http://192.168.1.58:8081/cissTool-web/product/publish.do">
							商品发布</a>
						</li>						
					</ul>
				</li>
				
				
				<li>
					<a href="javascript:;">
					<i class="icon-diamond"></i>
					<span class="title">营销管理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="http://192.168.1.54:8081/activitysTool-web/sp/tolist.do">
							闪拼活动维护</a>
						</li>
						<li>
							<a href="http://192.168.1.54:8081/activitysTool-web/apply/toapply.do">
							闪拼活动申请</a>
						</li>
						<li>
							<a href="http://192.168.1.54:8081/activitysTool-web/approve/toapply.do">
							闪拼活动审核</a>
						</li>
						<li>
							<a href="http://192.168.1.54:8081/activitysTool-web/spgood/actGoodsOffMain.do">
							闪拼商品下架</a>
						</li>
						<li>
							<a href="http://192.168.1.54:8081/activitysTool-web/xs/xsActivityMain.do">
							限时促销</a>
						</li>
					</ul>
				</li>
				
				<li>
					<a href="http://192.168.1.22:8081/umcTool-web/merchantAction/toMerchantManager.htm">
					<i class="icon-diamond"></i>
					<span class="title">商家管理</span>
					</a>
					
				</li>
				
				<li>
					<a href="O-MerchantManage.html">
					<i class="icon-diamond"></i>
					<span class="title">宝宝店管理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="http://192.168.1.22:8081/umcTool-web/babyStoreAction/toBabyStoreManager.htm">
							宝宝店列表</a>
						</li>
						<li>
							<a href="http://192.168.1.22:8081/umcTool-web/babyStoreAction/accountAuditPage.htm">
							开户审核</a>
						</li>
					</ul>
				</li>
				
				<li>
					<a href="O-MerchantManage.html">
					<i class="icon-diamond"></i>
					<span class="title">社区管理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="http://192.168.1.41:8081/communityWebTool-web/article/toArticleList.do">
							文章管理</a>
						</li>
						<li>
							<a href="http://192.168.1.41:8081/communityWebTool-web/category/toCategoryList.do">
							文章分类管理</a>
						</li>
						<li>
							<a href="http://192.168.1.41:8081/communityWebTool-web/tag/toTagList.do">
							标签管理</a>
						</li>
					</ul>
				</li>
				
								<li>
					<a href="javascript:;">
					<i class="icon-diamond"></i>
					<span class="title">交易管理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="http://192.168.1.77:8081/omsTool-web/RES/projects/BabyStore_Operation/O-order.html">
							交易订单</a>
						</li>
						<li>
							<a href="http://192.168.1.77:8081/omsTool-web/RES/projects/BabyStore_Operation/O-service.html">
							售后订单</a>
						</li>
						<li>
							<a href="http://192.168.1.77:8081/omsTool-web/RES/projects/BabyStore_Operation/O-review.html">
							评价管理</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;">
					<i class="icon-diamond"></i>
					<span class="title">运营平台</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="http://192.168.1.77:8081/omsTool-web/RES/projects/BabyStore_Operation/O-service-query.html">
							打款列表</a>
						</li>
						<li>
							<a href="http://192.168.1.77:8081/omsTool-web/RES/projects/BabyStore_Operation/O-abnormal.html">
							异常管理</a>
						</li>
						<li>
							<a href="http://192.168.1.77:8081/omsTool-web/RES/projects/BabyStore_Operation/O-list.html">
							订单列表</a>
						</li>
					</ul>
				</li> -->
								
				
			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>
	<!-- END SIDEBAR -->