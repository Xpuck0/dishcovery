import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Heading from "../components/Heading"

import { getUserByCollectionId } from "../services/usersAPI"

export default function RecipeDetailsWallets({recipe}) {
    // const [owner, setOwner] = useState({})

    // useEffect(() => {
    //     async function get() {
    //         // console.log(props)
    //         console.log(ownerId)
    //         const res = await getUserByCollectionId(ownerId);
    //         console.log(res)
    //         setOwner(res)
    //     }

    //     get()
    // }, [])

    return (
        <>
            
            {Object.keys(recipe.wallets).length && (
                <>
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