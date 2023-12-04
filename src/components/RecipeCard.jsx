import { useEffect, useState } from 'react';
import formatDate from '../utils/dateUtils';
import { Link } from 'react-router-dom';
import checkImageExists from '../utils/imageUtils';
import './RecipeCard.css';


// TODO recipesAPI object.entries returns recipe without author and profilePicture.
export default function RecipeCard({ r, show }) {
    // useEffect(() => console.log(r), [])
    return (
        <li className='recipe-card-wrapper'>

            <section className="recipe-card">

                <p className="title"><Link to={`/recipes/${r._id}`}>{r.title}</Link></p>
                {show == "all" && (
                    <>
                        <p className="likes">{r.likes} likes</p>
                        <span className="date">{formatDate(r.date)}</span>
                    </>
                )}

            </section>

        </li>
    )
}