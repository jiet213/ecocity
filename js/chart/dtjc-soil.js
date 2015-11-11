var options;  
$(function() {
       options = {   
              chart: {
                  backgroundColor: '#598428',
                  renderTo: 'chart',
                  //type:'column',
                  marginLeft:50,
                  marginRight: 50,
                  marginTop:44,
                  marginBottom:70,
                  zoomType:'xy',
                  animation:{
                      duration: 1000,
                  }                
              },
              colors: ["#bb7841","#649c00", "#da9c25", "#9b7731"],
              title: {
                  text: '土壤监测指标', 
                  x: -20 //center
              },
              subtitle: {
                  text: '',          
                  x: -20,
                  y:36,
                  style: { color: '#fff000',font: '14px  微软雅黑,Arial,Lucida Grande'}
              },
              plotOptions: {
                column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color:  'white'
                },
                pointWidth: 40,
                depth: 24  //深度
                }
              },
              xAxis: {                
                  categories: [],
                  /*labels: {
                        rotation: 30
                             },  */                
                 
                  title: {
                      text: '日期',
                      margin:2
                  }
                    
              },
              yAxis: {
                  tickInterval: 1,
                  //max: 6,
                  title: {
                      text: '类别',
                      margin:25
                  },

                  labels:{
                     enabled:false,
                     formatter: function() {
                          return Math.abs(this.value);
                      }
                  },
                  plotLines: [{
                      color: '#da9c25',
                      width: 1,
                      value: 0,
                  }],
                
                  
              },
              tooltip: {
                    formatter: function() {
                          return '<span style="font-size: 13px">'+'日期：'+this.x+'</span><br />'+
                                  '<span style="font-size: 15px;color:#edf7f3">'+'类别:'+'</span>' +
                                  '<span style="color:#EEEE00"><b>'+Math.abs(this.y)+'</b></span>';  

                        }
                          //shared: true, //是否共享提示，也就是X一样的所有点都显示出来
                          //useHTML: true, //是否使用HTML编辑提示信息
                          //headerFormat: '<span style="font-size: 13px">日期：{point.x}</span><br />',
                          //pointFormat: '<span style="font-size: 15px;color:#edf7f3">指标值: </span>' +
                                       //'<span style="color:#EEEE00"><b>{point.y}</b></span>',
                          //footerFormat: '</table>',
                  
              },
              legend: {
                  layout: 'horizontal',
                    align: 'center',
                    y: 7,                                                                           
              },
              series: [],          
          }   
});
    

 $(function () {
    chartshow6();
   $("#sambtn").click(function(){
     chartshow6();
     
  });

});

  
