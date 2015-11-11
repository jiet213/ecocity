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
$samP = $_GET['q1'];
$samI = $_GET['q2'];
$samtP = $_GET['q3'];
$samp1 = $_GET['q4'];
$samp2 = $_GET['q5'];

$sth = mysql_query("SELECT Date FROM voice WHERE  Sample='$samP' and Time='夜间'");
$rows1 = array();
$rows1['name'] = 'Date';
while($r1 = mysql_fetch_assoc($sth)) {
    $rows1['data'][] =$r1['Date'];
}

$sth = mysql_query("SELECT {$samI} FROM voice WHERE Sample='$samP' and Time='昼间'");
//$property = mysql_fetch_field($sth1);//取得列的信息
$rows2 = array();
$rows2['name']=$samp1.'昼间';//$property->name;
while($r2 = mysql_fetch_array($sth)) {
    $rows2['data'][] = (double)$r2[0];
}
   
$sth = mysql_query("SELECT {$samI} FROM voice WHERE Sample='$samP' and Time='夜间'");
//$property = mysql_fetch_field($sth1);//取得列的信息
$rows3 = array();
$rows3['name'] = $samp1.'夜间';//$property->name;
while($r3 = mysql_fetch_array($sth)) {
    $rows3['data'][] = (double)$r3[0];
}

$sth = mysql_query("SELECT {$samI} FROM voice WHERE Sample='$samtP' and Time='昼间'");
//$property = mysql_fetch_field($sth1);//取得列的信息
$rows4 = array();
$rows4['name']=$samp2.'昼间';//$property->name;
while($r4 = mysql_fetch_array($sth)) {
    $rows4['data'][] = (double)$r4[0];
}

   
$sth = mysql_query("SELECT {$samI} FROM voice WHERE Sample='$samtP' and Time='夜间'");
//$property = mysql_fetch_field($sth1);//取得列的信息
$rows5 = array();
$rows5['name'] = $samp2.'夜间';//$property->name;
while($r5 = mysql_fetch_array($sth)) {
    $rows5['data'][] = (double)$r5[0];
}


$result = array();
array_push($result,$rows1);
array_push($result,$rows2);
array_push($result,$rows3);
array_push($result,$rows4);
array_push($result,$rows5);

//print json_encode($result,JSON_NUMERIC_CHECK);//去掉数值上的引号
//JSON_NUMERIC_CHECK在php5.3.3以后版本支持
print json_encode($result);//去掉数值上的引号
mysql_close($con);
?>