import { getRecipe } from "./recipesAPI.js";
import { getUser, getUserByCollectionId } from "./usersAPI.js";
import * as request from "./requests.js"

const base = "http://localhost:3030/data/comments";

export async function createComment(recipeId, username, text, rating = 0) {


    const body = {
        recipeId: recipeId,
        username: username,
        comment: text,
        rating: rating,
        likes: []
    };


    const token = localStorage.getItem('accessToken');

    let headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers = {
            ...headers,
            ['X-Authorization']: token,
        }
    }

    const res = await fetch(base, {
        method: "POST",
        headers: { ...headers },
        body: JSON.stringify(body)
    })

    const ret = await res.json();


    return ret;
}

export async function updateComment(id, data, xadmin=false) {
    const token = localStorage.getItem('accessToken');

    let headers = {}
    if (xadmin) {
        headers = {
            'X-Admin': ''
        }
    } else {
        headers = {
            'content-type': 'application/json'
        };

        if (token) {
            headers = {
                ...headers,
                ['X-Authorization']: token,
            }
        }
    }

    const res = await fetch(`${base}/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    });

    return res;
}

export async function updateCommentPartially(id, data, xadmin=false) {

    try {

    const token = localStorage.getItem('accessToken');

    let headers = {}
    if (xadmin) {
        headers = {
            'X-Admin': '',
            'Access-Control-Allow-Origin': ''
        }
    } else {
        headers = {
            'content-type': 'application/json'
        };

        if (token) {
            headers = {
                ...headers,
                ['X-Authorization']: token,
            }
        }
    }
    console.log(`${base}/${id}`)
    const res = await fetch(`${base}/${id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
    });

    return res;
    } catch (err) {
        console.log(err)
    }
}

export async function getAllComments(recipeId) {
    const res = await fetch(base);

    const data = await res.json();



    const comments = await Promise.all(Object.values(data).filter(comment => comment && comment.recipeId === recipeId)) //.map(async el => {

        // console.log(el)
        // const recipe = await getRecipe(el.recipeId)
        // const userData = await getUserByCollectionId(recipe._ownerId);
        // el['username'] = userData.username;
        // return el;
    // }));
    return comments;
}

export async function deleteComment(id) {
    const token = localStorage.getItem('accessToken');
    console.log(token)
    const res = await fetch(`${base}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    })

    return res;
}

// await createComment("c38a9332-2011-495f-9bbc-bdc57b830251", 'Obama', "very tasty! :_(")
