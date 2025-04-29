
export async function load({ locals }) {
	const boardMembers = await locals.pb.collection('boardMembers').getFullList();
	const boardMeetings = await locals.pb.collection('boardMeetings').getList(1, 12, {
		sort: '-meetingDateTime'
	});

	const activeMembers = boardMembers.filter((member) => {
		return member.active === true;
	});

	const inactiveMembers = boardMembers.filter((member) => {
		return member.active !== true;
	});

	return { activeMembers, inactiveMembers, boardMeetings };
}
