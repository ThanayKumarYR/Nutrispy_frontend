import axios from 'axios'
const customFetch = axios.create({
	baseURL: 'https://nutrispyserver.onrender.com/api/v1',
});

async function posting(url, formData) {
	console.log(formData);
	const response = await customFetch.post(url, formData);
	return response
}

async function getting(url, formData) {
	console.log(formData);
	const response = await customFetch.get(url, formData);
	return response
}

const axiosObj = { posting, getting }

export default axiosObj