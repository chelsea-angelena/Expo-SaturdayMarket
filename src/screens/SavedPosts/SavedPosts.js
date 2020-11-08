import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	FlatList,
	View,
	Text,
} from 'react-native';
import * as db from '../../config/firebaseConfig';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import SavedPostItem from './SavedPostItem';
import Screen from '../../screens/Auth/Screen';
import { useFocusEffect } from '@react-navigation/native';

export default function SavedPosts() {
	const [postData, setPostData] = useState([]);
	const [savedList, setSavedList] = useState([]);
	const [error, setError] = useState(null);
	const user = useContext(AuthContext);
	const navigation = useNavigation();
	const userId = user.uid;

	const getSavedPosts = async () => {
		try {
			let result = await db.getSavedThePosts(userId);
			setSavedList(result);
		} catch (e) {
			setError(e);
		}
	};
	useFocusEffect(
		React.useCallback(() => {
			getSavedPosts();
			return undefined;
		}, [])
	);

	if (!userId && !savedList) {
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
		<Screen>
			<View style={styles.container}>
				<FlatList
					keyExtractor={(savedList) => savedList.id}
					data={savedList}
					renderItem={({ item }) => {
						return <SavedPostItem item={item} navigation={navigation} />;
					}}
				/>
			</View>
		</Screen>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		maxWidth: 500,
		alignSelf: 'center',
	},
});
