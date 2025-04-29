<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Login</h1>
		</div>
	</div>
</div>

<!-- Login Form -->
<div class="mt-12 flex justify-center">
	<div class="card w-full max-w-md bg-base-100 shadow-lg shadow-gray-400">
		<div class="card-body">
			<h2 class="card-title mb-4 flex justify-center text-2xl">Login to Admin Panel</h2>

			<div class="alert alert-error mb-4 hidden">
				<span>Invalid username or password</span>
			</div>

			<form class="space-y-4">
				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input type="text" id="username" class="input input-bordered" required />
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input type="password" id="password" class="input input-bordered" required />
				</div>

				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary"> Login </button>
				</div>
			</form>
		</div>
	</div>
</div>