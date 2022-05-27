import axios from "axios";
import { bearer } from "../utils.js";

export async function getMyCalendars(access_token){
    const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList`;
    try {
        const res = await axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("unable to fetch user calendars from given token");
        console.log(error.response.data.error);
        throw new Error(error.message);
    }
}

export async function getMyEvents(calendarId, access_token){
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
    // const url = `https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
    try {
        const res = await axios.get(
            url,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("unable to fetch user calendar events from given token");
        console.log(error.response.data.error);
        throw new Error(error.message);
    }

}

export async function getGoogleUser(id_token, access_token){
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
    try {
        const res = await axios.get(
            url,
            
        );
        return res.data;
    } catch (error) {
        console.log("unable to fetch user from given token");
        console.log(error.response.data.error);
        throw new Error(error.message);
    }
}

export async function getGoogleOAuthToken(code){
    const url = "https://oauth2.googleapis.com/token";
    const options = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: "authorization_code"
    };
    const qs = new URLSearchParams(options);
    try {
        const res = await axios.post(url, qs.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        return res.data;
    } catch (error) {
        console.log("Failed to fetch google oauth tokens");
        throw new Error(error.message);
    }
}