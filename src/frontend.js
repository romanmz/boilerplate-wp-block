

// General
// ------------------------------
document.onreadystatechange = () => {
	switch( document.readyState ) {
		case 'loading':
			console.log( 'Page loading…' );
			break;
		case 'interactive':
			console.log( 'DOM ready!' );
			break;
		case 'complete':
			console.log( 'Page loaded!' );
			break;
	}
}


// Blocks
// ------------------------------
import './sample-block/frontend.js';

