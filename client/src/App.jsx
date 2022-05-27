import * as React from 'react';
import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext, initialState, reducer } from './reducers/UserReducer';
import Login from './views/auth/login';
import Home from './views/home';


function Routing(){
	return (
		<Routes path="/">
			<Route path="*" element = {<Login/>} />
			<Route path='/events' element = {<Home/>} />
		</Routes>
	);
}

export default function App() {	
	const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <React.Fragment>
		<UserContext.Provider value={{state, dispatch}}>
			<Routing/>
		</UserContext.Provider>
    </React.Fragment>
  );
}
