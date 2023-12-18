import { useContext, useState } from "react"

import useImageLoader from "../hooks/useImageLoader";

import Images from "../containers/Images";
import Heading from "../components/Heading"
import { AuthContext } from "../contexts/contexts"
import EditForm from "./EditForm";

export default function RecipeDetailsImages({ recipe, setRecipe }) {
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [showEdit, setShowEdit] = useState(false)
    const [newImages, setNewImages] = useState([])

    if (!recipe) return null;

    return (
        <>
            <div className="section-heading">
                {(recipe.images?.length > 0 && userId != recipe._ownerId) && <Heading content="Images" />}

                {/* EDIT BUTTON */}
                {
                    isAuthenticated && userId == recipe._ownerId && (
                        <>
                            <Heading content={"Images"} />
                            {!showEdit && (
                                <span className="edit-btn" onClick={() => {
                                    setShowEdit(true)
                                    setNewImages(recipe.images)
                                }}>Edit</span>
                            )}
                        </>
                    )
                }
            </div>

            {/* IMAGES */}
            <div className={`image-section ${showEdit ? 'hide' : ''}`}>

                {recipe.images?.length ? (
                    <Images key={recipe._id} images={recipe.images} />
                ) : null}
            </div>

            {/* IMAGE EDIT */}
            {
                showEdit && (
                    <EditForm type="images" showEdit={showEdit} setShowEdit={setShowEdit} recipe={recipe} setRecipe={setRecipe} newArr={newImages} setNewArr={setNewImages} />
                )
            }
        </>
    )
}