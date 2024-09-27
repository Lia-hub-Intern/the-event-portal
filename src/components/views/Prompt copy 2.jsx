import { useEffect, useState } from "react";
import { Button, Box, TextField, Typography, Grid } from "@mui/material";
import { textToArray } from "../functions/Functions";
import { DatePicker } from "@mui/x-date-pickers";
//import CalendarPicker from "./CalendarPicker";

export default function Prompt() {
  // State to control the value of the input
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const [cleared, setCleared] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const [errorEvent, setErrorEvent] = useState({
    error: false,
    message: "",
  });
  const [errorDateStart, setErrorDateStart] = useState({
    error: false,
    message: "",
  });
  const [errorDateEnd, setErrorDateEnd] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    if (errorDateStart.error) {
      console.log("El estado de errorDateStart ha cambiado:", errorDateStart);
    }
    if (errorDateEnd.error) {
      console.log("El estado de errorDateEnd ha cambiado:", errorDateEnd);
    }
    console.log("RESULT OK!!!.....", result);
    return () => {};
  }, [result, cleared, errorDateStart, errorDateEnd]);

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form behavior
    setResult([]); // Clear the result array
    setErrorEvent({
      error: false,
      message: "",
    });
    setErrorDateStart({
      error: false,
      message: "",
    });
    setErrorDateEnd({
      error: false,
      message: "",
    });

    /*if (dateStart == null || dateStart === "" || isNaN(new Date(dateStart))) {
      setErrorDateStart({
        error: true,
        message: "Please select a start date.",
      });
      console.log(
        "fecha incio: ",
        errorDateStart.error,
        errorDateStart.message
      );
    }

    if (dateEnd === null || dateEnd === "" || isNaN(new Date(dateStart))) {
      setErrorDateEnd({
        error: true,
        message: "Please select an end date.",
      });
      console.log("fecha fin: ", errorDateEnd.error, errorDateEnd.message);
    }*/

    // Create the request body
    const dataPrompt = {
      input: inputValue,
    };
    // Make the API request
    if (dateStart !== null && dateEnd !== null) {
      try {
        const response = await fetch("http://localhost:7000/generate", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataPrompt),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log("RESPONSE DATA.....", responseData);
          //const events = await parsearDataEvents(responseData.data);
          const events = await textToArray(responseData.data);
          console.log("EVENTS.....", events);
          setResult((prevItems) => [...prevItems, responseData]);
        } else {
          const errorResponse = await response.json();
          setErrorEvent({
            error: true,
            message: errorResponse.error,
          });
          return;
        }
      } catch (error) {
        console.log("Error.....", error);
      }
    } else if (
      dateStart == null ||
      dateStart === "" ||
      isNaN(new Date(dateStart))
    ) {
      setErrorDateStart({
        error: true,
        message: "Please select a start date.",
      });
    } else if (dateEnd === null || dateEnd === "" || isNaN(new Date(dateEnd))) {
      setErrorDateEnd({
        error: true,
        message: "Please select an end date.",
      });
    } else {
    }

    // Clear the form field
    console.log("RESULT.....", result);
    setInputValue("");
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        sx={{
          display: { xs: "block", sm: "flex" },
          marginLeft: -1,
          flexDirection: "row",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <Grid container>
          <Grid sx={{ display: "column" }}>
            <TextField
              label="Find Event"
              variant="outlined"
              id="names"
              type="text"
              size="small"
              error={errorEvent.error}
              helperText={errorEvent.message}
              sx={{
                "& .css-k4qjio-MuiFormHelperText-root": {
                  width: "14rem",
                },
              }}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              required
            />

            {/*<CalendarPicker />*/}

            <Box sx={{ width: 350 }}>
              <Grid
                sx={{
                  flexDirection: "row",
                }}
              >
                <DatePicker
                  views={["month", "year"]}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 40,
                      marginBottom: 10,
                    },
                  }}
                  slotProps={{
                    field: { clearable: true, onClear: () => setCleared(true) },
                  }}
                  onChange={(newValue) => {
                    // Update the status value with the selected date
                    setDateStart(newValue);
                    console.log("newValue--------", newValue.toString());
                  }}
                  value={dateStart}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type="text"
                      error={errorDateStart.error}
                      helperText={errorDateStart.message}
                    />
                  )}
                />
                <DatePicker
                  views={["year", "month", "day"]}
                  sx={{ "& .MuiInputBase-root": { height: 40, width: 190 } }}
                  slotProps={{
                    field: { clearable: true, onClear: () => setCleared(true) },
                  }}
                  onChange={(newValue) => {
                    // Update the status value with the selected date
                    setDateEnd(newValue);
                  }}
                  value={dateEnd}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type="text"
                      error={errorDateEnd.error}
                      helperText={errorDateEnd.message}
                    />
                  )}
                />
                {console.log(
                  "errorDateStart.error",
                  errorDateStart.error + "errorDateStart.message...",
                  errorDateStart.message +
                    "errorDateEnd.message..." +
                    errorDateEnd.message +
                    "dateStart..." +
                    dateStart
                )}
              </Grid>
            </Box>

            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{
                width: "7rem",
                height: "2rem",
                marginTop: "0.7rem",
                marginLeft: "0.5rem",
              }}
            >
              Generate
            </Button>
            <Box
              sx={{ display: { xs: "block", sm: "flex" }, marginLeft: "1rem" }}
            >
              {result.map((textEvent, index) => (
                <Box key={textEvent.data}>
                  <Typography
                    component="p"
                    sx={{ fontSize: 12, fontWeight: 300 }}
                  >
                    {textEvent.data}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
