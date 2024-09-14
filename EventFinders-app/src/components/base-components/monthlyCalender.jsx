import styles from '../../styles/calender.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { DarkModeContext } from '../../DarkModeContext';

const events = [
    {
        eventId: 0,
        eventName: "IMEX America 2024",
        eventDate: "Oct 8, 2024",
        eventLocation: "Las Vegas, USA",
        isPayed: true,
        eventEmail: "info@imexexhibitions.com"
    },
    {
        eventId: 1,
        eventName: "Web Summit 2024",
        eventDate: "Nov 4, 2024",
        eventLocation: "Lisbon, Portugal",
        isPayed: true,
        eventEmail: "info@websummit.com"
    },
    {
        eventId: 2,
        eventName: "Cvent CONNECT 2024",
        eventDate: "Jun 10, 2024",
        eventLocation: "San Antonio, USA",
        isPayed: true,
        eventEmail: "cventconnect@cvent.com"
    },
    {
        eventId: 3,
        eventName: "The Meetings Show 2024",
        eventDate: "Jun 19, 2024",
        eventLocation: "London, England",
        isPayed: false,
        eventEmail: "info@themeetingsshow.com"
    },
    {
        eventId: 4,
        eventName: "Adobe Summit 2024",
        eventDate: "Mar 26, 2024",
        eventLocation: "Las Vegas, USA",
        isPayed: true,
        eventEmail: "summit-support@adobe.com"
    },
    {
        eventId: 5,
        eventName: "Global Fintech Fest 2024",
        eventDate: "Sep 10, 2024",
        eventLocation: "Mumbai, India",
        isPayed: true,
        eventEmail: "info@globalfintechfest.com"
    }
]

function MonthlyCalender() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { mode } = useContext(DarkModeContext); 

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1); // Move back one month
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1); // Move forward one month
            return newDate;
        });
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);

        const dayPairsArray = [];

        for (let day = 1; day <= daysInMonth; day += 2) {
            const day1Event = events.find(event => {
                const eventDate = new Date(event.eventDate);
                return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day;
            });

            const day2Event = (day + 1 <= daysInMonth) ? events.find(event => {
                const eventDate = new Date(event.eventDate);
                return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day + 1;
            }) : null;

            dayPairsArray.push(
                <div key={day} className={styles["monthly-calender-small-container"]}>
                    <div className={styles["monthly-calender-day-container"]}>
                        <h4 
                            className={styles["monthly-calender-day"]} 
                            style={{
                                borderColor: day1Event ? 'var(--Green)' : 'var(--Red)',
                            }}
                        >
                            {day}
                        </h4>
                        <h4 className={styles["monthly-calender-event"]}>
                            {day1Event ? day1Event.eventName : "No event"}
                        </h4>
                        <h4 className={styles["monthly-calender-time"]}>
                            {day1Event ? day1Event.eventTime : "-"}
                        </h4>
                    </div>
                    {day + 1 <= daysInMonth && (
                        <div className={styles["monthly-calender-day-container"]}>
                            <h4 
                                className={styles["monthly-calender-day"]} 
                                style={{
                                    borderColor: day2Event ? 'var(--Green)' : 'var(--Red)',
                                }}
                            >
                                {day + 1}
                            </h4>
                            <h4 className={styles["monthly-calender-event"]}>
                                {day2Event ? day2Event.eventName : "No event"}
                            </h4>
                            <h4 className={styles["monthly-calender-time"]}>
                                {day2Event ? day2Event.eventTime : "-"}
                            </h4>
                        </div>
                    )}
                </div>
            );
        }

        return dayPairsArray;
    };

    const formatMonthYear = (date) => {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    return (
        <div className={styles["calender-main-container"]}>
            <div className={styles["calender-title-container"]} >
                <h1 className={`${styles['main-title']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>Calendar</h1>
                <div className={`${styles['recency-container']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>
                    <div style={{display: "flex"}}>
                        <Link className={`${styles['recency-item']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} to="/events/daily-calender">Daily</Link>
                        <Link className={`${styles['recency-item']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} to="/events/monthly-calender" style={{borderColor: "var(--HighContrastBlue)"}}>Monthly</Link>
                    </div>
                </div>
            </div>
            <div className={styles["calender-navigation"]}>
                <button onClick={handlePreviousMonth} className={`${styles['calender-arrow']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} style={{left: "14.25%"}}><i className="fa-solid fa-arrow-left" style={{fontSize: "1.15rem"}}></i></button>
                <h2 className={`${styles['calender-month-year']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`}>{formatMonthYear(currentDate)}</h2>
                <button onClick={handleNextMonth} className={`${styles['calender-arrow']}  ${mode === 'dark' ? styles['dark-mode'] : mode === 'gray' ? styles['gray-mode'] : ''}`} style={{right: "14%"}}><i className="fa-solid fa-arrow-right" style={{fontSize: "1.15rem"}}></i></button>
            </div>
            <div className={styles["calender-main-content"]}>
                {renderDays()}
            </div>
        </div>
    );
}

export default MonthlyCalender;