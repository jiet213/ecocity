<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);


$con = mysql_connect("127.0.0.1","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("dtstc", $con);


//获取之前页面的动态参数
$samP = $_GET['q1'];
$samI = $_GET['q2'];
$samDF= $_GET['q3'];
$samDT= $_GET['q4'];
$samtP = $_GET['q5'];
$samp1 = $_GET['q6'];
$samp2 = $_GET['q7'];

$sth = mysql_query("SELECT soil_depth FROM carbon WHERE sample='$samP'and soil_depth between '$samDF' and '$samDT'");
$rows1 = array();
$rows1['name'] = 'soil_depth';
while($r1 = mysql_fetch_assoc($sth)) {
    $rows1['data'][] = (string)$r1['soil_depth'];
}

$sth = mysql_query("SELECT {$samI} FROM carbon WHERE sample='$samP'and soil_depth between '$samDF' and '$samDT'");
//$property = mysql_fetch_field($sth1);//取得列的信息
$rows2 = array();
/*$r22 = mysql_fetch_array($sth22);*/
$rows2['name']=$samp1;//$property->name;
while($r2 = mysql_fetch_array($sth)) {
    $rows2['data'][] = (float)$r2[0];
}

   
$sth = mysql_query("SELECT {$samI} FROM carbon WHERE sample='$samtP'and soil_depth between '$samDF' and '$samDT'");
//$property = mysql_fetch_field($sth1);//取得列的信息
$rows3 = array();
$rows3['name'] = $samp2;//$property->name;
while($r3 = mysql_fetch_array($sth)) {
    $rows3['data'][] = (float)$r3[0];
}




$result = array();
array_push($result,$rows1);
array_push($result,$rows2);
array_push($result,$rows3);

//print json_encode($result,JSON_NUMERIC_CHECK);//去掉数值上的引号
//JSON_NUMERIC_CHECK在php5.3.3以后版本支持
print json_encode($result);//去掉数值上的引号
mysql_close($con);
?>