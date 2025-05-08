export const load = (async ({locals}) => {
    const events = await locals.pb.collection('events').getFullList({
			sort: '-endDateTime'
		});
    const courses = await locals.pb.collection('courses').getFullList({
			sort: 'name'
		});
    const posts = await locals.pb.collection('posts').getFullList({
			sort: '-publishedDate'
		});
    const boardMeetings = await locals.pb.collection('boardMeetings').getFullList({
			sort: '-meetingDateTime'
		});
    const boardMembers = await locals.pb.collection('boardMembers').getFullList({
		});
		return { events, courses, posts, boardMeetings, boardMembers };
})