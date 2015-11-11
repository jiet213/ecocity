//预警系统   
function RenderPieChart(elementId, pieTxt,dataList) {

     new Highcharts.Chart({
        chart: {
            options3d: {
            enabled: true,
                alpha: 28,
                beta: 0
            },
            renderTo: elementId,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: true
        },
        colors: ["#a63737", "#208b20"],
        title: {
            text: pieTxt
        },
       tooltip:{
         enabled:false
       },
        plotOptions: {
            pie: {
              size:230,
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,                                   
                    style: {
                        width: '50px',
                        color: '#e2e8e2',
                        font: '12px  微软雅黑,Arial,Lucida Grande',
                    },
                    distance:-65,
                    connectorColor: '#ffff00',
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '超标率',
            data: dataList
        }]
    });
}

function RenderPieLow(elementId, pieTxt,dataList) {
     new Highcharts.Chart({
        chart: {
            
            margin:[-10,0,0,0],
            renderTo: elementId,          
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: true,
        },
        colors: ["#b42325", "#8d3357", "#f49133", "#d4af19", "#c17778", "#b36b99", "#c79667",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
        title: {
            text: pieTxt
        },
        tooltip: {
          enabled:true,
          //pointFormat: '超标个数： <b>{point.y}</b>'
                formatter: function() {
                            return '<span style="font-size: 13px">'+this.point.name+'</span><br />'+
                                   '<span style="font-size: 13px">'+'超标个数：'+'<b>'+this.point.y+'</b></span>';  

                         },
        },
        plotOptions: {
            pie: {
                size:230,
                allowPointSelect: true,
                cursor: 'pointer',               
                dataLabels: {
                    enabled: true,
                    style: {
                        width:'70',
                        color: '#262826',
                        fontFamily:'微软雅黑,Arial,Lucida Grande',
                        fontSize: '11px' ,
                    },   
                    distance:16,
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                }
            }
        },
        
        series: [{
            type: 'pie',
            name: '',
            data: dataList
        }]
    });
};
function RenderPieLevel(elementId, pieTxt,dataList) {
     new Highcharts.Chart({
        chart: {
            margin:[10,0,0,10],
            renderTo: elementId,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: true
        },
        colors: ["#e7e70a", "#ec7705", "#cb0707", "#622292"],
        title: {
            text: pieTxt
        },
        tooltip: {
          enabled:true,
           formatter: function() {
                            return '<span style="font-size: 13px">'+this.point.name+'级'+'</span><br />'+
                                   '<span font-size: 13px>'+'超标个数：'+'<b>'+this.point.y+'</b></span>';  

                         },
        },
        plotOptions: {
            pie: {
                size:230,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {                  
                    style: {  
                        width:'80',
                        color: '#262826',                     
                        fontFamily:'微软雅黑,Arial,Lucida Grande',
                        fontSize: '11px',
                    },    
                    enabled: true,
                    color: '#000000',
                    distance:5,
                    connectorColor: '#000000',
                    format: '<b>{point.name}级</b>: {point.percentage:.2f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '',
            data: dataList
        }]
    });
};
//环境空气预警
function chartshow7() {  
     var subtxt=$("#yjdate").find("option:selected").text(); 
     var url="connect/sql-yjair.php"+"?q1="+$("#samindex").val()+"&q2="+$("#yjdate").val()+"&q3="+$("#level").val()+"&sid="+Math.random();       
     $.getJSON(url, function(json){  
      var tot=json[0]['total'];
      var bey=json[0]['beyond'];
      var rest=tot-bey;
      var dataover = [                     
                      ['超标率',Math.abs(bey)],
                      ['非超标率',Math.abs(rest)]
                      ];
      var title1=subtxt+"超标数据统计";
       RenderPieChart('overall',title1,dataover); 
    });
      
  }
function typeshow() {  

     var url="connect/sql-yjair.php"+"?q1="+$("#samindex").val()+"&q2="+$("#yjdate").val()+"&q3="+$("#level").val()+"&sid="+Math.random();       
     $.getJSON(url, function(json){  
      var title2="站点";
      var title3="日期";
      var title4="等级";
      var type="pie";
          switch ($("#statype").find("option:selected").val()) 
           {
            case "stapoint":
              RenderPieLow('stalow',title2,json[1]);
              break;
            case "stadate":
              RenderPieLow('stalow',title3,json[2]);
              break;
            case "stajib":
              RenderPieLevel('stalow',title4,json[3]);
              
              break;    

           }
              
    });
      
}

//环境空气预警
function RenderColLow(elementId, colorlist,pieTxt,datax,dataList) {
    var chart= new Highcharts.Chart({
        chart: {  
            type:'column',          
            margin:[50,40,70,65],
            renderTo: elementId,          
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: true,
        },
        colors:colorlist,
        title: {
            text: pieTxt,
            
        },
        tooltip: {
          enabled:true,
          //pointFormat: '超标个数： <b>{point.y}</b>'
                formatter: function() {
                            return '<span style="font-size: 13px">'+this.x+'</span><br />'+
                                   '<span style="font-size: 13px">'+'超标个数：'+'<b>'+this.y+'</b></span>';  

                         },
        },
        plotOptions: {
          column: {
                pointWidth: 30,
                
                },
          series:{
               dataLabels:{
                  enabled:true,
                  formatter: function() {
                     if (this.series.sum == null) {
                        var sum = 0,
                              i = this.series.data.length;
                       while(i--) {
                           sum += this.series.data[i].y;   // y because data is an array of point objects
                        }
                        this.series.sum = sum;
                     }
                     return Highcharts.numberFormat(this.y / this.series.sum * 100, 1) + ' %';

                  },
                  color:'#000000',

              },

          }
     
        },
        xAxis: {                
                categories: datax,
                labels: {
                   rotation: 30,             
               },
                                              
                  },
        yAxis: {
                title: {
                      text: '超标个数',
                      //align: 'high',
                },
                lineWidth: 1,
                tickWidth: 1,//刻度线
              
              },
        legend:{
          enabled:false
        },
        series: [{
            data: dataList
        }]
    },function(chartObj) {
    $.each(chartObj.series[0].data, function(i, point) {
        if(point.y > 6) {
            point.dataLabel.attr({y:-2});
        }
    });
});

};
function RenderColLevel(elementId, pieTxt,datax,dataList) {
     var chart=new Highcharts.Chart({
        chart: {  
            type:'column',          
            margin:[50,40,70,65],
            renderTo: elementId,          
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: true,
        },
        colors: ["#f5e700", "#ffc000", "#d80505", "#d4af19"],
        title: {
            text: pieTxt,
            
        },
        tooltip: {
          enabled:true,
          //pointFormat: '超标个数： <b>{point.y}</b>'
                formatter: function() {
                            return '<span style="font-size: 13px">'+this.x+'级'+'</span><br />'+
                                   '<span style="font-size: 13px">'+'超标个数：'+'<b>'+this.y+'</b></span>';  

                         },
        },
        plotOptions: {
          column: {
                pointWidth: 30,             
                },
          series:{
               colorByPoint: true,
               dataLabels:{
                  enabled:true,
                  formatter: function() {
                     if (this.series.sum == null) {
                        var sum = 0,
                              i = this.series.data.length;
                       while(i--) {
                           sum += this.series.data[i].y;   // y because data is an array of point objects
                        }
                        this.series.sum = sum;
                     }
                     return Highcharts.numberFormat(this.y / this.series.sum * 100, 1) + ' %';
                  }

              }
          }
     
        },
        xAxis: {                
                categories: datax,              
                  title: {
                      text: 'as',
                      align:'high'
                  }                            
        },
        yAxis: {
                title: {
                      text: '超标个数'
                },
                lineWidth: 1,
                tickWidth: 1,//刻度线
            
         },
        legend:{
          enabled:false
        },
        series: [{
            data: dataList
        }]
    });
    chart.xAxis[0].update({
                title:{
                    text: "预警等级"
                }
            });

    //chart.legend.allItems[0].update({name:'预警等级'});
};
function chartshow8() {  
     var subtxt=$("#yjdate").find("option:selected").text(); 
     var url="connect/sql-yjsurfacew.php"+"?q1="+$("#samindex").val()+"&q2="+$("#yjdate").val()+"&q3="+$("#level").val()+"&sid="+Math.random();       
     $.getJSON(url, function(json){  
      var tot=json[0]['total'];
      var bey=json[0]['beyond'];
      var rest=tot-bey;
      var dataover = [                     
                      ['超标率',Math.abs(bey)],
                      ['非超标率',Math.abs(rest)]
                      ];
      var title1=subtxt+"超标数据统计";
       RenderPieChart('overall',title1,dataover); 

    });
      
  }

  function typeshow2() {  

     var url="connect/sql-yjsurfacew.php"+"?q1="+$("#samindex").val()+"&q2="+$("#yjdate").val()+"&q3="+$("#level").val()+"&sid="+Math.random();       
     $.getJSON(url, function(json){  
      var title2="站点";
      var title3="日期";
      var title4="等级";
      var cor= ["#b42325", "#8d3357", "#f49133", "#d4af19"];
          switch ($("#statype").find("option:selected").val()) 
           {
            case "stapoint":          
              RenderColLow('stalow',cor,title2,json[1]['Sample'],json[1]['count']);
             
              break;
            case "stadate":
              RenderColLow('stalow',cor,title3,json[2]['Date'],json[2]['count']);
              break;
            case "stajib":
              
              RenderColLevel('stalow',title4,json[3]['Level'],json[3]['count']);
          
              break;    

           }
             
    });

}

function chartshow9() {  
     var subtxt=$("#yjdate").find("option:selected").text(); 
     var url="connect/sql-yjvoice.php"+"?q1="+$("#samindex").val()+"&q2="+$("#yjdate").val()+"&q3="+$("#level").val()+"&sid="+Math.random();       
     $.getJSON(url, function(json){  
      var tot=json[0]['total'];
      var bey=json[0]['beyond'];
      var rest=tot-bey;
      var dataover = [                     
                      ['超标率',Math.abs(bey)],
                      ['非超标率',Math.abs(rest)]
                      ];
      var title1=subtxt+"超标数据统计";
       RenderPieChart('overall',title1,dataover); 

    });
      
  }
 function typeshow3() {  

     var url="connect/sql-yjvoice.php"+"?q1="+$("#samindex").val()+"&q2="+$("#yjdate").val()+"&q3="+$("#level").val()+"&sid="+Math.random();       
     $.getJSON(url, function(json){  
      var title2="站点";
      var title3="日期";
      var title4="等级";
      var cor= ["#75255e", "#8d3357", "#f49133", "#d4af19"];
          switch ($("#statype").find("option:selected").val()) 
           {
            case "stapoint":          
              RenderColLow('stalow',cor,title2,json[1]['Sample'],json[1]['count']);
             
              break;
            case "stadate":
              RenderColLow('stalow',cor,title3,json[2]['Date'],json[2]['count']);
              break;
            case "stajib":
              
              RenderColLevel('stalow',title4,json[3]['Level'],json[3]['count']);
          
              break;    

           }
             
    });

}

