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
		<Screen>
			<ImageBackground
				alt='theatre'
				style={{ resizeMode: 'cover', height: windowHeight }}
				source={{
					uri:
						'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
				}}
			>
				<View style={styles.innerView}>
					<AppText style={styles.goodbye}>{goodByeText.text}</AppText>
					<FormButton
						buttonType='outline'
						title='Log Out'
						onPress={() => db.signOut()}
						buttonColor={colors.white}
						backgroundColor={colors.red}
					/>
				</View>
			</ImageBackground>
		</Screen>
	);
}

const styles = StyleSheet.create({
	goodbye: {
		color: colors.white,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 64,
		marginBottom: 64,
	},
	innerView: {
		maxWidth: 500,
		minWidth: 320,
		width: '100%',

		alignSelf: 'center',
		backgroundColor: 'rgba(0,0,0,.5)',
		padding: 32,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
});
