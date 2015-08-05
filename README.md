pro-request

## Introduction
----------------

This library wraps the request library with an ES6 promise. Currently supports HTTP GET and POST.

### Parameters
- url: The url
- parameters: The json object to send for a POST

Examples

``` js

import request from 'pro-request';

request.get('http://www.bauer-media.com.au/').then((result) => {
        // do something
    })
```

``` js

import request from 'pro-request';

request.post('services.bauer-media.com.au/', {site: 'aww'}).then((result) => {
        // do something
    })
```

## Running tests
--------------

Runs the unit tests.

```bash
npm test
```

## Coverage
--------------
```bash
npm run cover
```

Generates the code coverage report in the /coverage directory. Current babel-istanbul does not work on windows.

## Linting
--------------
```bash
npm run lint
```

## Credit
--------------
https://github.com/request/request