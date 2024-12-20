<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="my-4 w-full text-center">
	<h1 class="text-4xl">Calendar</h1>
</div>
<div class="flex w-full">
	<div class="responsiveCal mx-auto">
		<div class="deskContent hidden md:block">
			<iframe
				src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%231abc9c&ctz=America%2FLos_Angeles&showTitle=1&title=Plumas%20Disc%20Golf%20Events&showCalendars=0&showDate=1&src=Y19yb21mcjVtaWRzaGIxdm9uODVxZm92M29pOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23009688"
				style="border: 0"
				width="800"
				height="600"
				frameborder="0"
				scrolling="no"
			></iframe>
		</div>
		<div class="phoneContent md:hidden">
			<iframe
				src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%231abc9c&ctz=America%2FLos_Angeles&mode=AGENDA&showTabs=0&showCalendars=0&src=Y19yb21mcjVtaWRzaGIxdm9uODVxZm92M29pOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23009688"
				style="border: 0"
				width="300"
				height="500"
				frameborder="0"
				scrolling="no"
			></iframe>
		</div>
	</div>
</div>
