import { Suspense, useContext, useEffect, useState } from "react";
import { deleteRecipe, getFullRecipe, updateRecipe } from "../services/recipesAPI";
import { useParams, Link, useNavigate } from "react-router-dom";

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
import Heading from "../components/Heading";
import RecipeDetailsDescription from "../RecipeDetailsComponents/RecipeDetailsDescription";
import Path from "../paths";

export default function RecipeDetails() {
    const { userId, isAuthenticated } = useContext(AuthContext);


    const [likeStatus, setLikeStatus] = useState(false);

    const { id } = useParams();
    const nav = useNavigate()

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        async function getInfo() {
            let res;
            try {

                res = await getFullRecipe(id);
                if (res.code) {
                    throw new Error('Error fetching recipe. Probably invalid ID')
                }

            } catch (err) {
                console.error("Invalid recipe provided");
                nav(Path.RecipeNotFound)
                return null;
            }

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
        await updateRecipe(recipe._id, { ...recipe, likes: oldLikesCopy || [] }, true)
    }

    const deleteHandler = async () => {
        try {
            if (window.confirm("Do you really want to delete the recipe?")) {
                await deleteRecipe(recipe._id)
                nav(Path.Home)
            }
        } catch (err) {
            console.error("Error deleting recipe" + err);
        }
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
                    {isAuthenticated && userId == recipe._ownerId && <button onClick={deleteHandler} className="delete-button">Delete</button>}

                    <RecipeDetailsHeader recipe={recipe} setRecipe={setRecipe} />
                    <RecipeDetailsImages recipe={recipe} setRecipe={setRecipe} />
                    <RecipeDetailsDescription>{recipe.description}</RecipeDetailsDescription>
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