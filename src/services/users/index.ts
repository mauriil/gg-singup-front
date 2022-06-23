const axios = require('axios');

export async function createUser(data) {
    try{
        const response = await axios.post(`http://127.0.0.1:3300/users/register`, data);
        console.log('response  ', response)
        return {data: response.data, statusCode: response.status};
    }catch(error) {
        console.log(JSON.stringify(error));        
    }    
}

export async function loginUser(data) {
    try{
        const response = await axios.post(`http://127.0.0.1:3300/users/login`, data);
        console.log('response  ', response)
        return {data: response.data, statusCode: response.status};
    }catch(error) {
        console.log(JSON.stringify(error));        
    }    
}
