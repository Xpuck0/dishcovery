// import recipeList from "../utils/requestUtils.js";
import * as request from "./requests.js";
import { getUser, getUserByCollectionId } from "./usersAPI.js";

const base = "http://localhost:3030/data/recipes";


export async function getAllRecipes() {
    try {
        const get = await fetch(base);
        const data = await get.json()
        return data;

    } catch (err) {
        console.log("Error when fetching all recipes: " + err);
    }
}

export async function getRecipe(id) {
    try {

        const res = await fetch(`${base}/${id}`);
        const r = await res.json();
        return r;
    } catch (err) {
        console.log(err)
    }
}


export async function getFullRecipe(id) {
    try {

        const res = await fetch(`${base}/${id}`);
        const r = await res.json();
        // console.log(r)

        const userData = await getUserByCollectionId(r._ownerId);
        // console.log(userData.username)
        r['author'] = userData.username;
        r['wallets'] = userData.wallets;
        return r;
    } catch (err) {
        console.log(err)
    }
}

export async function createRecipe(d) {
    try {

        const body = {
            // owner: d.owner,
            title: d.title || "Unknown",
            description: d.description || '',
            images: d.images || [],
            ingredients: d.ingredients || [],
            instructions: d.instructions || [],
            likes: d.likes || [],
            tags: d.tags || []
        }

        const r = await request.post(base, body)

        return r;
    } catch (err) {
        console.log(err)
    }
}


export async function updateRecipe(id, d, xadmin = false) {
    try {
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
            body: JSON.stringify(d)
        });

        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err)
    }
}

export async function deleteRecipe(id, xadmin) {
    try {
        const token = JSON.parse(localStorage.getItem('auth')).accessToken;
        console.log(token)

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
            method: "DELETE",
            headers: headers,
        })
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err)
    }
}

