import { expect } from 'chai';
import proxyquire from 'proxyquire';

describe('prorequest', () => {
    let webRequestUtil;
    let error;
    let response;
    let body;

    describe('HTTP GET', () => {
        beforeEach(() => {
            const requestStub = (params, callback) => {
                callback(error, response, body);
            };

            const stubs = {
                request: requestStub
            };

            webRequestUtil = proxyquire('../../src/prorequest', stubs).default;
        });

        it('should make an HTTP GET to a valid url and return the result', done => {
            error = '';
            response = { statusCode: 200, body: { test: 'success' } };
            body = { test: 'success' };

            const actual = webRequestUtil.get('http://test.com', {
                headers: { 'Content-Type': 'application/json' },
                json: { test: 'test' }
            });

            actual
                .then(res => {
                    expect(res.body).to.deep.equal({ test: 'success' });
                    expect(res.statusCode).to.equal(200);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });

        it('should make an HTTP GET to a valid url and return an error', done => {
            error = new Error('This is an error');
            response = { statusCode: 500, body: { test: 'fail' } };
            body = { test: 'fail' };

            const actual = webRequestUtil.get('http://test.com', {
                headers: { 'Content-Type': 'application/json' },
                json: { test: 'test' }
            });

            actual
                .then(() => {})
                .catch(() => {
                    expect(error.message).to.equal('This is an error');
                    done();
                    // This second catch is to catch any errors with the expect in the above catch
                })
                .catch(err => {
                    done(err);
                });
        });

        it('should make an HTTP GET to a valid url and return an error when the response code is not a 200', done => {
            error = '';
            response = { statusCode: 500, body: { test: 'fail' } };
            body = { test: 'fail' };

            const actual = webRequestUtil.get('http://test.com', {
                headers: { 'Content-Type': 'application/json' },
                json: { test: 'test' }
            });

            actual
                .then(() => {})
                .catch(err => {
                    expect(err.statusCode).to.equal(500);
                    expect(err.response).to.equal(body);
                    done();
                    // This second catch is to catch any errors with the expect in the above catch
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('HTTP POST', () => {
        beforeEach(() => {
            const requestStub = (params, callback) => {
                callback(error, response, body);
            };

            const stubs = {
                request: requestStub
            };

            webRequestUtil = proxyquire('../../src/prorequest', stubs).default;
        });

        it('should make an HTTP POST to a valid url and return the result', done => {
            error = '';
            response = { statusCode: 200, body: { test: 'success' } };
            body = { test: 'success' };

            const actual = webRequestUtil.post('http://test.com', {
                headers: { 'Content-Type': 'application/json' },
                json: { test: 'test' }
            });

            actual
                .then(res => {
                    expect(res.body).to.deep.equal({ test: 'success' });
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('HTTP PUT', () => {
        beforeEach(() => {
            const requestStub = (params, callback) => {
                callback(error, response, body);
            };

            const stubs = {
                request: requestStub
            };

            webRequestUtil = proxyquire('../../src/prorequest', stubs).default;
        });

        it('should make a request to a valid url and return the result', done => {
            error = '';
            response = { statusCode: 200, body: { test: 'success' } };
            body = { test: 'success' };

            const actual = webRequestUtil.put('http://test.com', {
                headers: { 'Content-Type': 'application/json' },
                json: { test: 'test' }
            });

            actual
                .then(res => {
                    expect(res.body).to.deep.equal({ test: 'success' });
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('HTTP DELETE', () => {
        beforeEach(() => {
            const requestStub = (params, callback) => {
                callback(error, response, body);
            };

            const stubs = {
                request: requestStub
            };

            webRequestUtil = proxyquire('../../src/prorequest', stubs).default;
        });

        it('should make an HTTP DELETE to a valid url', done => {
            response = { statusCode: 200, body: { test: 'deleted' } };
            body = { test: 'deleted' };

            const actual = webRequestUtil.deleteRequest('http://test.com', {
                headers: { 'Content-Type': 'application/json' },
                json: { test: 'deleted' }
            });

            actual
                .then(res => {
                    expect(res.body).to.deep.equal({ test: 'deleted' });
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    describe('Request options passed', () => {
        it('should pass through to request module', done => {
            error = '';
            response = { statusCode: 200, body: { test: 'success' } };
            body = { test: 'success' };
            let exposedParams = null;
            const requestStub = (params, callback) => {
                exposedParams = params;
                callback(error, response, body);
            };
            const stubs = {
                request: requestStub
            };
            webRequestUtil = proxyquire('../../src/prorequest', stubs).default;
            const actual = webRequestUtil.get('http://test.com', {
                family: 4,
                json: { test: 'test' }
            });

            actual
                .then(() => {
                    expect(exposedParams.family).to.equal(4);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });
});
