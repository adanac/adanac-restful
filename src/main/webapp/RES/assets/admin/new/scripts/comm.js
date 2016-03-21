$(document).ready(function() {
    

    // layer.alert('内容');





//全选、取消
    $('#checkbox_all').on('click',function(){
        if($("#checkbox_all").prop("checked")){
            $("[name^='the_checkbox']").prop("checked",true);
        }else{
            $("[name^='the_checkbox']").prop("checked",false);
        }
    })


    $('.td_del').on('click', function(event) {
        $(this).parents('tr').remove();
        event.preventDefault();
        /* Act on the event */
    });






















});









// 页内搜索
    function highlight(vID,sID)
    {
        // console.log(vID);
        // console.log(sID);
        // clearSelection(sID);//先清空一下上次高亮显示的内容；
        var searchText = vID.val();//获取你输入的关键字；
        var regExp = new RegExp(searchText, 'g');//创建正则表达式，g表示全局的，如果不用g，则查找到第一个就不会继续向下查找了；
        sID.find('a').each(function()//遍历文章；
        {
            var html = $(this).html();
            var newHtml = html.replace(regExp, '<span class="highlight">'+searchText+'</span>');//将找到的关键字替换，加上highlight属性；
            var result = regExp.test(html);

            console.log("Result: " + result);

            if(!regExp.test(html)){
                $(this).html(newHtml);//更新文章；
            }else{
                $(this).parents('li').addClass('none');
            }
            
        });
    }
    function clearSelection(sID)
    {
        sID.find('a').each(function()//遍历
        {
            $(this).find('.highlight').each(function()//找到所有highlight属性的元素；
            {
                $(this).replaceWith($(this).html());//将他们的属性去掉；
            });
            $(this).parents('li').removeClass('none');
        });
    }


