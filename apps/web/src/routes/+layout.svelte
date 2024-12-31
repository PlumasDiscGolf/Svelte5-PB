<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import PageTransition from './transition.svelte';
	import '../app.css';
	let { children, data } = $props();
</script>

<div class="min-h-screen">
	<Header />
	<main class="p-4">
		<PageTransition url={data.url}>
			{@render children?.()}
		</PageTransition>
	</main>
	<Footer />
</div>
