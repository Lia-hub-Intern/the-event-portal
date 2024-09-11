import styles from '../../styles/landingHeader.module.css';
import logo from '../../assets/logo.svg';        // Light mode logo
import logoDark from '../../assets/BlueLogo.svg'; // Dark mode logo
import logoGray from '../../assets/GrayLogo.svg'; // Gray mode logo (make sure this is available)
import { useContext } from 'react';
import { DarkModeContext } from '../../DarkModeContext'; 
import { Link } from 'react-router-dom';

function LandingHeader() {
    const { mode } = useContext(DarkModeContext);  // Access mode (light, dark, or gray)

    // Choose the appropriate logo based on mode
    const logoSrc = mode === 'dark' ? logoDark : (mode === 'gray' ? logoGray : logo);

    return(
    <>
        <div className={styles['main-header-empty']}>
            <img 
                src={logoSrc}  // Switch logos based on mode
                alt="logo" 
                height={"75%"} 
                className={styles["logo-header"]}
            />
            <Link to="/signin" 
                className={styles["logout-button"]} 
                style={{ marginLeft: "1%", marginRight: "0.5%", right: "2%" }}>
                Sign in
            </Link>
            <Link to="/register" 
                className={styles["logout-button"]} 
                style={{ marginLeft: "0.5%", marginRight: "1%", right: "12%" }}>
                Register
            </Link>
        </div>
        <div className={styles["header-stopper"]} />
    </>
    )
}

export default LandingHeader;