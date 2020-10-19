// import 'react-native-gesture-handler'
// import React from 'react';
// import { Text } from 'react-native';
// import useAuth from '../hooks/useAuth';
// import AuthStack from './AuthStack';
// import TabNavigator from './TabNavigator';

// export const UserContext = React.createContext();

// export default function Main() {
// 	const [user, loading] = useAuth();
// 	if (loading) {
// 		return <Text>Loading....</Text>;
// 	}
// 	return user ? <AuthApp user={user} /> : <AuthStack />;
// }

// function AuthApp({ user }) {
// 	return (
// 		<UserContext.Provider value={user}>
// 			<TabNavigator user={user} />
// 		</UserContext.Provider>
// 	);
// }
