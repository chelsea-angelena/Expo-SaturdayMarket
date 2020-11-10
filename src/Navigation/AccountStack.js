import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, ProfileScreen, EditProfile } from '../screens/Account';
import ListItemDetails from '../screens/Posts/ListItemDetails';
import UserProfileScreen from '../screens/Posts/UserProfileScreen';
const Stack = createStackNavigator();

const AccountStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Home'
				component={Home}
				options={{ title: 'Account' }}
			/>
			<Stack.Screen
				name='ProfileScreen'
				component={ProfileScreen}
				options={{ title: 'Profile' }}
			/>
			<Stack.Screen
				name='EditProfile'
				component={EditProfile}
				options={{ title: 'Edit Profile' }}
			/>
			<Stack.Screen
				name='ListItemDetails'
				component={ListItemDetails}
				options={{ title: 'Details' }}
			/>
			<Stack.Screen
				name='UserProfileScreen'
				component={UserProfileScreen}
				options={{ title: 'Details' }}
			/>
		</Stack.Navigator>
	);
};

export default AccountStack;
