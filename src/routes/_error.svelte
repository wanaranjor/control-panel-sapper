<script>
	import Logo404 from '../components/UI/404.svelte';
	export let status;
	// export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<!-- <h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if} -->

<div class="container mx-auto">
	<div class="flex flex-col text-5xl text-center font-semibold items-center">
		<h1>404</h1>
		<Logo404 />
		<p>Algo anda mal</p>
	</div>
</div>