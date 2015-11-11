
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

			
			$S_name1 = $_POST['sampoint'];
			$S_name2 = $_POST['samtpoint'];
			$C_name = $_POST['samindex'];
			$date = $_POST['samdate'];
			$C_chinaname=$_POST['showname'];
			if($S_name1 =='zero'&&$S_name2=='zero')//对参数进行判断，为空就不执行数据库
			{
				echo "<script>alert('错误！请至少选择一个监测点!')</script>";	
			}
			else
			{
				//调用数据库函数
			$conn = db_connect();
			mysql_query("SET CHARACTER SET UTF8");//显示数据库的中文

			//选择数据库ststc
			mysql_select_db("dtstc",$conn);

			//根据参数，编写查询语句动态查询数据库
			$result = mysql_query("select Sample,$C_name,Day,Month from air where 
				(Sample = 'SH' or Sample = '$S_name1' or Sample = '$S_name2') and Month='$date'");			
			
			//动态显示在html页面的表格中，设置表格的列名为之前获取的中文文本
			header("Content-Type:text/html;charset=utf-8");
			echo "<table id='table1' align='center' style='border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;'>
				<tr style=line-height:1.8em;>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>监测站点</th>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>$C_chinaname</th>
                    <th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>日</th>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>月</th>
				</tr>";
			//将查询的结果动态显示在表格中
			while ( $row = mysql_fetch_array($result)) 
			{
				# code...
				echo "<tr>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["Sample"]."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row[$C_name]."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["Day"].'日'."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["Month"]."</td>";
				echo "</tr>";

				//表格隔行颜色一样
				echo "<script>
					var table1 = document.getElementById('table1');
   					for (var i = 0; i < table1.rows.length; i++)
      				table1.rows[i].bgColor=(i % 2 ==0)?'#eaf2d3':'white';
				</script>";
			}
			echo "</table>";
			mysql_close($conn);
			}
		?>