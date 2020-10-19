import 'react-native-gesture-handler';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, theme } from 'react-native-elements';
// import theme from './src/styles/theme';
// import { SignInScreen, SignUpScreen } from './src/screens/Auth';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './src/hooks/useAuth';
// import IntroScreen from './src/Navigation/IntroScreen';
// import MainApp from './MainApp';
import AuthStack from './src/Navigation/AuthStack';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './src/Navigation/TabNavigator';

export const UserContext = React.createContext();

export default function App() {
	const [user, loading] = useAuth();
	// const [user, setUser] = useState(null);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);

	// const checkAuth = () => {
	// 	try {
	// 		let user = db.checkUserAuth((user) => {
	// 			setLoading(false);
	// 			setUser(user);
	// 		});
	// 	} catch (e) {
	// 		setError(e);
	// 	}
	// };
	// useEffect(() => {
	// 	checkAuth();
	// }, []);

	return (
		<UserContext.Provider value={user}>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					{!user ? <AuthStack /> : <TabNavigator />}
				</NavigationContainer>
			</ThemeProvider>
		</UserContext.Provider>
	);
}
