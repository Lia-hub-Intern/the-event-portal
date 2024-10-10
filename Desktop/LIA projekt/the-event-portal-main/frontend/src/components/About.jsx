/**
 * About
 * This component displays information about the website and contact details.
 */
export default function About() {
	return (
		<>
			<h1>About Us</h1> {/* Titel för sidan 'Om oss' */}
			<p>Welcome to the About page. Here you will find information about our website.</p> {/* Kort beskrivning */}
			<h2>Contact Us</h2> {/* Titel för kontaktinformation */}
			<p>If you have any questions, feel free to reach out!</p> {/* Kontaktinformation */}
			<ul>
				<li>Email: info@example.com</li> {/* E-postadress */}
				<li>Phone: +123 456 789</li> {/* Telefonnummer */}
			</ul>
		</>
	);
}
