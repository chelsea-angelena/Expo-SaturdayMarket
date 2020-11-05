import React, { useContext, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../Context/AuthContext';

import {
	PostsListScreen,
	PostListItem,
	ListItemDetails,
	UserProfileScreen,
} from '../screens/Posts';

const Stack = createStackNavigator();

const PostsStack = ({ navigation }) => {
	const user = useContext(AuthContext);
	console.log(user);
	return (
		<Stack.Navigator>
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
				name='UserProfileScreen'
				component={UserProfileScreen}
				options={{ title: 'Profile' }}
			/>
		</Stack.Navigator>
	);
};

export default PostsStack;
