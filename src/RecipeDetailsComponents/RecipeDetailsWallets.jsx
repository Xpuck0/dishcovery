import { useState, useEffect } from "react"

import { getUserByCollectionId } from "../services/usersAPI"

export default function RecipeDetailsWallets({ownerId}) {
    const [owner, setOwner] = useState({})

    useEffect(() => {
        async function get() {
            // console.log(props)
            console.log(ownerId)
            const res = await getUserByCollectionId(ownerId);
            console.log(res)
            setOwner(res)
        }

        get()
    }, [])

    return (
        <>
            
            {/* {Object.keys(owner.wallets).length && (
                <>
                    <Heading content="Contribute" />

                    <h3 className="author"><Link to={`/authors/${owner}`}>{owner.username}</Link></h3>
                    <ul className="wallets">
                        {Object.entries(owner.wallets).map((a, i) => (
                            <p className="wallet" key={i}>
                                {a[0]}: <code>{a[1]}</code>
                            </p>
                        ))}
                    </ul>
                </>
            )} */}
        </>

    )
}