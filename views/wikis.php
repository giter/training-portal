<?php
	if(!$val){
		echo "No wikis";
	}else{
		$val['created'] = date("Y/m/d",$val['created']);
		echo <<<EOD
<div class='title'>
	<h2>${val['_id']}</h2>
</div>	
<div class='time'>
	${val['created']} - by lee
</div>
<div class='content'>
	${val['content']}
</div>
EOD;
	}
