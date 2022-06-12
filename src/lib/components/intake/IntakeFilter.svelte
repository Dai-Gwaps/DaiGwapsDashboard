<script>
	export let gFilter;

	import { getContext } from 'svelte';

	let items = getContext('intakes');

	function filterChange(input) {
		gFilter = input;
	}
</script>

<div class="container">
	<h3>Filter</h3>
	<div class="filterOff" class:active={!gFilter} on:click={() => filterChange(null)}>
		<b>Off</b>
	</div>

	{#each $items.ship as filtrete}
		<div
			class="filters"
			class:active={gFilter === filtrete.shipping_group}
			on:click={() => filterChange(filtrete.shipping_group)}
		>
			{filtrete.shipping_group}
		</div>
	{/each}
</div>

<style>
	h3 {
		margin: 0 16px;
	}
	.container {
		margin: auto;
		display: flex;
		border-radius: 5px;
		box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
		background-color: white;
		max-width: max-content;
		text-align: center;
	}
	.filterOff {
		border-right: 2px solid blue;
		font-size: 1.8rem;
		font-weight: 400;
		width: 10ch;
		cursor: pointer;
		pointer-events: all;
	}

	.filters {
		border-right: 2px solid blue;
		font-size: 1.8rem;
		font-weight: 600;
		width: 10ch;
		cursor: pointer;
		pointer-events: all;
	}

	.active {
		background-color: aqua;
	}
</style>
