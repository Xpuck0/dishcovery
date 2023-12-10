const base = 'http://localhost:3030/jsonstore/categories'

export async function getAllCategories() {
    const res = await fetch(base);
    const data = await res.json();
    console.log(data)
    return data;
}