import 'react-native-gesture-handler';
import React, { useState, Component, Fragment, useContext } from 'react';
import {
	Alert,
	Platform,
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../Context/AuthContext';
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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const innerWidth = 0.95 * windowWidth;

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
	const goToSignup = () => navigation.navigate('SignUpScreen');

	// const GoogleSignIn = async () => {
	// 	try {
	// 		await db.Goologin();
	// 	} catch (e) {
	// 		setError('error');
	// 	}
	// };

	// const GoogleSignIn = async () => {
	// 	try {
	// 		const { type, token, user, error } = await db.googleLogin();

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
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: colors.white,
		paddingTop: 15,
		height: 1000,
	},
	// logoContainer: {
	// 	marginBottom: 15,
	// 	alignItems: 'center',
	// },
	buttonContainer: {
		margin: 25,
	},
});

// export default SignInScreen;
// const validationSchema = Yup.object().shape({
// 	email: Yup.string()
// 		.label('Email')
// 		.email('Enter a valid email')
// 		.required('Please enter a registered email'),
// 	password: Yup.string()
// 		.label('Password')
// 		.required()
// 		.min(6, 'Password must have at least 6 characters '),
// });

// const SignInScreen = () => {
// 	const user = useContext(AuthContext);
// 	const [error, setError] = useState(null);
// 	const navigation = useNavigation();
// 	const goToSignup = () => navigation.navigate('SignUpScreen');

// 	// const GoogleSignIn = async () => {
// 	// 	try {
// 	// 		await db.Goologin();
// 	// 	} catch (e) {
// 	// 		setError('error');
// 	// 	}
// 	// };

// 	// const GoogleSignIn = async () => {
// 	// 	try {
// 	// 		const { type, token, user, error } = await db.googleLogin();

// 	// 		if (type === 'success') {
// 	// 			// DISPATCH TOKEN AND USER DATA
// 	// 			// TO IMPLEMENT NAVIGATION AND USER INFO DISPLAYS
// 	// 			dispatch({ type: 'GOOGLE_LOGIN', token: accessToken, user });
// 	// 		}
// 	// 	} catch (e) {
// 	// 		console.log('error', e);
// 	// 	}
// 	// };

// 	const handleLogin = async (values) => {
// 		const { email, password } = values;
// 		try {
// 			await db.signIn(email, password);
// 		} catch (e) {
// 			setError(e);
// 		}
// 	};
// 	return (
// 		<Screen>
// 			<KeyboardAwareScrollView>
// 				<View style={styles.innerView}>
// 					<Formik
// 						initialValues={{ email: '', password: '' }}
// 						onSubmit={(values) => {
// 							handleLogin(values);
// 						}}
// 						validationSchema={validationSchema}
// 					>
// 						{({
// 							handleChange,
// 							values,
// 							handleSubmit,
// 							errors,
// 							isValid,
// 							touched,
// 							handleBlur,
// 						}) => (
// 							<>
// 								<FormInput
// 									name='email'
// 									value={values.email}
// 									onChangeText={handleChange('email')}
// 									placeholder='Enter email'
// 									autoCapitalize='none'
// 									iconName='ios-mail'
// 									iconColor='#2C384A'
// 									style={{ color: colors.white }}
// 									onBlur={handleBlur('email')}
// 								/>
// 								<ErrorMessage errorValue={touched.email && errors.email} />
// 								<FormInput
// 									name='password'
// 									style={{ color: colors.white }}
// 									value={values.password}
// 									onChangeText={handleChange('password')}
// 									placeholder='Enter password'
// 									secureTextEntry
// 									iconName='ios-lock'
// 									iconColor='#2C384A'
// 									onBlur={handleBlur('password')}
// 								/>
// 								<ErrorMessage
// 									errorValue={touched.password && errors.password}
// 								/>

// 								<FormButton
// 									buttonType='outline'
// 									onPress={handleSubmit}
// 									title='LOGIN'
// 									buttonColor={colors.white}
// 									backgroundColor={colors.red}
// 									disabled={!isValid}
// 								/>

// 								<ErrorMessage errorValue={errors.general} />
// 							</>
// 						)}
// 					</Formik>

// 					{error ? Alert.alert('Please try Sign In again, or, Sign Up') : null}
// 					{/* <Button
// 						icon={
// 							<Icon
// 								name='google'
// 								type='ant-design'
// 								style={{ paddingRight: 32 }}
// 								size={24}
// 								color='white'
// 							/>
// 						}
// 						iconLeft
// 						title='Sign In With Google'
// 						onPress={GoogleSignIn}
// 						style={{ borderRadius: 40, margin: 24 }}
// 					/> */}
// 					<Button
// 						title="Don't have an account? Sign Up"
// 						onPress={goToSignup}
// 						titleStyle={{
// 							color: colors.white,
// 						}}
// 						type='clear'
// 					/>
// 				</View>
// 			</KeyboardAwareScrollView>
// 		</Screen>
// 	);
// };

// const styles = StyleSheet.create({
// 	buttonContainer: {
// 		margin: 25,
// 	},
// 	innerView: {
// 		width: innerWidth,
// 		alignSelf: 'center',
// 		// backgroundColor: 'rgba(0,0,0,.7)',
// 		// paddingTop: 32,
// 		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
// 		color: colors.white,
// 	},
// 	errorView: {
// 		alignSelf: 'center',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// });

export default SignInScreen;
