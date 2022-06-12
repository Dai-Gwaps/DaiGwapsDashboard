import dbRef from '$lib/app/firebase';
import {
	getDocs,
	addDoc,
	Timestamp,
	deleteDoc,
	doc,
	query,
	writeBatch,
	updateDoc,
	where
} from 'firebase/firestore';

const db = dbRef.ship;
const idb = dbRef.intake;
const dbase = dbRef.db;

/*
################################
------- Initialize - GET -------
################################
*/

export const get = async () => {
	const shipInit = { shipGroups: [] };
	try {
		const res = await getDocs(db);
		res.forEach((doc) => {
			const objAdd = { id: doc.id, ...doc.data() };
			const upDate = objAdd.shipping_date.toDate();
			objAdd.shipping_date = upDate;
			shipInit.shipGroups.push(objAdd);
		});
	} catch (error) {
		console.error('Error getting Ship Groups:', error);
	}

	return {
		body: shipInit
	};
};

/*
################################
------ Add Group - POST ------
################################
*/

export const post = async ({ request }) => {
	const data = await request.json();
	console.log(data);
	const fixDate = Timestamp.fromDate(new Date(data.shipping_date));
	data.shipping_date = fixDate;
	try {
		const res = await addDoc(db, data);
		return {
			body: {
				group: res.id,
				success: 'Successfully Added Group!'
			}
		};
	} catch (error) {
		console.error('Error adding Ship Group:', error);
		return {
			body: {
				error: 'Error Adding Group'
			}
		};
	}
};

// /*
// ################################
// ------ Fix Prices - PUT ------
// ################################
// */

export const put = async ({ request }) => {
	const { group } = await request.json();
	const { shipping_group } = group;
	let items = [];
	let quantity = 0;

	const q = query(idb, where('shipping_group', '==', shipping_group));
	try {
		const getRes = await getDocs(q);
		getRes.forEach((doc) => {
			const objAdd = { id: doc.id, ...doc.data() };
			quantity += objAdd.original_quantity;
			items.push(objAdd);
		});
	} catch (error) {
		console.error('Error Initializing Items:', error);
		return {
			body: {
				error: 'Error Initializing Items'
			}
		};
	}

	console.log(`Updating with Quantity ${quantity}`);

	const groupPrice = parseFloat((group.shipping_cost / quantity).toFixed(2));

	for (let item of items) {
		item.shipping_cost = groupPrice;
		item.total_cost = item.product_cost + item.shipping_cost;
		item.recommended_value = item.total_cost * 2;
	}

	// UPDATE DATABASE ITEMS IN BATCH

	try {
		const batch = writeBatch(dbase);

		for (let item of items) {
			batch.set(doc(idb, item.id), item);
		}

		await batch.commit();
	} catch (error) {
		console.error('Error Updating Items:', error);
		return {
			body: {
				error: 'Error Updating Items'
			}
		};
	}

	try {
		updateDoc(doc(db, group.id), { item_quantity: quantity, individual_cost: groupPrice });
		group.item_quantity = quantity;
		group.individual_cost = groupPrice;
		return {
			body: {
				success: 'Group Price Update Successful.',
				group
			}
		};
	} catch (error) {
		console.error('Error Updating Group:', error);
		return {
			body: {
				error: 'Error Updating Group'
			}
		};
	}
};

// /*
// ################################
// ------ Remove Items - DEL ------
// ################################
// */

export const del = async ({ request }) => {
	const req = await request.json();
	const { id } = req;
	console.log(id);
	try {
		await deleteDoc(doc(db, id));
		return {
			body: {
				success: 'Successfully Removed Group!'
			}
		};
	} catch (error) {
		console.error('Error adding Ship Group:', error);
		return {
			body: {
				error: 'Error Removing Group'
			}
		};
	}
};
