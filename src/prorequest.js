import request from 'request';
import ExtendableError from 'es6-error';

class RequestError extends ExtendableError {
    constructor(method, url, json, statusCode, response) {
        super('Http Request Error');
        Object.assign(this, { method, url, json, statusCode, response });
    }
}

function makeRequest(method, url, parameters) {
    return new Promise((resolve, reject) => {
        let headers = { 'Content-Type': 'application/json' };
        let json;

        if (parameters) {
            headers = parameters.headers;
            json = parameters.json;
        }

        const options = { method, url, headers, json };

        request(options, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new RequestError(method, url, json, response.statusCode, body));
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
