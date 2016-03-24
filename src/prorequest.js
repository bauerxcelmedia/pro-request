import request from 'request';
import isString from 'lodash.isstring';

function makeRequest(method, url, parameters) {
    return new Promise((resolve, reject) => {
        let headers = {'Content-Type': 'application/json'};
        let json;

        if (parameters) {
            headers = parameters.headers;
            json = parameters.json;
        }

        const options = {
            method: method,
            url: url,
            headers: headers,
            proxy: process.env.HTTP_PROXY || '',
            json: json
        };
        request(options, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode < 200 || response.statusCode >= 300) return reject(new Error(`status: ${response.statusCode}, url: ${url}, body: ${isString(body) ? body : JSON.stringify(body)}`));
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
