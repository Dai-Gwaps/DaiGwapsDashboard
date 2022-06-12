<script>
	import { page } from '$app/stores';
</script>

<div class="navbar">
	<h2>Dai Gwaps</h2>

	<ul>
		<li class:active={$page.url.pathname === '/'}><a href="/">Home</a></li>
		<li class:active={$page.url.pathname === '/shipping'}>
			<a href="/shipping">Shipping Groups</a>
		</li>
		<li class:active={$page.url.pathname === '/intake'}><a href="/intake">Intake Clothes</a></li>
		<li class:active={$page.url.pathname === '/clothes'}><a href="/clothes">Clothing List</a></li>
		<li class:active={$page.url.pathname === '/shopify'}><a href="/shopify">Add to Shopify</a></li>
	</ul>
</div>

<style>
	.navbar {
		width: 256px;
		height: 100vh;
		position: fixed;
		color: white;
		background-color: #360a33;
	}

	h2 {
		font-size: 3.6rem;
		margin: 24px;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		padding: 8px 24px;
	}

	li a {
		font-size: 2.2rem;
		color: white;
		text-decoration: none;
	}

	li:hover,
	li:active,
	li:focus {
		background-color: #4a0e47;
		border-radius: 5px;
		margin: 0 8px;
	}

	.active {
		background-color: #4a0e47;
		border-radius: 5px;
		margin: 0 8px;
	}
</style>
