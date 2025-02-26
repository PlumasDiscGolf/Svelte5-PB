<script lang="ts">
	import type { PageData } from './$types';
	import moment from 'moment'

	let { data }: { data: PageData } = $props();
</script>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-lg">
			<h1 class="text-5xl font-bold">{data.post.title}</h1>
		</div>
	</div>
</div>

<!-- Main Content -->
<main class="py-12">
	<article class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl">
			<!-- Article Content -->
			<div class="prose prose-lg max-w-none">
				{@html data.post.content}
			</div>

			<!-- Tags -->
			<div class="my-8 flex flex-wrap gap-2">
				<div class="badge badge-secondary">Pioneer DGC</div>
				<div class="badge badge-secondary">News</div>
			</div>
		</div>
	</article>
</main>
