import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function DetailMap({ location }) {
	const { latitude, longitude } = location;
	if (!location) {
		return <ActivityIndicator size='large' />;
	}
	return (
		<MapView
			loadingEnabled={true}
			showsUserLocation={true}
			initialRegion={{
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: 0.03,
				longitudeDelta: 0.03,
			}}
			region={{
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: 0.03,
				longitudeDelta: 0.03,
			}}
			style={styles.map}
		>
			<Marker
				coordinate={{
					latitude: latitude,
					longitude: longitude,
				}}
				title='Current Location'
				description='Location of user'
			/>
		</MapView>
	);
}

const styles = StyleSheet.create({
	map: {
		width: '100%',
		height: 300,
	},
});
