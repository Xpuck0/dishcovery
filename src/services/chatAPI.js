import { getUserByCollectionId } from "./usersAPI";

const base = 'http://localhost:3030/data/chat';


export async function createChat(ownerId, text, xadmin=false) {

    const user = await getUserByCollectionId(ownerId);


    const body = {
        username: user.username,
        profilePicture: user.profilePicture,
        content: text,
        likes: []
    };


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

    const res = await fetch(base, {
        method: "POST",
        headers: { ...headers },
        body: JSON.stringify(body)
    })


    const ret = await res.json();
    console.log(ret)


    return ret;
}

export async function getAllChats() {
    const res = await fetch(base);

    const data = await res.json();

    return data;
}

export async function updateChat(id, data, xadmin=false) {
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

    return await res.json();
}

export async function deleteChat(id) {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`${base}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    })

    return res;
}