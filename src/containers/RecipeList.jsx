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
    show,
    liked_by,
    tag
}) {
    const auth = useContext(AuthContext)
    const { query } = useContext(QueryContext)
    const [recipes, setRecipes] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await recipeAPI.getAllRecipes();
            if (liked_by) {
                const res = data.filter(r => r.likes.includes(liked_by));
                console.log(res)
                setRecipes(res)
                console.log(recipes)
            }
            else if (owner_id) {
                setRecipes(data.filter(r => r._ownerId == owner_id))
            }else if (tag) {
                const arr = [];
                data.map(el => {
                    if (el.tags.includes(tag)) {
                        arr.push(el);
                    }
                })
                setRecipes(arr)
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
        <ul className="recipe-list list">
            {

                recipes
                    ?

                    recipes.sort((a, b) => sortCallback(a, b, order)).slice(0, quantity).filter(a => a && a.title && a.title.toLowerCase().includes(query.toLowerCase())).map(r => {
                        return <RecipeCard key={r._id} r={r} show={show} />
                    })
                    : <h1 className="error">There are no recipes</h1>
            }
        </ul>
    )
}
