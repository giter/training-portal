<?php

function blogs_load($vars){
	$_REQUEST['items'] = db()->blog->find()->limit(10)->sort(array("_id" => -1));
}

function blog_load($vars){
	$_REQUEST['item'] = get($vars['func'],$vars['id']);
	$_REQUEST['item']['content'] = html(htmlspecialchars($_REQUEST['item']['content']));
}

