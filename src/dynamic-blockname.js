
// Dynamic Block
// ------------------------------
import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';


registerBlockType( 'namespace/dynamic-blockname', {
	title: 'Sample Dynamic Block',
	icon: 'megaphone',
	category: 'widgets',
	edit: withSelect( ( select ) => {
		return {
			posts: select( 'core' ).getEntityRecords( 'postType', 'post' ),
		};
	} )( ( { posts, className } ) => {
		if( !posts ) {
			return 'Loading…';
		}
		if( posts && posts.length === 0 ) {
			return 'No posts';
		}
		const post = posts[0];
		return <a className={ className } href={ post.link }>
			{ post.title.rendered }
		</a>;
	} ),
	// save function not necessary, returns null as the rendering is performed on the server-side
	// you can also choose to save some placeholder or cached data, in case the plugin gets disabled but the post still needs to show some content
} );
