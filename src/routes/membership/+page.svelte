<script>
	/** @type {import('./$types').PageData} */
	
</script>

<!-- Zeffy Script -->
<svelte:head>
	<script
		src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"
	></script>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Membership</h1>
		</div>
	</div>
</div>

<div class="my-4 w-full text-center">
	<p class="my-4 font-semibold text-secondary">
		We are now processing online memberships through Zeffy, our non-profit financial partner. They
		do not take any fees from our transactions, allowing us to use your full payment to help achieve
		our goals.
	</p>
</div>

<div class="grid md:grid-cols-2">
	<div class="m-auto max-w-[72ch] px-4">
		<p class="my-4 font-semibold">
			Becoming a Club Member is one of the best ways to support Plumas Disc Golf. Memberships are
			one of our primary fundraising sources each year. Thank you for your support!
		</p>
		<p class="font-semibold">The Standard Membership includes:</p>
		<ul class="ml-3">
			<li>A Custom PDG Bag Tag</li>
			<li>Entry into all bag tag league events for the year</li>
			<li>Discounted entry into club events for the year</li>
		</ul>
	</div>
	<div style="position:relative;overflow:hidden;height:500px;width:100%;padding-top:500px;">
		<iframe
			title="Donation form powered by Zeffy"
			style="position: absolute; border: 0; top:0;left:0;bottom:0;right:0;width:100%;height:100%"
			src="https://www.zeffy.com/embed/ticketing/7db2218f-945d-49ad-9125-628c75b8b13c"
			allowpaymentrequest
			allowTransparency="true"
		></iframe>
	</div>
</div>
