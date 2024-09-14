import { useContext } from 'react';
import styles from '../../styles/fullHeader.module.css';
import logo from '../../assets/logo.svg';
import logoDark from '../../assets/BlueLogo.svg'; // Dark mode logo
import logoGray from '../../assets/GrayLogo.svg'; // Add a logo for gray mode
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../DarkModeContext'; 
import profilePhoto from '../../assets/cool-cat2.jpg';

function FullHeader() {
    const { mode } = useContext(DarkModeContext); // Access mode instead of darkMode

    // Choose logo based on mode
    const logoSrc = mode === 'dark' ? logoDark : (mode === 'gray' ? logoGray : logo);

    return (
        <>
            <div className={styles['main-header-empty']}>
                <Link to="/events" className={styles["logo-link"]}>
                    <img 
                        src={logoSrc} // Choose logo based on mode
                        alt="logo" 
                        height={"100%"} 
                        className={styles["logo-header"]}
                    />
                </Link>
                <nav className={styles["navigation-bar"]}>
                    <Link to="/events" 
                          className={`${styles['navigation-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} 
                          style={{ marginLeft: "2%" }}>
                        Dashboard
                    </Link>
                    <Link to="/events/daily-calender" 
                          className={`${styles['navigation-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} 
                          style={{ marginLeft: "2%" }}>
                        Calender
                    </Link>
                    <Link to="/events/docs" 
                          className={`${styles['navigation-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} 
                          style={{ marginLeft: "2%" }}>
                        Docs
                    </Link>
                    <Link to="/signin" 
                          className={styles["logout-button"]} 
                          style={{ marginLeft: "2%", marginRight: "2%" }}>
                        Log out
                    </Link>
                    <Link to="/events/profile" className={styles["image-of-user"]}>
                        <div className={styles["hover-profile-photo"]}>
                            <img src={profilePhoto} 
                                className={styles["profile-inner-photo"]} 
                                alt="Profile photo" />
                            <i className={`fa fa-cog ${styles["cogwheel"]}`} aria-hidden="true"></i>
                        </div>
                    </Link>

                </nav>
            </div>
            <div className={styles["header-stopper"]} />
        </>
    )
}

export default FullHeader;