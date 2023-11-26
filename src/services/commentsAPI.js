import { getUser } from "./usersAPI";


const base = "http://localhost:3030/jsonstore/comments";

export async function createComment(recipeId, username, text) {

    const body = {
        recipeId: recipeId,
        username: username,
        comment: text
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

export async function getAllComments(recipeId) {
    const query = new URLSearchParams({
        where: `recipeId="${recipeId}"`
    })

    // const res = await fetch(`${base}?${query}`);
    const res = await fetch(base);

    const data = await res.json();



    const comments = await Promise.all(Object.values(data).filter(comment => comment.recipeId === recipeId).map( async el => {
        const userData = await getUser(`${el.owner}`);
        el['username'] = userData.username;
        return el;
    }));
    return comments;
}

// await createComment("c38a9332-2011-495f-9bbc-bdc57b830251", 'Obama', "very tasty! :_(")
