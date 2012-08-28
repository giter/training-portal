<div class='title'>
	<h2><?php echo($val['title']); ?></h2>
	<div class='time'>
		<?php echo(date("Y/m/d",$val['created'])); ?>
	</div>
</div>	
<div class='content'>
<?php content($val['content'],$val['format']) ?>
	<div class='tags'>
	<?php
			if($val['tags']){
				foreach($val['tags'] as $t){
					echo "<span class='label label-info'>".$t."</span>&nbsp;";
				}
			}
	?>
	</div>
</div>


