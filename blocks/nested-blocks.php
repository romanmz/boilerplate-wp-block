<?php

add_action( 'init', 'namespace_nested_blocks_init' );
function namespace_nested_blocks_init() {
	
	// Variables
	$namespace = 'namespace';
	$blockname = 'nested-blocks';
	$fullname  = $namespace.'/'.$blockname;
	
	// Automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ).$blockname.'/index.asset.php' );
	
	// Register block script
	wp_register_script(
		$fullname,
		plugins_url( $blockname.'/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	
	// Register block
	register_block_type( $fullname, [
		'editor_script' => $fullname,
	]);
}
