import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';

export default function MainNavigation() {
	const user = useContext(AuthContext);
	return (
		<NavigationContainer>
			{!user ? <AuthStack /> : <TabNavigator user={user} />}
		</NavigationContainer>
	);
}
