<?php
	if(isset($_REQUEST["items"])){
		
		$items = $_REQUEST["items"];
		
		echo "<div class='items'>";
		
		while($items->hasNext()){
			
			$blog = $items->getNext();
			
			$blog["link"] = l("?func=blog&id=".$blog["_id"]);
			
			echo <<<EOD
			<div class='item'>
				<a href='${blog["link"]}'><strong>${blog['title']}</strong></a>
			</div>			
EOD;
		}
		
		echo "</div>";
	}