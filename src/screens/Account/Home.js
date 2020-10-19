import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as db from '../../config/firebaseConfig.js';
import { UserContext } from '../../../App';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ProfileScreen from './ProfileScreen';

import colors from '../../styles/colors';

export default function Home(props) {
	const user = useContext(UserContext);
	const signOut = async () => {
		await db.signOut();
	};

	return (
		<SafeAreaView>
			<ProfileScreen user={user} signOut={signOut} />
		</SafeAreaView>
	);
}

