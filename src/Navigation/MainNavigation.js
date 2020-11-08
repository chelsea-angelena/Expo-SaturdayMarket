import React, { useMemo, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function MainNavigation() {
	const user = useContext(AuthContext);
	return (
		<NavigationContainer>
			{!user ? <AuthStack /> : <TabNavigator />}
		</NavigationContainer>
	);
}
