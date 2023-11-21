import { Suspense, useEffect, useState } from "react";
import { getFullRecipe } from "../services/recipesAPI";
import { useParams, Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import HeadingWithLine from "../components/HeadingWithLine";
import { createComment } from "../services/commentsAPI";

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
        likes: "",
        _id: ""
    });

    const { id } = useParams();

    const [comment, setComment] = useState(COMMENT_STATE_KEYS)

    useEffect(() => {
        async function getInfo() {
            const res = await getFullRecipe(id);
            setRecipe(res);
        }

        getInfo();
    }, [])

    const changeHandler = (e) => {
        setComment(old => ({
            ...old,
            [e.target.name]: e.target.value,
        }))
    }

    const clearState = () => {
        setComment(COMMENT_STATE_KEYS);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await createComment(id, comment.username, comment.comment);
        clearState();
    }

    return (
        <div className="recipe-page-wrapper">
            <div className="recipe-page-header">
                <Link to="..">Back</Link>
                <section className="title-wrapper">
                    <h1 className="title">{recipe.title}</h1>
                    <h4 className="author">{recipe.author}</h4>.
                </section>
                <StarRating />
            </div>
            <div className="images">
                {recipe.images.map(i => {
                    <div className="image-wrapper">
                        <img src={i} alt={`Picture of ${recipe.title}`} />
                    </div>
                })}
            </div>
            <HeadingWithLine content="Ingredients" />
            <ul>
                {recipe.ingredients ? recipe.ingredients.map((a, i) => (
                    <li key={i}>{a}</li>
                ))
                    : <h3>No added ingredients</h3>
                }
            </ul>
            <HeadingWithLine content="Instructions" />
            <ul>
                {recipe.instructions ? recipe.instructions.map((a, i) => (
                    <li key={i}>{a}</li>
                ))
                    : <h3>No added instructions</h3>
                }
            </ul>

            <HeadingWithLine content="Contribute" />

            {recipe.wallets ? Object.entries(recipe.wallets).map((a, i) => (
                <p><span>{a[0]}</span>: {a[1]}</p>
            ))
                : <h3>no added wallets</h3>
            }

            <HeadingWithLine content="Tags" />
            {recipe.tags ? recipe.tags.map((a) => (
                <Link to={`/tags/${a}`} >{a}</Link>
            ))
                : <h3>No tags added.</h3>}

            <article className="create-comment">
                <label>Add new comment</label>
                <form className="form" onSubmit={submitHandler}>
                    <input type="text" name="username" value={comment.username} onChange={changeHandler} />
                    <textarea name="comment" id="comment" value={comment.comment} placeholder="Add comment..." cols="30" rows="10" onChange={changeHandler} ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </article>

        </div>
    )
}