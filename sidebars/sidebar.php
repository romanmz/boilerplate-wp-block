<?php


add_action( 'init', 'sidebar_plugin_register' );
function sidebar_plugin_register() {
	wp_register_script(
		'plugin-sidebar-js',
		plugins_url( 'sidebar.js', __FILE__ ),
		['wp-plugins', 'wp-edit-post', 'wp-element']
	);
}


add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );
function sidebar_plugin_script_enqueue() {
	wp_enqueue_script( 'plugin-sidebar-js' );
}
