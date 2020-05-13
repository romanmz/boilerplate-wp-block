const getAllInstances = () => {
	const blockInstances = document.querySelectorAll( '.wp-block-namespace-blockname' );
	blockInstances.forEach( blockInstance => {
		console.log( blockInstance );
	});
}

document.addEventListener( 'DOMContentLoaded', getAllInstances );
