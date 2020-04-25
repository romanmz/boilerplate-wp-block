import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'namespace/blockname', {
	title: 'Sample Block',
	icon: 'smiley',
	category: 'layout',
	edit: () => <div>Hola, mundo!</div>,
	save: () => <div>Hola, mundo!</div>,
} );
