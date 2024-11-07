/**
 * Developer Full Stack: Peter Molén, Darwin Rengifo, Erik berglund
 *
 * Create Date: 2024-11-05
 *     Program : callEvents.js
 *   Path Name : the-event-portal/backend/Controller/callEvents.js
 *       Tools : NodeJS, React, compromisejs, groq-sdk, dotenv, express, cors.
 *
 * Description:
 * - a prompt ai model, to generate events. 
 * The prompt is sent to the Groq API, which returns a response. 
 * The response is then sent back to the client. 
 * The prompt is checked to see if it contains any keywords related to events.
 *  If it does, the prompt is modified to include specific instructions for returning event information in a specific format.
 *  The response is then parsed using the compromisejs library to extract the event information. 
 * The event information is then sent back to the client. 
 * If the prompt does not contain any keywords related to events,
 *  the prompt is sent to the Groq API as is.
 *  The response is then sent back to the client. 
 * The response is then parsed using the compromisejs library 
 * to extract the information. The information is then sent back to the client.
 *
 */


import Groq from "groq-sdk";
import dotenv from "dotenv";
import nlp from 'compromise'; 
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

console.log("groq---->", groq);

export const callEvents = async (req, res) => {
    try {
        let prompt = req.body;
        if (!prompt || !prompt.input) {
            throw new Error("Prompten kan inte vara tom");
        }

        // Kontrollera om prompten handlar om att få events
        const eventKeywords = ["event", "evenemang", "konferens", "AI-event", "kommande"];
        const isEventRequest = eventKeywords.some(keyword => prompt.input.toLowerCase().includes(keyword));

        // Om prompten handlar om events, lägg till specifika instruktioner
        if (isEventRequest) {
            prompt.input += "\nReturnera eventinformationen i följande format:\n"
                + "Titel: **[Eventnamn]**\n"
                + "Datum: [Datum]\n"
                + "Plats: [Plats]\n"
                + "Beskrivning: [Kort beskrivning av eventet]\n"
                + "Url: [En-URL som hämtas från källsidan]\n"
                + "Url: [Sök i nutid]"
        }

        console.log("Prompt-------->", prompt.input);

        // Anropa modellen
        const response = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": prompt.input,
                },
            ],
            "model": "llama-3.1-70b-versatile",
            "temperature": 1,
            "max_tokens": 2000,
            "top_p": 1,
            "stream": false,
            "stop": null,
        });

        const rawData = response.choices[0]?.message?.content || "";
        console.log("Response------->", rawData);

        // Använd compromise för att extrahera events från texten om det är en eventförfrågan
        const parsedEvents = isEventRequest ? extractEventsFromText(rawData) : [];

        res.status(200).json({
            text: rawData.split("\n")[0], // Första meningen visas i textrutan
            events: parsedEvents,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Ett fel inträffade vid kommunikation med modellen" });
    }
};


// Funktion för att extrahera event från text med compromise
function extractEventsFromText(text) {
    console.log("Extracting events using compromise...");
    const doc = nlp(text);
    const sentences = doc.sentences().out('array');
    const events = [];
    let currentEvent = {};

    sentences.forEach(sentence => {
        if (sentence.includes('**')) {
            // Identifiera titeln om den finns inom '**'
            if (currentEvent.title) {
                events.push(currentEvent);
            }
            currentEvent = {
                title: sentence.match(/\*\*(.*?)\*\*/)[1].trim(),
                date: '',
                location: '',
                description: ''
            };
        } else if (sentence.includes('Datum:')) {
            currentEvent.date = sentence.replace('Datum:', '').trim();
        } else if (sentence.includes('Plats:')) {
            currentEvent.location = sentence.replace('Plats:', '').trim();
        } else if (sentence.trim() && currentEvent.title) {
            currentEvent.description += sentence.trim() + ' ';
        }
    });

    // Lägg till sista eventet om det finns
    if (currentEvent.title) {
        events.push(currentEvent);
    }

    console.log("Extracted events:", events);
    return events;
}