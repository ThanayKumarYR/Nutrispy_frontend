import axios from 'axios'
const customFetch = axios.create({
    baseURL: 'https://nutrispyserver.onrender.com/api/v1',
});

async function posting(url, formData) {
    // console.log(formData);
    const response = await customFetch.post(url, formData);
    // console.log(response);
    return response
}

async function getting(url, formData) {
    // console.log(formData);
    const response = await customFetch.get(url, formData);
    // console.log(response);
    return response
}

// async function getting(url, formData) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             const data = {
//                 "data": {
                    // "data": [
                    //     {
                    //         "company": "lytx",
                    //         "email": "sujan@gmail.com",
                    //         "id": "0FnaXpxWXMV7ulOxloZN",
                    //         "message": "I love you",
                    //         "name": "Sujan",
                    //         "number": "7259813815"
                    //     },
                    //     {
                    //         "company": "Sudhanva",
                    //         "email": "idiot@gmail.com",
                    //         "id": "hCdarc2MlvjRLPcuK0Zr",
                    //         "message": "I love you",
                    //         "name": "Sudhanva",
                    //         "number": "7259813815"
                    //     },
                    //     {
                    //         "company": "Stupid",
                    //         "email": "idiot@gmail.com",
                    //         "id": "q9FJMAnrswKWxTunRLbD",
                    //         "message": "I love you",
                    //         "name": "Sujan",
                    //         "number": "7259813815"
                    //     }
                    // ],
                    // "response": "success",
                    // "statusCode": 200

//                     // "data": "Admin privileges required",
//                     // "response": "unauthorized",
//                     // "statusCode": 401

//                 }
//             }
//             resolve(data);
//         }, 5000);
//     });
// }


async function deleting(url, formData) {
    // console.log(formData)
    // const response = await customFetch.delete(url, formData);
    // console.log(response)
    // return response
    return {
        "message": "Contact deleted successfully",
        "response": "success",
        "status": 200
    }
}
const axiosObj = { posting, getting, deleting }

export default axiosObj