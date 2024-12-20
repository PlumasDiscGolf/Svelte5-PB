<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="my-4 w-full text-center">
	<h1 class="text-4xl">Donate</h1>
</div>

<div class="flex flex-col">
	<div class="m-auto max-w-[72ch]">
		<p class="my-4 font-semibold">
			If you are interested in making a donation to Plumas Disc Golf, thank you. Donations will help
			us maintain our current courses, create new courses in Plumas County, and support other
			projects. We are always working to better our community through the lens of disc golf, and
			your donation will help us acheive our goals. Thank you for your consideration.
		</p>
	</div>
	<div style="position:relative;overflow:hidden;height:1200px;width:100%;">
		<iframe
			title="Donation form powered by Zeffy"
			style="position: absolute; border: 0; top:0;left:0;bottom:0;right:0;width:100%;height:100%"
			src="https://www.zeffy.com/embed/donation-form/4ae7f1ce-65e5-430a-b6fc-4d7de12ed1e9"
			allowpaymentrequest
			allowTransparency="true"
		></iframe>
	</div>
</div>
