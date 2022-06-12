<script>
	import axios from 'axios';
	import { getContext } from 'svelte';

	export let item;
	export let index;

	const shopItems = getContext('shop');

	$: price = parseFloat(item.price.toFixed(2));
	$: id = item.id;

	async function toggleHandler() {
		await axios.put('/shopify', { id }).then((response) => {
			const { data } = response;
			if (!data.error) {
				console.log(data.success);
				$shopItems[index].shopify_update = true;
			} else {
				console.error(data.error);
				return;
			}
		});
	}

	async function shopifyHandler() {
		console.log(item);
		let shopItem = {
			id
		};
		await axios.post('/shopify', item).then((response) => {
			const { data } = response;
			if (!data.error) {
				console.log(data.success);
				shopItem.shopify_id = data.id;
			} else {
				console.error(data.error);
				return;
			}
		});

		await axios.put('/shopify', shopItem).then((response) => {
			const { data } = response;
			if (!data.error) {
				console.log(data.success);
				$shopItems[index].shopify_update = true;
				$shopItems[index].shopify_id = shopItem.shopify_id;
			} else {
				console.error(data.error);
				return;
			}
		});
	}
</script>

<div class="row">
	<h3>{item.name}</h3>
	<p class="group">{item.shipping_group}</p>
	<p class="price">${price}</p>
	<p class="quantity">{item.quantity}</p>
	<button class="fixAdd" on:click={toggleHandler}>Already Added</button>
	<button class="addBtn" on:click={shopifyHandler}>Add to Shopify</button>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
		padding: 8px;
		align-items: center;
		gap: 8px;
		margin: 8px 16px;
	}
	h3 {
		font-size: 1.8rem;
		grid-column: 1/2;
	}

	p {
		text-align: center;
	}

	.group {
		grid-column: 2/3;
		font-weight: 600;
	}

	.price {
		grid-column: 3/4;
	}

	.quantity {
		grid-column: 4/5;
	}

	button {
		border-radius: 5px;
		font-weight: 600;
		width: 20ch;
		padding: 4px;
		cursor: pointer;
	}

	.fixAdd {
		background: none;
		border: 2px solid aqua;
		grid-column: 5/6;
	}

	.addBtn {
		background-image: radial-gradient(
			circle farthest-corner at 10.2% 55.8%,
			rgba(252, 37, 103, 1) 0%,
			rgba(250, 38, 151, 1) 46.2%,
			rgba(186, 8, 181, 1) 90.1%
		);
		grid-column: 6/7;
	}
</style>
