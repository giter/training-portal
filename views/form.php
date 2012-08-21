<?php

	$type = $_GET["type"];
	$id   = $_GET["id"];
	$val = array();

	if($type && $id){
		$val = get($type,$id);
	}

	if(isset($type)){

		if($_SERVER['REQUEST_METHOD'] == "POST"){
			if(!$val){
				$_POST['_id'] = base_convert(uniqid(),16,36);
			}
			$val = $_POST + $val;
			$val['created'] = time();
			db()->$type->save($val);
			header("Location: ".l("?func=$type&id=${val['_id']}"));
			exit;
		}

		include(__DIR__ . "/../forms/".$type.".php");
	}
