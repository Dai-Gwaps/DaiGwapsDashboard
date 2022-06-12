<script>
	import axios from 'axios';

	async function submitHandler(e) {
		const formData = new FormData(e.target);
		const data = {};
		for (let field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		data.item_quantity = 0;
		data.individual_cost = 0;
		await axios.post('/shipping', data).then(async (response) => {
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
	<h2 class="title">Shipping Groups</h2>
	<form on:submit|preventDefault={submitHandler}>
		<div class="flexrow">
			<div class="section">
				<label for="shipping_group">Shipping Group Name</label>
				<input type="text" name="shipping_group" id="shipping_group" />
			</div>
			<div class="section">
				<label for="shipping_date">Date Shipped</label>
				<input type="date" name="shipping_date" id="shipping_date" />
			</div>
			<div class="section">
				<label for="shipping_cost">Total Shipping Fee</label>
				<input type="number" step=".01" name="shipping_cost" id="shipping_cost" />
			</div>
		</div>
		<button class="submit">Add Group</button>
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

	.title {
		text-align: center;
		margin-bottom: 16px;
	}

	form {
		display: flex;
		flex-direction: column;
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

	.submit {
		margin: 24px auto 0;
		padding: 8px 16px;
		background-color: #fff5fe;
		border-radius: 5px;
		font-weight: 600;
	}
</style>
