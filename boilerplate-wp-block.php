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
	
	// Register stylesheets
	wp_register_style(
		'namespace-blockname-editor',
		plugins_url( 'build/editor.css', __FILE__ ),
		['wp-edit-blocks'],
		filemtime( plugin_dir_path( __FILE__ ).'build/editor.css' )
	);
	wp_register_style(
		'namespace-blockname',
		plugins_url( 'build/style.css', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ).'build/style.css' )
	);
	
	// Register block
	register_block_type( 'namespace/blockname', [
		// ! for both frontend and editor:
		'style'         => 'namespace-blockname',
		// script
		
		// ! for editor only:
		'editor_style'  => 'namespace-blockname-editor',
		'editor_script' => 'namespace-blockname',
	]);
	
}
