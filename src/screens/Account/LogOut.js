import React from 'react';
import { Dimensions, View, ImageBackground } from 'react-native';
import FormButton from '../../screens/Auth/FormButton';
import * as db from '../../config/firebaseConfig';

import colors from '../../styles/colors';

const windowHeight = Dimensions.get('window').height;

export default function LogOut() {
	return (
		<ImageBackground
			alt='theatre'
			style={{ resizeMode: 'contain', height: windowHeight }}
			source={require('../../assets/splash.png')}
		>
			<View
				style={{
					alignSelf: 'center',
					justifyContent: 'flex-end',
					height: '75%',
					width: 300,
				}}
			>
				<FormButton
					buttonType='outline'
					title='Log Out'
					onPress={() => db.signOut()}
					buttonColor={colors.black}
					style={{ backgroundColor: colors.white }}
				/>
			</View>
		</ImageBackground>
	);
}
