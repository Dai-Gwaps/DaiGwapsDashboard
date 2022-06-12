<script>
	import axios from 'axios';
	import { getContext } from 'svelte';

	let items = getContext('intakes');

	let shipping_group = 0;
	let original_name = '';
	let original_quantity = '';
	let product_cost = '';
	let startInput;

	function reset() {
		original_name = '';
		original_quantity = '';
		product_cost = '';
	}

	async function submitHandler(e) {
		const formData = new FormData(e.target);
		const data = {};
		for (let field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}

		const request = { newItem: data, shipping: $items.ship, items: $items.intake };
		await axios.post('/intake', request).then(async function (response) {
			const { data } = response;

			if (!data.error) {
				console.log(data.success);
				$items = {
					intake: data.intakeItems,
					ship: data.shipGroups
				};
			} else {
				console.log(data.error);
			}
		});

		reset();
		startInput.focus();
	}
</script>

<div class="card">
	<h2 class="title">Intake Items</h2>
	<form on:submit|preventDefault={submitHandler}>
		<div class="flexrow">
			<div class="section">
				<label for="shipping_group">Shipping Group</label>
				<select name="shipping_group" id="shipping_group" bind:value={shipping_group}>
					{#each $items.ship as option, index}
						<option value={index}>{option.shipping_group}</option>
					{/each}
				</select>
			</div>
			<div class="section">
				<label for="original_name">Item Name</label>
				<input
					type="text"
					name="original_name"
					id="original_name"
					bind:value={original_name}
					bind:this={startInput}
				/>
			</div>
			<div class="section">
				<label for="original_quantity">Item Quantity</label>
				<input
					type="number"
					name="original_quantity"
					id="original_quantity"
					bind:value={original_quantity}
				/>
			</div>
			<div class="section">
				<label for="product_cost">Item Cost</label>
				<input
					type="number"
					name="product_cost"
					id="product_cost"
					step=".01"
					bind:value={product_cost}
				/>
			</div>
		</div>
		<button class="submit">Add Item</button>
	</form>
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

	form {
		display: flex;
		flex-direction: column;
	}
	.title {
		text-align: center;
		margin-bottom: 16px;
	}

	.flexrow {
		display: flex;
		justify-content: space-around;
		margin-bottom: 16px;
	}

	.section {
		display: flex;
		flex-direction: column;
	}

	.section label {
		font-weight: 600;
		margin: 8px auto;
	}

	.section input {
		font-size: 1.8rem;
		width: 20ex;
		border-radius: 5px;
	}

	.section select {
		font-size: 1.8rem;
		width: 20ex;
		border-radius: 5px;
	}

	.submit {
		margin: 24px auto 0;
		padding: 8px 16px;
		background-color: #fff5fe;
		border-radius: 5px;
		font-weight: 600;
	}
</style>
