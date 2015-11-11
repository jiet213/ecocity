<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);


$con = mysql_connect("127.0.0.1","root","root");
//mysql_query("SET CHARACTER SET UTF8");//显示数据库的中文
if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("dtstc", $con);


//获取之前页面的动态参数
$samP = $_GET['q1'];
$samI = $_GET['q2'];
$samtP = $_GET['q3'];

$sth = mysql_query("SELECT Date FROM surfacew WHERE Sample='$samP'");
$rows1 = array();
$rows1['name'] = 'Date';
while($r1 = mysql_fetch_assoc($sth)) {
    $rows1['data'][] =$r1['Date'];
}

$sth = mysql_query("SELECT {$samI} FROM surfacew WHERE Sample='$samP'");
$rows2 = array();
$rows2['name'] = 'name';
while($r2 = mysql_fetch_array($sth)) {
    $rows2['data'][] = (int)$r2[0];
}

$sth = mysql_query("SELECT {$samI} FROM surfacew WHERE Sample='$samtP'");
//$property = mysql_fetch_field($sth1);//取得列的信息
$rows3 = array();
$rows3['name']='name';//$property->name;
while($r3 = mysql_fetch_array($sth)) {
    $rows3['data'][] = (int)$r3[0];
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