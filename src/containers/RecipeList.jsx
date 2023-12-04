import { useState, useEffect, useContext } from "react";
import { AuthContext, QueryContext } from "../contexts/contexts.js";
import * as recipeAPI from '../services/recipesAPI';
import sortCallback from "../utils/sortCallback.js";
import './List.css'
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import Path from "../paths.js";

export default function RecipeList({
    order,
    quantity,
    owner_id,
    show
}) {
    const auth = useContext(AuthContext)
    const {search, setSearch} = useContext(QueryContext)
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await recipeAPI.getAllRecipes();
            if (owner_id) {
                setRecipes(data.filter(r => r._ownerId == owner_id))
            } else {
                setRecipes(data);
            }
        }
        fetchData()
    }, []);


    return (
        <>
        <ul className="recipe-list list">
            {

                recipes
                    ? 
                    
                    recipes.sort((a, b) => sortCallback(a, b, order)).slice(0, quantity).filter(a => a.title.toLowerCase().includes(search.toLowerCase())).map(r => {
                        return <RecipeCard key={r._id} r={r} show={show}/>
                    })
                    : <h1 className="error">There are no recipes</h1>
            }
        </ul>
        {/* {noRecipes && 
            <div className="no-recipes">
                <h1 className="error">There are no recipes</h1>
                {auth.isAuthenticated ? 
                    <Link to={Path.CreateRecipe} className="post">Post a recipe</Link>
                    : <p><Link className="signup">Sign up</Link> to create recipes or <Link className="login">log in</Link> if you already have an account.</p>
                     
                }
            </div>
        } */}
        </>
    )
}
