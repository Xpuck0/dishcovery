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

export async function signup({ email, password, username, profilePicture, wallets }) {
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
        const result = await login(email, password);
        await createUser(result)

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

