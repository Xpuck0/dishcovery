import { Link, Routes, Route, json } from "react-router-dom";
import { useState, useEffect, useContext } from "react"

import { AuthContext } from "../contexts/contexts";
import { getAllUsers, getUser, getUserByCollectionId } from "../services/usersAPI";
import useForm from "../hooks/useForm";
import "./LoginPage.css"

const FORM_INITIAL_STATE = {
    email: '',
    password: '',
}

export default function LoginPage() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { credentials, onChange, onSubmit } = useForm(loginSubmitHandler, FORM_INITIAL_STATE)
    const [jsonstoreUser, setJsonstoreUser] = useState({});
    const [clicked, setClicked] = useState(false)
    const [err, setErr] = useState();
    const [inputType, setInputType] = useState('password');
    const [event, setEvent] = useState({});


    const submitHandler = async (e) => {
        e.preventDefault();


        if (credentials.email.length < 1) {
            setErr('Email cannot be empty string!')
        } else {
            const userWithEmail = await getAllUsers().then(data => data.find(a => a.email == credentials.email))
            if (!userWithEmail) {
                setErr("Email doesn't exist!");
            } else {
                if (credentials.password == userWithEmail.password) {
                    onSubmit(e);
                    setErr('');
                } else {
                    setErr('Invalid password!')
                }
            }
        }

    }

    return (
        <div className="login-page-wrapper">
            <div className="login-page">
                <div className="login-form">
                <p className="title"><Link to='/' className="title-link">dishcovery</Link></p>
                    <form onSubmit={submitHandler}>
                        <h2>Log in</h2>

                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type={inputType} name="password" id="password" value={credentials.password} onChange={onChange} />
                            <p className="toggle-password" onClick={() => setInputType(old => old == "password" ? "text" : "password")}>👁</p>
                            {err && <p className="error">* {err}</p>}
                        </div>

                        <button className="submit" type="submit">Log in</button>

                        <div className="inline">

                            <div className="remember-me-wrapper">

                                <input type="checkbox" name="remember-me" id="remember-me" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <Link to="/forgotten-password" className="link">Forgot password?</Link>
                        </div>

                        <p>Don't have an account? <Link className="signup-href link" to="/signup">Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}