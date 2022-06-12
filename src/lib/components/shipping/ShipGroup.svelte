<script>
	import axios from 'axios';

	export let group;

	$: title = group.shipping_group;
	$: totalCost = group.shipping_cost;
	$: quantity = group.item_quantity;
	$: indCost = group.individual_cost;
	$: id = group.id;

	async function deleteHandler() {
		await axios.delete('/shipping', { data: { id } }).then(async (response) => {
			const { data } = response;

			if (data.error) {
				console.error(data.error);
			} else {
				console.log(data.success);
			}
		});
	}

	async function priceHandler() {
		await axios.put('/shipping', { group }).then(async (response) => {
			const { data } = response;

			if (data.error) {
				console.error(data.error);
			} else {
				console.log(data.success);
				console.log(data.group);
			}
		});
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
		<button class="price" on:click={priceHandler}>Fix Price</button>
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
		gap: 8px;
		margin: auto 32px;
		grid-column: 1/2;
	}
	.section2 {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: auto;
		grid-column: 2/3;
	}

	.section3 {
		display: flex;
		flex-direction: column;
		gap: 8px;
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

	.price {
		background-color: #fff5fe;
		border-radius: 5px;
		font-weight: 600;
		padding: 8px 16px;
	}
</style>
