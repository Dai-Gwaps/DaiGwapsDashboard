<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const showSplit = writable({ split: false, index: null });
	const items = writable({ intake: [], ship: [] });
	setContext('split', showSplit);
	setContext('intakes', items);

	export let shipGroups;
	export let intakeItems;
	let gFilter = null;

	onMount(() => {
		$items = {
			intake: intakeItems,
			ship: shipGroups
		};
	});

	$: listItems = $items.intake.filter((item) => {
		if (!gFilter) {
			return item.intake_complete === false;
		} else {
			return item.intake_complete === false && item.shipping_group === gFilter;
		}
	});

	import IntakeItem from '$lib/components/intake/IntakeItem.svelte';
	import IntakeFilter from '$lib/components/intake/IntakeFilter.svelte';
	import IntakeCreate from '$lib/components/intake/IntakeCreate.svelte';
	import SplitModule from '$lib/components/intake/SplitModule.svelte';
</script>

{#if $showSplit.split}
	<SplitModule {intakeItems} />
{/if}

<IntakeCreate />

<IntakeFilter bind:gFilter />

{#if listItems.length == 0}
	<h2>No Intake Items to Display.</h2>
{:else}
	<div class="container-grid">
		{#each listItems as item, index (item.id)}
			<IntakeItem {item} {index} />
		{/each}
	</div>
{/if}

<style>
	.container-grid {
		max-width: 1400px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 8px;
		margin: 16px auto;
	}
</style>
