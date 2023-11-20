import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"
import { getUser } from "../services/usersAPI";
import "./LoginPage.css"

const FORM_INITIAL_STATE = {
    email: '',
    password: '',
    password2: '',
}

export default function SignupPage() {
    const [credentials, setCredentials] = useState(FORM_INITIAL_STATE);
    const [visible, setVisible] = useState(false);
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setCredentials(old => ({
            ...old,
            [e.target.name]: e.target.value,
        }))
    }

    const resetValues = () => {
        setCredentials(FORM_INITIAL_STATE);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(credentials)
        resetValues()
    }

    const passwordBlurHandler = () => {
        if (credentials.password != credentials.password2) {
            // setVisible(true);
        }
    }

    return (
        <div className="login-page-wrapper">
            <p className="title"><Link to='/' className="title-link">dishcovery</Link></p>
            <div className="login-page">
                <div className="image-container">
                    <img src="/images/auth.jpg" alt="Food image" />
                </div>
                <div className="login-form">
                    <form onSubmit={submitHandler}>
                        <h2>Sign up</h2>

                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={changeHandler} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" value={credentials.password} onChange={changeHandler} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password2">Repeat Password</label>
                            <input type="password" name="password2" id="password2" onBlur={passwordBlurHandler} value={credentials.password2} onChange={changeHandler} />
                            <p className="error" style={{ display: visible ? 'block' : 'none' }}>Passwords do not match!</p>
                        </div>

                        <button className="submit" type="submit">Sign up</button>


                        <p>Already have an account? <Link className="login-href link" to="/login">Log in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}