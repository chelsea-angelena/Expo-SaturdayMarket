import React, { useState, useEffect, useContext } from 'react';
import {
	FlatList,
	View,
	ScrollView,
	StyleSheet,
	Text,
	Image,
	Dimensions,
} from 'react-native';
import * as db from '../../config/firebaseConfig';
import { UserContext } from '../../../App';
import {
	Divider,
	Overlay,
	Icon,
	Button,
	Card,
	ListItem,
	Avatar,
	Accessory,
} from 'react-native-elements';
import EditProfile from './EditProfile';
import { AuthContext } from '../../Context/AuthContext.js';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import MyPostsList from './MyPostsList';
import useSWR from 'swr';
import Screen from '../../Atoms/Screen';

export default function ProfileScreen({
	signOut,
	showEdit,
	route,
	onUpdate,
	displayName,
	photoURL,
	email,
	userId,
	setShowEdit,
}) {
	const [myPosts, setMyPosts] = useState([]);
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState(null);
	const [isEditable, setIsEditable] = useState(false);
	const toggleOverlay = () => {
		setVisible(!visible);
	};
	const navigation = useNavigation();

	// const getMyPosts = async () => {
	// 	try {
	// 		let result = await db.getUserPosts(userId);
	// 		if (result.length >= 1) {
	// 			setMyPosts(result);
	// 		} else {
	// 			null;
	// 		}
	// 	} catch (e) {
	// 		setError(e);
	// 	}
	// };
	const logOut = async () => {
		db.signOut();
		navigation.navigate('SignInScreen');
	};

	// useEffect(() => {
	// 	getMyPosts();
	// }, []);edi

	// if (!userId) {
	// 	return <Text>Loading....</Text>;
	// }

	return (
		<ScrollView>
			<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
				{photoURL ? (
					<Avatar rounded size='xlarge' source={{ uri: photoURL }}>
						<Accessory size={24} onPress={() => setShowEdit(true)} />
					</Avatar>
				) : (
					<Avatar
						rounded
						size='x-large'
						icon={{ name: 'user', type: 'font-awesome' }}
						containerStyle={{ backgroundColor: colors.drab }}
						overlayContainerStyle={{ backgroundColor: colors.medGrey }}
					>
						<Accessory
							size={24}
							onPress={() => navigation.navigate('EditProfile')}
						/>
					</Avatar>
				)}

				{showEdit ? <EditProfile onUpdate={onUpdate} /> : null}

				<Card.Title style={{ marginTop: 24 }}>Hello!</Card.Title>
				<Card.Title style={{ marginTop: 24 }}>{displayName}</Card.Title>
				<ListItem.Subtitle style={{ padding: 8 }}>{email}</ListItem.Subtitle>
				<Divider />
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
						Click to View and Edit Posts
					</ListItem.Subtitle>

					<Icon
						type='material-community'
						color='black'
						size={32}
						name='chevron-down'
						onPress={toggleOverlay}
					/>
				</View>
				{/* <View style={{ height: 300 }}> */}
				{/* <Overlay
						fullScreen={false}
						animationType='slide'
						isVisible={visible}
						transparent={true}
						onBackdropPress={toggleOverlay}
					>
						<MyPostsList myPosts={myPosts} />
					</Overlay>
				</View> */}

				<View style={styles.buttonView}>
					<Button
						buttonStyle={{
							width: 250,
							borderRadius: 200,
							color: colors.newBlue,
							borderColor: colors.newBlue,
						}}
						titleStyle={{ color: colors.newBlue }}
						type='outline'
						raised
						title='Sign Out'
						icon={{
							name: 'ios-exit',
							size: 24,
							type: 'ionicon',
							color: colors.primaryYellow,
						}}
						onPress={logOut}
					/>
				</View>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 200,
		// height: 200,
	},
	wrapper: {
		width: '100%',
		alignItems: 'center',
		alignSelf: 'center',
	},
	container: {
		width: '100%',
		alignItems: 'center',
		alignSelf: 'center',
		height: 1000,
	},
	socialRow: {
		flexDirection: 'row',
	},
	buttonText: {
		width: 300,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
		paddingTop: 16,
		borderWidth: 2,
		borderColor: colors.yellow,
	},
	buttonView: {
		height: 100,
		justifyContent: 'flex-end',
		paddingTop: 24,
		paddingBottom: 24,
	},
});
