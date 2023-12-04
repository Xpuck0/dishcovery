import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { AuthContext, QueryContext } from './contexts/contexts'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import RecipesPage from './pages/RecipesPage'
import RecipeCreate from './pages/RecipeCreate'
import RecipeDetails from './pages/RecipeDetails'
import UsersPage from './pages/UsersPage'
import UserDetails from './pages/UserDetails'

import './App.css'
import Path from './paths'
import AuthProvider from './Main-containers/AuthProvider'
import NotFoundPage from './pages/NotFoundPage'

function App() {
    
    const [search, setSearch] = useState('')

    const queryValues = {
        search: search,
        setSearch: setSearch
    }

    return (
        <QueryContext.Provider value={queryValues} >
            <AuthProvider>
                <Routes>
                    <Route path={Path.Home} element={<HomePage />} />
                    <Route path={Path.Login} element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path={Path.Signup} element={<SignupPage />} />
                    <Route path={Path.Recipes} element={<RecipesPage />} />
                    <Route path={`/recipes/:id`} element={<RecipeDetails />} />
                    <Route path="recipes/create" element={<RecipeCreate />} />
                    <Route path={Path.Authors} element={<UsersPage />} />
                    <Route path={`${Path.Authors}/:id`} element={<UserDetails />} />
                    <Route path={Path.CreateRecipe} element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AuthProvider>
        </QueryContext.Provider >
    )
}

export default App
