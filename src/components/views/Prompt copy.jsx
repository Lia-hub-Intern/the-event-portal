import { useEffect, useState } from "react";
import { Button, Box, TextField, Typography, Grid } from "@mui/material";
import { textToArray } from "../functions/Functions";
import CalendarPicker from "./CalendarPicker";

export default function Prompt() {
  // State to control the value of the input
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);

  const [errorEvent, setErrorEvent] = useState({
    error: false,
    message: "",
  });

  // Function to handle change in input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    console.log("RESULT OK!!!.....", result);
  }, [result]);

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form behavior
    setErrorEvent({
      error: false,
      message: "",
    });
    // Create the request body
    const dataPrompt = {
      input: inputValue,
    };
    console.log("DATA PROMPT.....", JSON.stringify(dataPrompt));
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
            <CalendarPicker />
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
