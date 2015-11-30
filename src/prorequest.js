import request from 'request';

function makeRequest(method, url, parameters) {
    return new Promise((resolve, reject) => {
        const options = {
            method: method,
            url: url,
            headers: {'Content-Type': 'application/json'},
            proxy: process.env.HTTP_PROXY || '',
            json: parameters
        };
        request(options, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode < 200 || response.statusCode >= 300) return reject(response);
            resolve(body);
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
    get: get,
    post: post,
    delete: deleteRequest
};
