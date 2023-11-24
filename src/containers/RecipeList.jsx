import { useState, useEffect, useContext } from "react";
import { QueryContext } from "../contexts/queryContext.js";
import * as recipeAPI from '../services/recipesAPI';
import sortCallback from "../utils/sortCallback.js";
import './List.css'
import { Link } from "react-router-dom";

export default function RecipeList({
    order,
    quantity,
    owner_id
}) {
    const [recipes, setRecipes] = useState([]);
    const query = useContext(QueryContext)



    useEffect(() => {
        const fetchData = async () => {
            const data = await recipeAPI.getAllRecipes();
            if (owner_id) {
                setRecipes(data.filter(r => r.owner == owner_id))
            } else {
                setRecipes(data);
            }
        }
        fetchData()
    }, []);

    return (
        <ul className="recipe-list list">
            {

                recipes
                    ? recipes.sort((a, b) => sortCallback(a, b, order)).slice(0, quantity).filter(a => a.title.toLowerCase().includes(query.toLowerCase())).map(r => {
                        return <li key={r._id} className="recipe item"><Link to={`/recipes/${r._id}`}>{r.title}</Link></li>
                    })
                    : <h1 className="error">There are no recipes!</h1>
            }
        </ul>
    )
}
// export default function RecipeList({
//     content,
//     search
// }) {
//     const [recipes, setRecipes] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await recipeAPI.getAllRecipes();
//             setRecipes(data);
//         }
//         fetchData()
//     }, []);

//     useEffect(() => {
//         console.log(search)
//     },[search])

//     return (
//         <div className="recipe-list">
//             <div className="header-wrapper">
//                 <h2>{content}</h2>
//             </div>
//             <div className="line"></div>
//             <ul className="recipes">

//                 {recipes ? Object.values(recipes).filter(a => a.title.toLowerCase().includes(search.toLowerCase())).map(r => {
//                     return  <li key={r._id}><Link to={`/recipes/${r._id}`}>{r.title}</Link></li> 
//                 }) : <h1 className="error">There are no recipes!</h1>}

//             </ul>
//         </div>
//     )
// }