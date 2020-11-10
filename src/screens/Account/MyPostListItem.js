import React, { useState} from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';
import { Divider, Icon, Button, Card, ListItem } from 'react-native-elements';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const MyPostListItem = ({ item, onDeleteItem }) => {
	const { created, post, userData } = item;
	const { category, title, price, description, image, location } = post;
	const [isDisabled, setIsDisabled] = useState(false);
	let postId = item.id;

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
						{splicedDate[0]} {splicedDate[1]} {splicedDate[2]}
					</ListItem.Subtitle>
					<ListItem.Subtitle style={styles.date}>{time} PST</ListItem.Subtitle>
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
			<Divider
				style={{
					width: 300,

					backgroundColor: colors.lightGrey,
				}}
			/>
			<View
				style={{ flexDirection: 'row', justifyContent: 'center', padding: 6 }}
			>
				<Icon
					type='material-community'
					name='trash-can-outline'
					size={26}
					color='black'
					onPress={() => onDeleteItem(postId)}
					disabled={isDisabled}
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
		width: 150,
		height: 100,
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
