const inArr = [
	{
		id: 1,
		shipping_group: 'B9',
		original_name: 'Rockin Dress',
		original_quantity: 6,
		item_split: false,
		product_cost: 6.48,
		shipping_cost: 3.15,
		total_cost: 6.48 + 3.15,
		recommended_value: (6.48 + 3.15) * 2
	},
	{
		id: 2,
		shipping_group: 'B9',
		original_name: 'Gravitation Dress',
		original_quantity: 4,
		item_split: false,
		product_cost: 8.32,
		shipping_cost: 3.15,
		total_cost: 8.32 + 3.15,
		recommended_value: (8.32 + 3.15) * 2
	},
	{
		id: 3,
		shipping_group: 'B9',
		original_name: 'Mountain Crawler Top',
		original_quantity: 15,
		item_split: false,
		product_cost: 5.22,
		shipping_cost: 3.15,
		total_cost: 5.22 + 3.15,
		recommended_value: (5.22 + 3.15) * 2
	}
];

const inIDs = [];
for (let item of inArr) {
	inIDs.push(item.id);
}

const initObject = {
	inArr,
	inIDs
};

export const get = () => {
	return {
		body: initObject
	};
};

export const post = (event) => {
	console.log(event);
};
