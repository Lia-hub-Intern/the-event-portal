import express from "express"
import { callEvents } from "../callEvents.js"


const routes = express.Router()

routes.post('/generate', (req, res) => {
    callEvents(req, res)
})
export default routes