import { useState, useEffect } from 'react';

import * as Location from 'expo-location';

export default function useLocation() {
	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
			}
			let result = await Location.getCurrentPositionAsync({});
			setLocation(result);
		})();
		setLoading(false);
	}, []);

	return [location, loading, errorMsg];
}
