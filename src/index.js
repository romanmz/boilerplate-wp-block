import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'namespace/blockname', {
	title: 'Sample Block',
	icon: 'smiley',
	category: 'layout',
	example: {},
	edit({ className }) {
		return <p className={ className }>Hello World, step 2 (from the editor, in green).</p>;
	},
	save() {
		return <p>Hello World, step 2 (from the frontend, in red).</p>;
	},
} );
