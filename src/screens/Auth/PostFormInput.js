import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FormInput = ({
	iconName,
	iconColor,
	returnKeyType,
	name,
	keyboardType,
	placeholder,
	...rest
}) => (
	<View style={styles.inputContainer}>
		<Input
			{...rest}
			leftIcon={
				<Ionicons
					name={iconName}
					style={styles.iconStyle}
					size={28}
					color={iconColor}
				/>
			}
			keyboardType={keyboardType}
			placeholderTextColor='grey'
			name={name}
			placeholder={placeholder}
			style={styles.input}
		/>
	</View>
);

const styles = StyleSheet.create({
	inputContainer: {
		margin: 15,
	},
	iconStyle: {
		marginRight: 10,
	},
});

export default FormInput;
