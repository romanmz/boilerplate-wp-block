<?php

// if the meta box doesn't work: add
// '__block_editor_compatible_meta_box' => false,
// to the list of settings on add_meta_box()
// if you omit this setting then it defaults to true

// After you've specifically converted a metabox into a block, you can disable the original meta box as deprecated with:
// '__back_compat_meta_box' => true,
// that way it will only be shown on the classic editor for backward compatibility


// Register custom meta tag field
add_action( 'init', 'namespace_register_post_meta' );
function namespace_register_post_meta() {
	register_post_meta( 'post', 'sample_meta_block_field', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
		// if the meta key name begins with an underscore, then it will be considered a protected field
		// to determine whether users have permission to edit it or not, include an 'auth_callback' parameter
		// 'auth_callback' => function() { return current_user_can( 'edit_posts' ); }
	] );
}

// Register meta block
add_action( 'enqueue_block_editor_assets', 'namespace_meta_block_init' );
function namespace_meta_block_init() {
	
	// Variables
	$namespace = 'namespace';
	$blockname = 'meta-block';
	$fullname  = $namespace.'/'.$blockname;
	
	// Automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ).$blockname.'/index.asset.php' );
	
	// Register block script
	wp_enqueue_script(
		$fullname,
		plugins_url( $blockname.'/index.js', __FILE__ ),
        $asset_file['dependencies'],
		$asset_file['version']
    );
}
