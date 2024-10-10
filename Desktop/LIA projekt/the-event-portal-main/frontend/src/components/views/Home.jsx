import { Link } from 'react-router-dom'; // تأكد من استيراد Link من react-router-dom

/**
 * Home
 * This component displays the homepage of the website.
 */
export default function Home() {
	return (
		<>
			<h1>Home</h1> {/* Titel på startsidan */}
			<p>Welcome to our website! Here you can find various resources.</p> {/* Kort beskrivning av webbplatsen */}
			<Link to="/about">
				<button>Learn more about us</button> {/* Knappar för att gå till 'Om oss' sidan */}
			</Link>
		</>
	);
}
