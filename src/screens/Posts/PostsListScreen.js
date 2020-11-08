import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { ScrollView, StyleSheet, FlatList, View } from 'react-native';
import * as db from '../../config/firebaseConfig';
import PostListItem from './PostListItem';
import Screen from '../../Atoms/Screen';
import Text from '../../Atoms/AppText';
export default function PostsListScreen(props) {
	const [posts, setPosts] = useState([]);

	const user = useContext(AuthContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

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
		<FlatList
			keyExtractor={(posts) => posts.id}
			data={posts}
			renderItem={({ item }) => {
				return (
					<PostListItem
						item={item}
						id={item.id}
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
	);
}
