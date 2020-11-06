import React, { useContext, useState, useEffect } from 'react';
import {
	ScrollView,
	Image,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Icon, Card, ListItem, Divider, Avatar } from 'react-native-elements';
import colors from '../../styles/colors';
import UserMap from '../Posts/UserMap';
import * as db from '../../config/firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';

const ListItemDetails = ({ navigation, route }, props) => {
	const { item } = route.params;

	const [isSaved, setIsSaved] = useState(false);
	const [savedList, setSavedList] = useState([]);
	const [error, setError] = useState(null);

	const user = useContext(AuthContext);
	const userId = user.uid;

	let { created, post, userData, authorID, id } = item;
	let { location, title, category, description, image, price } = post;

	let { altEmail, email, displayName, phoneNumber, photoURL } = userData;

	let profileID = authorID;
	let postId = id;

	let listItemDate = created;

	let dateFormat = listItemDate.toDate();
	let dateArr = dateFormat.toString().split(' ');
	let splicedDate = dateArr.splice(0, 4);
	let splicedTime = dateArr.splice(0, 1);
	let split = splicedTime[0].split('');
	let timeSplice = split.splice(0, 5);
	let time = timeSplice.join('');

	const removeSave = async () => {
		await db.deleteSavedPost(postId, userId);
		setIsSaved(false);
	};
	const savePost = async () => {
		let result = await db.savePost(postId, userId);
		setIsSaved(true);
	};
	const toggleSaved = () => {
		!isSaved ? savePost() : removeSave();
	};
	const getSaved = async () => {
		try {
			let saved = await db.getSavedPosts(userId)((saved) =>
				saved.filter((post) => post === post)
			);
			setSavedList(saved);
			if (saved.length >= 1) {
				setIsSaved(true);
			}
		} catch (e) {
			setError(e);
		}
	};

	useEffect(() => {
		getSaved();
	}, []);

	if (!userId) {
		return <Text>Loading...</Text>;
	}
	if (!postId) {
		return <Text>Loading...</Text>;
	}
	return (
		<ScrollView>
			<View style={styles.container}>
				<Card
					style={styles.wrapper}
					// containerStyle={{
					// 	width: '100%',
					// 	// alignSelf: 'center',
					// 	alignItems: 'center',
					// 	justifyContent: 'center',
					// 	marginTop: 32,
					// 	marginBottom: 32,
					// }}
					// wrapperStyle={{
					// 	width: '100%',

					// 	alignItems: 'center',
					// 	justifyContent: 'center',
					// }}
				>
					<Card.Image
						source={{ uri: image }}
						resizeMode='cover'
						style={styles.cardImage}
					/>
					<View style={styles.notrow}>
						<Card.Title style={styles.titleText}>{title}</Card.Title>
						<ListItem.Subtitle style={styles.subtitleText}>
							$ {price}
						</ListItem.Subtitle>
					</View>
					<Card.Divider />
					<Text style={styles.contentText}>{description}</Text>

					<Text style={styles.contentText}>{category}</Text>
					<View style={styles.contentText}>
						<Icon
							onPress={toggleSaved}
							type='material-community'
							raised
							name='heart'
							color={isSaved ? colors.ochre : colors.lightGrey}
							underlayColor={colors.darkGrey}
						/>
					</View>
					{isSaved ? (
						<Text style={styles.contentText}>Saved</Text>
					) : (
						<Text style={styles.contentText}>Click To Save</Text>
					)}
					<ListItem.Subtitle style={(styles.date, styles.contentText)}>
						Posted on:
					</ListItem.Subtitle>
					<ListItem.Subtitle style={(styles.date, styles.contentText)}>
						{splicedDate[0]} {splicedDate[1]} {splicedDate[2]} {splicedDate[3]}
					</ListItem.Subtitle>
					<ListItem.Subtitle style={(styles.date, styles.contentText)}>
						at {time} PST
					</ListItem.Subtitle>
					<View style={styles.container}>
						<Card style={styles.wrapper}>
							<Avatar
								source={{ uri: photoURL }}
								size='large'
								rounded
								activeOpacity={1}
								containerStyle={{ alignSelf: 'center' }}
							/>
							<Card.Title>{displayName}</Card.Title>
							<ListItem.Subtitle style={{ alignSelf: 'center' }}>
								{altEmail}
							</ListItem.Subtitle>
							<ListItem.Subtitle style={{ alignSelf: 'center' }}>
								{email}
							</ListItem.Subtitle>
							<ListItem.Subtitle style={{ alignSelf: 'center' }}>
								{phoneNumber}
							</ListItem.Subtitle>
							<Divider
								style={{ marginTop: 12, width: '100%', marginBottom: 8 }}
							/>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('UserProfileScreen', { profileID })
								}
							>
								<View style={styles.row}>
									<Text>See More Posts</Text>
									<Icon
										type='material-community'
										name='chevron-right'
										color={colors.onyx}
										size={24}
									/>
								</View>
							</TouchableOpacity>
						</Card>
					</View>
		 <UserMap location={location} />
				</Card>
			</View>
		</ScrollView>
	);
};

export default ListItemDetails;
const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 32,
		marginBottom: 32,
		flex: 1,
	},
	wrapper: {
		width: '100%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
	text: {
		color: 'black',
		alignSelf: 'center',
	},
	profileCard: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 400,
	},
	avatar: {
		alignSelf: 'center',
	},
	contentText: {
		fontSize: 14,
		paddingTop: 4,
		paddingBottom: 8,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	notrow: {
		flexDirection: 'column',
		fontSize: 12,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8,
	},
	row: {
		flexDirection: 'row',
		fontSize: 12,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 8,
	},
	titleText: {
		fontSize: 14,
	},
	subtitleText: {
		fontWeight: 'bold',
	},
	cardImage: {
		width: 400,
		height: 400,
	},
	date: {
		paddingTop: 8,
	},
	appButton: {
		backgroundColor: 'blue',
	},
	appButtonDisabled: {
		backgroundColor: 'red',
	},
});
