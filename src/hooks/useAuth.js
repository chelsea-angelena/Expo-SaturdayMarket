import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as db from '../config/firebaseConfig';
import { auth } from '../config/firebaseConfig';

export const useAuth = () => {
	const [user, setUser] = useState(() => {
		auth.currentUser;
	});
	const [loading, setLoading] = useState(true);

	function onChange(user) {
		setUser(user);
		setLoading(false);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(onChange);

		return () => unsubscribe();
	}, []);

	return [user, loading];
};
