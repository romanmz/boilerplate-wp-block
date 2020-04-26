<?php
/*
Plugin Name: Boilerplate for Gutenberg blocks
*/

require_once 'blocks/blockname.php';
require_once 'blocks/dynamic-blockname.php';
require_once 'blocks/dynamic-with-serversiderender.php';


// Block created using WP-CLI
// ------------------------------
// Command used: wp scaffold block wpcli-block --title="Sample WP-CLI block" --dashicon="video-alt3" --category="widgets" --plugin=boilerplate-wp-block
// Docs: https://developer.wordpress.org/cli/commands/scaffold/block/
// Files generated automatically
// PHP need to be manually loaded here
// JS is generated as ES5, not ESNext
require_once 'blocks/wpcli-block.php';


require_once 'blocks/nested-blocks.php';


// Default templates for post types
// ------------------------------
add_action( 'init', 'namespace_register_templates' );
function namespace_register_templates() {
	$post_type_object = get_post_type_object( 'post' );
	$post_type_object->template = [
		['core/paragraph', ['placeholder' => 'Add a root-level paragraph']],
		['core/columns', [], [
			['core/column', [], [
				['core/image', []],
			]],
			['core/column', [], [
				['core/paragraph', ['placeholder' => 'Add a inner paragraph']],
			]],
		]],
	];
	$post_type_object->template_lock = false; // 'all' | 'insert' | false
}


// Modify existing blocks
// ------------------------------

add_action( 'enqueue_block_editor_assets', 'namespace_load_editor_assets' );
function namespace_load_editor_assets() {
	wp_enqueue_script( 'namespace-blocks-editor', plugins_url( 'editor/editor.js', __FILE__ ), ['wp-blocks'] );
}

add_action( 'enqueue_block_assets', 'namespace_load_assets' );
function namespace_load_assets() {
	wp_enqueue_style( 'namespace-blocks', plugins_url( 'editor/style.css', __FILE__ ) );
}


// Meta Boxes
// ------------------------------
require_once 'blocks/meta-block.php';
