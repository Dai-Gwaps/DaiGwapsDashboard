const dresses = [
	{
		id: 42,
		bicep: 42,
		bust: 23,
		colors: ['Blue'],
		hips: 4,
		material: 'Silk',
		name: 'ElDress',
		overall_length: 5,
		price: 32.42,
		quantity: 14,
		shoulder_width: 23,
		size: 'Medium',
		sleeve_length: 23,
		sleevecuff: 41,
		waist: 12,
		weight: 5.4
	},
	{
		id: 48,
		bicep: 42,
		bust: 23,
		colors: ['Blue'],
		hips: 4,
		material: 'Silk',
		name: 'MaxDress',
		overall_length: 5,
		price: 25.06,
		quantity: 14,
		shoulder_width: 23,
		size: 'Small',
		sleeve_length: 23,
		sleevecuff: 41,
		waist: 12,
		weight: 5.4
	}
];

const tops = [
	{
		id: 44,
		bicep: 14,
		bust: 16,
		colors: ['Red'],
		material: 'Cotton',
		name: 'Topity',
		overall_length: 213,
		price: 19.44,
		quantity: 6,
		shoulder_width: 23,
		size: 'XS',
		sleeve_length: 42,
		sleevecuff: 15,
		waist: 22,
		weight: 5.4
	},
	{
		id: 41,
		bicep: 14,
		bust: 16,
		colors: ['Red'],
		material: 'Cotton',
		name: 'Randidy',
		overall_length: 213,
		price: 19.44,
		quantity: 6,
		shoulder_width: 23,
		size: 'XS',
		sleeve_length: 42,
		sleevecuff: 15,
		waist: 22,
		weight: 5.4
	}
];

const clothesObject = {
	dresses,
	tops
};

export const get = () => {
	return {
		body: clothesObject
	};
};

export const post = (event) => {
	console.log(event);
};
