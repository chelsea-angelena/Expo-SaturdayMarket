import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import {
	Image,
	StyleSheet,
	FlatList,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';
import * as db from '../../config/firebaseConfig';
import { UserContext } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import SavedPostItem from './SavedPostItem';
// import Screen from '../../Atoms/Screen';

export default function SavedPosts() {
	const [savedList, setSavedList] = useState([]);
	const [postedId, setPostedId] = useState([]);
	const [postData, setPostData] = useState([]);
	const [error, setError] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');
	const user = useContext(UserContext);
	const navigation = useNavigation();
	const userId = user.uid;

	const getSavedList = async () => {
		let result = await db.getSavedList(userId);

		let postId = result.map((result) => result.postId);
		setPostedId(postId);
		postId ? dataResult() : null;
	};

	let dataResult = async () => {
		await getSavedList;
		try {
			let result = await db.getSaveData(postedId);
			setPostData(result);
		} catch (e) {
			setErrorMessage(e);
		}
	};

	useEffect(() => {
		getSavedList();
	}, []);

	if (!user) {
		return <Text>Loading...</Text>;
	}
	return (
		// <Screen>
			<FlatList
				data={postData}
				keyExtractor={postData.postId}
				renderItem={({ item }) => {
					return (
						<SavedPostItem
							item={item}
							title={item.post.title}
							description={item.post.description}
							price={item.post.price}
							created={item.created}
							category={item.post.category}
							image={item.post.image}
							postedBy={item.userData.displayName}
							altEmail={item.userData.altEmail}
							email={item.userData.email}
							phoneNumber={item.userData.phoneNumber}
							userPhoto={item.userData.photoURL}
							authorID={item.authorID}
							savedPostId={item.id}
						/>
					);
				}}
			/>
		// </Screen>
	);
}
