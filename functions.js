import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let Firebase = firebase.initializeApp(firebaseConfig);
console.log(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const Goologin = async () => {
	try {
		//await GoogleSignIn.askForPlayServicesAsync();
		const result = await Google.logInAsync({
			iosClientId: Constants.manifest.extra.iosClientId,
			androidClientId: Constants.manifest.extra.androidClientId,
		});
		if (result.type === 'success') {
			const credential = firebase.auth.GoogleAuthProvider.credential(
				result.idToken,
				result.accessToken
			);
			auth.signInWithCredential(credential).catch((error) => {
				console.error(e);
			});
		} else {
			alert('login: Error:' + message);
		}
	} catch ({ message }) {
		alert('login: Error:' + message);
	}
};

// export const signIn = (email, password) => {
// 	return auth.signInWithEmailAndPassword(email, password).then((response) => {
// 		const uid = response.user.uid;
// 		db.collection('users')
// 			.doc(uid)
// 			.get()
// 			.then((firestoreDocument) => {
// 				if (!firestoreDocument.exists) {
// 					alert('User does not exist anymore.');
// 					return;
// 				}
// 				const user = firestoreDocument.data();
// 			});
// 	});
// };
// export const createNewUser = (userData) => {
// 	return db.collection('users').doc(`${userData.uid}`).set(userData);
// };
export const signupWithEmail = (email, password) => {
	return auth.createUserWithEmailAndPassword(email, password);
};

export const signOut = async () => {
	await auth.signOut();
};

export const checkUserAuth = (cb) => {
	return auth.onAuthStateChanged(cb);
};

export const createNewUser = (userData) => {
	return db.collection('users').doc(`${userData.uid}`).set(userData);
};

export const signIn = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password);
};

// export const signInWithGoogle = async () => {
// 	const provider = new auth.GoogleAuthProvider();
// 	await auth.signInWithPopup(provider).then(() =>
// 		auth()
// 			.signInWithEmailAndPassword(email, password)
// 			.then((response) => {
// 				const uid = response.user.uid;
// 				const usersRef = firebase.firestore().collection('users');
// 				usersRef
// 					.doc(uid)
// 					.get()
// 					.then((firestoreDocument) => {
// 						const user = firestoreDocument.data();
// 						return firestoreDocument;
// 					});
// 			})
// 	);
// };
//DO NOT DELETE..used in getprofile in home screen
export const getDoc = async (userId) => {
	const snapshot = await db
		.collection('users')
		.where('uid', '==', userId)
		.get();
	const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};
//
export const getProfileDoc = async (profileID) => {
	const snapshot = await db
		.collection('users')
		.where('uid', '==', profileID)
		.get();
	const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};
export const getDocDetails = async (postId) => {
	const snapshot = await firebase
		.firestore()
		.collection('posts')
		.doc(postId)
		.get();
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getCollection = async (id) => {
	const snapshot = await db.collection(id).get();
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getPosts = async () => {
	const snapshot = await db.collection('posts').get();
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserProfile = async (profileID) => {
	try {
		const profile = await db
			.collection('users')
			.where('uid', '==', profileid)
			.get();
		if (!profile.exists) throw Error('Profile doesn\t exist');
		return profile.data();
		mutate(userId);
	} catch (e) {
		console.error(e);
		throw Error(error);
	}
};

export const getProfileData = async (profileID) => {
	const profile = await db.collection('users').doc(profileID).get();
	if (!profile.exists) {
		return;
	}

	return profile;
};

export const getUserList = async (authorID) => {
	const snapshot = await db
		.collection('posts')
		.where('authorID', '==', authorID)
		.get();
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const getUserPosts = async (userId) => {
	const snapshot = await db
		.collection('posts')
		.where('authorID', '==', userId)
		.get();
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const getSavedPostData = async (item) => {
	try {
		const savedPost = await db.collection('posts').doc(item).get();
		if (!savedPost.exists) throw Error('Post doesn\t exist');
		return savedPost.data();
	} catch (e) {
		console.error(e);
		throw Error(e);
	}
};
export const getSavedPosts = async (userId) => {
	let snapshot = await db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.get();
	let data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return data;
};
export const getUserLists = async (savedItems) => {
	console.log(savedItems);
	const snapshot = await db
		.collection('posts')
		.where('id', '==', savedItems)
		.get();
	const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const getProfile = (userId) => {
	return db.collection('users').doc(userId).get();
};

export const uploadImageAsync = async (uri) => {
	// const image = images[0];
	let user = firebase.auth().currentUser;
	let userId = user.uid;
	let name = Math.floor(Math.random() * 99999).toString();
	// console.log(name);
	const response = await fetch(uri);
	const blob = await response.blob();
	// console.log(blob);
	var metadata = {
		contentType: 'image/jpeg',
	};
	// var ref = firebase.storage().ref().child(`$images/${image.name}`);
	var uploadTask = firebase
		.storage()
		.ref()
		.child(`images/${userId}/${name}`)
		.put(blob, metadata);
	return new Promise((resolve, reject) => {
		uploadTask.on(
			'state_changed',
			(snapshot) => console.log('image uploading,', snapshot),
			reject,
			() => {
				firebase
					.storage()
					.ref('images')
					.child(`${userId}`)
					.child(`${name}`)
					.getDownloadURL()
					.then(resolve);
			}
		);
	});
};

export const getUserData = async (userId) => {
	const snapshot = await db.collection('users').doc(userId).get();
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const updateUserEmail = async (newEmail) => {
	let user = firebase.auth().currentUser;
};
export const updateUserData = async (displayName, photoURL, userId) => {
	await db.collection('users').doc(userId).set({
		displayName: displayName,
		photoURL: photoURL,
	});
};
//DO NOT DELTE used for updating profile on profile edit form
export const updateUserProfile = async (values) => {
	console.log(values, 'images');

	let { images, displayName } = values;
	let photoURL = images;
	let user = firebase.auth().currentUser;
	let userId = user.uid;
	await db
		.collection('users')
		.doc(userId)
		.update({
			displayName: displayName,
			photoURL: photoURL ? await uploadImageAsync(photoURL) : null,
		});
};
// export const saveMovie = async (imdbID, movie, userId) => {
// 	let { Title, Poster } = movie;
// 	await db
// 		.collection('users')
// 		.doc(userId)
// 		.collection('movies')
// 		.doc(imdbID)
// 		.set({
// 			id: imdbID,
// 			imdbID: imdbID,
// 			Title: Title,
// 			Poster: Poster,
// 			created: firebase.firestore.FieldValue.serverTimestamp(),
// 			authorID: userId,
// 		});
// };

//DO NOT DELETE (obviously)
export const createPost = async (
	userId,
	displayName,
	email,
	photoURL,
	values,
	location
) => {
	const {
		title,
		description,
		price,
		category,
		phoneNumber,
		altEmail,
		images,
	} = values;
	let { latitude, longitude } = location;
	let image = images[0];
	await db.collection('posts').add({
		userData: { email, displayName, photoURL },
		authorID: userId,
		post: {
			title: title,
			price: price,
			description: description,
			category: category,
			phoneNumber: phoneNumber,
			altEmail: altEmail,
			location,
			image: image ? await uploadImageAsync(image) : null,
		},
		created: firebase.firestore.FieldValue.serverTimestamp(),
	});
};
export const getSavedList = async (userId) => {
	const snapshot = await db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.get();
	const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

// export const savePost = async (postId, userId) => {
// 	db.collection('users').doc(userId).collection('savedPosts').doc(postId).add({
// 		postId: postId,
// 		created: firebase.firestore.FieldValue.serverTimestamp(),
// 	});
// };

export const getSaveData = async (postedId) => {
	// db
	// 	.collection('users')
	// 	.doc(userId)
	// 	.collection('savedPosts')
	const array = [postedId];
	const snapshot = await db.collection('posts').get();
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return data;
};

export const subscribeToPosts = (cb) => {
	return db.collection('posts').orderBy('created', 'desc').onSnapshot(cb);
};

export const postsRef = db.collection('posts').orderBy('created', 'desc');

export const deletePost = (postId) => {
	return db.collection('posts').doc(postId).delete();
};
export const deleteSavedPost = (userId, postId) => {
	return db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.doc(postId)
		.delete();
};

export const checkIfSaved = async (userId, post) => {
	console.log(post, 'post');
	let postedItemId = post.id;
	let querySnapshot = db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.where('postId', '==', postedItemId)
		.get();
	let data = () => {
		querySnapshot.forEach((doc) => {
			console.log(doc.postId, ' => ', doc.data());
		});
	};
	return data;
};

export { Firebase };

// export const Goologin = async () => {
// 	try {
// 		//await GoogleSignIn.askForPlayServicesAsync();
// 		const result = await Google.logInAsync({
// 			iosClientId: Constants.manifest.extra.iosClientId,
// 			androidClientId: Constants.manifest.extra.androidClientId,
// 		});
// 		if (result.type === 'success') {
// 			const credential = firebase.auth.GoogleAuthProvider.credential(
// 				result.idToken,
// 				result.accessToken
// 			);
// 			auth.signInWithCredential(credential).catch((error) => {
// 				console.error(e);
// 			});
// 		} else {
// 			alert('login: Error:' + message);
// 		}
// 	} catch ({ message }) {
// 		alert('login: Error:' + message);
// 	}
// };

// export const signIn = (email, password) => {
// 	return auth.signInWithEmailAndPassword(email, password).then((response) => {
// 		const uid = response.user.uid;
// 		db.collection('users')
// 			.doc(uid)
// 			.get()
// 			.then((firestoreDocument) => {
// 				if (!firestoreDocument.exists) {
// 					alert('User does not exist anymore.');
// 					return;
// 				}
// 				const user = firestoreDocument.data();
// 			});
// 	});
// };

// export const signupWithEmail = (email, password) => {
// 	return auth.createUserWithEmailAndPassword(email, password);
// };

// export const signOut = async () => {
// 	await auth.signOut();
// };

// export const checkUserAuth = (cb) => {
// 	return auth.onAuthStateChanged(cb);
// };

// export const createNewUser = (userData) => {
// 	return db.collection('users').doc(`${userData.uid}`).set(userData);
// };

export const savePost = async (postId, userId) => {
	await db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.doc(postId)
		.set({
			id: postId,
			created: firebase.firestore.FieldValue.serverTimestamp(),
			authorID: userId,
		});
};
// export const getUser = () => {
// 	let user = firebase.auth().currentUser;
// 	return user;
// };
export const getSavedThePosts = async (userId) => {
	let savedList = [];
	savedList = await db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.get()
		.then(() => {
			const snapshot = db.collection('posts').get();
			const data = snapshot.docs.map((doc) => ({
				savedList: doc.id,
				...doc.data(),
			}));
			return data;
		});
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

// export const deleteMovieItem = (item, userId) => {
// 	let { id } = item;
// 	return db
// 		.collection('users')
// 		.doc(userId)
// 		.collection('movies')
// 		.doc(id)
// 		.delete();
// };
// export default Firebase;
