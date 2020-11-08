import React, { useContext } from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { AuthContext } from '../../Context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SavedPostItem = ({ item, navigation }) => {
	console.log(item, 'item');
	const { authorID, post, created, userData, id } = item;
	const { description, title, category, image, location, price } = post;
	const { displayName, altEmail, email, phoneNumber, photoURL } = userData;

	const goToDetails = async () => {
		await navigation.navigate('ListItemDetails', { item });
	};

	const user = useContext(AuthContext);
	const userId = user.uid;

	return (
		<Card style={styles.container}>
			<View style={styles.wrapper}>
				<Avatar
					source={{ uri: image }}
					alt='Posted Image'
					size='xlarge'
					avatarStyle={{ borderRadius: 8 }}
				/>
				<ListItem.Content style={styles.content}>
					<Card.Title style={styles.title}>{title}</Card.Title>
					<ListItem.Subtitle style={styles.subtitle}>
						${price}
					</ListItem.Subtitle>
				</ListItem.Content>
				<MaterialCommunityIcons
					type='material-community'
					name='chevron-right'
					size={24}
					color='black'
					onPress={goToDetails}
					style={{ alignSelf: 'center' }}
				/>
			</View>
		</Card>
	);
};

export default SavedPostItem;
const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
	},
	subtitle: {
		paddingTop: 16,
	},
	container: {
		width: '100%',
		margin: 0,
		padding: 0,
		marginTop: 24,
		flexDirection: 'row',
	},
	wrapper: {
		width: '100%',
		margin: 0,
		padding: 0,
		flexDirection: 'row',
	},
	content: {
		paddingLeft: 16,
	},
});
