/**
 * Developer Full Stack: Darwin Rengifo / Alexandra
 *
 * Create Date: 2024-09-10
 *     Program : Speakers.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Displays a list of speakers with filtering options.
 *
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  MenuItem,
} from "@mui/material";
import HeaderSida from "./HeaderSida";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image =
  "https://img.freepik.com/fotos-premium/colegas-negocios-hablando-descanso-evento-educativo-centro-convenciones_146105-87527.jpg?w=996";

export default function Events({ title }) {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [titleEvents, setTitleEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend API
    axios.get('http://localhost:7000/api/events')
      .then(response => {
        const fetchedEvents = response.data.events;
        setAllEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);

        // Extract unique titles for the Autocomplete
        const uniqueTitles = [
          ...new Set(fetchedEvents.map(event => event.title.trim()))
        ].map(title => ({ title }));
        setTitleEvents(uniqueTitles);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const filterEvents = (event, newValue) => {
    if (newValue.length > 0) {
      const selectedTitles = newValue.map((value) => value.title.trim().toLowerCase());
      const filtered = allEvents.filter((eventItem) => {
        const eventTitle = eventItem.title.trim().toLowerCase();
        return selectedTitles.includes(eventTitle);
      });
      setFilteredEvents(filtered);
    } else {
      // No filter applied, show all events
      setFilteredEvents(allEvents);
    }
  };

  return (
    <>
      <HeaderSida headerTitle={"Upcoming events"} headerImage={Image} />
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        <Grid
          container
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "20rem", sm: "auto" },
              marginBottom: "1rem ",
            }}
          >
            <Typography
              variant="h4"
              sx={{ marginBottom: "1rem", textAlign: "center" }}
            >
              {title} {/** Title sida */}
              <Typography />
            </Typography>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={titleEvents}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              onChange={filterEvents} // Call the filterEvents function when the selection changes
              renderOption={(props, option, { selected }) => {
                /** Renders the checkbox and the title of each option */
                const { key, ...optionProps } = props;

                return (
                  <MenuItem key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your favorite event"
                  placeholder="Favorites"
                />
              )}
            />
          </Box>
        </Grid>

        <Grid
          container
          spacing={10}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea href={event.url} target="_blank">
                  <CardContent>
                    <Typography variant="h5">{event.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {event.date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {event.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {event.speakers}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
