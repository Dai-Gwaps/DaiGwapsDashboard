<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/intake');
		const data = await res.json();
		const res2 = await fetch('/api/shipgroup');
		const data2 = await res2.json();
		return {
			props: {
				shIn: res2.ok && data2,
				inIn: res.ok && data
			}
		};
	}
</script>

<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { shStore, inStore, idCap, ldStore } from '$lib/app/store';

	export let shIn;
	export let inIn;

	const showSplit = writable({ split: false, index: null });
	setContext('split', showSplit);

	onMount(() => {
		const maxValue = Math.max(...inIn.inIDs, ...shIn.shIDs);
		if (!$ldStore.ship) {
			$shStore = shIn.shArr;
			$idCap = maxValue;
			$ldStore.ship = true;
			console.log($shStore);
		}
		if (!$ldStore.intake) {
			$inStore = inIn.inArr;
			$idCap = maxValue;
			$ldStore.intake = true;
			console.log($inStore);
		}
	});

	import IntakeItem from '$lib/components/intake/IntakeItem.svelte';
	import IntakeCreate from '$lib/components/intake/IntakeCreate.svelte';
	import SplitModule from '../lib/components/intake/SplitModule.svelte';
</script>

{#if $showSplit.split}
	<SplitModule />
{/if}

<IntakeCreate />

<div class="container-grid">
	{#each $inStore as item, index (item.id)}
		<IntakeItem {index} />
	{/each}
</div>

<style>
	.container-grid {
		max-width: 1400px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 8px;
		margin: 16px auto;
	}
</style>
