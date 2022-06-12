import dbRef from '$lib/app/firebase';
import { getDocs, doc, query, updateDoc, where } from 'firebase/firestore';
import axios from 'axios';

const token = import.meta.env.VITE_PUBLIC_SHOPIFY_TOKEN;
const locId = 'gid://shopify/Location/65092681901';
const siteUrl = 'https://dai-gwaps.myshopify.com/admin/api/2022-04/graphql.json';
const db = dbRef.ship;
const idb = dbRef.clothes;
const dbase = dbRef.db;

/*
################################
---- Initialize List - GET -----
################################
*/

export const get = async () => {
	const shopifyLoad = { shopUpdates: [] };

	try {
		const q = query(idb, where('shopify_update', '==', false));
		const res = await getDocs(q);
		res.forEach((doc) => {
			const objAdd = { id: doc.id, ...doc.data() };
			shopifyLoad.shopUpdates.push(objAdd);
		});
		console.log(`A total of ${shopifyLoad.shopUpdates.length} items were successfully loaded.`);
	} catch (error) {
		console.error('Error Getting Intake Items:', error);
	}

	return {
		body: shopifyLoad
	};
};

/*
################################
---- Add to Shopify - POST -----
################################
*/

export const post = async ({ request }) => {
	const req = await request.json();
	const body = {};
	const varArr = [];

	for (let [color, quantity] of Object.entries(req.colors)) {
		const colorVar = `{
			inventoryQuantities: [{ availableQuantity: ${quantity}, locationId: "${locId}" }],
			inventoryManagement: SHOPIFY,
			weight: ${req.weight},
			weightUnit: GRAMS,
			price: "${req.price}",
			options: ["${req.size}", "${color}"]
		}`;
		varArr.push(colorVar);
	}

	const variants = varArr.map((i) => i).join(', ');

	const data = {
		query: `mutation {productCreate(input: {
          title: "${req.name}", 
          descriptionHtml: "${req.description}", 
          options: ["Size", "Color"],
          productType: "${req.type}",
          status: DRAFT,
          variants: [
            ${variants}
          ],
          vendor: "${req.manufacturer}"
        }
        ) {
          product {
            id
          }
          userErrors {
            field
            message
          }
        }}`
	};

	var config = {
		method: 'post',
		url: siteUrl,
		headers: {
			'X-Shopify-Access-Token': token,
			'Content-Type': 'application/json'
		},
		data: data
	};
	await axios(config)
		.then(function (response) {
			const id = response.data.data.productCreate.product.id;
			console.log('Successfully Added to Shopify: ', id);
			body.success = 'Successfully added to Shopify';
			body.id = id;
		})
		.catch(function (error) {
			console.log('Error Adding to Shopify: ', error);
			body.error = 'Error Adding to Shopify';
		});
	return {
		body
	};
};

/*
################################
----- Toggle Status - PUT ------
################################
*/

export const put = async ({ request }) => {
	const req = await request.json();
	const { id } = req;
	const upObj = { shopify_update: true };
	if (req.shopify_id) {
		upObj.shopify_id = req.shopify_id;
	}

	try {
		updateDoc(doc(idb, id), upObj);
		console.log('Toggle Shopify Status Successful!');
	} catch (error) {
		console.error('Error Toggling Item:', error);
		return {
			body: {
				error: 'Error Toggling Shopify Status'
			}
		};
	}

	return {
		body: { success: 'Shopify status toggled successfully.' }
	};
};
