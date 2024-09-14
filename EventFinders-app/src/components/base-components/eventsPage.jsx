import styles from '../../styles/eventsPage.module.css';
import { eventsList } from '../../listOfEvents.js';
import { useState, useContext } from 'react';
import { DarkModeContext } from '../../DarkModeContext';


const sortEvents = (events) => {
    const now = new Date(); // Get current date
  
    // Parse the event dates and sort based on whether they are before or after the current date
    return events.sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);
  
      // Compare dates
      return dateA >= now && dateB < now ? 1 : dateA < now && dateB >= now ? -1 : 0;
    });
};



function EventsPage() {
    const [recencyState, setRecencyState] = useState(eventsList);
    const sortedEvents = sortEvents(eventsList);


    const pastEvents = sortedEvents.filter(event => new Date(event.eventDate) < new Date());
    const futureEvents = sortedEvents.filter(event => new Date(event.eventDate) >= new Date());
    
    const { mode } = useContext(DarkModeContext); 
    return(
        <div className={styles["event-container"]}>
            <div className={styles["event-container-small-inner"]} style={{height: "25%", width: "72vw"}}>
                <h1 className={`${styles['main-title']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>Events</h1>
                <h4 className={`${styles['sub-main-title']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>Manage your events.</h4>
                <div className={`${styles['recency-container']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <div style={{display: "flex"}}>
                        <p className={`${styles['recency-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} onClick={() => setRecencyState(eventsList)}>All</p>
                        <p className={`${styles['recency-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} onClick={() => setRecencyState(futureEvents)}>Upcomming</p>
                        <p className={`${styles['recency-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} onClick={() => setRecencyState(pastEvents)}>Recent</p>
                    </div>
                </div>
                <div className={styles["speaker-type-container"]}>
                    <div className={styles["speaker-type-item"]}>Technology & Innovation</div>
                    <div className={styles["speaker-type-item"]}>Business & Leadership</div>
                    <div className={styles["speaker-type-item"]}>Healthcare & Biotechnology</div>
                    <div className={styles["speaker-type-item"]}>Marketing & Sales</div>
                    <div className={styles["speaker-type-item"]}>Education & Personal Development</div>
                </div>
            </div>
            <div className="event-manager-container"></div>
            <div className={styles["overhead-column-name"]}>
                <h4 className={styles["column-title"]} style={{width: "35%"}}> Event name</h4>
                <h4 className={styles["column-title"]} style={{width: "15%"}}> Last application</h4>
                <h4 className={styles["column-title"]} style={{width: "15%"}}> Event date</h4>
                <h4 className={styles["column-title"]} style={{width: "15%"}}> Payment</h4>
                <h4 className={styles["column-title"]} style={{width: "20%"}}> Email</h4>
            </div>
            <div className={styles["event-container-small-outer"]}>
                <div className={styles["event-container-small-inner"]}>
                    {recencyState.map((event, index) => (
                        <div key={index} className={styles["event-item-container"]}>
                            <div className={styles["event-item-name-container"]}>
                                <h4 className={styles["event-item-name"]} style={{fontWeight: "600", fontSize: "1.125rem"}}>{event.eventName}</h4>
                            </div>    
                            <div className={styles["event-item-application-due-container"]}>
                                <h4 className={styles["event-item-name"]} style={{textAlign: "center"}}>-</h4>
                            </div>
                            <div className={styles["event-item-event-date-container"]}>
                                <h4 className={styles["event-item-name"]} style={{textAlign: "center"}}>{event.eventDate}</h4>
                            </div>
                            <div className={styles["event-item-paying-container"]}>
                               {event.isPayed ? <div className={styles["event-payment"]} style={{backgroundColor: "var(--Green)"}}>Yes</div>:<div className={styles["event-payment"]} style={{backgroundColor: "var(--Red)"}}>No</div>}
                            </div>
                            <div className={styles["event-item-email-container"]}>
                                <button className={styles["event-email-button"]}>
                                    Contact <i className={`fa-solid fa-envelope ${styles["icon-for-contact"]}`}></i>
                                </button>
                            </div>
                        </div>                        
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EventsPage;