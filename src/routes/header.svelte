<script lang="ts">
	import logoImg from '/images/header_logo.png';
</script>

<div class="navbar bg-neutral text-neutral-content uppercase">
	<div class="navbar-start">
		<!-- Menu for small screens -->
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost font-semibold text-white lg:hidden">
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
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul
				tabindex="0"
				class="menu dropdown-content menu-sm rounded-box bg-neutral z-[1] mt-3 w-52 p-2 font-semibold text-white shadow"
			>
				<li><a href="/membership" aria-label="membership link">Membership</a></li>
				<li><a href="/events" aria-label="events link">Events</a></li>
				<li>
					<a href="/courses" aria-label="courses link">Courses</a>
					<ul class="p-2">
						<li><a href="/courses/pioneer" aria-label="pioneer course link">Pioneer DGC</a></li>
						<li>
							<a href="/courses/cascades" aria-label="cascades course link">Cascades DGC</a>
						</li>
					</ul>
				</li>
				<li><a href="/calendar" aria-label="calendar link">Calendar</a></li>
				<li><a href="/board" aria-label="board link">Board</a></li>
				<li><a href="/donate" aria-label="donate link">Donate</a></li>
				<li><a href="/about" aria-label="about link">About</a></li>
				<li><a href="https://shop.plumasdiscgolf.com" aria-label="shop link">Shop</a></li>
			</ul>
		</div>
		<!-- Logo -->
		<a href="/" class="btn btn-ghost hidden lg:block" aria-label="logo"
			><img
				src={logoImg}
				alt="Plumas Disc Golf's Logo"
				class="max-h-full scale-125 hover:scale-105"
			/></a
		>
	</div>
	<div class="navbar-center">
		<div>
			<a href="/" class="btn btn-ghost lg:hidden" aria-label="logo"
				><img src={logoImg} alt="Plumas Disc Golf's Logo" class="max-h-full hover:scale-105" /></a
			>
		</div>
		<!-- Menu for Larger screens -->
		<ul class="menu menu-horizontal hidden px-1 font-semibold text-white lg:flex">
			<li><a href="/membership" aria-label="membership link">Membership</a></li>
			<li><a href="/events" aria-label="events link">Events</a></li>
			<li>
				<details>
					<summary>Courses</summary>
					<ul class="bg-neutral text-neutral-content p-2">
						<li><a href="/courses/pioneer" aria-label="pioneer course link">Pioneer DGC</a></li>
						<li>
							<a href="/courses/cascades" aria-label="cascades course link">Cascades DGC</a>
						</li>
					</ul>
				</details>
			</li>
			<li><a href="/calendar" aria-label="calendar link">Calendar</a></li>
			<li><a href="/board" aria-label="board link">Board</a></li>
			<li><a href="/donate" aria-label="donate link">Donate</a></li>
			<li><a href="/about" aria-label="about link">About</a></li>
			<li><a href="https://shop.plumasdiscgolf.com" aria-label="shop link">Shop</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<!-- <a class="btn">Button</a> -->
	</div>
</div>
