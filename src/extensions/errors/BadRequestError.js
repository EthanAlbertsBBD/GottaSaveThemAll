const GeneralError = require('./GeneralError');

module.exports = class BadRequestError extends GeneralError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
};