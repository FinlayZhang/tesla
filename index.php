<?php 
	$data = $_POST["params"];
	$res = json_decode($data, true);
	if ($res["name"] == "nameVal" && $res["mobile"] == "15644442222") {
		echo "登陆成功！";
	} else {
		echo "登录失败！";
	}
 ?>