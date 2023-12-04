const buildOptions = (data) => {
    const options = {};
    const token = localStorage.getItem('accessToken');

    let headers = {
        'content-type': 'application/json'
    };

    if (token) {
        headers = {
            ...headers,
            ['X-Authorization']: token,
        }
    }


    if (data) {
        options.body = JSON.stringify(data);
        options.headers = headers;
    }
    return options;
}

const request = async (method, url, data) => {
    const response = await fetch(url, {
        ...buildOptions(data),
        method,
    });

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};


export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');
