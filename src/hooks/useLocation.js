import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function useLocation() {
	const [loading, setLoading] = useState(true);
	let [location, setLocation] = useState({
		coords: { latitude: '', longitude: '' },
	});

	let [error, setError] = useState(null);

	useEffect(() => {
		const getLocation = async () => {
			try {
				let { status } = await Location.requestPermissionsAsync();
				if (status !== 'granted') {
					setError(error, 'error');
				}
				let location = await Location.getCurrentPositionAsync({});
				setLocation({
					longitude: location.coords.longitude,
					latitude: location.coords.latitude,
				});
			} catch (error) {
				setError(error, 'error');
			} finally {
				setLoading(false);
			}
		};
		getLocation();
	}, []);

	return [location, loading, error];
}
