<?php

	function wikis_load(){

		$type = "wiki";
		$id = $_GET['id'];
		if(!$id){
			$id = "homepage";
		}

		$val = get($type,$id);
		$val['content'] = html(htmlspecialchars($val['content']));
		return $val;
	}

	function wikis_breadcrumb($val){
		return array(
			"home"=>l("?func=home"),
			"wikis"=>l("?func=wikis"),
			$val['_id']=>""
		);
	}
