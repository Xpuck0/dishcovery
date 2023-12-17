import { useContext } from "react";
import { AuthContext } from "../contexts/contexts";
import { Navigate, Outlet } from "react-router-dom";
import Path from "../paths";

export default function GuestAuthGuard () {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={Path.Login} />
    }

    return (
        <Outlet />
    )
}