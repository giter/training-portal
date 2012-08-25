<?php

	function user_post(){
		
		$user = get("user",$_POST["_id"]);
		
		if($user && $user['password'] == $_POST['password']){
			$_SESSION['user'] = $user;	
			header("Location: /");
		}else{
			header("Location: ".l("?func=user"));
		}
	}

	function user_breadcrumb(){
		return array(
			"home"=>l("?func=home"),
			"login"=>""
		);
	}
