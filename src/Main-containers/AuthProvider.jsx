import usePersistedState from "../hooks/usePersistedState.js";
import { AuthContext } from "../contexts/contexts";
import { login, signup } from '../services/authAPI.js';
import { useNavigate } from "react-router-dom";
import Path from "../paths.js";

export default function AuthProvider({
    children
}) {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {})

    const loginSubmitHandler = async (values) => {
        const res = await login(values.email, values.password)
        if (!res.ok && !res._id) {

            return res;
        }
        setAuth(res)

        localStorage.setItem('accessToken', res.accessToken)
        navigate(Path.Home)
    }

    const registerSubmitHandler = async (values) => {
        console.log(values)
        const res = await signup({...values})
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
        profilePicture: auth.profilePicture,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
        wallets: auth.wallets,
        logoutHandler: logoutHandler || 0,
        loginSubmitHandler: loginSubmitHandler || 0,
        registerSubmitHandler: registerSubmitHandler || 0,
    }

    return (
        <AuthContext.Provider value={authValues} >
            {children}
        </AuthContext.Provider>
    )
}