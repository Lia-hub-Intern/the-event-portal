import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Importerar kalenderkomponenten
import 'react-calendar/dist/Calendar.css'; // Importerar kalenderns stil
import { Box } from '@mui/material'; // Importerar Box-komponenten från MUI

export default function EventCalendar() {
  const [date, setDate] = useState(new Date()); // Skapar en state för att hålla datumet

  const handleDateChange = (newDate) => {
    setDate(newDate); // Uppdaterar datumet när det ändras
    // Här kan du lägga till logik för att visa evenemang på det valda datumet
  };

  return (
    <Box sx={{ margin: 4 }}> {/* Lägger till marginal runt kalendern */}
      <Calendar
        onChange={handleDateChange} // Hanterar datumändring
        value={date} // Sätter det aktuella datumet i kalendern
        // Du kan lägga till fler egenskaper för att anpassa kalendern
      />
    </Box>
  );
}
