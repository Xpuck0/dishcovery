import { useState, useContext } from "react";
import { AuthContext } from "../contexts/contexts";
import Heading from "../components/Heading";
import EditForm from "./EditForm";


export default function RecipeDetailsInstructions({ recipe, setRecipe, checkHandler }) {
    const [newInstructions, setNewInstructions] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

    const { userId, isAuthenticated } = useContext(AuthContext)


    const onEditClick = (e) => {
        setShowEdit(true);
        setNewInstructions(recipe.instructions)
    }

    return (
        <>
            <div className="section-heading">
                <Heading content="Instructions" />
                {/* EDIT BUTTON */}
                {isAuthenticated && userId == recipe._ownerId && !showEdit && (
                    <span className="edit-btn" onClick={onEditClick}>Edit</span>
                )}
            </div>

            {recipe.instructions?.length && (
                <>
                    <ol className={`instructions ${showEdit && 'hide'}`}>

                        {recipe.instructions?.length > 0 ? recipe.instructions.map((a, i) => (
                            <li onClick={checkHandler} key={i}><span>{a}</span></li>
                        ))
                            : <h3>No added instructions</h3>
                        }
                    </ol>
                    {showEdit && (
                        <EditForm type="instructions" showEdit={showEdit} setShowEdit={setShowEdit} recipe={recipe} setRecipe={setRecipe} newArr={newInstructions} setNewArr={setNewInstructions} />
                    )}
                </>
            )}

        </>
    )
}