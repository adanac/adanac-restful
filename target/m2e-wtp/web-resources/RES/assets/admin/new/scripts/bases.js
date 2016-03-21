(function(){

	btn($("#newFP"),newTr);
	btn($("#portlet-wl"),newTr2);
	bianjiBtn();
	function rowTr(){
        var row_tr=$("table tbody tr");
        for (var i = 0; i < row_tr.length; i++) {
            if(i%2)$(row_tr[i]).css("background-color","rgb(249,249,249)");
            else $(row_tr[i]).css("background-color","#eee")
        }
    }
	function newTr(){
        return '<td>'
                +'<div class="fp-Tab-put">'
                    +    '<input type="text" value="" style="background-color:#fff;">'
                   +'</div>'
               +'</td>'
               +'<td>'
                +   '<div class="fp-Tab-put">'
                +        '<input type="text" value="" style="background-color:#fff;">'
                +    '</div>'
               +'</td>'
               
               +'<td style="width: 160px;">'
                +   '<div class="input-group date date-picker input-group2" data-date-format="yyyy-mm-dd">'
                +        '<input type="text" class="form-control" style="background-color:#fff;" name="kaiye_date" size="16" value="">'
                +        '<span class="input-group-btn">'
                +            '<button class="btn default" type="button"><i class="fa fa-calendar"></i></button>'
                +        '</span>'
                +    '</div>'
               +'</td>'
               +'<td>'
                +   '<div class="fp-Tab-put">'
                +        '<input type="text" value="" style="background-color:#fff;">'
                +   '</div>'
               +'</td>'
               +'<td>'
               +	'<div class="fp-Tab-put">'
				+		'<input type="text" value="" style="background-color:#fff;">'
               	+	'</div>'
               +'</td>'
               +'<td>'
                +   '<div class="fp-Tab-put">'
                +       '<span class="fp-bianji">保存</span> '
                +       '<span class="fp-save fp-dele">删除</span>'
                +   '</div>'
               +'</td>';

	}
	function newTr2(){
        return '<td>'
                +'<div class="fp-Tab-put">'
                    +    '<input type="text" value="" style="background-color:#fff;">'
                   +'</div>'
               +'</td>'
               +'<td>'
                +   '<div class="fp-Tab-put">'
                +        '<input type="text" value="" style="background-color:#fff;">'
                +    '</div>'
               +'</td>'
               +'<td>'
                +   '<div class="fp-Tab-put">'
                +        '<input type="text" value="" style="background-color:#fff;">'
                +   '</div>'
               +'</td>'
               +'<td>'
               +	'<div class="fp-Tab-put">'
               +   		'<input type="text" placeholder="仅供应商查看" style="text-align: center;background-color:#fff;">'
               	+	'</div>'
               +'</td>'
               +'<td style="width: 160px;">'
                +   '<div class="input-group date date-picker input-group2" data-date-format="yyyy-mm-dd">'
                +        '<input type="text" class="form-control" style="background-color:#fff;" name="kaiye_date" size="16" value="">'
                +        '<span class="input-group-btn">'
                +            '<button class="btn default" type="button"><i class="fa fa-calendar"></i></button>'
                +        '</span>'
                +    '</div>'
               +'</td>'
               

               +'<td>'
                +   '<div class="fp-Tab-put">'
                +       '<span class="fp-bianji">保存</span> '
                +       '<span class="fp-save fp-dele">删除</span>'
                +   '</div>'
               +'</td>';

	}

	function a(that){
		var par_tr=$(that).parents("tr"),
			select=par_tr.find("select")
			input=par_tr.find("input"),
			html=that.innerHTML;

		if(html==="编辑"){
			that.innerHTML="保存";
			for (var i = 0; i < input.length; i++) {
				input[i].removeAttribute("disabled");
				input[i].style.backgroundColor="#fff";
				
				if(select[i]){
					select[i].style.backgroundColor="#fff";
					select[i].removeAttribute("disabled");
				}
			}
		}else if(html==="保存"){
			alert("保存成功")
			that.innerHTML="编辑";
			for (var i = 0; i < input.length; i++) {
				input[i].setAttribute("disabled",true);
				input[i].style.backgroundColor="transparent";
				if(select[i]){
					select[i].style.backgroundColor="transparent";
					select[i].setAttribute("disabled",true);
				}
			}
		}
	}
	function s(that){
		var par_tr=$(that).parents("tr"),
			tbody=par_tr.parent();
		tbody[0].removeChild(par_tr[0])
	}
	function bianjiBtn(){
		var btn=$(".fp-bianji"),
			btn2=$(".fp-dele");
		btn.on("click",function(){
			a(this);
			
		});
		btn2.on("click",function(){
			s(this);
		})
	}
	function btn(target,trText){
		target.on("click",function(){
			var that=$(this),
				tbody=that.parents(".page-list").find("tbody"),
				last=null,
				new_tr=document.createElement("tr");
			new_tr.innerHTML=trText();
			tbody[0].appendChild(new_tr);
			rowTr();
			last=tbody.find("tr")[tbody.find("tr").length-1];
			last_td=$(last).find(".fp-bianji");
			
			var btn=$(".fp-bianji"),btn2=$(".fp-dele");
			console.log(btn2.length)
			for (var i = 0; i < btn.length; i++) {
				$(btn[i]).unbind("click");
			}
			for (var b = 0; b < btn2.length; b++) {
				$(btn2[b]).unbind("click");
			};
			btn2.on("click",function(){
				s(this);
			});
			btn.on("click",function(){
				a(this);
				
			});
			try{
				$('.date-picker').datepicker({
		            rtl: Metronic.isRTL(),
		            language: 'zh-CN',
		            autoclose: true
		        });
		        Metronic.init(); // init metronic core components
			}catch(ex){

			}
			
			
			
		})
	}
})();