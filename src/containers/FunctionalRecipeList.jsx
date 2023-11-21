import { useState, useEffect } from "react";
import * as recipeAPI from '../services/recipesAPI'
import RecipeCard from "../components/RecipeCard";


export default function FunctionalRecipeList({
    order,
    quantity
}) {
    const [recipes, setRecipes] = useState([]);

    const sortCallback = (a, b) => {
        switch (order) {
            case 'likes-ascending':
                return a.likes - b.likes; break;
            case 'likes-descending':
                return b.likes - a.likes; break;
            case 'date-ascending':
                return new Date(a.date) - new Date(b.date); break;
            case 'date-descending':
                return new Date(b.date) - new Date(a.date); break;
            case 'name-ascending':
                return a.title.localeCompare(b.title); break;
            case 'name-descending':
                return b.title.localeCompare(a.title); break;
            default:
                return;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await recipeAPI.getAllRecipes();
            setRecipes(data); 
        }
        fetchData()
    }, []);

    return (
        <ul className="func-recipe-list">
            {
                
                recipes
                    ? recipes.sort((a, b) => sortCallback(a, b)).slice(0, quantity).map(r => {
                        
                        return <RecipeCard key={r._id} r={r} />
                    })
                    : <h1 className="error">There are no recipes!</h1>
            }
        </ul>
    )
}