import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
// import * as db from '../../config/firebaseConfig';
// import { UserContext } from '../../../App';
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
// import MaterialCommunityIcon from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as db from '../../config/firebaseConfig';
const MyPostListItem = ({ item }) => {
	const { created, post, userData } = item;
	const { category, title, price, description, image, location } = post;
	// let Date = created.toDate();
	// let dateArr = Date.toString().split(' ');
	// let splicedDate = dateArr.splice(0, 4);
	// let splicedTime = dateArr.splice(0, 1);
	// let oneMore = splicedTime[0].split('');
	// let another = oneMore.splice(0, 5);
	// let time = another.join('');

	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(null);
	let postId = item.id;
	console.log(postId, 'postId');
	let Date = created.toDate();
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

	const deletePost = async () => {
		try {
			await db.deletePost(postId);
			setIsDisabled(true);
		} catch (e) {
			setError(e);
		}
	};
	return (
		<Card
			containerStyle={{
				padding: 0,
				marginTop: 16,
				backgroundColor: colors.grey,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',

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
					size={24}
					color='black'
					onPress={goToDetails}
					style={{ margin: 0, padding: 16 }}
				/>
				<Divider />
			</View>
			<View
				style={{ flexDirection: 'row', padding: 8, justifyContent: 'center' }}
			>
				<Icon
					type='feather'
					name='edit'
					size={24}
					color='black'
					// style={{ marginLeft: 24 }}
					// disabled={!isDisabled}
					raised
					containerStyle={{ backgroundColor: 'pink' }}
					color={colors.medGrey}
					underlayColor={colors.darkGrey}
				/>
				<Icon
					type='material-community'
					name='trash-can-outline'
					size={26}
					color='black'
					onPress={deletePost}
					disabled={isDisabled}
					raised
					color={colors.medGrey}
					underlayColor={colors.darkGrey}
				/>
			</View>
		</Card>
	);
};

export default MyPostListItem;
const styles = StyleSheet.create({
	view: {
		height: 450,

		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
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

// 	return (
// 		<Card
// 			containerStyle={{
// 				padding: 0,
// 				marginTop: 16,
// 				backgroundColor: colors.grey,
// 			}}
// 			wrapperStyle={{
// 				flexDirection: 'row',
// 				justifyContent: 'space-between',
// 				alignItems: 'center',

// 				heigth: 75,
// 				marginTop: 8,
// 			}}
// 		>
// 			<Card.Image
// 				resizeMode='contain'
// 				source={{ uri: image }}
// 				alt='Posted Image'
// 				style={styles.image}
// 			/>

// 			{/* <View style={styles.column}>
// 				<Card.Title style={styles.text}>{title}</Card.Title>
// 				<ListItem.Subtitle>${price}</ListItem.Subtitle>

// 				<ListItem.Subtitle style={styles.date}>
// 					{splicedDate[0]} {splicedDate[1]} {splicedDate[2]}
// 				</ListItem.Subtitle>
// 			</View> */}
// 			<Icon
// 				type='material-community'
// 				name='chevron-right'
// 				size={24}
// 				color='black'
// 				onPress={goToDetails}
// 			/>
// 		</Card>
// 	);
// };

// export default MyPostListItem;

// const styles = StyleSheet.create({
// 	// 	view: {
// 	// 		width: 300,
// 	// 		alignItems: 'center',
// 	// 		justifyContent: 'center',
// 	// 		alignSelf: 'center',
// 	// 	},
// 	// 	text: {
// 	// 		// marginLeft: 16,
// 	// 	},
// 	// 	row: {
// 	// 		flexDirection: 'row',
// 	// 		justifyContent: 'space-between',
// 	// 		// marginLeft: 16,
// 	// 		marginRight: 16,
// 	// 		alignItems: 'center',
// 	// 	},
// 	// 	image: {
// 	// 		width: 150,
// 	// 		height: 75,
// 	// 	},

// 	// 	column: {
// 	// 		flexDirection: 'column',
// 	// 		width: 150,
// 	// 		alignItems: 'center',
// 	// 	},
// 	// 	posted: {
// 	// 		fontSize: 12,
// 	// 	},
// 	// 	postBy: {
// 	// 		fontSize: 13,
// 	// 	},
// 	// 	date: {
// 	// 		fontSize: 12,
// 	// 	},
// 	// });
// 	view: {
// 		height: 450,

// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		alignSelf: 'center',
// 	},
// 	text: {
// 		marginLeft: 16,
// 		fontSize: 16,
// 	},
// 	row: {
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		marginLeft: 16,
// 		marginRight: 16,
// 		alignItems: 'center',
// 		minWidth: 320,
// 		maxWidth: '100%',
// 	},
// 	image: {
// 		width: 100,
// 		height: 75,
// 		padding: 16,
// 		borderRadius: 4,
// 	},

// 	column: {
// 		flexDirection: 'column',
// 		// width: 200,
// 		alignItems: 'center',
// 	},
// 	posted: {
// 		fontSize: 12,
// 	},
// 	postBy: {
// 		fontSize: 13,
// 	},
// 	date: {
// 		fontSize: 12,
// 	},
// 	card: {
// 		flexDirection: 'row',
// 		width: '100%',
// 		height: 50,
// 	},
// });

// // 	view: {
// // 		width: 200,
// // 		height: 400,
// // 		alignItems: 'center',
// // 		justifyContent: 'center',
// // 		alignSelf: 'center',
// // 	},
// // 	text: {
// // 		marginLeft: 16,
// // 	},
// // 	row: {
// // 		flexDirection: 'row',
// // 		justifyContent: 'center',
// // 		marginLeft: 16,
// // 		marginRight: 16,
// // 		alignItems: 'center',
// // 		minWidth: 320,
// // 		maxWidth: '100%',
// // 	},
// // 	image: {
// // 		width: 100,
// // 		height: 75,
// // 		padding: 16,
// // 		borderRadius: 4,
// // 	},

// // 	column: {
// // 		flexDirection: 'column',
// // 		width: 200,
// // 		alignItems: 'center',
// // 	},
// // 	posted: {
// // 		fontSize: 12,
// // 	},
// // 	postBy: {
// // 		fontSize: 13,
// // 	},
// // 	date: {
// // 		fontSize: 12,
// // 	},
// // 	card: {
// // 		flexDirection: 'row',
// // 		width: '100%',
// // 		height: 50,
// // 	},
// // });
