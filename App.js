import 'react-native-gesture-handler';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';
import * as SplashScreen from 'expo-splash-screen';
// import theme from './src/styles/theme';
// import { SignInScreen, SignUpScreen } from './src/screens/Auth';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './src/hooks/useAuth';
// import IntroScreen from './src/Navigation/IntroScreen';
// import MainApp from './MainApp';
import AuthStack from './src/Navigation/AuthStack';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './src/Context/AuthContext';
import TabNavigator from './src/Navigation/TabNavigator';
import MainNavigation from './src/Navigation/MainNavigation';
export const UserContext = React.createContext();

export default function App() {
	let [user, loading] = useAuth();

	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
	}, []);

	if (!loading) {
		SplashScreen.hideAsync();
	}

	return (
		<AuthContext.Provider value={user}>
			<ThemeProvider>
				<MainNavigation />
			</ThemeProvider>
		</AuthContext.Provider>
	);
}
