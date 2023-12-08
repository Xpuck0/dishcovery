import { Suspense, useContext, useEffect, useState } from "react";
import { getFullRecipe, updateRecipe } from "../services/recipesAPI";
import { useParams, Link } from "react-router-dom";

import { AuthContext } from "../contexts/contexts"

import StarRating from "../components/StarRating";
import Heading from "../components/Heading";

import "./RecipeDetails.css"
import Images from "../containers/Images";
import CommentSection from "../containers/CommentSection";

export default function RecipeDetails() {
    const [likeStatus, setLikeStatus] = useState(false);
    const {userId} = useContext(AuthContext);
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

    const { id } = useParams();



    useEffect(() => {
        async function getInfo() {
            const res = await getFullRecipe(id);
            setRecipe(res);
            setLikeStatus(() => res.likes.includes(userId))
        }

        getInfo();
    }, [])



    const likeHandler = async () => {
        let oldLikesCopy = recipe.likes;
        if (!oldLikesCopy.includes(userId)) {
            oldLikesCopy.push(userId)
            setLikeStatus('true')
        } else {
            setLikeStatus('false')
            oldLikesCopy = oldLikesCopy.filter(el => el != userId);
        }
        setRecipe(old => ({ ...old, likes: oldLikesCopy}))
        // console.log(oldLikesCopy)
        // console.log({...recipe, likes: oldLikesCopy})
        await updateRecipe(recipe._id, {...recipe, likes: oldLikesCopy}, true)
        // console.log(recipe.likes)
    }

    const checkHandler = (e) => {
        let a = e.currentTarget;
        a.className == "" ? a.className = "checked" : a.className = "";
    }


    return (
        <div className="wrapper">
            <div className="recipe-page-wrapper">
                <div className="recipe-page-header">
                    <Link className="like-button" to="..">Back</Link>
                    <section className="title-wrapper">
                        <h1 className="title">{recipe.title}</h1>
                        <h4 className="author"><Link to={`/authors/${recipe._ownerId}`}>{recipe.author}</Link></h4>
                    </section>
                    <button className={`like-button ${likeStatus}`} onClick={likeHandler}>{recipe.likes.length} {recipe.likes.length == 1 ? 'like' : 'likes'}</button>
                </div>
                <Heading content="Images" />
                <Images images={recipe.images} />

                <Heading content="Ingredients" />
                <ul className="ingredients">
                    {recipe.ingredients.length > 0 ? recipe.ingredients.map((a, i) => (
                        <li onClick={checkHandler} key={i}><span>{a}</span></li>
                    ))
                        : <h3>No added ingredients</h3>
                    }
                </ul>
                <Heading content="Instructions" />
                <ol className="instructions">
                    {recipe.instructions ? recipe.instructions.map((a, i) => (
                        <li onClick={checkHandler} key={i}><span>{a}</span></li>
                    ))
                        : <h3>No added instructions</h3>
                    }
                </ol>
                {recipe.wallets && (
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
                {recipe.tags && <div className="tags">

                    {
                        recipe.tags.length > 0 ? recipe.tags.map((a, i) => (
                            <Link key={i} to={`/tags/${a}`} >{a}</Link>
                        ))
                            : <h3>No tags added.</h3>
                    }

                </div>}

                <Heading content="Rating" />
                <StarRating rating={rating} setRating={setRating} />
                <CommentSection rating={rating}/>

            </div >
        </div>
    )
}