<script context="module">
	export async function load({ params }) {
		const index = params.ID;
		return {
			props: { index }
		};
	}
</script>

<script>
	import { inStore, clStore } from '$lib/app/store';
	import { goto } from '$app/navigation';

	import Top from '$lib/components/measurement/Top.svelte';
	import Bottom from '$lib/components/measurement/Bottom.svelte';
	import Dress from '$lib/components/measurement/Dress.svelte';
	import Jumpsuit from '$lib/components/measurement/Jumpsuit.svelte';
	import TwoPiece from '$lib/components/measurement/TwoPiece.svelte';
	import ThreePiece from '$lib/components/measurement/ThreePiece.svelte';

	export let index;

	let colorCount = [1];

	let type;
	export let inData = {};
	export let measured = false;

	const item = $inStore[index];

	function addColor() {
		const newColorRow = Math.max(...colorCount) + 1;
		colorCount = [...colorCount, newColorRow];
		console.log(colorCount);
	}

	function formHandler(e) {
		const formData = new FormData(e.target);
		const colorArr = [];
		const quantArr = [];
		console.log(formData);
		console.log(e);
		for (let field of formData.entries()) {
			const [key, value] = field;
			let valueF = parseFloat(value);
			switch (key) {
				case 'colors':
					colorArr.push(value);
					inData[key] = colorArr;
					break;
				case 'color_quantity':
					quantArr.push(value);
					inData[key] = quantArr;
					break;
				case 'quantity':
					inData[key] = valueF;
					break;
				case 'price':
					inData[key] = valueF;
					break;
				case 'weight':
					inData[key] = valueF;
					break;
				default:
					inData[key] = value;
					break;
			}
		}
		inData.original_quantity = item.original_quantity;
		inData.original_name = item.original_name;
		inData.shipping_group = item.shipping_group;
		inData.shopify_update = false;
		inData.product_cost = item.product_cost;
		console.log(inData);

		switch (type) {
			case 'Dress':
				clStore.addDress(inData);
				break;
			case 'Top':
				clStore.addTop(inData);
				break;
			case 'Bottom':
				clStore.addBottom(inData);
				break;
			case 'Jumpsuit':
				clStore.addJumpsuit(inData);
				break;
			case 'Two Piece':
				clStore.addTwoPiece(inData);
				break;
			case 'Three Piece':
				clStore.addThreePiece(inData);
				break;
		}

		inStore.removeIntake(index);
		goto('/intake');
	}

	function selectType(sel) {
		if (!measured) {
			type = sel;
		}
	}
</script>

<div class="container">
	<div class="main">
		<form on:submit|preventDefault={formHandler}>
			<h3>Intake for {item.original_name}</h3>
			<div class="row">
				<div class="column">
					<label for="name">Current Name:</label>
					<input type="text" name="name" id="name" />
				</div>

				<div class="column">
					<label for="quantity">Current Quantity:</label>
					<input type="text" name="quantity" id="quantity" />
				</div>
			</div>

			<div class="color_space">
				{#each colorCount as color}
					<div class="row">
						<label for="colors{color}"> Color: </label>
						<input class="cinput" type="text" name="colors" id="colors{color}" />
						<label for="cquantity{color}">Qty:</label>
						<input class="cquantity" type="text" name="color_quantity" id="cquantity{color}" />
						<img
							class="addbtn"
							src="/icons/plus.svg"
							alt="Plus icon to add field."
							on:click={addColor}
						/>
					</div>
				{/each}
			</div>
			<div class="row">
				<div class="column">
					<b>Recommended Price: </b>
					<p>${item.recommended_value}</p>
				</div>
				<div class="column">
					<label for="price">Set Price:</label>
					<input type="text" name="price" id="price" />
				</div>
			</div>
			<div class="row">
				<div class="column">
					<label for="material">Material: </label>
					<input type="text" name="material" id="material" />
				</div>
				<div class="column">
					<label for="weight">Weight: </label>
					<input type="text" name="weight" id="weight" />
				</div>
			</div>
			{#if measured}
				<div class="row">
					<div class="column">
						<p><b>Bust: </b> {inData.bust || ''}{inData.bust_end ? ` - ${inData.bust_end}` : ''}</p>
						<p>
							<b>Waist: </b>
							{inData.waist || ''}{inData.waist_end ? ` - ${inData.waist_end}` : ''}
						</p>
						<p><b>Hips: </b> {inData.hips || ''}{inData.hips_end ? ` - ${inData.hips_end}` : ''}</p>
					</div>
					<div class="column">
						<label for="size">Enter Size: </label>
						<input type="text" name="size" id="size" />
					</div>
				</div>
			{/if}

			<button class="submit" type="submit" disabled={!measured}>Complete Intake</button>
		</form>
		<div class="selection-type">
			<h3 class="selector">Type</h3>
			<div
				on:click={() => selectType('Top')}
				class={type === 'Top' ? 'selection selected' : 'selection'}
			>
				<img src="/icons/top.svg" alt="Gradient skirt" />
				<p>Top</p>
			</div>
			<div
				on:click={() => selectType('Bottom')}
				class={type === 'Bottom' ? 'selection selected' : 'selection'}
			>
				<img src="/icons/bottom.svg" alt="Gradient skirt" />
				<p>Bottom</p>
			</div>
			<div
				on:click={() => selectType('Dress')}
				class={type === 'Dress' ? 'selection selected' : 'selection'}
			>
				<img src="/icons/dress.svg" alt="Gradient skirt" />
				<p>Dress</p>
			</div>
			<div
				on:click={() => selectType('Jumpsuit')}
				class={type === 'Jumpsuit' ? 'selection selected' : 'selection'}
			>
				<img src="/icons/jumps.svg" alt="Gradient skirt" />
				<p>Jumpsuit</p>
			</div>
			<div
				on:click={() => selectType('Two Piece')}
				class={type === 'Two Piece' ? 'selection selected' : 'selection'}
			>
				<img src="/icons/outfit.svg" alt="Gradient skirt" />
				<p>2-Piece</p>
			</div>
			<div
				on:click={() => selectType('Three Piece')}
				class={type === 'Three Piece' ? 'selection selected' : 'selection'}
			>
				<img src="/icons/outfit.svg" alt="Gradient skirt" />
				<p>3-Piece</p>
			</div>
		</div>
	</div>
	<div class="measurement">
		{#if type === 'Top'}
			<Top bind:inData bind:measured />
		{:else if type === 'Bottom'}
			<Bottom bind:inData bind:measured />
		{:else if type === 'Dress'}
			<Dress bind:inData bind:measured />
		{:else if type === 'Jumpsuit'}
			<Jumpsuit bind:inData bind:measured />
		{:else if type === 'Two Piece'}
			<TwoPiece bind:inData bind:measured />
		{:else if type === 'Three Piece'}
			<ThreePiece bind:inData bind:measured />
		{/if}
	</div>
</div>

<style>
	h3 {
		text-align: center;
	}
	form {
		grid-column: 1/2;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	label {
		font-size: 1.8rem;
		font-weight: 600;
	}

	input {
		font-size: 1.8rem;
		width: 20ex;
		border-radius: 5px;
	}

	input:hover,
	input:focus,
	input:active {
		outline: none;
		border: 4px solid rgba(186, 8, 181, 1);
	}

	p {
		text-align: center;
	}
	.container {
		display: grid;
		width: 1100px;
		gap: 24px;
		grid-template-columns: 3fr 2fr;
		margin: 16px auto;
	}

	.main {
		height: 80vh;
		overflow-y: scroll;
		grid-column: 1/2;
		box-sizing: border-box;
		margin: auto;
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
		padding: 24px;
		display: grid;
		gap: 24px;
		grid-template-columns: 3fr 1fr;
	}

	.main::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}

	.measurement {
		grid-column: 2/3;
		overflow: hidden;
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
	}

	.selection-type {
		grid-column: 2/3;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.row {
		display: flex;
		gap: 16px;
		margin: auto;
		justify-content: space-around;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.addbtn {
		cursor: pointer;
		pointer-events: all;
		width: 24px;
		height: 24px;
	}

	.color_space {
		max-width: 300px;
		margin: auto;
	}

	.cinput {
		width: 15ch;
	}
	.cquantity {
		width: 5ch;
	}

	.selection {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80px;
		width: 80px;
		cursor: pointer;
		pointer-events: all;
	}

	.selection img {
		height: 50px;
		width: 50px;
	}

	.selection p {
		font-weight: 500;
		font-size: 1.5rem;
	}

	.selected {
		background-color: pink;
		border-radius: 5px;
	}

	.selection.selected p {
		font-weight: 600;
	}

	.submit {
		width: 300px;
		margin: 8px auto;
	}
</style>
