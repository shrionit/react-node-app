import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { googleOAuthHandler, getCalendars, getEvents } from "./controllers/controller.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' , credentials :  false}));
app.get("/api/oauth/google", googleOAuthHandler);
app.get("/api/getcalendars", getCalendars);
app.get("/api/getevents", getEvents);

app.listen(PORT, () => {
    console.log(`Server is listening @ ${PORT}`);
});