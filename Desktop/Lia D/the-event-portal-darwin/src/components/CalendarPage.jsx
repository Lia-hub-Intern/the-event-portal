/* This component has been fully created by the full-stack developer : Nurhussein Ahmed, and it addresses the calendar with sorting of upcoming and current events  */

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css'; // här är importera av css file
import Papa from 'papaparse';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'name'

  useEffect(() => {
    // Läsa en CSV-fil och ladda upp evenemang
    fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Database%20-%20Sheet1%20(1)-3O7NUUbUoBdw8NGlfOIb6256l7gi8a.csv')
      .then(response => response.text())
      .then(csvString => {
        Papa.parse(csvString, {
          header: true,
          complete: (results) => {
            const parsedEvents = results.data.map(row => ({
              start: new Date(row.Date),
              end: new Date(row.Date),
              title: row['Event name'],
              location: row.Location,
              category: row.Category,
              url: row.URL
            }));
            setEvents(parsedEvents);
          }
        });
      });
  }, []);

  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === 'date') {
      return a.start - b.start;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="calendar-container">
      <h2>Event Calendar</h2>
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={sortedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: '100%' }}
        />
      </div>
      <div className="events">
        <h3>Upcoming Events:</h3>
        <select onChange={handleSortChange} value={sortBy}>
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
        <ul>
          {sortedEvents.map((event, index) => (
            <li key={index}>
              <strong>{moment(event.start).format('YYYY-MM-DD')}</strong>: {event.title}
              <br />
              Location: {event.location}
              <br />
              Category: {event.category}
              <br />
              <a href={event.url} target="_blank" rel="noopener noreferrer">Event Link</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarPage;