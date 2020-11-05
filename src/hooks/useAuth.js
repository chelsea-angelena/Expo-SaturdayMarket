import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as db from '../config/firebaseConfig.js';

export default () => {
	const [user, setUser] = useState();

	const [error, setError] = useState(true);

	const onAuthStateChanged = (user) => {
		setUser({ user });
	};

	useEffect(() => {
		db.checkUserAuth(onAuthStateChanged);
	}, []);

	return [user];
};
