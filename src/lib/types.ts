export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
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
	location: string;
	imageURL: string;
	registrationURL: string;
	pdgaURL: string;
	discGolfSceneURL: string;
	eventInfoURL: string;
	resultsURL: string;
	published: boolean;
	resultsPosted: boolean;
};
