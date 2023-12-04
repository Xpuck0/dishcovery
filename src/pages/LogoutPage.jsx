import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/contexts";
import Path from "../paths.js";
import { logout } from "../services/authAPI";

export default function LogoutPage() {
    const nav = useNavigate();
    const {logoutHandler} = useContext(AuthContext)

    useEffect(() => {
        logout()
            .then(() => {
                logoutHandler();
                nav(Path.Home)
            })
            .catch(() => {
                logoutHandler();
                nav(Path.Home)
            })
        
    }, [])
   
    return <h1>LOGGING OUT</h1>;
}