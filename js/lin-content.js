//marquee 插件
(function($){
$.fn.extend({
        Scroll:function(opt,callback){
                //参数初始化
                if(!opt) var opt={};
                var _this=this.eq(0).find("ul:first");
                var     lineH=_this.find("li:first").height(), //获取行高
                        line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //每次滚动的行数，默认为一屏，即父容器高度
                        speed=opt.speed?parseInt(opt.speed,10):500, //卷动速度，数值越大，速度越慢（毫秒）
                        timer=opt.timer?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
                if(line==0) line=1;
                var upHeight=0-line*lineH;
                   //try {
                    if (typeof (timerID)== 'number')clearInterval(timerID);
		// }catch(G){}
		 timerID=setInterval("scrollUp()",timer);
		
				
				
                //滚动函数
                scrollUp=function(){
                        _this.animate({
                                marginTop:upHeight
                        },speed,function(){
                                for(i=1;i<=line;i++){
                                        _this.find("li").eq(0).appendTo(_this);						
                                };
                                _this.css({marginTop:0});
								
								
                        });
                }
				
                //鼠标事件绑定
                _this.hover(
					function(){
                        clearInterval(timerID);
						
					},
					function(){
                        timerID=setInterval("scrollUp()",timer);
						
                	}
		);				
        }        
})
})(jQuery);

$(document).ready(function(){
    
         $(".maptabbox").unbind();
         $(".maptabbox").mouseenter(function(){
            $(this).find(".maptabboxin").show();
         });
         $(".maptabbox").mouseleave(function(){
            $(this).find(".maptabboxin").hide();
         });

$("#scrollDiv").Scroll({line:1,speed:1000,timer:4000});
	$('.RadarSatellit').find('li').mouseover(function() {
var t0=$('.RadarSatellit').find('li').index(this);
$('.RadarSatelliteim').hide();
$('.RadarSatelliteim').eq(t0).show();
$('.RadarSatellit').find('li').removeClass('moverad')
$(this).addClass('moverad');
return false;
})
$('.RadarSatellit').find('li').eq(0).trigger("mouseover");



$('.lifeTravel div').eq(0).show();
$('#lifeTravelNav').children('li').mouseover(function() {
var n=$('#lifeTravelNav').children('li').index(this);
$('#lifeTravelNav').children('li').removeClass('move')
$(this).addClass('move');
$('.lifeTravel div').hide();
$('.lifeTravel div').eq(n).show();
});



	

function show1()
{
		document.getElementById("ul1").style.display="block";
		document.getElementById("ul2").style.display="none";
}
function show2()
{
		document.getElementById("ul1").style.display="none";
		document.getElementById("ul2").style.display="block";
}

function doZoom(size){
document.getElementById('zoom').style.fontSize=size+'px'
setTailPosition()
}

function MM_jumpMenu(targ,selObj,restore){
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}






$(".da").find("a").click(function(){
				$(".rainstormRecoveryDirectory").find("dl").css("font-size","16px");
				});
$(".zhong").find("a").click(function(){
				$(".rainstormRecoveryDirectory").find("dl").css("font-size","14px");
				});
$(".xiao").find("a").click(function(){
				$(".rainstormRecoveryDirectory").find("dl").css("font-size","12px");
				});



$(".hotSpotsNav li a").click(function(){return false;});



setTimeout('xhgdplay()',5000);

	$(".xhgd li").hover(function(){
		$(".xhgd li.one").removeClass("one");
		$(this).addClass("one");
		$(".xhgd p img").attr('src',$(this).find('a').attr("imghref"));
		$(".xhgd p a").attr('href',$(this).find('a').attr("href"));
	});

setTimeout('cdplay()',5500);

})

function xhgdplay(){
	$tab=$(".xhgd li").index($(".xhgd li.one"));
	if ($tab == $(".xhgd li").length-1)$tab=-1;
	$(".xhgd li.one").removeClass("one");
	$(".xhgd p img").attr('src',$(".xhgd li").eq($tab+1).find('a').attr("imghref"));
	$(".xhgd p a").attr('href',$(".xhgd li").eq($tab+1).find('a').attr("href"));
	$(".xhgd li").eq($tab+1).addClass("one");
	setTimeout('xhgdplay()',5000);
}




