import { useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { AuthContext } from "../contexts/contexts"
import { updateRecipe } from "../services/recipesAPI"

export default function RecipeDetailsHeader({ recipe, setRecipe }) {

    const { isAuthenticated, userId } = useContext(AuthContext)
    const [showItem, setShowItem] = useState(true)

    const [newTitle, setNewTitle] = useState('')
    const [err, setErr] = useState('');

    const { id } = useParams();

    const changeHandler = (e) => {
        setNewTitle(e.target.value)
    }

    const editTitleHandler = (e) => {
        setShowItem(false);
    }

    const titleEditSubmit = async (e) => {
        e.preventDefault();
        if (newTitle.trim() != '') {
            setShowItem(true);

            const res = await updateRecipe(id, { ...recipe, title: newTitle }, true)
            setRecipe(res)
            setErr('');
        } else {
            setErr('Title cannot be empty!');
        }
    }

    return (
        <div className="recipe-page-header">
            <section className="title-wrapper">
                <h1 className={`title ${!showItem && 'hide'}`}>{recipe.title}{isAuthenticated && userId == recipe._ownerId && showItem && (
                    <span onClick={editTitleHandler}>Edit</span>)}</h1>
                {!showItem && (
                    <form className="edit-form title-edit" onSubmit={titleEditSubmit}>
                        <div className="input">
                            <label htmlFor="title">Title:</label>
                            <input name="title" type="text" value={newTitle} onChange={changeHandler} />
                        </div>
                        <p className={`error ${err.length == 0  ? 'hidden': 'show'}`}>{err}</p>
                        <div className="buttons">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => {
                                setShowItem(true)
                            }}>Cancel</button>
                        </div>
                    </form>

                )}
                <h4 className="author"><Link to={`/authors/${recipe._ownerId}`}>{recipe.author}</Link></h4>
            </section>
        </div>
    )

}