import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SavedPostItem from '../screens/SavedPosts/SavedPostItem';
import {
	PostsListScreen,
	PostListItem,
	ListItemDetails,
	UserProfileScreen,
} from '../screens/Posts';

const Stack = createStackNavigator();

const PostsStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='PostsListScreen'
				component={PostsListScreen}
				options={{ title: 'Posts' }}
			/>
			<Stack.Screen
				name='PostListItem'
				component={PostListItem}
				options={{ title: 'Posts' }}
			/>
			<Stack.Screen
				name='ListItemDetails'
				component={ListItemDetails}
				options={{ title: 'Posts' }}
			/>
			<Stack.Screen
				name='SavedPostItem'
				component={SavedPostItem}
				options={{ title: 'Saved Post' }}
			/>
			<Stack.Screen
				name='UserProfileScreen'
				component={UserProfileScreen}
				options={{ title: 'Profile' }}
			/>
		</Stack.Navigator>
	);
};

export default PostsStack;
