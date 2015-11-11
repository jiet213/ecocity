/*document.write("<script language=javascript src='js/select.js'></script>");*/
var options;  
$(function() {
options = {   
              chart: {
                  backgroundColor: '#598428',
                  renderTo: 'chart',
                  type:'line',
                  marginRight: 90,
                  marginBottom:70,
                  zoomType:'xy',
                  animation:{},
                  options3d: {
                   enabled: false,
                   alpha: 8,
                   beta: 8,
                   depth: 50,
                   viewDistance: 25
                  }
              },
              colors: ["#644727", "#7a4d9c", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
              title: {
                  text: '碳代谢指标', 
                  x: -20 //center
              },
              plotOptions: {
                      column: {
                          pointPadding: 0.2,
                          borderWidth: 1,
                          pointWidth: 30,
                          depth: 30
                      }
                  },
              subtitle: {
                  text: '',
                  x: -20,
                  y:36,
                  style: { color: '#704c24',font: '14px  微软雅黑,Arial,Lucida Grande'}
              },
              
              xAxis: {                
                  categories: [],
                               
                 
                  title: {
                      text: '土层深度（cm）'
                  }
                    
              },
              yAxis: {
                  title: {
                      text: '实测数值'
                  },
              },
              tooltip: {
                  /*formatter: function() {
                          return '<b>'+ this.series.name +'</b><br/>'+
                          this.x +': '+ this.y;
                        }*/
                          //shared: true, //是否共享提示，也就是X一样的所有点都显示出来
                          useHTML: true, //是否使用HTML编辑提示信息
                          headerFormat: '<span style="font-size: 13px">土层深度{point.x}米</span><br />',
                          pointFormat: '<span style="font-size: 15px;color:#edf7f3">指标值: </span>' +
                                       '<span style="color:#644727"><b>{point.y}</b></span>',
                          //footerFormat: '</table>',
                  //<td style="text-align: left;color:#edf7f3">{series.name}: </td>
              },
              legend: {
                  layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',                                                            
                     borderWidth: 1 
              },
              series: [],
             
           
          };
});
$(function () {

     chartshow4();
    $("#sambtn").click(function(){
     chartshow4();
       
  });  
});

 
 

