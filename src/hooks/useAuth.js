import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';

export const useAuth = () => {
	const [user, setUser] = useState(() => {
		auth.currentUser;
	});
	const [loading, setLoading] = useState(true);

	const onChange = (user) => {
		setUser(user);
		setLoading(false);
	}

	useEffect(() => {


		const unsubscribe = auth.onAuthStateChanged(onChange);

		return () => unsubscribe();
	}, []);

	return [user, loading];
};
