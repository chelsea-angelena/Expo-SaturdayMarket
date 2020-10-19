import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
	FormInput,
	ErrorMessage,
} from '../../screens/Account/ProfileFormComponents';
import PostFormButton from './PostFormButton';
import AppText from '../../Atoms/Text';
import { CheckBox, Overlay, Icon, Card, Divider } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../../App';
// import Modal from 'modal-react-native-web';
import FormImagePicker from '../../Atoms/FormImagePicker';
import * as db from '../../config/firebaseConfig';
import useLocation from '../../hooks/useLocation';
// import CategoryModal from './Categories';
import colors from '../../styles/colors';
import Logo from '../../Atoms/Logo';
import UserMap from './UserMap';
import { useNavigation } from '@react-navigation/native';
// import Screen from '../../Atoms/Screen';

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	description: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	price: Yup.number().required('Required'),
	images: Yup.array().min(1).required('Required'),
	categories: Yup.object().required,
});

export default function PostForm() {
	// const [visible, setVisible] = useState(false);
	// const [category, setCategory] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [checked, setChecked] = useState(false);
	const [location] = useLocation();
	const navigation = useNavigation();
	const [error, setError] = useState(null);

	const { latitude, longitude } = location;

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	// const updateCategory = async () => {
	// 	let result = await chooseCategory();
	// 	setCategory(result);
	// };

	// const onCheckBox = () => {
	// 	let location = useLocation();
	// 	console.log(location, 'location');
	// };

	const user = useContext(UserContext);
	let userId = user.uid;

	const submitPostForm = async (values) => {
		const { images, title, description, phoneNumber, altEmail } = values;
		const { displayName, email, photoURL } = user;
		try {
			const response = await db.createPost(values, user, location, userId);
		} catch (error) {
			setError(error);
		} finally {
			setIsSubmitting(false);
			navigation.navigate('TabNavigator', 'PostsStack', {
				screen: 'PostsListScreen',
			});
		}
	};

	return (
		<>
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
					<KeyboardAwareScrollView>
						<View style={styles.container}>
							<Card style={styles.wrapper}>
								<Logo />
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
								{/* <AppText style={styles.text}>Choose a category</AppText>
									<Icon
										type='material-community'
										name='chevron-down'
										color={colors.onyx}
										onPress={toggleOverlay}
									/> */}
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
								{/* <Overlay
										overlayStyle={{ height: 350 }}
										isVisible={visible}
										onBackdropPress={toggleOverlay}
										style={styles.overlay}
										// ModalComponent={Modal}
									>
										<CategoryModal
											toggleOverlay={toggleOverlay}
											updateCategory={setCategory}
										/>
									</Overlay> */}
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
										disabled={!isValid || isSubmitting}
										loading={isSubmitting}
										disabledStyle={{
											backgroundColor: colors.primaryBlue,
											color: 'red',
										}}
									/>
									<ErrorMessage errorValue={errors.general} />
								</View>
							</Card>
						</View>
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</>
	);
}
const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		width: 400,
		alignSelf: 'center',
	},
	container: {
		// flex: 1,
		backgroundColor: '#fff',
		marginTop: 24,
	},
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
