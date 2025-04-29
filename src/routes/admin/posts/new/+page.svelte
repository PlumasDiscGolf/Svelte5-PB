<script>
	import { preventDefault } from '$lib/utils';
	import * as config from '$lib/config';
	let { data } = $props();
</script>

<svelte:head>
	<title>Events Page - {config.title}</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Create New Post</h1>
		</div>
	</div>
</div>

<div class="container mx-auto w-full px-4 py-8 text-base-content">
	<form onsubmit={preventDefault(submitNewPost)} method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
		<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
			<div class="sm:col-span-2">
				<label for="company" class="block text-md font-semibold text-base-content">Post Title</label>
				<div class="mt-2.5">
					<input type="text" name="company" id="company" autocomplete="organization" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
				</div>
			</div>

			<div class="sm:col-span-2">
				<label for="message" class="block text-md font-semibold">Post Content</label>
				<div class="mt-2.5">
					<textarea name="message" id="message" rows="4" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
				</div>
			</div>
		</div>
		<div class="mt-10">
			<button type="submit" class="shadow-xs block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-primary-content hover:scale-105   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-secondary">Submit Post</button>
		</div>
	</form>
</div>
