import React, { useContext, useState, useEffect } from 'react';
import {
	ActivityIndicator,
	ScrollView,
	Platform,
	Image,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Icon, Card, ListItem, Divider, Avatar } from 'react-native-elements';
import colors from '../../styles/colors';
// import UserMap from '../Posts/UserMap';
import * as db from '../../config/firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';
import Text from '../../Atoms/AppText';
import { useFocusEffect } from '@react-navigation/native';

const ListItemDetails = ({ navigation, route }, props) => {
	let { item } = route.params;
	const [isSaved, setIsSaved] = useState(false);
	const [savedList, setSavedList] = useState([]);
	const [error, setError] = useState(null);
	const user = useContext(AuthContext);
	const userId = user.uid;
	let { post, created, userData, id, authorID } = item;
	let { title, category, description, image, location, price } = post;
	let { altEmail, email, displayName, phoneNumber, photoURL } = userData;
	let profileID = authorID;
	let listItemDate = created;
	let postId = id;
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
		await db.savePost(item, userId);
		setIsSaved(true);
	};
	const toggleSaved = () => {
		!isSaved ? savePost() : removeSave();
	};

	const getSaved = async () => {
		try {
			let saved = await db
				.getSavedPosts(userId)
				.then((saved) => saved.filter((post) => post === post));
			setSavedList(saved);
			if (saved === true) {
				setIsSaved(true);
			}
		} catch (e) {
			setError(e);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			getSaved();
			return undefined;
		}, [])
	);

	if (!userId) {
		return <Text>Loading..</Text>;
	}
	return (
		<ScrollView>
			<View style={styles.container}>
				<Card style={styles.wrapper}>
					<Image
						PlaceholderContent={<ActivityIndicator />}
						resizeMode='cover'
						style={{ height: 300, width: '100%' }}
						source={{ uri: image }}
						alt='Posted Image'
					/>
					<Card.Title style={styles.titleText}>{title}</Card.Title>

					<Card.Divider />
					<Card style={styles.innerCard}>
						<Text style={styles.contentTextBold}>Price: </Text>
						<Text style={styles.contentTextBold}>$ {price}</Text>
						<Card.Divider />
						<Text style={styles.contentTextBold}>Description: </Text>
						<Text style={styles.contentText}>{description}</Text>
						<Card.Divider />
						<Text style={styles.contentTextBold}>Category: </Text>
						<Text style={styles.contentText}>{category}</Text>
						<Card.Divider />
						{!isSaved ? (
							<Text style={styles.contentTextBold}>Save:</Text>
						) : (
							<Text style={styles.contentTextBold}>UnSave:</Text>
						)}
						<View style={styles.contentText}>
							<Icon
								onPress={toggleSaved}
								type='material-community'
								raised
								name='heart'
								color={isSaved ? colors.ochre : colors.medGrey}
								underlayColor={colors.darkGrey}
								reverseColor='Red'
							/>
						</View>
					</Card>
					<Text style={styles.contentTextBold}>Posted on: </Text>
					<Text style={styles.contentText}>
						{splicedDate[0]} {splicedDate[1]} {splicedDate[2]} {splicedDate[3]}
					</Text>

					<Text style={(styles.date, styles.contentText)}>at {time} PST</Text>
					<View style={styles.container}>
						<Card style={styles.wrapper}>
							<Text style={styles.contentTextBold}>Posted by: </Text>
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
									<Text style={{ alignSelf: 'center' }}>See More Posts</Text>
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
					{/* <UserMap location={location} /> */}
				</Card>
			</View>
		</ScrollView>
	);
};

export default ListItemDetails;
const styles = StyleSheet.create({
	container: {
		marginBottom: 32,
	},
	wrapper: {
		width: '100%',
		minWidth: 300,
		alignSelf: 'center',
		alignItems: 'center',

		textAlign: 'center',
	},
	text: {
		color: 'black',
		alignSelf: 'center',
	},
	profileCard: {
		alignItems: 'center',

		width: 400,
	},
	avatar: {
		alignSelf: 'center',
	},
	contentText: {
		fontSize: 16,
		paddingTop: 4,
		paddingBottom: 8,
		alignItems: 'center',

		alignSelf: 'center',
	},
	contentTextBold: {
		fontSize: 16,
		paddingTop: 4,
		paddingBottom: 8,
		alignItems: 'center',

		alignSelf: 'center',
		fontWeight: 'bold',
	},
	notrow: {
		flexDirection: 'column',
		fontSize: 14,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8,
	},
	row: {
		flexDirection: 'row',
		fontSize: 14,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 8,
	},
	titleText: {
		fontSize: 22,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
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
	innerCard: {
		width: 300,
		backgroundColor: colors.lightGrey,
	},
});
