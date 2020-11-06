import React, { useContext } from 'react';
import {
	StyleSheet,
	Dimensions,
	View,
	ImageBackground,
	Text,
	Platform,
} from 'react-native';
import FormButton from '../../screens/Auth/FormButton';
import * as db from '../../config/firebaseConfig';
import AppText from '../../Atoms/Text';
import colors from '../../styles/colors';
import Screen from '../../screens/Auth/Screen';
import { AuthContext } from '../../Context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const goodByeText = {
	text: 'Thanks for using the Market-App!',
};

export default function LogOut() {
	const user = useContext(AuthContext);
	return (

			<ImageBackground
				alt='theatre'
				style={{ resizeMode: 'contain', height: windowHeight }}
				source={require('../../assets/splash.png')}
			>
				<AppText style={styles.goodbye}>{goodByeText.text}</AppText>
				<FormButton
					buttonType='outline'
					title='Log Out'
					onPress={() => db.signOut()}
					buttonColor={colors.black}
					backgroundColor={colors.white}
				/>
			</ImageBackground>

	);
}

const styles = StyleSheet.create({
	goodbye: {
		color: colors.onyx,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 64,
		marginBottom: 64,
	},
	// innerView: {
	// 	maxWidth: 500,
	// 	minWidth: 320,
	// 	width: '100%',
	// 	height: 600,
	// 	justifyContent: 'space-between',
	// 	alignSelf: 'center',

	// 	padding: 32,
	// 	fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	// },
});
