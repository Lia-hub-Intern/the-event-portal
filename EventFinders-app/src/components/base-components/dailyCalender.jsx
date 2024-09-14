import styles from '../../styles/calender.module.css';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { DarkModeContext } from '../../DarkModeContext';

// Event data
const events = [
    {
        eventId: 0,
        eventName: "IMEX America 2024",
        eventDate: "Oct 8, 2024",
        eventLocation: "Las Vegas, USA",
        isPayed: true,
        eventEmail: "info@imexexhibitions.com",
        eventTime: "15:30"
    },
    {
        eventId: 1,
        eventName: "Web Summit 2024",
        eventDate: "Nov 4, 2024",
        eventLocation: "Lisbon, Portugal",
        isPayed: true,
        eventEmail: "info@websummit.com",
        eventTime: "10:30"
    },
    {
        eventId: 2,
        eventName: "Cvent CONNECT 2024",
        eventDate: "Jun 10, 2024",
        eventLocation: "San Antonio, USA",
        isPayed: true,
        eventEmail: "cventconnect@cvent.com",
        eventTime: "11:25"
    },
    {
        eventId: 3,
        eventName: "The Meetings Show 2024",
        eventDate: "Jun 19, 2024",
        eventLocation: "London, England",
        isPayed: false,
        eventEmail: "info@themeetingsshow.com",
        eventTime: "9:45"
    },
    {
        eventId: 4,
        eventName: "Adobe Summit 2024",
        eventDate: "Mar 26, 2024",
        eventLocation: "Las Vegas, USA",
        isPayed: true,
        eventEmail: "summit-support@adobe.com",
        eventTime: "14:20"
    },
    {
        eventId: 5,
        eventName: "Global Fintech Fest 2024",
        eventDate: "Sep 10, 2024",
        eventLocation: "Mumbai, India",
        isPayed: true,
        eventEmail: "info@globalfintechfest.com",
        eventTime: "12:00"
    }
];

function DailyCalender() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { mode } = useContext(DarkModeContext);

    // Get the start of the current week (assuming week starts on Monday)
    const getStartOfWeek = (date) => {
        const startDate = new Date(date);
        const day = startDate.getDay(); // Get current day of the week (0 = Sunday, 6 = Saturday)
        const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get the previous Monday
        startDate.setDate(diff);
        return startDate;
    };

    const startOfWeek = getStartOfWeek(currentDate);

    const handlePreviousWeek = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 7); // Move back one week
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 7); // Move forward one week
            return newDate;
        });
    };

    const getEventForDay = (date) => {
        return events.find(event => {
            const eventDate = new Date(event.eventDate);
            return (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            );
        });
    };

    const renderWeek = () => {
        const days = [];
        const current = new Date(startOfWeek);

        // Loop through all 7 days of the week
        for (let i = 0; i < 7; i++) {
            const event = getEventForDay(current);
            const dayName = current.toLocaleDateString('en-US', { weekday: 'long' });
            const eventName = event ? event.eventName : "No event";
            const eventTime = event ? event.eventTime : "-";
            const borderColor = event ? 'var(--Green)' : 'var(--Red)';

            days.push(
                <div key={i} className={styles["day-container"]}>
                    <h4 className={styles["day-name"]} style={{ borderColor }}>{dayName}</h4>
                    <h4 className={styles["event-name-calender"]}>{eventName}</h4>
                    <h4 className={styles["event-speaker-time"]}>{eventTime}</h4>
                </div>
            );

            // Move to the next day
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    const formatWeekRange = (startDate) => {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Add 6 days to get the end of the week
        return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    };

    return (
        <div className={styles["calender-main-container"]}>
            <div className={styles["calender-title-container"]}>
                <h1 className={`${styles['menu-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>Calendar</h1>
                <div className={`${styles['recency-container']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <div style={{display: "flex"}}>
                        <Link className={`${styles['recency-item']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} to="/events/daily-calender" style={{borderColor: "var(--HighContrastBlue)"}}>Daily</Link>
                        <Link className={`${styles['recency-item']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} to="/events/monthly-calender">Monthly</Link>
                    </div>
                </div>
            </div>
            <div className={styles["calender-navigation"]}>
                <button onClick={handlePreviousWeek} className={`${styles['calender-arrow']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} style={{left: "14.25%"}}><i className="fa-solid fa-arrow-left" style={{fontSize: "1.15rem"}}></i></button>
                <h2 className={`${styles['calender-month-year']} ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>{formatWeekRange(startOfWeek)}</h2>
                <button onClick={handleNextWeek} className={`${styles['calender-arrow']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} style={{right: "14%"}}><i className="fa-solid fa-arrow-right" style={{fontSize: "1.15rem"}}></i></button>
            </div>
            <div className={styles["calender-main-content"]}>
                {renderWeek()}
            </div>
        </div>
    );
}

export default DailyCalender;