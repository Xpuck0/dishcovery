import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { AuthContext, QueryContext } from './contexts/contexts'

import TagPage from './pages/TagPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import RecipesPage from './pages/RecipesPage'
import RecipeCreate from './pages/RecipeCreate'
import RecipeDetails from './pages/RecipeDetails'
import UsersPage from './pages/UsersPage'
import UserDetails from './pages/UserDetails'
import AccountSettings from './pages/AccountSettings'

import './App.css'
import Path from './paths'
import AuthProvider from './Main-containers/AuthProvider'
import QueryProvider from './Main-containers/QueryProvider'
import NotFoundPage from './pages/NotFoundPage'

function App() {
    
    // const [search, setSearch] = useState('')

    // const queryValues = {
    //     search: search,
    //     setSearch: setSearch
    // }

    return (
        <QueryProvider>
            <AuthProvider>
                <Routes>
                    <Route path={Path.Home} element={<HomePage />} />
                    <Route path={Path.Login} element={<LoginPage />} />
                    <Route path={Path.Logout} element={<LogoutPage />} />
                    <Route path={Path.Signup} element={<SignupPage />} />
                    <Route path={Path.Recipes} element={<RecipesPage />} />
                    <Route path={`/recipes/:id`} element={<RecipeDetails />} />
                    <Route path={Path.CreateRecipe} element={<RecipeCreate />} />
                    <Route path={Path.Authors} element={<UsersPage />} />
                    <Route path={`${Path.Authors}/:id`} element={<UserDetails />} />
                    <Route path={Path.CreateRecipe} element={<HomePage />} />
                    <Route path={Path.Settings} element={<AccountSettings />} />
                    <Route path="/tags/:tag" element={<TagPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AuthProvider>
        </QueryProvider>
    )
}

export default App
