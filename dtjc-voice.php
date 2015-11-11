<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>声环境</title>
<link href="css/caidan.css" rel="stylesheet" media="screen" type="text/css" />
<link href="css/dtjc.css" type="text/css" rel="stylesheet" />
<link href="css/ul.css" type="text/css" rel="stylesheet" />
<script src="js/jquery-1.9.1.js"></script>
<script src="js/caidan.js" type="text/javascript"></script>
<script src="js/dtjc.js" type="text/javascript"></script>
<script src="js/jquery.dropdown.js" type="text/javascript"></script>
<script src="js/chart/dtjc-voice.js" type="text/javascript"></script>
<script type="text/javascript">
  var login;
  login=sessionStorage.getItem("usrname");
  if (login==null)
  {
     window.location.href="index.html"; 
  }
  
$(document).ready(function(){
$("form").submit();
});

$(document).ready(function(){
         $("#ZS1").show();
         $("#ZS2").hide();
         $("#ZS3").hide();
         $("#ZS4").hide();
         $("#ZS5").hide();
         $("#ZS6").hide();
         $("#ZS7").hide();
       });
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
            <p style="font-size: small; float: left;"><br />&nbsp;当前位置：<a href="main.html" style="color:black">首页</a>—>动态监测—>声环境</p>
              <table id="samV" >
             <form name="MForm" action="connect/voice.php" method="post" target="iframe">
             <tr><td class="title">选择监测点</td></tr>
             <tr><td>
               <select id="sampoint" class="sampoint" name="sampoint" onchange="selectVoice(this),showSampleVoice()">
               <option value="zero" >请选择</option>
               <option value="ZS1" class="pointopt" selected="selected">ZS1-南水闸</option>
               <option value="ZS2" class="pointopt">ZS2-商务中心</option>
               <option value="ZS3" class="pointopt">ZS3-瀛陈公路</option>
               <option value="ZS4" class="pointopt">ZS4-规划东村</option>
               <option value="ZS5" class="pointopt">ZS5-团旺路</option>
               <option value="ZS6" class="pointopt">ZS6-北水闸</option>
               <option value="ZS7" class="pointopt">ZS7-湿地公园</option>
               </select>
             </td></tr>
             <tr><td>
               <select id="samtpoint" class="samtpoint" name="samtpoint" onchange="showSampleVoice()">
               <option value="zero" selected="selected">请选择</option>
               <option value="ZS2" class="pointopt">ZS2-商务中心</option>
               <option value="ZS3" class="pointopt">ZS3-瀛陈公路</option>
               <option value="ZS4" class="pointopt">ZS4-规划东村</option>
               <option value="ZS5" class="pointopt">ZS5-团旺路</option>          
               </select>
             </td>           
             </tr> 
             <tr><td class="title">选择统计分布指标</td></tr>
             <tr><td>
               <select id="samindex" name="samindex" onchange="show_C()">
               <option unit="dB" value="L10" selected="selected">L10-平均峰值</option>
               <option unit="dB" value="L50">L50-平均中值</option>
               <option unit="dB" value="L90">L90-平均本底值</option>
               <option unit="dB" value="Leq">Leq-等效声级</option>
               </select>
               <input id="hidd" type="hidden" name="showname" value="L10-平均峰值">
             </td></tr>
            <!-- <tr><td class="chartType">
                <span><input type="radio" name="chartType" id="line" value="line" onchange="quote()">折线图 </span>
                <span><input type="radio" name="chartType" id="column" value="column" checked onchange="quote()">柱状图 </span></td>
            </tr> -->
           <tr><td><input type="submit" value="查 询" id="sambtn"></td></tr>           
          </form>         
         </table>
         
        <div id="placeV">
          <div id="ditu"><img src="img/place/di.jpg"></div>
           <div id="sample">
            <div id="ZS1"><img src="img/place/ZS1.png"></div> 
            <div id="ZS2"><img src="img/place/ZS2.png"></div> 
            <div id="ZS3"><img src="img/place/ZS3.png"></div> 
            <div id="ZS4"><img src="img/place/ZS4.png"></div>
            <div id="ZS5"><img src="img/place/ZS5.png"></div>
            <div id="ZS6"><img src="img/place/ZS6.png"></div>
            <div id="ZS7"><img src="img/place/ZS7.png"></div> 
         </div>
       </div>
        </div>

        <div id="right" style="width:690px;height:725px; float: right;">
        <div id="chart" name="chart" style="margin-bottom:23px">
        </div>
        <iframe name="iframe" frameborder="0" style='width:690px;height:295px'></iframe>
        <div id="more" >
          <a href="yjxt-voice.html">查看预警概况</a>
          <a href="introduction/voice.html" onclick="openwin(this.href,630,430);return false" >查看指标监测概况</a></div> 
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

