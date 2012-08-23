<?php

function blogs_load(){

	$query = array();

	$id = $_GET['id'];

	if($id){
		$query["id"] = array("$lt"=>$id);
	}

	return db()->blog->find($query,array("content"=>false))->limit($PAGE_COUNT)->sort(array("_id" => -1));
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
	$val['content'] = html(htmlspecialchars($val['content']));
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

