import { Suspense, useContext, useEffect, useState } from "react";
import { getFullRecipe, updateRecipe } from "../services/recipesAPI";
import { useParams, Link } from "react-router-dom";

import { AuthContext } from "../contexts/contexts"

import StarRating from "../components/StarRating";
import Heading from "../components/Heading";

import "./RecipeDetails.css"
import Images from "../containers/Images";
import CommentSection from "../containers/CommentSection";
import Header from "../Main-containers/Header";

export default function RecipeDetails() {
    const [likeStatus, setLikeStatus] = useState(false);
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [showItem, setShowItem] = useState({
        title: true,
        images: true,
        ingredients: true,
        instructions: true,
        tags: true,
    })
    const [rating, setRating] = useState(0);
    const [recipe, setRecipe] = useState({
        owner: "",
        title: "",
        description: "",
        images: [],
        ingredients: [],
        instructions: [],
        tags: [],
        likes: [],
        _id: ""
    });
    const [newRecipe, setNewRecipe] = useState(() => recipe)
    const [imgUrl, setImgUrl] = useState('');
    const [newIngredient, setNewIngredient] = useState("");
    const [newInstruction, setNewInstruction] = useState("");
    const [newTag, setNewTag] = useState('')

    const { id } = useParams();



    useEffect(() => {
        async function getInfo() {
            const res = await getFullRecipe(id);
            setRecipe(res);
            setLikeStatus(() => res.likes.includes(userId))
        }

        getInfo();
    }, [])

    const changeNewImage = (e) => {
        setImgUrl(e.target.value)
    }

    const changeHandler = (e) => {
        setNewRecipe(old => ({
            ...old,
            [e.target.name]: e.target.value
        }))
    }

    const likeHandler = async () => {
        let oldLikesCopy = recipe.likes;
        if (!oldLikesCopy.includes(userId)) {
            oldLikesCopy.push(userId)
            setLikeStatus('true')
        } else {
            setLikeStatus('false')
            oldLikesCopy = oldLikesCopy.filter(el => el != userId);
        }
        setRecipe(old => ({ ...old, likes: oldLikesCopy }))
        await updateRecipe(recipe._id, { ...recipe, likes: oldLikesCopy }, true)
    }

    const checkHandler = (e) => {
        let a = e.currentTarget;
        a.className == "" ? a.className = "checked" : a.className = "";
    }

    const editTitleHandler = (e) => {
        setShowItem(old => ({
            ...old,
            title: false
        }))
    }

    const titleEditSubmit = async (e) => {
        e.preventDefault();
        setShowItem(old => ({
            ...old,
            title: true
        }))

        const res = await updateRecipe(id, { ...recipe, title: newRecipe.title }, true)
        setRecipe(res)
    }

    const imageEditSubmit = async (e) => {
        e.preventDefault();
        setShowItem(old => ({
            ...old,
            images: true
        }))
        const res = await updateRecipe(id, { ...recipe, images: [...newRecipe.images, imgUrl] }, true)
        setRecipe(res)
    }

    const ingredientsEditSubmit = async (e) => {
        e.preventDefault();
        setShowItem(old => ({
            ...old,
            ingredients: true
        }))
        const res = await updateRecipe(id, { ...recipe, ingredients: [...newRecipe.ingredients, newIngredient] }, true)
        setRecipe(res)
        setNewIngredient('')
    }

    const instructionsEditSubmit = async (e) => {

        e.preventDefault();
        setShowItem(old => ({
            ...old,
            instructions: true
        }))
        const res = await updateRecipe(id, { ...recipe, instructions: [...newRecipe.instructions, newInstruction] }, true)
        setRecipe(res)
        setNewInstruction('')
    }

    const tagsEditSubmit = async (e) => {
        e.preventDefault()
        setShowItem(old => ({
            ...old,
            tags: true
        }))
        const res = await updateRecipe(id, { ...recipe, tags: [...newRecipe.tags, newTag] }, true)
        setRecipe(res)
        setNewTag('');
    }

    return (
        <>
            <Header hideQuery={true} />
            <div className="wrapper">
                <div className="recipe-page-wrapper">
                    <div className="recipe-page-header">
                        <section className="title-wrapper">
                            <h1 className={`title ${!showItem.title && 'hide'}`}>{recipe.title}{isAuthenticated && userId == recipe._ownerId && (
                                <span onClick={editTitleHandler}>🖊️</span>)}</h1>
                            {!showItem.title && (
                                <form onSubmit={titleEditSubmit}>
                                    <label htmlFor="title">Title:</label>
                                    <input name="title" type="text" value={newRecipe.title} onChange={changeHandler} />
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

                    <Heading content="Images" />
                    {isAuthenticated && userId == recipe._ownerId && (
                        <span className="edit-btn" onClick={() => {
                            setShowItem(old => ({
                                ...old,
                                images: false
                            }))
                            setNewRecipe(old => ({
                                ...old,
                                images: recipe.images
                            }))
                        }}>🖊️</span>
                    )}
                    <div className={`image-section ${!showItem.images && 'hide'}`}>

                        {recipe.images && !!recipe.images.length && (
                            <Images key={recipe._id} images={recipe.images} />
                        )}
                    </div>
                    {!showItem.images && (
                        <div className="image-edit">
                            <ul>
                                {newRecipe.images.map((el, i) => (
                                    <li key={`${el}${i}`}>{el} <span onClick={() => {
                                        const l = newRecipe.images;
                                        l.splice(i, 1);
                                        setNewRecipe(old => ({
                                            ...old,
                                            images: l
                                        }))
                                    }}>X</span></li>
                                ))}
                            </ul>
                            <form onSubmit={imageEditSubmit} className="image-edit">
                                <label htmlFor="image-url">New image URL</label>
                                <textarea name="image-url" value={imgUrl} onChange={(e) => setImgUrl(old => e.target.value)}></textarea>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={(e) => {
                                    e.preventDefault();
                                    setImgUrl('');
                                    setShowItem(old => ({
                                        ...old,
                                        images: true
                                    }))
                                }}>Cancel</button>
                            </form>
                        </div>
                    )}


                    {isAuthenticated && <button className={`like-button ${likeStatus}`} onClick={likeHandler}>❤️ {recipe.likes.length} {recipe.likes.length == 1 ? 'like' : 'likes'}</button>}

                    <Heading content="Ingredients" />
                    {isAuthenticated && userId == recipe._ownerId && (
                        <span className="edit-btn" onClick={(e) => {
                            setShowItem(old => ({
                                ...old,
                                ingredients: false
                            }))
                            setNewRecipe(old => ({
                                ...old,
                                ingredients: recipe.ingredients
                            }))
                        }}>🖌️</span>
                    )}
                    {recipe.ingredients && !!recipe.ingredients.length && (
                        <>
                            <ul className={`ingredients ${!showItem.ingredients && 'hide'}`}>

                                {recipe.ingredients.length > 0 ? recipe.ingredients.map((a, i) => (
                                    <li onClick={checkHandler} key={i}><span>{a}</span></li>
                                ))
                                    : <h3>No added ingredients</h3>
                                }
                            </ul>
                            {!showItem.ingredients && (
                                <>
                                    <ul>
                                        {newRecipe.ingredients.map((el, i) => (
                                            <li key={`${el}${i}`}>{el} <span onClick={() => {
                                                let list = recipe.ingredients;
                                                list.splice(i, 1);
                                                setNewRecipe(old => ({
                                                    ...old,
                                                    ingredients: list
                                                }))
                                            }}>X</span></li>
                                        ))}
                                    </ul>
                                    <form onSubmit={ingredientsEditSubmit} className="instruction edit">
                                        <label htmlFor="ingredient">Add ingredient:</label>
                                        <textarea name="ingredient" value={newIngredient} onChange={(e) => {
                                            setNewIngredient(old => e.target.value)
                                        }} />
                                        <div className="buttons">
                                            <button type='submit'>Add</button>
                                            <button type='button' onClick={(e) => {
                                                e.preventDefault();
                                                setNewIngredient('');
                                                setShowItem(old => ({
                                                    ...old,
                                                    ingredients: true
                                                }))
                                            }}>Cancel</button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </>
                    )}

                    <Heading content="Instructions" />
                    {isAuthenticated && userId == recipe._ownerId && (
                        <span className="edit-btn" onClick={() => {
                            setShowItem(old => ({
                                ...old,
                                instructions: false
                            }))
                            setNewRecipe(old => ({
                                ...old,
                                instructions: recipe.instructions
                            }))
                        }}>📝</span>
                    )}
                    {recipe.instructions && !!recipe.instructions.length > 0 && (
                        <>
                            <ol className={`instructions ${!showItem.instructions && 'hide'}`}>
                                {recipe.instructions.map((a, i) => (
                                    <li onClick={checkHandler} key={i}><span>{a}</span></li>
                                ))}
                            </ol>
                            {!showItem.instructions && (
                                <>
                                    <ol>
                                        {newRecipe.instructions.map((a, i) => (
                                            <li key={`${a}${i}`}>{a} <span onClick={() => {
                                                let list = newRecipe.instructions;
                                                list.splice(i, 1)
                                                setNewRecipe(old => ({
                                                    ...old,
                                                    instructions: list
                                                }))
                                            }}>X</span></li>
                                        ))}
                                    </ol>
                                    <form onSubmit={instructionsEditSubmit} className="instruction edit">
                                        <label htmlFor="instruction">Add instruction</label>
                                        <textarea name="instruction" value={newInstruction} onChange={(e) => setNewInstruction(old => e.target.value)}></textarea>
                                        <div className="buttons">
                                            <button type="submit">Submit</button>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setNewInstruction('');
                                                setShowItem(old => ({
                                                    ...old,
                                                    insructions: true
                                                }))
                                            }} type="button">Cancel</button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </>
                    )}
                    {recipe.wallets && !!recipe.wallets.length && (
                        <>
                            <Heading content="Contribute" />

                            <h3 className="author"><Link to={`/authors/${recipe.owner}`}>{recipe.author}</Link></h3>
                            <ul className="wallets">
                                {Object.entries(recipe.wallets).map((a, i) => (
                                    <p className="wallet" key={i}>
                                        {a[0]}: <code>{a[1]}</code>
                                    </p>
                                ))}
                            </ul>
                        </>
                    )}


                    <Heading content="Tags" />
                    {isAuthenticated && userId == recipe._ownerId && (
                        <span className="edit-btn" onClick={() => {
                            setShowItem(old => ({
                                ...old,
                                tags: false
                            }))
                            setNewRecipe(old => ({
                                ...old,
                                tags: recipe.tags
                            }))
                        }}>📝</span>
                    )}
                    {recipe.tags && recipe.tags.length && (
                        <>
                            <div className={`tags ${!showItem.tags && 'hide'}`}>

                                {
                                    recipe.tags.length > 0 ? recipe.tags.map((a, i) => (
                                        <Link key={i} to={`/tags/${a}`} >{a}</Link>
                                    ))
                                        : <h3>No tags added.</h3>
                                }

                            </div>

                            {!showItem.tags && (
                                <>
                                    <ol>
                                        {newRecipe.tags.map((a, i) => (
                                            <li key={`${a}${i}`}>{a} <span onClick={() => {
                                                let list = newRecipe.tags;
                                                list.splice(i, 1)
                                                setNewRecipe(old => ({
                                                    ...old,
                                                    tags: list
                                                }))
                                            }}>X</span></li>
                                        ))}
                                    </ol>
                                    <form onSubmit={tagsEditSubmit} className="instruction edit">
                                        <label htmlFor="tag">Add instruction</label>
                                        <textarea name="tag" value={newTag} onChange={(e) => setNewTag(old => e.target.value)}></textarea>
                                        <div className="buttons">
                                            <button type="submit">Submit</button>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setNewTag('');
                                                setShowItem(old => ({
                                                    ...old,
                                                    tags: true
                                                }))
                                            }} type="button">Cancel</button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </>

                    )}

                    {isAuthenticated &&
                        <>
                            <Heading content="Rating" />
                            <StarRating rating={rating} setRating={setRating} />
                        </>
                    }

                    <CommentSection rating={rating} />

                </div >
            </div>

        </>
    )
}