import styles from '../../styles/signIn.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../DarkModeContext';

function SignIn() {
    const { mode } = useContext(DarkModeContext); 
    return(
        <div className={`${styles['main-sign-in']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
            <div className={styles['sign-in-field']}>
                <h2 className={styles["title-for-sign-in"]}>Log in to find events!</h2>
                
                <p className={styles["sub-title-login"]}>Email or username:</p>
                <input type="text" className={styles["input-sign-in"]} placeholder='Email or username'/>
                
                <p className={styles["sub-title-login"]} style={{marginTop: "3%"}}>Password:</p>
                <input type="password" className={styles["input-sign-in"]} placeholder='Password'/>
                
                <Link className={styles["button-signin"]} to="/events" style={{marginTop: "3%"}}>Log in<i className={`fa-solid fa-arrow-right ${styles["icon-for-button"]}`}></i></Link>
            </div>
            <div className={styles["go-to-account-creation"]}>
                <p className={styles["sub-title-login"]} style={{marginLeft: "1%"}}>Don&apos;t have an account?</p>
                <Link className={styles["button-signin"]} to="/register">Sign up for free<i className={`fa-solid fa-arrow-right ${styles["icon-for-button"]}`}></i></Link>
            </div>
        </div>    
    )
}

export default SignIn;