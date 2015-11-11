<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>地下水</title>
<link href="css/caidan.css" rel="stylesheet" media="screen" type="text/css" />
<link href="css/dtjc.css" type="text/css" rel="stylesheet" />
<link href="css/ul.css" type="text/css" rel="stylesheet" />
<script src="js/jquery-1.9.1.js"></script>
<script src="js/caidan.js" type="text/javascript"></script>
<script src="js/dtjc.js" type="text/javascript"></script>
<script src="js/jquery.dropdown.js" type="text/javascript"></script>
<script src="js/chart/dtjc-unwater.js" type="text/javascript"></script>
<script type="text/javascript">
  var login;
  login=sessionStorage.getItem("usrname");
  if (login==null)
  {
     window.location.href="index.html"; 
  }

$(document).ready(function(){
quote();
$("form").submit();

});
function quote() 
  {
      switch ($('input:radio:checked').val())
      {
        case "line":
        loadExtentFile("js/chart/dtjc-sz.js");       
        break;
        case "column":
        loadExtentFile("js/chart/dtjc-szcol.js");     
        break;
      }
    }
</script>

</head>
<body>
  <script type="text/javascript" src="js/chart/highcharts.js"></script>
  <script type="text/javascript" src="js/chart/themes/gray.js"></script>
  <script type="text/javascript" src="js/chart/modules/exporting.js"></script>  
<center>
   <div id="main" style="width:1000px; height: auto; " align="center">
      <div id="container">
         <div class="logo"><img src="img/main2.png"></div>
         <div class="header">
          <img class="banner" alt="" src="img/banner1.jpg">
          <img class="banner" alt="" src="img/banner2.jpg">
          <img class="banner" alt="" src="img/banner6.jpg">
          <img class="banner" alt="" src="img/banner7.jpg">
          <img class="banner" alt="" src="img/banner5.jpg">
         </div>
          <div id="weather">
          <iframe src="http://m.weather.com.cn/m/pn3/weather.htm " width="225" height="20" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe></div>
        </div>
               <div id="all1">
            <ul id="jsddm1" class="dropdown">
              <li style="width:150px"><a href="main.html">首页</a>
              </li>
              <li><a href="#">生态城概况</a>
        <ul class="sub_menu">
          <li><a href="stcgk-stcjs.htm" >生态城介绍</a></li>
          <li><a href="stcgk-stjg.htm" >生态景观</a></li>
        </ul>
          </li>
          <li><a href="#">绿色基础</a>
        <ul class="sub_menu">
          <li><a href="lsjc-jcsj.html">基础数据</a></li>
          
        </ul>
          </li>
          <li><a href="#">动态监测</a>
        <ul class="sub_menu">
          <li><a href="dtjc-sz.php">水质指标</a></li>
          <li><a href="dtjc-carbon.php">碳代谢指标</a></li>
          <li><a href="dtjc-air.php">环境空气</a></li>
          <li><a href="dtjc-voice.php">声环境</a></li>
          <li><a href="dtjc-surfacew.php">地表水</a></li>
          <li><a href="dtjc-unwater.php">地下水</a></li>
          <li><a href="dtjc-soil.php">土壤</a></li>
      
        </ul>
          </li>
          <li><a href="#">预警系统</a>
        <ul class="sub_menu">
          <li><a href="yjxt-air.html">环境空气预警</a></li>
          <li><a href="yjxt-surfacew.html">地表水预警</a></li>
          <li><a href="yjxt-voice.html">声环境预警</a></li>
        </ul>
          </li>
            <li><a href="#">数据维护</a>
        <ul class="sub_menu">
          <li><a href="sjwh-insert.html">导入</a></li>
        </ul>
          </li>
            </ul>  
        </div>
        
        <div id="left" style="width:310px;height:725px; float: left;">
            <p style="font-size: small; float: left;"><br />&nbsp;当前位置：<a href="main.html" style="color:black">首页</a>—>动态监测—>地下水</p>
              <table id="samV" >
             <form name="MForm" action="connect/unwater.php" method="post" target="iframe">
             <tr><td class="title">采样点位</td></tr>
             <tr><td>
               <select id="sampoint" class="sampoint" name="sampoint" style="width:140px;">
               <option value="W1" class="pointopt" selected="selected">S1-商务中心绿化带</option>
               </select>
             </td></tr>
             <tr><td class="title">监测因子</td></tr>
             <tr><td style="line-height: 2.0em;">
                <input type="checkbox" checked=true; onclick="javascript:return false;">PH
                <input type="checkbox" checked=true; onclick="javascript:return false;">氨氮
                <input type="checkbox" checked=true; onclick="javascript:return false;">总硬度<br>
                <input type="checkbox" checked=true; onclick="javascript:return false;">溶解性总固体
                <input type="checkbox" checked=true; onclick="javascript:return false;">高锰酸盐指数
             </td></tr>
           <tr><td><input type="submit" value="查 询" id="sambtn"></td></tr>           
          </form>         
         </table>
         <!-- <span id="more" ><a href="introduction/waterdiv.html" onclick="openwin(this.href);return false">查看指标监测概况</a></span> -->
         <div id="placeV">
          <div id="ditu"><img src="img/place/di.jpg"></div>
           <div id="sample">
            <div id="unwater"><img src="img/place/unwater.png"></div> 
         </div>
       </div>
        </div>

        <div id="right" style="width:690px;height:725px; float: right;">
        <div id="chart" name="chart" style="margin-bottom:23px">
        </div>
        <iframe name="iframe" frameborder="0" style='width:690px;height:295px'></iframe>
         <div id="more" ><a href="introduction/unwater.html" onclick="openwin(this.href,600,370);return false" style="float: right;margin-top:16px;margin-right:30px;" >查看指标监测概况</a></div> 
        </div>

     </div>
        <div id="footer" style="height:70px; background-image:url('img/版权.jpg'); width:1000px;clear: both; position: relative;"align="center"  >
	        <div align="center" style="width:450px; height:70px">
	            <p style="font-size:smaller; font-family: 'Times New Roman';line-height: 1.8em;" align="center">
		            版权所有：华东师范大学上海市城市化生态过程与生态恢复重点实验室<br />
		            通讯地址：上海市东川路500号生命科学楼辅楼 &nbsp;&nbsp; 邮编：200241<br />
		            Copyright &copy; 2013 All Rights Reserved 
		        </p>
	        </div>
        </div>	
</center>
</body>
</html>

