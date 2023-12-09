import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react"

import { AuthContext } from "../contexts/contexts";
import { getUser } from "../services/usersAPI";
import useForm from "../hooks/useForm";
import "./LoginPage.css"

const FORM_INITIAL_STATE = {
    email: '',
    password: '',
}

export default function LoginPage() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { credentials, onChange, onSubmit } = useForm(loginSubmitHandler, FORM_INITIAL_STATE)
    const [err, setErr] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await loginSubmitHandler(credentials.email, credentials.password)

        if (credentials.email.length < 1) {
            setErr('Email cannot be empty string!')
        } else if (!res.ok) {
            const a = await res.json();
            setErr(a.message)
        }
        onSubmit(e);
    }

    return (
        <div className="login-page-wrapper">
            <p className="title"><Link to='/' className="title-link">dishcovery</Link></p>
            <div className="login-page">
                <div className="login-form">
                    <form onSubmit={submitHandler}>
                        <h2>Log in</h2>

                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} />
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