export const baseUsers = "http://localhost:3030/jsonstore/users"

export async function getUser(id) {
    try {
        const res = await fetch(`${baseUsers}/${id}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getAllRecipes() {
    try {
        const get = await fetch(base);
        const res = await get.json();

        const recipePromises = Object.values(res).map(async r => {
            const userData = await getUser(`${r.owner}`);
            // console.log(userData)
            // userData.then(a => console.log(a))
            r['author'] = userData.username;
            r['profilePicture'] = userData.profilePicture;
            return r;
        });

        const recipesWithUserData = await Promise.all(recipePromises);
        console.log(recipesWithUserData)
        return recipesWithUserData;
    } catch (err) {
        console.log(err);
    }
}


export async function createUser(d) {
    try {

        const body = {
            username: d.username,
            email: d.email,
            password: d.password,
            images: d.images,
            following: d.following,
            followers: d.followers,
            created: new Date(),
            wallets: {
                bitcoin: d.wallets.bitcoin,
                monero: d.wallets.monero
            }
        }

        const responce = await fetch(baseUsers, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const res = await responce.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

export async function updateUser(id, d) {
    try {
        const res = await fetch(`${baseUsers}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(d)
        });

        const data = await res.json();
        console.log(data);

    } catch (err) {
        console.log(err)
    }
}

export async function deleteUser(id) {
    try {
        const req = await fetch(`${baseUsers}/${id}`, {
            method: 'DELETE'
        })
        const res = await req.json();
        return res;

    } catch (err) {
        console.log(err)
    }
}

const data = {
    username: "ivan veliki",
    email: "ivan@veliki.com",
    password: "34234",
    images: ["image1", "image2"],
    following: ["tempID1", "tempID2"],
    followers: ["tempID3", "tempID4"],

    wallets: {
        monero: "monerowallet",
        bitcoin: "bitcoinwallet"
    }
}

// await updateUser("3d3e3f53-fe64-4d06-bc9c-1a168767593b", data);
// await createUser(data);
// await deleteUser('6cae8186-d25b-42a0-929f-50bd2b9ca709')

// await getAllUsers();