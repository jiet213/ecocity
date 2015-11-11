
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
			
			//获取之前页面的动态参数
			
			
			$S_name1 = $_POST['sampoint'];//获取第一个站点名
			$S_name2 = $_POST['samtpoint'];//获取第二个站点名
			$C_name = $_POST['samindex'];//获取查询的参数名字
			
			//动态选择的时间进行查询显示
			$fsoil = $_POST['samsoilfrom'];
			$tsoil = $_POST['samsoilto'];

			$C_chinaname=$_POST['showname'];//获取下拉菜单参数的中文文本，然后将查询的列名动态显示为该中文文本
			if($S_name1 =='zero'&&$S_name2=='zero')//对参数进行判断，为空就不执行数据库
			{
				echo "<script>alert('错误！请至少选择一个监测点!')</script>";	
			}
			else
			{
			$conn = db_connect();
			mysql_select_db("dtstc",$conn);
			//根据参数，编写查询语句动态查询数据库
			$result = mysql_query("select sample,$C_name,soil_depth from carbon where 
				(sample = '$S_name1' or sample = '$S_name2') and soil_depth between '$fsoil' and '$tsoil'");//图层深度在数据库中是字符串形，'$fsoil'必须要加单引号。

			//动态显示在html页面的表格中，设置表格的列名为之前获取的中文文本
			header("Content-Type:text/html;charset=utf-8");
			echo "<table id='table1' align='center' style='border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;'>
				<tr style=line-height:1.8em;>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>样地编号</th>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>$C_chinaname</th>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>土层深度</th>
				</tr>";
			//将查询的结果动态显示在表格中
			while ( $row = mysql_fetch_array($result)) 
			{
				# code...
				echo "<tr style=line-height:1.5em;>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["sample"]."</td>";//显示查询结果中的站点名，包含多个站点
				echo "<td align='center' style='border:1px solid #98bf21'>".$row[$C_name]."</td>";//显示选择的参数查询出来的数据
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["soil_depth"]."cm"."</td>";//显示查询结果中的时间。
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