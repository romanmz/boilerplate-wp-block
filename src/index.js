import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';


registerBlockType( 'namespace/blockname', {
	title: 'Sample Block',
	icon: 'smiley',
	category: 'layout',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
	},
	example: {
		attributes: {
			content: 'Hello World',
			alignment: 'right',
		},
	},
	edit: ( props ) => {
		const { attributes: { content, alignment }, setAttributes, className } = props;
		const onChangeContent = ( newContent ) => {
			setAttributes( { content: newContent } );
		};
		const onChangeAlignment = ( newAlignment ) => {
			setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
		};
		return (
			<div>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
					// InspectorControls
				}
				<RichText
					tagName="p"
					className={ className }
					onChange={ onChangeContent }
					value={ content }
					style={ { textAlign: alignment } }
				/>
			</div>
		);
	},
	save: ( props ) => {
		return (
			<RichText.Content
				tagName="p"
				value={ props.attributes.content }
				className={ `gutenberg-examples-align-${ props.attributes.alignment }` }
			/>
		);
	},
} );


// Dynamic Block
// ------------------------------

// import { registerBlockType } from '@wordpress/blocks';
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
} );
