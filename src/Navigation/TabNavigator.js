import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PostsStack, AccountStack, SavedPostsStack } from './index';
import PostForm from '../screens/Posts/PostForm';
import NewPostStack from './NewPostStack';
import LogOut from '../screens/Account/LogOut';
import SavedPosts from '../screens/SavedPosts/SavedPosts';
import colors from '../styles/colors';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
	return (
		<Tab.Navigator
			activeTintColor={colors.snow}
			inactiveTintColor={colors.white}
			barStyle={{
				backgroundColor: colors.drab,
			}}
			initialRoute='PostsStack'
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen
				name='PostsStack'
				component={PostsStack}
				options={{
					tabBarLabel: 'Posts',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name='tag-heart' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='SavedPosts'
				component={SavedPosts}
				options={{
					tabBarLabel: 'Saved Posts',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name='heart' color={color} size={26} />
					),
				}}
			/>

			<Tab.Screen
				name='PostForm'
				component={NewPostStack}
				options={{
					tabBarLabel: 'New Post',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name='plus' color={color} size={32} />
					),
				}}
			/>
			<Tab.Screen
				name='AccountStack'
				activeColor={colors.white}
				inactiveColor={colors.lightGrey}
				component={AccountStack}
				options={{
					tabBarLabel: 'Account',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name='account' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Log Out'
				component={LogOut}
				options={{
					tabBarLabel: 'Log Out',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name='exit-to-app'
							color='white'
							size={26}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
