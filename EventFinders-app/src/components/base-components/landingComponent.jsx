import styles from '../../styles/landing.module.css';
import firstImage from '../../assets/First-image-landing.svg';
import secondImage from '../../assets/second-image-landing.svg';
import firstExplenation from '../../assets/first-step-landing.svg';
import secondExplenation from '../../assets/second-step-landing.svg'
import thirdExplenation from '../../assets/third-step-landing.svg'
//import { Link } from 'react-router-dom';


function LandingPage() {
    return(
        /*<Link to="/signin">Sign in</Link>*/
        <div className={styles["landing-page-container"]}>
            <div className={styles["landing-page-inner"]}>
                <h1 className= {styles['title-text']}>Land paid speaking gigs with <span className={styles["highlighted-text"]} style={{fontSize: "1.65rem", color: "var(--LightContrastBlue)"}}> &nbsp;EventFinders&nbsp; </span> and take the stage with ease</h1>
                <div className={styles["numbers-container"]}>
                    <div className={styles["number-container-one"]}>
                        <h3 className={styles["headline-for-one"]}>Active users</h3>
                        <h3 className={styles["content-for-one"]}>4 563</h3>
                    </div>
                    <div className={styles["number-container-two"]}>
                        <h3 className={styles["headline-for-two"]}>Speaches held with <span className={styles["highlighted-text"]} style={{fontSize: "1.45rem", color: "var(--LightContrastBlue)"}}> &nbsp;EventFinders&nbsp; </span></h3>
                        <h3 className={styles["content-for-two"]}>127 456</h3>
                    </div>
                    <div className={styles["number-container-three"]}>
                        <h3 className={styles["headline-for-three"]}>You keep</h3>
                        <h3 className={styles["content-for-three"]}>95%</h3>
                    </div>
                </div>
                <div className={styles["about-us-container"]}>
                    <img src={firstImage} alt="" height={"100%"} />
                    <p className={styles["about-us-content"]}>
                        <span style={{ fontSize: "1.15rem", color: "var(--LightContrastBlue)" }}> EventFinders </span> 
                        is designed to take the hassle out of finding speaking opportunities. We understand that, as a speaker, your
                        time is better spent preparing for impactful presentations rather than searching for the right events. That&apos;s where we come in.
                        <br />
                        <br />
                        Using cutting-edge AI, 
                        <span style={{ fontSize: "1.15rem", color: "var(--LightContrastBlue)" }}> EventFinders </span> 
                        automatically searches for events that align with your expertise, industry, and goals. Whether you&apos;re 
                        a seasoned keynote speaker or just starting out, we help you discover the perfect stages to showcase your knowledge.
                        <br />
                        <br />
                        Our service goes a step further by automating communication with event organizers. Once a match is found, personalized emails are sent on your behalf,
                        introducing you and securing your spot on their radar. This saves you time while ensuring that you never miss an opportunity to grow your influence and
                        expand your network.
                        <br />
                        <br />
                        Let 
                        <span style={{ fontSize: "1.15rem", color: "var(--LightContrastBlue)" }}> EventFinders </span> 
                        handle the details so you can focus on what you do best—delivering unforgettable talks that leave a lasting impact.
                    </p>
                </div>
                <div className={styles["seconad-image-container"]}>
                    <img src={secondImage} width={"70%"} alt="" />
                </div>
                <div className={styles["explenation-container"]}>
                    <div className={styles["explenation-image"]}>
                        <img src={firstExplenation} width={"50%"} style={{marginLeft: "22%"}} alt="" />
                    </div>
                    <div className={styles["explenation-content"]}>
                        <p className={styles["explenation-text"]}>
                            Browse through our curated list of events and choose the ones that interest you.
                        </p>
                    </div>
                    <div className={styles["explenation-image"]}>
                        <img src={secondExplenation} width={"50%"} style={{marginLeft: "22%"}} alt="" />
                    </div>
                    <div className={styles["explenation-content"]}>
                        <p className={styles["explenation-text"]}>
                        <span style={{ fontSize: "1.15rem", color: "var(--LightContrastBlue)" }}> EventFinders </span> takes it from here, automatically reaching out to event organizers to see if they&apos;re interested in having you as a speaker.
                        </p>
                    </div>
                    <div className={styles["explenation-image"]}>
                        <img src={thirdExplenation} width={"50%"} style={{marginLeft: "22%"}} alt="" />
                    </div>
                    <div className={styles["explenation-content"]}>
                        <p className={styles["explenation-text"]}>
                            Once everything is confirmed, we bring you the details, your speaking time and date so you&apos;re all set to take the stage.
                        </p>
                    </div>
                </div>
                <div className={styles["email-container"]}>
                    <h6 className={styles["email-title"]}>Contact us at</h6>
                    <br />
                    <h3 className={styles["email-content"]}><span style={{ fontSize: "1.45rem", color: "var(--LightContrastBlue)" }}>EventFinders</span>@gmail.com</h3>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;