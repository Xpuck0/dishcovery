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
                return a.likes.length - b.likes.length; 
            case 'likes-descending':
                return b.likes.length - a.likes.length; 
            case 'date-ascending':
                console.log(a, b)
                return a._createdOn - b._createdOn; 
            case 'date-descending':
                console.log(a, b)
                return b._createdOn - a._createdOn; 
            case 'name-ascending':
                return a.title.localeCompare(b.title); 
            case 'name-descending':
                return b.title.localeCompare(a.title); 
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