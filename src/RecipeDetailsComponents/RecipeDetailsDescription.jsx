import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../contexts/contexts"
import { updateRecipe } from "../services/recipesAPI"
import "./RecipeDetailsDescription.css"

import Heading from "../components/Heading"

export default function RecipeDetailsDescription({ children, recipe, setRecipe }) {

    const { isAuthenticated, userId } = useContext(AuthContext)
    const [showItem, setShowItem] = useState(true)

    const [newDescription, setNewDescription] = useState('')
    const [err, setErr] = useState('');

    const { id } = useParams();

    const changeHandler = (e) => {
        setNewDescription(e.target.value)
    }

    const editDescriptionHandler = (e) => {
        setShowItem(false);
    }

    const descriptionEditSubmit = async (e) => {
        e.preventDefault();
        if (newDescription.trim() != '') {
            setShowItem(true);

            const res = await updateRecipe(id, { ...recipe, description: newDescription }, true)
            setRecipe(res)
            setErr('');
        } else {
            setErr('Description cannot be empty!');
        }
    }


    return (
        <>
            <div className="section-heading">
                <Heading content="Description" />
                {isAuthenticated && userId == recipe._ownerId && (
                    <span className="edit-btn" onClick={editDescriptionHandler}>Edit</span>
                )}
            </div>
            <p className="description">{showItem && children}
                {!showItem && (
                    <form className="edit-form description-edit" onSubmit={descriptionEditSubmit}>
                        <div className="input">
                            {/* <label htmlFor="description">Description:</label> */}
                            <textarea name="description" type="text" defaultValue={recipe.description} onChange={changeHandler} />
                        </div>
                        <p className={`error ${err.length == 0 ? 'hidden' : 'show'}`}>{err}</p>
                        <div className="buttons">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => {
                                setShowItem(true)
                                setNewDescription('');
                            }}>Cancel</button>
                        </div>
                    </form>

                )}
            </p>
        </>
    )
}