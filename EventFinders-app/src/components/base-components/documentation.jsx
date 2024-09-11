import styles from '../../styles/documentation.module.css';
import { useContext } from 'react';
import { DarkModeContext } from '../../DarkModeContext'; 


function Docmuentation() {
    const { mode } = useContext(DarkModeContext);
    return(
        <div className={styles["documentation-main-container"]}>
            <div className={styles['documentation-menu-container']}>
                <div className={`${styles['list-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <span className={styles["icon-container"]}>
                        <i className="fa-regular fa-file-lines"></i>
                    </span>
                    <h4 className={`${styles['menu-text']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        Getting started
                    </h4>
                    <span className={`${styles['icon-container-two']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
                <div className={`${styles['list-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <span className={styles["icon-container"]}>
                        <i className="fa-regular fa-file-lines"></i>
                    </span>
                    <h4 className={`${styles['menu-text']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        FAQs
                    </h4>
                    <span className={`${styles['icon-container-two']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
                <div className={`${styles['list-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <span className={styles["icon-container"]}>
                        <i className="fa-regular fa-file-lines"></i>
                    </span>
                    <h4 className={`${styles['menu-text']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        Release notes
                    </h4>
                    <span className={`${styles['icon-container-two']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
                <div className={`${styles['list-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <span className={styles["icon-container"]}>
                        <i className="fa-regular fa-file-lines"></i>
                    </span>
                    <h4 className={`${styles['menu-text']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        Tutorials
                    </h4>
                    <span className={`${styles['icon-container-two']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
                <div className={`${styles['list-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <span className={styles["icon-container"]}>
                        <i className="fa-regular fa-file-lines"></i>
                    </span>
                    <h4 className={`${styles['menu-text']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        Terms of service
                    </h4>
                    <span className={`${styles['icon-container-two']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
            </div>
            <div className={styles['documentation-content-container']}>

            </div>
        </div>
    )
}

export default Docmuentation;