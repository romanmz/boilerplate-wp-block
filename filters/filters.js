

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


// Custom SVG's for block categories
// ------------------------------
(function(){
	var el = wp.element.createElement;
	var SVG = wp.primitives.SVG;
	var circle = el( 'circle', { cx: 10, cy: 10, r: 10, fill: 'red', stroke: 'blue', strokeWidth: '10' } );
	var svgIcon = el( SVG, { width: 20, height: 20, viewBox: '0 0 20 20'}, circle);
	wp.blocks.updateCategory( 'my-category', { icon: svgIcon } );
})();


// More…
// ------------------------------
// For a more detailed list of available filters check out
// https://developer.wordpress.org/block-editor/developers/filters/block-filters/
