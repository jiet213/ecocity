
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
			$Period = $_POST['Period'];
			$PM10 = $_POST['PM10'];
			$PM25 = $_POST['PM25'];
			$SO2=$_POST['SO2'];
			$NO2=$_POST['NO2'];
			$Month=$_POST['Month'];
			$Day=$_POST['Day'];
			$Level10=0;
			$Level25=0;

			$k=(int)$PM10;//将获取到的PM10的值强制转换为int型
			$n=(int)$PM25;

			if ($Sample==''||$Period==''||$PM10==''||$Day==''||$PM25==''||$SO2==''||$NO2==''||$Month=='') 
			{
				echo "<script>alert('错误！数据输入不完整')</script>";	
				echo "<script>window.location.href='air.html'</script>";//返回原页面
			}
			else
			{
				//根据PM10 PM2.5的值判断它的等级；
				switch ( $k ) 
				{
					case $k === '0'://对0特殊处理
						$Level10=1;
						break;
					case $k <= 50:
						$Level10=1;
						break;
					case $k >50 && $k<=100:
						$Level10=2;
						break;
					case $k >100 && $k<=150:
						$Level10=3;
						break;
					case $k >150 && $k<=200:
						$Level10=4;
						break;
					case $k >200:
						$Level10=5;
						break;
				}
				switch ($n ) 
				{
					case $n === '0'://对0特殊处理
						$Level25=1;
						break;
					case $n <=50:
						$Level25=1;
						break;
					case $n >50 && $n<=100:
						$Level25=2;
						break;
					case $n >100 && $n<=150:
						$Level25=3;
						break;
					case $n >150 && $n<=200:
						$Level25=4;
						break;
					case $n >200:
						$Level25=5;
						break;
				}
			//调用数据库函数
			$conn = db_connect();
			mysql_query("SET CHARACTER SET UTF8");//显示数据库的中文
			mysql_query("set names 'utf8'");//将中文插入数据库
			mysql_select_db("dtstc",$conn);

			//查询数据库，检查插入的数据是否已经存在
			$rs = mysql_query("select * from air where Sample ='$Sample' and PM10='$PM10' and PM25='$PM25' and SO2='$SO2' and NO2='$NO2' and Day='$Day' and Month='$Month'");	
			if (mysql_num_rows($rs)>0) //返回影响的行数，如果大于0，说明填写数据已经存在
			{
				echo "<script>alert('错误！录入数据重复，请重新录入！')</script>";	
				echo "<script>window.location.href='air.html'</script>";//返回原页面
			}

			else//没有记录，执行插入操作
			{
			//根据参数，编写查询语句动态查询数据库
				$result = mysql_query("insert into air values(null,'$Sample',$PM10,$PM25,$SO2,$NO2,'$Day','$Month','$Period','$Level10','$Level25')");			
				if (!$result)
				{
					die('Could not connect: ' . mysql_error());
					echo "<br>";
				}
				else
				{
					echo "<script>alert('数据插入成功！')</script>";
					echo "<script>window.location.href='air.html'</script>";//返回原页面

				}
			}
			mysql_close($conn);
			}
		?>