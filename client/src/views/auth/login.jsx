import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "../../reducers/UserReducer";
import utils from "../../utils";



export default function Login(){
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const {search} = useLocation();
    let payload = null;
    useEffect(()=>{
        payload = utils.generatePayload(search);        
        console.log(payload);
        if(!!payload && payload != null){
            dispatch({type: "USER", payload});
            navigate("/events");
        }
    }, [search]);
    
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-xl w-96 h-96 justify-center flex">
                <div className="grid place-items-center">
                    <div className="space-y-4">
                    <div className="text-2xl font-bold text-center">Login To The App</div>
                    <a href={utils.getGoogleOAuthURL()} className="shadow-md bg-slate-100 font-medium p-4 rounded-xl block hover:bg-slate-200">
                        <i className="fa-brands fa-google mr-2 text-green-600"></i>
                        Sign In With Google
                    </a>
                    </div>
                </div>
            </div>
        </div>
    );
}