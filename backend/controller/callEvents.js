import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

console.log("groq---->", groq)

export const callEvents = async (req, res) => {
    try {
        const { input, dateStart, dateEnd } = req.body;

        if (!input || !dateStart || !dateEnd) {
            throw new Error("The input, start date, and end date cannot be empty.");
        }

        const yearRange = `from ${dateStart} to ${dateEnd}`;
        const promptContent = `${input} events ${yearRange}. Please include notable events, conferences, or summits in this period.`;

        console.log("Generated prompt-------->", promptContent);

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: promptContent,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        });


        const content = response.choices && response.choices[0]?.message?.content;
        console.log("response------->", content || "No content received");

        res.status(200).json({
            data: content || "No events available for the specified timeframe.",
        });

    } catch (error) {
        console.error("Error:", error.message || error);
        res.status(400).json({ error: "There was an error communicating with the model." });
    }
};
