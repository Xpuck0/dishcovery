import { useState, useEffect, useContext } from "react";
import { AuthContext, QueryContext } from "../contexts/contexts.js";
import * as recipeAPI from '../services/recipesAPI';
import sortCallback from "../utils/sortCallback.js";
import './List.css'
import { Link, useLocation } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import RecipeCardHome from "../components/RecipeCardHome.jsx";
import Path from "../paths.js";

export default function RecipeList({
    order,
    quantity,
    owner_id,
    show,
    liked_by,
    tag
}) {
    const auth = useContext(AuthContext)
    const { query } = useContext(QueryContext)
    const [recipes, setRecipes] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();


    useEffect(() => {
        const fetchData = async () => {
            const data = await recipeAPI.getAllRecipes();
            setError('');
            if (liked_by) {
                const res = data.filter(r => r.likes.includes(liked_by));
                setRecipes(res)
                if (!res.length) {
                    setError("There are no recipes liked by this user!")
                }
            }
            else if (owner_id) {
                const res = data.filter(r => r._ownerId == owner_id);
                setRecipes(res)
                if (!res.length) {
                    setError("There are no recipes published by this user!")
                }
            } else if (tag) {
                const arr = [];
                data.map(el => {
                    if (el.tags.includes(tag)) {
                        arr.push(el);
                    }
                })
                setRecipes(arr)
                if (!arr.length) {
                    setError("There are no recipes with this tag")
                }

            } else {
                setRecipes(data);
            }

            setDataFetched(true);
        }
        fetchData()
    }, [liked_by, owner_id, tag]);

    const filteredRecipes = recipes.sort((a, b) => sortCallback(a, b, order)).slice(0, quantity <= 0 ? recipes.length : quantity).filter(a => a && a.title && a.title.toLowerCase().includes(query.toLowerCase()));

    if (!dataFetched) {
        return null;
    }

    return (
        <ul className={`recipe-list list ${location.pathname != Path.Recipes ? 'home' : 'recipes'}`}>
            {

                filteredRecipes.length > 0 ? filteredRecipes.map(r => (

                    location.pathname == Path.Recipes ? <RecipeCard key={r._id} r={r} show={show} /> : <RecipeCardHome key={r._id} r={r} />
                ))
                // check if the user is on the author details page which looks like /authors/:id and write <p className="error">{error}</p> if the author has no recipes
                // example  
                // no write it


                    : location.pathname.startsWith(Path.Recipes) ? <p className="error">{error}</p> : <p className="error">There are no recipes</p>
            }
        </ul>
    )
}
