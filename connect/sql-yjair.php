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
$level = $_GET['q3'];

$cnt1 = mysql_query("SELECT count(*) FROM air where $yjindex >'50' and Period='$period' and Sample !='SH'");
$cnt2 = mysql_query("SELECT count(*) FROM air where  Period='$period' and Sample !='SH'");
$rows1 = array();
$rows11 = array();
while($r1 = mysql_fetch_array($cnt1)) {
     $rows1['beyond'][] =(int)$r1[0];
}
while($r11 = mysql_fetch_array($cnt2)) {
     $rows1['total'][] =(int)$r11[0];
}



$sth = mysql_query("SELECT Sample, count(*) FROM air where $yjindex >'50' and Period='$period' and Sample !='SH' group by Sample");
$rows2 = array();
while($r2 = mysql_fetch_array($sth)) {
    //$rows2['sam'][] =(string)$r2['Sample'];
    //$rows2['samc'][]= (int)$r2['count(*)'];
    $rows2[] = array((string)$r2['Sample'], (int)$r2['count(*)']);
}

   
$sth = mysql_query("SELECT Month, count(*) FROM air where $yjindex >'50' and Period='$period' and Sample !='SH' group by Month");
$rows3 = array();
while($r3 = mysql_fetch_array($sth)) {
     $rows3[] = array((string)$r3['Month'], (int)$r3['count(*)']);
}

$sth = mysql_query("SELECT {$level}, count(*) FROM air where $yjindex >'50' and Period='$period' and Sample !='SH' group by $level order by CONVERT($level USING gbk)");
$rows4 = array();
while($r4 = mysql_fetch_array($sth)) {
     $rows4[] = array((string)$r4[0], (int)$r4['count(*)']);
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