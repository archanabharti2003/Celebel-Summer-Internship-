const axios = require('axios');

const fetchDataFromAPI = async (req, res, next) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.status(200).json(response.data);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    fetchDataFromAPI,
};
