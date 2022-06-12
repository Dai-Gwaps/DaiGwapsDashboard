<script>
	export let shipGroups;

	import ShipGroup from '$lib/components/shipping/ShipGroup.svelte';
	import AddGroup from '$lib/components/shipping/AddGroup.svelte';
</script>

<AddGroup shipGroups />

{#each shipGroups as group (group.id)}
	<ShipGroup {group} />
{/each}
