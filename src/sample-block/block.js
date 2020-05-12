// Import CSS
import('./style.scss').catch(()=>{});
import('./editor.scss').catch(()=>{});


// Sample Block
// ------------------------------
import { registerBlockType, registerBlockCollection } from '@wordpress/blocks';
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';


// i18n
// ------------------------------
// Make sure you also set the PHP hooks
import { __ } from '@wordpress/i18n';
// __( string, text-domain )
// _n( singular-string, plural-string, number, text-domain )
// _x( string, context, text-domain )


// Block Registration
// ------------------------------
// https://developer.wordpress.org/block-editor/developers/block-api/block-registration

registerBlockCollection( 'namespace', { title: 'My Namespace', icon: 'smiley' } );
registerBlockType( 'namespace/blockname', {
	title: 'Sample Block',
	category: 'layout',
	// optionals:
	icon: 'smiley',
	/*
	description: __( 'Block description.' ),
	keywords: [ __( 'image' ), __( 'photo' ), __( 'pics' ) ],
	styles: [
		{
			name: 'default',
			label: __( 'Rounded' ),
			isDefault: true
		},
		{
			name: 'outline',
			label: __( 'Outline' )
		},
		{
			name: 'squared',
			label: __( 'Squared' )
		},
	],
	
	// attributes
	types:
		null
		boolean
		object
		array
		number
		string
		integer
	source:
		attribute
		text
		html
		query
		meta
	selector: 'img',
	attribute: 'src',
	multiline: 'p', // ???
	query: {}
	meta: 'author'
	default: 'default value'
	*/
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
	// Toggle editor features
	supports: {
		align: false,
		alignWide: false,
		anchor: false,
		customClassName: true,
		className: true,
		html: true,
		inserter: true,
		multiple: true,
		reusable: true,
	},
	// shown on the preview panel when inserting blocks from the top toolbar
	example: {
		attributes: {
			content: 'Hello World',
			alignment: 'center',
		},
	},
	// Transform the block to/from other blocks, shortcodes, regular expressions, files, or raw DOM nodes
	// transforms: {},
	
	// use 'parent' to allow this block only as a child of the given blocks
	// parent: ['core/column'],
	edit: ( props ) => {
		// Props:
		// attributes
		// className is added automatically on 'save', but not on 'edit'
		// isSelected
		// setAttributes()	// for objects and arrays always create a new copy of the variable before passing it for updates
		// …others
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
					// RichText elements allow you to output the actual markup for the block with an 'contenteditable' attribute,
					// instead of regular input or textarea elements, this makes it easier to style the blocks so they look the same on the editor as in the frontend
					tagName="p"
					className={ className }
					placeholder={ __( 'Placeholder text…', 'namespace' ) }
					value={ content }
					allowedFormats={['core/bold', 'core/italic']}
					onChange={ onChangeContent }
					//
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
				//
				className={ `gutenberg-examples-align-${ props.attributes.alignment }` }
			/>
		);
	},
	// deprecated:
	// Add a 'deprecated' property to add information of deprecated versions of the block
	// As well as migration functions to allow users to seamlessly update the markup to the latest version
	// https://developer.wordpress.org/block-editor/developers/block-api/block-deprecation/
} );
