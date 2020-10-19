import React from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const FormInput = ({
	iconName,
	iconColor,
	returnKeyType,
	keyboardType,
	name,
	placeholder,
	...rest
}) => (
	<View style={styles.inputContainer}>
		<Input
			{...rest}
			leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
			leftIconContainerStyle={{ marginRight: 15 }}
			placeholderTextColor='grey'
			name={name}
			placeholder={placeholder}
			style={styles.input}
		/>
	</View>
);

export const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
	<Button
		{...rest}
		type={buttonType}
		title={title}
		buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
		titleStyle={{ color: buttonColor }}
	/>
);



export const ErrorMessage = ({ errorValue }) => (
	<View style={styles.container}>
		<Text style={styles.errorText}>{errorValue}</Text>
	</View>
);

const styles = StyleSheet.create({
	inputContainer: {
		margin: 10,
	},
	iconStyle: {
		marginRight: 10,
	},
	container: {
		marginLeft: 25,
	},
	errorText: {
		color: 'red',
	},
});
