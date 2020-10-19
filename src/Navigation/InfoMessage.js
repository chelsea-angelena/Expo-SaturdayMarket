import React, { useState, useEffect } from 'react';
import {
	TouchableOpacity,
	ScrollView,
	View,
	Text,
	StyleSheet,
	ImageBackground,
} from 'react-native';

import { ListItem, Card, Overlay, Button, Icon } from 'react-native-elements';
import colors from '../styles/colors';
import AppText from '../Atoms/Text';
import { useNavigation } from '@react-navigation/native';

const blurb = {
	paragraphOne:
		'This is a social gathering place for people to get together to sell their handcrafted goods and locally produced items - much like you would see at the Farmers Market',
	paragraphTwo:
		'Update your profile information to help get acquianted with everyone. This is found in the account screen.',
	paragraphThree: 'Look through the list of posts and save your favorites!',
	paragraphFour:
		'Go to the New Post form to upload photos and post the item you are selling',
};

const InfoMessage = ({ toggleOverlay }) => {
	return (
		<Card containerStyle={{ width: 320, height: 500 }} wrapperStyle={{}}>
			<Card.Title>
				<AppText style={styles.title}>Welcome to Saturday Market!</AppText>
			</Card.Title>
			<ListItem.Subtitle>
				<AppText>{blurb.paragraphOne}</AppText>
				<AppText>{blurb.paragraphTwo}</AppText>
				<AppText>{blurb.paragraphThree}</AppText>
				<AppText>{blurb.paragraphFour}</AppText>
			</ListItem.Subtitle>
			<Icon
				name='chevron-down'
				color='black'
				size={24}
				type='material-community'
				onPress={toggleOverlay}
			/>
		</Card>
	);
};

export default InfoMessage;

const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '100%',
		height: '80%',
	},
	buttonView: {
		alignSelf: 'center',
	},
	button: {
		width: 200,
		borderRadius: 400,
		borderColor: colors.onyx,
		borderWidth: 1,
	},
	buttonTitle: {
		color: colors.onyx,
	},
	title: {
		fontSize: 32,
		color: colors.onyx,
	},
	row: {
		flexDirection: 'row',
		marginTop: 24,
	},
});
