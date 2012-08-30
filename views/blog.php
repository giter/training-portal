<div class='content'>
	<div class='time pull-right'>
		<?php echo(date("Y/m/d",$val['created'])); ?>
	</div>
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


