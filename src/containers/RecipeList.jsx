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
            console.log(data)
            setError('');
            if (liked_by) {
                const res = data.filter(r => r.likes.includes(liked_by));
                setRecipes(res)
                if (!res.length){
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
                console.log(data)
                data.map(el => {
                    console.log(el)
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


    if (!dataFetched) {
        return null;
    }

    return (
        <ul className={`recipe-list list ${location.pathname != Path.Recipes ? 'home': 'recipes'}`}>
            {

                recipes.length
                    ?

                    recipes.sort((a, b) => sortCallback(a, b, order)).slice(0, quantity <= 0 ? recipes.length : quantity).filter(a => a && a.title && a.title.toLowerCase().includes(query.toLowerCase())).map(r => (

                        location.pathname == Path.Recipes ? <RecipeCard key={r._id} r={r} show={show} /> : <RecipeCardHome  key={r._id} r={r} /> 
                    ))
                    : <p className="error">{error}</p>
            }
        </ul>
    )
}
