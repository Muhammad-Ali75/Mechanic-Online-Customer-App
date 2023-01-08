import axios from 'axios';

export default axios.create({
    baseURL: 'https://mechaniconline.herokuapp.com/api/v1/buyer',
        headers: {
        'Content-Type': 'application/json',
        }
    });