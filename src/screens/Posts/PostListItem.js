import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Image, Text, View, StyleSheet } from 'react-native';
import { Avatar, ListItem, Card, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import * as db from '../../config/firebaseConfig';

const PostListItem = ({ item }) => {
	const { authorID, post, userData } = item;
	const { description, title, category, image, location, price } = post;
	const { latitude, longitude } = location;
	const {
		displayName,
		altEmail,
		// postId,
		email,
		phoneNumber,
		photoURL,
	} = userData;
	let navigation = useNavigation();
	let navItem = item.toString();
	console.log(navItem, 'navItem');
	const goToDetails = () => {
		navigation.navigate('ListItemDetails', { item });
	};
	let created = item.created;
	let createdDate = created;
	let date = createdDate.toDate();
	let dateArr = date.toString().split(' ');
	let splicedDate = dateArr.splice(0, 4);
	let splicedTime = dateArr.splice(0, 1);
	let split = splicedTime[0].split('');
	let timeSplice = split.splice(0, 5);
	let time = timeSplice.join('');
	return (
		<View style={styles.wrapper}>
			<Card style={styles.container}>
				<Image
					PlaceholderContent={<ActivityIndicator />}
					resizeMode='cover'
					style={{ height: 250 }}
					source={{ uri: image }}
					alt='Posted Image'
					// containerStyle={styles.imageContainer}
					// style={styles.image}
				/>
				<Card.Divider />
				<View style={styles.row}>
					<ListItem.Title style={(styles.text, { padding: 16, fontSize: 18 })}>
						{title}
					</ListItem.Title>
					<ListItem.Subtitle style={{ fontWeight: 'bold' }}>
						${price}
					</ListItem.Subtitle>
				</View>
				<Card.Divider />
				<View style={styles.row}>
					<Avatar
						rounded
						size='medium'
						source={{
							uri: photoURL,
						}}
					/>
					<View style={styles.column}>
						<ListItem.Subtitle style={styles.posted}>
							Post By:
						</ListItem.Subtitle>
						<ListItem.Title style={{ paddingTop: 4, paddingBottom: 8 }}>
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
		flex: 1,

		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	wrapper: {
		alignSelf: 'center',
		maxWidth: 500,
		paddingRight: 16,
		paddingLeft: 16,
		width: '100%',
		paddingBottom: 16,
	},
	text: {
		paddingLeft: 16,
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
		fontSize: 12,
	},
	postBy: {
		fontSize: 13,
	},
	date: {
		fontSize: 12,
	},
});
