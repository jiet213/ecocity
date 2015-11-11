//var options;  
$(function() {
    $('#chart').highcharts({
              chart: {
                  backgroundColor: '#598428',
                  renderTo: 'chart',
                  type:'bar',
                  marginLeft:85,
                  marginRight: 40,
                  marginTop:44,
                  marginBottom:50,
                  zoomType:'xy',
                  animation:{
                      duration: 1000,
                  }                
              },
              colors: ["#55BF3B","#3a8328", "#da9c25", "#9b7731"],
              title: {
                  text: '地下水监测指标', 
                  x: -20 //center
              },
              subtitle: {
                  text: '',          
                  x: -20,
                  y:36,
                  style: { color: '#da9c25',font: '14px  微软雅黑,Arial,Lucida Grande'}
              },
              plotOptions: {
                column: {
                pointWidth: 30,
                depth: 24  //深度
                },
                series: {
                stacking: 'normal'
            }
              },
              xAxis: {                
                  categories: ['氨氮', '溶解性总固体', '总硬度', '高锰酸盐指数', 'PH'],
                  labels: {
                            rotation: -45,
                            style: { color: '#fff000',font: '13px  微软雅黑,Arial,Lucida Grande'}
                             },                 
                 
                  title: {
                      text: '',
                      margin:2
                  }
                    
              },
              yAxis: {
                  tickInterval: 4,
                  max: 16,
                 // categories: [0,4,8,12,16],
                  title: {
                      text: '类别',
                      align: 'high'
                  },           
                                 
              },
              tooltip: {
                     positioner: function(boxWidth, boxHeight, point) {
                                 return {
                                  x: point.plotX-35,
                                  y: point.plotY-20
                                };
                      },
                    formatter: function() {
                          return '<span style="font-size: 13px">'+'日期：'+this.series.name+'</span><br />'+
                                  '<span style="font-size: 15px;color:#edf7f3">'+'类别:'+'</span>' +
                                  '<span style="color:#EEEE00"><b>'+this.y+'</b></span>';  

                        }
                          //shared: true, //是否共享提示，也就是X一样的所有点都显示出来
                          //useHTML: true, //是否使用HTML编辑提示信息
                         // headerFormat: '<span style="font-size: 13px">日期：{point.name}</span><br />',
                          //pointFormat: '<span style="font-size: 15px;color:#edf7f3">类别: </span>' +
                                      // '<span style="color:#EEEE00"><b>{point.y}</b></span>',
                          //footerFormat: '</table>',
                  
              },
              legend: {
                  layout: 'horizontal',
                    align: 'center',
                    reversed: true,
                    y: 7,                                                                           
              },
            series: [{
                  name: '2013.1',
                  data: [4, 3, 3, 4, 1]
              }, {
                  name: '2012.11',
                  data: [6, 3, 2, 4, 1]
              }, {                 
                  name: '2012.9',
                  data: [6, 3, 2, 5, 1]
              }]          
         });  
});
    
