import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/contexts";
import { getAllUsers, getUser } from "../services/usersAPI";
import { signup } from "../services/authAPI";
import "./LoginPage.css"
import useForm from "../hooks/useForm";
import Path from "../paths";

const FORM_INITIAL_STATE = {
    email: 'email',
    password: 'password',
    username: 'username',
    profilePicture: 'profilePicture',
    wallets: {
        bitcoin: 'bitcoin',
        monero: 'monero'
    }
}

export default function SignupPage() {
    const { isAuthenticated, registerSubmitHandler } = useContext(AuthContext)
    const { credentials, onChange, onSubmit, setCredentials } = useForm(registerSubmitHandler, {
        [FORM_INITIAL_STATE.email]: '',
        [FORM_INITIAL_STATE.password]: '',
        [FORM_INITIAL_STATE.username]: '',
        [FORM_INITIAL_STATE.profilePicture]: '',
        wallets: {
            [FORM_INITIAL_STATE.wallets.bitcoin]: '',
            [FORM_INITIAL_STATE.wallets.monero]: '',
        }
    })
    const [visible, setVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([])

    const nav = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            nav(Path.Home)
        }
        const getData = async () => {
            setUsers(await getAllUsers())
        }

        getData();
    }, [isAuthenticated])

    const submitHandler = async (e) => {
        e.preventDefault();

        if (credentials.password.length < 4) {
            setErrors(old => ({ ...old, password: "Password should be at least 4 characters long!" }))
            // console.log(errors)
        } else {
            setErrors(old => ({ ...old, password: "" }))
        }

        if (users.some(user => user.email === credentials.email)) {
            setErrors(old => ({ ...old, email: "Email already exists!" }))
            // console.log(errors)
        } else {
            setErrors(old => ({ ...old, email: "" }))
        }

        if (credentials.password.length >= 4 && !users.some(user => user.email === credentials.email)) {
            onSubmit(e);
        }
    }

    const onChangeWallet = (e) => {
        setCredentials(old => ({
            ...old,
            wallets: {
                ...old.wallets,
                [e.target.name]: e.target.value
            }
        }))
    }


    return (
        <div className="login-page-wrapper">
            <div className="login-page">
                <div className="login-form">
                    <form onSubmit={submitHandler}>
                        <p className="title"><Link to='/' className="title-signup">dishcovery</Link></p>
                        <h2>Sign up</h2>

                        <div className="input-wrapper">
                            <label htmlFor="email">* Email</label>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">* Password</label>
                            <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>

                        {/* <p className="error" style={{ display: visible ? 'block' : 'none' }}>Passwords do not match!</p> */}
                        <h3>Additional</h3>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={credentials.username} onChange={onChange} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="profilePicture">Profile picture URL</label>
                            <input type="text" name="profilePicture" value={credentials.profilePicture} onChange={onChange} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="bitcoin">Bitcoin</label>
                            <input type="text" name="bitcoin" value={credentials.wallets.bitcoin} onChange={onChangeWallet} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="monero">Monero</label>
                            <input type="text" name="monero" value={credentials.wallets.monero} onChange={onChangeWallet} />
                        </div>

                        <button className="submit" type="submit">Sign up</button>


                        <p>Already have an account? <Link className="login-href link" to="/login">Log in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}