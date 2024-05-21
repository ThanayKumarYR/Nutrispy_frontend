import axios from 'axios'

const customFetch = axios.create({
    baseURL: 'http://nutrispyserver.onrender.com/api/v1/',
    withCredentials: true,
});


async function posting(url, formData, headers = {}) {
    console.log(formData);
    try {
        const response = await customFetch.post(url, formData, {
            headers: {
                ...customFetch.defaults.headers.common,
                ...headers,
            },
        });
        console.log('Response data:', response.data);
        return response;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

async function getting(url, formData, headers = {}) {
    console.log(formData);
    const response = await customFetch.get(url, {
        headers: {
            ...customFetch.defaults.headers.common,
            ...headers,
        },
        params: formData,
    });
    console.log(response);
    return response;
}

async function deleting(url, formData) {
    console.log(formData)
    const response = await customFetch.delete(url, formData);
    console.log(response)
    return response
}

function getCookies() {
    var cookies = document.cookie.split(';').reduce(function (prev, current) {
        var cookie = current.trim().split('=');
        prev[cookie[0]] = cookie[1];
        return prev;
    }, {});
    return cookies;
}

function setCookiesInHeaders() {
    var cookies = getCookies();
    var headers = {};
    for (var cookie in cookies) {
        if (cookie.trim() !== '' && cookies[cookie].trim() !== '') {
            headers[cookie] = cookies[cookie];
        }
    }
    return headers;
}

axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    ...(Object.keys(document.cookie).length > 0 ? setCookiesInHeaders() : {})
};


const axiosObj = { posting, getting, deleting }

export default axiosObj