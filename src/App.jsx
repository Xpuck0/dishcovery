import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetails from './pages/RecipeDetails'
import UsersPage from './pages/UsersPage'
import UserDetails from './pages/UserDetails'

import './App.css'

function App() {
    return (
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
    )
}

export default App
