<?php

add_action( 'init', 'namespace_blockname_init' );
function namespace_blockname_init() {
	
	// Automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ).'blockname/index.asset.php' );
	
	// Register block script
	wp_register_script(
		'namespace-blockname',
		plugins_url( 'blockname/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	
	// Register stylesheets
	wp_register_style(
		'namespace-blockname-editor',
		plugins_url( 'blockname/editor.css', __FILE__ ),
		['wp-edit-blocks'],
		filemtime( plugin_dir_path( __FILE__ ).'blockname/editor.css' )
	);
	wp_register_style(
		'namespace-blockname',
		plugins_url( 'blockname/style.css', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ).'blockname/style.css' )
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
