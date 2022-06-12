import { writable } from 'svelte/store';

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

export const clStore = listClothes();
export const clLoad = writable(false);
