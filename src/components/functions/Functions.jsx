/*Custom functions*/
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

/* Receives a text and puts the first
 
letter in capital letters and the rest
in lower case
*/

/* Export navArrayLinks for header menu App.jsx */
export const navBarLinks = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Events", path: "/", icon: <TravelExploreIcon /> },
];
