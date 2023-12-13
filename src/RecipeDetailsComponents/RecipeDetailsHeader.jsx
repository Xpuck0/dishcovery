import { useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { AuthContext } from "../contexts/contexts"
import { updateRecipe } from "../services/recipesAPI"

export default function RecipeDetailsHeader({recipe, setRecipe}) {

    const {isAuthenticated, userId} = useContext(AuthContext)
    const [showItem, setShowItem] = useState(true)

    const [newTitle, setNewTitle] = useState('')
    
    const {id} = useParams();

    const changeHandler = (e) => {
        setNewTitle(e.target.value)
    }

    const editTitleHandler = (e) => {
        setShowItem(false);
    }

    const titleEditSubmit = async (e) => {
        e.preventDefault();
        setShowItem(true);

        const res = await updateRecipe(id, { ...recipe, title: newTitle }, true)
        setRecipe(res)
    }

    return (
        <div className="recipe-page-header">
            <section className="title-wrapper">
                <h1 className={`title ${!showItem && 'hide'}`}>{recipe.title}{isAuthenticated && userId == recipe._ownerId && (
                    <span onClick={editTitleHandler}>🖊️</span>)}</h1>
                {!showItem && (
                    <form onSubmit={titleEditSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input name="title" type="text" value={newTitle} onChange={changeHandler} />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => {
                            setShowItem(old => ({
                                ...old,
                                title: true
                            }))
                        }}>Cancel</button>
                    </form>

                )}
                <h4 className="author"><Link to={`/authors/${recipe._ownerId}`}>{recipe.author}</Link></h4>
            </section>
        </div>
    )

}