import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { SignInScreen, SignUpScreen } from '../screens/Auth';
import TabNavigator from './TabNavigator';
import { UserContext } from '../../App';

export default function AuthStack() {
	const user = useContext(UserContext);
	return (
		<Stack.Navigator>
			{!user ? (
				<>
					<Stack.Screen
						name='SignInScreen'
						component={SignInScreen}
						options={{ title: 'Sign In' }}
					/>
					<Stack.Screen
						name='SignUpScreen'
						component={SignUpScreen}
						options={{ title: 'Sign Up' }}
					/>
				</>
			) : (
				<Stack.Screen
					name='TabNav'
					component={TabNavigator}
					options={{ title: 'Posts' }}
				/>
			)}
		</Stack.Navigator>
	);
}
