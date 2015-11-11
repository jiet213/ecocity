<?php 
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);


$con = mysql_connect("127.0.0.1","root","root");
mysql_query("set names 'utf8'");//查询数据库中的中文字符
if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("dtstc", $con);

//获取之前页面的动态参数
$yjindex =$_GET['q1'];
$period =$_GET['q2'];
$level =$_GET['q3'];

//获取总得数据个数
if($period=='Day')
{
	$cnt1 = mysql_query("select count(*) from voice where abs($yjindex)>'55' and
	Time='$period'");
	$sth1 = mysql_query("SELECT Sample,count(*) FROM voice where abs($yjindex)>'55' and Time='$period' group by Sample");
	$sth2 = mysql_query("SELECT Date,count(*) FROM voice where abs($yjindex)>'55' and Time='$period' group by Date");
	$sth3 = mysql_query("SELECT $level, count(*) FROM voice where abs($yjindex)>'55' and Time='$period' group by $level");	
}
if($period=='Night')
{
	$cnt1 = mysql_query("select count(*) from voice where abs($yjindex)>'45' and
	Time='$period'");	
	$sth1 = mysql_query("SELECT Sample,count(*) FROM voice where abs($yjindex)>'45' and Time='$period' group by Sample");
	$sth2 = mysql_query("SELECT Date,count(*) FROM voice where abs($yjindex)>'45' and Time='$period' group by Date");
	$sth3 = mysql_query("SELECT $level, count(*) FROM voice where abs($yjindex)>'45' and Time='$period' group by $level");		
}
$cnt2 = mysql_query("SELECT count(*) FROM voice where Time='$period'");
$rows1 = array();
$rows11 = array();
while($r1 = mysql_fetch_array($cnt1)) {
     $rows1['beyond'][] =(int)$r1[0];
}
while($r11 = mysql_fetch_array($cnt2)) {
     $rows1['total'][] =(int)$r11[0];
}


$rows2 = array();
while($r2 = mysql_fetch_array($sth1)) {
    $rows2['Sample'][] = (string)$r2[0];
    $rows2['count'][] =(int)$r2[1];
}


$rows3 = array();
while($r3 = mysql_fetch_array($sth2)) {
    $rows3['Date'][] = (string)$r3[0];
    $rows3['count'][] =(int)$r3[1];
}

$rows4 = array();
while($r4 = mysql_fetch_array($sth3)) {
   $rows4['Level'][] = (int)$r4[0];
    $rows4['count'][] =(int)$r4[1];
}

$result = array();
array_push($result,$rows1);
array_push($result,$rows2);
array_push($result,$rows3);
array_push($result,$rows4);
//print json_encode($result,JSON_NUMERIC_CHECK);//去掉数值上的引号
//JSON_NUMERIC_CHECK在php5.3.3以后版本支持
print json_encode($result);//去掉数值上的引号
mysql_close($con);
?>