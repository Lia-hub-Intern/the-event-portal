/**
 * Custom functions
 *
 */
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { useState } from 'react';

/** Receives a text and puts the first
 * letter in capital letters and the rest
 * in lower case
 **/

/** Export navArrayLinks for header menu App.jsx */
export const navBarLinks = [
	{ title: 'Home', path: '/', icon: <HomeIcon /> },
	{ title: 'Events', path: '/', icon: <TravelExploreIcon /> },
	{ title: 'Speakers', path: '/Speakers', icon: <InterpreterModeIcon /> },
];

export const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ title: 'The Godfather: Part II', year: 1974 },
	{ title: 'The Dark Knight', year: 2008 },
	{ title: '12 Angry Men', year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: 'Pulp Fiction', year: 1994 },
	{
		title: 'The Lord of the Rings: The Return of the King',
		year: 2003,
	},
	{ title: 'The Good, the Bad and the Ugly', year: 1966 },
	{ title: 'Fight Club', year: 1999 },
	{
		title: 'The Lord of the Rings: The Fellowship of the Ring',
		year: 2001,
	},
	{
		title: 'Star Wars: Episode V - The Empire Strikes Back',
		year: 1980,
	},
	{ title: 'Forrest Gump', year: 1994 },
	{ title: 'Inception', year: 2010 },
	{
		title: 'The Lord of the Rings: The Two Towers',
		year: 2002,
	},
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: 'Goodfellas', year: 1990 },
	{ title: 'The Matrix', year: 1999 },
	{ title: 'Seven Samurai', year: 1954 },
	{
		title: 'Star Wars: Episode IV - A New Hope',
		year: 1977,
	},
	{ title: 'City of God', year: 2002 },
	{ title: 'Se7en', year: 1995 },
	{ title: 'The Silence of the Lambs', year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: 'Life Is Beautiful', year: 1997 },
	{ title: 'The Usual Suspects', year: 1995 },
	{ title: 'Léon: The Professional', year: 1994 },
	{ title: 'Spirited Away', year: 2001 },
	{ title: 'Saving Private Ryan', year: 1998 },
	{ title: 'Once Upon a Time in the West', year: 1968 },
	{ title: 'American History X', year: 1998 },
	{ title: 'Interstellar', year: 2014 },
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
