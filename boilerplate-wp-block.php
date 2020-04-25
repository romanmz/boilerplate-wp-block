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
	
	
	// Register dynamic block
	// ------------------------------
	// !! not sure if it's appropiate to register multiple blocks with the same .js and .css files
	register_block_type( 'namespace/dynamic-blockname', [
		'editor_script'   => 'namespace-blockname',
		'render_callback' => 'namespace_dynamic_blockname_render',
	]);
	
	
	// Register dynamic block using ServerSideRender
	// ------------------------------
	register_block_type( 'namespace/dynamic-with-serversiderender', [
		'editor_script'   => 'namespace-blockname',
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


// Block created using WP-CLI
// ------------------------------
// Command used: wp scaffold block wpcli-block --title="Sample WP-CLI block" --dashicon="video-alt3" --category="widgets" --plugin=boilerplate-wp-block
// Docs: https://developer.wordpress.org/cli/commands/scaffold/block/
// Files generated automatically
// PHP need to be manually loaded here
// JS is generated as ES5, not ESNext
require_once 'blocks/wpcli-block.php';
