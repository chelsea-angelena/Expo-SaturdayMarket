import React, { useEffect, useState } from 'react';
import {
	Platform,
	ActivityIndicator,
	StyleSheet,
	View,
	FlatList,
} from 'react-native';
import * as db from '../../config/firebaseConfig';
import { Icon, Card, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import colors from '../../styles/colors';

export default function UsersList({ authorID }) {
	const [userPosts, setUserPosts] = useState(null);
	const [error, setError] = useState(null);


	const getUserPosts = async () => {
		try {
			let result = await db.getUserList(authorID);
			setUserPosts(result);
		} catch (e) {
			setError(e);
		}
	};

	useEffect(() => {
		getUserPosts();
	}, []);

	if (!userPosts) {
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
	price,
	image,
}) => {
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
				<Card.Title style={styles.text}>{title}</Card.Title>
				<Card.Title style={styles.text}>${price}</Card.Title>
				<Card.Divider />
				<ListItem.Subtitle style={styles.date}>
					{splicedDate[0]} {splicedDate[1]} {splicedDate[2]}
				</ListItem.Subtitle>
				<ListItem.Subtitle style={styles.date}>{time} PST</ListItem.Subtitle>
			</View>
			<View style={{ alignSelf: 'center' }}>
				<Icon
					type='material-community'
					name='chevron-right'
					size={16}
					color='black'
					onPress={goToDetails}
				/>
			</View>
		</Card>
	);
};
const styles = StyleSheet.create({
	view: {
		height: 450,
	},
	text: {
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
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
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	image: {
		width: 100,
		height: 100,

		borderRadius: 4,
		alignSelf: 'center',
	},

	column: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	posted: {
		fontSize: 12,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	postBy: {
		fontSize: 13,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
	date: {
		fontSize: 12,
	},
	card: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
});
