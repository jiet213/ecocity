
		<?php
			//连接数据库函数
			function db_connect()
			{
				$con = mysql_connect("127.0.0.1","root","root");
				if(!$con)
				{
					die('Could not connect: ' . mysql_error());
				}
				return $con;
			}

			$Sample = $_POST['Sample'];
			$Date = $_POST['Date'];
			$Chlorophyll = $_POST['Chlorophyll'];
			$SS = $_POST['SS'];
			$DO = $_POST['DO'];
			$CODMn = $_POST['CODMn'];
			$TP = $_POST['TP'];
			$TN = $_POST['TN'];
			$FlowRate = $_POST['FlowRate'];
			$WaterTemp = $_POST['WaterTemp'];
			$Transparency = $_POST['Transparency'];
			$PH = $_POST['PH'];
			$BOD5 = $_POST['BOD5'];
			$NH34 = $_POST['NH34'];
			
			if ($Sample==''||$Date==''||$Chlorophyll==''||$SS==''||$DO==''||$CODMn==''||$TP==''||$TN==''||$FlowRate==''||$WaterTemp==''||$Transparency==''||$PH==''||$BOD5==''||$NH34=='') 
			{
				echo "<script>alert('错误！数据输入不完整')</script>";	
				echo "<script>window.location.href='water.html'</script>";//返回原页面
			}
			else
			{
			//调用数据库函数
			$conn = db_connect();
			mysql_query("SET CHARACTER SET UTF8");//显示数据库的中文
			mysql_query("set names 'utf8'");//将中文插入数据库
			mysql_select_db("dtstc",$conn);

			//查询数据库，检查插入的数据是否已经存在
			$rs = mysql_query("select * from waterquality where SamplingPoint ='$Sample' and DO='$DO' and BOD5='$BOD5' and NH34='$NH34' and PH='$PH' and SS='$SS' and TN='$TN' and TP='$TP' and CODMn='$CODMn' and FlowRate='$FlowRate' and WaterTemp='$WaterTemp' and Transparency='$Transparency' and Chlorophyll='$Chlorophyll' and Date='$Date'");	
			if (mysql_num_rows($rs)>0) //返回影响的行数，如果大于0，说明填写数据已经存在
			{
				echo "<script>alert('错误！录入数据重复，请重新录入！')</script>";	
				echo "<script>window.location.href='water.html'</script>";//返回原页面
			}

			else//没有记录，执行插入操作
			{
			//根据参数，编写查询语句动态查询数据库
				$result = mysql_query("insert into waterquality values(null,'$Sample',$DO,$BOD5,$NH34,$PH,$SS,$TN,$TP,$CODMn,$FlowRate,$WaterTemp,$Transparency,$Chlorophyll,'$Date')");	
				if (!$result)
				{
					die('Could not connect: ' . mysql_error());
					echo "<br>";
				}
				else
				{
					echo "<script>alert('数据插入成功！')</script>";
					echo "<script>window.location.href='water.html'</script>";//返回原页面

				}
			}
			mysql_close($conn);
			}
		?>