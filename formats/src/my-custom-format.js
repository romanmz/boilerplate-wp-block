import { compose, ifCondition } from '@wordpress/compose';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';


const MyCustomButton = props => {
	return <RichTextToolbarButton
		icon='editor-code'
		title='Sample output'
		onClick={ () => {
			props.onChange( toggleFormat(
				props.value,
				{ type: 'namespace/sample-output' }
			) );
		} }
		isActive={ props.isActive }
	/>
};


// Use 'withSelect' and 'ifCondition' to show the button only for specific blocks
const ConditionalButton = compose(
	withSelect( function( select ) {
		return {
			selectedBlock: select( 'core/editor' ).getSelectedBlock(),
		}
	} ),
	ifCondition( function( props ) {
		return (
			props.selectedBlock &&
			props.selectedBlock.name === 'core/paragraph'
		);
	} )
)( MyCustomButton );


registerFormatType(
	'namespace/sample-output',
	{
		title: 'Sample Output',
		tagName: 'samp',
		className: null,
		edit: ConditionalButton,
	}
);
