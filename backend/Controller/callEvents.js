import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

console.log("groq---->", groq)

export const callEvents = async (req, res) => {
    try {
        const { input, dateStart, dateEnd } = req.body;

        // Build the date range string
        let dateRange = '';
        if (dateStart && dateEnd) {
            dateRange = `between ${dateStart} and ${dateEnd}`;
        } else if (dateStart) {
            dateRange = `after ${dateStart}`;
        } else if (dateEnd) {
            dateRange = `before ${dateEnd}`;
        }

        // Update the prompt to request only real events with valid links
        const prompt = `
Please provide a list of 3 to 5 **real, upcoming ${input} events ${dateRange ? dateRange : ''}**. For each event, include the following information in the specified format:

**[Event Title]**
Date: [Event Date in YYYY-MM-DD format]
Location: [Event Location]
Type: [Event Type]
Description: [Brief description of the event]
Link: [Valid URL of the event's official website starting with http:// or https://]

Important:
- Only include events that **occur ${dateRange}**.
- All dates must be in **YYYY-MM-DD** format.
- Only include events that have an official website with a valid link.
- Exclude any events without a valid link.
- Ensure all links are accurate and lead directly to the official event pages.
- Do not include any events outside of the specified date range.
`;
        if (!prompt) {
            throw new Error("Thes prompt cannot be empty");
        }
        console.log("prompt-------->", prompt)
        const response = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            "model": "llama-3.1-70b-versatile",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false,
            "stop": null
        });

        console.log("response------->", response.choices[0]?.message?.content || "");
        res.status(200).json({
            data: response.choices[0]?.message?.content || ""
        })

    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "There was an error communicating with the modelen" });
    }
}