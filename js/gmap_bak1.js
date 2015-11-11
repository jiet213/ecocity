var mapParams = {
	RequestType: 'WMS',
	map: '',
	w: '',
	h: '',
	mt: '',
	cx: '',
	cy: '',
	zoom: '',
	"return": "json",
	"stamp": "",
	lyrs: '',
	ownamap:'1'
};
var tileParams = {
	req: 'getmap',
	w: '',
	h: '',
	zl: '',
	cx: '',
	cy: '',
	"return": 'json'
};
var otherZoom = {
	zl: '',
	lat: '',
	lng: ''
};
var zl2zoom={'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0};
var tileTimer;
var tileStamp = 0;
var gSelf;
var zitv, pitv;
var bgTimer;
var isMobile = false;
var isTouch = false;
/**
 * gMap构造函数
 * @param {String} 地图容器ID
 * @param {String} m 工作空间
 */
function gMap(containerId, m) {
	gSelf = this;
	this.curType = "map";
	this.container = document.getElementById(containerId);
	this.ctrlLyrs = [];
	this.width = this.container.clientWidth;
	this.height = this.container.clientHeight;
	this.startX;
	this.startY;
	this.middleX;
	this.middleY;
	this.endX;
	this.endY;

	this.startScrX;
	this.startScrY;
	this.endScrX;
	this.endScrY;

	this.pinchPt1;
	this.pinchPt2;
	this.startDis;
	this.endDis;
	this.moving = false;
	this.dragging = false;
	this.pinching = false;
	this.pinchP1End = false;
	this.lastZoomLevel = -1;

	this.lengthPtArr = [];
	/*长度测量线端点数组*/
	this.areaPtArr = [];
	/*面积量算多边形顶点数组*/

	//存储要素对象
	this.pointArr = [];
	this.lineArr = [];
	this.polygonArr = [];

	this.zoomStamp = 0;
	this.maptool = "zoomto";
	this.showDyn = true;
	this.showTile = true;
	this.loadCount = 0;
	this.bgFinish = false;

    this.otherMapOpacity=1;//第三方地图的透明度设置，供二次开发者修改

	this.mapVisible = true;
	this.hasImgURL = []; //用来判断是否需要对切片中的图片进行更改
	this.zoomLevel = 4;
	this.startLeft = 0;
	this.startTop = 0;
	this.mapLeft = document.getElementById(containerId).offsetLeft;
	this.mapTop = document.getElementById(containerId).offsetTop;
	this.xOffset = -100;
	this.yOffset = -100;
	this.imgURL = "../../index_img/images/blank.png";
	this.tileWidth = 250; //声明切片大小，默认为250*200
	this.tileHeight = 200;

	this.ifZoomTo = false;

	this.scx = this.width / 2; /*屏幕中心点坐标X*/
	this.scy = this.height / 2; /*屏幕中心点坐标Y*/

	this.mouseStartTime = 0;
	this.mouseStopTime = 0;

	this.init(m);
}

/**
 * 初始化函数
 */
gMap.prototype.init = function(m) {
	/*	document.ondragstart = function () {
		return false;
	};*/
	document.oncontextmenu = function() {
		return false;
	}
	isDeviceMobile();
	this.ifInit = true;
	this.ifZoomTo = false;
	//切片地图图层
	this.baseMapDiv = document.createElement('div');
	this.baseMapDiv.id = 'baseMapDiv';
	this.baseMapDiv.setAttribute('width', this.width);
	this.baseMapDiv.setAttribute('height', this.height);
	this.baseMapDiv.style.width = this.width + "px";
	this.baseMapDiv.style.height = this.height + "px";
	this.baseMapDiv.style.position = "absolute";
    
	this.mapView = document.createElement('div');
	this.mapView.id = 'mapView';
	this.mapView.setAttribute('width', this.width);
	this.mapView.setAttribute('height', this.height);
	this.mapView.style.position = "absolute";
	this.mapView.style.top = "0px";
	this.mapView.style.left = "0px";
	this.mapView.style.width = this.width + "px";
	this.mapView.style.height = this.height + "px";
	this.mapView.style.zIndex = 2;

	this.baseMap = document.createElement('div');
	this.baseMap.id = 'baseMap';
	this.baseMap.style.zIndex = 2;
	this.nWidth = Math.ceil(parseInt(this.width) / this.tileWidth) + 1;
	this.nHeight = Math.ceil(parseInt(this.height) / this.tileHeight) + 1;
	this.baseMap.style.left = this.xOffset + "px";
	this.baseMap.style.top = this.yOffset + "px";
	this.baseMap.style.width = this.nWidth * this.tileWidth + 'px';
	this.baseMap.style.height = this.nHeight * this.tileHeight + 'px';
	this.baseMap.style.position = "absolute";

	this.baseBgMap = this.baseMap.cloneNode();
	this.baseBgMap.id = "baseBgMap";
	this.baseBgMap.style.zIndex = 1;

	//动态地图图层
	this.dynMap = document.createElement('canvas');
    if(EventUtil.getIEversion()!=0){
        this.dynMap=window.G_vmlCanvasManager.initElement(this.dynMap);
    }

	this.dynMap.id = 'dynMapCanvas';
	//注意必须设置canvas宽高属性
	this.dynMap.setAttribute('width', this.width);
	this.dynMap.setAttribute('height', this.height);
	this.dynMap.style.width = this.width + 'px';
	this.dynMap.style.height = this.height + 'px';;
	this.dynMap.style.position = "absolute";
	this.dynMap.style.zIndex = 3;
	this.dynCtx = this.dynMap.getContext("2d");

	this.overlayCanvas = this.dynMap.cloneNode();
if(EventUtil.getIEversion()!=0){
        this.overlayCanvas=window.G_vmlCanvasManager.initElement(this.overlayCanvas);
    }
	this.overlayCanvas.id = "overLayCanvas";
	this.overlayCanvas.style.zIndex = 7;
	this.overlayCtx = this.overlayCanvas.getContext("2d");


    this.infoDiv = document.createElement('div');
    this.infoDiv.setAttribute('width', 200);
	this.infoDiv.setAttribute('height', 50);
	this.infoDiv.style.position = "absolute";
	this.infoDiv.style.bottom = "0px";
	this.infoDiv.style.left = "0px";
	this.infoDiv.style.width = "170px";
	this.infoDiv.style.height = "50px";
	this.infoDiv.style.zIndex = 7;
	if(EventUtil.getIEversion()==0){
	
	  this.infoDiv.style.background = "rgba(0,14,12,0.5)";//IE不支持
    }
	this.infoDiv.style.borderRadius="7px";

	this.infoCanvas = this.overlayCanvas.cloneNode(); //克隆节点
 if(EventUtil.getIEversion()!=0){
        this.infoCanvas=window.G_vmlCanvasManager.initElement(this.infoCanvas);
    }
	this.infoCanvas.id = "infoCanvas";
	this.infoCanvas.style.zIndex = 8;
	this.infoCtx = this.infoCanvas.getContext("2d");

	this.pointCanvas = this.dynMap.cloneNode();
if(EventUtil.getIEversion()!=0){
        this.pointCanvas=window.G_vmlCanvasManager.initElement(this.pointCanvas);
    }	
	this.pointCanvas.id = "pointCanvas";
	this.pointCanvas.style.zIndex = 4;
	this.pointCtx = this.pointCanvas.getContext("2d");

	this.lineCanvas = this.dynMap.cloneNode();
 if(EventUtil.getIEversion()!=0){
        this.lineCanvas=window.G_vmlCanvasManager.initElement(this.lineCanvas);
    }	
	this.lineCanvas.id = "lineCanvas";
	this.lineCanvas.style.zIndex = 5;
	this.lineCtx = this.lineCanvas.getContext("2d");

	this.polygonCanvas = this.dynMap.cloneNode();
 if(EventUtil.getIEversion()!=0){
        this.polygonCanvas=window.G_vmlCanvasManager.initElement(this.polygonCanvas);
    }	
	this.polygonCanvas.id = "polygonCanvas";
	this.polygonCanvas.style.zIndex = 6;
	this.polygonCtx = this.polygonCanvas.getContext("2d");

	//动态地图图层
	this.markerDiv = document.createElement('div');
	this.markerDiv.id = 'markerDiv_geo';
	//注意必须设置canvas宽高属性
	this.markerDiv.setAttribute('width', this.width);
	this.markerDiv.setAttribute('height', this.height);
	this.markerDiv.style.width = this.width + 'px';
	this.markerDiv.style.height = this.height + 'px';;
	this.markerDiv.style.position = "absolute";
	this.markerDiv.style.zIndex = 9;


	this.container.appendChild(this.dynMap);
	this.mapView.appendChild(this.baseMap);
	this.mapView.appendChild(this.baseBgMap);
	this.baseMapDiv.appendChild(this.mapView);
	this.container.appendChild(this.baseMapDiv);
	this.container.appendChild(this.pointCanvas);
	this.container.appendChild(this.lineCanvas);
	this.container.appendChild(this.polygonCanvas);
	this.container.appendChild(this.overlayCanvas);
	//this.container.appendChild(this.infoDiv);
	this.container.appendChild(this.infoCanvas);
	this.container.appendChild(this.markerDiv);

	!m ? mapParams.map = "sh" : mapParams.map = m;
	//this.webMapURL = "../";
	//this.webHost="http://58.198.183.6";
	//this.fileServer = "../FileServer?fn=";
	//this.fileServer = "http://58.198.183.6:8090/FileServer?fn=";
	this.webHost = "http://" + window.location.hostname;
	this.webMapURL = this.webHost + ":81/";
	//this.tileMapUrl = this.webHost + ":81/TileMap";
	//this.fileServer = this.webHost + ":81/FileServer?fn=";
	this.fileServer = "http://webgis.ecnu.edu.cn:81/FileServer?fn=";
	
	this.cx = 2000;
	this.cy = -10000;
	this.zoom = 16000;

	this.mapImg = new Image();
	tileParams.w = mapParams.w = this.width;
	tileParams.h = mapParams.h = this.height;
	tileParams.cx = mapParams.cx = this.cx;
	tileParams.cy = mapParams.cy = this.cy;
	mapParams.zoom = this.zoom;
	mapParams.stamp = new Date().getTime();
	mapParams.mt = "zoomto";

	tileParams.zl = this.zoomLevel;
	this.createTiles();
	this.requestTileMap(tileParams);
	//this.requestMap(mapParams);
	this.addDynLayers('empty,quxianmian,zhenjiedaomian');//empty为避免出现mapparames.lyrs为空的情况
    
    zl2zoom['4']=mapParams.zoom;
    zl2zoom['3']=zl2zoom['4']/2;
    zl2zoom['2']=zl2zoom['3']/2;
    zl2zoom['1']=zl2zoom['2']/2;
    zl2zoom['5']=zl2zoom['4']*2;
    zl2zoom['6']=zl2zoom['5']*2;
    zl2zoom['7']=zl2zoom['6']*2;

	this.ifInit = false;
	this.showScaleOnMap(); //显示比例尺
	this.mapImg.onload = function() {
		gSelf.dynCtx.clearRect(0, 0, gSelf.width, gSelf.height);
		gSelf.dynCtx.drawImage(gSelf.mapImg, 0, 0);
	};

	if (!isMobile) {
		EventUtil.addHander(this.container,'mousedown',mapMouseDownEvt);
		EventUtil.addHander(this.container,'mousemove',mapMouseMoveEvt);
		EventUtil.addHander(this.container,'mouseup',mapMouseUpEvt);
		EventUtil.addHander(this.container,'mousewheel',MouseWheelHandler);
		EventUtil.addHander(this.container,'DOMMouseScroll',MouseWheelHandler);
		EventUtil.addHander(this.container,'dblclick',mapMouseDblClickEvt);
		var startName = "ontouchstart";
		var doc = document.documentElement;
		if (startName in doc) {
			isTouch = true;
			EventUtil.addHander(this.container,'touchstart',mapMouseDownEvt);
		    EventUtil.addHander(this.container,'touchmove',mapMouseMoveEvt);
		    EventUtil.addHander(this.container,'touchend',mapMouseUpEvt);
		}
	} else {
		    EventUtil.addHander(this.container,'touchstart',mapMouseDownEvt);
		    EventUtil.addHander(this.container,'touchmove',mapMouseMoveEvt);
		    EventUtil.addHander(this.container,'touchend',mapMouseUpEvt);
	}


	document.onkeyup = function(e) {
		if (e.keyCode == '13') {
			if (zitv != undefined) {
				stopZoomMap();
				//console.log(zitv);
			}
			if (pitv != undefined) {
				stopPanMap();
			}
		}
	}
}

/**
 * 添加图层
 */
gMap.prototype.addLayer = function(layer) {
	switch (layer) {
		case 'dyn':
			this.showDyn = true;
			mapParams.stamp = new Date().getTime();
			this.requestMap(mapParams);
			this.displayMap('dyn');
			break;
		case 'tile':
			this.showTile = true;
			//this.zoomTo(tileParams);
			this.maptool = "zoomin";
			this.requestTileMap(tileParams);
			this.maptool = "zoomto";
			this.displayMap('tile');
			break;
	}
}

/**
 * 移除图层
 */
gMap.prototype.removeLayer = function(layer) {
	switch (layer) {
		case 'dyn':
			this.showDyn = false;
			this.hideMap('dyn');
			break;
		case 'tile':
			this.showTile = false;
			this.hideMap('tile');
			break;
	}
}

/**
 * 添加动态图层
 */
gMap.prototype.addDynLayers = function(lyrStr) {
	var arr = lyrStr.split(",");
	if(!Array.indexOf){//IE不支持
      Array.prototype.indexOf = function(obj){             
        for(var i=0; i<this.length; i++){
          if(this[i]==obj){
            return i;
          }
        }
       return -1;
     }
    }

	for (var i = 0; i < arr.length; i++) {
		var j = this.ctrlLyrs.indexOf(arr[i]);
		if (j < 0) this.ctrlLyrs.push(arr[i]);
	}
	mapParams.lyrs = this.ctrlLyrs.join(",");
	mapParams.mt = 'zoomto';
	mapParams.stamp = new Date().getTime();
	this.requestMap(mapParams);
}

/**
 * 移除动态图层
 */
gMap.prototype.removeDynLayers = function(lyrStr) {
	var arr = lyrStr.split(",");
	for (var i = 0; i < arr.length; i++) {
		var k = this.ctrlLyrs.indexOf(arr[i]);
		if (k >= 0) {
			for (var j = k; j < this.ctrlLyrs.length - 1; j++) {
				this.ctrlLyrs[j] = this.ctrlLyrs[j + 1];
			}
			this.ctrlLyrs.length--;
		}
	}
	mapParams.lyrs = this.ctrlLyrs.join(",");
	mapParams.mt = 'zoomto';
	mapParams.stamp = new Date().getTime();
	this.requestMap(mapParams);
}

/**
 * 图层控制
 */
gMap.prototype.controlLyr = function(obj) {
	if (obj.checked) {
		this.addDynLayers(obj.id);
	} else {
		this.removeDynLayers(obj.id);
	}
}

/**
 * 创建切片
 */
gMap.prototype.createTiles = function() {
	var ileft, itop;
	var baseMap = this.baseMap;
	var width = this.nWidth;
	var height = this.nHeight;
	var num = width * height;
	for (var i = 0; i < num; i++) {
		var newImg = document.createElement('img');
		newImg.id = "mt_" + i;
		newImg.src = gSelf.imgURL;
		this.hasImgURL[newImg.id] = false;
		newImg.style.position = "absolute"; //important
		itop = Math.floor(i / width) * gSelf.tileHeight;
		ileft = Math.floor(i % width) * gSelf.tileWidth;
		newImg.style.left = ileft + "px";
		newImg.style.top = itop + "px";
		newImg.style.width = gSelf.tileWidth + "px";
		newImg.style.height = gSelf.tileHeight + "px";
		baseMap.appendChild(newImg);
	}
}

/**
 * 请求切片地图
 */
gMap.prototype.requestTileMap = function(params) {
    this.lastZoomLevel = params.zl;
    //var mapurl = this.webMapURL + 'TileMap';
    var mapurl = 'http://webgis.ecnu.edu.cn:81/TileMap';
    var reqUrl = mapurl + "?req=getmap&w=" + this.width + "&h=" + this.height + "&cx=" + this.cx + "&cy=" + this.cy + "&zl=" + this.zoomLevel + "&return=json";
    ajax("get", mapurl, params, false, function(data) {
        data = JSON.parse(data);
        gSelf.showMap(data);
    });
}

/**
 * 请求动态地图
 */
gMap.prototype.requestMap = function(params) {
    //var mapurl = this.webMapURL + 'WebMap';
    var mapurl = 'http://webgis.ecnu.edu.cn:81/WebMap';
    //var reqUrl = "http://localhost:8090/webmap?map=shxz2008&&w=" + mapParams.w + "&h=" + mapParams.h + "&cx=" + mapParams.cx + "&cy=" + mapParams.cy + "&zoom=" + mapParams.zoom + "&lyrs=" + mapParams.lyrs + "&mt=" + mapParams.mt + "&return=json";
    //console.log(reqUrl);
    try {
        ajax("get", mapurl, params, false, function(data) {
            data = JSON.parse(data);
            //console.log(data);
            if (!data.mapURL) {
                alert("地图请求失败！");
                return;
            }
            gSelf.mapImg.src = gSelf.fileServer + data.mapURL;
            gSelf.cx = mapParams.cx = data.centerX;
            gSelf.cy = mapParams.cy = data.centerY;
            gSelf.zoom = mapParams.zoom = data.mapZoom;
        });
    } catch (e) {
        alert("出现异常在：" + e);
    }
}

/**
 * 显示切片地图
 */
gMap.prototype.showMap = function(data) {
	var d = this.baseMap;
	var nWidth = this.nWidth;
	var nHeight = this.nHeight;
	mapParams.cx = this.cx = data.tileInfo.cx;
	mapParams.cy = this.cy = data.tileInfo.cy;
	mapParams.zoom = data.tileInfo.zoom;
	if (this.ifInit || this.ifZoomTo || (this.maptool == "zoomin") || (this.maptool == "zoomout")) {
		this.xOffset = data.tileInfo.xoff;
		this.yOffset = data.tileInfo.yoff;
		d.style.left = this.xOffset + "px";
		d.style.top = this.yOffset + "px";
	}
	if (this.ifInit) {
		this.baseBgMap.style.left = d.style.left;
		this.baseBgMap.style.top = d.style.top;
	}
	mapParams.zoom = data.tileInfo.zoom;
	if ((this.maptool == "zoomin") || (this.maptool == "zoomout")) {
		this.resetTile();
		//console.log(gSelf.hasImgURL);
	}
	var tmpIndexArr = [];
	var len = data.tiles.length;

	var j = 0;
	var i = 0;

	function getImg() {
		var startTimer = new Date().getTime();
		if (j >= len) {
			gSelf.bgFinish = true;
			return;
		}
		//console.log(data.tiles[j],j);

		var row = data.tiles[j].row;
		var col = data.tiles[j].col;
		var k = (row - 1) * nWidth + (col - 1);
		tmpIndexArr.push(k);
		var imgtmp = d.childNodes[k];
		var tmpUrl = data.tiles[j].url;
		var tmpzl = tmpUrl.substring(16, 17);
		if (!(gSelf.hasImgURL[imgtmp.id]) && tmpzl == gSelf.zoomLevel) {
			var imgUrl = gSelf.fileServer + tmpUrl;

			imgtmp.src = imgUrl;

			
			imgtmp.onload = function() {
				i++;
				//console.log(i);
				var endTimer = new Date().getTime();
				//console.log(endTimer - startTimer);
				if (i == len) {
					//console.log(gSelf.baseMap.style.left);
					gSelf.baseBgMap.style.left = gSelf.baseMap.style.left;
					gSelf.baseBgMap.style.top = gSelf.baseMap.style.top;
					gSelf.hideMap('bgMap');
				}
			}
			//console.log(row, col, imgUrl);
			gSelf.hasImgURL[imgtmp.id] = true;

		}
		j++;
		//getImg();
		//tileTimer = setTimeout(getImg, 15);
		setTimeout(function(){getImg();setTimeout(arguments.callee, 3);},3); 
	}
	getImg();
    //clearTimeout(tileTimer);
	for (var j in d.childNodes.length) {
		if (!isInArray(tmpIndexArr, j)) {
			d.childNodes[j].src = this.imgURL;
		}
	}
	this.maptool = "zoomto";
}

gMap.prototype.resetTile = function() {
	this.hideMap('tile');
	var d = this.baseMap;
	for (var i = this.nHeight * this.nWidth; i > 0; i--) {
		var imgtmp = d.childNodes[i - 1];
		d.removeChild(imgtmp);
		imgtmp = null;
	}
	this.createTiles();
	this.displayMap('tile');
};


/**
 * 隐藏地图
 */
gMap.prototype.hideMap = function(type) {
	switch (type) {
		case 'tile':
			var basemap = this.baseMap;
			basemap.style.visibility = "hidden";
			break;
		case 'dyn':
			var dynmap = this.dynMap;
			dynmap.style.visibility = "hidden";
			break;
		case 'bgMap':
			this.baseBgMap.style.visibility = "hidden";
			break;
	}
};

/**
 * 显示地图
 */
gMap.prototype.displayMap = function(type) {
	switch (type) {
		case 'tile':
			var basemap = this.baseMap;
			basemap.style.visibility = "visible";
			break;
		case 'dyn':
			var dynmap = this.dynMap;
			dynmap.style.visibility = "visible";
			break;
		case 'bgMap':
			this.baseBgMap.style.visibility = "visible";
			break;
	}

};


/**
 * 回绕切片（右至左）
 */
gMap.prototype.wrapR2L = function() {
	this.xOffset = this.xOffset - this.tileWidth;
	var d = this.baseMap;
	var offLeft = delpx(d.childNodes[0].style.left);
	for (var j = 0; j < this.nHeight; j++) {
		var imgLast = d.childNodes[((j + 1) * this.nWidth) - 1];
		var imgNext = d.childNodes[j * this.nWidth];
		imgLast.style.left = (offLeft - this.tileWidth) + "px";
		imgLast.src = this.imgURL;
		d.removeChild(imgLast);
		d.insertBefore(imgLast, imgNext);
		this.hasImgURL[imgLast.id] = false;
	}
};

/**
 * 回绕切片（左至右）
 */
gMap.prototype.wrapL2R = function() {
	this.xOffset = this.xOffset + this.tileWidth;
	var d = this.baseMap;
	var offLeft = delpx(d.childNodes[this.nWidth - 1].style.left);
	for (var j = 0; j < this.nHeight; j++) {
		var imgFirst = d.childNodes[j * this.nWidth];
		var imgNext;
		if (j < this.nHeight - 1) {
			imgNext = d.childNodes[(j + 1) * this.nWidth];
		} else {
			imgNext = null;
		}
		imgFirst.style.left = (offLeft + this.tileWidth) + "px";
		imgFirst.src = this.imgURL;
		d.removeChild(imgFirst);
		if (imgNext) {
			d.insertBefore(imgFirst, imgNext);
		} else {
			d.appendChild(imgFirst);
		}
		this.hasImgURL[imgFirst.id] = false;
	}
};

/**
 * 回绕切片（顶至底）
 */
gMap.prototype.wrapT2B = function() {
	this.yOffset = this.yOffset + this.tileHeight;
	var d = this.baseMap;
	var offTop = delpx(d.childNodes[(this.nHeight * this.nWidth) - 1].style.top);
	for (var i = 0; i < this.nWidth; i++) {
		var imgBottom = d.childNodes[0];
		imgBottom.style.top = (offTop + this.tileHeight) + "px";
		imgBottom.src = this.imgURL;
		d.removeChild(imgBottom);
		d.appendChild(imgBottom);
		this.hasImgURL[imgBottom.id] = false;
	}
};

/**
 * 回绕切片（底至顶）
 */
gMap.prototype.wrapB2T = function() {
	this.yOffset = this.yOffset - this.tileHeight;
	var d = this.baseMap;
	var offTop = delpx(d.childNodes[0].style.top);
	for (var i = 0; i < this.nWidth; i++) {
		var imgTop = d.childNodes[(this.nHeight * this.nWidth) - 1];
		imgTop.style.top = (offTop - this.tileHeight) + "px";
		imgTop.src = this.imgURL;
		d.removeChild(imgTop);
		d.insertBefore(imgTop, d.childNodes[0]);
		this.hasImgURL[imgTop.id] = false;
	}
};

/**
 * 平移地图
 */
gMap.prototype.panMap = function() {
	this.hideMap('tile');
	while (this.xOffset > 0) this.wrapR2L();
	while (this.yOffset > 0) this.wrapB2T();
	while (this.xOffset < -this.tileWidth) this.wrapL2R();
	while (this.yOffset < -this.tileHeight) this.wrapT2B();
	this.displayMap('tile');
	var nowStamp = new Date().getTime();
	var tmpitv = nowStamp - tileStamp;
	this.requestTileMap(tileParams);
	tileStamp = new Date().getTime();
};

/**
 * 放大
 */
gMap.prototype.zoomIn = function() {
	if (this.zoomLevel <= 1) {
		return;
	}
	this.maptool = "zoomin";
	var z = this.getZoom();
	this.zoomLevel--;
	tileParams.zl = this.zoomLevel;
	this.zoom = this.zoom / 2;
	mapParams.zoom = this.zoom;
	if (this.showTile) {
		this.hideMap('bgMap');
		this.scaleTileMap('zoomin');
		this.displayMap('bgMap');
		this.requestTileMap(tileParams);
	}
	if (this.showDyn) {
		//mapParams.zoom = this.zoom;
		//设置缩小地图返回结果前的缩小图片效果
		clearCanvas(this.dynMap);
		var w = this.dynMap.width;
		var h = this.dynMap.height;
		var mapimg = this.mapImg;
		mapimg.width = w * 2;
		mapimg.height = h * 2;
		var left = (w - mapimg.width) / 2;
		var top = (h - mapimg.height) / 2;
		this.dynMap.getContext("2d").drawImage(mapimg, left, top, mapimg.width, mapimg.height);
		mapParams.mt = "zoomin";
		mapParams.stamp = new Date().getTime();
		this.requestMap(mapParams);
		mapParams.mt = "zoomto";
	}
	if (gSelf.otherMapDiv){
        //首先请求第三方地图
		var lnglat=shToLngLat(gSelf.cx,gSelf.cy);
	    var tmplng=lnglat.lng;
	    var tmplat=lnglat.lat;
		var tmpzl=gSelf.zoomLevel;
		gSelf.zoomWithBaseMap(tmplng, tmplat, tmpzl);
    }
	clearCanvas(gSelf.polygonCanvas);
	this.showScaleOnMap();
	gSelf.drawFeatures(); //接口空函数，二次开发者自由拓展功能
	this.maptool = "zoomto";
}

/**
 * 缩小
 */
gMap.prototype.zoomOut = function() {
	if (this.zoomLevel >= 7) {
		return;
	}
	this.maptool = "zoomout";
	var z = this.getZoom();
	this.zoomLevel++;
	tileParams.zl = this.zoomLevel;
	this.zoom = this.zoom * 2;
	mapParams.zoom = this.zoom;
	if (this.showTile) {
		this.hideMap('bgMap');
		this.scaleTileMap('zoomout');
		this.displayMap('bgMap');
		this.requestTileMap(tileParams);
	}
	if (this.showDyn) {
		//		mapParams.zoom = this.zoom;
		//		this.zoomTo(z.cx,z.cy);
		//设置放大地图返回结果前的缩小图片效果
		clearCanvas(this.dynMap);
		var w = this.dynMap.width;
		var h = this.dynMap.height;
		var mapimg = this.mapImg;
		mapimg.width = w / 2;
		mapimg.height = h / 2;
		var left = (w - mapimg.width) / 2;
		var top = (h - mapimg.height) / 2;
		this.dynMap.getContext("2d").drawImage(mapimg, left, top, mapimg.width, mapimg.height);
		mapParams.mt = "zoomout";
		mapParams.stamp = new Date().getTime();
		this.requestMap(mapParams);
		mapParams.mt = "zoomto";
	}
	if (gSelf.otherMapDiv){
        //首先请求第三方地图
		var lnglat=shToLngLat(gSelf.cx,gSelf.cy);
	    var tmplng=lnglat.lng;
	    var tmplat=lnglat.lat;
		var tmpzl=gSelf.zoomLevel;
		gSelf.zoomWithBaseMap(tmplng, tmplat, tmpzl);
    }
	clearCanvas(gSelf.polygonCanvas);
	this.showScaleOnMap();
	gSelf.drawFeatures(); //接口空函数，二次开发者自由拓展功能
	this.maptool = "zoomto";
}

/**
 * 平移地图
 */
gMap.prototype.zoomTo = function(cx, cy) {
	mapParams.cx = cx;
	mapParams.cy = cy;
	mapParams.stamp = new Date().getTime();
	this.requestMap(mapParams);
};
/**
 * 缩放至指定级别
 */
gMap.prototype.zoomToXY = function(cx, cy, zl) {
	tileParams.cx = mapParams.cx = cx;
	tileParams.cy = mapParams.cy = cy;
	tileParams.zl = this.zoomLevel = zl;
	mapParams.zoom = zl2zoom[zl];
	if(this.showTile){
	  this.ifZoomTo = true;
	  this.resetTile();
	  this.requestTileMap(tileParams);
	  this.ifZoomTo = false;
	}
	mapParams.stamp = new Date().getTime();
	this.requestMap(mapParams);
	if (gSelf.otherMapDiv){
        //首先请求第三方地图
		var lnglat=shToLngLat(gSelf.cx,gSelf.cy);
	    var tmplng=lnglat.lng;
	    var tmplat=lnglat.lat;
		var tmpzl=gSelf.zoomLevel;
		gSelf.zoomWithBaseMap(tmplng, tmplat, tmpzl);
    }
	clearCanvas(gmap.polygonCanvas);
	this.showScaleOnMap();
	gSelf.drawFeatures(); //接口空函数，二次开发者自由拓展功能

};
/**
 * 模糊效果预缩放
 */
gMap.prototype.scaleTileMap = function(mapTool) {

	var tx, ty;
	var d = this.baseBgMap;
	var sx = this.scx;
	var sy = this.scy;
	var tx = sx - delpx(d.style.left);
	var ty = sy - delpx(d.style.top);
	for (var i = d.childNodes.length; i > 0; i--) {
		var imgtmp = d.childNodes[i - 1];
		d.removeChild(imgtmp);
		imgtmp = null;
	}
	var factor;
	if (mapTool == "zoomin") {
		factor = 2;
	}
	if (mapTool == "zoomout") {
		factor = 0.5;
	}

	for (var i = 0; i < this.baseMap.childNodes.length; i++) {
		var imgtmp = this.baseMap.childNodes[i].cloneNode();
		var ileft = delpx(imgtmp.style.left);
		var itop = delpx(imgtmp.style.top);
		imgtmp.style.left = tx + (ileft - tx) * factor + "px";
		imgtmp.style.top = ty + (itop - ty) * factor + "px";
		imgtmp.style.width = delpx(imgtmp.style.width) * factor + "px";
		imgtmp.style.height = delpx(imgtmp.style.height) * factor + "px";
		d.appendChild(imgtmp);
	}
	this.bgFinish = false;
	var tileWidth = this.tileWidth;
	var tileHeight = this.tileHeight;
	var offx = ((sx - this.xOffset) % tileWidth) / 2;
	var offy = ((sy - this.yOffset) % tileHeight) / 2;
	this.xOffset = ((this.width / 2 - offx) % tileWidth) - tileWidth;
	this.yOffset = ((this.height / 2 - offy) % tileHeight) - tileHeight;
	this.xOffset = Math.round(this.xOffset);
	this.yOffset = Math.round(this.yOffset);

	//setBgMapPos();
}

gMap.prototype.pinchMap = function(factor) {
	var tx, ty;
	var d = this.baseBgMap;
	var sx = this.scx;
	var sy = this.scy;
	var tx = sx - delpx(d.style.left);
	var ty = sy - delpx(d.style.top);
	for (var i = 0; i < this.baseMap.childNodes.length; i++) {
		var imgtmp = this.baseMap.childNodes[i];
		//console.log(imgtmp);
		var ileft = delpx(imgtmp.style.left);
		var itop = delpx(imgtmp.style.top);
		imgtmp.style.left = tx + (ileft - tx) * factor + "px";
		imgtmp.style.top = ty + (itop - ty) * factor + "px";
		imgtmp.style.width = delpx(imgtmp.style.width) * factor + "px";
		imgtmp.style.height = delpx(imgtmp.style.height) * factor + "px";
	}
}
/**
 * 绘制线要素
 * @param  {Object} ctx  Canvas上下文
 * @param  {Array} polyPtArr 线要素节点数组
 */
gMap.prototype.drawLine = function(ctx, startX, startY, endX, endY) {
	ctx.beginPath();
	ctx.fillStyle = "#FFE153";
	ctx.strokeStyle = "#FFE153";
	ctx.lineWidth = 2;
	ctx.moveTo(startX, startY); //设置起点
	ctx.lineTo(endX, endY);
	ctx.stroke();
};
/**
 * 返回多段线长度
 *
 *
 */
gMap.prototype.getPolylineLength = function(polyPtArr) {
	var len = polyPtArr.length;
	var totalDis = 0;
	for (var j = 0; j < (len - 1); j++) {
		var mdis = Math.sqrt((polyPtArr[j].wx - polyPtArr[j + 1].wx) * (polyPtArr[j].wx - polyPtArr[j + 1].wx) + (polyPtArr[j].wy - polyPtArr[j + 1].wy) * (polyPtArr[j].wy - polyPtArr[j + 1].wy));
		totalDis = totalDis + mdis;
	}
	return totalDis;
};
/**
 * 重设模糊效果底图位置
 */
function setBgMapPos() {
	//console.log(gSelf.bgFinish);
	if (gSelf.loadBCount > 10) {
		return;
	}
	if (!gSelf.bgFinish) {
		gSelf.loadBCount = gSelf.loadBCount + 1;
		bgTimer = setTimeout(setBgMapPos, 300);
	} else {
		gSelf.baseBgMap.style.left = gSelf.baseMap.style.left;
		gSelf.baseBgMap.style.top = gSelf.baseMap.style.top;
		gSelf.hideMap('bgMap');
		clearTimeout(bgTimer);
	}
}

/**
 * 开始缩放
 */
function startZoomMap(times) {
	zitv = setInterval(zoomMap, 1000 / times);
};

/**
 * 开始平移
 */
function startPanMap(times) {
	pitv = setInterval(doPanMap, 1000 / times);
}

/**
 * 停止缩放
 */
function stopZoomMap() {
	zitv = window.clearInterval(zitv);
}

/**
 * 停止平移
 */
function stopPanMap() {
	pitv = window.clearInterval(pitv);
}

/**
 * 缩放操作
 */
function zoomMap() {
	var p = Math.random();
	if (gSelf.showDyn) {
		if (mapParams.zoom <= 1000) {
			mapParams.zoom = mapParams.zoom * 2;
		} else if (mapParams.zoom >= 64000) {
			mapParams.zoom = mapParams.zoom / 2;
		} else {
			if (p > 0.7) {
				mapParams.zoom = mapParams.zoom * 2;
			} else {
				mapParams.zoom = mapParams.zoom / 2;
			}
		}
		mapParams.mt = "zoomto";
		clearCanvas(gSelf.dynMap);
		mapParams.stamp = new Date().getTime();
		gSelf.requestMap(mapParams);
	}
	if (gSelf.showTile) {
		if (gSelf.zoomLevel < 7 && gSelf.zoomLevel > 1) {
			if (p > 0.7) {
				gSelf.zoomLevel++;
				gSelf.maptool = "zoomout";
			} else {
				gSelf.zoomLevel--;
				gSelf.maptool = "zoomin";
			}
		}
		if (gSelf.zoomLevel == 1) {
			gSelf.zoomLevel++;
			gSelf.maptool = "zoomout";
		}
		if (gSelf.zoomLevel == 7) {
			gSelf.zoomLevel--;
			gSelf.maptool = "zoomin";
		}
		tileParams.zl = gSelf.zoomLevel;
		gSelf.requestTileMap(tileParams);
	}
}

/**
 * 平移操作
 */
function doPanMap() {
	if (gSelf.cx >= 30000 && gSelf.cy < -30000) {
		gSelf.cx = gSelf.cx - 1000;
		gSelf.cy = gSelf.cy + 1000;
	} else if (gSelf.cx < -20000 && gSelf.cy > 20000) {
		gSelf.cx = gSelf.cx + 1000;
		gSelf.cy = gSelf.cy - 1000;
	} else {
		var p = Math.random();
		if (p > 0.5) {
			gSelf.cx = gSelf.cx + 1000;
			gSelf.cy = gSelf.cy - 1000;
		} else {
			gSelf.cx = gSelf.cx - 1000;
			gSelf.cy = gSelf.cy + 1000;
		}
	}

	mapParams.cx = tileParams.cx = gSelf.cx;
	mapParams.cy = tileParams.cy = gSelf.cy;
	mapParams.mt = "zoomto";
	if (gSelf.showTile) {
		gSelf.ifZoomTo = true;
		gSelf.requestTileMap(tileParams);
		gSelf.ifZoomTo = false;
	}
	if (gSelf.showDyn) {
		clearCanvas(gSelf.dynMap);
		mapParams.stamp = new Date().getTime();
		gSelf.requestMap(mapParams);
	}
}

/**
 * 响应鼠标按下事件
 */
function mapMouseDownEvt(evt) {
	gSelf.mouseStartTime = +new Date();
	EventUtil.preventDefault(evt);
    EventUtil.stopPropagation(evt);
    
	
	if (gSelf.curType == "map") {
		var mouseXY;
		var screenXY;
		if (evt.type == 'touchstart' && evt.touches.length == 2) {
			var tp1 = getTouchPt(evt.touches[0]);
			var tp2 = getTouchPt(evt.touches[1]);
			gSelf.pinching = true;
			gSelf.pinchPt1 = tp1;
			gSelf.pinchPt2 = tp2;
			gSelf.startDis = p1ToP2Dis(tp1, tp2);

		} else {
			if (evt.type == 'touchstart') {
				mouseXY = getTouchXY(evt);
				screenXY=getTouchPosXY(evt);
			} else {
				mouseXY = getMouseXY(gSelf.container, evt);
                screenXY=getMousePos(evt);
			}
			if (gSelf.maptool == "zoomto") {
				gSelf.dragging = true;
			}
			gSelf.startX = mouseXY.x;
			gSelf.startY = mouseXY.y;
			gSelf.startScrX = screenXY.x;
			gSelf.startScrY = screenXY.y;
			gSelf.startLeft = delpx(gSelf.baseMap.style.left);
			gSelf.startTop = delpx(gSelf.baseMap.style.top);

			/******量算函数**************/
			calLenAre_MouseDown();
		}
	} else {
		gSelf.mouseDown_other(evt);
	}
}

/**
 * 响应鼠标拖曳事件
 */
function mapMouseMoveEvt(evt) {
	//evt.preventDefault();
	if(gSelf.dragging){
		gSelf.moving = true;
	}
	EventUtil.preventDefault(evt);
    EventUtil.stopPropagation(evt);
	if (gSelf.curType == "map") {
		var mouseXY;
		var screenXY;
		if (evt.type == 'touchmove' && evt.touches.length == 2) {
			var tp1 = getTouchPt(evt.touches[0]);
			var tp2 = getTouchPt(evt.touches[1]);
			gSelf.pinchPt1 = tp1;
			gSelf.pinchPt2 = tp2;
			gSelf.endDis = p1ToP2Dis(tp1, tp2);
			var factor = gSelf.endDis / gSelf.startDis;
			//gSelf.pinchMap(factor);
		} else {
			if (evt.type == 'touchmove') {
				mouseXY = getTouchXY(evt);
				screenXY=getTouchPosXY(evt);
				gSelf.endScrX=screenXY.x;
                gSelf.endScrY=screenXY.y;
			} else {
				mouseXY = getMouseXY(gSelf.container, evt);
				screenXY=getMousePos(evt);
			}
			var mapimg = gSelf.mapImg;
			var mx = screenXY.x;
			var my = screenXY.y;	
			gSelf.middleX = mouseXY.x;
			gSelf.middleY = mouseXY.y;
			var dltx = mx - gSelf.startScrX;
			var dlty = my - gSelf.startScrY;

			if (gSelf.maptool == "zoomto" && gSelf.dragging) {
				if (gSelf.showTile) {
					gSelf.baseMap.style.left = gSelf.startLeft + dltx + 'px';
					gSelf.baseMap.style.top = gSelf.startTop + dlty + 'px';
				}
				if (gSelf.showDyn) {
					clearCanvas(gSelf.dynMap);
					gSelf.dynCtx.drawImage(mapimg, dltx, dlty, gSelf.width, gSelf.height);
				}
				gSelf.pointCanvas.style.left = dltx + 'px';
				gSelf.pointCanvas.style.top = dlty + 'px';
				gSelf.lineCanvas.style.left = dltx + 'px';
				gSelf.lineCanvas.style.top = dlty + 'px';
				gSelf.polygonCanvas.style.left = dltx + 'px';
				gSelf.polygonCanvas.style.top = dlty + 'px';
				gSelf.markerDiv.style.left = dltx + 'px';
				gSelf.markerDiv.style.top = dlty + 'px';
				if (gSelf.otherMapDiv){
				  gSelf.otherMapDiv.style.left = dltx + 'px';
				  gSelf.otherMapDiv.style.top = dlty + 'px';
				}
				//gSelf.markerDiv.innerHTML = "";
			}
			/*****量算mouseMove******/
			calLenAre_MouseMove();
		}
	} else {
		gSelf.mouseMove_other(evt);
	}
}

/**
 * 响应鼠标弹起事件
 */
function mapMouseUpEvt(evt) {
	EventUtil.preventDefault(evt);
    EventUtil.stopPropagation(evt);
	if (gSelf.curType == "map") {
		gSelf.mouseStopTime=+new Date();
		var mouseMeanTime=gSelf.mouseStopTime-gSelf.mouseStartTime;
		clearTimeout(tileTimer);
		var mouseXY;
		var screenXY;
		if (evt.type == 'touchend' && gSelf.pinching) {

			var factor = gSelf.endDis / gSelf.startDis;
			var nx = (gSelf.pinchPt1.x + gSelf.pinchPt2.x) / 2;
			var ny = (gSelf.pinchPt1.y + gSelf.pinchPt2.y) / 2;
			var nwxy = screenToWorld(nx, ny);
			//console.log(tileParams.cx, tileParams.cy);
			tileParams.cx = nwxy.x;
			tileParams.cy = nwxy.y;

			if (factor > 1) {
				factor = Math.round(factor);
				gSelf.zoomLevel -= 1;
				if (gSelf.zoomLevel < 1) {
					gSelf.zoomLevel = 1;
				}
				tileParams.zl = gSelf.zoomLevel;
				//gSelf.requestTileMap(tileParams);
			} else {
				factor = Math.round(1 / factor);
				gSelf.zoomLevel += 1;
				if (gSelf.zoomLevel > 7) {
					gSelf.zoomLevel = 7;
				}
				tileParams.zl = gSelf.zoomLevel;
			}
			gSelf.pinching = false;
			gSelf.pinchP1End = true;

		} else {
			if (evt.type == 'touchend' && !gSelf.pinching) {
				mouseXY = getTouchXY(evt);
			} else {
				mouseXY = getMouseXY(gSelf.container, evt);
				screenXY=getMousePos(evt);
				gSelf.endScrX=screenXY.x;
                gSelf.endScrY=screenXY.y;
			}
			gSelf.endX = mouseXY.x;
			gSelf.endY = mouseXY.y;
			if (gSelf.maptool == "zoomto") {
							if(!gSelf.moving && !gSelf.pinchP1End ){gSelf.dragging = false;
		gSelf.moving = false;return;}
				var dltx = gSelf.endScrX - gSelf.startScrX;
				var dlty = gSelf.endScrY - gSelf.startScrY;
				if (Math.abs(dltx) > 0 || Math.abs(dlty) > 0) {

                /*if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
                	//移动端访问

                }else{*/
				  var mouseV=Math.sqrt(dltx*dltx+dlty*dlty)/(mouseMeanTime);//鼠标离开时的瞬时速度
				  var stopT=mouseV/0.2//摩擦系数为0.2 速度为0所需时间
				  var inertiaLength=mouseV*stopT;//惯性滑动的距离
				  var inertiaX=inertiaLength*dltx*20/Math.sqrt(dltx*dltx+dlty*dlty);
				  var inertiaY=inertiaLength*dlty*20/Math.sqrt(dltx*dltx+dlty*dlty);
				   var q=1;
				  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
                	//移动端访问
                     q=21;//直接跳出循环
                  }
				 
				  var u=setInterval(function(){
					  gSelf.baseMap.style.left = gSelf.startLeft + dltx+inertiaX*q*0.05 + 'px';
					  gSelf.baseMap.style.top = gSelf.startTop + dlty +inertiaY*q*0.05+ 'px';
					  gSelf.pointCanvas.style.left = dltx +inertiaX*q*0.05+ 'px';
					  gSelf.pointCanvas.style.top = dlty +inertiaY*q*0.05+ 'px';
					  gSelf.lineCanvas.style.left = dltx +inertiaX*q*0.05+ 'px';
					  gSelf.lineCanvas.style.top = dlty +inertiaY*q*0.05+ 'px';
					  gSelf.polygonCanvas.style.left = dltx +inertiaX*q*0.05+ 'px';
					  gSelf.polygonCanvas.style.top = dlty+inertiaY*q*0.05 + 'px';
					  gSelf.markerDiv.style.left = dltx +inertiaX*q*0.05+ 'px';
				      gSelf.markerDiv.style.top = dlty+inertiaY*q*0.05 + 'px';
					  if (gSelf.otherMapDiv){
				        gSelf.otherMapDiv.style.left = dltx +inertiaX*q*0.05+ 'px';
				        gSelf.otherMapDiv.style.top =  dlty+inertiaY*q*0.05 + 'px';
				      }
					  var mapimg = gSelf.mapImg;
					  clearCanvas(gSelf.dynMap);
					  gSelf.dynCtx.drawImage(mapimg, dltx+inertiaX*q*0.05, dlty+inertiaY*q*0.05, gSelf.width, gSelf.height);
					  q++;
					  if(q>20){
					  	    clearInterval(u);
					  	    gSelf.baseBgMap.style.left = gSelf.baseMap.style.left;
							gSelf.baseBgMap.style.top = gSelf.baseMap.style.top;
					  	    gSelf.xOffset = gSelf.xOffset + dltx+inertiaX;
							gSelf.yOffset = gSelf.yOffset + dlty+inertiaY;

							var nscx = gSelf.scx - dltx-inertiaX;
							var nscy = gSelf.scy - dlty-inertiaY;

							var wxy = screenToWorld(nscx, nscy);

							tileParams.cx = mapParams.cx = wxy.x;
							tileParams.cy = mapParams.cy = wxy.y;

							if (gSelf.showTile) {
								if (gSelf.pinchP1End) {
									gSelf.maptool = "zoomin";
									gSelf.requestTileMap(tileParams);
									gSelf.pinchP1End = false;
									
								} else{
									gSelf.panMap();
								}
							}
							if (gSelf.showDyn) {
								mapParams.stamp = new Date().getTime();
								gSelf.requestMap(mapParams);
							}
							if(gSelf.maptool == "zoomin"){
							  gSelf.showScaleOnMap(); //显示比例尺
							}
							gSelf.maptool = "zoomto";
							clearCanvas(gSelf.polygonCanvas);
							gSelf.pointCanvas.style.left = '0px';
							gSelf.pointCanvas.style.top = '0px';
							gSelf.lineCanvas.style.left = '0px';
							gSelf.lineCanvas.style.top = '0px';
							gSelf.polygonCanvas.style.left = '0px';
							gSelf.polygonCanvas.style.top = '0px';
							gSelf.markerDiv.style.left = '0px';
				            gSelf.markerDiv.style.top ='0px';
							if (gSelf.otherMapDiv){
							  //首先请求第三方地图
							  var lnglat=shToLngLat(gSelf.cx,gSelf.cy);
	                          var tmplng=lnglat.lng;
	                          var tmplat=lnglat.lat;
							  var tmpzl=gSelf.zoomLevel;
							  gSelf.zoomWithBaseMap(tmplng, tmplat, tmpzl);
				              gSelf.otherMapDiv.style.left = '0px';
				              gSelf.otherMapDiv.style.top = '0px';
				            }
							gSelf.drawFeatures(); //接口空函数，二次开发者自由拓展功能。重绘功能
					  }
			    },15);				
              }
			}
		}
		gSelf.dragging = false;
		gSelf.moving = false;
		gSelf.qryPolyInfo(); //接口空函数，二次开发者自由拓展功能
	} else { //执行多边形绘制操作，待拓展
		gSelf.mouseUp_other(evt);
	}
}
/**
 * 浏览模式响应鼠标双击事件
 * @param  {Object} e  鼠标事件
 */
function mapMouseDblClickEvt(evt) {
	//EventUtil.preventDefault(evt);
    EventUtil.stopPropagation(evt);
	if (gSelf.curType == "map") {
		var returnBool = calLenAre_MouseDblClick();
	} else {
		gSelf.mouseDbl_other(evt);
	}
}
/**
 * 响应鼠标滚轮事件
 */
function MouseWheelHandler(e) {
	var e = window.event || e;
	if (gSelf.curType == "map") {
		//EventUtil.preventDefault(evt);
        EventUtil.stopPropagation(e);
		//判断滚轮向前还是向后
		//var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		var delta = e.wheelDelta || -e.detail;
		//console.log(delta);
		var nowStamp = new Date().getTime();
		var stampDis = nowStamp - gSelf.zoomStamp;
		if (stampDis > 800) {
			if (gSelf.zoomLevel > 7 || gSelf.zoomLevel < 1) {
				return;
			}
			if (delta > 0) {
				if (gSelf.zoomLevel > 1) {
					gSelf.zoomIn();
                   
				}
			} else {
				if (gSelf.zoomLevel < 7) {
					gSelf.zoomOut();
				}
			}

			gSelf.zoomStamp = nowStamp;
		}
		return false;
	}
}


/**
 * 移除'px'
 */
function delpx(value) {
	if (value == "") return 0;
	return parseInt(value.substring(0, value.length - 2));
}

/**
 * 地理坐标转屏幕坐标
 */
function worldToScreen(wx, wy) {
	var wcx = mapParams.cx;
	var wcy = mapParams.cy;
	var scx = parseInt(gSelf.width) / 2;
	var scy = parseInt(gSelf.height) / 2;
	var scale = mapParams.zoom / parseInt(gSelf.width);
	var sx = scx + (wx - wcx) / scale + 0.5;
	var sy = scy - (wy - wcy) / scale + 0.5;
	return {
		x: sx,
		y: sy
	};
}

/**
 * 屏幕坐标转地理坐标
 */
function screenToWorld(sx, sy) {
	var wcx = mapParams.cx;
	var wcy = mapParams.cy;
	var scx = parseInt(gSelf.width) / 2;
	var scy = parseInt(gSelf.height) / 2;
	var scale = mapParams.zoom / parseInt(gSelf.width);
	var wx = wcx + (sx - scx) * scale;
	var wy = wcy - (sy - scy) * scale;
	return {
		x: wx,
		y: wy
	};
}

/**
 * 获取zoom值
 */
gMap.prototype.getZoom = function() {
	return {
		"cx": mapParams.cx,
		"cy": mapParams.cy,
		"zoom": mapParams.zoom
	};
};
function getMousePos(event) {
    var e = event || window.event;
    return {'x':e.screenX,'y':e.screenY}
}
/**
 * 获取鼠标位置
 */
function getMouseXY(element, e) {
	var x=0, y=0;
	/*x = e.layerX;
	y = e.layerY;*/
	if(document.all != 'undefined'){
        var obj = e.srcElement?e.srcElement:e.target; //获取事件源
    　　while(obj && obj!=document.body){ 
    		  var btw = getEleStyle(obj,'border-top-width') == 'medium' ? 0: delpx(getEleStyle(obj,'border-top-width') ); 
    		  var blw = getEleStyle(obj,'border-left-width') == 'medium' ? 0: delpx(getEleStyle(obj,'border-left-width') );
   			  x += obj.offsetLeft + blw;
    　　      y += obj.offsetTop + btw;
    　　      obj = obj.offsetParent;
    　　}
    　　x = e.clientX - x;
    　　y = e.clientY - y;
    }else{
    	var btw = getEleStyle(obj,'border-top-width') == 'medium' ? 0: delpx(getEleStyle(obj,'border-top-width') ); 
        var blw = getEleStyle(obj,'border-left-width') == 'medium' ? 0: delpx(getEleStyle(obj,'border-left-width') );
    	x = e.layerX - blw;
		y = e.layerY - btw;
    }
	return {
		x: x,
		y: y
	};
}
function getTouchPosXY(event) {
	var touchxy={'x':0,'y':0};
	try{	
      touchxy.x=event.touches[0].screenX;
      touchxy.y=event.touches[0].screenY;
    }catch (e){
	   alert(e.toString());
    }
    return touchxy;
}
/**
 * 获取触摸点位置
 */
function getTouchXY(evt) {
	for (var i = 0; i < evt.targetTouches.length; i++) {
		var touch = evt.targetTouches[i];
		ox = touch.pageX;
		oy = touch.pageY;
	}
	//console.log(ox,oy);
	x = ox - gSelf.mapLeft;
	y = oy - gSelf.mapTop;
	return {
		x: x,
		y: y
	};
}

function getTouchPt(touch) {
	var x = touch.pageX - gSelf.mapLeft;
	var y = touch.pageY - gSelf.mapTop;
	return {
		x: x,
		y: y
	};
}

/**
 * 清除画布
 */
function clearCanvas(cv) {
	cv.getContext("2d").clearRect(0, 0, gSelf.width, gSelf.height);
}

/**
 * 判断桌面设备是否支持触摸操作
 */
function isDeviceMobile() {
	if (navigator.userAgent.indexOf('Android') != -1 || navigator.userAgent.indexOf('iPad') != -1 ) {
		isMobile = true;
	} else {
		isMobile = false;
	}
}

function p1ToP2Dis(p1, p2) {
	var dx = parseInt(p1.x - p2.x);
	var dy = parseInt(p1.y - p2.y);
	var dis = parseInt(Math.sqrt(dx * dx + dy * dy));
	return dis;
}

function calLenAre_MouseDown() {
	/****进行量算****/
	if (gSelf.maptool == "rulerLength") {
		var worldXY = screenToWorld(gSelf.startX, gSelf.startY);
		var measurepoint = {
			wx: worldXY.x,
			wy: worldXY.y,
			sx: gSelf.startX,
			sy: gSelf.startY
		};
		gSelf.lengthPtArr.push(measurepoint);
		if (gSelf.lengthPtArr.length > 1) {
			drawCalPolyline(gSelf.overlayCtx, gSelf.lengthPtArr);
		}
	} else if (gSelf.maptool == "rulerArea") {
		var worldXY = screenToWorld(gSelf.startX, gSelf.startY);
		var measurepoint = {
			wx: worldXY.x,
			wy: worldXY.y,
			sx: gSelf.startX,
			sy: gSelf.startY
		};
		gSelf.areaPtArr.push(measurepoint);
		if (gSelf.areaPtArr.length > 1) {
			drawCalPolyline(gSelf.overlayCtx, gSelf.areaPtArr);
		}
	} else {
		clearCanvas(gSelf.overlayCanvas);
	}
	/*********量算************/
}

function calLenAre_MouseMove() {
	if (gSelf.maptool == "rulerLength") {
		if (gSelf.lengthPtArr.length > 0) {
			clearCanvas(gSelf.overlayCanvas);
			gSelf.drawLine(gSelf.overlayCtx, gSelf.lengthPtArr[gSelf.lengthPtArr.length - 1].sx, gSelf.lengthPtArr[gSelf.lengthPtArr.length - 1].sy, gSelf.middleX, gSelf.middleY);
			drawCalPolyline(gSelf.overlayCtx, gSelf.lengthPtArr);
			if (gSelf.lengthPtArr.length == 1) {
				var currDis = 0; //当前距离
				var worldXY = screenToWorld(gSelf.middleX, gSelf.middleY);
				currDis = Math.sqrt((worldXY.x - gSelf.lengthPtArr[0].wx) * (worldXY.x - gSelf.lengthPtArr[0].wx) + (worldXY.y - gSelf.lengthPtArr[0].wy) * (worldXY.y - gSelf.lengthPtArr[0].wy));
				var msgText = "当前距离：" + Math.round(currDis) + "米" + ";" + "总距离：" + Math.round(currDis) + "米";
				gSelf.overlayCtx.font = 'bold 15px 幼圆';
				gSelf.overlayCtx.fillText(msgText, gSelf.middleX, gSelf.middleY)
			} else {
				var currDis = 0; //当前距离
				var totalDis = 0; //总距离
				//当前距离
				var i = (gSelf.lengthPtArr.length - 1);
				var currDis = ""; //当前距离
				var worldXY = screenToWorld(gSelf.middleX, gSelf.middleY);
				currDis = Math.sqrt((worldXY.x - gSelf.lengthPtArr[i].wx) * (worldXY.x - gSelf.lengthPtArr[i].wx) + (worldXY.y - gSelf.lengthPtArr[i].wy) * (worldXY.y - gSelf.lengthPtArr[i].wy));
				//总距离
				totalDis = gSelf.getPolylineLength(gSelf.lengthPtArr);
				totalDis = totalDis + currDis;
				var msgText = "当前距离：" + Math.round(currDis) + "米" + ";" + "总距离:" + Math.round(totalDis) + "米";
				gSelf.overlayCtx.font = 'bold 15px 幼圆';
				gSelf.overlayCtx.fillText(msgText, gSelf.middleX, gSelf.middleY);
			}
		}
	}
	if (gSelf.maptool == "rulerArea") {
		if (gSelf.areaPtArr.length > 0) {
			clearCanvas(gSelf.overlayCanvas);
			var maxi = gSelf.areaPtArr.length - 1;
			gSelf.drawLine(gSelf.overlayCtx, gSelf.areaPtArr[maxi].sx, gSelf.areaPtArr[maxi].sy, gSelf.middleX, gSelf.middleY);
			if (gSelf.areaPtArr.length > 1) {
				drawCalPolyline(gSelf.overlayCtx, gSelf.areaPtArr);
				gSelf.drawLine(gSelf.overlayCtx, gSelf.areaPtArr[0].sx, gSelf.areaPtArr[0].sy, gSelf.middleX, gSelf.middleY);
				//计算周长
				var perimeter = 0;
				var totalDis = gSelf.getPolylineLength(gSelf.areaPtArr);
				var worldXY = screenToWorld(gSelf.middleX, gSelf.middleY);
				//var dis1 = gSelf.getLineLength(gSelf.areaPtArr[maxi].wx, gSelf.areaPtArr[maxi].wy, worldXY.x, worldXY.y);
				//var dis2 = gSelf.getLineLength(gSelf.areaPtArr[0].wx, gSelf.areaPtArr[0].wy, worldXY.x, worldXY.y);
				var dis1 = Math.sqrt((worldXY.x - gSelf.areaPtArr[maxi].wx) * (worldXY.x - gSelf.areaPtArr[maxi].wx) + (worldXY.y - gSelf.areaPtArr[maxi].wy) * (worldXY.y - gSelf.areaPtArr[maxi].wy));
				var dis2 = Math.sqrt((worldXY.x - gSelf.areaPtArr[0].wx) * (worldXY.x - gSelf.areaPtArr[0].wx) + (worldXY.y - gSelf.areaPtArr[0].wy) * (worldXY.y - gSelf.areaPtArr[0].wy));
				perimeter = totalDis + dis1 + dis2;
				//计算面积
				var temgareaPtArr;
				temgareaPtArr = gSelf.areaPtArr.concat();
				var temmouseXY = {
					wx: worldXY.x,
					wy: worldXY.y,
					sx: gSelf.middleX,
					sy: gSelf.middleY
				};
				temgareaPtArr.push(temmouseXY);
				//计算面积
				var area = gSelf.calcAreaMap(temgareaPtArr);
				var msgText = "周长：" + Math.round(perimeter) + "米" + "面积：" + area + "平方米";
				gSelf.overlayCtx.font = 'bold 15px 幼圆';
				gSelf.overlayCtx.fillText(msgText, gSelf.middleX, gSelf.middleY);
			}
		}
	}
}

function calLenAre_MouseDblClick() {
	var returnLenArea = "";
	if (gSelf.maptool == "rulerLength") {
		gSelf.lengthPtArr.pop();
		var totalDis = gSelf.getPolylineLength(gSelf.lengthPtArr);
		//执行重绘
		clearCanvas(gSelf.overlayCanvas);
		drawCalPolyline(gSelf.overlayCtx, gSelf.lengthPtArr);
		//gSelf.maptool = "zoomto";
		var endx=gSelf.lengthPtArr[gSelf.lengthPtArr.length-1].sx;
		var endy=gSelf.lengthPtArr[gSelf.lengthPtArr.length-1].sy;
		gSelf.lengthPtArr = [];
		returnLenArea = "总距离：" + Math.round(totalDis)+"米";
		gSelf.overlayCtx.font = 'bold 15px 幼圆';
		gSelf.overlayCtx.fillText(returnLenArea,endx,endy);
	} else if (gSelf.maptool == "rulerArea") {
		gSelf.areaPtArr.pop();
		if (gSelf.areaPtArr.length < 3) {
			alert("绘制节点至少三个！");
			return returnLenArea;
		}
		var totalDis = gSelf.getPolylineLength(gSelf.areaPtArr);
		//计算起始点和终止点的距离
		var perimeter = 0;
		var max = gSelf.areaPtArr.length - 1;
		//var dis = gSelf.getLineLength(gSelf.areaPtArr[max].wx, gSelf.areaPtArr[max].wy, gSelf.areaPtArr[0].wx, gSelf.areaPtArr[0].wy);
		var dis = Math.sqrt((gSelf.areaPtArr[max].wx - gSelf.areaPtArr[0].wx) * (gSelf.areaPtArr[max].wx - gSelf.areaPtArr[0].wx) + (gSelf.areaPtArr[max].wy - gSelf.areaPtArr[0].wy) * (gSelf.areaPtArr[max].wy - gSelf.areaPtArr[0].wy));
		perimeter = totalDis + dis;
		//计算面积
		var area = gSelf.calcAreaMap(gSelf.areaPtArr);
		//执行重绘
		clearCanvas(gSelf.overlayCanvas);
		drawCalPolyline(gSelf.overlayCtx, gSelf.areaPtArr);
		gSelf.drawLine(gSelf.overlayCtx, gSelf.areaPtArr[0].sx, gSelf.areaPtArr[0].sy, gSelf.areaPtArr[max].sx, gSelf.areaPtArr[max].sy);
		//gSelf.maptool = "zoomto";
		var endx=gSelf.areaPtArr[gSelf.areaPtArr.length-1].sx;
		var endy=gSelf.areaPtArr[gSelf.areaPtArr.length-1].sy;
		gSelf.areaPtArr = [];
		returnLenArea = "周长：" + Math.round(perimeter) + "米" + "；" + "面积：" + Math.round(area) + "平方米";
		gSelf.overlayCtx.font = 'bold 15px 幼圆';
		gSelf.overlayCtx.fillText(returnLenArea,endx,endy);
	}
	return returnLenArea;
}

function drawCalPolyline(ctx, polyPtArr) {
	var len = polyPtArr.length;
	if (len > 1) {
		ctx.beginPath();
		ctx.fillStyle = "#FFE153";
		ctx.strokeStyle = "#FFE153";
		ctx.lineWidth = 2;
		ctx.moveTo(polyPtArr[0].sx, polyPtArr[0].sy); //设置起点
		for (var i = 0; i < len; i++) {
			ctx.lineTo(polyPtArr[i].sx, polyPtArr[i].sy);
		}
		ctx.stroke();
	}
}
/**
 * 面积计算
 */
gMap.prototype.calcAreaMap = function(PtArr) {
	var ta = 0;
	var ax = PtArr;
	for (var i = 0; i < ax.length; i++) {
		ta = ta + (ax[i].wx * ax[(i + 1) % ax.length].wy - ax[(i + 1) % ax.length].wx * ax[i].wy);
	}
	var meter2 = parseInt(Math.abs(0.5 * ta));
	return meter2;

};
/**
 *显示比例尺
 */
gMap.prototype.showScaleOnMap = function() {
  var ctx = this.infoCtx;
  var height  = this.container.clientHeight;
  
  var showscale=this.showScale(ctx,height);
  var multiple=showscale.m; 
  var width=100*multiple;
  var widthHalf=Math.round(width/2);
   
  //ctx.clearRect(28,height - 36,1000,15);
  ctx.beginPath();
  //ctx.strokeStyle = "#F5F5F5";
  //ctx.linewidth = 5;
  ctx.strokeStyle = "#FFF";
  ctx.fillStyle = "#FFF";  
  ctx.linewidth = 1;  
  ctx.moveTo(26,height - 33);//设置起点
  ctx.lineTo(26,height - 30);
  ctx.lineTo(width+26,height - 30);
  ctx.lineTo(width+26,height - 33);
  ctx.closePath();
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(27,height - 30);
  ctx.lineTo(27,height - 24);
  ctx.closePath();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(width+25,height - 30);
  ctx.lineTo(width+25,height - 24);
  ctx.closePath();
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(widthHalf+25,height - 30);
  ctx.lineTo(widthHalf+25,height - 24);
  ctx.closePath();
  ctx.stroke();
};
/**
 * 比例尺数字&文字设置
 * @param  {Object} ctx  Canvas上下文
 */
gMap.prototype.showScale = function(ctx, height) {
 var scale = mapParams.zoom / parseInt(gSelf.width);
  var scaleInt=(100*scale/1000).toPrecision(3);
  var result=this.getScaWidth(scaleInt);
  var kmscale = result.kmScale;
  var halfkmscale=result.halfkmscale;
  
  var multiple=result.m; 
  var width=100*multiple;
  var widthHalf=Math.round(width/2);
  
  ctx.clearRect(0,0,200,height);
  ctx.font = '14px serif';
  ctx.fillStyle = '#F5F5F5';
  if(EventUtil.getIEversion()==0){
  ctx.fillText('0', 25, height - 10);//IE不支持
  ctx.fillText(halfkmscale, widthHalf+22, height - 10);
  ctx.fillText(kmscale, width+15, height - 10); 
  }
    
  return result;
};
/**
 * 动态比例尺 数字检测
 */
gMap.prototype.getScaWidth = function(s) {
  var result={};
  if(s>=0.5 && s<=15){
    var scale=Math.round(s);
    switch(scale){
      case 1:
        result.m = (s/1).toPrecision(2);
        result.kmScale ="1公里";
		result.halfkmscale ="0.5";
        break;  
      case 2:
        result.m = (s/2).toPrecision(2);
        result.kmScale ="2公里";
		result.halfkmscale ="1";
        break;
      case 3:
        result.m = (s/3).toPrecision(2);
        result.kmScale ="3公里";
		result.halfkmscale ="1.5";
        break;
      case 4:
        result.m = (s/4).toPrecision(2);
        result.kmScale ="4公里";
		result.halfkmscale ="2";
        break;
      case 5:
        result.m = (s/5).toPrecision(2);
        result.kmScale ="5公里";
		result.halfkmscale ="2.5";
        break;
      case 6:
        result.m = (s/6).toPrecision(2);
        result.kmScale ="6公里";
		result.halfkmscale ="3";
        break;  
    }
  }else if(s<1){
    s=s*1000;
    if(s<500 && s>200){
		result.m = (s/500).toPrecision(2);
		result.kmScale ="500米"; 
		result.halfkmscale ="250";
    }else if(s<=200 && s>100){
		result.m = (s/200).toPrecision(2);
		result.kmScale ="200米"; 
		result.halfkmscale ="100";
    }else if(s<=100 && s>50){
		result.m = (s/100).toPrecision(2);
		result.kmScale ="100米"; 
		result.halfkmscale ="50";
    }else{
		result.m = 1;
		result.kmScale =s/1000+"公里";  
		result.halfkmscale ="s/2000";
    }
  }
  return result;
};
/**
 * mouseDown函数，供二次开发者使用拓展(误删，极其重要)
 */
gMap.prototype.mouseDown_other = function(evt) {

}
/**
 * mousemove函数，供二次开发者使用拓展(误删，极其重要)
 */
gMap.prototype.mouseMove_other = function(evt) {

}
/**
 * mouseup函数，供二次开发者使用拓展(误删，极其重要)
 */
gMap.prototype.mouseUp_other = function(evt) {

}
/**
 * mousedblclick函数，供二次开发者使用拓展(误删，极其重要)
 */
gMap.prototype.mouseDbl_other = function(evt) {

}
/**
 * 重绘要素(勿删，极其重要)
 */
gMap.prototype.drawFeatures = function() {

}
/**
 * 多边形信息查询(勿删，极其重要)
 */
gMap.prototype.qryPolyInfo = function() {

}


/**
 * 添加第三方地图
 * @param {String} type  地图类型
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {Number} zl 缩放级数
 */
gMap.prototype.addOtherMap = function (type, x,y, zl) {
	if (this.otherMapDiv){
	  this.otherMapDiv.parentNode.removeChild(this.otherMapDiv);
	  this.otherMapDiv=null;
	}
	this.otherMapDiv = this.baseMapDiv.cloneNode();
	this.otherMapDiv.id = "otherMapDiv";
	this.otherMapDiv.style.zIndex = 5;
	this.otherMapDiv.style.opacity = this.otherMapOpacity;
	this.container.appendChild(this.otherMapDiv);
	switch (type) {
	case 'google':
		this.addGoogleMap(x, y, zl);
		break;
	case 'baidu':
		this.addBaiduMap(x, y, zl);
		break;
	}
};
gMap.prototype.closeOtherMap = function (){
  if (this.otherMapDiv){
	  this.otherMapDiv.parentNode.removeChild(this.otherMapDiv);
	  this.otherMapDiv=null;
	}
}
function hideOtherMap() {
	/* if(gSelf.otherMap!=null){
     gSelf.otherMap = null;
     gSelf.container.removeChild(gSelf.otherMapDiv);
     }*/
	gSelf.otherMapDiv.style.display = "none";
}

function showOtherMap() {
	gSelf.otherMapDiv.style.display = "block";
}

/**
 * 添加Google地图
 * @param  {Number} lng 经度
 * @param  {Number} lat 纬度
 * @param  {Number} zl  缩放级数
 */
gMap.prototype.addGoogleMap = function (x, y, zl) {
	var lnglat=shToLngLat(x,y);
	var lng=lnglat.lng;
	var lat=lnglat.lat;
	var mapOptions = {
		center: new google.maps.LatLng(lat, lng),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false, //停用右上角地图类型切换选项卡
		/*mapTypeControlOptions:
        {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            poistion: google.maps.ControlPosition.TOP_RIGHT,
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 
              google.maps.MapTypeId.TERRAIN, 
              google.maps.MapTypeId.HYBRID, 
              google.maps.MapTypeId.SATELLITE]
        },*/
		panControl: false, //停用平移控件
		zoomControl: false, //停用缩放控件
		scaleControl: false, //停用比例尺控件
		rotateControl:false,
		streetViewControl:false
	};
	mapOptions.zoom=zl;
	this.otherMap = new google.maps.Map(this.otherMapDiv,mapOptions); 
	this.otherMap.othermapType = "google";
	otherZoom.lng = lng;
	otherZoom.lat = lat;
	otherZoom.zl = zl;
};

/**
 * 添加百度地图
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {Number} zl 缩放级数
 */
gMap.prototype.addBaiduMap = function (x, y, zl) {
	var lnglat=shToLngLat(x,y);	
	var lng=lnglat.lng;
	var lat=lnglat.lat;
	var gpsPoint = new BMap.Point(lng,lat);
	this.otherMap = new BMap.Map("otherMapDiv");
	BMap.Convertor.translate(gpsPoint,0,translateCallback);
	function translateCallback(point){
        gSelf.otherMap.centerAndZoom(point, zl);    
	}
	
	this.otherMap.othermapType = "baidu";
	otherZoom.lng = lng;
	otherZoom.lat = lat;
	otherZoom.zl = zl;


	//this.zoomWithBaiduMap(lng, lat,zl);
};

/**
 * 根据第三方地图，缩放平移底图
 */
gMap.prototype.zoomWithBaiduMap = function (lng, lat,zl) {
	var bounds = this.otherMap.getBounds();
	var nw = lnglatToSh(bounds.kc, bounds.jc);
	var se = lnglatToSh(bounds.gc, bounds.fc);
	var wcxy = lnglatToSh(lng, lat);
	var zoom = se.x - nw.x;
	//console.log(wcxy.x + " "+wcxy.y+" "+zoom);
	this.zoomToXY(wcxy.x, wcxy.y, zl-7);
};

/**
 * 根据第三方地图，缩放平移底图
 */
gMap.prototype.zoomWithGoogleMap = function (lng, lat) {
	google.maps.event.addListener(this.otherMap, 'bounds_changed', function () {
		var bounds = gSelf.otherMap.getBounds();
		var ne = lnglatToSh(bounds.getNorthEast().kb, bounds.getNorthEast().jb);
		var sw = lnglatToSh(bounds.getSouthWest().kb, bounds.getSouthWest().jb);
		var wcxy = lnglatToSh(lng, lat);
		var zoom = ne.x - sw.x;
		gSelf.zoomTo(wcxy.x, wcxy.y, zoom);
	});
};

/**
 * 根据底图，缩放平移第三方地图
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {Number} zl 缩放级数
 */
gMap.prototype.zoomWithBaseMap = function (lng, lat, tmpzl) {
	var zl=0;
	var str=this.otherMap.othermapType;
	switch (tmpzl){
       case 1:
         switch (str){
          case 'baidu':
            zl=18;
          break;
          case 'google':
            zl=17;
          break;
         }   
       break;
       case 2:
        switch (str){
          case 'baidu':
            zl=17;
          break;
          case 'google':
            zl=16;
          break;
         }
       break;
       case 3:
        switch (str){
          case 'baidu':
            zl=16;
          break;
          case 'google':
            zl=15;
          break;
         }
       break;
       case 4:
        switch (str){
          case 'baidu':
            zl=15;
          break;
          case 'google':
            zl=14;
          break;
         }
       break;
       case 5:
        switch (str){
          case 'baidu':
            zl=14;
          break;
          case 'google':
            zl=13;
          break;
         }
       break;
       case 6:
        switch (str){
          case 'baidu':
            zl=13;
          break;
          case 'google':
            zl=12;
          break;
         }
       break;
       case 7:
        switch (str){
          case 'baidu':
            zl=12;
          break;
          case 'google':
            zl=11;
          break;
         }
       break;
    }
	switch (this.otherMap.othermapType) {
	case 'baidu':
	    var tmppoint=new BMap.Point(lng, lat);
	    BMap.Convertor.translate(tmppoint,0,translateCallback2);
	    function translateCallback2(point){
           gSelf.otherMap.centerAndZoom(point, zl);    
	    }
		break;
	case 'google':
		google.maps.event.clearListeners(this.otherMap, 'bounds_changed');
		this.otherMap.setCenter(new google.maps.LatLng(lat, lng));
		this.otherMap.setZoom(zl);
	}
};
/**
 * 设置第三方地图样式
 * @param {Number} lng 经度
 * @param {Number} lat 纬度
 * @param {Number} zl 缩放级数
 */
gMap.prototype.setMapType = function (str) {
 switch (this.otherMap.othermapType) {
 	case 'baidu':
 	switch (str){
 	  	case 'ROADMAP':
 	  	   this.otherMap.setMapType(BMAP_NORMAL_MAP);
 	  	break;
 	  	case 'SATELLITE':
 	  	   this.otherMap.setMapType(BMAP_SATELLITE_MAP);
 	  	break;
 	  } 
 	break;
 	case 'google':
 	  switch (str){
 	  	case 'ROADMAP':
 	  	   this.otherMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
 	  	break;
 	  	case 'SATELLITE':
 	  	   this.otherMap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
 	  	break;
 	  }
 	break;
 }
};








/****辅助方法*****/
function getEleStyle(obj,attribute){ // 返回最终样式函数，兼容IE和DOM，设置参数：元素对象、样式特性
  　　var arr = attribute.split('-');
　　       var attr = arr[0];
　　       if(attr.length>1){
　　       for(var i = 1;i<arr.length;i++){
　　          attr += arr[i].substring(0,1).toUpperCase() + arr[i].substring(1);  //除第一个单词外，其余单词首字母转为大写，并拼接起来
　　          }
　　        }else{
　　          attr = attribute;
　　}

　　return obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj,false)[attr];
}

var EventUtil={
    /**
    *添加事件绑定函数
    *跨浏览器
    */
    addHander:function(element,type,hander)
    {
       if (element.addEventListener)
       {
       	 element.addEventListener(type,hander,false);
       }else if (element.attachEvent) {
         element.attachEvent("on"+type, hander);
       }else{
        //element.setAttribute("on"+type, hander);
       	 element['on'+type]=hander;
       }
    },
    /**
    *获取事件对象
    *跨浏览器
    */
    getEvent:function(event)
    {
      return event?event:window.event;
    },
    /**
    *获取事件元素对象
    *跨浏览器
    */
    getTarget:function(event)
    {
      return event.target||event.srcElement;
    },
    /**
    *取消元素默认行为
    *跨浏览器，如<a href="" >可以通过在onclick事件中阻止href执行页面跳转的默认行为
    */
    preventDefault:function(event)
    {
      if (event.preventDefault)
        {event.preventDefault();}
      else
      { window.event.returnValue=false;}
    },
    
    /**
    *移除对象事件
    *跨浏览器
    */
    removeHander:function(element,type,hander)
    {
       if (element.removeEventListener)
       {
       	 element.removeEventListener(type,hander,false);
       }else if (element.detachEvent) {
         element.detachEvent("on"+type, hander);
       }else{
       	element['on'+type]=null;
       }
    },
    /**
    *阻止事件冒泡
    *跨浏览器
    */
    stopPropagation:function(event)
    {
       if (event.stopPropagation)
       {
        event.stopPropagation();
       }else
       {
        window.event.cancelBubble=true;
       }
    },
    /**
    *获取触发事件的键位（左键-0，中键-1，右键-2）
    *跨浏览器
    */
    getButton:function (event)
    {
      if (document.implementation.hasFeature('MouseEvents','2.0'))
      {
        return event.button;
      }
      else
      {
        switch(event.button)
        {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            return 0;
          case 2:
          case 6:
            return 2;
          case 4:
            return 1;
        }
      }
    },
    /**
    *获得字符编码
    *在返回的字符编码，可以进一步通过String.fromCharCode()，将其转换成实际的字符显示
    */
    getCharCode:function(event)
    {
      if (typeof event.charCode=="number"){
        return event.charCode;
      }
      else
      {
        return event.keyCode;
      }
    },
    getIEversion:function(){
    	var userAgent = window.navigator.userAgent.toLowerCase();
    	if(/msie 10\.0/i.test(userAgent))return 10;
    	if(/msie 9\.0/i.test(userAgent)) return 9;
    	if(/msie 8\.0/i.test(userAgent)) return 8;
    	if(/msie 7\.0/i.test(userAgent)) return 7;
    	if(/msie 6\.0/i.test(userAgent)) return 6;
    	return 0;
    }
};
/**
 * 上海坐标转经纬度坐标
 * @param  {Number} x
 * @param  {Number} y
 * @return {Object}  经纬度点对象
 */
function shToLngLat(x,y){
  var A = 95418.0172735741;
  var B = 48.3052839794785;
  var C = -11592069.1853624;
  var D = 63.9932503167748;
  var E = 110821.847990882;
  var F = -3469087.15690168;
  var lat = (D * x - A * y -(C * D - A * F)) / (B * D -A * E);
  var lng = (E * x - B * y - (C * E - B * F)) / (A * E - B * D);
  return {lat:lat, lng:lng};
}


/**
 * 经纬度转上海坐标
 * @param  {Number} lng  经度
 * @param  {Number} lat  纬度
 * @return {Object}  地理坐标点对象
 */
function lnglatToSh(lng,lat){
  var A = 95418.0172735741;
  var B = 48.3052839794785;
  var C = -11592069.1853624;
  var D = -30.5861721426051;
  var E = 110821.847990882;
  var F = -3469087.15690168;
  var x = A * lng + B * lat + C - 50;
  var y = D * lng + E * lat + F - 50;
  return {x:x+470,y:y-235};
}

/**
 * 地球坐标系 (WGS-84) 相互转火星坐标系 (GCJ-02) 的转换算法
 * 
 * @author Geo123
 * @time 2014-3-18
 * 
 */
 function gcj2wgs(lon,lat) {
 	var returnValue={lon:0,lat:0};
    var lontitude = lon- (transform(lon, lat).lon - lon);
	var latitude =  lat- (transform(lon, lat).lat - lat);	
	returnValue.lon=lontitude;
	returnValue.lat=latitude;
	return returnValue;
 }
function transform(lon,lat) {
	var pi = 3.14159265358979324;// 圆周率
	var a = 6378245.0;// WGS 长轴半径
	var ee = 0.00669342162296594323;// WGS 偏心率的平方
	var returnValue={lon:0,lat:0};
		if (outofChina(lat, lon)) {
			returnValue.lon=lon;
			returnValue.lat=lat;
			return returnValue;
		}
		var dLat = transformLat(lon - 105.0, lat - 35.0);
		var dLon = transformLon(lon - 105.0, lat - 35.0);
		var radLat = lat / 180.0 * pi;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
		var mgLat = lat + dLat;
		var mgLon = lon + dLon;
		returnValue.lon=mgLon;
		returnValue.lat=mgLat;
		return returnValue;
	}
function outofChina(lat,lon) {
		if (lon < 72.004 || lon > 137.8347)
			return true;
		if (lat < 0.8293 || lat > 55.8271)
			return true;
		return false;
	}
function transformLat(x, y) {
	    var pi = 3.14159265358979324;// 圆周率
		var ret = -100.0 + 2.0*x + 3.0 * y + 0.2 * y * y + 0.1 * x * y+ 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
		return ret;
	}
	// 84->gcj02
function transformLon(x, y) {
		var pi = 3.14159265358979324;// 圆周率
		var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1* Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x/30.0* pi)) * 2.0 / 3.0;
		return ret;
	}

//2011-7-25
(function(){        //闭包
function load_script(xyUrl, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = xyUrl;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore( script, head.firstChild );
}
function translate(point,type,callback){
    var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
    var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from="+ type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
    //动态创建script标签
    load_script(xyUrl);
    BMap.Convertor[callbackName] = function(xyResult){
        delete BMap.Convertor[callbackName];    //调用完需要删除改函数
        var point = new BMap.Point(xyResult.x, xyResult.y);
        callback && callback(point);
    }
}

window.BMap = window.BMap || {};
BMap.Convertor = {};
BMap.Convertor.translate = translate;
})();