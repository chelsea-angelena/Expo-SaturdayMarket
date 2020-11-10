import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LocationContext } from '../../Context/LocationContext';

export default function Map() {
	const location = useContext(LocationContext);
	const {
		coords: { latitude, longitude },
	} = location;

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
