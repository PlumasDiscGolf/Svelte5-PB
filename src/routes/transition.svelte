<script>
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

	let { children, url } = $props();
</script>

{#if browser}
	{#key url}
		<div class="transition" in:fade>
			{@render children?.()}
		</div>
	{/key}
{:else}
	{@render children?.()}
{/if}

<style>
	.transition {
		height: 100%;
	}
</style>