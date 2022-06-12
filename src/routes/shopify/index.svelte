<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let shopUpdates;

	const shopItems = writable([]);
	setContext('shop', shopItems);

	onMount(() => {
		$shopItems = shopUpdates;
	});

	$: filterItems = $shopItems.filter((item) => item.shopify_update === false);

	import ShopItems from '$lib/components/shopify/ShopItems.svelte';
</script>

<div class="card">
	<h2>Items to Update</h2>
	<div class="row">
		<p class="name">Name:</p>
		<p class="group">Group:</p>
		<p class="price">Price:</p>
		<p class="quantity">Qty:</p>
		<div class="spacer1" />
		<div class="spacer2" />
	</div>

	{#each filterItems as update, index}
		<ShopItems item={update} {index} />
	{/each}
</div>

<style>
	.card {
		background-color: white;
		box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
		max-width: 900px;
		border-radius: 5px;
		margin: 16px auto;
		padding: 16px;
	}
	.row {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr;
		padding: 8px;
		gap: 8px;
		margin: 8px 16px;
		width: 100%;
	}

	.row p {
		font-weight: 600;
	}

	.name {
		grid-column: 1/2;
	}

	.group {
		grid-column: 2/3;
		text-align: center;
	}

	.price {
		grid-column: 3/4;
		text-align: center;
	}

	.quantity {
		grid-column: 4/5;
		text-align: center;
	}
	.spacer1 {
		width: 20ch;
		grid-column: 5/6;
		padding: 4px;
	}
	.spacer2 {
		width: 20ch;
		grid-column: 6/7;
		padding: 4px;
	}
</style>
