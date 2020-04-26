<?php

add_action( 'init', 'my_custom_format_script_register' );
function my_custom_format_script_register() {
	$asset_file = include( plugin_dir_path( __FILE__ ).'index.asset.php' );
	wp_register_script(
		'my-custom-format-js',
		plugins_url( 'index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
}

add_action( 'enqueue_block_editor_assets', 'my_custom_format_enqueue_assets_editor' );
function my_custom_format_enqueue_assets_editor() {
	wp_enqueue_script( 'my-custom-format-js' );
}
