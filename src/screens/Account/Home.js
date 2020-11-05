import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as db from '../../config/firebaseConfig.js';
import { AuthContext } from '../../Context/AuthContext';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import {
	Divider,
	Overlay,
	Icon,
	Button,
	Card,
	ListItem,
	Avatar,
	Accessory,
} from 'react-native-elements';
import { Alert } from 'react-native';
import colors from '../../styles/colors';

export default function Home(props) {
	const user = useContext(AuthContext);
	const [email, setEmail] = useState(user.email);
	const [displayName, setDisplayName] = useState(user.displayName);
	const [photoURL, setPhotoURL] = useState(user.photoURL);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showEdit, setShowEdit] = useState(false);

	const { uid } = user;

	const getUserData = async () => {
		try {
			let result = await db.getUserData();
			setDisplayName(result.displayName);
			setPhotoURL(result.photoURL);
			setEmail(result.email);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
			setShowEdit(false);
		}
	};

	const updateProfile = async (values) => {
		try {
			let result = await db.updateUserProfile(values, user);
		} catch (error) {
			console.error(error);
		} finally {
			getUserData();
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	const signOut = async () => {
		await db.signOut();
	};
	if (loading) {
		return <Text>Loading...</Text>;
	}
	return (
		<SafeAreaView>
			<ProfileScreen
				showEdit={showEdit}
				setShowEdit={setShowEdit}
				onUpdate={updateProfile}
				userid={uid}
				displayName={displayName}
				photoURL={photoURL}
				email={email}
				signOut={signOut}
			/>
		</SafeAreaView>
	);
}
