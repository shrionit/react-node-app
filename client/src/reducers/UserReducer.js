import {createContext} from "react";
export const UserContext = createContext();
export const initialState = null;

export const reducer = (state, action) => {
    if(action.type==='USER'){
        return action.payload;
    }
    if(action.type==='CALS'){
        state.calendars = action.payload;
        return state;
    }
    return state;
}