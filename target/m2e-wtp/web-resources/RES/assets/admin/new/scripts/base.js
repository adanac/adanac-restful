
function Menu(){
    var page_title=$(".page-title"),
        page=page_title.html().indexOf("<")-1>-1?page_title.html().indexOf("<")-1:page_title.html().length,
        title="",ff=false,dex=0,t="",
        page_sidebar=$(".page-sidebar-menu"),
        slide=page_sidebar.children("li");
    for (var i = 0; i < page; i++) {
        if(page_title.attr("data-title")){
            title=page_title.attr("data-title");
        }else {
            title+=page_title.html()[i];
        }
        
    };
    t=title.match(/[\u4e00-\u9fa5]/g).join("");
    for (var i =0; i < slide.length; i++) {
        
        var n_=$(slide[i]),n_li=n_.find("li");
        if(ff)break;
        if(n_.attr("class")==="sidebar-toggler-wrapper")continue;
       // if(n_li.length<=0)continue;
        if(n_.find(".title").html()===t){
            n_.addClass("active open");
           // break;
        }else if(n_.find("title").attr("data-title")===t){
            n_.addClass("active open");

        };

        
        for (var a = 0; a < n_li.length; a++) {
            var nI=$(n_li[a]).find("a"),place=nI.text().match(/[\u4e00-\u9fa5]/g).join("");
                
            if(place===t){
                $(n_li[a]).addClass("active");
                $(n_li[a]).parents("li").addClass("active open");
                ff=true;
                break;
            }else{
                    /*测试专用,以防ie崩溃*/
                dex++;
                if(dex===100){
                    
                    ff=true;
                    break;
                }

            }
        }
    }
}
function TabTable(json,ff){
    var new_table=document.createElement("table"),
        new_body=document.createElement("tbody"),
        new_head=document.createElement("thead"),
        date=0,date2=0,date3=0,date4=0,date5=0,date6=0,date7=0,date8=0,
        date1dex=0,
        date2dex=0,
        date3dex=0,
        date4dex=0,
        date5dex=0,
        date6dex=0,
        date7dex=0,
        date8dex=0,
        date1Arr=["2015-04-12<br />23:09:50","2015-3-21<br />23:09:50","2015-02-25<br />23:09:50","2015-01-31<br />23:09:50","2015-11-22<br />23:09:50"];
        date2Arr=["2015-04-13<br />12:09:50","2015-3-22<br />13:09:50","2015-02-25<br />14:09:50","2015-02-01<br />02:09:50","2015-11-23<br />08:09:50"];
        date3Arr=["<a href='trade-order-details.html'>201601092754783327342</a>","<a href='trade-order-details.html'>201601092452783347823</a>","<a href='trade-order-details.html'>201601092232781234832</a>","<a href='trade-order-details.html'>201601092782987657832</a>","<a href='trade-order-details.html'>201601092782912349876</a>"];
	date8Arr=["<a href='trade-service-details.html'>201601092754783327342</a>","<a href='trade-service-details.html'>201601092452783347823</a>","<a href='trade-service-details.html'>201601092232781234832</a>","<a href='trade-service-details.html'>201601092782987657832</a>","<a href='trade-service-details.html'>201601092782912349876</a>"];
        date4Arr=["你的大大易购","我的小小易购","疯狂购物","就哈哈哈","hheh "];
        date5Arr=["￥123.00","￥234.00","￥76.00","￥897","￥123.00"];
        date6Arr=["2015-04-13<br />12:09:50","2015-3-22<br />13:09:50","2015-02-25<br />14:09:50","2015-02-01<br />02:09:50","2015-11-23<br />08:09:50"];
        date7Arr=[2,3,4,5,6];

    //头部
    function createHead(){
        var  new_tr=document.createElement("tr");
        for (var i = 0; i < json.title.length; i++) {
            var text=json.title[i],new_td='<td>'+text+'</td>';
            new_tr.innerHTML+=new_td;
            if(json.title[i]==="创建日期")date=i+1;
            else if(json.title[i]==="支付日期")date2=i+1;
            else if(json.title[i]==="订单编号")date3=i+1;
            else if(json.title[i]==="买家信息")date4=i+1;
            else if(json.title[i]==="订单总金额")date5=i+1;
            else if(json.title[i]==="发货日期")date6=i+1;
            else if(json.title[i]==="订单总数量")date7=i+1;
            else if(json.title[i]==="售后订单")date8=i+1;
        }

        new_head.appendChild(new_tr);
        new_table.appendChild(new_head);
    }
    createHead();
    //头部结束


    //body
    function createBody(ff){
        var new_tr='',
            new_text='',
            body_text='',
            a=0,b=0,
            bodyRow=json.bodyRow;
        function Row(){
            for (var i = 0; i < json.body.length; i++) {
                var text=json.body[i];
               if(date-1===i){
                    //alert(date)
                    new_td='<td>'+date1Arr[date1dex]+'</td>';
                    date1dex++;
                   // continue;
               }else if(date2-1===i){
                    new_td='<td>'+date2Arr[date2dex]+'</td>';
                    date2dex++;
               }else if(date3-1===i){
                    new_td='<td style="width:200px">'+date3Arr[date3dex]+'</td>';
                    date3dex++;
               }else if(date4-1===i){
                    new_td='<td>'+date4Arr[date4dex]+'</td>';
                    date4dex++;
               }else if(date5-1===i){
                    new_td='<td>'+date5Arr[date5dex]+'</td>';
                    date5dex++;
               }else if(date6-1===i){
                    new_td='<td>'+date6Arr[date6dex]+'</td>';
                    date6dex++;
               }else if(date7-1===i){
                    new_td='<td>'+date7Arr[date7dex]+'</td>';
                    date7dex++;
               }else if(date8-1===i){

                    new_td='<td style="width:200px">'+date8Arr[date8dex]+'</td>';
                    date8dex++;
               }else if(ff===1){
                    if(i===8){
                        new_td='<td>'+json.body[i][b]+'</td>';
                        b++;
                        //console.log(json.body[i][b])
                    }else if(typeof json.body[i]==="object"){
                        if(json.stuas){
                            new_td='<td>'+json.body[i][a]+'</td>';
                            a++;
                        }
                    }else{
                        new_td='<td>'+text+'</td>';
                    }

                    
                }else {
                    new_td='<td>'+text+'</td>';
                }
                new_text+=new_td;

            }
            new_tr='<tr>'+new_text+'</tr>';
            return new_tr;
        };
        for (var i = 0; i < bodyRow; i++) {
            body_text+=Row();
            new_text='';
        }
        new_body.innerHTML=body_text;
        new_table.appendChild(new_body);
        
    }
    function whole(){
        var box=$("#whole-box"),ff=false;
        box.on("change",function(){
            var that=$(this),table=that.parents("table");
                checkbox=table.find("input");
            for (var i = 0; i < checkbox.length; i++) {
                if(!ff){
                    checkbox[i].setAttribute("checked",true);
                    if(i===checkbox.length-1){ff=true}
                }else{
                    checkbox[i].removeAttribute("checked");
                    if(i===checkbox.length-1){ff=false}
                };
            }
        })
    }
    createBody(ff);
    //body结束

    json.target.html(new_table);
    whole();

   
}

function progress(dex){
    var bar=$(".progress-bar"),
        nav_pills=$(".nav-pills li");
        wid=nav_pills.width();
    for (var i = 0; i < nav_pills.length; i++) {
        $(nav_pills[i]).removeClass("active");
    }
    $(nav_pills[dex-1]).addClass("active");
    bar.css("width",dex*wid+"px");
}
(function(){
    var page_tip=$(".page-tip"),
        num=0,captionSpan=$(".caption span"),
        jyTab=$("#page-Tab");

    function rowTr(){
        var row_tr=$("table tbody tr");
        for (var i = 0; i < row_tr.length; i++) {
            if(i%2)$(row_tr[i]).css("background-color","rgb(249,249,249)");
            else $(row_tr[i]).css("background-color","#eee")
        }
    }
    var arr=["<span class='daizf'>待支付</span>","<span class='daizf'>未发货</span>","<span class='fahuo'>已发货</span>","<span class='fahuo'>已完成</span>","<span class='yellow'>已取消</span>"],
        arr2=['icon-close2','icon-fahuo','ddJushou','icon-chakan',''],
        num2="201601092782783827832",
        arr3=["","","<span class='fahuo'>已揽件</span>","<span class='fahuo'>已签收</span>","<span class='fahuo'>已签收</span>"],
        arr4=["<span class='fp-staus'>否</span>","<span class='fp-staus'>否</span>","<span class='fp-staus'>否</span>","<span class='fp-staus'>否</span>","<span class='fp-staus'>否</span>"];
    $(".step").on("click",function(){
        return false;
    });
    rowTr();
    Jindu();
    evSearch();
    Yulan();
    jtFenye();
    TabBox();
    if($(".jy-Tab")[0]){
        TabTable({
            target:$("#page-Tab"),
            title:["订单编号","创建日期","支付日期","订单总数量","订单总金额","买家信息","订单状态","发货日期","发票信息","操作"],
            body:["<a href='trade-order-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","2015-8-18<br />23:05:00","6","￥78.90<br />(含快递:10.00)","你的大大易购",arr,"2015-8-18<br />23:03:00",arr4,"<a href='javascript:void(0)' class='box-btn icon icon-close2' title='订单关闭' data-attr='ddClose'></a><a href='trade-order-details.html' class='box-btn icon icon-fahuo' title='订单发货' data-attr=''></a><a href='trade-order-details.html' class='box-btn icon icon-weihu' title='发票维护'></a><a href='javascript:void(0)' class='box-btn icon icon-jvshou' title='发票拒收' data-attr='ddJushou'></a>"],
            bodyRow:4,
            stuas:true,
            clas:true
        },1);
    }else if($(".sh-Tab")[0]){
        TabTable({
            target:jyTab,
            title:["售后订单","售后日期","售后类型","售后原因","退款金额<br /退货数量","买家信息","售后完成时间","售后状态","发票信息","物流信息","操作"],
            body:["<a href='trade-service-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","退款","商品质量问题","￥1.00","","","<span class='daizf'>待确认</span>","<span class='fp-staus'>否</span>","",'<a href="javascript:void(0)" title="订单查看" class="box-btn icon icon-chakan" data-attr="chakan"></a>'],
            bodyRow:4
        })
    }
    
    TabBox();
    rowTr();
    navList();
    for (var i = 0; i < page_tip.length; i++) {
        var self=$(page_tip[i]),
            page_li=self.find("li"),
            page_active=self.find(".active2");

        for (var a = 0; a < page_li.length; a++) {
            $(page_li[a]).on("click",function(){
                
                var that=$(this),now_tip=that.parents(".page-tip"),page_table=now_tip.next().find("#page-Tab"),
                    page_staus=now_tip.parent(),i=0,
                    num2="201601092782783827832",
                    fahuoFF=that.attr("data-ff"),page_title_btn=$(".page-title-btn");
                page_title_btn.css("display","none");
                captionSpan.html(that.html());
                switch(that.html()){
                    case "全部订单":
                         var arr=["<span class='daizf'>待支付</span>","<span class='daizf'>未发货</span>","<span class='fahuo'>已发货</span>","<span class='fahuo'>已完成</span>","<span class='yellow'>已取消</span>"],
                             arr2=['icon-close2','icon-fahuo','ddJushou','icon-chakan',''];

                        TabTable({
                            target:page_table,
                            title:["订单编号","创建日期","支付日期","订单总数量","订单总金额","买家信息","订单状态","发货日期","发票信息","操作"],
                            body:["<a href='trade-order-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","2015-8-18<br />23:05:00","6","￥78.90<br />(含快递:10.00)","你的大大易购",arr,"2015-8-18<br />23:03:00",arr4,"<a href='javascript:void(0)' class='box-btn icon icon-close2' title='订单关闭' data-attr='ddClose'></a><a href='交易管理-订单详情 - 副本.html' class='box-btn icon icon-fahuo' title='订单发货' data-attr=''></a><a href='交易管理-订单详情 - 副本.html' class='box-btn icon icon-weihu' title='发票维护'></a><a href='javascript:void(0)' class='box-btn icon icon-jvshou' title='发票拒收' data-attr='ddJushou'></a>"],
                            bodyRow:4,
                            stuas:true,
                            clas:true
                        },1);
                        break;
                    case "待支付":
                        TabTable({
                            target:page_table,
                            title:["订单编号","创建日期","支付日期","订单总数量","订单总金额","买家信息","订单状态","发票信息","操作"],
                            body:["<a href='trade-order-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","2015-8-18<br />23:05:00","6","￥78.90<br />(含快递:10.00)","你的大大易购","<span class='daizf'>待支付</span>","<span class='fp-staus'>否</span>","<a href='javascript:void(0)' class='box-btn icon icon-close2' title='订单关闭' data-attr='ddClose'></a>"],
                            bodyRow:4
                        })
                        break;
                    case "未发货":
                        page_title_btn.css("display","inline-block");
                        TabTable({
                            target:page_table,
                            title:["<input id='whole-box' type='checkbox'>","订单编号","创建日期","支付日期","订单总数量","订单总金额","买家信息","订单状态","发货日期","发票信息","操作"],
                            body:["<input type='checkbox'>","<a href='trade-order-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","2015-8-18<br />23:05:00","6","￥78.90<br />(含快递:10.00)","你的大大易购","<span class='daizf'>未发货</span>","","<span class='fp-staus'>否</span>","<a href='trade-order-details.html' class='box-btn icon icon-fahuo' title='订单发货' data-attr=''></a><a href='trade-order-details.html' class='box-btn icon icon-weihu' title='发票维护'></a>"],
                            bodyRow:4
                        })
                        break;
                    case "已发货":
                        TabTable({
                            target:page_table,
                            title:["订单编号","创建日期","支付日期","订单总数量","订单总金额","买家信息","订单状态","发货日期","发票信息","操作"],
                            body:["<a href='trade-order-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","2015-8-18<br />23:05:00","6","￥78.90<br />(含快递:10.00)","你的大大易购","<span class='fahuo'>已发货</span>","2015-8-18<br />23：03：00","<span class='fp-staus'>否</span>","<a href='javascript:void(0)' title='订单拒收' class='box-btn icon icon-jvshou' data-attr='ddJushou'></a>"],
                            bodyRow:4
                        })
                        break;
                    case "已完成":
                        if(fahuoFF==="2"){
                            TabTable({
                                target:page_table,
                                title:["售后订单","售后日期","售后类型","售后原因","退款金额<br /退货数量","买家信息","售后完成时间","售后状态","发票信息","物流信息","操作"],
                                body:["<a href='trade-service-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","退款","商品质量问题","￥1.00","","2015-8-18<br />23:03:00","<span class='fahuo'>已完成</span>","<span class='fp-staus'>否</span>","<span class='fahuo'>已签收</span>",'<a href="javascript:void(0)" title="订单查看" class="box-btn icon icon-chakan" data-attr="chakan"></a>'],
                                bodyRow:4
                            })
                        }else {
                            TabTable({
                                target:page_table,
                                title:["订单编号","创建日期","支付日期","订单总数量","订单总金额","买家信息","订单状态","发货日期","发票信息","操作"],
                                body:["<a href='trade-order-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","2015-8-18<br />23:05:00","6","￥78.90<br />(含快递:10.00)","你的大大易购","<span class='fahuo'>已完成</span>","2015-8-18 23：03：00","<span class='fp-staus'>否</span>","<a href='javascript:void(0)'  title='订单查看' class='box-btn icon icon-chakan' data-attr='chakan'></a>"],
                                bodyRow:4
                            })
                        }
                        
                        break;
                    case "已取消":
                        TabTable({
                            target:page_table,
                            title:["订单编号","创建日期","支付日期","订单总数量","订单总金额","买家信息","订单状态","发货日期","发票信息","操作"],
                            body:["<a href='trade-order-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","2015-8-18<br />23:05:00","6","￥78.90<br />(含快递:10.00)","你的大大易购","<span class='yellow'>已取消</span>","","<span class='fp-staus'>否</span>",""],
                            bodyRow:4
                        })
                        break;
                    case "待确认":
                        TabTable({
                            target:page_table,
                            title:["售后订单 ","售后日期","售后类型","售后原因","退款金额<br /退货数量","买家信息","售后完成时间","售后状态","发票信息","物流信息","操作"],
                            body:["<a href='trade-service-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","退款","商品质量问题","￥1.00","","","<span class='daizf'>待确认</span>","<span class='fp-staus'>否</span>","",'<a href="javascript:void(0)" title="订单查看" class="box-btn icon icon-chakan" data-attr="chakan"></a>'],
                            bodyRow:4
                        })
                        break;
                    case "待退款":
                        TabTable({
                            target:page_table,
                            title:["售后订单","售后日期","售后类型","售后原因","退款金额<br /退货数量","买家信息","售后完成时间","售后状态","发票信息","物流信息","操作"],
                            body:["<a href='trade-service-details.html'>"+num2+"</a>","2015-8-18<br />23:03:00","退款","商品质量问题","￥1.00","","","<span class='daizf'>待退款</span>","<span class='fp-staus'>否</span>","<span class='fahuo'>已签收</span>",'<a href="javascript:void(0)" title="订单查看" class="box-btn icon icon-chakan" data-attr="chakan"></a>'],
                            bodyRow:4
                        })
                        break;
                }
                num+=100;
                page_active.removeClass("active2");
                that.addClass("active2");
                page_active=that;
                TabBox();
                rowTr();

            })
        }
    }
    function navList(){
        var list=$(".page-nav li"),pageList=$(".page-list"),z=0;
        $("#portlet-fp").on("click",function(){
            aa("发票")
        });
        $("#portlet-fh").on("click",function(){
            aa("物流")
        })
        function aa(ff){
            var page_fp,active=list.parent().find(".page-nav-active");
            for (var a = 0; a < pageList.length; a++) {
                pageList[a].style.display="none";
                //if($(list[a])[0]===this)z=a;
            }
            for (var i = 0; i < list.length; i++) {
                if(list[i].innerHTML===ff){
                    page_fp=i;
                    break;
                }
            }
            pageList[page_fp].style.display="block";
            active.removeClass("page-nav-active");
            $(list[page_fp]).addClass("page-nav-active");
        }
        for (var i = 0; i < list.length; i++) {
            var self=$(list[i]);
            self.on("click",function(){
                var active=list.parent().find(".page-nav-active");
                for (var a = 0; a < pageList.length; a++) {
                    pageList[a].style.display="none";
                    if($(list[a])[0]===this)z=a;
                }
                active.removeClass("page-nav-active");
                pageList[z].style.display="block";
                $(this).addClass("page-nav-active");
            })
        }
    }
    function Jindu(){
        var ev_jindu=$(".ev-jindu"),widArr=[300,230,200],
            par=ev_jindu.parent(),
            ev_p=par.children("p"),
            wid=0,
            p_wid=ev_p.each(function(i){
                if(i>4)return;
                wid+=$(this).width();
            });
            
        for (var i = 0; i < ev_jindu.length; i++) {
            var self=$(ev_jindu[i]);
            if(widArr[i]>=wid+5){
                widArr[i]=wid+5;
            }
            self.animate({
                width:widArr[i]+"px"
            },2000)
        }
    }
    function jtFenye(){
        var dy_btn=$(".dy-jt"),kuang=$(".dy-kuang"),wid=kuang.find(".dy-wid").width(),dex=0;
        for (var i = 0; i < dy_btn.length; i++) {
            var self=$(dy_btn[i]);
            self.on("click",function(){
                var that=$(this);
                if(that.attr("class").indexOf("dy-left")>-1){
                    console.log("left");
                    dex--;

                }else if(that.attr("class").indexOf("dy-right")>-1){
                    console.log("right");
                    dex++;
                }
                kuang.animate({
                    left:-(dex*wid)+"px"
                })
            })
        }
    }
    function Yulan(){
        var y=$("#dy-yulan"),b=$(".body-bj"),t=$(".dy-tan");
        y.on("click",function(e){
            e.preventDefault();
            b[0].style.display="block";
            t[0].style.display="block";
            b.on("click",function(){
                this.style.display="none";
                t[0].style.display="none";
            })
        })
    }
    function evSearch(){
        var search=$("#ev-search");
        search.on("keydown",function(ev){
            var eve=window.event||ev;
            if(eve.keyCode===13){
                alert("tiao")  //回车
            };
        })
    }
    function TabBox(){
        var A_btn=$(".box-btn"),body=document.body,body_bj=$(".body-bj"),Bohui=$("#Bohui");
        A_btn.push(Bohui[0]);

        function newHang(){
            var n=$("#box-newRow"),
                parent=n.parent(),
                input=parent.children("input");
            
            n.on("click",function(){

                var n_input=document.createElement("input");
                n_input.type="text";
                parent[0].appendChild(n_input);
                n_input="";
            })
        }
        for (var i = 0; i < A_btn.length; i++) {
            var self=$(A_btn[i]),ff=false;
            self.on("click",function(){

                var that=$(this),body_box=document.createElement("div");
                body_box.className="body-box";
                switch(that.attr("data-attr")){
                    case "fapiao":{
                         body_box.innerHTML=createBox({
                            leng:3,
                            attr:["发票代码","发票号码","发票日期"]
                        },1);
                        body_bj.css("display","block");
                        body.appendChild(body_box);
                        TabClose();
                        break;
                    }
                    case "ddFahuo":{
                        body_box.innerHTML=createBox({
                            leng:3,
                            attr:["订单编号","物流公司","物流运单"]
                        },1,"new");
                        body_bj.css("display","block");
                        body.appendChild(body_box);
                        TabClose();
                        newHang();
                        break;
                    }
                    case "ddClose":{
                        body_box.innerHTML=createBox(null,2);
                        body_bj.css("display","block");
                        body.appendChild(body_box);
                        TabClose();
                        break;
                    }
                    case "ddJushou":{
                        body_box.innerHTML=createBox(null,3);
                        body_bj.css("display","block");
                        body.appendChild(body_box);
                        TabClose();
                        break;
                    }
                    case "chakan":{
                        body_box.innerHTML=createBox({
                            leng:3,
                            attr:["发票代码","发票号码","发票日期"]
                        },4);
                        body_bj.css("display","block");
                        body.appendChild(body_box);
                        TabClose();
                        break;
                    }
                    case "Bo":{
                        body_box.innerHTML=createBox(null,5);
                        body_bj.css("display","block");
                        body.appendChild(body_box);
                        TabClose();
                        break;
                    }
                }
            })
        };
        function createBox(json,ff,New){
            var box='',close='',open='';
            if(ff===1||ff===5)close='<div class="box-foot-btn box-foot-close">取消<span class="box-bor"></span></div>',open='<div class="box-foot-btn box-foot-ok">确定</div>';
            else open='<div class="box-foot-btn box-foot-ok wid100">确定</div>';
            
            var labelDom='',newRow='';

            if(ff===1){
                for (var i = 0; i < json.leng; i++) {
                  
                    if(New){
                        if(i===json.leng-1)newRow='<a href="javascript:void(0)" id="box-newRow">新增</a>';
                    }
                    var label='<label class="box-auto">'
                    +        '<div class="box-tip">'+json.attr[i]+'</div>'
                    +        '<div class="box-input">'
                    +            '<input type="text">'+newRow
                    +        '</div>'
                    +        '<p class="clear"></p>'
                    +    '</label>';
                    labelDom+=label;
                }
                
            }else if(ff===2){
                labelDom='<label class="box-cheng">'
                        +'<div class="box-ok"><img src="../../assets/admin/new/images/yes.png" alt="" /></div></div>'
                        +'<div class="box-tip2">订单关闭成功!</div>'
                        +'<p class="clear"></p>'
                        +'</label>'
            }else if(ff===3){
                labelDom='<label class="box-cheng">'
                        +'<div id="box-tip3">订单拒收成功</div>'
                        +'<div id="box-tip4">退货订单号：</div>'
                        +'<p class="clear"></p>'
                        +'</label>'
            }else if(ff===4){
                labelDom='<label class="box-cheng">'
                        +'<div id="box-staus">'
                        +   '<div class="box-radius">'
                        +       '<span class="box-yuan"></span>'
                        +       '<span class="box-xian"></span>'
                        +   '</div>'
                        +   '<div class="box-radText">您的快件已签收，感谢使用XXX快递公司</div>'
                        +'</div>'
                         +'<div id="box-staus">'
                        +   '<div class="box-radius">'
                        +       '<span class="box-yuan"></span>'
                        +       '<span class="box-xian"></span>'
                        +   '</div>'
                        +   '<div class="box-radText">您的快件已派件，</div>'
                        +'</div>'
                        +'<div id="box-staus">'
                        +   '<div class="box-radius">'
                        +       '<span class="box-yuan box-yuan-active"></span>'
                        +       '<span class="box-xian"></span>'
                        +   '</div>'
                        +   '<div class="box-radText">您的快件已运送，</div>'
                        +'</div>'
                         +'<div id="box-staus">'
                        +   '<div class="box-radius">'
                        +       '<span class="box-yuan"></span>'
                        +       '<span class="box-xian"></span>'
                        +   '</div>'
                        +   '<div class="box-radText">您的快件已发货，申通快递 232399922222</div>'
                        +'</div>'
                        +'<p class="clear"></p>'
                        +'</label>'
            }else if(ff===5){
                labelDom='<label class="box-cheng">'
                        +'<p>驳回理由</p>'
                        +'<textarea placeholder="请认真填写驳回理由，客服将依此作为判定依据" name="" id="box-boText" cols="30" rows="10"></textarea>'
                        +'</label>'
            }
            
            box='<form action="">'
                +   labelDom
                +    '<label class="box-foot">'
                +        close
                +        open
               // +        '<p class="clear"></p>'
                +    '</label>'
                +'</form>';
            return box;
        }
        
        
        
    };
    function TabClose(){
        var body_bj=$(".body-bj"),
            next=$(".body-box");
        $(".box-foot-close,.box-foot-ok").on("click",function(){
            var that=$(this);
            body_bj.css("display","none");
            if(next.attr("class")==="body-box"){
                next.remove();
            }
           
            if(that.attr("class").indexOf("box-foot-ok")>-1){
                //alert("ok")
            }else if(that.attr("class").indexOf("box-foot-close")>-1){
               // alert("close")
            }
        })
    }
})()
	function setDom(fun,ff,num){
		var ffAttr=function(){
			var b='<li class="start active open">',c='<li class="end">';
			var a=ff===1?c:b,d=ff===2?c:b;
						
			return [d,a];
		};
		
		var DomText={
			footer:'<div class="page-footer-in"> 2015 &copy; 江苏纪创云网络科技有限公司. <a href="#" title="" target="_blank">请购买!</a></div><div class="scroll-to-top"><i class="icon-arrow-up"></i></div>',
			header:'<div class="page-header-inner">'
			        +'<!-- BEGIN LOGO -->'
			        +'<div class="page-logo">'
			        +    '<a href="index.html">'
			        +    '<img src="../../assets/admin/layout/img/logo.png" alt="logo" class="logo-default"/>'
			        +    '</a>'
			        +    '<div class="menu-toggler sidebar-toggler hide">'
			        +        '<!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->'
			        +    '</div>'
			        +'</div>'
			        +'<!-- END LOGO -->'
			        +'<div class="page-header-title">零售业全渠道O2O平台</div>'
			        +'<!-- BEGIN RESPONSIVE MENU TOGGLER -->'
			        +'<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"></a>'
			        +'<!-- END TOP NAVIGATION MENU -->'
			        +'<div class="top-menu">'
			        +    '<ul class="nav navbar-nav pull-right">'
			        +        '<li>'
			        +            '<div class="header">南京分店</div>'
			        +        '</li>'
			        +        '<li class="dropdown dropdown-user">'
			        +            '<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">'
			        +                '<img alt="" class="img-circle" src="../../assets/admin/layout/img/avatar3_small.jpg">'
			        +                '<span class="username username-hide-on-mobile"> 刘聪 </span>'
			        +                '<i class="fa fa-angle-down"></i>'
			        +            '</a>'
			        +            '<ul class="dropdown-menu dropdown-menu-default">'
			        +                '<li>'
			        +                    '<a href="extra_profile.html">'
			        +                    '<i class="icon-user"></i> 个人设置 </a>'
			        +                '</li>'
			        +                '<li>'
			        +                    '<a href="page_calendar.html">'
			        +                    '<i class="icon-calendar"></i> 修改密码 </a>'
			        +                '</li>'
			        +                '<li>'
			        +                    '<a href="login.html">'
			        +                    '<i class="icon-key"></i> 安全退出 </a>'
			        +                '</li>'
			        +            '</ul>'
			        +        '</li>'
			        +     '</ul>'
			        +'</div>'
			    +'</div>'  ,
		   menu:'<div class="page-sidebar navbar-collapse collapse">'
				+'<!-- BEGIN SIDEBAR MENU -->'
				+'<ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">'
				+'<li class="sidebar-toggler-wrapper">'
				+'<!-- BEGIN SIDEBAR TOGGLER BUTTON -->'
                +'<div class="sidebar-title">商户中心</div>'
				+'<div class="sidebar-toggler"></div>'
				+'<!-- END SIDEBAR TOGGLER BUTTON -->'
				+'</li>'
				+'<li class="sidebar-search-wrapper">'
				+'<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->'
				+'<form class="sidebar-search " action="extra_search.html" method="POST">'
				+'<a href="javascript:;" class="remove">'
				+'<i class="icon-close"></i>'
				+'</a>'
				+'<div class="input-group">'
				+'<input type="text" class="form-control" placeholder="搜索...">'
				+		'<span class="input-group-btn">'
				+		'<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>'
				+		'</span>'
				+	'</div>'
			+	'</form>'
			+	'<!-- END RESPONSIVE QUICK SEARCH FORM -->'
			+'</li>'
			+ffAttr()[0]
			+	'<a href="javascript:;"><i class="fa fa-info"></i><span class="title">商户信息</span><span class="arrow "></span></a>'
			+	'<ul class="sub-menu">'
			+		'<li class="list"><a href="商户信息-企业管理.html"><i class="fa fa-building"></i> 企业管理 </a></li>'
			+		'<li class="list"><a href="商户信息-部门管理.html"><i class="fa fa-bank"></i> 部门管理 </a></li> '
			+		'<li class="list"><a href="商户信息-员工管理.html"><i class="icon-users"></i> 员工管理 </a></li>'
			+	'</ul>'
			+'</li>'
			+ffAttr()[1]
			+	'<a href="javascript:;"><i class="glyphicon glyphicon-cog"></i><span class="title">服务设置</span><span class="arrow "></span></a>'
			+	'<ul class="sub-menu">'
			+		'<li class="list"><a href="服务设置-支付宝.html"><i class="glyphicon glyphicon-qrcode "></i> 支付宝 </a></li>'
			+		'<li class="list"><a href="服务设置-微支付.html"><i class="glyphicon glyphicon-barcode "></i> 微支付 </a></li>'
			+	'</ul>'
		+	'</li>'
	+	'</ul>'
	+'</div>'
		};
		var target={
			footer:$(".page-footer"),
			header:$(".page-header"),
			wrapper:$(".page-container .page-sidebar-wrapper")[0]
		};
		target.footer.html(DomText.footer);
		target.header.html(DomText.header);
		target.wrapper.innerHTML=DomText.menu;

		if(target.header.children("*").length>0&&target.footer.children("*").length>0&&$(target.wrapper).children("*").length>0){
			fun();
			var f="active",list=$(".list");
			if(num){
				$(list[num-1]).addClass(f);
			}
		}
		
	}

