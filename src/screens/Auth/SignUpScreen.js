import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import * as db from '../../config/firebaseConfig';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CheckBox, Button } from 'react-native-elements';
import ErrorMessage from './ErrorMessage';
import Logo from '../../Atoms/Logo';
import colors from '../../styles/colors';

const validationSchema = Yup.object().shape({
	displayName: Yup.string()
		.label('Name')
		.required()
		.min(2, 'Must have at least 2 characters'),
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(4, 'Password must have more than 4 characters '),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
		.required('Confirm Password is required'),
	check: Yup.boolean().oneOf([true], 'Please check the agreement'),
});

const SignUpScreen = () => {
	const [userEmail, setUserEmail] = useState('');
	const [uid, setUserId] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	const goToLogIn = () => {
		navigation.navigate('SignInScreen');
	};
	const handleSignUp = async (values) => {
		const { email, password, displayName } = values;
		try {
			const response = await db.signupWithEmail(email, password);
			setUserId(response.user.uid);
			setUserEmail(response.user.email);
			await db.createNewUser({
				email: response.user.email,
				uid: response.user.uid,
				displayName: displayName,
			});
			navigation.navigate('TabNavigator', { screen: 'PostsStackScreen' });
		} catch (error) {
			setError(error.message);
			setSubmitting(false);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<KeyboardAwareScrollView>
			<Logo />
			<View style={styles.container}>
				<Formik
					initialValues={{
						displayName: '',
						email: '',
						password: '',
						confirmPassword: '',
						check: false,
					}}
					onSubmit={(values) => {
						handleSignUp(values);
					}}
					validationSchema={validationSchema}
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
						setFieldValue,
					}) => (
						<>
							<FormInput
								displayName='displayName'
								value={values.displayName}
								onChangeText={handleChange('displayName')}
								placeholder='Enter your full name'
								iconName='md-person'
								iconColor='#2C384A'
								onBlur={handleBlur('displayName')}
							/>
							<ErrorMessage errorValue={touched.name && errors.name} />
							<FormInput
								name='email'
								value={values.email}
								onChangeText={handleChange('email')}
								placeholder='Enter email'
								autoCapitalize='none'
								iconName='ios-mail'
								iconColor='#2C384A'
								onBlur={handleBlur('email')}
							/>
							<ErrorMessage errorValue={touched.email && errors.email} />
							<FormInput
								name='password'
								value={values.password}
								onChangeText={handleChange('password')}
								placeholder='Enter password'
								iconName='ios-lock'
								iconColor='#2C384A'
								onBlur={handleBlur('password')}
								secureTextEntry
							/>
							<ErrorMessage errorValue={touched.password && errors.password} />
							<FormInput
								name='password'
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								placeholder='Confirm password'
								iconName='ios-lock'
								iconColor='#2C384A'
								onBlur={handleBlur('confirmPassword')}
								secureTextEntry
							/>

							<ErrorMessage
								errorValue={touched.confirmPassword && errors.confirmPassword}
							/>
							<CheckBox
								containerStyle={styles.checkBoxContainer}
								checkedIcon='check-box'
								iconType='material'
								uncheckedIcon='check-box-outline-blank'
								title='Agree to terms and conditions'
								checkedTitle='You agreed to our terms and conditions'
								checked={values.check}
								onPress={() => setFieldValue('check', !values.check)}
							/>
							<View style={styles.buttonContainer}>
								<FormButton
									buttonType='outline'
									onPress={handleSubmit}
									title='SIGNUP'
									buttonColor={colors.ochre}
									disabled={!isValid || isSubmitting}
									loading={isSubmitting}
								/>
							</View>
							<ErrorMessage errorValue={errors.general} />
						</>
					)}
				</Formik>
				<Button
					title='Have an account? Login'
					onPress={goToLogIn}
					titleStyle={{
						color: colors.drab,
					}}
					type='clear'
				/>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		paddingTop: 15,
	},
	logoContainer: {
		marginBottom: 15,
		alignItems: 'center',
	},
	buttonContainer: {
		margin: 25,
	},
	checkBoxContainer: {
		backgroundColor: colors.white,
		borderColor: '#fff',
	},
});
