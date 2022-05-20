<script>
	import SideNav from '$lib/components/SideNav.svelte';
</script>

<div class="container">
	<nav class="nav"><SideNav /></nav>
	<div class="content"><slot /></div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 256px 1fr;
	}

	.nav {
		grid-column: 1/2;
	}

	.content {
		grid-column: 2/3;
		background-color: #fff5fe;
		min-height: 100vh;
		box-sizing: border-box;
	}
</style>
