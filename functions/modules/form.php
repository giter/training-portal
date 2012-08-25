<?php

	function form_load(){
		$val = array(
			"type"=>$_GET['type'],
			"id"  =>$_GET['id']
		);

 		if($val['type'] && $val['id']){
			$val['e'] = get($val['type'],$val['id']);
		}

		if($val['e']['tags']){
			$val['e']['tags'] = implode($val['e']['tags'],";");	
		}

		return $val;

	}

	function form_breadcrumb($val){
		$b =  array(
			"home" => l("?func=home"),
			"form" => ""
		);
		if($val['type']){
			$b += array($val['type']=>"");
		}
		return $b;
	}

	function form_auth($user,$val){
		return $user;
	}

	function form_post($val){

		$type = $val['type'];
		$id   = $val['id'];

		$e = array();
		if($val['e']){
			$e = $val['e'];
		}

		if(isset($type)){

			if(!$e && !$_POST['_id']){
				$_POST['_id'] = base_convert(uniqid(),16,36);
			}

			if($_POST['tags']){
				$_POST['tags'] = explode(";",$_POST['tags']);
			}

			$e = $_POST + $e;

			$e['created'] = time();

			db()->$type->save($e);
			header("Location: ".l("?func=$type&id=${e['_id']}"));
			exit;
		}	
	}
