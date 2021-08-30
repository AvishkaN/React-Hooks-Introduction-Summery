import React, { useState } from 'react'

export const AuthContext=React.createContext({
    isAuth:false,
    login:()=>{}
});


const AuthConetextProvider=props=>{

    const[isAuthinticated,setAuth]=useState(false);

    const loginHandler=()=>{
        setAuth(true);
    };

    return (
        <AuthContext.Provider value={{login:loginHandler,isAuth:isAuthinticated}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthConetextProvider;


