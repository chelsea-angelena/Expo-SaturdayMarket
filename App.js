import 'react-native-gesture-handler';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from './src/hooks/useAuth';
import { AuthContext } from './src/Context/AuthContext';
import TabNavigator from './src/Navigation/TabNavigator';
import MainNavigation from './src/Navigation/MainNavigation';

export default function App() {
	let [user, loading] = useAuth();

	if (loading) {
		return (
			<ActivityIndicator
				color='blue'
				size='large'
				style={{ alignSelf: 'center' }}
			/>
		);
	}
	return (
		<AuthContext.Provider value={user}>
			<ThemeProvider>
				<MainNavigation />
			</ThemeProvider>
		</AuthContext.Provider>
	);
}
