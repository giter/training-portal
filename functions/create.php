<?php
	$type = $_GET["type"];
	if(isset($type)){
		if($_SERVER['REQUEST_METHOD'] == "POST"){
			db()->$type->save($_POST);
		}else{
			include(__DIR__ . "/../forms/".$type.".php");
		}
	}