import { useEffect, useState } from 'react';
import formatDate from '../utils/dateUtils';
import { Link } from 'react-router-dom';
import checkImageExists from '../utils/imageUtils';
import './RecipeCard.css';


// TODO recipesAPI object.entries returns recipe without author and profilePicture.
export default function RecipeCard({ r }) {
    // useEffect(() => console.log(r), [])
    return (
            <section className="recipe-card">
                
                <p className="title"><Link to={`/recipes/${r._id}`}>{r.title}</Link></p>
                <p className="likes">{r.likes} likes</p>
                <span className="date">{formatDate(r.date)}</span>
                 
            </section>
    )
}