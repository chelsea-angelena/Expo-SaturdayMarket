// import React, { useEffect, useState } from 'react';
// import { Text } from 'react-native';
// import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
			setLoading(false);
		})();
	}, []);
	return [location, loading];
}

