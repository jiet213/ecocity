
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

			$C_name = $_GET['yjindex'];
			$C_chinaname=$_GET['showname'];
			$date = $_GET['yjdate'];
			$level = $_GET['level'];

			//分页
			$page=isset($_GET['page'])?intval($_GET['page']):1; 
			$num=15;//每页显示15条记录
			 

			//调用数据库函数
			$conn = db_connect();
			mysql_query("SET CHARACTER SET UTF8");//显示数据库的中文
			mysql_select_db("dtstc",$conn);

			//获取总得数据个数
			$info1 = mysql_query("select Sample,$C_name,Day,Month from air where $C_name>'50' and
				Period='$date' and Sample !='SH'");	
			$info2 = mysql_query("select * from air where
				Period='$date' and Sample !='SH'");

			$total = mysql_num_rows($info2);//总个数
			$yjtotal = mysql_num_rows($info1);//超标个数
			
			//总得页数
			$pagenum=ceil($total/$num); 
			$page=min($pagenum,$page);//获得首页
			$prepg=$page-1;//上一页
			$nextpg=($page==$pagenum ? 0 : $page+1);//下一页
			$offset=($page-1)*$num;
			//分页导航
			$pagenav="第 ".($total?($offset+1):0)."-".min($offset+15,$total)." 条记录，共 $total 条记录，超标<B> $yjtotal </B>条记录,第<B> $page </B>页，共 $pagenum 页";

			if($page>$pagenum){
       			echo "Error : Can Not Found The page .";
       			exit;
			}
			

			$result = mysql_query("select Sample,$C_name,$level,Day,Month from air where 
				Period='$date' and Sample !='SH' order by Sample limit $offset,$num");
			//动态显示在html页面的表格中，设置表格的列名为之前获取的中文文本
			header("Content-Type:text/html;charset=utf-8");
			echo "<caption><h3 align='left' style='color:#005AB5'>超标数据表</h3></caption>";
			echo "<table id='table1' align='center' style='border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;'>
				<tr style=line-height:1.8em;>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>监测站点</th>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>$C_chinaname</th>
                    <th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>预警等级</th>
                    <th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>日</th>
					<th style='width:210px;border:1px solid #98bf21;background-color:#A7C942;color:#ffffff;padding-top:5px;
                                padding-bottom:4px;'; align='center'>月</th>
				</tr>";
			//将查询的结果动态显示在表格中
			while ( $row = mysql_fetch_array($result)) 
			{

				echo "<tr>";
				echo "<td align='center' style='border:1px solid #98bf21'>".$row["Sample"]."</td>";

				//显示不同的颜色
				if ($row[$C_name]<=50) 
				{
					echo "<td id='date' align='center' style='border:1px solid #98bf21;background-color:#00e200'>".$row[$C_name]."</td>";
				}
				else if ($row[$C_name]>50&$row[$C_name]<=100) 
				{
					echo "<td id='date' align='center' style='border:1px solid #98bf21;background-color:#ffff00'>".$row[$C_name]."</td>";
				}
				# code...
				else if($row[$C_name]>100&$row[$C_name]<=150)
				{
					echo "<td id='date' align='center' style='border:1px solid #98bf21;background-color:#fe7d00'>".$row[$C_name]."</td>";
				}
				else if($row[$C_name]>150&$row[$C_name]<=200)
				{
					echo "<td id='date' align='center' style='border:1px solid #98bf21;background-color:#fe0000'>".$row[$C_name]."</td>";
				}
				else if($row[$C_name]>200)
				{
					echo "<td id='date' align='center' style='border:1px solid #98bf21;background-color:#7030a0'>".$row[$C_name]."</td>";
				}

				echo "<td align='center' style='border:1px solid #98bf21'>".$row[$level].' 级'."</td>";
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
			
  			echo "<div style='text-align:center;font-size:14px;margin-top:5px;'> $pagenav</div>";//输出分页导航

  			echo "<div style='text-align:center;font-size:16px;margin-top:5px;'>";
			if($page!=1){
              echo "<button style='border: 1px solid #000000;border-radius:10px;background-color:#FFA042;' onclick=window.location.href='yjair.php?yjindex=$C_name&showname=$C_chinaname&yjdate=$date&level=$level&page=1'>首页&nbsp;</button>";
              echo "<button style='border: 1px solid #000000;border-radius:10px;background-color:#FFA042;' onclick=window.location.href='yjair.php?yjindex=$C_name&showname=$C_chinaname&yjdate=$date&level=$level&page=".$prepg."'><<上一页&nbsp;</button>";
            }
            if($page<$pagenum){
              echo "<button style='border: 1px solid #000000;border-radius:10px;background-color:#FFA042;' onclick=window.location.href='yjair.php?yjindex=$C_name&showname=$C_chinaname&yjdate=$date&level=$level&page=".$nextpg."'>下一页>>&nbsp;</button>";
              echo "<button style='border: 1px solid #000000;border-radius:10px;background-color:#FFA042;' onclick=window.location.href='yjair.php?yjindex=$C_name&showname=$C_chinaname&yjdate=$date&level=$level&page=".$pagenum."'>尾页&nbsp;</button>";
          }
          echo "</div>";
			mysql_close($conn);
		?>
