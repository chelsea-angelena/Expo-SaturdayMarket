// import React from 'react';
// import { StyleSheet, View, Text, FlatList } from 'react-native';
// import { Overlay, ListItem, Icon } from 'react-native-elements';
// import Modal from 'modal-react-native-web';
// import colors from '../../styles/colors';

// const categories = [
// 	{
// 		backgroundColor: colors.drab,
// 		label: 'art',
// 		icon: 'palette',
// 		value: 1,
// 	},
// 	{
// 		backgroundColor: colors.steel,
// 		label: 'music',
// 		icon: 'guitar-acoustic',
// 		value: 2,
// 	},
// 	{
// 		backgroundColor: colors.slate,
// 		label: 'kids',
// 		icon: 'plus',
// 		value: 3,
// 	},
// 	{
// 		backgroundColor: colors.rust,
// 		label: 'apparel',
// 		icon: 'hat-fedora',
// 		value: 4,
// 	},
// 	{
// 		backgroundColor: colors.drab,
// 		label: 'misc',
// 		icon: 'creation',
// 		value: 5,
// 	},
// 	{
// 		backgroundColor: colors.steel,
// 		lable: 'garden',
// 		icon: 'flower-tulip-outline',
// 		value: 6,
// 	},
// 	{
// 		backgroundColor: colors.slate,
// 		label: 'gifts',
// 		icon: 'gift-outline',
// 		value: 7,
// 	},
// 	{
// 		backgroundColor: colors.drab,
// 		label: 'food',
// 		icon: 'ice-cream',
// 		value: 8,
// 	},
// 	{
// 		backgroundColor: colors.rust,
// 		label: 'household',
// 		icon: 'home-heart',
// 		value: 9,
// 	},
// ];

// export default function CategoryModal({
// 	toggleOverlay,
// 	updateCategory,
// 	setVisible,
// }) {
// 	return (
// 		<>
// 			<FlatList
// 				data={categories}
// 				keyExtractor={categories.label}
// 				numColumns={3}
// 				renderItem={({ item }) => (
// 					<Icon
// 						type='material-community'
// 						color='white'
// 						name={item.icon}
// 						size={56}
// 						label={item.label}
// 						onPress={() => {
// 							toggleOverlay();
// 							updateCategory(item.label);
// 						}}
// 						style={{
// 							flexDirection: 'row',
// 							backgroundColor: item.backgroundColor,
// 							borderRadius: 56,
// 							margin: 8,
// 							padding: 8,
// 						}}
// 					/>
// 				)}
// 			/>

// 			<Icon
// 				type='material-community'
// 				name='chevron-down'
// 				color={colors.onyx}
// 				onPress={toggleOverlay}
// 			/>
// 		</>
// 	);
// }

// const styles = StyleSheet.create({
// 	input: {
// 		height: 64,
// 		margin: 16,
// 		color: colors.black,
// 		borderColor: 'black',
// 	},

// 	modal: {
// 		width: 350,

// 		flexWrap: 'wrap',
// 		justifyContent: 'center',
// 	},
// 	view: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		width: 120,
// 		height: 120,
// 	},
// 	list: {
// 		flexDirection: 'row',
// 	},
// 	icon: {
// 		alignSelf: 'center',
// 		alignItems: 'center',
// 		textAlign: 'center',
// 		fontSize: 18,
// 		alignSelf: 'center',
// 	},
// 	iconText: {
// 		width: 200,
// 		alignItems: 'center',
// 		textAlign: 'center',
// 		fontSize: 18,
// 		alignSelf: 'center',
// 		paddingTop: 24,
// 	},
// 	overlay: { height: 200 },
// });
