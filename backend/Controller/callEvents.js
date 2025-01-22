import dotenv from "dotenv";
import pool from "../db.js";
import SerpApi from "google-search-results-nodejs";
import dayjs from "dayjs";

dotenv.config();

export const callEvents = async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const { input, dateStart, dateEnd } = req.body;

    const apiKey = process.env.SERPAPI_API_KEY;

    if (!apiKey) {
      throw new Error("SerpApi API key is missing");
    }

    // Construct search parameters
    const params = {
      engine: "google_events",
      q: input || "events",
      hl: "en",
      // Removed location parameter to search globally
    };

    console.log("Search parameters:", params);

    // Initialize SerpApi search
    const search = new SerpApi.GoogleSearch(apiKey);

    // Perform the search
    const searchResults = await new Promise((resolve, reject) => {
      search.json(params, (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data);
        }
      });
    });

    console.log("Search results:", searchResults);

    if (!searchResults.events_results) {
      throw new Error("No events found in search results");
    }

    const events = searchResults.events_results.map((event) => ({
      title: event.title,
      date: dayjs(event.date.start_date).format('YYYY-MM-DD'),
      location: Array.isArray(event.address) ? event.address.join(', ') : event.address || 'Location not specified',
      speakers: event.speakers || 'TBA',
      url: event.link,
      image: event.image || 'https://via.placeholder.com/150',
    }));

    console.log("Processed events:", events);

    // Save events to the database
    for (const event of events) {
      try {
        await pool.query(
          'INSERT INTO events (title, date, location, speakers, url, image) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (title) DO NOTHING',
          [event.title, event.date, event.location, event.speakers, event.url, event.image]
        );
      } catch (dbError) {
        console.error("Error saving event to database:", dbError.message);
      }
    }

    res.status(200).json({ events });

  } catch (error) {
    console.error("Error fetching or processing events:", error.message);
    res.status(500).json({ error: error.message });
  }
};
