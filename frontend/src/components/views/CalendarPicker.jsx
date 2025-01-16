import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Grid } from "@mui/material";

export default function CalendarPicker() {
  const [cleared, setCleared] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <>
      <Box sx={{ width: 350 }}>
        <Grid
          sx={{
            flexDirection: "row",
          }}
        >
          <DatePicker
            views={["year", "month", "day"]}
            sx={{ "& .MuiInputBase-root": { height: 40, width: 190 } }}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
            value={dateStart}
            onChange={(newValue) => {
              // Update the status value with the selected date
              setDateStart(newValue);
            }}
          />
          <DatePicker
            views={["year", "month", "day"]}
            sx={{ "& .MuiInputBase-root": { height: 40, width: 190 } }}
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
            value={dateEnd}
            onChange={(newValue) => {
              // Update the status value with the selected date
              setDateEnd(newValue);
            }}
          />
        </Grid>
      </Box>
    </>
  );
}
