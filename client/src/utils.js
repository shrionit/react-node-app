import cred from "./google_cred.json";
const baseURL = "http://localhost:8000";
function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
        redirect_uri: "http://localhost:8000/api/oauth/google",
        client_id: cred.client_id,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"
        ].join(" "),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
};

async function getMyCalenders(access_token){
    const res = await fetch(baseURL+"/api/getcalendars?access_token="+access_token);
    const cals = await res.json();
    return cals;
}

async function getMyEvents(calId, access_token){
    console.log(new URLSearchParams(baseURL+"/api/getevents", {calId, access_token}).toString());
    const res = await fetch(baseURL+"/api/getevents?access_token="+access_token+"&calId="+calId);
    const evnts = await res.json();
    return evnts;
}

function generatePayload(searchParams){
    const res = new URLSearchParams(searchParams);
    let out = null;
    res.forEach((value, key) => {
        if(out===null)out = {};
        out[key] = value;
    });
    return out;
}

export default {
    getGoogleOAuthURL,
    getMyCalenders,
    getMyEvents,
    generatePayload,
}