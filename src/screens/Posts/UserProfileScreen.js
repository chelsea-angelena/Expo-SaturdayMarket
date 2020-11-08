import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import * as db from '../../config/firebaseConfig';
import { Divider, Icon, Card, ListItem, Avatar } from 'react-native-elements';
import colors from '../../styles/colors';
import UsersList from './UsersList';

export default function UserProfileScreen(props) {
	const profileID = props.route.params.profileID;
	const [userData, setUserData] = useState({});
	const [error, setError] = useState(null);

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
	if (!userData) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					flexDirection: 'row',
					justifyContent: 'space-around',
					padding: 10,
				}}
			>
				<ActivityIndicator color='blue' size='large' />
			</View>
		);
	}
	return (
		<ScrollView>
			<View style={styles.view}>
				<View style={styles.wrapper}>
					<Card style={styles.container}>
						<View style={styles.image}>
							<Avatar
								rounded
								size='xlarge'
								source={{ uri: userData.photoURL }}
							/>
						</View>
						<Card.Title style={{ marginTop: 24 }}>
							{userData.displayName}
						</Card.Title>
						<ListItem.Subtitle style={{ alignSelf: 'center', padding: 8 }}>
							{userData.email}
						</ListItem.Subtitle>
						{userData.phoneNumber ? (
							<ListItem.Subtitle style={{ padding: 8 }}></ListItem.Subtitle>
						) : null}
						{userData.phoneNumber}

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
									Posts By:
								</ListItem.Subtitle>
								<Card.Title>{userData.displayName}</Card.Title>
							</View>

							<UsersList authorID={profileID} />
						</View>
					</Card>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
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
		justifyContent: 'center',
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
