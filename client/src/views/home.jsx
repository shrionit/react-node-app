import { useEffect, useState } from "react";
import { useContext } from "react";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../reducers/UserReducer";
import utils from "../utils";

function createTR(event){
    let theads = ["created", "summary", "creator", "status"];
    let map = {
        created: function(e){
            return new Date(e).toLocaleString();
        },
        summary: function(e){
            return e;
        },
        creator: function(e){
            return e;
        },
        status: function(e){
            return e;
        }
    }
    return theads.map(h => {
        if(h=="creator"){
            return <td>{map[h](event[h].email)}</td>
        }else{
            return <td>{map[h](event[h])}</td>
        }
    });
}

export default function Home(){
    const {state, dispatch} = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [calendars, setCalendars] = useState([]);
    const navigate = useNavigate();
    let a;
    const logout = () => {
        dispatch({type: "USER", payload: null});
        navigate("/");
    };
    useEffect(()=>{
        if(state==null) navigate("/");
        setTimeout(() => {
            (async ()=>{
                const res = await utils.getMyCalenders(state.access_token);
                console.log("Did It");
                console.log(res.items);
                setCalendars(res.items);
                dispatch({type: "CALS", payload:res.items});
            })();
        }, 1000);
    }, [a]);
    setTimeout(()=>{
        a = 1;
    }, 1000);
    const {search} = useLocation();
    const {calId} = utils.generatePayload(search) || {};
    useEffect(()=>{
        setTimeout(() => {
            (async ()=>{
                let cid;
                state.calendars.forEach(cal => {
                    if(cal.id.includes(calId)){
                        cid = cal.id;
                    }
                })
                if(!!cid && cid !== ''){
                    const res = await utils.getMyEvents(cid, state.access_token);
                    res.items.sort((a, b) => new Date(b.created).getTime()-new Date(a.created).getTime())
                    setEvents(res.items);
                }
            })();
        }, 1000);
    }, [calId]);
    return state && (
        <div className="container-fluid">
            <div className="flex flex-row gap-x-2 p-2 bg-gray-200 shadow-md divide-x-2 divide-slate-700">
                <div className="text-3xl my-auto font-bold h-full text-center">The App</div>
                <div className="flex gap-2 pl-2">
                    <img className="rounded-full" src={state.picture} width={64} height={64} alt="profile_pic" />
                    <div className="flex flex-col p-1 divide-y-2 divide-slate-500">
                        <span className="font-medium">{state.name.split(' ').map(e => e[0].toUpperCase()+e.slice(1)).join(" ")}</span>
                        <span className="text-purple-700">{state.email}</span>
                    </div>
                </div>
                <div className="flex flex-grow justify-end p-2">
                    <button className="px-6 py-1 shadow-md border-2 border-red-400 rounded-lg" onClick={logout}>Logout</button>
                </div>
            </div>
            <div className="container-fluid">
                <div className="grid auto-rows-auto grid-cols-4 gap-2 p-4">
                    <div className="col-span-1 break-words space-y-2">{
                        calendars.length!=0 && calendars.map(cal => {
                            return !cal.id.includes('#') && <NavLink key={cal.id} to={"?calId="+cal.id} className="block text-xs hover:text-sm cursor-pointer p-4 border-gray-200 shadow-lg border-2 bg-gray-100">{cal.id}</NavLink>;
                        })
                    }</div>
                    <div className="col-span-3 break-words space-y-2">
                        <table className="w-full">
                            <tr><th colSpan={4} className="p-1 bg-blue-100 text-2xl font-medium">My Events</th></tr>
                            <tr>
                                <th>Created at</th>
                                <th>Summary</th>
                                <th>Creator</th>
                                <th>Status</th>
                            </tr>
                            {events && events.map(e => {
                                return <tr className="text-sm">{createTR(e)}</tr>
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
