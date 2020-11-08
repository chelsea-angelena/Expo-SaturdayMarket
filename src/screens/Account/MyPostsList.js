import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import * as db from '../../config/firebaseConfig';
import { UserContext } from '../../../App';
import {
	Divider,
	Icon,
	Button,
	Card,
	ListItem,
	Avatar,
	Accessory,
} from 'react-native-elements';
import colors from '../../styles/colors';
import MaterialCommunityIcon from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MyPostListItem from './MyPostListItem';

export default function MyPostsList({
	myPosts,
	signOut,
	userId,
	user,
	onDelete,
}) {
	return (
		<>
			<View style={styles.view}>
				<FlatList
					data={myPosts}
					keyExtractor={(myPosts) => myPosts.id}
					renderItem={({ item }) => {
						return (
							<MyPostListItem
								item={item}
								signOut={signOut}
								userId={userId}
								onDeleteItem={onDelete}
							/>
						);
					}}
				/>
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 200,
	},
	view: {
		height: 450,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
});
