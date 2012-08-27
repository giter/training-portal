<?php
	if(!$val){
		echo "<div class='content time'>No wikis.</div>";
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
