import { writable } from 'svelte/store';

function listShip() {
	const shippa = writable([]);

	return {
		set: shippa.set,
		subscribe: shippa.subscribe,
		initialLoad: (data) => shippa.set(data),
		addShip: async (data) => {
			const res = await fetch('/api/shipgroup', { method: 'POST', body: JSON.stringify(data) });
			const [datar] = await res.json();
			shippa.update(async (ship) => [...ship, datar]);
		},
		addItem: (data) =>
			shippa.update(async (ship) => {
				const i = data.index;
				const item = ship[i];
				const id = item.id;
				const quantity = item.item_quantity + data.original_quantity;
				const cost = Number((item.shipping_cost / quantity).toFixed(2));
				const body = { id, quantity, cost };
				const res = await fetch('/api/shipgroup', { method: 'PUT', body: JSON.stringify(body) });
				const [datar] = await res.json();
				if (datar != 'ERROR') {
					ship[i] = datar;
				}
				console.log('Final State');
				console.log(ship[i]);
				console.log(ship);

				return ship;
			}),
		removeShip: (id) => {
			fetch('api/shipgroup', { method: 'DELETE', body: id });
			shippa.update((ship) => ship.filter((shi) => shi.id != id));
		}
	};
}

export const shStore = listShip();
export const shLoad = writable(false);
