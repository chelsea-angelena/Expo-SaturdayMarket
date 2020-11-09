import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, View, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Text from '../../Atoms/AppText';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import FormButton from './FormButton';
import ErrorMessage from './ErrorMessage';
import * as db from '../../config/firebaseConfig';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../Atoms/Logo';
import colors from '../../styles/colors';
import Screen from './Screen';

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
	const [error, setError] = useState(null);
	const navigation = useNavigation();
	const goToSignUp = () => navigation.navigate('SignUpScreen');

	// const GoogleSignIn = async () => {
	// 	try {
	// 		let response = await db.Goologin();
	// 		// const uid = response.user.uid;

	// 	} catch (e) {
	// 		setError(e);
	// 	}
	// };

	const handleLogin = async (values) => {
		const { email, password } = values;
		try {
			await db.signIn(email, password);
		} catch (e) {
			setError(e);
		}
	};
	return (
		<Screen>
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
									style={{ color: colors.white }}
									onBlur={handleBlur('email')}
								/>
								<ErrorMessage errorValue={touched.email && errors.email} />
								<FormInput
									name='password'
									style={{ color: colors.white }}
									value={values.password}
									onChangeText={handleChange('password')}
									placeholder='Enter password'
									secureTextEntry
									iconName='ios-lock'
									iconColor='#2C384A'
									onBlur={handleBlur('password')}
								/>
								<ErrorMessage
									errorValue={touched.password && errors.password}
								/>
								<View style={styles.buttonContainer}>
									<FormButton
										buttonType='outline'
										onPress={handleSubmit}
										title='LOGIN'
										buttonColor={colors.ochre}
										disabled={!isValid}
									/>
								</View>
								<ErrorMessage errorValue={errors.general} />
							</>
						)}
					</Formik>
					{error ? Alert.alert('Please try Sign In again, or, Sign Up') : null}
					{/* <Button
						icon={
							<Icon
								name='google'
								type='ant-design'
								style={{ paddingRight: 32 }}
								size={24}
								color='white'
							/>
						}
						iconLeft
						title='Sign In With Google'
						onPress={GoogleSignIn}
						style={{ borderRadius: 40, margin: 24 }}
					/> */}
					<Text style={{ alignSelf: 'center' }}>Don't Have an account? </Text>
					<Button
						title='Sign up here'
						type='clear'
						// backgroundColor='none'
						onPress={goToSignUp}
						titleStyle={{
							color: colors.ochre,
						}}
					/>
				</View>
			</KeyboardAwareScrollView>
		</Screen>
	);
};

export default SignInScreen;
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
	},

	buttonContainer: {
		margin: 25,
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
});
