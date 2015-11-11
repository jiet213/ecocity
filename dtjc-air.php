<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>环境空气指标</title>
<link href="css/caidan.css" rel="stylesheet" media="screen" type="text/css" />
<link href="css/dtjc.css" type="text/css" rel="stylesheet" />
<link href="css/ul.css" type="text/css" rel="stylesheet" />
<script src="js/jquery-1.9.1.js"></script>
<script src="js/caidan.js" type="text/javascript"></script>
<script src="js/dtjc.js" type="text/javascript"></script>
<script src="js/jquery.dropdown.js" type="text/javascript"></script>
<script src="js/chart/dtjc-air.js" type="text/javascript"></script>
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
         $("#G1").show();
         $("#G2").hide();
         $("#G3").hide();
         $("#G4").hide();
         $("#G5").hide();
         $("#G6").hide();
         $("#G7").hide();
         $("#G8").hide();
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
        
        <div id="left" style="width:310px;height:780px; float: left;">
            <p style="font-size: small; float: left;"><br />&nbsp;当前位置：<a href="main.html" style="color:black">首页</a>—>动态监测—>环境空气</p>
              <table id="sam" >
             <form name="MForm" action="connect/air.php" method="post" target="iframe">
             <tr><td class="title">选择监测点</td></tr>
             <tr><td>
               <select id="sampoint" class="sampoint" name="sampoint" onchange="selectAir(this),selectAirDate(),showSampleAir()">
               <option value="zero" >请选择</option>
               <option value="G1" class="pointopt" selected="selected">G1-东旺湖</option>
               <option value="G2" class="pointopt">G2-南部水闸</option>
               <option value="G3" class="pointopt">G3-规划东村</option>
               <option value="G4" class="pointopt">G4-商务中心</option>
               <option value="G5" class="pointopt">G5-南水闸</option>
               <option value="G6" class="pointopt">G6-商务中心</option>
               <option value="G7" class="pointopt">G7-湿地公园</option>
               <option value="G8" class="pointopt">G8-北水闸</option>
               </select>
             </td></tr>
             <tr><td>
               <select id="samtpoint" class="sampoint" name="samtpoint" onchange="showSampleAir()">
               <option value="zero" selected="selected">请选择</option>
               <option value="G2" class="pointopt">G2-南部水闸</option>
               <option value="G3" class="pointopt">G3-规划东村</option>
               <option value="G4" class="pointopt">G4-商务中心</option>           
               </select>
             </td>           
             </tr> 
             <tr><td class="title">选择监测指标</td></tr>
             <tr><td>
               <select id="samindex" name="samindex" onchange="selectAirDate(),show_C()">
               <option unit="μg/m3" value="PM10" selected="selected">PM10</option>
               <option unit="μg/m3" value="PM25">PM2.5</option>
               <option unit="μg/m3" value="SO2">二氧化硫SO2</option>
               <option unit="μg/m3" value="NO2">二氧化氮NO2</option>
               </select>
             </td></tr>
             <tr><td class="title">选择监测日期</td></tr>
             <tr><td>
               <select id="samdate" name="samdate">
               <option value="2012.09">2012年9月</option>
               <option value="2012.10">2012年10月</option>
               <option value="2012.11">2012年11月</option>
               <option value="2012.12">2012年12月</option>
               <option value="2013.01">2013年1月</option>
               <option value="2013.02">2013年2月</option>
               <option value="2013.03">2013年3月</option>
               <option value="2013.04" disabled=true;>2013年4月</option>
               <option value="2013.05" disabled=true;>2013年5月</option>
               <option value="2013.06" disabled=true;>2013年6月</option>
               <option value="2013.07" disabled=true;>2013年7月</option>
               <option value="2013.08" disabled=true;>2013年8月</option>
             </select>
             <input id="hidd" type="hidden" name="showname" value="PM10">
             </td></tr>
            <tr><td class="chartType">
                <span><input type="radio" name="chartType" id="line" value="areaspline" checked >区域图 </span>
                <span><input type="radio" name="chartType" id="column" value="column">柱状图 </span></td>
            </tr>
           <tr><td><input type="submit" value="查 询" id="sambtn"></td></tr>           
          </form>         
         </table>
         <div id="place">
          <div id="ditu"><img src="img/place/di.jpg"></div>
           <div id="sample">
            <div id="G1"><img src="img/place/G1.png"></div> 
            <div id="G2"><img src="img/place/G2.png"></div> 
            <div id="G3"><img src="img/place/G3.png"></div> 
            <div id="G4"><img src="img/place/G4.png"></div>
            <div id="G5"><img src="img/place/G5.png"></div>
            <div id="G6"><img src="img/place/G6.png"></div>
            <div id="G7"><img src="img/place/G7.png"></div>
            <div id="G8"><img src="img/place/G8.png"></div>  
         </div>
       </div>
        </div>

        <div id="right" style="width:690px;height:780px; float: right;">
        <div id="chart" name="chart" style="margin-bottom:30px;">
        </div>
        <iframe name="iframe" frameborder="0" style='width:690px;height:330px'></iframe>
        <div id="moreS">
          <a href="yjxt-air.html" >查看预警概况</a>
          <a href="introduction/air.html" onclick="openwin(this.href,660,840);return false">查看指标监测概况</a></div> 
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

