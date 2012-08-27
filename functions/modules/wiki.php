<?php

	function wikis_load(){

		$type = "wiki";
		$id = $_GET['id'];
		if(!$id){
			$id = "homepage";
		}

		$val = get($type,$id);
		if($val){
			$val['content'] = html(htmlspecialchars($val['content']));
		}
		return $val;
	}

	function wikis_breadcrumb($val){
		$b =  array(
			"home"=>l("?func=home"),
			"wikis"=>l("?func=wikis"),
		);
		if($val){
			$b += array($val['_id']=>"");
		}
		return $b;
	}
