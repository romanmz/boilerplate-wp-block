import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';


registerBlockType( 'namespace/meta-block', {
	title: 'Sample Meta Block',
	icon: 'smiley',
	category: 'common',
	attributes: {
		metaValue: {
			type: 'string',
			source: 'meta',
			meta: 'sample_meta_block_field',
		},
	},
	edit({ className, setAttributes, attributes }) {
		function updateBlockValue( metaValue ) {
			setAttributes({ metaValue });
		}
		return (
			<div className={ className }>
				<TextControl
					label="Meta Block Field"
					value={ attributes.metaValue }
					onChange={ updateBlockValue }
				/>
			</div>
		);
	},
	// No information saved to the block
	// Data is saved to post meta via attributes
	save() {
		return null;
	},
} );
