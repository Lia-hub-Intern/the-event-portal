import styles from '../../styles/profile.module.css';
import { useState, useContext } from 'react';
import BlueVersion from "../../assets/BlueVersion.svg";
import WhiteVersion from "../../assets/WhiteVersion.svg";
import GrayVersion from "../../assets/GrayVersion.svg";
import { DarkModeContext } from '../../DarkModeContext';
import profilePhoto from '../../assets/cool-cat2.jpg';
 
// Doesn't feel very secure, change later.
const userInfo = {
    userName: "SuperMan325",
    userEmail: "SuperMan325@gmail.com",
    userFullName: "Jonathan D. Tourville",
};

// Account settings content
function AccountSettings() {
    return (
        <div className={styles["user-info-container"]}>
            <h2 className={styles["account-title"]}>Account</h2>
            <div className={styles["bigger-inner-container"]}>
                <img src={profilePhoto} className={styles["profile-photo"]} alt="Profile photo" />
                <div className={styles["smaller-inner-container"]}>
                    <h3 className={styles["user-input-field"]} style={{marginLeft: "1%", width: "99%"}}>{userInfo.userName}<span className={styles["user-input-button"]}><i className="fa-solid fa-pencil"></i></span></h3>
                    <h3 className={styles["user-input-field"]} style={{marginLeft: "1%", width: "99%"}}>{userInfo.userEmail}<span className={styles["user-input-button"]}><i className="fa-solid fa-pencil"></i></span></h3>
                </div>
            </div>
            <h3 className={styles["user-input-field"]} style={{marginTop: "0%"}}>{userInfo.userFullName}<span className={styles["user-input-button"]}><i className="fa-solid fa-pencil"></i></span></h3>
        </div>
    );
}

// Appearance settings content
function AppearanceSettings() {
    const { mode, changeMode } = useContext(DarkModeContext); // Consume the theme context

    return (
        <div>
            <h2 className={styles["account-title"]}>Appearance Settings</h2>
            <div className={styles["color-apperance-container"]}>
                <h6 className={styles["color-settings-text"]}>Color settings</h6>
                <img 
                    src={WhiteVersion} 
                    alt="White Mode" 
                    width={"25%"} 
                    className={styles["example-version-image"]} 
                    style={{ marginLeft: "0.5%", border: mode === 'light' ? '4px solid var(--HighContrastBlue)' : '4px solid transparent' }} // Visual cue for light mode
                    onClick={() => changeMode('light')} // Set to light mode
                />
                <img 
                    src={BlueVersion} 
                    alt="Blue Mode" 
                    width={"25%"} 
                    className={styles["example-version-image"]} 
                    style={{ marginLeft: "3%", border: mode === 'dark' ? '4px solid var(--HighContrastBlue)' : '4px solid transparent' }} // Visual cue for dark mode
                    onClick={() => changeMode('dark')} // Set to dark mode
                />
                <img 
                    src={GrayVersion} 
                    alt="Gray Mode" 
                    width={"25%"} 
                    className={styles["example-version-image"]} 
                    style={{ marginLeft: "3%", border: mode === 'gray' ? '4px solid var(--HighContrastBlue)' : '4px solid transparent' }} // Visual cue for gray mode
                    onClick={() => changeMode('gray')} // Set to gray mode
                />
            </div>
        </div>
    );
}

// Public information settings content
function PublicInformationSettings() {
    return (
        <div>
            <h2>Public Information Settings</h2>
            <p>Profile Visibility: Public</p>
            <p>Profile Picture: Default</p>
        </div>
    );
}

function Profile() {
    const [itemIconState, setItemIconState] = useState('option1');

    // Function to render the appropriate settings content
    const renderSettingsContent = () => {
        switch (itemIconState) {
            case 'option1':
                return <AccountSettings />;
            case 'option2':
                return <AppearanceSettings />;
            case 'option3':
                return <PublicInformationSettings />;
            default:
                return <AccountSettings />;
        }
    };

    return (
        <div className={styles["profile-main-container"]}>
            <div className={styles["profile-main"]}>
                <div className={styles["settings-menu"]}>
                    <span className={styles["menu-item-container"]}>
                        {itemIconState === "option1" ? (
                            <div className={styles["item-icon"]} style={{ backgroundColor: "var(--HighContrastBlue)" }} />
                        ) : (
                            <div className={styles["item-icon"]} />
                        )}
                        <p className={styles["menu-item"]} onClick={() => setItemIconState("option1")}>Account</p>
                    </span>

                    <span className={styles["menu-item-container"]}>
                        {itemIconState === "option2" ? (
                            <div className={styles["item-icon"]} style={{ backgroundColor: "var(--HighContrastBlue)" }} />
                        ) : (
                            <div className={styles["item-icon"]} />
                        )}
                        <p className={styles["menu-item"]} onClick={() => setItemIconState("option2")} style={{ marginTop: "2%", marginBottom: "2%" }}>Appearance</p>
                    </span>

                    <span className={styles["menu-item-container"]}>
                        {itemIconState === "option3" ? (
                            <div className={styles["item-icon"]} style={{ backgroundColor: "var(--HighContrastBlue)" }} />
                        ) : (
                            <div className={styles["item-icon"]} />
                        )}
                        <p className={styles["menu-item"]} onClick={() => setItemIconState("option3")}>Public information</p>
                    </span>
                </div>
                <div className={styles["container-main-settings"]}>
                    {renderSettingsContent()}
                </div>                  
            </div>
        </div>
    );
}

export default Profile;