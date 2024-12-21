export type Categories = 'event' | 'news' | 'site-update' | 'pioneer-dgc';

export type Post = {
	title: string;
	slug: string;
	shortDescription: string;
	content: string;
	date: string;
	categories: Categories[];
	published: boolean;
};

export type Event = {
	name: string;
	slug: string;
	publishDate: string;
	shortDescription: string;
	description: string;
	startDate: string;
	endDate: string;
	checkInTime: string;
	location: string;
	type: string;
	imageURL: string;
	registrationURL: string;
	pdgaURL: string;
	discGolfSceneURL: string;
	eventInfoURL: string;
	resultsURL: string;
	published: boolean;
	resultsPosted: boolean;
};

export type Course = {
	name: string;
	slug: string;
	shortDescription: string;
	description: string;
	location: string;
	type: string;
	imageURL: string;
};

export type Board = {
	name: string;
	role: string;
	bio: string;
	imageURL: string;
}