import React, { useState, useEffect, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Button, Input } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { FormInput, ErrorMessage, FormButton } from './ProfileFormComponents';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../Context/AuthContext';
import FormImagePicker from '../../Atoms/FormImagePicker';
import * as db from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../screens/Auth/Screen';

export default function EditProfile({ onUpdate, onToggleOverlay }, props) {
	// const [submitting, setSubmitting] = useState(false);

	const user = useContext(AuthContext);
	console.log(user, 'user');
	const userId = user.uid;
	console.log(userId, 'userId');
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Formik
				initialValues={{
					displayName: '',
					images: [],
				}}
				onSubmit={(values, { resetForm }) => {
					console.log(values, 'values');
					onUpdate(values, userId);
					onToggleOverlay();
					resetForm({ values: '' });
				}}
			>
				{({
					handleChange,
					values,
					handleSubmit,
					errors,
					isValid,
					touched,
					handleBlur,
					isSubmitting,
				}) => (
					<View style={styles.view}>
						<FormImagePicker style={styles.picker} type='Blob' name='images' />
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
						<View style={styles.buttonContainer}>
							<FormButton
								buttonType='outline'
								onPress={handleSubmit}
								title='Update Profile'
								buttonColor='#039BE5'
								// disabled={!isValid || isSubmitting}
								// loading={isSubmitting}
							/>
						</View>
						<ErrorMessage errorValue={errors.general} />
					</View>
				)}
			</Formik>
		</View>
	);
}
const styles = StyleSheet.create({
	// logoContainer: {
	// 	marginBottom: 15,
	// 	alignItems: 'center',
	// },
	container: {
		maxHeight: 400,
	},
	view: {
		minWidth: 300,
		maxHeight: 400,
	},
	buttonContainer: {
		margin: 25,
	},
});
