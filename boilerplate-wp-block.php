<?php
/*
Plugin Name: Boilerplate for Gutenberg blocks
*/

add_action( 'init', 'namespace_register_blockname' );
function namespace_register_blockname() {
	
	// Automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ).'build/index.asset.php' );
	
	// Register block script
	wp_register_script(
		'namespace-blockname',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	
	// Register block
	register_block_type( 'namespace/blockname', [
		// ! for both frontend and editor:
		// script
		// style
		
		// ! for editor only:
		// editor_script
		// editor_style
		'editor_script' => 'namespace-blockname',
	]);
	
}
