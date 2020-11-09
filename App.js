import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { ActivityIndicator, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from './src/hooks/useAuth';
import { AuthContext } from './src/Context/AuthContext';
import useLocation from './src/hooks/useLocation';
import { LocationContext } from './src/Context/LocationContext';
import MainNavigation from './src/Navigation/MainNavigation';

export default function App() {
	let [user] = useAuth();
	let [location, loading] = useLocation();
	if (loading) {
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
		<LocationContext.Provider value={location}>
			<AuthContext.Provider value={user}>
				<ThemeProvider>
					<MainNavigation />
				</ThemeProvider>
			</AuthContext.Provider>
		</LocationContext.Provider>
	);
}
