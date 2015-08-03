import proxyquire from 'proxyquire';

describe('prorequest', () => {

    let webRequestUtil;
    let error;
    let response;
    let body;

    describe('HTTP GET', () => {
        beforeEach(() => {
            let requestStub = (params, callback) => {
                callback(error, response, body);
            };

            let stubs = {
                'request': requestStub
            };

            webRequestUtil = proxyquire('../../src/prorequest', stubs);
        });

        it('should make an HTTP GET to a valid url and return the result', (done) => {
            error = '';
            response = {'statusCode': 200, 'body': {'test': 'success'}};
            body = {'test': 'success'};

            const actual = webRequestUtil.get('http://test.com', {'test': 'test'});

            actual.then((result) => {
                expect(result).to.deep.equal({'test': 'success'});
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('should make an HTTP GET to a valid url and return an error', (done) => {

            error = new Error('This is an error');
            response = {'statusCode': 500, 'body': {'test': 'fail'}};
            body = {'test': 'fail'};

            const actual = webRequestUtil.get('http://test.com', {'test': 'test'});

            actual.then(() => {
            }).catch((error) => {
                expect(error.message).to.equal('This is an error');
                done();
                // This second catch is to catch any errors with the expect in the above catch
            }).catch((error) => {
                done(error);
            });
        });

        it('should make an HTTP GET to a valid url and return an error when the response code is not a 200', (done) => {

            error = '';
            response = {'statusCode': 500, 'body': {'test': 'fail'}};
            body = {'test': 'fail'};

            const actual = webRequestUtil.get('http://test.com', {'test': 'test'});

            actual.then(() => {
            }).catch((error) => {
                expect(error).to.deep.equal({'statusCode': 500, 'body': {'test': 'fail'}});
                done();
                // This second catch is to catch any errors with the expect in the above catch
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('HTTP POST', () => {
        beforeEach(() => {
            let requestStub = (params, callback) => {
                callback(error, response, body);
            };

            let stubs = {
                'request': requestStub
            };

            webRequestUtil = proxyquire('../../src/prorequest', stubs);
        });

        it('should make an HTTP POST to a valid url and return the result', (done) => {
            error = '';
            response = {'statusCode': 200, 'body': {'test': 'success'}};
            body = {'test': 'success'};

            const actual = webRequestUtil.post('http://test.com', {'test': 'test'});

            actual.then((result) => {
                expect(result).to.deep.equal({'test': 'success'});
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
});
