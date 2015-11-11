$(document).ready(function() {

$(".header img").fadeOut(0).eq(0).fadeIn(0);

var i = 0;//初始化图片的索引值

setInterval(function(){

if($(".header img").length > (i+1)){

$(".header img").eq(i).fadeOut(2000).next("img").fadeIn(2000);

i++;

}

else{

$(".header img").eq(i).fadeOut(2000).siblings("img").eq(0).fadeIn(2000);

i = 0;

}

},4000);

})


/*var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;*/

/*首页的菜单*/
/*function jsddm_open()
{	jsddm_canceltimer();
	jsddm_close();
	ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');}

function jsddm_close()
{	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');}

function jsddm_timer()
{	closetimer = window.setTimeout(jsddm_close, timeout);}

function jsddm_canceltimer()
{	if(closetimer)
	{	window.clearTimeout(closetimer);
		closetimer = null;}}

$(document).ready(function()
{	$('#jsddm > li').bind('mouseover', jsddm_open);
	$('#jsddm > li').bind('mouseout',  jsddm_timer);});

document.onclick = jsddm_close;*/


/*其他页面的菜单*/
/*function jsddm1_open() {
    jsddm1_canceltimer();
    jsddm1_close();
    ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
}

function jsddm1_close()
{ if (ddmenuitem) ddmenuitem.css('visibility', 'hidden'); }

function jsddm1_timer()
{ closetimer = window.setTimeout(jsddm1_close, timeout); }

function jsddm1_canceltimer() {
    if (closetimer) {
        window.clearTimeout(closetimer);
        closetimer = null;
    } 
}

$(document).ready(function () {
    $('#jsddm1 > li').bind('mouseover', jsddm1_open);
    $('#jsddm1 > li').bind('mouseout', jsddm1_timer);
});

document.onclick = jsddm1_close;*/

