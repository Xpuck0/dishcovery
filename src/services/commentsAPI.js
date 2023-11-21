

const base = "http://localhost:3030/jsonstore/comments";

export async function createComment(recipeId, username, text) {
    
        const body = {
            recipeId: recipeId,
            username: username,
            text: text
        };

        const res = await fetch(base, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const ret = await res.json();
        return ret;
}

// await createComment("c38a9332-2011-495f-9bbc-bdc57b830251", 'Obama', "very tasty! :_(")
