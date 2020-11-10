import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';


const Logo = () => {
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
