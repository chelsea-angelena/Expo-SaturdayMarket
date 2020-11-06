import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import * as db from '../../config/firebaseConfig';
import { UserContext } from '../../../App';
import {
	Divider,
	Icon,
	Button,
	Overlay,
	Card,
	ListItem,
	Avatar,
} from 'react-native-elements';
import colors from '../../styles/colors';
import MaterialCommunityIcon from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useSWR from 'swr';
import UsersList from './UsersList';
// import Screen from '../../Atoms/Screen';

export default function UserProfileScreen(props, { route, navigation }) {
	const [visible, setVisible] = useState(false);
	const profileID = props.route.params.profileID;
	console.log(profileID);
	// const { data: userData, error } = useSWR(profileID, db.getUserProfile);
	const [userData, setUserData] = useState({});
	const [error, setError] = useState(null);
	const toggleOverlay = () => {
		setVisible(!visible);
	};

	const getUser = async () => {
		try {
			let result = await db.getProfileDoc(profileID);
			let data = result[0];
			setUserData(data);
		} catch (e) {
			setError(e);
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	return (
		<ScrollView>
			<View style={styles.view}>
				<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
					<Avatar rounded size='xlarge' source={{ uri: userData.photoURL }} />

					<Card.Title style={{ marginTop: 24 }}>
						{userData.displayName}
					</Card.Title>
					<ListItem.Subtitle style={{ padding: 8 }}>
						{userData.email}
					</ListItem.Subtitle>
					{userData.phoneNumber ? (
						<ListItem.Subtitle style={{ padding: 8 }}></ListItem.Subtitle>
					) : null}
					{userData.phoneNumber}
					<Divider />
					<View>
						<View>
							<Divider
								style={{
									margin: 24,
									width: 300,
									padding: 0.5,
									backgroundColor: colors.drab,
								}}
							/>
							<ListItem.Subtitle style={{ alignSelf: 'center', padding: 8 }}>
								Click to see more posts from
							</ListItem.Subtitle>
							<Card.Title>{userData.displayName}</Card.Title>
							<Icon
								type='material-community'
								color='black'
								size={32}
								name='chevron-down'
								onPress={toggleOverlay}
							/>
						</View>
						{/* {/*
						<Overlay
							fullScreen={false}
							animationType='slide'
							isVisible={visible}
							transparent={true}
							onBackdropPress={toggleOverlay}
						> */}
						 <UsersList authorID={profileID} />
					</View>
				</Card>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 200,
		alignSelf: 'center',
	},

	wrapper: {
		width: '100%',
		alignItems: 'center',
		alignSelf: 'center',
		paddingBottom: 64,
		marginBottom: 64,
	},
	container: {
		width: '100%',
		alignItems: 'center',
		alignSelf: 'center',
		paddingBottom: 64,
		marginBottom: 64,
	},
	socialRow: {
		flexDirection: 'row',
	},
	buttonText: {
		width: 300,
		height: 100,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
		paddingTop: 16,
		borderWidth: 2,
		borderColor: colors.yellow,
	},
});
