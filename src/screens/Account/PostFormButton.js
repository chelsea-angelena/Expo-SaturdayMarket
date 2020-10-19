import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export const PostFormButton = ({
	title,
	buttonType,
	disabledStyle,
	buttonColor,
	...rest
}) => (
	<Button
		{...rest}
		type={buttonType}
		title={title}
		disabledStyle={disabledStyle}
		buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
		titleStyle={{ color: buttonColor }}
	/>
);
