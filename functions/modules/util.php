<?php

	function utils_load(){

		$query = array();

		$id = $_GET['id'];

		if($id){
			$query["id"] = array("$lt"=>$id);
		}

		return fetch($query,array("title"=>1,"created"=>1),array("_id"=>-1));
	}

	function utils_breadcrumb($val){
		global $func;
		return array(
			"home"=>l("?func=home"),
			"utils"=>$func=='utils'?"":l("?func=utils")
		);
	}

	function util_load(){
		$val = get($_GET['func'],$_GET['id']);
		return $val;
	}

	function util_breadcrumb($val){
		return utils_breadcrumb($val) + array(
			($val['title']) => ""
		);
	}

	function util_tabid(){
		return "utils";
	}

