import React from 'react';
import { Alert, Image, StyleSheet, View, Text } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import colors from '../styles/colors';
import { useFonts } from 'expo-font';

const Logo = ({ title, subtitle }) => {
	return (
		<View style={styles.view}>
			<Image
				source={require('../assets/18.png')}
				alt='Street Market Logo'
				style={styles.logo}
			/>
		</View>
	);
};

export default Logo;

const styles = StyleSheet.create({
	logo: {

		marginTop: 16,
		marginLeft: 25,
		height: 250,
		width: 400,
		backgroundColor: colors.white,
	},
	view: {
		width: '100%',
		height: 275,
		alignItems: 'center',
		justifyContent: 'flex-start',
		alignSelf: 'center',
		backgroundColor: colors.white,
	},
});
