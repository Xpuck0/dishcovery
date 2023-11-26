import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { LoginContext } from './contexts/queryContext'
import { login } from './services/authAPI'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetails from './pages/RecipeDetails'
import UsersPage from './pages/UsersPage'
import UserDetails from './pages/UserDetails'

import './App.css'


const AUTH_INITIAL_KEYS = {
    email: '',
    password: ''
};

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(AUTH_INITIAL_KEYS)

    const loginSubmitHandler = async (values) => {
        console.log(values.email, values.password)
        const res = await login(values.email, values.password)
        if (!res.code) {
            setAuth(res)
            navigate('/')
        }

    }

    return (
        <LoginContext.Provider value={{ loginSubmitHandler }}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:id" element={<RecipeDetails />} />
                <Route path="/authors" element={<UsersPage />} />
                <Route path="/authors/:id" element={<UserDetails />} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </LoginContext.Provider>
    )
}

export default App
