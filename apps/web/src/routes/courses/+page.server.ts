export async function load({ locals }) {

	const courses = await locals.pb.collection('courses').getFullList({
		expand: 'tags'
	});

	// const courses: Course[] = [
	// 	{
	// 		name: 'Pioneer Disc Golf Course',
	// 		slug: 'pioneer-dgc',
	// 		shortDescription:
	// 			'Pioneer Disc Golf Course is the flagship course of Plumas Disc Golf, offering a fun and accessible experience for players of all levels. ',
	// 		description:
	// 			"<p>Pioneer Disc Golf Course is the flagship course of Plumas Disc Golf, offering a fun and accessible experience for players of all levels. Recently redesigned, this 9-hole course boasts a variety of exciting new challenges while maintaining its welcoming atmosphere.</p><p>Here's what makes Pioneer DGC special:</p><ul><li><strong>Perfect for beginners: </strong>Shorter hole distances and improved layouts make this course ideal for those new to the sport.</li><li><strong>Fun for experienced players: </strong>Strategic shot placement and accuracy are still key to scoring well, offering a rewarding challenge for seasoned disc golfers.</li><li><strong>Conveniently located in Quincy: </strong>Enjoy a quick and casual round without venturing far from town. Perfect for a lunch break or an after-work escape!</li><li><strong>New kiosk and course map: </strong>Easily find your way around with our brand new kiosk and detailed course map (coming soon).</li></ul><p>Come join us for a round at Pioneer and experience the joy of disc golf in a welcoming and vibrant community!</p>",
	// 		location: 'Quincy, CA',
	// 		type: '9 Hole Course',
	// 		imageURL:
	// 			'/images/Pioneer.jpg'
	// 	},
	// 	{
	// 		name: 'Cascades Disc Golf Course',
	// 		slug: 'cascades-dgc',
	// 		shortDescription:
	// 			'Coming soon to Plumas County! Cascades Disc Golf Course is an exciting new 18-hole course designed to challenge and inspire disc golfers of all levels.',
	// 		description:
	// 			"<p>Coming soon to Plumas County! Cascades Disc Golf Course is an exciting new 18-hole course designed to challenge and inspire disc golfers of all levels. Nestled amidst the breathtaking scenery along the route to the Cascade Trailhead parking area, this course promises an unforgettable disc golf adventure.</p><p>Here's what you can expect at Cascades DGC:</p><ul><li><strong>A step up in challenge: </strong>Prepare to test your skills with longer distances, strategic obstacles, and demanding terrain.</li><li><strong>Immersive natural beauty: </strong>Experience the serenity of the Cascades as you navigate through towering pines and stunning vistas.</li><li><strong>Variety and excitement: </strong>Enjoy a diverse mix of hole designs that will keep you engaged and challenged from start to finish.</li><li> <strong>A true test of skill: </strong>Cascades will put your disc golf abilities to the test, rewarding precision and strategy.</li></ul><p>Keep an eye out for the grand opening of Cascades Disc Golf Course in 2025! It's sure to become a premier destination for disc golfers seeking an elevated playing experience in the heart of Plumas County.</p>",
	// 		location: 'Quincy, CA',
	// 		type: '18 Hole Course',
	// 		imageURL:
	// 			'/images/cascades.jpg'
	// 	}
	// ];

	return { courses };
}
