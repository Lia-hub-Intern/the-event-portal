/** Company: Karl Company
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-08-24
 *     Program : App.jsx
 *   Path Name : incasale-dev/frontend/src
 *       Tools : NodeJS, React, Mteria UI
 *
 * Description:
 * - Calls website pages through routes.
 * - Variabler
 *   Routes, Route  : true/false
 *   navArrayLinks  : This variable is export as PROPS to Navbar.jsx component
 *              sx  : Includes properties to a component
 *
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material'; /**This way the page updates faster */
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Navbar from './components/navbar/Navbar';
import { navBarLinks } from './components/functions/Functions';
import Home from './components/views/Home';
import Login from './components/views/Login';
import Speakers from './components/views/Speakers';
import Events from './components/views/Events';
import 'dayjs/locale/en-gb';
import Conference from './components/views/Conference';

/**
 * This function is the main function of the application.
 * It is responsible for rendering the main components of the application.
 * @returns {JSX.Element} The main components of the application.
 */
export default function App() {
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
				<Navbar navBarLinks={navBarLinks} />
				<Container sx={{ mt: 5 }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/speakers" element={<Speakers />} />
						<Route path="/events" element={<Events />} />
						<Route path="/conference" element={<Conference />} />

						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Container>
			</LocalizationProvider>
		</>
	);
}
