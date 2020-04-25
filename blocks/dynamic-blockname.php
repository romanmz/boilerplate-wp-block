<?php

add_action( 'init', 'namespace_dynamic_blockname_init' );
function namespace_dynamic_blockname_init() {
	
	// Automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ).'dynamic-blockname/index.asset.php' );
	
	// Register block script
	wp_register_script(
		'namespace-dynamic-blockname',
		plugins_url( 'dynamic-blockname/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
	
	// Register block
	register_block_type( 'namespace/dynamic-blockname', [
		'editor_script'   => 'namespace-dynamic-blockname',
		'render_callback' => 'namespace_dynamic_blockname_render',
	]);
}

function namespace_dynamic_blockname_render( $attributes, $content ) {
	$recent_posts = wp_get_recent_posts([
		'numberposts' => 1,
		'post_status' => 'publish',
	]);
	if( empty( $recent_posts ) ) {
		return 'No posts';
	}
	$post = $recent_posts[0];
	$post_id = $post['ID'];
	return sprintf(
		'<a class="wp-block-namespace-dynamic-blockname" href="%1$s">%2$s</a>',
		esc_url( get_permalink( $post_id ) ),
		esc_html( get_the_title( $post_id ) )
	);
}
