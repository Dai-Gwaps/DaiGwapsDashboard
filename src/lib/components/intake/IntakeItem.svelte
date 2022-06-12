<script>
	import { getContext } from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	export let index;
	export let item;

	const split = getContext('split');
	let items = getContext('intakes');

	let trashFill = false;

	$: shGr = item.shipping_group;
	$: name = item.original_name;
	$: quantity = item.original_quantity;
	$: cost = Number(item.total_cost?.toFixed(2)) || 0;

	function hoverHandler() {
		trashFill = !trashFill;
	}

	async function deleteHandler() {
		await axios.delete(`/intake`, { id: item.id }).then((response) => {
			const { data } = response;
			if (data.success) {
				$items.intake = $items.intake.filter((num) => num.id !== item.id);
			}
		});
	}

	async function hideHandler() {
		await axios.patch('/intake', { id: item.id }).then((response) => {
			const { data } = response;
			if (data.success) {
				$items.intake = $items.intake.filter((num) => num.id !== item.id);
			}
		});
	}

	function intakeHandler() {
		goto(`/intake/clothing-${item.id}`);
	}

	function splitHandler() {
		$split = { split: true, index };
	}
</script>

<div class="card">
	<div class="topbar">
		<div
			class="iconClick"
			on:click={hideHandler}
			on:mouseenter={hoverHandler}
			on:mouseleave={hoverHandler}
		>
			<img src="/icons/show.svg" alt="Icon of an Eyeball" />
		</div>

		<p><b>Group: </b>{shGr}</p>
		<div
			class="iconClick"
			on:click={deleteHandler}
			on:mouseenter={hoverHandler}
			on:mouseleave={hoverHandler}
		>
			<img src="/icons/trash.svg" alt="Icon of a Trashcan" />
		</div>
	</div>
	<div class="title">
		<h3>{name}</h3>
	</div>
	<div class="row">
		<div class="column">
			<div class="category">Quantity:</div>
			<div class="amount">
				{quantity}
			</div>
		</div>
		<div class="column">
			<div class="category">Total Cost:</div>
			<div class="amount">
				${cost}
			</div>
		</div>
	</div>

	<button class="splitbtn" on:click={splitHandler}>Split Item</button>

	<button class="intake" on:click={intakeHandler}>Begin Intake</button>
</div>

<style>
	.card {
		background-color: white;
		box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
		max-width: 400px;
		grid-column: auto;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		margin: 16px;
		padding: 16px;
	}

	button {
		cursor: pointer;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		margin: 16px;
	}

	.title {
		margin: 0 auto 32px;
	}

	.row {
		display: flex;
		margin: auto 32px;
	}
	.column {
		display: flex;
		flex-direction: column;
		margin: auto;
	}

	.category {
		margin: auto;
		font-weight: 600;
	}

	.amount {
		margin: auto;
	}

	.splitbtn {
		background-color: aqua;
		border-radius: 5px;
		padding: 5px;
		margin: 48px 24px 32px;
		font-size: 1.6rem;
		font-style: italic;
		font-weight: 500;
	}

	.intake {
		background-color: #ffa60d;
		border-radius: 5px;
		padding: 8px 16px;
		font-size: 1.8rem;
		font-weight: 600;
	}
	.iconClick {
		color: rgb(167, 10, 10);
	}

	.iconClick img {
		width: 32px;
		height: 32px;
		cursor: pointer;
	}

	.iconClick img:hover {
		width: 36px;
		height: 36px;
	}
</style>
