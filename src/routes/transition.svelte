<script >
	import { fade } from 'svelte/transition'

	let { children, url } = $props()
</script>

{#key url}
	<div class="transition" in:fade>
		{@render children?.()}
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
