      //初始化地图
      var gmap;
    	function init(){
	  		gmap = new gMap("mapDiv", "ecocity");
	  		//gmap.addDynLayers('River_A');//添加动态图层
      		gmap.zoomToXY(37200,25000,4);
      		gmap.addDynLayers('ecocity');
		  }
		  window.onload = init;

    //动态加载图层
		  function changeLayers(ele){
        var lyrname=ele.value;
        if(ele.checked){
          gmap.addDynLayers(lyrname);
        }
        else{
          gmap.removeDynLayers(lyrname);
        }
		  }

      //实现工具条
      function toolControl(e,type){
        if(e && e.stopPropagation){
          //W3C取消冒泡事件
          e.stopPropagation();
        }else{
          //IE取消冒泡事件
          window.event.cancelBubble = true;
        }
        var tool = type;
        switch (tool){
          case 'zoomIn':
            gmap.zoomIn();
          break;
          case 'zoomOut':
            gmap.zoomOut();
          break;
          case 'zoomToXY':
            gmap.zoomToXY(37200,25000,4);
          break;
          case 'zoomto':
            gmap.curType = "map";
            gmap.maptool="zoomto";
          break;
          case 'rulerLength':
            gmap.curType = "map";
            gmap.maptool="rulerLength";
          break;
          case 'rulerArea':
            gmap.curType = "map";
            gmap.maptool="rulerArea";
          break;
          }
      }

      function chooseplace(e){
        var place = e.value;
        if(e.checked){
        switch(place){
          case 'shanghai':
            gmap.zoomToXY(2416,688,7);
            document.getElementById("place").style.display="none";//隐藏div
            e.checked=false;//取消选中
          break;
          case 'chongming':
            gmap.zoomToXY(24752,34744,7);
            document.getElementById("place").style.display="none";
            e.checked=false;
          break;
          case 'dongtan':
            gmap.zoomToXY(37200,25000,4);
            document.getElementById("place").style.display="none";
            e.checked=false;
          break;
        }
      }
      else{
        gmap.zoomToXY(37200,25000,4);
      }
    }
