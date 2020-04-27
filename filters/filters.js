

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


// More…
// ------------------------------
// For a more detailed list of available filters check out
// https://developer.wordpress.org/block-editor/developers/filters/block-filters/
