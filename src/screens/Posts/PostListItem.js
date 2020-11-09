import React from 'react';
import { ActivityIndicator, View, StyleSheet, Platform } from 'react-native';
import { Avatar, ListItem, Card, Icon, Image } from 'react-native-elements';import { useNavigation } from '@react-navigation/native';

const PostListItem = ({ item }) => {
	const { authorID, post, created, userData, id } = item;
	const { description, title, category, image, location, price } = post;
	const { displayName, altEmail, email, phoneNumber, photoURL } = userData;
	let navigation = useNavigation();
	let navItem = item.toString();
	let postId = id;

	const goToDetails = () => {
		navigation.navigate('ListItemDetails', { item });
	};

	let splicedDate;
	let time;
	if (created) {
		let date = created.toDate();
		let dateArr = date.toString().split(' ');
		splicedDate = dateArr.splice(0, 4);
		let splicedTime = dateArr.splice(0, 1);
		let split = splicedTime[0].split('');
		let timeSplice = split.splice(0, 5);
		time = timeSplice.join('');
	}

	if (!created) {
		return null;
	}
	return (
		<View style={styles.wrapper}>
			<Card style={styles.container}>
				<Image
					PlaceholderContent={<ActivityIndicator />}
					resizeMode='cover'
					style={{ height: 250, width: '100%' }}
					source={{ uri: image }}
					alt='Posted Image'
					onPress={goToDetails}
				/>
				<Card.Divider />
				<View style={styles.row}>
					<ListItem.Title style={styles.text}>{title}</ListItem.Title>
					<ListItem.Subtitle style={{ fontWeight: 'bold' }}>
						${price}
					</ListItem.Subtitle>
				</View>
				<Card.Divider />
				<View style={styles.row}>
					<Avatar
						rounded
						size='large'
						source={{
							uri: photoURL,
						}}
					/>
					<View style={styles.column}>
						<ListItem.Subtitle style={styles.posted}>
							Post By:
						</ListItem.Subtitle>
						<ListItem.Title
							style={{
								color: 'black',
								fontSize: 18,
								fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
								paddingTop: 4,
								paddingBottom: 8,
							}}
						>
							{displayName}
						</ListItem.Title>
						<ListItem.Subtitle style={styles.date}>
							Posted on:
						</ListItem.Subtitle>
						<ListItem.Subtitle style={styles.date}>
							{splicedDate[0]} {splicedDate[1]} {splicedDate[2]}{' '}
							{splicedDate[3]}
						</ListItem.Subtitle>
						<ListItem.Subtitle style={styles.date}>
							at {time} PST
						</ListItem.Subtitle>
					</View>
					<Icon
						type='material-community'
						name='chevron-right'
						size={24}
						color='black'
						onPress={goToDetails}
					/>
				</View>
			</Card>
		</View>
	);
};

export default PostListItem;
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		width: '100%',
	},
	wrapper: {
		alignSelf: 'center',
		maxWidth: 500,

		width: '100%',
	},
	text: {
		fontSize: 22,
		fontWeight: 'bold',
		padding: 16,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 16,
		paddingRight: 16,
		alignItems: 'center',
	},
	image: {
		borderRadius: 8,
		height: 400,
	},
	column: {
		flexDirection: 'column',
	},
	posted: {
		fontSize: 14,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	postBy: {
		fontSize: 14,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	date: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
		fontSize: 14,
	},
});
