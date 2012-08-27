<?php

function blogs_load(){

	$query = array();

	$id = $_GET['id'];

	if($id){
		$query["id"] = array("$lt"=>$id);
	}

	return fetch("blog",$query,array("title"=>1,"created"=>1),array("_id"=>-1),$PAGE_COUNT);
}

function blogs_breadcrumb($val){
	global $func;
	return array(
		"home"=>l("?func=home"),
		"blogs"=>$func=='blogs'?"":l("?func=blogs")
	);
}


function blog_load(){
	$val = get($_GET['func'],$_GET['id']);
	return $val;
}

function blog_breadcrumb($val){
	return blogs_breadcrumb($val) + array(
		($val['title']) => ""
	);
}

function blog_tabid(){
	return "blogs";
}

