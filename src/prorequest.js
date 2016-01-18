import request from 'request';

function makeRequest(method, url, parameters) {
    return new Promise((resolve, reject) => {
        const options = {
            method: method,
            url: url,
            headers: parameters.headers || {'Content-Type': 'application/json'},
            proxy: process.env.HTTP_PROXY || '',
            json: parameters.json
        };
        request(options, (error, response) => {
            if (error) return reject(error);
            if (response.statusCode < 200 || response.statusCode >= 300) return reject(response);
            resolve(response);
        });
    });
}

function get(url, parameters) {
    return makeRequest('GET', url, parameters);
}

function post(url, parameters) {
    return makeRequest('POST', url, parameters);
}

function deleteRequest(url, parameters) {
    return makeRequest('DELETE', url, parameters);
}

export default {
    get,
    post,
    deleteRequest
};
