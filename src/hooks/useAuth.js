import React, { useContext, createContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as db from '../config/firebaseConfig';

export default function useAuth() {
	// Handle user state changes
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		db.checkUserAuth((user) => {
			setLoading(false);
			setUser(user);
		});
	}, []);

	return [user, loading];
}
// import { auth } from '../../config/firebaseConfig.js';
// function useAuth() {
// 	const [user, setUser] = useState(null)
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		return db.checkUserAuth(user);
// 	}, []);

// 	return [user, loading];
// }
// import React, { useState, useEffect } from 'react';

// function useAuth() {
//   const [user, setUser] = useState\(null);

//   useEffect(() => {
//     let user = db.checkUserAuth()
//       setUser(user);
//     }
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//     // Specify how to clean up after this effect:
//     return function cleanup() {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     };
//   });

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }
// // export default useAuth;

// // export const UserContext = React.createContext({
// // 	user: null,
// // });
// // export const useSession = () => {
// // 	const { user } = useContext(UserContext);
// // 	return user;
// // };

// // export const useAuth = () => {
// // 	const [state, setState] = React.useState(() => {
// // const [user, setUser]
// // const [loading, setLoadi]
// // 		const user = auth.currentUser;
// // 		return {
// // 			initializing: !user,
// // 			user,
// // 		};
// // 	});

// // 	const checkUserAuth = (user) => {
// // 		auth.checkAuth();
// // 		setUser(user);
// // 		setLoading(false);
// // 	};

// // 	useEffect(() => {
// // 		// listen for auth stiate changes
// // 		const unsubscribe = auth.onAuthStateChange(onChange);

// // 		// unsubscribe to the listener when unmounting
// // 		return () => unsubscribe();
// // 	}, []);

// // 	return state;
// // };
