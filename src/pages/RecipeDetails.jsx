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




    useEffect(() => {
        async function getInfo() {
            const res = await getFullRecipe(id);
            console.log(res)
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
        setRecipe(old => ({ ...old, likes: oldLikesCopy }))
        await updateRecipe(recipe._id, { ...recipe, likes: oldLikesCopy }, true)
    }

    const checkHandler = (e) => {
        let a = e.currentTarget;
        a.className == "" ? a.className = "checked" : a.className = "";
    }


    return (
        <>
            <Header hideQuery={true} />
            <div className="wrapper">
                <div className="recipe-page-wrapper">
                    {isAuthenticated && <button className={`like-button ${likeStatus}`} onClick={likeHandler}>❤️ {recipe.likes?.length} {recipe.likes.length == 1 ? 'like' : 'likes'}</button>}

                    <RecipeDetailsHeader recipe={recipe} setRecipe={setRecipe} />
                    <RecipeDetailsImages recipe={recipe} setRecipe={setRecipe} />
                    <RecipeDetailsIngredients recipe={recipe} setRecipe={setRecipe} checkHandler={checkHandler} />
                    <RecipeDetailsInstructions recipe={recipe} setRecipe={setRecipe} checkHandler={checkHandler} />
                    <RecipeDetailsWallets ownerId={recipe.owner} /> 
                    <RecipeDetailsTags recipe={recipe} setRecipe={setRecipe} checkHandler={checkHandler} />
                    <CommentSection />

                </div >
            </div>

        </>
    )
}