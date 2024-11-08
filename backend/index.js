
import express from "express"
import dotenv from "dotenv"
import routes from "./routes/routes.js"
import cors from "cors"
//import path from 'path';
//import { fileURLToPath } from 'url';


dotenv.config()

const app = express();
//app.use(cors()) // har lagt det rad 13- kommenterat rad 18
const PORT = process.env.PORT


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", " http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

/*const corsOptions = {
    origin: "http://localhost:5173&quot;,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}*/

app.use(express.json());
app.use(routes)
//app.use(cors())
//app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Llama 3 API with Node.js and Express');
});

app.listen(PORT, () =>
    console.log(`The server is running on port:${PORT}`)
)