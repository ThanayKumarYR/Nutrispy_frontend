const axios = require('axios');

async function posting(subUrl,formData)
{
    try{
        const baseUrl = "http://localhost:5000"
        const url = baseUrl + subUrl;
        const response = await axios.post(url, formData);
        return response
    }
    catch (error) {
        console.error('Error submitting form:', error);
      }
}

const axiosObj = {posting}

export default axiosObj