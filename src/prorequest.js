import request from 'request';
import ExtendableError from 'es6-error';

class RequestError extends ExtendableError {
    constructor(options, statusCode, response) {
        super('Http Request Error');
        Object.assign(this, { ...options, statusCode, response });
    }
}

const defaultHeaders = {
    'Content-Type': 'application/json'
};

function makeRequest(
    method,
    url,
    { headers = defaultHeaders, ...params } = { headers: defaultHeaders }
) {
    return new Promise((resolve, reject) => {
        const proxy = process.env.HTTP_PROXY
            ? { proxy: process.env.HTTP_PROXY }
            : {};
        const options = { method, url, ...proxy, headers, ...params };
        request(options, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(
                    new RequestError(options, response.statusCode, body)
                );
            }
            return resolve(response);
        });
    });
}

export default {
    get: (url, parameters) => makeRequest('GET', url, parameters),
    post: (url, parameters) => makeRequest('POST', url, parameters),
    put: (url, parameters) => makeRequest('PUT', url, parameters),
    deleteRequest: (url, parameters) => makeRequest('DELETE', url, parameters)
};
