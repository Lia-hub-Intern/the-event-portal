import Groq from "groq-sdk";
import dotenv from "dotenv"
dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

console.log("groq---->", groq)

export const callEvents = async (req, res) => {
    try {
        const prompt = req.body;
        if (!prompt) {
            throw new Error("Thes prompt cannot be empty");
        }
        console.log("prompt-------->", prompt.input)
        const response = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": prompt.input,
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
