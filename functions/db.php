<?php
	if(!file_exists(__DIR__."/db/${DB['type']}.php")){
		die("Missing db driver ${DB['type']}.");
	}else{
		include(__DIR__."/db/${DB['type']}.php");
	}
