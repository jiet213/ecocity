	function docheck_Air()
	{
		var Sample = document.frmInsert.Sample.value;
		var Period = document.getElementById("period").options[document.getElementById("period").selectedIndex].value;
		var PM10 = document.frmInsert.PM10.value;
		var PM25 = document.frmInsert.PM25.value;
		var SO2 = document.frmInsert.SO2.value;
		var NO2 = document.frmInsert.NO2.value;
		var Month = document.getElementById("month").options[document.getElementById("month").selectedIndex].value;
		var Day = document.frmInsert.Day.value;

		var re = /^\d+$/;//判断指标是否是整数的正则

		if (Sample=='') 
		{
			alert('请输入监测站点！');return false;
		}
		if (Period=='null') {
			alert('请选择监测时段！');return false;
		}
		if (PM10=='') {
			alert('请输入PM10的监测指标值！');return false;
		}
		if (PM25=='' ) {
			alert('请输入PM2.5的监测指标值！');return false;
		}
		if (SO2=='') {
			alert('请输入SO2的监测指标值！');return false;
		}
		if (NO2=='') {
			alert('请输入NO2的监测指标值！');return false;
		}
		if (!re.test(PM10)||!re.test(PM25)||!re.test(SO2)||!re.test(NO2)) {
			alert("监测指标的值请输入整数(例如:58)");return false;
		}

		if (Month=='null') {
			alert('请选择监测的月份！');return false;
		}
		if (Day=='null') {
			alert('请输入监测的具体日期(天)！');return false;
		}
		
		//确认是否录入数据库
		if(confirm("录入的信息如下：\n监测站点是"+Sample+"，监测时间为"+Month+"月"+Day+
			"日，监测指标PM10的值为"+PM10+"，PM2.5为"+PM25+"，SO2和NO2的指标分别为"+SO2+"，"+NO2+"。\n"
			+"确定录入该数据吗？"))
		{
			return true;
		}
		else
		{
			return false;
		}
		
	}

	function docheck_W()
	{
		var Sample = document.frmInsert.Sample.value;
		var Date = document.getElementById("date").options[document.getElementById("date").selectedIndex].value;
		var Chlorophyll = document.frmInsert.Chlorophyll.value;
		var SS = document.frmInsert.SS.value;
		var DO = document.frmInsert.DO.value;
		var CODMn = document.frmInsert.CODMn.value;
		var TP = document.frmInsert.TP.value;
		var TN = document.frmInsert.TN.value;
		var FlowRate = document.frmInsert.FlowRate.value;
		var WaterTemp = document.frmInsert.WaterTemp.value;
		var Transparency = document.frmInsert.Transparency.value;
		var PH = document.frmInsert.PH.value;
		var BOD5 = document.frmInsert.BOD5.value;
		var NH34 = document.frmInsert.NH34.value;
		
		var reZ = /^\d+$/;//判断指标是否是正整数和0的正则
		var reS = /^[0-9]+\.{0,1}[0-9]{0,5}$/;//判断是否大于等于0的数值

		if (Sample=='') 
		{
			alert('请输入观测台站！');return false;
		}
		if (Date=='null') {
			alert('请选择监测时间！');return false;
		}
		if (Chlorophyll=='') {
			alert('请输入叶绿素的监测指标值！');return false;
		}
		if (!reS.test(Chlorophyll)) {
			alert('叶绿素的指标值应为大于0的数值！');return false;
		}
		if (SS=='') {
			alert('请输入悬浮物的监测指标值！');return false;
		}
		if (!reS.test(SS)) {
			alert('悬浮物的指标值应为大于0的数值！');return false;
		}
		if (DO=='') {
			alert('请输入溶解氧的监测指标值！');return false;
		}
		if (!reS.test(DO)) {
			alert('溶解氧的指标值应为大于0的数值！');return false;
		}
		if (CODMn=='') {
			alert('请输入高锰酸盐指数的监测指标值！');return false;
		}
		if (!reS.test(CODMn)) {
			alert('高锰酸盐指数的指标值应为大于0的数值！');return false;
		}
		if (TP=='') {
			alert('请输入总磷的监测指标值！');return false;
		}
		if (!reS.test(TP)) {
			alert('总磷的指标值应为大于0的数值！');return false;
		}
		if (TN=='') {
			alert('请输入总氮的监测指标值！');return false;
		}
		if (!reS.test(TN)) {
			alert('总氮的指标值应为大于0的数值！');return false;
		}
		if (FlowRate=='') {
			alert('请输入流速的监测指标值！');return false;
		}
		if (WaterTemp=='') {
			alert('请输入水温的监测指标值！');return false;
		}
		if (!reS.test(WaterTemp)) {
			alert('水温的指标值应为大于0的数值！');return false;
		}
		if (Transparency=='') {
			alert('请输入透明度的监测指标值！');return false;
		}
		if (!reZ.test(FlowRate)||!reZ.test(Transparency)) {
			alert("流速或透明度的监测值请输入整数(例如:58)");return false;
		}
		if (PH=='') {
			alert('请输入PH的监测指标值！');return false;
		}
		if (!reS.test(PH)) {
			alert('PH的指标值应为大于0的数值！');return false;
		}
		if (BOD5=='') {
			alert('请输入五日生化需氧量的监测指标值！');return false;
		}
		if (!reS.test(BOD5)) {
			alert('五日生化需氧量的指标值应为大于0的数值！');return false;
		}
		if (NH34=='') {
			alert('请输入氨氮的监测指标值！');return false;
		}
		if (!reS.test(NH34)) {
			alert('氨氮的指标值应为大于0的数值！');return false;
		}
	
		
		//确认是否录入数据库
		if(confirm("录入的信息如下：\n观测台站是"+Sample+"，监测时间为"+Date+
			"，监测指标：\n叶绿素的值为"+Chlorophyll+"，悬浮物为"+SS+"，溶解氧为"+DO+"，高锰酸盐指数为"+CODMn
			+"，总磷为"+TP+"，总氮为"+TN+"，流速为"+FlowRate+"，水温为"+WaterTemp+"，透明度为"+Transparency
			+"，PH值为"+PH+"，五日生化需氧量为"+BOD5+"，氨氮为"+NH34+"。\n"
			+"确定录入该数据吗？"))
		{
			return true;
		}
		else
		{
			return false;
		}
		
	}


	//获得焦点
	function focusS(ele)
	{
		ele.style.color='#000';
	}

	//指标失去焦点（整数）
	function blurI(ele)
	{
		var sample = ele.value;
		if (sample =="") 
		{
			ele.value="10";
			ele.style.color='#999999'
		}
	}
	//指标失去焦点（小数）
	function blurD(ele)
	{
		var sample = ele.value;
		if (sample =="") 
		{
			ele.value="15.5";
			ele.style.color='#999999'
		}
	}

