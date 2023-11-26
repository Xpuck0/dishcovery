

export default async function checkImageExists(url) {
    const res = await fetch(url);
    const data = await res;
    if (data.ok){
        return true;
    } else {
        return false;
    }
}

// console.log(await checkImageExi/sts('aksdjf'))