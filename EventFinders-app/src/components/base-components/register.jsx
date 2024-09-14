import styles from '../../styles/register.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../DarkModeContext'; 

/*
    Might be that we want when you press create account you go to sign in and sign in again there?
*/

function Register() {
    const { mode } = useContext(DarkModeContext);
    return(
        <div className={`${styles['main-register']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
            <div className={styles["create-account-container"]}>
                <h2 className={styles["title-for-account-creation"]}>Create your account to find event&apos;s!</h2>
            
                <p className={styles["sub-title-account-creation"]}>Username:</p>
                <input type="text"  className={styles["input-account-creation"]} placeholder='Username'/>

                <p className={styles["sub-title-account-creation"]} style={{marginTop: "3%"}}>Email:</p>
                <input type="text" className={styles["input-account-creation"]} placeholder='Email'/>

                <p className={styles["sub-title-account-creation"]} style={{marginTop: "3%"}}>Password:</p>
                <input type="password" className={styles["input-account-creation"]} placeholder='Password'/>

                <p className={styles["sub-title-account-creation"]} style={{marginTop: "3%"}}>What type of event&apos;s do you want to speak at?</p>
                <input type="text" className={styles["input-account-creation"]} placeholder='e.g. Technology, Artificial Antelligence, Entrepreneurship'/>

                <Link className={styles["button-account-creation"]} to="/events" style={{marginTop: "3%"}}>Create account<i className={`fa-solid fa-arrow-right ${styles["icon-for-button"]}`}></i></Link>
            </div>
            <div className={styles["go-to-sign-in"]}>
                <p className={styles["sub-title-account-creation"]}>Already have a account?</p>
                <Link className={styles["button-account-creation"]} to="/">Go to sign in<i className={`fa-solid fa-arrow-right ${styles["icon-for-button"]}`}></i></Link>
            </div>
        </div>
    )
}

export default Register;