import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormInput, ErrorMessage, FormButton } from './ProfileFormComponents';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../../App';
import FormImagePicker from '../../Atoms/FormImagePicker';
import * as db from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../Atoms/Screen';

export default function EditProfile() {
	const [submitting, setSubmitting] = useState(false);
	const user = useContext(UserContext);
	const navigation = useNavigation();
	const submitProfileForm = async (values) => {
		const { images, displayName, altEmail } = values;
		try {
			const response = await db.updateUserProfile(values, user);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
			navigation.navigate('Home');
		}
	};

	return (
		<Screen>
			<View style={styles.container}>
				<Formik
					initialValues={{
						displayName: user.displayName,
						altEmail: user.altEmail,
						images: [],
					}}
					onSubmit={(values, { resetForm }) => {
						submitProfileForm(values);
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
							<FormImagePicker
								style={styles.picker}
								type='Blob'
								name='images'
							/>
							<FormInput
								name='displayName'
								value={values.displayName}
								onChangeText={handleChange('displayName')}
								placeholder={user.displayName}
								autoCapitalize='none'
								iconName='ios-contact'
								iconColor='#2C384A'
								onBlur={handleBlur('displayName')}
							/>
							<ErrorMessage
								errorValue={touched.displayName && errors.displayName}
							/>
							<FormInput
								name='altEmail'
								value={values.altEmail}
								onChangeText={handleChange('altEmail')}
								placeholder={user.email}
								iconName='ios-mail'
								iconColor='#2C384A'
								onBlur={handleBlur('altEmail')}
							/>
							<ErrorMessage errorValue={touched.altEmail && errors.altEmail} />
							<View style={styles.buttonContainer}>
								<FormButton
									buttonType='outline'
									onPress={handleSubmit}
									title='Update Profile'
									buttonColor='#039BE5'
									disabled={!isValid || isSubmitting}
									loading={isSubmitting}
								/>
							</View>
							<ErrorMessage errorValue={errors.general} />
						</KeyboardAwareScrollView>
					)}
				</Formik>
			</View>
		</Screen>
	);
}
const styles = StyleSheet.create({
	container: {

		backgroundColor: '#fff',
		marginTop: 50,
	},
	// logoContainer: {
	// 	marginBottom: 15,
	// 	alignItems: 'center',
	// },
	buttonContainer: {
		margin: 25,
	},
});
