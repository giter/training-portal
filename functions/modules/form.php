<?php

	function form_load(){
		$val = array(
			"type"=>$_GET['type'],
			"id"  =>$_GET['id']
		);

 		if($val['type'] && $val['id']){
			$val['e'] = get($val['type'],$val['id']);
		}

		return $val;

	}

	function form_breadcrumb(){
		return array(
			"home" => l("?func=home"),
			"form" => ""
		);
	}

	function form_post($val){

		$type = $val['type'];
		$id   = $val['id'];

		$e = array();
		if($val['e']){
			$e = $val['e'];
		}

		if(isset($type)){

			if(!$e){
				$_POST['_id'] = base_convert(uniqid(),16,36);
			}

			$e = $_POST + $e;

			$e['created'] = time();

			db()->$type->save($e);
			header("Location: ".l("?func=$type&id=${e['_id']}"));
			exit;
		}	
	}
