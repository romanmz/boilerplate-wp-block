<?php

add_action( 'init', 'namespace_dynamic_with_serversiderender_init' );
function namespace_dynamic_with_serversiderender_init() {
	
	// Automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ).'dynamic-with-serversiderender/index.asset.php' );
	
	// Register block script
	wp_register_script(
		'namespace-dynamic-with-serversiderender',
		plugins_url( 'dynamic-with-serversiderender/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	
	// Register block
	// ! reuses the same callback function from 'dynamic-blockname'
	register_block_type( 'namespace/dynamic-with-serversiderender', [
		'editor_script'   => 'namespace-dynamic-with-serversiderender',
		'render_callback' => 'namespace_dynamic_blockname_render',
	]);
}
