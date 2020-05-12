<?php
/*
Plugin Name: Boilerplate for Gutenberg blocks
*/


// Load assets
// ------------------------------
add_action( 'enqueue_block_assets', 'pluginname_block_assets' );
function pluginname_block_assets() {
	wp_enqueue_style(
		'pluginname-blocks',
		plugins_url( 'build/style.css', __FILE__ ),
		['wp-editor'], // ???
		filemtime( plugin_dir_path( __FILE__ ).'build/style.css' )
	);
}

add_action( 'enqueue_block_editor_assets', 'pluginname_block_editor_assets' );
function pluginname_block_editor_assets() {
	$assets = include( plugin_dir_path( __FILE__ ).'build/index.asset.php' );
	wp_enqueue_script(
		'pluginname-blocks-editor',
		plugins_url( 'build/index.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version']
	);
	wp_enqueue_style(
		'pluginname-blocks-editor',
		plugins_url( 'build/editor.css', __FILE__ ),
		['wp-edit-blocks', 'pluginname-blocks'],
		filemtime( plugin_dir_path( __FILE__ ).'build/editor.css' )
	);
}



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


// i18n
// ------------------------------
add_action( 'init', 'myguten_set_script_translations' );
function myguten_set_script_translations() {
	// The third argument is optional, it should point to your local languages folder if you're providing your own translations
	// WordPress looks for files with these names:
	// ${textdomain}-${locale}-${scripthandle}.json
	// ${textdomain}-${locale}-${md5}.json
	wp_set_script_translations( 'scripthandle', 'textdomain', plugin_dir_path( __FILE__ ).'languages' );
}

// Providing your own translations:
// you usually store them on a root 'languages' folder

// 1. Create the main .pot file
// using wp-cli, run from the root folder:
// $ wp i18n make-pot ./ languages/textdomain.pot

// 2. Create .po files for each language
// $ cp textdomain.pot textdomain-locale.po

// 3. Do the translations (either manually or with a tool like https://poedit.net)

// 4. Convert the .po files into .json files
// $ wp i18n make-json textdomain-locale.po --no-purge


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

add_action( 'enqueue_block_assets', 'namespace_load_assets' );
function namespace_load_assets() {
	wp_enqueue_style( 'namespace-blocks', plugins_url( 'editor/style.css', __FILE__ ) );
}

add_action( 'enqueue_block_editor_assets', 'namespace_load_editor_assets' );
function namespace_load_editor_assets() {
	wp_enqueue_script( 'namespace-blocks-editor', plugins_url( 'editor/editor.js', __FILE__ ), ['wp-blocks'] );
}

// To unregister styles, you need to ensure the script runs after the initial registration,
// to do this we enqueue after wp-edit-post and use the wp.domReady() function
add_action( 'enqueue_block_editor_assets', 'namespace_load_editor_assets_last' );
function namespace_load_editor_assets_last() {
	wp_enqueue_script(
		'namespace-blocks-editor-last',
		plugins_url( 'editor/unregister.js', __FILE__ ),
		['wp-blocks', 'wp-dom-ready', 'wp-edit-post'],
		filemtime( plugin_dir_path( __FILE__ ).'editor/unregister.js' )
	);
}

// Using PHP instead of JS
add_action( 'init', 'namespace_register_block_styles' );
function namespace_register_block_styles() {
	register_block_style(
		'core/quote',
		[
			'name'         => 'blue-quote',
			'label'        => __( 'Blue Quote' ),
			'inline_style' => '.wp-block-quote.is-style-blue-quote { color: blue; }',
		]
	);
	
	wp_register_style( 'namespace-custom-block-styles', plugins_url( 'editor/custom-block-styles.css', __FILE__ ) );
	register_block_style(
		'core/quote',
		[
			'name'         => 'red-quote',
			'label'        => 'Red Quote',
			'style_handle' => 'namespace-custom-block-styles',
		]
	);
	
	// Unregistering
	// NOTE: Using this PHP function only lets you unregister styles that were also registered using PHP, but not the ones registered with JS
	//       On JS you can unregister any style
	// unregister_block_style( 'core/quote', 'large' );			// error
	// unregister_block_style( 'core/quote', 'fancy-quote' );	// error
	// unregister_block_style( 'core/quote', 'blue-quote' );
	
}


// Generic filters
// ------------------------------
add_action( 'enqueue_block_editor_assets', 'namespace_register_block_filters' );
function namespace_register_block_filters() {
	wp_register_script(
		'namespace-block-filters',
		plugins_url( 'filters/filters.js', __FILE__ ),
		[
			'wp-hooks',
			'wp-blocks', 'wp-dom-ready', 'wp-edit-post'
		]
	);
}
add_action( 'enqueue_block_editor_assets', 'namespace_load_block_filters' );
function namespace_load_block_filters() {
	wp_enqueue_script( 'namespace-block-filters' );
}


// Unregistering blocks with PHP
// ------------------------------
// There's also a 'unregister_block_type()' function available on PHP,
// but just like with block styles, it only works to unregister block types that were previously registered using PHP
// most block types are registered with JS, so it's kinda pointless to do it with PHP unless it's for managing your own custom block types


// Hiding block types from the inserter
// ------------------------------
// you can, however, just hide blocks from the inserter (without disabling the blocks themselves)
add_filter( 'allowed_block_types', 'namespace_allowed_block_types', 10, 2 );
function namespace_allowed_block_types( $allowed_block_types, $post ) {
	// you can filter by post type if you want
	if( $post->post_type == 'post' ) {
		
		// Using a white-list
		// $allowed_block_types = ['core/paragraph', 'core/heading'];
		
		// Using a black-list
		// you can't really do a black-list here, as $allowed_block_types can also be a boolean 'true' to allow all tags
		// and you can't get a true list of all registered blocks with PHP
	}
	return $allowed_block_types;
}


// Adding/removing block categories
// ------------------------------
add_filter( 'block_categories', 'namespace_block_categories', 10, 2 );
function namespace_block_categories( $categories, $post ) {
	if( $post->post_type == 'post' ) {
		$new_cat = [
			'slug'  => 'my-category',
			'title' => __( 'My category', 'my-plugin' ),
			'icon'  => 'wordpress',
		];
		$insert_at = 1;
		array_splice( $categories, $insert_at, 0, [$new_cat] );
		// !!! note that the category won't show up on the inserter unless it has at least one block type assigned to it
	}
	return $categories;
}


// Meta Boxes
// ------------------------------
require_once 'blocks/meta-block.php';


// Sidebars
// ------------------------------
require_once 'sidebars/sidebar.php';


// Formats
// ------------------------------
require_once 'formats/dist/my-custom-format/index.php';


// Custom post types
// ------------------------------
// To enable the gutenberg editor on custom post types, they need to have the property 'show_in_rest' enabled (the editor relies on the rest api)
// you can also include the 'template' and 'template_lock' properties during register_post_type()


// Reference
// ------------------------------

// Components
// https://developer.wordpress.org/block-editor/components/
// https://wordpress.github.io/gutenberg/

// Data Modules
// https://developer.wordpress.org/block-editor/data/

// Node Packages
// https://developer.wordpress.org/block-editor/packages/


// Other features
// ------------------------------

// Parsers
// https://developer.wordpress.org/block-editor/developers/filters/parser-filters/

// PHP example:
// add_filter( 'the_content', 'namespace_parse_content_blocks' );
function namespace_parse_content_blocks( $content ) {
	if( is_singular( 'post' ) ) {
		global $post;
		$blocks = parse_blocks( $post->post_content );
		dump( $blocks );
	}
	return $content;
}

// Autocomplete filters
// https://developer.wordpress.org/block-editor/developers/filters/autocomplete-filters/

// Accessibility
// https://developer.wordpress.org/block-editor/developers/accessibility/

// Feature flags (WP core, vs Gutenberg plugin)
// https://developer.wordpress.org/block-editor/developers/feature-flags/

// On stand-alone pages
// https://developer.wordpress.org/block-editor/developers/platform/custom-block-editor/


// Experimental features
// ------------------------------

// Annotations
// https://developer.wordpress.org/block-editor/developers/block-api/block-annotations/

// Patterns
// https://developer.wordpress.org/block-editor/developers/block-api/block-patterns/

// Editor Filters
// https://developer.wordpress.org/block-editor/developers/filters/editor-filters/

// Block-based Themes
// https://developer.wordpress.org/block-editor/developers/themes/block-based-themes/
