import React, { useEffect, useState, useContext } from 'react';
import {
	Image,
	StyleSheet,
	FlatList,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import {
	Divider,
	Card,
	ListItem,
	Button,
	Icon,
	Avatar,
} from 'react-native-elements';
import * as db from '../../config/firebaseConfig';
import { UserContext } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SavedPostItem = ({
	item,
	title,
	created,
	description,
	price,
	savedPostId,
	category,
	image,
	postedBy,
	altEmail,
	email,
	phoneNumber,
	authorID,
	userPhoto,
}) => {
	const navigation = useNavigation();
	let Date = created.toDate();
	let dateArr = Date.toString().split(' ');
	let splicedDate = dateArr.splice(0, 4);
	let splicedTime = dateArr.splice(0, 1);
	let oneMore = splicedTime[0].split('');
	let another = oneMore.splice(0, 5);
	let time = another.join('');

	const goToDetails = () => {
		navigation.navigate('ListItemDetails', { item });
	};
	const user = useContext(UserContext);
	const userId = user.uid;
	console.log(userId, 'userId');
	const postId = item.postedId;
	const deletePost = async () => {
		await db.deleteSavedPost(userId, postId);
	};
	return (
		<Card wrapperStyle={styles.wrapper} containerStyle={styles.container}>
			<ListItem style={styles.list}>
				<Avatar
					source={{ uri: image }}
					alt='Posted Image'
					size='xlarge'
					avatarStyle={{ borderRadius: 8 }}
				/>
				<ListItem.Content style={styles.content}>
					<ListItem.Title style={styles.title}>{title}</ListItem.Title>
					<ListItem.Subtitle style={styles.subtitle}>
						${price}
					</ListItem.Subtitle>
				</ListItem.Content>
				<MaterialCommunityIcons
					type='material-community'
					name='chevron-right'
					size={24}
					color='black'
					onPress={goToDetails}
				/>
			</ListItem>
			{/*
			<Icon
				type='material-community'
				name='trash-can-outline'
				size={26}
				color='black'
				// style={{ marginLeft: 24 }}
				onPress={deletePost}
			/> */}
		</Card>
	);
};

export default SavedPostItem;
const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
	},
	subtitle: {
		paddingTop: 16,
	},
	container: {
		width: '100%',
		margin: 0,
		padding: 0,
		marginTop: 24,
	},
	wrapper: {
		width: '100%',
		margin: 0,
		padding: 0,
	},
	content: {
		paddingLeft: 16,
	},
});
