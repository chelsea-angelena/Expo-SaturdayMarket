//import firebase base
//impot config file
//not linke dot compoennts
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const Goologin = async () => {
	try {
		const result = await Google.logInAsync({
			iosClientId: Constants.manifest.extra.dev.iosClientId,
			androidClientId: Constants.manifest.extra.dev.androidClientId,
			clientId: Constants.manifest.extra.dev.clientId,
		});

		if (result.type === 'success') {
			const credential = firebase.auth.GoogleAuthProvider.credential(
				result.idToken,
				result.accessToken
			);
			auth.signInWithCredential(credential).catch((error) => {
				console.error(error);
			});
		} else {
			alert('login: Error:' + message);
		}
	} catch ({ message }) {
		alert('login: Error:' + message);
	}
};

export const signupWithEmail = (email, password) => {
	return auth.createUserWithEmailAndPassword(email, password);
};

export const signOut = async () => {
	await auth.signOut();
};

export const checkUserAuth = (cb) => {
	return auth.onAuthStateChanged(cb);
};

export const createNewUser = async (userData) => {
	return db.collection('users').doc(`${userData.uid}`).set(userData);
};

export const signIn = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password);
};

export const getDoc = async (userId) => {
	const snapshot = await db
		.collection('users')
		.where('uid', '==', userId)
		.get();
	const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};

export const getPostsById = async (postId) => {
	const snapshot = await db.collection('posts').doc(postId).get();
	const data = snapshot.docs.map((doc) => ({ id: doc.postId, ...doc.data() }));
	return data;
};

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
//DO NOT DELETE
export const createPost = async (
	userId,
	userData,
	values,
	latitude,
	longitude
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
	const { photoURL, displayName, email } = userData;
	let image = images[0];
	await db
		.collection('posts')
		.doc()
		.set({
			userData: {
				email: email,
				displayName: displayName,
				photoURL: photoURL ? photoURL : null,
			},
			post: {
				title: title,
				price: price,
				description: description,
				category: category,
				phoneNumber: phoneNumber,
				altEmail: altEmail,
				location: { latitude: latitude, longitude: longitude },
				image: image ? await uploadImageAsync(image) : null,
			},
			created: firebase.firestore.FieldValue.serverTimestamp(),
			authorID: userId,
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

export const getSaveData = async (postedId) => {
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
export const deleteSavedPost = (postId, userId) => {
	return db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.doc(postId)
		.delete();
};

export const checkIfSaved = async (userId, post) => {
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

//DO NOT DELETE!!
export const savePost = async (item, userId) => {
	const { authorID, id, post, created, userData } = item;
	db.collection('users').doc(userId).collection('savedPosts').doc(id).set({
		post,
		userData,
		created,
	});
};
export const getUser = () => {
	let user = firebase.auth().currentUser;
	return user;
};

//DO NOT DELETE
export const getSavedThePosts = async (userId) => {
	let snapshot = await db
		.collection('users')
		.doc(userId)
		.collection('savedPosts')
		.get();
	let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return data;
};
