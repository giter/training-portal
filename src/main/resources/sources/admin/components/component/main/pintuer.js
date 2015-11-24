/**
 * Created by jack on 2015/8/26.
 */

function showdialog(e){
    e = $(e.target);
    var trigger=e.attr("data-toggle");
    var getid=e.attr("data-target");
    var data=e.attr("data-url");
    var mask=e.attr("data-mask");
    var width=e.attr("data-width");
    var detail="";
    var masklayout=$('<div class="dialog-mask"></div>');
    if(width==null){width="80%";}

    if (mask=="1"){
        $("body").append(masklayout);
    }
    detail='<div class="dialog-win" style="position:fixed;width:'+width+';z-index:11;">';
    if(getid!=null){detail=detail+$(getid).html();}
    if(data!=null){detail=detail+$.ajax({url:data,async:false}).responseText;}
    detail=detail+'</div>';

    var win=$(detail);
    win.find(".dialog").addClass("open");
    $("body").append(win);
    var x=parseInt($(window).width()-win.outerWidth())/2;
    var y=parseInt($(window).height()-win.outerHeight())/2;
    if (y<=10){y="10"}
    win.css({"left":x,"top":y});
    win.find(".dialog-close,.close").each(function(){
        $(this).click(function(){
            win.remove();
            $('.dialog-mask').remove();
        });
    });
    masklayout.click(function(){
        win.remove();
        $(this).remove();
    });
}

module.exports ={
    showdialog:showdialog
}