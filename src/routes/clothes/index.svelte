<script>
	import { onMount } from 'svelte';
	import { clStore, ldStore } from '$lib/app/store';

	export let clothImport;

	onMount(() => {
		if (!$ldStore.cloth) {
			$clStore = { ...$clStore, dresses: clothImport.dresses, tops: clothImport.tops };
			$ldStore.cloth = true;
			console.log($clStore);
		}
	});
</script>

<h1>DRESSES</h1>
{#each $clStore.dresses as dress}
	<h2>{dress.name}</h2>
{/each}

<h1>TOPS</h1>
{#each $clStore.tops as top}
	<h2>{top.name}</h2>
{/each}
