import { getUser } from "./usersAPI";

const base = "http://localhost:3030/jsonstore/recipes";


export async function getAllRecipes() {
    try {
        const get = await fetch(base);
        const res = await get.json();

        const recipesWithUserInfo = await Promise.all(
            Object.values(res).map(async (r) => {
                const userData = await getUser(`${r.owner}`);
                r['author'] = userData.username;
                r['profilePicture'] = userData.profilePicture;
                return r;
            })
        );

        return recipesWithUserInfo;
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


        const userData = await getUser(`${r.owner}`);
        r['author'] = userData.username;
        r['profilePicture'] = userData.profilePicture;
        r['wallets'] = userData.wallets;

        return r;
    } catch (err) {
        console.log(err)
    }
}

export async function createRecipe(d) {
    try {

        const body = {
            owner: d.owner,
            title: d.title,
            author: d.author,
            images: d.images,
            ingredients: d.ingredients,
            instructionos: d.instructions,
            likes: d.likes
        }

        const res = await fetch(base, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const r = await res.json();
        return r;
    } catch (err) {
        console.log(err)
    }
}

export async function updateRecipe(id, d) {
    try {

        const res = await fetch(`${base}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(d)
        });

        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err)
    }
}

export async function deleteRecipe(id) {
    try {

        const res = await fetch(`${base}/${id}`, {
            method: "DELETE"
        })
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err)
    }
}

