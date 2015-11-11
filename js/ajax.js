function ajax(method, url, data, async, callback) {
	var xhr = null;
	var xdr = null;
	if (data instanceof Object) {
		var str = "";
		for (k in data) {
			str += k + "=" + data[k] + "&";
		}
		data = str;
	}
	if (window.XDomainRequest) {
		xdr = new XDomainRequest();
		if (xdr) {

			xdr.onprogress = function(e){
				//alert("Loading...");
			};
			xdr.onerror = function(e){
				alert(JSON.stringify(e));
			};
			xdr.onload = function () {
				callback(xdr.responseText);
			};

			if ("get" == method.toLowerCase()) {
				if (data == null || data == "") {
					xdr.open("get", url);
				} else {
					xdr.open("get", url + "?" + data);
				}
				xdr.send(null);
			} else if ("post" == method.toLowerCase()) {
				xdr.open("post", url);
				xdr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
				xdr.send(data);
			}
		}
	} else {
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function (e) {
			//console.log(xhr);
			if (4 == xhr.readyState) {
				if (200 == xhr.status) {
					if (callback) {
						callback(xhr.responseText);
					}
				} else if (404 == xhr.status) {
					if (hander404) {
						hander404();
					}
				} else if (500 == xhr.status) {
					if (hander500) {
						hander500();
					}
				}
			} else {
				if (loading) {
					loading();
				}
			}
		}

		if ("get" == method.toLowerCase()) {
			if (data == null || data == "") {
				xhr.open("get", url, async);
			} else {
				xhr.open("get", url + "?" + data, async);
			}
			xhr.send(null);
		} else if ("post" == method.toLowerCase()) {
			xhr.open("post", url, async);
			xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
			xhr.send(data);
		}
	}
}

function handler404() {
	alert("ReqUrl：not found");
}

function handler500() {
	alert("服务器错误，请稍后再试");
}

function loading() {
	//console.log("Loading");
}
