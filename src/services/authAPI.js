const base = 'http://localhost:3030/users';

export async function login (email, password) {
    const res = await fetch(`${base}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })

    return res.json();
}

const res = await login('peter@abv.bg', '123456')
const res2 = await login('peterdf@abv.bg', '12dd3456')
console.log(res)