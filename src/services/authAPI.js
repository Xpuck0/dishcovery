import * as request from "./requests.js";
import { createUser, getAllUsers } from "./usersAPI.js";
const base = 'http://localhost:3030/users';


export async function login(email, password) {
    try {


        const fetched = await fetch(`${base}/login`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ "email": email, "password": password })
        })

        if (!fetched.ok) {
            return fetched;
        }

        const data = await fetched.json();

        return data;

    } catch (err) {
        console.log(err.message)
    }
}

export async function signup({email, password, username, profilePicture, wallets}) {
    try {
        console.log(email, username, password, profilePicture, wallets)

        const fetched = await fetch(`${base}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username,
                profilePicture: profilePicture,
                wallets: wallets
            })
        })

        const user = await fetched.json();
        // await request.post(`${base}/register`, {
        //     email,
        //     password,
        //     username, 
        //     profilePicture,
        //     wallets
        // })

        const result = await login(email, password);
        console.log(result)
        await createUser(result)
        console.log(await getAllUsers());

        return result;

    } catch (err) {
        console.log(err.message)
    }
}

export async function logout() {
    await request.get(`${base}/logout`, {
        headers: {
            // ['X-Authorization']: localStorage.getItem('accessToken'),
        }
    })
    localStorage.removeItem('accessToken');
}

const res = await login('peter@abv.bg', '123456')
