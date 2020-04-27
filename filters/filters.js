

// Filters
// ------------------------------

// Use 'blocks.registerBlockType' to extend the default definition of a block
function addListBlockClassName( settings, name ) {
	if( name !== 'core/list' ) {
		return settings;
	}
	return lodash.assign( {}, settings, {
		supports: lodash.assign( {}, settings.supports, {
			className: true,
		} ),
	} );
}
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'namespace/class-names/list-block',
	addListBlockClassName
);


// Disable Blocks
// ------------------------------

// With a black-list
/*
wp.domReady(function(){
	var disallowedBlocks = [
		'core/latest-posts',
		'core/rss',
		'core/tag-cloud',
		'core/search',
		'core/calendar',
		'core/social-links',
		'core/archives',
		'core/categories',
		'core/shortcode',
		'core/latest-comments',
	];
	disallowedBlocks.forEach(function( blockName ){
		wp.blocks.unregisterBlockType( blockName );
	});
});
*/

// With a white-list
/*
wp.domReady(function(){
	var allowedBlocks = [
		'core/columns',
		'core/column',
		'core/paragraph',
		'core/image',
		'core/html',
		'core/freeform',
	];
	wp.blocks.getBlockTypes().forEach(function( blockType ){
		if( allowedBlocks.indexOf( blockType.name ) === -1 ) {
			wp.blocks.unregisterBlockType( blockType.name );
		}
	});
});
*/


// More…
// ------------------------------
// For a more detailed list of available filters check out
// https://developer.wordpress.org/block-editor/developers/filters/block-filters/
