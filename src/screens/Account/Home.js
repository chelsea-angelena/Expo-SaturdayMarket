import React, { useContext, useState, useEffect } from 'react';
import * as db from '../../config/firebaseConfig.js';
import { AuthContext } from '../../Context/AuthContext';
import { ScrollView, ActivityIndicator } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { View } from 'react-native';

export default function Home(props) {
	const user = useContext(AuthContext);
	const [email, setEmail] = useState(user.email);
	const [displayName, setDisplayName] = useState(user.displayName);
	const [photoURL, setPhotoURL] = useState(user.photoURL);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const userId = user.uid;

	const getUserProfileData = async () => {
		try {
			let result = await db.getDoc(userId);
			result.map((result) => {
				setDisplayName(result.displayName);
				setPhotoURL(result.photoURL);
				setEmail(result.email);
			});
			return result;
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	};

	const updateProfile = async (values, userId) => {

		try {
			let result = await db.updateUserProfile(values, userId);
			return result;
		} catch (error) {
			setError(error);
		} finally {
			getUserProfileData();
		}
	};
	useEffect(() => {
		getUserProfileData();
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
	return (
		<ScrollView>
			<ProfileScreen
				onUpdate={updateProfile}
				userId={userId}
				displayName={displayName}
				photoURL={photoURL}
				email={email}
			/>
		</ScrollView>
	);
}
