import { Suspense, useEffect, useState } from "react";
import { getFullRecipe } from "../services/recipesAPI";
import { useParams, Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import Heading from "../components/Heading";
import { createComment, getAllComments } from "../services/commentsAPI";

import "./RecipeDetails.css"

const COMMENT_STATE_KEYS = {
    username: '',
    comment: ''
}

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState({
        owner: "",
        title: "",
        description: "",
        images: [],
        ingredients: [],
        instructions: [],
        likes: 0,
        _id: ""
    });

    const { id } = useParams();

    const [comment, setComment] = useState(COMMENT_STATE_KEYS)
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getInfo() {
            const res = await getFullRecipe(id);
            setRecipe(res);
        }

        getAllComments(id)
            .then(data => {
                setComments(data)
            })

        getInfo();
    }, [comment])

    const changeHandler = (e) => {
        setComment(old => ({
            ...old,
            [e.target.name]: e.target.value,
        }))
    }

    const clearState = () => {
        setComment(COMMENT_STATE_KEYS);
    }

    const likeHandler = () => {
        setRecipe(old => ({ ...old, likes: old.likes + 1 }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await createComment(id, comment.username, comment.comment);
        setComments(old => [...old, res])
        clearState();
    }

    return (
        <div className="recipe-page-wrapper">
            <div className="recipe-page-header">
                <Link className="like-button" to="..">Back</Link>
                <section className="title-wrapper">
                    <h1 className="title">{recipe.title}</h1>
                    <h4 className="author"><Link to={`/authors/${recipe.owner}`}>{recipe.author}</Link></h4>
                </section>
                <button className="like-button" onClick={likeHandler}>{recipe.likes} likes</button>
            </div>
            {/* {recipe.images.every(e => checkImageExists(e)) && ( */}
            <ul className="images">
                {recipe.images.map((i, index) => (
                    <li key={index} onMouseOver={() => { }} className="image-wrapper">
                        <img src={i} alt={`Picture of ${recipe.title}`} />
                    </li>
                ))}
            </ul>
            {/* )} */}
            <StarRating />
            <Heading content="Ingredients" />
            <ul className="ingredients">
                {recipe.ingredients ? recipe.ingredients.map((a, i) => (
                    <li key={i}><span>{a}</span></li>
                ))
                    : <h3>No added ingredients</h3>
                }
            </ul>
            <Heading content="Instructions" />
            <ol className="instructions">
                {recipe.instructions ? recipe.instructions.map((a, i) => (
                    <li key={i}><span>{a}</span></li>
                ))
                    : <h3>No added instructions</h3>
                }
            </ol>
            {recipe.wallets && (
                <>
                    <Heading content="Contribute" />

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
            {
                recipe.tags ? recipe.tags.map((a, i) => (
                    <Link key={i} to={`/tags/${a}`} >{a}</Link>
                ))
                    : <h3>No tags added.</h3>
            }
            <div className="comments">
                <ul>
                    {comments.length > 0 ? comments.map((a) => (
                        <li key={a._id} >
                            <section className="recipe-comment">
                                <h4>{a.username}</h4>
                                <p>{a.comment}</p>
                            </section>
                        </li>
                    )) : <h3>No comments! Be the first one to post a comment!</h3>}
                </ul>
            </div>
            <article className="create-comment">
                <label>Add new comment</label>
                <form className="form" onSubmit={submitHandler}>
                    <input type="text" name="username" value={comment.username} onChange={changeHandler} />
                    <textarea name="comment" id="comment" value={comment.comment} placeholder="Add comment..." cols="30" rows="10" onChange={changeHandler} ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </article>

        </div >
    )
}