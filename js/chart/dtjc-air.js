var options;  
$(function() {
options = {   
              chart: {
                  backgroundColor: '#598428',
                  renderTo: 'chart',
                  /*type:'area',*/
                  marginRight: 30,
                  marginTop:34,
                  marginBottom:70,
                  zoomType:'xy',
                  animation:{
                    duration: 1200,
                  },
                  
              },
              colors: ["#cda766", "#178b88", "#6c464d", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
              title: {
                  text: '环境空气指标', 
                  x: -20 //center
              },
              /*plotOptions: {
                      column: {
                          pointPadding: 0.2,
                          borderWidth: 1,
                          pointWidth: 30
                      }
                  },*/
              subtitle: {
                  text: '',
                  x: -20,
                  y:36,
                  style: { color: '#cda766',font: '14px  微软雅黑,Arial,Lucida Grande'}
              },
              xAxis: {                
                  categories: [],
                               
                 
                  title: {
                      text: '日期(日)'
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
                          headerFormat: /*'<span style="font-size: 13px">{datetxt}</span><br />'+*/
                                        '<span style="font-size: 13px">{point.x}</span><br />',
                          pointFormat: '<span style="font-size: 15px;color:#edf7f3">指标值: </span>' +
                                       '<span style="color:#e4bc7a"><b>{point.y}</b></span>',
                          //footerFormat: '</table>',
                  //<td style="text-align: left;color:#edf7f3">{series.name}: </td>
              },
              legend: {
                  layout: 'horizontal',
                    align: 'center',
                    y: 8 ,                                                                           
              },
              series: [],
             
           
          };
});
$(function () {
     chartshow3();
    $("#sambtn").click(function(){
     chartshow3();
       
  });
    
  
});

 
 

