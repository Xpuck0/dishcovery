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
            <Heading content="Tags" />
            {isAuthenticated && userId == recipe._ownerId && (
                <span className="edit-btn" onClick={editClick}>📝</span>
            )}
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
                        // <>
                        //     <ol>
                        //         {newTags.map((a, i) => (
                        //             <li key={`${a}${i}`}>{a} <span onClick={() => {
                        //                 let list = newTags;
                        //                 list.splice(i, 1)
                        //                 setNewTags(list)
                        //             }}>X</span></li>
                        //         ))}
                        //     </ol>
                        //     <form onSubmit={tagsEditSubmit} className="instruction edit">
                        //         <label htmlFor="tag">Add instruction</label>
                        //         <textarea name="tag" value={newTag} onChange={(e) => setNewTag(old => e.target.value)}></textarea>
                        //         <div className="buttons">
                        //             <button type="submit">Submit</button>
                        //             <button onClick={(e) => {
                        //                 e.preventDefault();
                        //                 setNewTag('');
                        //                 setShowItem(old => ({
                        //                     ...old,
                        //                     tags: true
                        //                 }))
                        //             }} type="button">Cancel</button>
                        //         </div>
                        //     </form>
                        // </>
                        <EditForm type="tags" showEdit={showEdit} setShowEdit={setShowEdit} recipe={recipe} setRecipe={setRecipe} newArr={newTags} setNewArr={setNewTags}/>
                    )}
                </>

            )}
        </>
    )

}