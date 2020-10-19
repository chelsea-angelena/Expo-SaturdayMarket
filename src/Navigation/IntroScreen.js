// import React, { useState, useEffect } from 'react';
// import {
// 	TouchableOpacity,
// 	ScrollView,
// 	View,
// 	Text,
// 	StyleSheet,
// 	ImageBackground,
// } from 'react-native';
// import InfoMessage from './InfoMessage';
// import { ListItem, Card, Overlay, Button, Icon } from 'react-native-elements';
// import colors from '../styles/colors';
// import AppText from '../Atoms/Text';
// import { useNavigation } from '@react-navigation/native';

// export default function IntroScreen() {
// 	const [visible, setIsVisible] = useState(false);
// 	const navigation = useNavigation();

// 	const toggleOverlay = () => {
// 		setIsVisible(!visible);
// 	};

// 	const goToApp = () => {
// 		navigation.replace('MainApp');
// 	};
// 	return (
// 		<ImageBackground
// 			source={require('../assets/splash.png')}
// 			resizeMode='cover'
// 			style={{ width: '100%', height: '100%' }}
// 		>
// 			<View style={styles.view}>
// 				<View style={styles.buttonView}>
// 					<Button
// 						buttonStyle={styles.button}
// 						title='Click Me For Info'
// 						onPress={toggleOverlay}
// 						type='clear'
// 						raised
// 						titleStyle={styles.buttonTitle}
// 					/>
// 				</View>
// 				<Overlay onBackdropPress={toggleOverlay} isVisible={visible}>
// 					<InfoMessage toggleOverlay={toggleOverlay} />
// 				</Overlay>
// 				<TouchableOpacity onPress={goToApp}>
// 					<View style={styles.row}>
// 						<AppText>Skip</AppText>
// 						<Icon
// 							name='chevron-right'
// 							color='black'
// 							size={24}
// 							type='material-community'
// 							onPress={toggleOverlay}
// 						/>
// 					</View>
// 				</TouchableOpacity>
// 			</View>
// 		</ImageBackground>
// 	);
// }
// const styles = StyleSheet.create({
// 	view: {
// 		alignItems: 'center',
// 		justifyContent: 'flex-end',
// 		width: '100%',
// 		height: '80%',
// 	},
// 	buttonView: {
// 		alignSelf: 'center',
// 	},
// 	button: {
// 		width: 200,
// 		borderRadius: 400,
// 		borderColor: colors.onyx,
// 		borderWidth: 1,
// 	},
// 	buttonTitle: {
// 		color: colors.onyx,
// 	},
// 	title: {
// 		fontSize: 32,
// 		color: colors.onyx,
// 	},
// 	row: {
// 		flexDirection: 'row',
// 		marginTop: 24,
// 	},
// });
