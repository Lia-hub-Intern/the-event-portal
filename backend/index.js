import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Make sure to install node-fetch

const app = express();
const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not defined
const API_KEY = process.env.OPEN_AI_KEY; // Ensure this matches your .env file

app.use(cors());
app.use(express.json());

app.post("/generate-events", async (req, res) => {
  const prompt = "Ge förslag på 3 event för public speakers. Lista eventnamn, datum, kontaktinfo (med länk eller mail).";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.json(data.choices[0].message.content); // Send back the generated text to the frontend
    } else {
      res.status(response.status).json({ error: data.error });
    }
  } catch (error) {
    console.error("Error generating events:", error);
    res.status(500).json({ error: "Failed to generate events" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
