import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/contexts";
import { getUser } from "../services/usersAPI";
import { signup } from "../services/authAPI";
import "./LoginPage.css"
import useForm from "../hooks/useForm";

const FORM_INITIAL_STATE = {
    email: 'email',
    password: 'password',
    passwordConfirm: 'passwordConfirm',
}

export default function SignupPage() {
    const { registerSubmitHandler } = useContext(AuthContext)
    const { credentials, onChange, onSubmit} = useForm(registerSubmitHandler, {
        [FORM_INITIAL_STATE.email]: '',
        [FORM_INITIAL_STATE.password]: '',
        [FORM_INITIAL_STATE.passwordConfirm]: '',
    })
    const [visible, setVisible] = useState(false);
    const [errors, setErrors] = useState({});


    const passwordBlurHandler = () => {
        if (credentials.password != credentials.passwordConfirm) {
            setVisible(true);
        }
    }

    return (
        <div className="login-page-wrapper">
            <p className="title"><Link to='/' className="title-link">dishcovery</Link></p>
            <div className="login-page">
                
                <div className="login-form">
                    <form onSubmit={onSubmit}>
                        <h2>Sign up</h2>

                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password2">Repeat Password</label>
                            <input type="password" name="password2" id="password2" onBlur={passwordBlurHandler} value={credentials.passwordConfirm} onChange={onChange} />
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