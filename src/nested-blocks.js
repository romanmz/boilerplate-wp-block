import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';


// A single block can only contain one 'InnerBlock' component
const ALLOWED_BLOCKS = ['core/image', 'core/paragraph'];
const MY_TEMPLATE = [
	['core/image', {}],
	['core/heading', {placeholder: 'Book Title'}],
	['core/paragraph', {placeholder: 'Summary'}],
];

registerBlockType( 'namespace/nested-blocks', {
	title: 'Sample Nested Blocks',
	icon: 'smiley',
	category: 'layout',
	// use 'parent' to allow this block only as a child of the given blocks
	// parent: ['core/column'],
	description: __( 'Block description.' ),
	edit: ( { className } ) => {
		return (
			<div className={ className }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ MY_TEMPLATE }
					templateLock="insert"
				/>
			</div>
		);
	},
	save: ( { className } ) => {
		return (
			<div className={ className }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
