<script>
	import { inStore, idCap } from '$lib/app/store';

	import { getContext } from 'svelte';
	const split = getContext('split');

	let i = $split.index;

	let name = $inStore[i].original_name;

	function submitHandler(e) {
		let formData = new FormData(e.target);

		let data = { index: i };
		for (let field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		data.id = $idCap;
		$idCap += 1;

		inStore.splitItem(data);

		$split = { split: false, index: null };
	}

	function closeHandler() {
		$split = { split: false, index: null };
	}
</script>

<div class="modal">
	<h2>Item Split</h2>
	<h3>{name}</h3>
	<form class="splitForm" on:submit|preventDefault={submitHandler}>
		<label for="update_name">Split Item Name</label>
		<input type="text" name="update_name" id="update_name" />
		<label for="quantity">Split Item Quantity</label>
		<input type="text" name="quantity" id="quantity" />
		<button class="submit" type="submit">Split Item</button>
		<button class="cancel" type="button" on:click={closeHandler}>Cancel</button>
	</form>
</div>

<div class="backdrop" on:click={closeHandler} />

<style>
	.backdrop {
		background-color: rgba(56, 10, 53, 0.75);
		height: 100vh;
		width: 100vw;
		z-index: 10;
		position: fixed;
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 15;
		background-color: white;
		border-radius: 5px;
		padding: 16px;
	}

	h2,
	h3 {
		text-align: center;
	}

	form {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		gap: 16px;
		font-size: 1.6rem;
		margin: 16px;
	}

	form label {
		grid-column: 1/3;
	}

	form input {
		grid-column: 3/6;
		font-size: 1.6rem;
		border-radius: 5px;
	}

	form button {
		font-size: 1.6rem;
		padding: 4px;
		margin-top: 16px;
	}

	.submit {
		background-color: #ffa60d;
		border-radius: 5px;
		grid-column: 1/3;
	}

	.cancel {
		background: none;
		border: 1px solid red;
		color: red;
		border-radius: 5px;
		grid-column: 4/6;
	}
</style>
