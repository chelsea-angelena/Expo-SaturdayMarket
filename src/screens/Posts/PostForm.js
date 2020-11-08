import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import {
	FormInput,
	ErrorMessage,
} from '../../screens/Account/ProfileFormComponents';
import PostFormButton from './PostFormButton';
import AppText from '../../Atoms/Text';
import { CheckBox, Overlay, Icon, Card, Divider } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/AuthContext';
import FormImagePicker from '../../Atoms/FormImagePicker';
import * as db from '../../config/firebaseConfig';
// import useLocation from '../../hooks/useLocation';
import colors from '../../styles/colors';
import Logo from '../../Atoms/Logo';
import UserMap from './UserMap';
import { useNavigation } from '@react-navigation/native';

export default function PostForm({ location }) {
	const [checked, setChecked] = useState(false);
	// const [location] = useLocation();
	const navigation = useNavigation();
	const [error, setError] = useState(null);
	const [userData, setUserData] = useState({});
	console.log(location, 'form location');
	const user = useContext(AuthContext);
	const userId = user.uid;

	const goToPosts = async () => {
		navigation.navigate('PostsStack', { screen: 'PostsListScreen' });
	};

	// const submitPostForm = (values) => {
	// 	// const { latitude, longitude } = location;
	// 	try {
	// 		db.createPost(userId, userData, values, location);
	// 	} catch (error) {
	// 		setError(error);
	// 	}
	// 	goToPosts();
	// };

	const getUserData = async () => {
		try {
			let result = await db.getDoc(userId);
			let data = result[0];
			setUserData(data);
		} catch (e) {
			setError(e);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	if (!userData) {
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
	if (!userId) {
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
	// if (!location.latitude) {
	// 	return (
	// 		<View
	// 			style={{
	// 				flex: 1,
	// 				justifyContent: 'center',
	// 				flexDirection: 'row',
	// 				justifyContent: 'space-around',
	// 				padding: 10,
	// 			}}
	// 		>
	// 			<ActivityIndicator color='blue' size='large' />
	// 		</View>
	// 	);
	// }
	return (
		<>
			<KeyboardAwareScrollView>
				<Formik
					initialValues={{
						title: '',
						description: '',
						category: '',
						price: '',
						phoneNumber: '',
						altEmail: '',
						images: [],
					}}
					onSubmit={(values, { resetForm }) => {
						submitPostForm(values);
						resetForm({ values: '' });
					}}
				>
					{({
						handleChange,
						resetForm,
						values,
						handleSubmit,
						errors,
						isValid,
						touched,
						handleBlur,
						isSubmitting,
					}) => (
						<>
							<View
								style={{
									maxWidth: 300,
									marginTop: 32,
									alignSelf: 'center',
									alignItems: 'center',
								}}
							>
								<Logo />
							</View>
							<Card style={{ marginTop: 32 }}>
								<Card.Title
									style={{
										fontSize: 32,
										fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
									}}
								>
									New Post
								</Card.Title>
								<Divider
									style={{
										padding: 0.5,
										backgroundColor: colors.drab,
									}}
								/>

								<FormImagePicker
									style={styles.picker}
									type='Blob'
									name='images'
								/>

								<FormInput
									name='title'
									value={values.title}
									onChangeText={handleChange('title')}
									placeholder='Enter a Title'
									autoCapitalize='none'
									onBlur={handleBlur('title')}
								/>
								<ErrorMessage errorValue={touched.title && errors.title} />
								<FormInput
									name='description'
									value={values.description}
									onChangeText={handleChange('description')}
									placeholder='Description'
									multiline={true}
									onBlur={handleBlur('description')}
								/>
								<ErrorMessage
									errorValue={touched.description && errors.description}
								/>
								<FormInput
									name='price'
									value={values.price}
									onChangeText={handleChange('price')}
									placeholder='$ 0.00    (enter price)'
									onBlur={handleBlur('price')}
								/>
								<ErrorMessage errorValue={touched.price && errors.price} />
								<FormInput
									name='altEmail'
									value={values.altEmail}
									onChangeText={handleChange('altEmail')}
									placeholder='(optional alt contact)'
									iconName='ios-mail'
									iconColor='#2C384A'
									onBlur={handleBlur('altEmail')}
								/>
								<ErrorMessage
									errorValue={touched.altEmail && errors.altEmail}
								/>
								<FormInput
									name='phoneNumber'
									value={values.phoneNumber}
									onChangeText={handleChange('phoneNumber')}
									placeholder='(optional alt contact)'
									iconName='ios-call'
									iconColor='#2C384A'
									onBlur={handleBlur('phoneNumber')}
								/>
								<ErrorMessage
									errorValue={touched.phoneNumber && errors.phoneNumber}
								/>
								<FormInput
									name='category'
									value={values.category}
									onChangeText={handleChange('category')}
									placeholder='Category'
									autoCapitalize='none'
									onBlur={handleBlur('category')}
								/>
								<ErrorMessage
									errorValue={touched.category && errors.category}
								/>

								<CheckBox
									title='Include a Map with your location?'
									status={checked ? 'checked' : 'unchecked'}
									onPress={() => setChecked(!checked)}
									containerStyle={styles.box}
								/>
								{checked ? <UserMap location={location} /> : null}
								<View style={styles.buttonContainer}>
									<PostFormButton
										buttonType='outline'
										onPress={handleSubmit}
										title='Submit Post'
										buttonColor={colors.slate}
									/>
									<ErrorMessage errorValue={errors.general} />
								</View>
							</Card>
						</>
					)}
				</Formik>
			</KeyboardAwareScrollView>
		</>
	);
}
const styles = StyleSheet.create({
	buttonContainer: {
		margin: 25,
	},
	text: {
		alignSelf: 'center',
	},
	wrapper: {
		width: '100%',
		margin: 0,
		padding: 0,
	},
	container: {
		width: '100%',
		margin: 0,
		padding: 0,
	},
});
