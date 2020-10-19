import React from 'react';
import { Button } from 'react-native-elements';

const PostFormButton = ({
	title,
	buttonType,
	disabledStyle,
	disabledTitleStyle,
	disabledColor,
	disabledBackgroundColor,
	buttonColor,
	...rest
}) => (
	<Button
		{...rest}
		type={buttonType}
		title={title}
		disabledStyle={{ backgroundColor: disabledBackgroundColor }}
		disabledTitleStyle={{ color: disabledColor }}
		buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
		titleStyle={{ color: buttonColor }}
	/>
);

export default PostFormButton;
