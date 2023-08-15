const GeneralError = require('./GeneralError');

module.exports = class UnauthorizedRequestError extends GeneralError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
};