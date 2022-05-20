<script>
	import { inStore, shStore, idCap } from '$lib/app/store';

	function submitHandler(e) {
		const formData = new FormData(e.target);
		const data = {};
		const compare = {};
		for (let field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
			compare[key] = value;
		}

		data.original_quantity = Number(compare.original_quantity);
		data.product_cost = Number(compare.product_cost);
		const shipIndex = compare.shipping_group;
		const shipData = {
			index: shipIndex,
			original_quantity: data.original_quantity
		};

		shStore.addItem(shipData);

		data.id = $idCap;
		$idCap += 1;
		data.shipping_cost = 0;
		data.shipping_group = $shStore[shipIndex].shipping_group;
		data.total_cost = 0;
		data.recommended_value = 0;
		data.item_split = false;
		inStore.addIntake(data);

		const price_update = {
			group: data.shipping_group,
			price: $shStore[shipIndex].individual_cost
		};
		inStore.priceUpdate(price_update);
	}
</script>

<div class="card">
	<h2 class="title">Intake Items</h2>
	<form on:submit|preventDefault={submitHandler}>
		<div class="flexrow">
			<div class="section">
				<label for="shipping_group">Shipping Group</label>
				<select name="shipping_group" id="shipping_group">
					{#each $shStore as option, index}
						<option value={index}>{option.shipping_group}</option>
					{/each}
				</select>
			</div>
			<div class="section">
				<label for="original_name">Item Name</label>
				<input type="text" name="original_name" id="original_name" />
			</div>
			<div class="section">
				<label for="original_quantity">Item Quantity</label>
				<input type="number" name="original_quantity" id="original_quantity" />
			</div>
			<div class="section">
				<label for="product_cost">Item Cost</label>
				<input type="number" name="product_cost" id="product_cost" step=".01" />
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
