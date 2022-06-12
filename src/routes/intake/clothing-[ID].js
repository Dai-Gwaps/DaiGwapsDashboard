import dbRef from '$lib/app/firebase';
import { addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const db = dbRef.clothes;
const idb = dbRef.intake;

export const get = async ({ params }) => {
	const id = params.ID;

	const body = {};

	try {
		const res = await getDoc(doc(idb, id));
		body.item = { id, ...res.data() };
		console.log('Item Data Loaded Successfully');
	} catch (error) {
		console.error('Error Loading Item Data', error);
	}

	return {
		body
	};
};

export const post = async ({ request }) => {
	const req = await request.json();

	try {
		await addDoc(db, req);
		console.log('Successfully Completed Item Intake');
		return {
			body: {
				success: 'Item Intake Success!'
			}
		};
	} catch (error) {
		console.error('Error inaking item updates and measurements.', error);
		return {
			body: {
				error: 'Error Completing Item Intake.'
			}
		};
	}
};

export const patch = async ({ params }) => {
	const id = params.ID;

	try {
		updateDoc(doc(idb, id), { intake_complete: true });
		console.log('Original Item Update Submitted');
	} catch (error) {
		console.error('Error Toggling Item:', error);
		return {
			body: { error: 'Error updating intake status.' }
		};
	}

	console.log('INTAKE: Updated intake as complete.');
	return {
		body: { success: 'Item Intake Toggle Successful' }
	};
};
