/*//站点动态加载
var options;
var OptLstTxt = new Array;
var OptLstVal = new Array;
var OptLen = 0;
function NoDupl(SelObjFrom, SelObjTo) {

var OldToVal = SelObjTo.options[SelObjTo.selectedIndex].value;
if (OptLen == 0) {
OptLen = SelObjFrom.length;
for (var i = 1; i < OptLen; i++) {
OptLstTxt[i] = SelObjFrom.options[i].text;
OptLstVal[i] = SelObjFrom.options[i].value;
   }
}
var j = 1;
for (var i = 1; i < OptLen; i++) {
if (OptLstVal[i] != SelObjFrom.options[SelObjFrom.selectedIndex].value) {
if (j == SelObjTo.length) {
SelObjTo.options[j] = new Option(OptLstTxt[i]);
}
else {
SelObjTo.options[j].text = OptLstTxt[i];
}
SelObjTo.options[j].value = OptLstVal[i];
if (OptLstVal[i] == OldToVal) {
SelObjTo.selectedIndex = j;
}
j++;
   }}
if (SelObjTo.length > j)
SelObjTo.options[(SelObjTo.length - 1)] = null;
}*/

//水质监测点动态选择
function selectWater(ele)
{
  var i = ele.selectedIndex;
  document.getElementById("samtpoint").length = 7;
  var j = 0;
  //第一项都是默认的
  document.getElementById("samtpoint").options[0].selected=true;
  document.getElementById("samtpoint").options[0].text=ele.options[0].text;
  document.getElementById("samtpoint").options[0].value=ele.options[0].value;
  if(i==0)//没有选择监测点
  {
    document.getElementById("samtpoint").length = 1;
  }
  else //选择的是其他的监测点
  {
    for (var m = 1; m <7; m++) 
    {
      if (m!=i) 
      {
      document.getElementById("samtpoint").options[m].text=ele.options[m+j].text;
      document.getElementById("samtpoint").options[m].value=ele.options[m+j].value;
      }
      else //去掉选中的那个监测点
      {
      document.getElementById("samtpoint").options[m].text=ele.options[i+1].text;
      document.getElementById("samtpoint").options[m].value=ele.options[i+1].value;
      j++;
      }
    }
  }
}

//水质指标日期动态加载
  function selectDate(ele)
  {
  var i = ele.selectedIndex;
  var j = i;
  document.getElementById("samdateto").length = ele.length-i-1;
  for (var k = 0; k < ele.length-i-1; k++) {
    document.getElementById("samdateto").options[k].text=ele.options[j+1].text;
    document.getElementById("samdateto").options[k].value=ele.options[j+1].value;
    j++;
  }
}

//水质站点位置显示
function showSampleWater()
{
  document.getElementById("S1").style.display="none";
  document.getElementById("S2").style.display="none";
  document.getElementById("S3").style.display="none";
  document.getElementById("S4").style.display="none";
  document.getElementById("S5").style.display="none";
  document.getElementById("S6").style.display="none";
  document.getElementById("S7").style.display="none";
  var i = document.getElementById("sampoint").options[document.getElementById("sampoint").selectedIndex].value;
  var j = document.getElementById("samtpoint").options[document.getElementById("samtpoint").selectedIndex].value;
  document.getElementById(i).style.display="block";
  document.getElementById(j).style.display="block";
}

//碳代谢土壤监测点动态选择
function selectCarbon(ele)
{
  var i = ele.selectedIndex;
  document.getElementById("samtpoint").length = 5;
  var j = 0;
  //第一项都是默认的
  document.getElementById("samtpoint").options[0].selected=true;
  document.getElementById("samtpoint").options[0].text=ele.options[0].text;
  document.getElementById("samtpoint").options[0].value=ele.options[0].value;
  if(i==0)//没有选择监测点
  {
    document.getElementById("samtpoint").length = 1;
  }
  else //选择的是其他的监测点
  {
    for (var m = 1; m <5; m++) 
    {
      if (m!=i) 
      {
      document.getElementById("samtpoint").options[m].text=ele.options[m+j].text;
      document.getElementById("samtpoint").options[m].value=ele.options[m+j].value;
      }
      else //去掉选中的那个监测点
      {
      document.getElementById("samtpoint").options[m].text=ele.options[i+1].text;
      document.getElementById("samtpoint").options[m].value=ele.options[i+1].value;
      j++;
      }
    }
  }
}

//土层深度动态选择
function selectDepth(ele)
  {
  var i = ele.selectedIndex;
  var j = i;
  document.getElementById("samsoilto").length = ele.length-i-1;
  for (var k = 0; k < ele.length-i-1; k++) {
    document.getElementById("samsoilto").options[k].text=ele.options[j+1].text;
    document.getElementById("samsoilto").options[k].value=ele.options[j+1].value;
    j++;
  }
}

//碳代谢站点位置显示
function showSampleCarbon()
{
  document.getElementById("DT1").style.display="none";
  document.getElementById("DT2").style.display="none";
  document.getElementById("DT3").style.display="none";
  document.getElementById("DT4").style.display="none";
  document.getElementById("DT5").style.display="none";
  var i = document.getElementById("sampoint").options[document.getElementById("sampoint").selectedIndex].value;
  var j = document.getElementById("samtpoint").options[document.getElementById("samtpoint").selectedIndex].value;
  document.getElementById(i).style.display="block";
  document.getElementById(j).style.display="block";
}

//环境空气监测点动态选择,分两阶段分别动态显示
function selectAir(ele)
{
  var i = ele.selectedIndex;
  document.getElementById("samtpoint").length = 4;
  var j = 0;
  //第一项都是默认的
  document.getElementById("samtpoint").options[0].selected=true;
  document.getElementById("samtpoint").options[0].text=ele.options[0].text;
  document.getElementById("samtpoint").options[0].value=ele.options[0].value;
  if(i==0)//没有选择监测点
  {
    document.getElementById("samtpoint").length = 1;
  }
  else if (i<=4) //选择的是第一阶段的监测点
  {
    for (var m = 1; m <4; m++) 
    {
      if (m!=i) 
      {
      document.getElementById("samtpoint").options[m].text=ele.options[m+j].text;
      document.getElementById("samtpoint").options[m].value=ele.options[m+j].value;
      }
      else //去掉选中的那个监测点
      {
      document.getElementById("samtpoint").options[m].text=ele.options[i+1].text;
      document.getElementById("samtpoint").options[m].value=ele.options[i+1].value;
      j++;
      }
    }
  }
  else //选择的是第二阶段的监测点
  {
    for (var n = 1; n < 4; n++) 
    {
      if (n!=i-4) 
      {
        document.getElementById("samtpoint").options[n].text=ele.options[n+4+j].text;
        document.getElementById("samtpoint").options[n].value=ele.options[n+4+j].value;
      }
      else //去掉选中的那个监测点
      {
        document.getElementById("samtpoint").options[n].text=ele.options[i+1].text;
        document.getElementById("samtpoint").options[n].value=ele.options[i+1].value;
        j++;
      }
    }
  }
}

//环境空气根据监测指标动态选择时间
function selectAirDate()
{
  var i = document.getElementById("samindex").selectedIndex;
  var j = document.getElementById("sampoint").selectedIndex;
  switch(j){//根据监测站点动态选择时间
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      document.getElementById("samdate").options[0].selected=true;
      document.getElementById("samdate").options[0].disabled=false;
      document.getElementById("samdate").options[1].disabled=false;
      document.getElementById("samdate").options[2].disabled=false;
      document.getElementById("samdate").options[3].disabled=false;
      document.getElementById("samdate").options[4].disabled=false;
      document.getElementById("samdate").options[5].disabled=false;
      document.getElementById("samdate").options[6].disabled=false;
      document.getElementById("samdate").options[7].disabled=true;
      document.getElementById("samdate").options[8].disabled=true;
      document.getElementById("samdate").options[9].disabled=true;
      document.getElementById("samdate").options[10].disabled=true;
      document.getElementById("samdate").options[11].disabled=true;
    break;
    case 5:
    case 6:
    case 7:
    case 8:
      document.getElementById("samdate").options[7].selected=true;
      document.getElementById("samdate").options[0].disabled=true;
      document.getElementById("samdate").options[1].disabled=true;
      document.getElementById("samdate").options[2].disabled=true;
      document.getElementById("samdate").options[3].disabled=true;
      document.getElementById("samdate").options[4].disabled=true;
      document.getElementById("samdate").options[5].disabled=true;
      document.getElementById("samdate").options[6].disabled=true;
      document.getElementById("samdate").options[7].disabled=false;
      document.getElementById("samdate").options[8].disabled=false;
      document.getElementById("samdate").options[9].disabled=false;
      document.getElementById("samdate").options[10].disabled=false;
      document.getElementById("samdate").options[11].disabled=false;
    break;
  }
  switch(i){//根据监测指标动态选择时间
    case 2:
    case 3:
      document.getElementById("samdate").options[1].disabled=true;
      document.getElementById("samdate").options[2].disabled=true;
      document.getElementById("samdate").options[3].disabled=true;
      document.getElementById("samdate").options[4].disabled=true;
      document.getElementById("samdate").options[6].disabled=true;
      document.getElementById("samdate").options[8].disabled=true;
      document.getElementById("samdate").options[9].disabled=true;
      document.getElementById("samdate").options[10].disabled=true;
    break;
  }  
}

//环境空气站点显示
function showSampleAir()
{
  document.getElementById("G1").style.display="none";
  document.getElementById("G2").style.display="none";
  document.getElementById("G3").style.display="none";
  document.getElementById("G4").style.display="none";
  document.getElementById("G5").style.display="none";
  document.getElementById("G6").style.display="none";
  document.getElementById("G7").style.display="none";
  document.getElementById("G8").style.display="none";
  var i = document.getElementById("sampoint").options[document.getElementById("sampoint").selectedIndex].value;
  var j = document.getElementById("samtpoint").options[document.getElementById("samtpoint").selectedIndex].value;
  document.getElementById(i).style.display="block";
  document.getElementById(j).style.display="block";
}


//声环境监测点动态选择，分两个阶段
function selectVoice(ele)
{
  var i = ele.selectedIndex;
  var j = 0;
  //第一项都是默认的
  document.getElementById("samtpoint").options[0].selected=true;
  document.getElementById("samtpoint").options[0].text=ele.options[0].text;
  document.getElementById("samtpoint").options[0].value=ele.options[0].value;
  if(i==0)//没有选择监测点
  {
    document.getElementById("samtpoint").length = 1;
  }
  else if (i<=5) //选择的是第一阶段的监测点
  {
    document.getElementById("samtpoint").length = 5;
    for (var m = 1; m <5; m++) 
    {
      if (m!=i) 
      {
      document.getElementById("samtpoint").options[m].text=ele.options[m+j].text;
      document.getElementById("samtpoint").options[m].value=ele.options[m+j].value;
      }
      else //去掉选中的那个监测点
      {
      document.getElementById("samtpoint").options[m].text=ele.options[i+1].text;
      document.getElementById("samtpoint").options[m].value=ele.options[i+1].value;
      j++;
      }
    }
  }
  else //选择的是第二阶段的监测点
  {
      document.getElementById("samtpoint").length = 2;
      switch(i)
      {
          case 6:
            document.getElementById("samtpoint").options[1].text=ele.options[7].text;
            document.getElementById("samtpoint").options[1].value=ele.options[7].value;
          break;
          case 7:
            document.getElementById("samtpoint").options[1].text=ele.options[6].text;
            document.getElementById("samtpoint").options[1].value=ele.options[6].value;
          break;
      }
  }
}

//声环境站点位置显示
function showSampleVoice()
{
  document.getElementById("ZS1").style.display="none";
  document.getElementById("ZS2").style.display="none";
  document.getElementById("ZS3").style.display="none";
  document.getElementById("ZS4").style.display="none";
  document.getElementById("ZS5").style.display="none";
  document.getElementById("ZS6").style.display="none";
  document.getElementById("ZS7").style.display="none";
  var i = document.getElementById("sampoint").options[document.getElementById("sampoint").selectedIndex].value;
  var j = document.getElementById("samtpoint").options[document.getElementById("samtpoint").selectedIndex].value;
  document.getElementById(i).style.display="block";
  document.getElementById(j).style.display="block";
}

//地表水监测点动态选择
function selectSurfaceS(ele)
{
  var i = ele.selectedIndex;
  var j = 0;
  //第一项都是默认的
  document.getElementById("samtpoint").options[0].selected=true;
  document.getElementById("samtpoint").options[0].text=ele.options[0].text;
  document.getElementById("samtpoint").options[0].value=ele.options[0].value;
  if(i==0)//没有选择监测点
  {
    document.getElementById("samtpoint").length = 1;
  }
  else if (i<=7) //选择的是第一阶段的监测点
  {
    document.getElementById("samtpoint").length = 7;
    for (var m = 1; m <7; m++) 
    {
      if (m!=i) 
      {
      document.getElementById("samtpoint").options[m].text=ele.options[m+j].text;
      document.getElementById("samtpoint").options[m].value=ele.options[m+j].value;
      }
      else //去掉选中的那个监测点
      {
      document.getElementById("samtpoint").options[m].text=ele.options[i+1].text;
      document.getElementById("samtpoint").options[m].value=ele.options[i+1].value;
      j++;
      }
    }
  }
  else //选择的是第二阶段的监测点
  {
      document.getElementById("samtpoint").length = 2;
      switch(i)
      {
          case 8:
            document.getElementById("samtpoint").options[1].text=ele.options[9].text;
            document.getElementById("samtpoint").options[1].value=ele.options[9].value;
          break;
          case 9:
            document.getElementById("samtpoint").options[1].text=ele.options[8].text;
            document.getElementById("samtpoint").options[1].value=ele.options[8].value;
          break;
      }
  }
}

//地表水监测因子动态显示
function selectSurfaceI(ele)
{
    var i = ele.selectedIndex;
    var Zarr = new Array("请选择","砷","锌","硒","汞","铬","铜","铅");//定义数组,指标的text值
    var ZarrV = new Array("zero","Arsenic","Zn","Se","Hg","Cadmium","Cu","Pb");//对应的VALUE值
    var Sarr = new Array("请选择","PH","化学需氧量","五日生化需氧量","氨氮","溶解氧","总磷","总氮");//水质理化
    var SarrV = new Array("zero","PH","COD","BOD","NH","DisO","TP","TN");
    var Warr = new Array("请选择","石油类","挥发酚","氰化物","LAS","硫化物","氟化物","六价铬");//污染物
    var WarrV = new Array("zero","Oil","Phenol","Cyanide","LAS","Sulfide","Fluoride","Chromium");
    switch(i)
    {
        case 0:
          document.getElementById("samindex").length = 0;
          document.getElementById("samindex").options[0].text="";
        break;

        case 1://重金属类
          document.getElementById("samindex").length = 8;
          document.getElementById("samindex").options[0].selected=true;
          for (var j = 0; j < 8; j++) 
          {
            document.getElementById("samindex").options[j].text=Zarr[j];
            document.getElementById("samindex").options[j].value=ZarrV[j];
          }
        break;

        case 2://水质理化类
          document.getElementById("samindex").length = 8;
          document.getElementById("samindex").options[0].selected=true;
          for (var j = 0; j < 8; j++) 
          {
            document.getElementById("samindex").options[j].text=Sarr[j];
            document.getElementById("samindex").options[j].value=SarrV[j];
          }
        break;

        case 3://污染物
          document.getElementById("samindex").length = 8;
          document.getElementById("samindex").options[0].selected=true;
          for (var j = 0; j < 8; j++) 
          {
            document.getElementById("samindex").options[j].text=Warr[j];
            document.getElementById("samindex").options[j].value=WarrV[j];
          }
        break;
    }
}

//地表水站点位置显示
function showSampleSurfacew()
{
  document.getElementById("W1").style.display="none";
  document.getElementById("W2").style.display="none";
  document.getElementById("W3").style.display="none";
  document.getElementById("W4").style.display="none";
  document.getElementById("W5").style.display="none";
  document.getElementById("W6").style.display="none";
  document.getElementById("W7").style.display="none";
  document.getElementById("W8").style.display="none";
  document.getElementById("W9").style.display="none";
  var i = document.getElementById("sampoint").options[document.getElementById("sampoint").selectedIndex].value;
  var j = document.getElementById("samtpoint").options[document.getElementById("samtpoint").selectedIndex].value;
  document.getElementById(i).style.display="block";
  document.getElementById(j).style.display="block";
}

//土壤监测点选择
function selectSoil(ele)
{
  var i = ele.selectedIndex;
  var j = 0;
  //第一项都是默认的
  document.getElementById("samtpoint").options[0].selected=true;
  document.getElementById("samtpoint").options[0].text=ele.options[0].text;
  document.getElementById("samtpoint").options[0].value=ele.options[0].value;
  if(i==0)//没有选择监测点
  {
    document.getElementById("samtpoint").length = 1;
  }
  else if (i<=4) //选择的是第一阶段的监测点
  {
    document.getElementById("samtpoint").length = 4;
    for (var m = 1; m <4; m++) 
    {
      if (m!=i) 
      {
      document.getElementById("samtpoint").options[m].text=ele.options[m+j].text;
      document.getElementById("samtpoint").options[m].value=ele.options[m+j].value;
      }
      else //去掉选中的那个监测点
      {
      document.getElementById("samtpoint").options[m].text=ele.options[i+1].text;
      document.getElementById("samtpoint").options[m].value=ele.options[i+1].value;
      j++;
      }
    }
  }
  else //选择的是第二阶段的监测点
  {
      document.getElementById("samtpoint").length = 1;
  }
}

//土壤站点位置显示
function showSampleSoil()
{
  document.getElementById("S1").style.display="none";
  document.getElementById("S2").style.display="none";
  document.getElementById("S3").style.display="none";
  document.getElementById("S4").style.display="none";
  document.getElementById("S5").style.display="none";
  document.getElementById("S6").style.display="none";
  var i = document.getElementById("sampoint").options[document.getElementById("sampoint").selectedIndex].value;
  var j = document.getElementById("samtpoint").options[document.getElementById("samtpoint").selectedIndex].value;
  document.getElementById(i).style.display="block";
  document.getElementById(j).style.display="block";
}

//引用外部js文件
function loadExtentFile(filePath){
    
        var oJs = document.createElement("script");        
        oJs.setAttribute("type","text/javascript");
        oJs.setAttribute("src",filePath);//文件的地址 ,可为绝对及相对路径
        document.getElementsByTagName("head")[0].appendChild(oJs);//绑定   
}


 //显示参数中文名
function show_C()
   {
      var c_name  ="流速";
      var objS = document.getElementById("samindex");
      c_name      = objS.options[objS.selectedIndex].text;//获取下拉菜单的中文文本，并赋值给参数
        //document.getElementById("hidd").value = c_name;//动态的设置隐藏框的value值为下拉菜单的中文文本
      $("#hidd").val(c_name);//通过jQuery来设置隐藏框的文本
  }  
 //弹出网页 
function openwin(turl,iWidth,iHeight) 
  { 
  //var iWidth=630; //窗口宽度
  //var iHeight=300;//窗口高度
  var iTop=(window.screen.height-iHeight)/2;
  var iLeft=(window.screen.width-iWidth)/2; 
  window.open(turl,"_blank","toolbar=no, location=yes, directories=no, status=no, menubar=yes, scrollbars=no, resizable=no, copyhistory=yes, width="+iWidth+", height="+iHeight+",top="+iTop+",left="+iLeft); 
  } 
  
//显示图表 水质指标
function chartshow() { 
     var type = $('input:radio:checked').val(); 
     var subtxt1=$("#samindex").find("option:selected").text();  
     var subtxt2=$("#samindex").find("option:selected").attr("unit"); 
     var sam1=$("#sampoint").find("option:selected").text(); 
     var sam2=$("#samtpoint").find("option:selected").text();
     var url="connect/sql-sz.php"+"?q1="+$("#sampoint").val()+"&q2="+$("#samindex").val()+"&q3="+$("#samdatefrom").val()+"&q4="+$("#samdateto").val()+"&q5="+$("#samtpoint").val()+"&q6="+sam1+"&q7="+sam2+"&sid="+Math.random();
       $.getJSON(url, function(json){
       options.xAxis.categories = json[0]['data'];      
       options.series[0] = json[1];
       options.series[1] = json[2];  
       options.chart.type = type;  
       var chart = new Highcharts.Chart(options);
       chart.setTitle(null, { text: subtxt1 +"   "+ "("+subtxt2+")" }); 
       if ($("#samtpoint").val()=="zero")
       {
        chart.series[1].remove();
               
       }
        });
       
  }
  //显示图表 碳代谢指标
function chartshow2() { 
     
     var type = $('input:radio:checked').val();  
     var subtxt1=$("#samindex").find("option:selected").text();  
     var subtxt2=$("#samindex").find("option:selected").attr("unit"); 
     var sam1=$("#sampoint").find("option:selected").text(); 
     var sam2=$("#samtpoint").find("option:selected").text();
     var url="connect/sql-carbon.php"+"?q1="+$("#sampoint").val()+"&q2="+$("#samindex").val()+"&q3="+$("#samsoilfrom").val()+"&q4="+$("#samsoilto").val()+"&q5="+$("#samtpoint").val()+"&q6="+sam1+"&q7="+sam2+"&sid="+Math.random();
       $.getJSON(url, function(json){
       options.xAxis.categories = json[0]['data'];      
       options.series[0] = json[1];
       options.series[1] = json[2];  
       options.chart.type = type;    
       var chart = new Highcharts.Chart(options);
       chart.setTitle(null, { text: subtxt1 +"   "+ "("+subtxt2+")" }); 
       if ($("#samtpoint").val()=="zero")
       {
        chart.series[1].remove();
                
       }
       
        });
      
  }
  //显示图表 环境空气
function chartshow3() { 
     var type = $('input:radio:checked').val();  
     var subtxt1=$("#samindex").find("option:selected").text(); 
     var subtxt2=$("#samindex").find("option:selected").attr("unit");
     var sam1=$("#sampoint").find("option:selected").text(); 
     var sam2=$("#samtpoint").find("option:selected").text();
     var url="connect/sql-air.php"+"?q1="+$("#sampoint").val()+"&q2="+$("#samindex").val()+"&q3="+$("#samdate").val()+"&q4="+$("#samtpoint").val()+"&q5="+sam1+"&q6="+sam2+"&sid="+Math.random();
       $.getJSON(url, function(json){
       options.xAxis.categories = json[0]['data'];      
       options.series[0] = json[1];
       options.series[1] = json[2]; 
       options.series[2] = json[3];  
       options.chart.type = type;         
       var chart = new Highcharts.Chart(options);
      
       chart.setTitle(null, { text: subtxt1 +"   "+"("+subtxt2+")" }); 
       if ($("#samtpoint").val()=="zero")
       {
        chart.series[2].remove();
                
       };

        });
  }

//显示图表 声环境
function chartshow4() {  
     var subtxt1=$("#samindex").find("option:selected").text(); 
     var subtxt2=$("#samindex").find("option:selected").attr("unit");
     var sam1=$("#sampoint").find("option:selected").text(); 
     var sam2=$("#samtpoint").find("option:selected").text();
     var url="connect/sql-voice.php"+"?q1="+$("#sampoint").val()+"&q2="+$("#samindex").val()+"&q3="+$("#samtpoint").val()+"&q4="+sam1+"&q5="+sam2+"&sid="+Math.random();
       $.getJSON(url, function(json){
       options.xAxis.categories = json[0]['data'];      
       options.series[0] = json[1];
       options.series[1] = json[2]; 
       options.series[2] = json[3]; 
       options.series[3] = json[4];     
       var chart = new Highcharts.Chart(options);
       chart.setTitle(null, { text: subtxt1 +"   "+"("+subtxt2+")" }); 
       var title1 = chart.renderer.text('昼间', 90, 105)
        .css({
            color:'#ffffff',
            fontSize: '14px',
            font: '14px  微软雅黑,Arial,Lucida Grande'
            
        })
        .add();
       
       var title2 = chart.renderer.text('夜间', 90, 256)
        .css({
            color:'#2d322f',
            fontSize: '14px',
            font: '14px  微软雅黑,Arial,Lucida Grande'
            
        })
        .add();
          
       if ($("#samtpoint").val()=="zero")
       {
        chart.series[3].remove(); 
        chart.series[2].remove();    
       };
    
        });
  }

//显示图表 地表水
function chartshow5() {
     var subtxt=$("#samindex").find("option:selected").text(); 
     var sam1=$("#sampoint").find("option:selected").text(); 
     var sam2=$("#samtpoint").find("option:selected").text();
     var arr1=new Array();
     var arr2=new Array();
     var url="connect/sql-surfacew.php"+"?q1="+$("#sampoint").val()+"&q2="+$("#samindex").val()+"&q3="+$("#samtpoint").val()+"&sid="+Math.random();
       $.getJSON(url, function(json){
      options.xAxis.categories = json[0]['data'];  
       arr1= [].concat(json[1]['data']);
       arr2= [].concat(json[2]['data']);     
       var chart = new Highcharts.Chart(options); 
    
       chart.setTitle(null, { text: subtxt }); 
  
       //获得序列列表
       var seriesList =chart.series;
       //遍历每一条序列的每一个数据点
       for(var i = 0;i<seriesList.length;i++)
       {
           var pointList = seriesList[i].points;
           //遍历当前序列的每一个数据点
           for(var j = 0;j<arr1.length;j++)
           {   
               
               chart.series[0].points[j].update(chart.series[0].points[j].z=arr1[j]);
               chart.series[0].points[j].update(chart.series[0].points[j].y=36);
               chart.series[1].points[j].update(chart.series[1].points[j].z=arr2[j]);
               chart.series[1].points[j].update(chart.series[1].points[j].y=12);
              
                //判断数据点的z值              
            if (pointList[j].z==1 || pointList[j].z==2)
               
                   chart.series[i].points[j].update({
                       color:"#00b8ed"
                        
                   }); 
              

            else if (pointList[j].z==3)
                   chart.series[i].points[j].update({
                       color:"#91d34d"
                   });   
              

            else if (pointList[j].z==4)
                   chart.series[i].points[j].update({
                       color:"#ffff00"
                   });   
             

            else if (pointList[j].z==5)
                   chart.series[i].points[j].update({
                       color:"#ffbd02"
                   });  
            else if (pointList[j].z==6)
                   chart.series[i].points[j].update({
                       color:"#f60305"
                   }); 
              
              }
            
           }
       for(var ii = 0;ii<2;ii++)
       {
         if (chart.series[ii].points[5].z==0)
             {
              chart.series[ii].points[5].update({
                       color:"#598428"
                   });
              chart.series[ii].points[4].update({
                       color:"#598428"
                   }); 
              
             chart.xAxis[0].setCategories(['2013-04-22','2013-04-23','2013-08-20','2013-08-22','',''], true);
            //chart.tooltip.hide();
            }
        }
      chart.renderer.image('img/surface2.png', 130, 300, 400, 30).add();  
      var title1 = chart.renderer.text('W1-东旺湖', 100, 85)
        .css({
            color:'#ffffff',
            fontSize: '15px',
            
        })
        .add();
       title1.attr({
                    text:sam1
                });
       var title2 = chart.renderer.text('', 100, 186)
        .css({
            color:'#ffffff',
            fontSize: '15px',
            
        })
        .add();
       title2.attr({
                    text:sam2
                });   
     
      if ($("#samtpoint").val()=="zero")
       {
        chart.series[1].remove();
         title2.attr({
                    text:''
                }); 
       }
      
      /*if  ($("#sampoint").val()=="W8" || $("#sampoint").val()=="W9")
      {
        chart.series[0].points[5].remove(); 
        chart.series[0].points[4].remove();
        
      }

       if  ($("#sampoint").val()=="W8" && $("#samtpoint").val()=="W9")
      {
        
        chart.series[1].points[5].remove(); 
        chart.series[1].points[4].remove();
        
      }*/

  });   
}
 //显示图表 土壤
function chartshow6() { 
     
     var type = $('input:radio:checked').val();  
     var subtxt=$("#samindex").find("option:selected").text(); 
     var sam1=$("#sampoint").find("option:selected").text(); 
     var sam2=$("#samtpoint").find("option:selected").text();
     var url="connect/sql-soil.php"+"?q1="+$("#sampoint").val()+"&q2="+$("#samindex").val()+"&q3="+$("#samtpoint").val()+"&q4="+sam1+"&q5="+sam2+"&sid="+Math.random();
       $.getJSON(url, function(json){
       options.xAxis.categories = json[0]['data'];      
       options.series[0] = json[1];
       options.series[1] = json[2];  
       options.chart.type = type;    
       var chart = new Highcharts.Chart(options);
       chart.setTitle(null, { text: subtxt }); 
       if ($("#samtpoint").val()=="zero")
       {
        chart.series[1].remove();
                
       }
       
        });
      
  }



