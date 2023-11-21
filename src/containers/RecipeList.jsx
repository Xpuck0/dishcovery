import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import * as recipeAPI from '../services/recipesAPI';
import './RecipeList.css'

export default function RecipeList({
    content,
}) {
    const [recipes, setRecipes] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await recipeAPI.getAllRecipes();
            setRecipes(data);
        }
        fetchData()
    }, []);

    return (
        <div className="recipe-list">
            <div className="header-wrapper">
                <h2>{content}</h2>
            </div>
            <div className="line"></div>
            <ul className="recipes">

                {recipes ? Object.values(recipes).map(r => {
                    return <RecipeCard key={r._id} r={r} />
                }) : <h1 className="error">There are no recipes!</h1>}

            </ul>
        </div>
    )
}