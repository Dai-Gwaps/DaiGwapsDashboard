import { writable } from 'svelte/store';

function listIntake() {
	const intaka = writable([]);

	return {
		set: intaka.set,
		subscribe: intaka.subscribe,
		initialLoad: (data) => intaka.set(data),
		addIntake: async (data) => {
			const res = await fetch('/api/intake', { method: 'POST', body: JSON.stringify(data) });
			const [datar] = await res.json();
			intaka.update((int) => [...int, datar]);
		},
		splitItem: (data) => {
			console.log(update);
			intaka.update(async (arr) => {
				const i = data.index;
				const id = arr[i].id;
				const splitItem = {
					...arr[i],
					original_name: data.update_name,
					original_quantity: data.quantity,
					item_split: true
				};
				delete splitItem.id;
				const res = await fetch('/api/intake', {
					method: 'POST',
					body: JSON.stringify(splitItem)
				});
				const splitData = await res.json();
				const newQuant = arr[i].original_quantity - data.quantity;
				const datam = {
					id,
					original_quantity: newQuant,
					item_split: true
				};
				const res2 = await fetch('/api/intake', {
					method: 'PUT',
					body: JSON.stringify(datam)
				});
				const especial = await res2.json();
				arr[i] = especial;
				return [...arr, splitData];
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

export const inStore = listIntake();
export const inLoad = writable(false);
