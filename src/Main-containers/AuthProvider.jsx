import { useState} from "react";
import { AuthContext } from "../contexts/contexts";
import { login, signup } from '../services/authAPI.js';
import { useNavigate } from "react-router-dom";
import Path from "../paths.js";

export default function AuthProvider({
    children
}) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => {
        localStorage.removeItem("accessToken");

        return {};
    })

    const loginSubmitHandler = async (values) => {
        const res = await login(values.email, values.password)
        setAuth(res)

        localStorage.setItem('accessToken', res.accessToken)
        navigate(Path.Home)
    }

    const registerSubmitHandler = async (values) => {
        const res = await signup(values.email, values.password)
        if (!res.code) {
            setAuth(res)
            localStorage.setItem('accessToken', res.accessToken)
            navigate(Path.Home)
        }
    }

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken')
    }

    const authValues = {
        userId: auth._id,
        username: auth.username || auth.email,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
        wallets: auth.wallets,
        logoutHandler,
        loginSubmitHandler: loginSubmitHandler,
        registerSubmitHandler: registerSubmitHandler,
    }

    return (
        <AuthContext.Provider value={authValues} >
            {children}
        </AuthContext.Provider>
    )
}