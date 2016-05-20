# pro-request

Wraps the Request library with a light weight ES6 promise.

## Parameters

- `url`: the url
- `parameters`: the json object to send as parameters

## Examples

```js
import request from 'pro-request';

request.get('http://web-service/').then((res) => {
    // handle
});

request.post('http://web-service/', {
	headers: { 'Content-Type': 'application/json' },
	json: { id: '1', title: 'thing to do',  }
}).then((res) => {
    // handle
});

request.delete('http://web-service/', {
	headers: { 'Content-Type': 'application/json' },
	json: { id: '1' }
}).then((res) => {
    // handle
});
```

## Quality

- to contribute, fork, branch and submit pull requests for review
- use Node 6
- use ES 6
- `npm test` and maintain 100% coverage
- `npm run lint` and maintain 0 errors (uses AirBnB JavaScript Style Guide)
