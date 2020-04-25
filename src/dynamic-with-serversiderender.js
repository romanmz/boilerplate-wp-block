
// Dynamic Block using the <ServerSideRender> component
// ------------------------------
// Server-side render is meant as a fallback; client-side rendering in JavaScript is always preferred (client rendering is faster and allows better editor manipulation).

import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';


registerBlockType( 'namespace/dynamic-with-serversiderender', {
	title: 'Sample Dynamic Block with ServerSideRender',
	icon: 'megaphone',
	category: 'widgets',
	edit: function( props ) {
		return (
			<ServerSideRender
				block="namespace/dynamic-with-serversiderender"
				attributes={ props.attributes }
			/>
		);
	},
} );
