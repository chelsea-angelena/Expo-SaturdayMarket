import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as db from '../../config/firebaseConfig';
import { Icon, Avatar, Card, ListItem, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';

export default function UsersList({ authorID }) {
	const [userPosts, setUserPosts] = useState(null);
	const navigation = useNavigation();
	const getUserPosts = async () => {
		try {
			let result = await db.getUserList(authorID);
			setUserPosts(result);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getUserPosts();
	}, []);

	console.log(userPosts);
	if (!userPosts) {
		return <Text>Loading...</Text>;
	}
	return (
		<View style={styles.view}>
			<FlatList
				data={userPosts}
				keyExtractor={(userPosts) => userPosts.id}
				renderItem={({ item }) => {
					return (
						<UserPostItem
							item={item}
							title={item.post.title}
							description={item.post.description}
							price={item.post.price}
							created={item.created.toDate()}
							category={item.post.category}
							image={item.post.image}
							postedBy={item.userData.displayName}
							altEmail={item.userData.altEmail}
							email={item.userData.email}
							phoneNumber={item.userData.phoneNumber}
							userPhoto={item.userData.photoURL}
							authorID={item.authorID}
						/>
					);
				}}
			/>
		</View>
	);
}

const UserPostItem = ({
	item,
	title,
	created,
	description,
	price,
	category,
	image,
	postedBy,
	altEmail,
	email,
	phoneNumber,
	authorID,
	userPhoto,
}) => {
	console.log(title);
	let Date = created;
	let dateArr = Date.toString().split(' ');
	let splicedDate = dateArr.splice(0, 4);
	let splicedTime = dateArr.splice(0, 1);
	let oneMore = splicedTime[0].split('');
	let another = oneMore.splice(0, 5);
	let time = another.join('');

	const navigation = useNavigation();
	const goToDetails = () => {
		navigation.navigate('ListItemDetails', { item });
	};

	return (
		<Card
			containerStyle={{
				padding: 0,
				marginTop: 16,
				backgroundColor: colors.grey,
			}}
			wrapperStyle={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				// alignItems: 'center',

				heigth: 75,
				marginTop: 8,
			}}
		>
			<Card.Image
				source={{ uri: image }}
				alt='Posted Image'
				style={styles.image}
			/>

			<View style={styles.column}>
				<Card.Title style={styles.text}>
					{title} ${price}
				</Card.Title>
				<Card.Divider />
				<ListItem.Subtitle style={styles.date}>
					{splicedDate[0]} {splicedDate[1]} {splicedDate[2]}at: {time} PST
				</ListItem.Subtitle>
			</View>
			<Icon
				type='material-community'
				name='chevron-right'
				size={16}
				color='black'
				onPress={goToDetails}
				style={{ margin: 0, padding: 16 }}
			/>
		</Card>
	);
};
const styles = StyleSheet.create({
	view: {
		height: 450,

		// alignItems: 'center',
		// justifyContent: 'center',
		// alignSelf: 'center',
	},
	text: {
		marginLeft: 16,
		fontSize: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginLeft: 16,
		marginRight: 16,
		alignItems: 'center',
		minWidth: 320,
		maxWidth: '100%',
	},
	image: {
		width: 100,
		height: 75,
		padding: 16,
		borderRadius: 4,
	},

	column: {
		flexDirection: 'column',
		// width: 200,
		alignItems: 'center',
	},
	posted: {
		fontSize: 12,
	},
	postBy: {
		fontSize: 13,
	},
	date: {
		fontSize: 12,
	},
	card: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
	},
});
