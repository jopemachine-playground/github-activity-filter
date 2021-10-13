import {h} from 'dom-chef';

const outerContainer = {
	display: 'flex',
	flexDirection: 'row',
	position: 'relative'
};

const innerContainer = {
	marginTop: 12,
	position: 'absolute',
	display: 'flex',
	flexDirection: 'row',
	right: 0
};

const closeButton = {
	position: 'absolute', width: 13, height: 13, right: 11, top: 10
};

const typeSelector = {
	width: 75,
	marginRight: 8,
	borderRadius: 6,
	height: 32
};

const input = {
	width: 224,
	borderRadius: 6,
	height: 32
};

export {
	closeButton,
	innerContainer,
	input,
	outerContainer,
	typeSelector
};
