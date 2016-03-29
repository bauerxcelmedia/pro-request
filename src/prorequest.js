import request from 'request';
import ExtendableError from 'es6-error';

class RequestError extends ExtendableError {
    constructor(method, url, json, statusCode, response) {
        super('Http Request Error');
        Object.assign(this, {method, url, json, statusCode, response});
    }
}

function makeRequest(method, url, parameters) {
    return new Promise((resolve, reject) => {
        let headers = {'Content-Type': 'application/json'};
        let json;

        if (parameters) {
            headers = parameters.headers;
            json = parameters.json;
        }

        const options = {method, url, headers, proxy: process.env.HTTP_PROXY || '', json};

        request(options, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new RequestError(method, url, json, response.statusCode, body));
            }
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

function put(url, parameters) {
    return makeRequest('PUT', url, parameters);
}

function deleteRequest(url, parameters) {
    return makeRequest('DELETE', url, parameters);
}

export default {
    get,
    post,
    put,
    deleteRequest
};
