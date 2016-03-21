function Menu(){
    var page_title=$(".page-title"),
        page=page_title.html().indexOf("<")-1,
        title="",ff=false,dex=0,
        page_sidebar=$(".page-sidebar-menu"),
        slide=page_sidebar.children("li");
    for (var i = 0; i < page; i++) {
        title+=page_title.html()[i];
    };

    for (var i = 0; i < slide.length; i++) {
        var n_=$(slide[i]),n_li=n_.find("li");
        if(ff)break;
        if(n_.attr("class")==="sidebar-toggler-wrapper")continue;
        if(n_li.length<=0)continue;
        
        for (var a = 0; a < n_li.length; a++) {
            var nI=$(n_li[a]).find("a"),place=nI.text().match(/[\u4e00-\u9fa5]/g).join(""),
                t=title.match(/[\u4e00-\u9fa5]/g).join("");
                
            if(place===t){
                $(n_li[a]).addClass("active");
                $(n_li[a]).parents("li").addClass("active open");
                ff=true;
                break;
            }else{
                    /*����ר��,�Է�ie����*/
                dex++;
                if(dex===100){
                    alert('chao');
                    ff=true;
                    break;
                }

            }
        }
    }
}