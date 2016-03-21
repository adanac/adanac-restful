$(document).ready(function() {
    
    $('#pro_edtable').html(pro_edtable());

    $('.sz_checkbox').on('change',function(){

        // console.log(pro_edtable);
        $('#pro_edtable').html(pro_edtable());

    })

});




function pro_edtable(){
    var pro_edtable ='';
    var $num=1;
    $('input[name="pro_st_one"]:checked').each(function(){
        // pro_st.parseJSON('color':$(this).val());
        
        var $i=1;
        var $color=$(this).val();
        var $size_num=$('input[name="pro_st_two"]:checked').length;
        var $sz_loop=$('.stand_loop').length;
        if($sz_loop>1){

            $('input[name="pro_st_two"]:checked').each(function(){
                pro_edtable+='<tr>';
                if($num==1){
                    pro_edtable+=    '<td><input type="radio" class="group-checkable" name="radio009" checked></td>';
                }else{
                    pro_edtable+=    '<td><input type="radio" class="group-checkable" name="radio009"></td>';
                }
                if($i==1){
                    pro_edtable+=    '<td rowspan="'+$size_num+'">'+$color+'</td>';
                }
                pro_edtable+=    '<td>'+$(this).val()+'</td>';
                pro_edtable+=    '<td><input class="form-control" name="Fskureferprice[]" min="0.01" required></td>';
                pro_edtable+=    '<td><input class="form-control" name="1111" required></td>';
                pro_edtable+=    '<td><input class="form-control" name="1111"></td>';
                pro_edtable+=    '<td><input class="form-control" name="1111"></td>';
                pro_edtable+='</tr>';

                $i++;
                $num++;
            });

        }else{
                pro_edtable+='<tr>';
                if($num==1){
                    pro_edtable+=    '<td><input type="radio" class="group-checkable" name="radio009" checked></td>';
                }else{
                    pro_edtable+=    '<td><input type="radio" class="group-checkable" name="radio009"></td>';
                }
                pro_edtable+=    '<td>'+$(this).val()+'</td>';
                pro_edtable+=    '<td><input class="form-control" name="Fskureferprice[]" required></td>';
                pro_edtable+=    '<td><input class="form-control" name="1111" required></td>';
                pro_edtable+=    '<td><input class="form-control" name="1111"></td>';
                pro_edtable+=    '<td><input class="form-control" name="1111"></td>';
                pro_edtable+='</tr>';

                $i++;
                $num++;
        }


    });
    return pro_edtable;
}