(function( wp ) {
	var registerPlugin = wp.plugins.registerPlugin;
	var PluginSidebar = wp.editPost.PluginSidebar;
	var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem; // this line is added
	var Fragment = wp.element.Fragment; // this line is added
	var el = wp.element.createElement;
	var Text = wp.components.TextControl;
	var withSelect = wp.data.withSelect;
	var withDispatch = wp.data.withDispatch;
	var compose = wp.compose.compose;
	
	
	// Getting meta data
	// ------------------------------
	
	// Current data from the post, as is in the database
	// wp.data.select( 'core/editor' ).getCurrentPost().meta['sidebar_plugin_meta_block_field'];
	
	// Current data from the post, as is currently in the editor
	// wp.data.select( 'core/editor' ).getPostEdits().meta['sidebar_plugin_meta_block_field'];
	// wp.data.select( 'core/editor' ).getEditedPostAttribute('meta')['sidebar_plugin_meta_block_field'];
	
	// wp.data.withSelect()
	// First function receives the 'wp.data.select()' function so you can query the rest api and return a data object
	// -- the 2nd argument is UI elements own properties
	// Second function takes that data and returns an element updated with that data
	// So together what it does is bind the source data to an object,
	// and returns a dynamic object that will be automatically updated every time the data (from the 'store') changes
	
	
	// Updating meta data
	// --------------------
	
	// wp.data.dispatch().editPost() allows you to update the data 'store', e.g:
	// wp.data.dispatch( 'core/editor' ).editPost({ meta: { sidebar_plugin_meta_block_field: 'hello world!' } });
	
	// wp.data.withDispatch()
	// Works in a similar way as withSelect(), but receives 'wp.data.dispatch()' to define actions to be done to/with the data store
	
	
	// Putting everything together
	// --------------------
	
	// !!! I need to double check but I think the wp.data.dispatch() method only updates the data on memory, not the data in the actual mysql database
	// the reason why it automatically saves the data to the database on submit is because:
	// 1. The meta key name has been registered using the PHP register_post_meta() method
	// 2. The dispatch().editPost method is saving the changes to the 'meta' property with the correct meta key name
	// 3. The editor is already setup so that the data will be saved automatically on submit based on the current 'store' data
	// 4. The field that displays the data is not actually mapped directly to the meta key (I thought that at first),
	//    but rather it's just keeping itself in sync with the 'store' data
	
	// wp.compose.compose() lets you concatenate functions and return a single final object,
	// which then you can pass to the chained callback to generate and return the final dynamic UI element
	var MetaBlockField = compose(
		withSelect(function( select, props ) {
			return {
				metaFieldValue: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ props.fieldName ],
			};
		}),
		withDispatch(function( dispatch, props ) {
			return {
				setMetaFieldValue: function( value ) {
					dispatch( 'core/editor' ).editPost({
						meta: { [ props.fieldName ]: value }
					});
				},
			};
		}),
	)(function( props ) {
		return el( Text, {
			label: 'Meta Block Field',
			value: props.metaFieldValue,
			onChange: function( content ) {
				props.setMetaFieldValue( content );
			},
		});
	});
	
	
	// Sidebar
	// ------------------------------
	registerPlugin( 'my-sidebar', {
		render: function() {
			return el(
				Fragment,
				{},
				el(
					PluginSidebarMoreMenuItem,
					{
						target: 'my-plugin-sidebar',
					},
					'My Plugin Sidebar'
				),
				el( PluginSidebar,
					{
						name: 'my-plugin-sidebar',
						icon: 'admin-post',
						title: 'My plugin sidebar',
					},
					el( 'div',
						{className: 'plugin-sidebar-content'},
						el( MetaBlockField, {fieldName: 'sidebar_plugin_meta_block_field'} )
					),
				),
			);
		},
	});
	
})( window.wp );
