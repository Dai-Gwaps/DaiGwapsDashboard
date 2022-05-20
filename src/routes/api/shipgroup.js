const shArr = [
	{
		id: 1,
		shipping_group: 'B8',
		shipping_cost: 578.18,
		item_quantity: 0,
		individual_cost: 0
	},
	{
		id: 2,
		shipping_group: 'B9',
		shipping_cost: 578.18,
		item_quantity: 0,
		individual_cost: 0
	},
	{
		id: 3,
		shipping_group: 'B7',
		shipping_cost: 578.18,
		item_quantity: 0,
		individual_cost: 0
	},
	{
		id: 4,
		shipping_group: 'B6',
		shipping_cost: 578.18,
		item_quantity: 0,
		individual_cost: 0
	}
];

const shIDs = [];
for (let item of shArr) {
	shIDs.push(item.id);
}

const initObject = {
	shArr,
	shIDs
};

export const get = () => {
	return {
		body: initObject
	};
};

export const post = (event) => {
	console.log(event);
};
