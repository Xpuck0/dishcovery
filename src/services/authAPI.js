import * as request from "./requests.js";
import { createUser, getAllUsers } from "./usersAPI.js";
const base = 'http://localhost:3030/users';


export async function login(email, password) {
    try {
        // console.log(email, password)
        // const result = await request.post('POST', `${base}/login`, {
        //     email,
        //     password
        // });

        const fetched = await fetch(`${base}/login`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        })

        const data = await fetched.json();

        return data;

    } catch (err) {
        console.log(err.message)
    }
}

export async function signup(email, password) {
    try {

        await request.post(`${base}/register`, {
            email,
            password,
        })

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
