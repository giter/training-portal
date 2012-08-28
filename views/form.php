<?php if(!$_GET['type']) { 
	echo "<div class='content'>";
	foreach(array("blog","wiki","util") as $u){
		echo "<p><a href='".l("?func=form&type=$u")."' >${u}</a></p>";
	}	
	echo "</div>";
} else {  ?>
	<form class='row-fluid' style='padding:2em 0 0 2em;' action='' method='post' >

		<fieldset class='control-group'>
			<input name='title' placeholder="TITLE" type='text' class='input-xxlarge' value="<?php echo($val['e']['title']); ?>" />
		</fieldset>
		
		<fieldset  class='control-group'>
			<div class='wmd-panel'>
				<div id="wmd-button-bar"></div>
				<textarea placeholder="CONTENT" name='content' class='input-xxlarge wmd-input' id='wmd-input' rows="15"><?php echo($val['e']['content']); ?></textarea>
				<input name='tags' placeholder="TAGS" type='text' class='input-xxlarge' value="<?php echo($val['e']['tags']); ?>"/>
			</div>
		</fieldset>

		<fieldset class='control-group'>
			<label class='pull-left'>FORMAT:</label>
			<label class='pull-left checkbox'><input type='radio' <?php if($val['e']['format'] == 'markdown' || !$val['e']['format']): ?>checked=checked<?php endif; ?> name="format" value="markdown" /> MarkDown</label>
			<label class='pull-left checkbox'><input type='radio' <?php if($val['e']['format'] == 'html'):?>checked=checked<?php endif; ?> name="format" value="html" /> HTML</label>
			<label class='pull-left checkbox'><input type='radio' <?php if($val['e']['format'] == 'php') : ?>checked=checked<?php endif; ?> name="format" value="php" /> PHP</label>
		</fieldset>
		
		<fieldset  class='control-group'>
			<input type='submit' class='btn btn-primary' value='Submit' />
			<input type='submit' class='btn btn-info wmd-preview-toggle' value='Preview' />
			<a href='#'>Cancel</a>
		</fieldset>
		<div id="wmd-preview" class="wmd-panel wmd-preview"></div>
		
	</form>
<?php } ?>
