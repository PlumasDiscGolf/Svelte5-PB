<script>
	import moment from 'moment'
	import { dateOptions } from '$lib/utils';
	import * as config from '$lib/config';

	let { data } = $props();
</script>

<svelte:head>
	<title>{config.title} - Homepage</title>
</svelte:head>

<div class="hero relative min-h-[60vh]" style="background-image: url('/images/Pioneer.jpg')">
	<div class="hero-overlay bg-opacity-20"></div>
	<div class="hero-content text-neutral-content h-full text-center">
		<div class="mt-auto">
			<div class="mb-4 grid h-full w-full items-end gap-2">
				<h1 class="mb-5 text-5xl font-bold drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)]">Plumas Disc Golf</h1>
				<div class="min-h-content bg-neutral max-w-md rounded-xl bg-opacity-90 p-2">
					<p class="my-auto">Join the Plumas Disc Golf Family! Make new friends, play more disc golf, and support our local courses.</p>
				</div>
				<a href="/membership" class="btn btn-primary mx-auto">Join the Club</a>
			</div>
		</div>
	</div>
</div>

<!-- Newest Posts -->
<div class="container mx-auto px-4 py-8">
	<h2 class="mb-6 text-center text-3xl font-bold">Newest Posts</h2>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<!-- Post Cards -->
		{#each data.posts.items as post}
			<div class="card bg-base-100 shadow-lg shadow-gray-400">
				<!-- <figure><img src="" alt="Article thumbnail"/></figure> -->
				<div class="card-body">
					<p class="font-semibold">
						{moment(post.publishedDate).format('MMMM Do YYYY')}
					</p>
					<h2 class="card-title">{post.title}</h2>
					<p>{@html post.content.substring(0, 150)} ...</p>
					<div class="card-actions mt-4 items-center justify-between">
						<a href="/posts/{post.id}" class="btn btn-primary btn-sm" data-sveltekit-preload-data="off">Read More</a>
					</div>
					<div class="flex gap-2">
						{#each post.categories as category}
							<div class="badge badge-secondary">{category}</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-6 flex w-full justify-center">
		<a href="/posts" class="btn btn-secondary">View All</a>
	</div>
</div>
