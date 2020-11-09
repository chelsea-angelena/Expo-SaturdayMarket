import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as db from '../../config/firebaseConfig';
import {
	Divider,
	Overlay,
	Card,
	ListItem,
	Avatar,
} from 'react-native-elements';
import EditProfile from './EditProfile';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import MyPostsList from './MyPostsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
export default function ProfileScreen({
	onUpdate,
	displayName,
	photoURL,
	email,
	userId,
}) {
	const [myPosts, setMyPosts] = useState([]);
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState(null);
	const toggleOverlay = () => {
		setVisible(!visible);
	};
	const navigation = useNavigation();

	const getMyPosts = async () => {
		try {
			let result = await db.getUserPosts(userId);
			if (result.length >= 1) {
				setMyPosts(result);
			} else {
				null;
			}
		} catch (e) {
			setError(e);
		}
	};

	const deletePostItem = async (postId) => {
		try {
			await db.deletePost(postId);
		} catch (e) {
			setError(e);
		}
		getMyPosts();
	};
	useFocusEffect(
		React.useCallback(() => {
			getMyPosts();
			return undefined;
		}, [])
	);

	if (!userId) {
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
			<View style={styles.wrapper}>
				<Card style={styles.container}>
					<View style={styles.avatarView}>
						<Avatar rounded size='xlarge' source={{ uri: photoURL }} />
						<TouchableOpacity onPress={toggleOverlay}>
							<MaterialCommunityIcons
								name='account-edit'
								color='black'
								size={24}
							/>
						</TouchableOpacity>
					</View>
					<View style={{ maxHeight: 400 }}>
						<Overlay
							fullScreen={false}
							animationType='slide'
							isVisible={visible}
							transparent={true}
							style={{ height: 400 }}
							onBackdropPress={toggleOverlay}
						>
							<EditProfile
								onUpdate={onUpdate}
								onToggleOverlay={toggleOverlay}
							/>
						</Overlay>
					</View>
					<Card.Title style={{ marginTop: 24 }}>Hello!</Card.Title>
					<Card.Title style={{ marginTop: 24 }}>{displayName}</Card.Title>
					<ListItem.Subtitle style={{ padding: 8, alignSelf: 'center' }}>
						{email}
					</ListItem.Subtitle>

					<View>
						<Divider
							style={{
								margin: 24,
								width: 300,
								padding: 0.5,
								backgroundColor: colors.drab,
							}}
						/>
					</View>
					<View>
						<MyPostsList myPosts={myPosts} onDelete={deletePostItem} />
					</View>
				</Card>
			</View>
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
	},
	avatarView: {
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
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
