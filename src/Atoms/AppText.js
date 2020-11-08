import React from 'react';
import AppText from './Text';

import defaultStyles from '../styles/styles';

function Text({ children, style, ...otherProps }) {
	return (
		<AppText style={[defaultStyles.text, style]} {...otherProps}>
			{children}
		</AppText>
	);
}
export default Text;
