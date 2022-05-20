<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/shipgroup');
		const data = await res.json();
		return {
			props: {
				shIn: res.ok && data
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { shStore, idCap, ldStore } from '$lib/app/store';

	export let shIn;

	onMount(() => {
		if (!$ldStore.ship) {
			const maxValue = Math.max(...shIn.shIDs);
			$shStore = shIn.shArr;
			$idCap = maxValue;
			$ldStore.ship = true;
		}
	});

	import ShipGroup from '$lib/components/shipping/ShipGroup.svelte';
	import AddGroup from '$lib/components/shipping/AddGroup.svelte';
</script>

<AddGroup />

{#each $shStore as group, index (group.id)}
	<ShipGroup {index} />
{/each}
