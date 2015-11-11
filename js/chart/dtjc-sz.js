/*document.write("<script language=javascript src='js/select.js'></script>");*/
var options;  
$(function() {
       options = {   
              chart: {
                  backgroundColor: '#598428',
                  renderTo: 'chart',
                  //marginLeft:50,
                  marginRight: 60,
                  marginTop:44,
                  marginBottom:60,
                  zoomType:'xy',
                  animation:{
                      duration: 1000,
                  },
                  options3d: {
                   enabled: true,
                   alpha: 0,//y方向
                   beta: 20, //x方向
                   depth: 50,
                   viewDistance: 50 //角度
                  }
                 
              },
              title: {
                  text: '水质监测指标', 
                  x: -20,//center

              },
              subtitle: {
                  text: '',          
                  x: -20,
                  y:36,
                  style: { color: '#FFB90F',font: '14px  微软雅黑,Arial,Lucida Grande'}
              },
              plotOptions: {
                column: {
                pointWidth: 23,
                depth: 24  //深度
                }
              },
              xAxis: {                
                  categories: [],
                  labels: {
                        rotation: 15
                             },                  
                 
                  title: {
                      text: '日期 (月)',
                      align: 'high'
                  }
                    
              },
              yAxis: {
                  title: {
                      text: '实测数值',
                      margin: -10,
                      
                  },
                  /*plotLines: [
                  {
                      id: 'limit-min',
                      color: '#FF0000',
                      dashStyle: 'ShortDash',
                      width: 2,
                      value: 1.2,
                      zIndex: 0,
                      label : {
                          text : '最小临界值'
                      }
                  },{
                      id: 'limit-max',
                      color: '#EE3B3B',
                      dashStyle: 'ShortDash',
                      width: 2,
                      value: 8.36,
                      zIndex: 0,
                      label : {
                      text : '临界值'
                 }
                  }]*/ 
              },
              tooltip: {
                  /*formatter: function() {
                          return '<b>'+ this.series.name +'</b><br/>'+
                          this.x +': '+ this.y;
                        }*/
                          //shared: true, //是否共享提示，也就是X一样的所有点都显示出来
                          useHTML: true, //是否使用HTML编辑提示信息
                          headerFormat: '<span style="font-size: 13px">日期:{point.x}</span><br />',
                          pointFormat: '<span style="font-size: 15px;color:#edf7f3">指标值: </span>' +
                                       '<span style="color:#EEEE00"><b>{point.y}</b></span>',
                          //footerFormat: '</table>',
                  //<td style="text-align: left;color:#edf7f3">{series.name}: </td>
              },
               legend: {
                  layout: 'horizontal',
                    align: 'center',
                    y: 13,
                    borderWidth: 1                                                                            
              },
              series: [],
              /*navigation: {
                  buttonOptions: {
                     verticalAlign: 'bottom',
                      y: -20
                 }
             }*/
           
          }   
});
    

 $(function () {
    chartshow();
   $("#sambtn").click(function(){
     chartshow();
     
  });

});

  
