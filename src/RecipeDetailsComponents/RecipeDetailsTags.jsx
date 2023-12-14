import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/contexts";

import EditForm from "./EditForm";
import Heading from "../components/Heading";

export default function RecipeDetailsTags({ recipe, setRecipe, checkHandler }) {

    const [newTags, setNewTags] = useState([])
    const { userId, isAuthenticated } = useContext(AuthContext)
    const [showEdit, setShowEdit] = useState(false)


    const editClick = () => {
        setShowEdit(true)
        setNewTags(recipe.tags)
    }

    return (
        <>
            <div className="section-heading">
                <Heading content="Tags" />
                {isAuthenticated && userId == recipe._ownerId && (
                    <span className="edit-btn" onClick={editClick}>Edit</span>
                )}
            </div>
            {recipe.tags?.length && (
                <>
                    <div className={`tags ${showEdit && 'hide'}`}>

                        {
                            recipe.tags.length > 0 ? recipe.tags.map((a, i) => (
                                <Link key={i} to={`/tags/${a}`} >{a}</Link>
                            ))
                                : <h3>No tags added.</h3>
                        }

                    </div>

                    {showEdit && (
                        <EditForm type="tags" showEdit={showEdit} setShowEdit={setShowEdit} recipe={recipe} setRecipe={setRecipe} newArr={newTags} setNewArr={setNewTags} />
                    )}
                </>

            )}
        </>
    )

}