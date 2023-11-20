import { useEffect, useState} from 'react';
import checkImageExists from '../utils/imageUtils';
import './RecipeCard.css';


// TODO recipesAPI object.entries returns recipe without author and profilePicture.
export default function RecipeCard({r}) {
    
    return (
        <div className="recipe-card">
            <div className="profile">
                <div className="img-container">
                    
                    <img src="/images/profile-pic.jpg" alt={`${r.author}'s profile picture`} />
                </div>
                <h4>{r.author}</h4>
            </div>
            <div className="img-container">
                <img src="/images/salad.avif" alt="Image of the recipe" />
            </div>
            <p className="description">{r.description}</p>
            <div className="buttons">
                <>
                    <div className="like">
                        <svg
                            width={46}
                            height={46}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </div>
                    <div className="comment">
                        <svg
                            width={46}
                            height={46}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                    </div>
                    <div className="star">
                        <svg
                            width={46}
                            height={46}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                </>

            </div>
        </div>

    )
}