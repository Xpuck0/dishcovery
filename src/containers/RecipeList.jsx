import { useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import './RecipeList.css'

export default function RecipeList(props) {
    const [count, setCount] = useState(6);

    // TODO use database

    return (    
        <div className="recipe-list">
            <div className="header-wrapper">
                <h2>{props.content}</h2>
            </div>
            <div className="line"></div>
            <ul className="recipes">
                <RecipeCard author="Ivan invanov"/> 
                <RecipeCard author="Ivan invanov"/> 
                <RecipeCard author="Ivan invanov"/> 
                <RecipeCard author="Ivan invanov"/> 
                <RecipeCard author="Ivan invanov"/> 
                <RecipeCard author="Ivan invanov"/> 
            </ul>
        </div>        
    )
}