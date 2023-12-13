import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/Heading";
import { AuthContext } from "../contexts/contexts";
import { updateRecipe } from "../services/recipesAPI";
import EditForm from "./EditForm";

export default function RecipeDetailsIngredients({ recipe, setRecipe, checkHandler }) {
    const [newIngredients, setNewIngredients] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

    const {userId, isAuthenticated} = useContext(AuthContext)


    const onEditClick = (e) => {
        setShowEdit(true);
        setNewIngredients(recipe.ingredients)
    }

    return (
        <>

            <Heading content="Ingredients" />

            {/* EDIT BUTTON */}
            {isAuthenticated && userId == recipe._ownerId && (
                <span className="edit-btn" onClick={onEditClick}>🖌️</span>
            )}



            {recipe.ingredients?.length && (
                <>
                    <ul className={`ingredients ${showEdit && 'hide'}`}>

                        {recipe.ingredients?.length > 0 ? recipe.ingredients.map((a, i) => (
                            <li onClick={checkHandler} key={i}><span>{a}</span></li>
                        ))
                            : <h3>No added ingredients</h3>
                        }
                    </ul>
                    {showEdit && (
                        <EditForm type="ingredients" showEdit={showEdit} setShowEdit={setShowEdit} recipe={recipe} setRecipe={setRecipe} newArr={newIngredients} setNewArr={setNewIngredients}/>
                    )}
                </>
            )}

        </>
    )
}