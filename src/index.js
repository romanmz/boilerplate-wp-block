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
