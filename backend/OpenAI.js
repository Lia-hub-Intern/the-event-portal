import { OpenAI } from "openai";
import dotenv from "dotenv";
import nlp from 'compromise';
dotenv.config();

// Konfigurera OpenAI-klienten
const openAICLient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system",
          content: "You are a helpful assistant."
        },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});



// import { Configuration, OpenAIApi } from "openai";
// import dotenv from "dotenv";
// import nlp from 'compromise';
// dotenv.config();

// // Konfigurera OpenAI-klienten
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// console.log("OpenAI klient initierad");

// export const callEvents = async (req, res) => {
//     try {
//         let prompt = req.body;
//         if (!prompt || !prompt.input) {
//             throw new Error("Prompten kan inte vara tom");
//         }

//         // Kontrollera om prompten handlar om att få events
//         const eventKeywords = ["event", "evenemang", "konferens", "AI-event", "kommande"];
//         const isEventRequest = eventKeywords.some(keyword => prompt.input.toLowerCase().includes(keyword));

//         // Om prompten handlar om events, lägg till specifika instruktioner
//         if (isEventRequest) {
//             prompt.input += "\nReturnera eventinformationen i följande format och se till att svaret innehåller minst 600 ord:\n"
//                 + "Titel: **[Eventnamn]**\n"
//                 + "Datum: [Datum]\n"
//                 + "Plats: [Plats]\n"
//                 + "Beskrivning: [Kort beskrivning av eventet]";
//         }

//         console.log("Prompt-------->", prompt.input);

//         // Anropa ChatGPT-modellen
//         const response = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo", // eller "gpt-4" om du har tillgång till GPT-4
//             messages: [
//                 {
//                     role: "user",
//                     content: prompt.input,
//                 },
//             ],
//             max_tokens: 200,
//             temperature: 1,
//         });

//         const rawData = response.data.choices[0]?.message?.content || "";
//         console.log("Response------->", rawData);

//         // Använd compromise för att extrahera events från texten om det är en eventförfrågan
//         const parsedEvents = isEventRequest ? extractEventsFromText(rawData) : [];

//         res.status(200).json({
//             text: rawData.split("\n")[0], // Första meningen visas i textrutan
//             events: parsedEvents,
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(400).json({ error: "Ett fel inträffade vid kommunikation med modellen" });
//     }
// };

// // Funktion för att extrahera event från text med compromise
// function extractEventsFromText(text) {
//     console.log("Extracting events using compromise...");
//     const doc = nlp(text);
//     const sentences = doc.sentences().out('array');
//     const events = [];
//     let currentEvent = {};

//     sentences.forEach(sentence => {
//         if (sentence.includes('**')) {
//             // Identifiera titeln om den finns inom '**'
//             if (currentEvent.title) {
//                 events.push(currentEvent);
//             }
//             currentEvent = {
//                 title: sentence.match(/\*\*(.*?)\*\*/)[1].trim(),
//                 date: '',
//                 location: '',
//                 description: ''
//             };
//         } else if (sentence.includes('Datum:')) {
//             currentEvent.date = sentence.replace('Datum:', '').trim();
//         } else if (sentence.includes('Plats:')) {
//             currentEvent.location = sentence.replace('Plats:', '').trim();
//         } else if (sentence.trim() && currentEvent.title) {
//             currentEvent.description += sentence.trim() + ' ';
//         }
//     });

//     // Lägg till sista eventet om det finns
//     if (currentEvent.title) {
//         events.push(currentEvent);
//     }

//     console.log("Extracted events:", events);
//     return events;
// }
