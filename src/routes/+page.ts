import type { Post } from '$lib/types';

export async function load() {
	const posts: Post[] = [
		{
			date: '2024-11-18',
			title: 'Pioneer DGC Tee Pad Project is Complete',
			slug: '2024-putting-league',
			categories: ['pioneer-dgc', 'news'],
			shortDescription:
				"The Pioneer Tee Pad Project is complete and it's AMAZING! This wouldn't have been possible without the incredible support of our community.",
			content:
				"<p>The Pioneer Tee Pad Project is complete and it's AMAZING! This wouldn't have been possible without the incredible support of our community. A heartfelt thank you to:</p><ul><li><strong>Our Donors:</strong> Bread for the Journey Feather River and Feather River Food Co-Op's Round Up at the Register program for funding the tee pad materials and signage. Your generosity made this project a reality! Nick Maffei for providing funds for volunteer supplies and food, and Mike McQuinn for the charcoal!</li><li><strong>Our Volunteers:</strong> Chase Ramirez for his vision and hard work in organizing this project! Klay Lund for bringing his tractor and saving us tons of time and effort! And a HUGE thank you to Rebecca Terhune, Mel Strahm, Justin Cooke, Dennis Williams, Mark Jennings, Rick Stock, Frederick Howe, Matthew Brooks, Eric Jobe, Ben Williamson, Dan Ramirez, Alex Lemnah, and Blake Bridges for putting in the sweat equity to get those tee pads installed!</li><li><strong>Our Amazing Cooks:</strong> Frederick Howe for bringing the grill, Joe &amp; Wendy Bridges for the delicious potato salad, and Jeremiah Bridges for grilling up a feast for everyone!</li></ul><p>Because of you, Pioneer DGC has an awesome newly upgraded disc golf course that everyone can enjoy! But wait, there's more! We're not done yet! Stay tuned for updates as we finalize the basket locations, create a course map, and install those awesome new tee signs! Exciting things are happening at Pioneer DGC!</p>",
			published: true
		},
		{
			date: '2024-11-18',
			title: 'Pioneer DGC Tee Pad Project is Complete',
			slug: '2024-putting-league',
			categories: ['pioneer-dgc', 'news'],
			shortDescription:
				"The Pioneer Tee Pad Project is complete and it's AMAZING! This wouldn't have been possible without the incredible support of our community.",
			content:
				"<p>The Pioneer Tee Pad Project is complete and it's AMAZING! This wouldn't have been possible without the incredible support of our community. A heartfelt thank you to:</p><ul><li><strong>Our Donors:</strong> Bread for the Journey Feather River and Feather River Food Co-Op's Round Up at the Register program for funding the tee pad materials and signage. Your generosity made this project a reality! Nick Maffei for providing funds for volunteer supplies and food, and Mike McQuinn for the charcoal!</li><li><strong>Our Volunteers:</strong> Chase Ramirez for his vision and hard work in organizing this project! Klay Lund for bringing his tractor and saving us tons of time and effort! And a HUGE thank you to Rebecca Terhune, Mel Strahm, Justin Cooke, Dennis Williams, Mark Jennings, Rick Stock, Frederick Howe, Matthew Brooks, Eric Jobe, Ben Williamson, Dan Ramirez, Alex Lemnah, and Blake Bridges for putting in the sweat equity to get those tee pads installed!</li><li><strong>Our Amazing Cooks:</strong> Frederick Howe for bringing the grill, Joe &amp; Wendy Bridges for the delicious potato salad, and Jeremiah Bridges for grilling up a feast for everyone!</li></ul><p>Because of you, Pioneer DGC has an awesome newly upgraded disc golf course that everyone can enjoy! But wait, there's more! We're not done yet! Stay tuned for updates as we finalize the basket locations, create a course map, and install those awesome new tee signs! Exciting things are happening at Pioneer DGC!</p>",
			published: true
		}
	];

	const publishedPosts = posts.filter((post) => {
		return post.published === true;
	})

	return { publishedPosts };
}
