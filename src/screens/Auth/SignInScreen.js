import 'react-native-gesture-handler';
import React, { useState, Component, Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import FormButton from './FormButton';
import ErrorMessage from './ErrorMessage';
import * as db from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../Atoms/Logo';
import colors from '../../styles/colors';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(6, 'Password must have at least 6 characters '),
});

const SignInScreen = () => {
	const [submitting, setSubmitting] = useState(false);
	const [user, setUser] = useState({});
	const [error, setError] = useState(null);
	const navigation = useNavigation();
	const goToSignup = () => navigation.navigate('SignUpScreen');

	const handleLogin = async (values) => {
		const { email, password } = values;
		try {
			const response = await db.loginWithEmail(email, password);
			if (response.user) {
				setUser(response);
				// navigation.navigate('TabNav', { screen: 'PostsStack', screen:"PostsListScreen" });
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setSubmitting(false);
		}
	};
	// const { passwordVisibility, rightIcon } = this.state;
	return (
		<KeyboardAwareScrollView>
			<Logo />
			<View style={styles.container}>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={(values) => {
						handleLogin(values);
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
					}) => (
						<>
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
								secureTextEntry
								iconName='ios-lock'
								iconColor='#2C384A'
								onBlur={handleBlur('password')}
							/>
							<ErrorMessage errorValue={touched.password && errors.password} />
							<View style={styles.buttonContainer}>
								<FormButton
									buttonType='outline'
									onPress={handleSubmit}
									title='LOGIN'
									buttonColor={colors.ochre}
									disabled={!isValid || isSubmitting}
								/>
							</View>
							<ErrorMessage errorValue={errors.general} />
						</>
					)}
				</Formik>
				<Button
					title="Don't have an account? Sign Up"
					onPress={goToSignup}
					titleStyle={{
						color: colors.drab,
					}}
					type='clear'
				/>
			</View>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: colors.white,
		paddingTop: 15,
		height:1000,
	},
	// logoContainer: {
	// 	marginBottom: 15,
	// 	alignItems: 'center',
	// },
	buttonContainer: {
		margin: 25,
	},
});

export default SignInScreen;
