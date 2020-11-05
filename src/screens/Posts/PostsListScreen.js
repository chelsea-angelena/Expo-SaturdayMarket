import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { ScrollView, StyleSheet, FlatList, View, Text } from 'react-native';
import * as db from '../../config/firebaseConfig';

import PostListItem from './PostListItem';
import Screen from '../../Atoms/Screen';

export default function PostsListScreen(props) {
	const [posts, setPosts] = useState([]);

	const user = useContext(AuthContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	// const { data: posts, error } = useSWR('posts', db.getCollection);

	// useEffect(() => {
	// 	return db.subscribeToPosts(() => {
	// 		const newPosts = [];
	// 		querySnapshot.forEach((doc) => {
	// 			const { authorID, post, created, id, userData } = doc.data();
	// 			newPosts.push({
	// 				id: doc.id,
	// 				post,
	// 				authorID,
	// 				created,
	// 				userData,
	// 			});
	// 		});
	// 		setPosts(newPosts);
	// 		if (loading) {
	// 			setLoading(false);
	// 		}
	// 	});
	// }, []);

	useEffect(() => {
		return db.postsRef.onSnapshot((querySnapshot) => {
			const newPosts = [];
			querySnapshot.forEach((doc) => {
				const { authorID, post, created, id, userData } = doc.data();
				newPosts.push({
					id: doc.id,
					post,
					authorID,
					created,
					userData,
				});
			});
			setPosts(newPosts);
			if (loading) {
				setLoading(false);
			}
		});
	}, []);

	if (error) {
		return <Text>Error...</Text>;
	}
	if (!posts) {
		return <Text>Loading...</Text>;
	}
	if (posts.length === 0) {
		return <Text>No Lists....</Text>;
	}
	return (
		<View style={styles.container}>
			<FlatList
				keyExtractor={(posts) => posts.id}
				data={posts}
				renderItem={({ item }) => {
					return (
						<PostListItem
							item={item}
							postId={item.post.id}
							title={item.post.title}
							description={item.post.description}
							price={item.post.price}
							category={item.post.category}
							image={item.post.image}
							postedBy={item.userData.displayName}
							altEmail={item.userData.altEmail}
							email={item.userData.email}
							phoneNumber={item.userData.phoneNumber}
							userPhoto={item.userData.photoURL}
							authorID={item.authorID}
						/>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		width: '100%',
		// alignItems: 'center',
		alignSelf: 'center',
		// justifyContent: 'center',
	},
	// responsiveBox: {
	// 	// marginTop: hp('10%'),
	// 	paddingTop: hp('10%'),
	// 	paddingBottom: hp('10%'),
	// 	// marginBottom: hp('10%'),
	// 	maxWidth: 500,
	// 	width: wp('95%'),
	// 	height: hp('100%'),
	// 	borderWidth: 2,
	// 	borderColor: 'orange',
	// 	flexDirection: 'column',
	// 	justifyContent: 'space-around',
	// },
});
