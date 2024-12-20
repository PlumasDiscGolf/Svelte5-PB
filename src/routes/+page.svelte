<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	let { data } = $props();
</script>

<svelte:head>
	<title>{config.title} - Homepage</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Plumas Disc Golf</h1>
			<p class="py-6">Keep up to date with the happenings of Plumas Disc Golf.</p>
			<!-- <button class="btn btn-primary">Get Started</button> -->
		</div>
	</div>
</div>

<!-- Featured Posts -->
<div class="container mx-auto px-4 py-8">
	<h2 class="mb-6 text-3xl font-bold">News Posts</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<!-- Post Cards -->
		{#each data.publishedPosts as post}
			<div class="card bg-base-100 shadow-xl">
				<!-- <figure><img src="" alt="Article thumbnail"/></figure> -->
				<div class="card-body">
					{#each post.categories as category}
						<div class="badge badge-secondary uppercase">{category}</div>
					{/each}
					<h2 class="card-title">{post.title}</h2>
					<p>{post.shortDescription}</p>
					<div class="card-actions mt-4 items-center justify-between">
						<button class="btn btn-primary btn-sm">Read More</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
