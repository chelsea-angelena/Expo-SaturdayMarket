import React, { useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, View } from 'react-native';
import { FormInput, ErrorMessage, FormButton } from './ProfileFormComponents';
import { Formik } from 'formik';
import { AuthContext } from '../../Context/AuthContext';
import FormImagePicker from '../../Atoms/FormImagePicker';

export default function EditProfile({ onUpdate, onToggleOverlay }, props) {
	const user = useContext(AuthContext);
	const userId = user.uid;


	return (
		<View style={styles.container}>
			<Formik
				initialValues={{
					displayName: '',
					images: [],
				}}
				onSubmit={(values, { resetForm }) => {
					onUpdate(values, userId);
					onToggleOverlay();
				}}
			>
				{({
					handleChange,
					values,
					handleSubmit,
					errors,
					touched,
					handleBlur,
				}) => (
					<KeyboardAwareScrollView>
						<View style={styles.view}>
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
							<View style={styles.buttonContainer}>
								<FormButton
									buttonType='outline'
									onPress={handleSubmit}
									title='Update Profile'
									buttonColor='#039BE5'
								/>
							</View>
							<ErrorMessage errorValue={errors.general} />
						</View>
					</KeyboardAwareScrollView>
				)}
			</Formik>
		</View>
	);
}
const styles = StyleSheet.create({
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
