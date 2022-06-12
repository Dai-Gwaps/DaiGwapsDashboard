import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API,
	authDomain: 'dai-gwaps-admin.firebaseapp.com',
	projectId: 'dai-gwaps-admin',
	storageBucket: 'dai-gwaps-admin.appspot.com',
	messagingSenderId: '928815753895',
	appId: import.meta.env.VITE_PUBLIC_FIREBASE_APPID,
	measurementId: 'G-G6MT359R1M'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get access to Firestore
const db = getFirestore(app);
const ship = collection(db, 'shipping_groups');
const intake = collection(db, 'intake_items');
const clothes = collection(db, 'clothing');
const other = collection(db, 'non_clothes');

const dbRef = {
	db,
	ship,
	intake,
	clothes,
	other
};

export default dbRef;
