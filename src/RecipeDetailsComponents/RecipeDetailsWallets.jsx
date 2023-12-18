import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Heading from "../components/Heading"

import { getUserByCollectionId } from "../services/usersAPI"

export default function RecipeDetailsWallets({ recipe }) {
    const hasWallets = Object.values(recipe.wallets).some(value => value.trim() !== '');

    return (
        <>

            {hasWallets && (
                <>
                    {console.log(Object.values(recipe.wallets))}
                    <Heading content="Contribute" />

                    <h3 className="author"><Link to={`/authors/${recipe._ownerId}`}>{recipe.author}</Link></h3>
                    <ul className="wallets">
                        {Object.entries(recipe.wallets).map((a, i) => (
                            <p className="wallet" key={i}>
                                {a[0]}: <code>{a[1]}</code>
                            </p>
                        ))}
                    </ul>
                </>
            )}
        </>

    )
}