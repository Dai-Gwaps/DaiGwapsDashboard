import { writable } from 'svelte/store';

function listIntake() {
	const intaka = writable([]);

	return {
		set: intaka.set,
		subscribe: intaka.subscribe,
		initialLoad: (data) => intaka.set(data),
		addIntake: (data) => {
			console.log(data);
			intaka.update((int) => {
				const existingId = int.find((item) => item.id === data.id);
				if (!existingId) {
					return [...int, data];
				}
			});
		},
		splitItem: (data) => {
			intaka.update((arr) => {
				const i = data.index;
				const splitItem = {
					...arr[i],
					id: data.id,
					original_name: data.update_name,
					original_quantity: data.quantity,
					item_split: true
				};
				arr[i].original_quantity -= data.quantity;
				arr[i].item_split = true;
				return [...arr, splitItem];
			});
		},
		priceUpdate: (data) => {
			intaka.update((arr) => {
				const { group, price } = data;
				console.log(price);
				for (let i in arr) {
					if (arr[i].shipping_group == group) {
						console.log(arr[i]);
						arr[i].shipping_cost = price;
						arr[i].total_cost = arr[i].product_cost + price;
						arr[i].recommended_value = (arr[i].product_cost + price) * 2;
						console.log(arr[i]);
					}
				}
				return [...arr];
			});
		},
		removeIntake: (i) => {
			intaka.update((int) => [...int.slice(0, i), ...int.slice(i + 1)]);
		}
	};
}

function listShip() {
	const shippa = writable([]);

	return {
		set: shippa.set,
		subscribe: shippa.subscribe,
		initialLoad: (data) => shippa.set(data),
		addShip: (data) => {
			shippa.update((ship) => {
				const existingId = ship.find((item) => item.id === data.id);
				if (!existingId) {
					return [...ship, data];
				}
			});
		},
		addItem: (data) =>
			shippa.update((ship) => {
				const i = data.index;
				const item = ship[i];
				const quantity = item.item_quantity + data.original_quantity;
				const cost = Number((item.shipping_cost / quantity).toFixed(2));
				const update = { ...item, item_quantity: quantity, individual_cost: cost };
				ship[i] = update;

				return [...ship];
			}),
		removeShip: (i) => {
			shippa.update((ship) => [...ship.slice(0, i), ...ship.slice(i + 1)]);
		}
	};
}

function listClothes() {
	const clothing = writable({
		dresses: [],
		tops: [],
		bottoms: [],
		jumpsuits: [],
		twoPieces: [],
		threePieces: []
	});
	return {
		set: clothing.set,
		subscribe: clothing.subscribe,
		addDress: (data) =>
			clothing.update((state) => {
				let dresses = [...state.dresses, data];
				return { ...state, dresses };
			}),
		addTop: (data) =>
			clothing.update((state) => {
				let tops = [...state.tops, data];
				return { ...state, tops };
			}),
		addBottom: (data) =>
			clothing.update((state) => {
				let bottoms = [...state.bottoms, data];
				return { ...state, bottoms };
			}),
		addJumpsuit: (data) =>
			clothing.update((state) => {
				let jumpsuits = [...state.jumpsuits, data];
				return { ...state, jumpsuits };
			}),
		addTwoPiece: (data) =>
			clothing.update((state) => {
				let twoPieces = [...state.twoPieces, data];
				return { ...state, twoPieces };
			}),
		addThreePiece: (data) =>
			clothing.update((state) => {
				let threePieces = [...state.threePieces, data];
				return { ...state, threePieces };
			})
	};
}

export const idCap = writable(0);
export const ldStore = writable({});

export const shStore = listShip();
export const inStore = listIntake();

export const clStore = listClothes();
