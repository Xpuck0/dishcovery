import { Suspense, useContext, useEffect, useState } from "react";
import { getFullRecipe, updateRecipe } from "../services/recipesAPI";
import { useParams, Link } from "react-router-dom";

import { AuthContext } from "../contexts/contexts"

import "./RecipeDetails.css"
import CommentSection from "../containers/CommentSection";
import Header from "../Main-containers/Header";

import RecipeDetailsHeader from "../RecipeDetailsComponents/RecipeDetailsHeader";
import RecipeDetailsImages from "../RecipeDetailsComponents/RecipeDetailsImages";
import RecipeDetailsIngredients from "../RecipeDetailsComponents/RecipeDetailsIngredients";
import RecipeDetailsInstructions from "../RecipeDetailsComponents/RecipeDetailsInstructions";
import RecipeDetailsTags from "../RecipeDetailsComponents/RecipeDetailsTags";
import RecipeDetailsWallets from "../RecipeDetailsComponents/RecipeDetailsWallets";

export default function RecipeDetails() {
    const { userId, isAuthenticated } = useContext(AuthContext);


    const [likeStatus, setLikeStatus] = useState(false);

    const { id } = useParams();

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        async function getInfo() {
            const res = await getFullRecipe(id);

            setRecipe((prev) => {
                return {
                    ...prev,
                    ...res,
                };
            });

            setLikeStatus(() => res.likes.includes(userId));
        }

        getInfo();
    }, [id, userId]);

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
        await updateRecipe(recipe._id, { ...recipe, likes: oldLikesCopy || []}, true)
    }

    const checkHandler = (e) => {
        let a = e.currentTarget;
        a.className == "" ? a.className = "checked" : a.className = "";
    }

    if (!Object.keys(recipe).length) {
        return null;
    }

    return (
        <>
            <Header hideQuery={true} />
            <div className="wrapper">
                <div className="recipe-page-wrapper">
                    {isAuthenticated && <button className={`like-button ${likeStatus}`} onClick={likeHandler}>❤️ {recipe.likes.length} {recipe.likes.length == 1 ? 'like' : 'likes'}</button>}

                    <RecipeDetailsHeader recipe={recipe} setRecipe={setRecipe} />
                    <RecipeDetailsImages recipe={recipe} setRecipe={setRecipe} />
                    {console.log(recipe)}
                    <p className="description">{recipe.description}</p>
                    <RecipeDetailsIngredients recipe={recipe} setRecipe={setRecipe} checkHandler={checkHandler} />
                    <RecipeDetailsInstructions recipe={recipe} setRecipe={setRecipe} checkHandler={checkHandler} />
                    <RecipeDetailsTags recipe={recipe} setRecipe={setRecipe} checkHandler={checkHandler} />
                    <RecipeDetailsWallets recipe={recipe} /> 
                    <CommentSection />

                </div >
            </div>

        </>
    )
}