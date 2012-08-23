<div class='navbar navbar-fixed-top'>
	<div class='navbar-inner'>
		<div class='container'>
			<div class='brand'>LEE</div>
			<ul class='nav'>
				<?php
					foreach ($funcs as $k => $v){
						echo "<li class='".(($k==$tabid)?"active":"")."'><a href='?func=${k}'>${v}</a></li>";
					}
				?>
			</ul>
		</div>
	</div>
</div>
