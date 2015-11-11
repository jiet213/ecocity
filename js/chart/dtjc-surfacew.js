var options;
$(function () {
     //chart = new Highcharts.Chart({
   options={
       chart: {
                  backgroundColor: '#598428',
                  renderTo: 'chart',
                  type:'bubble',
                  marginLeft:50,
                  marginRight: 30,
                  marginTop:34,
                  marginBottom:70,
                  marginTop:68,
                  zoomType:'xy',
                  shadow: false,
                  animation: {
                   duration: 1200,

                   }
                  
              },
      title: {
        text: '地表水监测指标'
      },
      subtitle: {
                  text: '',
                  x: -12,
                  y:36,
                  style: { color: '#00b8ed',font: '14px  微软雅黑,Arial,Lucida Grande'}
              },
      
        xAxis: {
          categories: [1,2,3,4,5,6],
          //tickPositions: [0,1, 2, 3, 4, 5], 
          labels: {
                rotation: 3,
                
            },
          title: {
                      text: '日期',
                      align: 'high'
                  }        
             
      },
       plotOptions: {
            bubble: {
                minSize: 50,
                maxSize: 50
            },
            series: {
                //threshold: 50,
                shadow: false,
                marker: {
                    states: {
                        hover: {
                          //useHTML:true;
                            enabled: false
                        }
                    }
                }
            }
        },
      yAxis: {
          tickInterval: 12,
          tickPositions: [0, 12, 24, 36, 48], // 指定竖轴坐标点的值
          labels:{
             enabled:false
          },
          title: {
                align: 'high',
                offset: 0,
                text: '站点',
                rotation: 0,
                y: -10
            },
          /*plotLines: [{
                color: 'red',
                width: 1,
                value: 36,
                label: {
                    text: 'Plot line1',
                    align: 'right',
                    x: -10,
                    y:-40,
                }
              },{
                color: 'blue',
                width: 1,
                value: 12,
                label: {
                    text: 'Plot line2',
                    align: 'right',
                    x: -10,
                    y:-40,
                  }
                     
            }]*/
      },
      legend: {
                  enabled: false  
              },
      tooltip: {
                  formatter: function() {
                          if (this.x =='') {
                            return false;
                          }
                          else 
                            return '<span style="font-size: 13px">'+'日期：'+this.x+'</span><br />'+
                                   '<span style="font-size: 15px;color:#edf7f3">'+'类别:'+'</span>' +
                                   '<span style="color:#EEEE00"><b>'+this.point.z+'</b></span>';  

                         },
                        
              },
      series: [{
          id:'six1',
          data: [[,36,1],[,36,1],[,36,1],[,36,1],[,36,0],[,36,0]],
          /*marker: {
              fillOpacity:0.7,
              lineWidth: 0,
            },  */
          
          },{
          id:'six2', 
          data: [[,12,1],[,12,2],[,12,1],[,12,1],[,12,0],[,12,0]],
          }]
  
    }
});

$(function () {
    chartshow5();
   $("#sambtn").click(function(){    
    chartshow5();
  
        
  });
});

 
 

