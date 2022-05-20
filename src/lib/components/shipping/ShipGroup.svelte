<script>
	import { shStore } from '$lib/app/store';

	export let index;

	$: title = $shStore[index].shipping_group;
	$: totalCost = Number($shStore[index].shipping_cost.toFixed(2));
	$: quantity = $shStore[index].item_quantity;
	$: indCost = Number($shStore[index].individual_cost.toFixed(2));

	function deleteHandler() {
		shStore.removeShip(index);
	}
</script>

<div class="card">
	<div class="section1">
		<h3>Group {title}</h3>
		<p><b>Total Cost: </b>${totalCost}</p>
	</div>
	<div class="section2">
		<p><b>Item Count: </b>{quantity}</p>
		<p><b>Cost per Item: </b>${indCost}</p>
	</div>
	<div class="section3">
		<button class="remove" on:click={deleteHandler}>Delete</button>
	</div>
</div>

<style>
	.card {
		background-color: white;
		box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
		max-width: 900px;
		display: grid;
		grid-template-columns: 3fr 3fr 2fr;
		border-radius: 5px;
		margin: 16px auto;
		padding: 16px;
	}

	.section1 {
		display: flex;
		flex-direction: column;
		margin: auto 32px;
		grid-column: 1/2;
	}
	.section2 {
		display: flex;
		flex-direction: column;
		margin: auto;
		grid-column: 2/3;
	}

	.section3 {
		margin: auto;
		grid-column: 3/4;
	}

	.remove {
		background: none;
		border: 1px solid red;
		color: red;
		border-radius: 5px;
		padding: 8px 16px;
	}
</style>
