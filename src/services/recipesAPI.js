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
                'Content-Type': 'application/json',
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

const data = {
    owner: "tempID",
    title: "shopska",
    author: "Hrisko",
    images: ["image1", "image2"],
    instructions: ["Put in furnace", "get from furnace"],
    ingredients: ["turkey", "pasta", "ketchup", "idk"],
    description: "Tasty food to eat!",
    tags: ["meat", "christmas"],
    likes: 69

}

// await createRecipe(data);
// const sth = await getAllRecipes();
// const sth = await getRecipe('7165e82d-b8f3-4e51-a0a7-6b561b7fa923');
// console.log(sth)
// Object.entries(sth).forEach(a => console.log(Object.entries(a[1]))

// await deleteRecipe("93f0661b-256e-4f6a-9a8b-a73dfaea5de3")
// await updateRecipe("85d6f2b4-9821-4edd-919c-cd2cf1eee2be", data)