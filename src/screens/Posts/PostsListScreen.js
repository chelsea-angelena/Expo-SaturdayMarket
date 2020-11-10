import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import * as db from '../../config/firebaseConfig';
import PostListItem from './PostListItem';

export default function PostsListScreen(props) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return db.postsRef.onSnapshot((querySnapshot) => {
			const newPosts = [];
			querySnapshot.forEach((doc) => {
				const { authorID, post, created, userData } = doc.data();
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

	if (posts.length === 0) {
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
