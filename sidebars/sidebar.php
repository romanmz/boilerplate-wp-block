<?php


add_action( 'init', 'sidebar_plugin_register' );
function sidebar_plugin_register() {
	
	// Register assets
	wp_register_script(
		'plugin-sidebar-js',
		plugins_url( 'sidebar.js', __FILE__ ),
		['wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-compose']
	);
	wp_register_style(
		'plugin-sidebar-css',
		plugins_url( 'sidebar.css', __FILE__ )
	);
	
	// Register meta fields
	register_post_meta( 'post', 'sidebar_plugin_meta_block_field', [
		'type'         => 'string',
		'single'       => true,
		'show_in_rest' => true,
	]);
}

add_action( 'enqueue_block_assets', 'sidebar_plugin_style_enqueue' );
function sidebar_plugin_style_enqueue() {
	wp_enqueue_style( 'plugin-sidebar-css' );
}

add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );
function sidebar_plugin_script_enqueue() {
	wp_enqueue_script( 'plugin-sidebar-js' );
}
