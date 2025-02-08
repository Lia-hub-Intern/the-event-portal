import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Initialize Groq SDK with the API key from environment variables
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Handles API requests to generate responses from the Groq model.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
export const callEvents = async (req, res) => {
    try {
        // Validate input
        const { input } = req.body;
        if (!input || typeof input !== "string") {
            return res.status(400).json({
                error: "Invalid input. 'input' must be a non-empty string.",
            });
        }

        console.log("Received input:", input);

        // Call the Groq API to generate a response
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: input,
                },
            ],
            model: "llama-3.1-70b-versatile", // Replace with the correct model name if needed
            temperature: 1, // Adjust for creativity (1 = more creative, 0 = more deterministic)
            max_tokens: 1024, // Adjust token limit as needed
            top_p: 1,
            stream: false,
            stop: null,
        });

        // Extract and send the response content
        const output = response.choices[0]?.message?.content || "No response generated.";
        console.log("Generated response:", output);

        res.status(200).json({ data: output });
    } catch (error) {
        console.error("Error during API call:", error);

        // Return an appropriate error response
        res.status(500).json({
            error: "An error occurred while processing the request. Please try again later.",
            details: error.message, // Optional: Remove in production for security
        });
    }
};
