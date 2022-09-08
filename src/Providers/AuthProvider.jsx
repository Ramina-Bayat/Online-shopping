import react from "react";
import { useLayoutEffect } from "react";
import { useEffect,useRef } from "react";
import { useContext } from "react";
import { useState } from "react";

export const AuthProviderContext=react.createContext();
export const AuthProviderContextDispatcher=react.createContext();
const Local_Storage_Auth_key="authState"
const AuthProvider=({children})=>{
    const[state,setState]=useState(false);
  
    useEffect(()=>{
     console.log("local",localStorage.getItem(Local_Storage_Auth_key))  
    const userData=JSON.parse(localStorage.getItem(Local_Storage_Auth_key)) || false;
   
    setState(userData);
    },[]);

    const firstUpdate = useRef(true);
    useEffect(()=>{
       
       if(!firstUpdate.current){
        const data=JSON.stringify(state);
       localStorage.setItem(Local_Storage_Auth_key,data) ;
    }
       firstUpdate.current = false; 
    },[state]);

    return(
        <AuthProviderContext.Provider value={state}>
            <AuthProviderContextDispatcher.Provider value={setState}>
                {children}
            </AuthProviderContextDispatcher.Provider>
        </AuthProviderContext.Provider>
    )
}
export default AuthProvider;
export const useAuth=()=>useContext(AuthProviderContext);
export const useAuthActions=()=>useContext(AuthProviderContextDispatcher);

//this state is going to be changed
// in login page and signup page...
//so we provide it with context to be accessible via different pages  
