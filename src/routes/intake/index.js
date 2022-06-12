import dbRef from '$lib/app/firebase';
import {
	getDocs,
	addDoc,
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
	const intakeLoad = { shipGroups: [], intakeItems: [] };

	try {
		const res = await getDocs(db);
		res.forEach((doc) => {
			const objAdd = { id: doc.id, ...doc.data() };
			const upDate = objAdd.shipping_date.toDate();
			objAdd.shipping_date = upDate;
			intakeLoad.shipGroups.push(objAdd);
		});
	} catch (error) {
		console.error('Error getting Ship Groups:', error);
	}

	try {
		const q = query(idb, where('intake_complete', '==', false));
		const res = await getDocs(q);
		res.forEach((doc) => {
			const objAdd = { id: doc.id, ...doc.data() };
			intakeLoad.intakeItems.push(objAdd);
		});
		console.log(`A total of ${intakeLoad.intakeItems.length} items were successfully loaded.`);
	} catch (error) {
		console.error('Error Getting Intake Items:', error);
	}

	return {
		body: intakeLoad
	};
};

/*
################################
------- New Item - POST --------
################################
*/

export const post = async ({ request }) => {
	const { newItem, shipping, items } = await request.json();
	newItem.product_cost = parseFloat(newItem.product_cost);
	newItem.original_quantity = parseInt(newItem.original_quantity);
	const i = newItem.shipping_group;
	const group = shipping[i];
	const id = group.id;
	const groupQuant = group.item_quantity + newItem.original_quantity;
	const groupPrice = parseFloat((group.shipping_cost / groupQuant).toFixed(2));
	const postLoad = { shipGroups: shipping };

	try {
		updateDoc(doc(db, id), { item_quantity: groupQuant, individual_cost: groupPrice });
		console.log('Group Update Submitted');
		group.item_quantity = groupQuant;
		group.individual_cost = groupPrice;
	} catch (error) {
		console.error('Error Updating Group:', error);
		return {
			body: {
				error: 'Error Updating Group'
			}
		};
	}

	const upItems = items.filter((shi) => shi.shipping_group === group.shipping_group);
	const nonUpItems = items.filter((shi) => shi.shipping_group !== group.shipping_group);

	for (let item of upItems) {
		item.shipping_cost = groupPrice;
		item.total_cost = item.product_cost + item.shipping_cost;
		item.recommended_value = item.total_cost * 2;
	}

	newItem.shipping_cost = groupPrice;
	newItem.total_cost = newItem.product_cost + newItem.shipping_cost;
	newItem.recommended_value = newItem.total_cost * 2;

	newItem.shipping_group = group.shipping_group;
	newItem.item_split = false;
	newItem.intake_complete = false;

	// UPDATE DATABASE ITEMS IN BATCH

	try {
		const batch = writeBatch(dbase);

		for (let item of upItems) {
			batch.set(doc(idb, item.id), item);
		}

		await batch.commit();
		console.log('Item Update Completed');
	} catch (error) {
		console.error('Error Updating Items:', error);
		return {
			body: {
				error: 'Error Updating Items'
			}
		};
	}

	postLoad.intakeItems = [...nonUpItems, ...upItems];

	try {
		const res = await addDoc(idb, newItem);
		newItem.id = res.id;
		console.log('New Item Added Scucessfully!');
	} catch {
		console.error('Error Adding New Item: ', error);
		return {
			body: {
				error: 'Error Adding Item'
			}
		};
	}

	postLoad.intakeItems.push(newItem);
	postLoad.success = 'Add Item Successful';
	return {
		body: postLoad
	};
};

/*
################################
------- Split Items - PUT ------
################################
*/

export const put = async ({ request }) => {
	const info = await request.json();
	const { index, quantity, update_name } = info.data;
	const items = info.intakeItems;
	const id = items[index].id;

	const item_update = {
		original_quantity: items[index].original_quantity - quantity,
		item_split: true
	};
	const new_item = {
		...items[index],
		original_quantity: quantity,
		original_name: update_name,
		item_split: true
	};

	delete new_item.id;
	console.log(id);

	try {
		updateDoc(doc(idb, id), item_update);
		console.log('Original Item Update Submitted');
		items[index] = {
			...items[index],
			...item_update
		};
	} catch (error) {
		console.error('Error Updating Item:', error);
		return {
			body: {
				error: 'Error Updating Item'
			}
		};
	}

	try {
		const res = await addDoc(idb, new_item);
		new_item.id = res.id;
		items.push(new_item);
	} catch {
		console.error('Error Adding New Item: ', error);
		return {
			body: {
				error: 'Error Adding Item'
			}
		};
	}

	return {
		body: { intakeItems: items }
	};
};
/*
################################
--- Toggle Complete - PATCH ----
################################
*/

export const patch = async ({ request }) => {
	const req = await request.json();
	const id = req.id || req;

	try {
		updateDoc(doc(idb, id), { intake_complete: true });
		console.log('Original Item Update Submitted');
	} catch (error) {
		console.error('Error Toggling Item:', error);
		return {
			body: {
				error: 'Error Toggling Item'
			}
		};
	}

	console.log('Intake item toggled successfully.');
	return {
		body: { success: 'Intake item toggled successfully.' }
	};
};

/*
################################
------ Remove Items - DEL ------
################################
*/

export const del = async ({ request }) => {
	const req = await request.json();
	const { id } = req;
	console.log(id);
	try {
		await deleteDoc(doc(idb, id));
		return {
			body: {
				success: 'Intake Item Successfully Deleted.'
			}
		};
	} catch (error) {
		console.error('Error Deleting Item:', error);
		return {
			body: {
				error: 'Error Deleting Item.'
			}
		};
	}
};
