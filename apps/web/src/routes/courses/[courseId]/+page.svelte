<script lang="ts">
	let { data } = $props();

	let course = data.course;
    console.log(course)
</script>

<!-- Hero Section -->
<div class="hero relative min-h-[40vh]" style="background-image: url({`http://localhost:8090/api/files/${course.collectionId}/${course.id}/${course.image}?download=1`}})">
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">{course.name}</h1>
		</div>
	</div>
</div>

<div class="container mx-auto px-4 py-8">
	<!-- Quick Info Cards -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
		<!-- Location Card -->
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<h3 class="card-title">Location</h3>
				</div>
				<p>{course.location}</p>
				<!-- <div class="card-actions">
					<a href={course.directions} target="_blank" class="btn btn-primary btn-sm"
						>Get Directions</a
					>
				</div> -->
			</div>
		</div>

		<!-- Course Info Card -->
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 class="card-title">Course Info</h3>
				</div>
				<ul class="space-y-1">
					<li>Holes: {course.numberOfHoles}</li>
					<li>Par: {course.par}</li>
					<li>Length: {course.length} ft</li>
				</ul>
			</div>
		</div>

		<!-- Course Type Card -->
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>
					<h3 class="card-title">Course Type</h3>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each course.tags as tag}
						<div class="badge badge-secondary text-gray-100">{tag}</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Course Description -->
	<div class="card mb-8 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">About the Course</h2>
			<p>{@html course.description}</p>
		</div>
	</div>

	<!-- Course Images -->
	<!-- {#if course.images && course.images.length > 0}
		<div class="mb-8">
			<h2 class="mb-4 text-2xl font-bold">Course Images</h2>
			<div class="carousel w-full rounded-box">
				{#each course.images as image, i}
					<div id="slide{i}" class="carousel-item relative w-full">
						<img src={image.url} class="w-full" alt={image.caption || `Course image ${i + 1}`} />
						<div
							class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
						>
							<a href="#slide{i === 0 ? course.images.length - 1 : i - 1}" class="btn btn-circle"
								>❮</a
							>
							<a href="#slide{i === course.images.length - 1 ? 0 : i + 1}" class="btn btn-circle"
								>❯</a
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if} -->

	<!-- Hole Information -->
	<!-- <div class="mb-8">
		<h2 class="mb-4 text-2xl font-bold">Hole Information</h2>
		<div class="overflow-x-auto">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th>Hole</th>
						<th>Length (ft)</th>
						<th>Par</th>
						<th>Elevation</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{#each holes as hole}
						<tr>
							<td>{hole.number}</td>
							<td>{hole.length}</td>
							<td>{hole.par}</td>
							<td>{hole.elevation || 'Level'}</td>
							<td>{hole.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div> -->
	<!-- Amenities -->
	<!-- <div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3"> -->

	<!-- Facilities -->
	<!-- <div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h3 class="card-title">Facilities</h3>
				<ul class="space-y-2">
					{#each amenities.facilities as facility}
						<li class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-success"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
							{facility.name}
						</li>
					{/each}
				</ul>
			</div>
		</div> -->

	<!-- Features -->
	<!-- <div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h3 class="card-title">Features</h3>
				<ul class="space-y-2">
					{#each amenities.features as feature}
						<li class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-success"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
							{feature.name}
						</li>
					{/each}
				</ul>
			</div>
		</div> -->

	<!-- Parking -->
	<!-- <div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h3 class="card-title">Parking</h3>
				<ul class="space-y-2">
					{#each amenities.parking as parking}
						<li class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-success"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
							{parking.name}
						</li>
					{/each}
				</ul>
			</div>
		</div> -->
</div>
