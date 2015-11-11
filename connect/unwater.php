
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
			$S_name1 = 'S1';
			//根据参数，编写查询语句动态查询数据库
			//调用数据库函数
			$conn = db_connect();
			mysql_query("SET CHARACTER SET UTF8");//显示数据库的中文

			//选择数据库ststc
			mysql_select_db("dtstc",$conn);

			$result = mysql_query("select Sample,NH,Total,CaCO3,COD,PH,Date from unwater where 
				Sample = '$S_name1'");			
			
			//动态显示在html页面的表格中，设置表格的列名为之前获取的中文文本
			header("Content-Type:text/html;charset=utf-8");
			echo "<table id='table1' align='center' style='border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;'>
				<tr style=line-height:2.8em;>
					<th style='width:200px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>采样点位</th>
					<th style='width:170px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>氨氮</th>
                    <th style='width:260px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>溶解性总固体</th>
					<th style='width:180px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>总硬度</th>
                    <th style='width:280px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>高锰酸盐指数</th>
                     <th style='width:170px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>PH</th>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>采样时间</th>
				</tr>";
			//将查询的结果动态显示在表格中
			while ( $row = mysql_fetch_array($result)) 
			{
				# code...
				echo "<tr style=line-height:2.5em;>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["Sample"]."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["NH"]."类"."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["Total"]."类"."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["CaCO3"]."类"."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["COD"]."类"."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["PH"]."类"."</td>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["Date"]."</td>";
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
		?>