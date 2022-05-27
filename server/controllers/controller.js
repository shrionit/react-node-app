import { getGoogleOAuthToken, getGoogleUser, getMyCalendars, getMyEvents } from "../services/userservice.js";

export async function googleOAuthHandler(req, res){
    //get the code from qs
    const code = req.query.code;
    //get the id and access token from the code
    const {id_token, access_token} = await getGoogleOAuthToken(code);
    //get the user with token
    const user = await getGoogleUser(id_token, access_token);
    const qs = new URLSearchParams({
        ...user,
        id_token,
        access_token
    });
    res.redirect(process.env.CLIENT_URL+"?"+qs);
}

export async function getCalendars(req, res){
    res.setHeader('Content-Type', 'application/json');
    const cals = await getMyCalendars(req.query.access_token)
    res.send(cals);
}

export async function getEvents(req, res){
    let out = {}
    res.setHeader('Content-Type', 'application/json');
    if(req.query.calId && req.query.access_token){
        const events = await getMyEvents(req.query.calId, req.query.access_token);
        out = events;
    }
    console.log(out);
    res.json(out);
}