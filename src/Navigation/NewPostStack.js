import React, { useContext, useState, useEffect } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { View, Text, ActivityIndicator } from 'react-native';
import PostForm from '../screens/Posts/PostForm';

const NewPostStack = ({ navigation }) => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
			}
			let result = await Location.getCurrentPositionAsync({});
			let {
				coords: { latitude, longitude },
			} = result;
			setLocation({ latitude: latitude, longitude: longitude });

			// let stringResult = JSON.stringify(coords);
			// setLocation(stringResult);
			setLoading(false);
		})();
	}, []);
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

	return <PostForm location={location} />;
};

// <Stack.Screen
// 	name='PostForm'
// 	component={PostForm}
// 	options={{ title: 'New Post' }}
// />
// 	);
// };

export default NewPostStack;
