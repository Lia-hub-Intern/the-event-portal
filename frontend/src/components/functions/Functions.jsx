/**
 * Custom functions
 *
 */
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState } from 'react';

/** Receives a text and puts the first
 * letter in capital letters and the rest
 * in lower case
 **/

/** Export navArrayLinks for header menu App.jsx */
export const navBarLinks = [
	{ title: 'Home', path: '/', icon: <HomeIcon /> },
	{ title: 'Events', path: '/', icon: <TravelExploreIcon /> },
];

export async function textToArray(data) {
	const lines = data.split('\n');
	const events = [];

	let currentEvent = {};
	let description = '';

	for (const line of lines) {
		if (line.startsWith('**')) {
			if (Object.keys(currentEvent).length > 0) {
				events.push(currentEvent);
			}
			currentEvent = {};
			currentEvent.title = line.substring(2, line.length - 2);
			description = '';
		} else if (line.includes(':')) {
			const [key, values] = line.split(':');
			currentEvent[key.trim()] = values.trim();
		} else {
			description += line + ' ';
		}
	}

	if (Object.keys(currentEvent).length > 0) {
		currentEvent.description = description.trim();
		events.push(currentEvent);
	}

	return events;
}
