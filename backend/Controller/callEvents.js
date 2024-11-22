import Groq from "groq-sdk";
import dotenv from "dotenv";
import pkg from "pg"


dotenv.config();

const { Pool } = pkg;

// Initialisera Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
console.log("groq---->", groq);

// Konfigurera PostgreSQL

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Funktion för att parsning av eventdata
const parseEventData = (content) => {
    const events = [];
    const lines = content.split("\n").filter((line) => line.trim() !== "");

    lines.forEach((line) => {
        const parts = line.split(" | ");
        if (parts.length === 5) {
            events.push({
                title: parts[0]?.trim(),
                date: parts[1]?.trim(),
                location: parts[2]?.trim(),
                speakers: parts[3]?.trim(),
                url: parts[4]?.trim(),
            });
        } else {
            console.warn("Skipping invalid line:", line);
        }
    });

    return events;
};

// Funktion för att spara events i databasen
const saveEventsToDatabase = async (events) => {
    try {
        for (const event of events) {
            console.log("Saving to database:", event);

            await pool.query(
                `INSERT INTO events (title, date, location, speakers, url) 
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (title, date) DO NOTHING`,
                [event.title, event.date, event.location, event.speakers, event.url]
            );
        }
        console.log("All events saved successfully.");
    } catch (error) {
        console.error("Database error:", error.message || error);
    }
};

// Exporterad funktion som ersätter eventFetcher
export const callEvents = async (req, res) => {
    try {
        const { input, dateStart, dateEnd } = req.body;

        if (!input || !dateStart || !dateEnd) {
            throw new Error("The input, start date, and end date cannot be empty.");
        }

        const yearRange = `from ${dateStart} to ${dateEnd}`;
        const promptContent = `${input} events ${yearRange}. 
        Please include notable events, conferences, or summits in this period include. 
        Provide details in the format: Title | Date | Location | Speakers | Url`;

        console.log("Generated prompt-------->", promptContent);

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: promptContent,
                },
            ],
            model: "llama-3.1-70b-versatile",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        });

        const content = response.choices && response.choices[0]?.message?.content;
        if (!content) {
            console.warn("No content received from Groq, returning default data.");
            return res.status(200).json({
                data: [{ title: "No events found", date: "-", location: "-", speakers: "-", url: "#" }],
            });
        }

        const events = parseEventData(content);
        console.log("Parsed events:", events);

        await saveEventsToDatabase(events);

        res.status(200).json({
            data: events.length > 0 ? events : [{ title: "No events found", date: "-", location: "-", speakers: "-", url: "#" }],
        });        
    } catch (error) {
        console.error("Error:", error.message || error);
        res.status(400).json({ error: "There was an error communicating with the model." });
    }
};
